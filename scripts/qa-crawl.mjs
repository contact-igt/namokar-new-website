#!/usr/bin/env node
/**
 * Route and media-permission check. No dependencies; talks to a running server.
 *
 *   npm run build && npx next start -p 3103 &
 *   node scripts/qa-crawl.mjs http://127.0.0.1:3103
 *
 * 1. Crawls every internal link from "/" and reports any that is not 200.
 * 2. Scans every page's HTML for the filenames of assets that are still pending.
 * 3. Requests each pending asset through every URL a visitor might guess, expecting 404.
 * 4. Reports robots.txt, sitemap.xml, noindex meta, and any Set-Cookie header.
 * Exit code 1 if anything fails.
 */
import { readFileSync } from "node:fs";

const base = (process.argv[2] ?? "http://127.0.0.1:3103").replace(/\/$/, "");
const registry = readFileSync(new URL("../src/config/assets.ts", import.meta.url), "utf8");
const assets = [...registry.matchAll(/file:\s*"([^"]+)"[\s\S]*?approved:\s*(true|false)/g)].map((m) => ({
  file: m[1],
  approved: m[2] === "true",
}));
const pending = assets.filter((a) => !a.approved).map((a) => a.file);

const videoSrc = readFileSync(new URL("../src/content/videos.ts", import.meta.url), "utf8");
const pendingYouTube = [...videoSrc.matchAll(/\byt\(\s*"([\w-]{11})"/g)].map((m) => m[1]); // all entries default to approved:false

let failures = 0;
const fail = (msg) => {
  failures++;
  console.log("  FAIL", msg);
};
const get = (p, init) => fetch(base + p, { redirect: "manual", ...init });

// 1. crawl
const seen = new Map();
// Seed with every route in the registry too, so pages that are not linked from anywhere are checked.
const siteSrc = readFileSync(new URL("../src/config/site.ts", import.meta.url), "utf8");
const linksBlock = siteSrc.match(/export const LINKS = \{([\s\S]*?)\} as const;/)?.[1] ?? "";
const registryPaths = [...linksBlock.matchAll(/:\s*"(\/[a-z-]*)"/g)].map((m) => m[1]);
const queue = ["/", ...registryPaths];
const external = new Set();
const cookies = new Set();
const html = new Map();
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  const res = await get(path);
  seen.set(path, res.status);
  if (res.headers.get("set-cookie")) cookies.add(path);
  if (res.status !== 200) continue;
  const text = await res.text();
  html.set(path, text);
  for (const m of text.matchAll(/href="([^"#]+)(?:#[^"]*)?"/g)) {
    const h = m[1].replace(/&amp;/g, "&");
    if (h.startsWith("/") && !h.startsWith("//") && !h.startsWith("/_next") && !/\.(png|ico|webp|xml|txt)$/.test(h)) queue.push(h.replace(/\/$/, "") || "/");
    else if (/^https?:/.test(h)) external.add(h.split("/").slice(0, 3).join("/"));
  }
}
console.log(`Crawled ${seen.size} internal pages (${registryPaths.length} from the route registry)`);
for (const [bad, want] of [["/does-not-exist", 404], ["/blogs/not-a-real-article", 404], ["/videos", 404], ["/testimonials", 404]]) {
  const r = await get(bad);
  console.log(`  ${r.status} ${bad} (expected ${want})`);
  if (r.status !== want) fail(`${bad} returned ${r.status}, expected ${want}`);
}
for (const [p, s] of [...seen].sort()) console.log(`  ${s} ${p}`);
// /videos and /testimonials are withheld on purpose (404): see REVIEWS_ALLOWED and the video library gate.
for (const [p, s] of seen) if (s !== 200 && !(s === 404 && ["/testimonials", "/videos"].includes(p))) fail(`${p} returned ${s}`);

// 2. pending names in HTML
for (const [p, text] of html) {
  for (const f of pending) if (text.includes(f)) fail(`${p} mentions pending asset ${f}`);
  for (const id of pendingYouTube) if (text.includes(id)) fail(`${p} contains pending YouTube ID ${id}`);
  if (/youtube(-nocookie)?\.com\/embed|ytimg\.com|youtu\.be/.test(text)) fail(`${p} references a YouTube embed or thumbnail host`);
  if (/\/media\/[a-z0-9-]+\.(webp|mp4)/i.test(text) && pending.length === assets.length - 1)
    fail(`${p} references /media/ although nothing is approved`);
}

// 3. direct and indirect URL probes
const probes = [];
for (const f of pending) {
  probes.push(`/media/${f}`, `/images/${f}`, `/video/${f}`, `/private-assets/${f}`, `/${f}`);
  probes.push(`/_next/image?url=${encodeURIComponent(`/media/${f}`)}&w=640&q=75`);
  probes.push(`/_next/image?url=${encodeURIComponent(`/images/${f}`)}&w=640&q=75`);
}
probes.push("/media/../package.json", "/media/%2e%2e%2fpackage.json", "/media/..%2f..%2f.env", "/private-assets/");
for (const u of probes) {
  const r = await get(u);
  if (r.status === 200) fail(`pending media reachable: ${u}`);
}
console.log(`Probed ${probes.length} guessable media URLs for ${pending.length} pending assets`);

// 4. robots, sitemap, noindex
const robots = await (await get("/robots.txt")).text();
console.log("robots.txt:", robots.replace(/\n+/g, " | ").trim());
const sm = await get("/sitemap.xml");
console.log("sitemap.xml status", sm.status, "urls:", ((await sm.text()).match(/<loc>/g) ?? []).length);
let noindex = 0;
for (const [, text] of html) if (/<meta name="robots" content="noindex/.test(text)) noindex++;
console.log(`${noindex}/${html.size} pages carry a noindex robots meta tag`);
if (cookies.size) fail(`Set-Cookie sent by ${[...cookies].join(", ")}`);
console.log("External hosts linked:", [...external].join(", ") || "none");

console.log(failures ? `\n${failures} FAILURE(S)` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
