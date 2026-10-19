import { chromium } from "playwright-core";
const [base, path, out, ...widths] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell" });
for (const w of (widths.length ? widths : ["390", "1440"]).map(Number)) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 768, hasTouch: w < 768 });
  const p = await ctx.newPage(); const errs = [];
  p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 160)));
  p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 160)));
  await p.goto(base + path, { waitUntil: "networkidle" }); await p.waitForTimeout(800);
  const ids = await p.$$eval("[data-figure]", (els) => els.map((e) => e.getAttribute("data-figure")));
  for (const id of ids) { await p.locator(`[data-figure="${id}"]`).screenshot({ path: `${out}/${path.slice(1)}-${id}-${w}.png` }); }
  console.log(w, "figures:", ids.join(","), "errors:", errs.length, errs.slice(0, 3).join(" | "));
  await ctx.close();
}
await b.close();
