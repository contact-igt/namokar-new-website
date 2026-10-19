#!/usr/bin/env node
/**
 * On-page SEO audit. No dependencies; talks to a running server.
 *
 *   node scripts/seo-audit.mjs http://127.0.0.1:3103            # default (review) build
 *   node scripts/seo-audit.mjs http://127.0.0.1:3104 --indexing  # launch simulation
 *
 * Checks every page reachable from "/": title and description (present, sensible length,
 * unique), one h1 and no skipped heading level, html lang, viewport, canonical, Open Graph and
 * Twitter tags, image alt text, internal links and in-page anchors, and structured data
 * (valid JSON, schema.org context, resolvable @id references, ordered breadcrumbs, and none of
 * the fields that must not be published until approved). In the launch simulation the reviews,
 * articles, video-library and legal-draft pages must stay noindex and out of the sitemap. In the default build it also asserts
 * that NO structured data is emitted. Exit code 1 on any failure; warnings do not fail.
 */
import { readFileSync, writeFileSync } from "node:fs";

const base = (process.argv.find((a) => a.startsWith("http")) ?? "http://127.0.0.1:3103").replace(/\/$/, "");
const indexing = process.argv.includes("--indexing");
const jsonOut = process.argv.includes("--json") ? process.argv[process.argv.indexOf("--json") + 1] : null;
const site = readFileSync(new URL("../src/config/site.ts", import.meta.url), "utf8");
const ORIGIN = site.match(/LIVE_ORIGIN\s*=\s*"([^"]+)"/)[1];

const dec = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"))?.[1];
const meta = (html, key, by = "name") => {
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) if (attr(m[0], by) === key) return dec(attr(m[0], "content") ?? "");
  return null;
};

// Pages that stay noindex even at launch because there is no approved content behind them yet
// (src/config/routes.ts contentReady): empty reviews and articles, and the two legal drafts.
const HELD_BACK = new Set(["/testimonials", "/blogs", "/privacy-policy", "/terms-and-conditions"]);
const FORBIDDEN = ["aggregateRating", "\"review\"", "telephone", "openingHours", "sameAs", "priceRange", "\"image\"", "alumniOf", "award", "ratingValue"];
const seeds = new Set(["/", ...[...site.matchAll(/^\s+\w+:\s*"(\/[a-z0-9\-/]*)",?$/gm)].map((m) => m[1])]);
const queue = [...seeds];
const pages = new Map();
const status = new Map();
const fails = [];
const warns = [];
const fail = (p, m) => fails.push(`${p}: ${m}`);
const warn = (p, m) => warns.push(`${p}: ${m}`);

while (queue.length) {
  const p = queue.shift();
  if (status.has(p)) continue;
  const res = await fetch(base + p, { redirect: "manual" });
  status.set(p, res.status);
  if (res.status !== 200) continue;
  const html = await res.text();
  pages.set(p, html);
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)"/g)) {
    const q = m[1].replace(/\/$/, "") || "/";
    if (!status.has(q) && !/^\/(_next|media|api)/.test(q)) queue.push(q);
  }
}

const titles = new Map(), descs = new Map();
const rows = [];
const ldIds = new Set();
const ldRefs = [];

for (const [p, html] of pages) {
  const title = dec(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = meta(html, "description");
  if (!title) fail(p, "no <title>");
  else {
    if (title.length > 65) warn(p, `title is ${title.length} chars (may be truncated): ${title}`);
    if (title.length < 15) warn(p, `title is short (${title.length})`);
    titles.set(title, [...(titles.get(title) ?? []), p]);
  }
  if (!desc) fail(p, "no meta description");
  else {
    if (desc.length > 165) warn(p, `description is ${desc.length} chars`);
    if (desc.length < 70) warn(p, `description is short (${desc.length})`);
    descs.set(desc, [...(descs.get(desc) ?? []), p]);
  }

  const headings = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  const h1s = headings.filter((h) => h === 1).length;
  if (h1s !== 1) fail(p, `${h1s} h1 elements (want 1)`);
  let prev = 0;
  for (const h of headings) {
    if (prev && h > prev + 1) { warn(p, `heading level jumps from h${prev} to h${h}`); break; }
    prev = h;
  }
  if (!/<html[^>]*\slang="en-IN"/.test(html)) fail(p, "html lang is not en-IN");
  if (!meta(html, "viewport")) fail(p, "no viewport meta");
  if ((html.match(/<main[\s>]/g) ?? []).length !== 1) fail(p, "not exactly one <main>");

  const canon = [...html.matchAll(/<link[^>]+rel="canonical"[^>]*>/gi)].map((m) => attr(m[0], "href"));
  const want = p === "/" ? ORIGIN : `${ORIGIN}${p}`;
  if (canon.length !== 1) fail(p, `${canon.length} canonical links`);
  else if (canon[0] !== want && !(p === "/" && canon[0] === `${ORIGIN}/`)) fail(p, `canonical ${canon[0]} (want ${want})`);

  for (const k of ["og:title", "og:description", "og:type", "og:url", "og:image"]) if (!meta(html, k, "property")) warn(p, `missing ${k}`);
  if (!meta(html, "twitter:card")) warn(p, "missing twitter:card");

  const robots = meta(html, "robots") ?? "";
  const wantNoindex = !indexing || HELD_BACK.has(p);
  if (wantNoindex ? !/noindex/.test(robots) : /noindex/.test(robots)) fail(p, `robots meta "${robots}" is not what this mode expects`);

  for (const m of html.matchAll(/<img\b[^>]*>/gi)) if (attr(m[0], "alt") === undefined) fail(p, "image without alt attribute");

  for (const m of html.matchAll(/<a [^>]*href="#([^"]+)"/g)) if (!html.includes(`id="${m[1]}"`)) fail(p, `anchor #${m[1]} has no target`);

  const lds = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!indexing && lds.length) fail(p, "structured data is emitted in the default (review) build");
  if (indexing && !lds.length) fail(p, "no structured data in the launch simulation");
  const types = [];
  for (const raw of lds) {
    let d;
    try { d = JSON.parse(raw); } catch { fail(p, "invalid JSON-LD"); continue; }
    if (d["@context"] !== "https://schema.org") fail(p, "JSON-LD without schema.org context");
    types.push(d["@type"]);
    for (const f of FORBIDDEN) if (raw.includes(f)) fail(p, `JSON-LD contains forbidden field ${f}`);
    if (d["@id"]) ldIds.add(d["@id"]);
    for (const m of raw.matchAll(/"@id":"([^"]+)"/g)) ldRefs.push([p, m[1]]);
    if (d["@type"] === "BreadcrumbList") {
      d.itemListElement.forEach((it, i) => it.position !== i + 1 && fail(p, "breadcrumb positions out of order"));
      if (d.itemListElement[0]?.name !== "Home") fail(p, "breadcrumb does not start at Home");
    }
    if (d["@type"] === "FAQPage") {
      const n = d.mainEntity?.length ?? 0;
      const shown = (html.match(/<details[ >]/g) ?? []).length;
      if (!n) fail(p, "FAQPage without questions");
      for (const q of d.mainEntity ?? []) if (!q.name || !q.acceptedAnswer?.text) fail(p, "FAQ question or answer is empty");
      if (shown && n !== shown) warn(p, `FAQPage lists ${n} questions, page shows ${shown}`);
    }
  }
  rows.push({ path: p, title, titleLen: title.length, descLen: desc?.length ?? 0, h1: h1s, schema: types.join(", ") || "none", robots });
}
for (const [t, ps] of titles) if (ps.length > 1) fail(ps.join(" "), `duplicate title "${t}"`);
for (const [d, ps] of descs) if (ps.length > 1) fail(ps.join(" "), `duplicate description "${d.slice(0, 50)}…"`);
for (const [p, id] of ldRefs) {
  const local = id.startsWith(ORIGIN) && (ldIds.has(id) || [...ldIds].some((x) => x === id));
  if (!local) fail(p, `JSON-LD @id reference ${id} is not defined on any page`);
}

const dead = [...status].filter(([p, s]) => s !== 200 && !["/videos", "/testimonials", "/privacy-policy", "/terms-and-conditions"].includes(p));
for (const [p, s] of dead) fail(p, `linked or listed route answers ${s}`);

const robotsTxt = await (await fetch(`${base}/robots.txt`)).text();
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
if (!indexing) {
  if (!/Disallow:\s*\/\s*$/m.test(robotsTxt)) fail("robots.txt", "does not disallow everything");
  if (/<loc>/.test(sitemap)) fail("sitemap.xml", "lists URLs while indexing is off");
} else {
  if (/Disallow:\s*\/\s*$/m.test(robotsTxt)) fail("robots.txt", "still disallows everything in the launch simulation");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!locs.length) fail("sitemap.xml", "empty in the launch simulation");
  for (const l of locs) if (!l.startsWith(ORIGIN)) fail("sitemap.xml", `URL off the production origin: ${l}`);
  for (const h of [...HELD_BACK, "/videos"]) if (locs.includes(ORIGIN + h)) fail("sitemap.xml", `lists ${h}, which must stay out until it has approved content`);
  for (const [p, s] of status) if (s === 200 && !locs.includes(p === "/" ? ORIGIN : ORIGIN + p) && !locs.includes(ORIGIN + "/")) warn("sitemap.xml", `${p} is live but not listed`);
}

console.log(`${pages.size} pages audited (${indexing ? "launch simulation" : "default review build"}); non-200: ${[...status].filter(([, s]) => s !== 200).map(([p, s]) => `${p}=${s}`).join(", ") || "none"}`);
console.log("\npath | title chars | description chars | h1 | schema types");
for (const r of rows) console.log(`${r.path} | ${r.titleLen} | ${r.descLen} | ${r.h1} | ${r.schema}`);
console.log(`\nrobots.txt: ${robotsTxt.trim().replace(/\n/g, " | ")}`);
console.log(`sitemap URLs: ${[...sitemap.matchAll(/<loc>/g)].length}`);
if (warns.length) console.log(`\nWARNINGS (${warns.length})\n` + warns.map((w) => " - " + w).join("\n"));
if (jsonOut) writeFileSync(jsonOut, JSON.stringify({ mode: indexing ? "launch-simulation" : "default", rows, warnings: warns, failures: fails }, null, 1));
if (fails.length) {
  console.error(`\nFAILED (${fails.length})\n` + fails.map((f) => " - " + f).join("\n"));
  process.exit(1);
}
console.log("\nAll SEO checks passed.");
