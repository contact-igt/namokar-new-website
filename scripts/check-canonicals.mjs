#!/usr/bin/env node
/**
 * Canonical and robots consistency check. No dependencies; talks to a running server.
 *
 *   npm run build && npx next start -p 3103 &
 *   node scripts/check-canonicals.mjs http://127.0.0.1:3103
 *
 * For every page reachable from "/" (plus every route in src/config/site.ts) that answers 200:
 *  - exactly one <link rel="canonical">;
 *  - it is absolute, https, on the production origin from src/config/site.ts, with no query,
 *    no fragment and no trailing slash;
 *  - it equals the page's own path (a page must not point at another page); for the home page
 *    Next.js emits the bare origin, which is the same URL as origin + "/", so both are accepted;
 *  - og:url, when present, equals the canonical;
 *  - the robots meta is noindex,nofollow unless the server runs with ALLOW_INDEXING=on
 *    (pass --indexing to expect the opposite, only for a deliberate launch check);
 *  - robots.txt and sitemap.xml are consistent with that expectation.
 * Exit code 1 if anything fails.
 */
import { readFileSync } from "node:fs";

const base = (process.argv[2] ?? "http://127.0.0.1:3103").replace(/\/$/, "");
const expectIndexing = process.argv.includes("--indexing");
const site = readFileSync(new URL("../src/config/site.ts", import.meta.url), "utf8");
const ORIGIN = site.match(/LIVE_ORIGIN\s*=\s*"([^"]+)"/)?.[1];
if (!ORIGIN) throw new Error("Could not read LIVE_ORIGIN from src/config/site.ts");

const seeds = new Set(["/", "/videos", ...[...site.matchAll(/^\s+\w+:\s*"(\/[a-z0-9\-/]*)",?$/gm)].map((m) => m[1])]);
const seen = new Map();
const queue = [...seeds];
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1];
const HELD_BACK = new Set(["/testimonials", "/blogs", "/privacy-policy", "/terms-and-conditions"]); // noindex until they hold approved content
const fails = [];
const fail = (msg) => fails.push(msg);

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  const res = await fetch(base + path, { redirect: "manual" });
  seen.set(path, res.status);
  if (res.status !== 200) continue;
  const html = await res.text();
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)"/g)) {
    const p = m[1].replace(/\/$/, "") || "/";
    if (!seen.has(p) && !p.startsWith("/_next") && !p.startsWith("/media") && !p.startsWith("/api")) queue.push(p);
  }

  const canon = [...html.matchAll(/<link[^>]+rel="canonical"[^>]*>/gi)].map((m) => attr(m[0], "href"));
  const want = path === "/" ? ORIGIN : `${ORIGIN}${path}`;
  if (canon.length !== 1) fail(`${path}: ${canon.length} canonical links (want 1)`);
  else {
    const c = canon[0];
    if (c !== want && !(path === "/" && c === `${ORIGIN}/`)) fail(`${path}: canonical ${c} (want ${want})`);
    if (!c.startsWith("https://")) fail(`${path}: canonical is not https`);
    if (/[?#]/.test(c)) fail(`${path}: canonical has a query or fragment`);
    if (path !== "/" && c.endsWith("/")) fail(`${path}: canonical has a trailing slash`);
  }
  for (const m of html.matchAll(/<meta[^>]+property="og:url"[^>]*>/gi)) {
    const u = attr(m[0], "content");
    if (canon[0] && u !== canon[0]) fail(`${path}: og:url ${u} differs from canonical ${canon[0]}`);
  }
  const robots = [...html.matchAll(/<meta[^>]+name="robots"[^>]*>/gi)].map((m) => attr(m[0], "content")).join(" ; ");
  const noindex = /noindex/.test(robots) && /nofollow/.test(robots);
  if (!expectIndexing && !noindex) fail(`${path}: robots meta is "${robots}" (want noindex, nofollow)`);
  if (expectIndexing && /noindex/.test(robots) && !HELD_BACK.has(path)) fail(`${path}: noindex while indexing was expected`);
}

const robotsTxt = await (await fetch(`${base}/robots.txt`)).text();
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
if (!expectIndexing) {
  if (!/Disallow:\s*\/\s*$/m.test(robotsTxt)) fail("robots.txt does not disallow everything");
  if (/<loc>/.test(sitemap)) fail("sitemap.xml lists URLs while indexing is off");
}

const ok = [...seen].filter(([, s]) => s === 200).length;
console.log(`origin ${ORIGIN}; ${ok} pages checked, ${seen.size - ok} non-200 (hidden or 404): ${[...seen].filter(([, s]) => s !== 200).map(([p, s]) => `${p}=${s}`).join(", ") || "none"}`);
console.log(`robots.txt: ${robotsTxt.trim().replace(/\n/g, " | ")}`);
console.log(`sitemap.xml: ${/<loc>/.test(sitemap) ? "lists URLs" : "empty"}`);
if (fails.length) {
  console.error(`\nFAILED (${fails.length})\n` + fails.map((f) => " - " + f).join("\n"));
  process.exit(1);
}
console.log("\nAll canonical, og:url and robots checks passed.");
