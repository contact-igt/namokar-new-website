import { chromium } from "playwright-core";
const [base, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell" });
const results = [];
for (const [w, h, mobile] of [[390, 844, true], [1440, 900, false]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  const errors = [];
  p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  const activeTab = async () => p.evaluate(() => [...document.querySelectorAll(".slide-tab")].findIndex((t) => t.getAttribute("aria-pressed") === "true"));
  const heading = async () => p.evaluate(() => document.querySelector('.slide[data-active="true"] .hero-title')?.textContent);
  const sel = ".hero";
  for (let i = 0; i < 4; i++) {
    if (i > 0) { await p.click('button[aria-label="Next photograph"]'); await p.waitForTimeout(900); }
    await p.locator(sel).screenshot({ path: `${out}/${w}-slide-${i + 1}.png` });
    results.push({ w, step: `next → slide ${i + 1}`, tab: await activeTab(), heading: await heading() });
  }
  // wrap-around
  await p.click('button[aria-label="Next photograph"]'); await p.waitForTimeout(900);
  results.push({ w, step: "next from 4 wraps to 1", tab: await activeTab() });
  // previous
  await p.click('button[aria-label="Previous photograph"]'); await p.waitForTimeout(900);
  results.push({ w, step: "previous from 1 wraps to 4", tab: await activeTab() });
  // tab click
  await p.click(".slide-tab >> nth=1"); await p.waitForTimeout(900);
  results.push({ w, step: "tab 2 click", tab: await activeTab(), heading: await heading() });
  // keyboard
  await p.focus(".hero-track"); await p.keyboard.press("ArrowRight"); await p.waitForTimeout(900);
  results.push({ w, step: "ArrowRight on track from 2", tab: await activeTab() });
  // swipe emulation: scroll the track by one viewport width
  await p.evaluate(() => { const t = document.querySelector(".hero-track"); t.scrollTo({ left: t.clientWidth * 3, behavior: "instant" }); });
  await p.waitForTimeout(500);
  results.push({ w, step: "manual scroll to slide 4", tab: await activeTab(), heading: await heading() });
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const ctrl = await p.evaluate(() => [...document.querySelectorAll(".hero-ctrl,.slide-tab")].map((e) => { const r = e.getBoundingClientRect(); return Math.round(Math.min(r.width, r.height)); }));
  results.push({ w, step: "layout", horizontalOverflow: overflow, minTapTarget: Math.min(...ctrl), consoleErrors: errors.length });
  await ctx.close();
}
console.log(JSON.stringify(results, null, 1));
await b.close();
