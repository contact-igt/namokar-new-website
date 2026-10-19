import { chromium } from "playwright-core";
const [base, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell" });
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else fail++; console.log((c ? "PASS " : "FAIL ") + m); };
const routes = ["/", "/about-us", "/dr-poonam-jain", "/our-services", "/stitchless-cataract-surgery", "/glaucoma-management", "/comprehensive-eye-examinations", "/eyelid-surgery-blepharoplasty", "/aesthetic-oculofacial", "/eye-plastic-reconstructive-surgery", "/international-patients", "/contact-us"];
for (const [w, h, mob] of [[390, 844, true], [1440, 900, false]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob });
  for (const r of routes) {
    const p = await ctx.newPage(); const errs = []; const media = [];
    p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 100)));
    p.on("request", (q) => { const u = new URL(q.url()); if (u.pathname.startsWith("/media/") || /youtube|ytimg|googlevideo/.test(u.hostname) || /url=%2Fmedia%2F/.test(u.search)) media.push(q.url()); });
    await p.goto(base + r, { waitUntil: "networkidle" });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } });
    await p.waitForTimeout(500);
    const t = `${w} ${r}`;
    const o = await p.evaluate(() => ({ h1: [...document.querySelectorAll("h1")].filter((e) => e.offsetParent).length, over: document.documentElement.scrollWidth - innerWidth, badge0: 0, badge: !!document.querySelector(".review-badge"), tel: [...document.querySelectorAll("a[href^='tel:']")].map((a) => a.getAttribute("href")), imgs: document.images.length, broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length, bar: !!document.querySelector(".qa-bar") && getComputedStyle(document.querySelector(".qa-bar")).display !== "none", text: document.body.innerText }));
    ok(o.h1 === 1 && o.over <= 0 && errs.length === 0, `${t}: one h1, no overflow, no console errors ${errs[0] ?? ""}`);
    ok(!o.badge && media.length === 0 && o.broken === 0, `${t}: no review badge (${o.badge}), no /media or YouTube request (${media.length}), no broken image (${o.broken} of ${o.imgs})`);
    ok(o.tel.length > 0 && o.tel.every((x) => x === "tel:+919810419720"), `${t}: tel links all use the one configured number (${[...new Set(o.tel)].join(",")})`);
    ok(o.bar === mob, `${t}: phone action bar ${mob ? "shown" : "hidden"}`);
    ok(!/healix|michael reynolds|lorem ipsum|25\+|28\+|nabh|cashless|ayushman|emi\b|free consultation|crystal|painless|best |leading|guarantee/i.test(o.text), `${t}: none of the risky or template phrases appear in the visible text`);
    if ((r === "/" || r === "/contact-us" || r === "/dr-poonam-jain")) await p.screenshot({ path: `${out}/${r === "/" ? "home" : r.slice(1)}-${w}.jpg`, type: "jpeg", quality: 70 });
    await p.close();
  }
  await ctx.close();
}
await b.close(); console.log(`\n${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
