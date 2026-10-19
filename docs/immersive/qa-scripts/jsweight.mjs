import { chromium } from "playwright-core";
const base = process.argv[2]; const routes = process.argv.slice(3);
const b = await chromium.launch({ executablePath: process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell" });
for (const r of routes) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  await p.goto(base + r, { waitUntil: "networkidle" }); await p.waitForTimeout(1200);
  const x = await p.evaluate(() => { const e = performance.getEntriesByType("resource"); const js = e.filter((x) => /\.js(\?|$)/.test(x.name)); return { files: js.length, kb: Math.round(js.reduce((a, x) => a + x.encodedBodySize, 0) / 1024), css: Math.round(e.filter((x) => /\.css/.test(x.name)).reduce((a, x) => a + x.encodedBodySize, 0) / 1024) }; });
  console.log(r.padEnd(40), `JS ${x.kb} KB gzip/brotli (encoded) in ${x.files} files, CSS ${x.css} KB`);
  await ctx.close();
}
await b.close();
