#!/usr/bin/env node
/**
 * Confidential-media exposure check. No dependencies.
 *
 *   npm run build && npx next start -p 3103 &
 *   node scripts/check-media-exposure.mjs http://127.0.0.1:3103 [--build-dir .next]
 *
 * 1. Requests every raw original in the project root and every file in private-assets/ (and
 *    assets-src/) through the URLs a visitor might guess: direct paths, /media/, path
 *    traversal, /_next/image, with a spoofed loopback Host / X-Forwarded-Host.
 *    Anything that answers 2xx with an image, video or binary type is a failure, unless the
 *    asset is approved in src/config/assets.ts (then /media/<file> may answer 200).
 * 2. Scans every page's HTML for those file names.
 * 3. With --build-dir, compares the SHA-256 of every file in the build output with every raw
 *    original and private asset, and searches the build's trace files (*.nft.json) and
 *    manifests for those names. A match means confidential media would be deployed.
 * --originals names the private folder that holds the raw originals (they live outside the
 * project); their names and SHA-256 are added to the confidential set. Without the option the
 * folder ~/Namokar-Private-Media is used if it exists.
 * Run it against a DEFAULT build (no ASSET_PREVIEW): a local review preview deliberately serves
 * pending files to a loopback Host, so it would (correctly) fail these probes.
 * Exit code 1 on any failure.
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, existsSync, createReadStream } from "node:fs";
import http from "node:http";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = new URL(process.argv[2] ?? "http://127.0.0.1:3103");
const buildDir = process.argv.includes("--build-dir") ? process.argv[process.argv.indexOf("--build-dir") + 1] : null;
const originalsArg = process.argv.includes("--originals") ? process.argv[process.argv.indexOf("--originals") + 1] : path.join(homedir(), "Namokar-Private-Media");
const originalsDir = originalsArg.replace(/^~(?=\/|$)/, homedir());
const MEDIA = /\.(mov|m4v|mp4|avi|mkv|heic|heif|jpe?g|png|tiff?|dng|webp|gif|avif|vtt)$/i;

const registry = readFileSync(path.join(root, "src/config/assets.ts"), "utf8");
const approved = new Set(
  [...registry.matchAll(/file:\s*"([^"]+)"[\s\S]*?approved:\s*(true|false)/g)].filter((m) => m[2] === "true").map((m) => m[1]),
);

const list = (dir, deep = false) => {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (deep) out.push(...list(p, true));
    } else if (MEDIA.test(e.name)) out.push(p);
  }
  return out;
};
const rootFiles = list(root).map((p) => path.basename(p));
const originalPaths = list(originalsDir);
const originalNames = originalPaths.map((p) => path.basename(p));
const privateFiles = list(path.join(root, "private-assets")).map((p) => path.basename(p));
const srcFiles = list(path.join(root, "assets-src"), true).map((p) => path.basename(p));
const secret = new Set([...rootFiles, ...originalNames, ...privateFiles.filter((f) => !approved.has(f)), ...srcFiles]);

const get = (p, headers = {}) =>
  new Promise((resolve) => {
    const req = http.request({ hostname: url.hostname, port: url.port, path: p.replace(/ /g, "%20"), method: "GET", headers: { ...headers } }, (res) => {
      let n = 0;
      res.on("data", (c) => { n += c.length; if (n > 2048) res.destroy(); });
      res.on("close", () => resolve({ status: res.statusCode, type: String(res.headers["content-type"] ?? ""), bytes: n }));
    });
    req.on("error", () => resolve({ status: 0, type: "", bytes: 0 }));
    req.end();
  });

const fails = [];
let probes = 0;
const enc = encodeURIComponent;
const spoof = [{}, { "X-Forwarded-Host": "localhost" }, { "X-Forwarded-Host": "127.0.0.1:3100", Host: "evil.example" }, { Host: "localhost:3100" }];

for (const f of secret) {
  const paths = [
    `/${enc(f)}`, `/${f}`, `/public/${enc(f)}`, `/private-assets/${enc(f)}`, `/assets-src/${enc(f)}`, `/assets-src/ai-generated/${enc(f)}`,
    `/media/${enc(f)}`, `/media/${enc(f)}?x=1`, `/media/${enc(f.toUpperCase())}`, `/media/..%2fprivate-assets%2f${enc(f)}`,
    `/media/%2e%2e/${enc(f)}`, `/media/..%2f${enc(f)}`, `/media//${enc(f)}`, `/_next/static/media/${enc(f)}`,
    `/_next/image?url=${enc("/media/" + f)}&w=640&q=75`, `/_next/image?url=${enc("/private-assets/" + f)}&w=640&q=75`,
    `/_next/image?url=${enc("/" + f)}&w=640&q=75`, `/_next/image?url=${enc("/media/" + f)}&w=3840&q=100`,
  ];
  for (const p of paths) {
    for (const h of spoof) {
      probes++;
      const r = await get(p, h);
      const served = r.status >= 200 && r.status < 300;
      const binary = /^(image|video|audio|application\/octet)/i.test(r.type);
      if (served && binary) fails.push(`${r.status} ${r.type} for ${p} ${JSON.stringify(h)}`);
    }
  }
}

// Page HTML must not name any secret file.
const pages = ["/", "/about-us", "/dr-poonam-jain", "/contact-us", "/our-services", "/stitchless-cataract-surgery", "/international-patients"];
for (const p of pages) {
  const html = await new Promise((resolve) => {
    http.get({ hostname: url.hostname, port: url.port, path: p }, (res) => {
      let s = ""; res.setEncoding("utf8"); res.on("data", (c) => (s += c)); res.on("end", () => resolve(s));
    }).on("error", () => resolve(""));
  });
  for (const f of secret) if (html.includes(f) || html.includes(enc(f))) fails.push(`page ${p} names ${f}`);
}

// Build output.
let scanned = 0;
const serverNames = new Set();
if (buildDir) {
  const hashFile = (p) => new Promise((resolve, reject) => {
    const h = createHash("sha256"); createReadStream(p).on("data", (c) => h.update(c)).on("end", () => resolve(h.digest("hex"))).on("error", reject);
  });
  const bad = new Map();
  for (const f of [...originalPaths, ...rootFiles.map((n) => path.join(root, n)), ...privateFiles.map((n) => path.join(root, "private-assets", n)), ...srcFiles.map((n) => path.join(root, "assets-src/ai-generated", n))]) {
    if (approved.has(path.basename(f))) continue;
    bad.set(await hashFile(f), path.basename(f));
  }
  const walk = async (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { await walk(p); continue; }
      scanned++;
      const size = statSync(p).size;
      if (size > 4096) { const h = await hashFile(p); if (bad.has(h)) fails.push(`build file ${p} is identical to ${bad.get(h)}`); }
      if (/\.(nft\.json|json|js|html|rsc|txt|map)$/.test(e.name) && size < 20_000_000) {
        const t = readFileSync(p, "utf8");
        // required-server-files.* echo the next.config exclusion list (names only, no content).
        const named = /required-server-files\.(js|json)$/.test(e.name) ? [] : [...secret].filter((f) => t.includes(f));
        // The asset registry (with each file's source note) is compiled into server-only chunks.
        // Names there are never sent to a browser, so they are reported as a note, not a failure.
        if (named.length && /[\\/]server[\\/](chunks|edge)[\\/].*\.(js|map)$/.test(p)) serverNames.add(path.relative(root, p));
        else if (named.length) fails.push(`build file ${p} names ${named.length} confidential file(s): ${named.slice(0, 3).join(", ")}`);
        if (/\.nft\.json$/.test(e.name) && /private-assets\/|assets-src\/|\/docs\//.test(t)) {
          const m = JSON.parse(t).files.filter((x) => /private-assets|assets-src|docs\//.test(x));
          if (m.length) fails.push(`trace ${p} packages: ${m.slice(0, 4).join(", ")}${m.length > 4 ? " …" : ""}`);
        }
      }
    }
  };
  await walk(path.resolve(root, buildDir));
}

console.log(`${secret.size} confidential files (${rootFiles.length} root originals, ${originalNames.length} originals in ${originalsDir}, ${privateFiles.filter((f) => !approved.has(f)).length} pending private assets, ${srcFiles.length} source artwork); ${probes} URL probes; ${pages.length} pages scanned${buildDir ? `; ${scanned} build files scanned` : ""}`);
if (serverNames.size) console.log(`note: file names appear only in ${serverNames.size} server-only code chunks (the asset registry), never in client files or served pages`);
if (fails.length) {
  console.error(`\nFAILED (${fails.length})\n` + fails.slice(0, 40).map((f) => " - " + f).join("\n"));
  process.exit(1);
}
console.log("No confidential media is reachable, named in a page, or present in the build output.");
