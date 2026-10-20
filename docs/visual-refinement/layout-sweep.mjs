import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell" });
const routes = ["/our-services", "/international-patients", "/contact-us", "/", "/stitchless-cataract-surgery", "/glaucoma-management", "/comprehensive-eye-examinations", "/eyelid-surgery-blepharoplasty", "/aesthetic-oculofacial", "/eye-plastic-reconstructive-surgery", "/about-us", "/dr-poonam-jain"];
let bad = 0;
for (const w of [320, 375, 430, 768, 1024]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 800 }, isMobile: w < 768, hasTouch: w < 768 });
  for (const r of routes) {
    const p = await ctx.newPage(); await p.goto("http://127.0.0.1:3100" + r, { waitUntil: "networkidle" });
    const o = await p.evaluate(() => ({ h: document.documentElement.scrollWidth - innerWidth, small: [...document.querySelectorAll("button,a")].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && b.height < 44 && getComputedStyle(e).display !== "inline" && e.closest(".shelf, .vp"); }).length, h1: [...document.querySelectorAll("h1")].filter((e) => e.offsetParent).length, bar: (() => { const b = document.querySelector(".qa-mobile"); return b ? getComputedStyle(b).display !== "none" : false; })(), barH: (() => { const b = document.querySelector(".qa-mobile"); return b ? Math.round(b.getBoundingClientRect().height) : 0; })(), btn: Math.min(...[...document.querySelectorAll(".qa-mobile__item")].map((e) => e.getBoundingClientRect().height)) }));
    if ((w < 768) !== o.bar) { bad++; console.log("BAR", w, r, o.bar); }
    if (o.bar && o.btn < 44) { bad++; console.log("BARBTN", w, r, o.btn); }
    if (o.h > 1 || o.small || o.h1 !== 1) { bad++; console.log("ISSUE", w, r, o); }
    await p.close();
  }
  await ctx.close();
}
await b.close(); console.log(bad ? bad + " issues" : "no horizontal scroll, one h1, video tap targets >= 44px at 320/375/430/768/1024");
