import { chromium } from "playwright-core";
const [base, out] = process.argv.slice(2);
const routes = ["/", "/about-us", "/dr-poonam-jain", "/our-services", "/stitchless-cataract-surgery", "/glaucoma-management", "/comprehensive-eye-examinations", "/eyelid-surgery-blepharoplasty", "/aesthetic-oculofacial", "/eye-plastic-reconstructive-surgery", "/international-patients", "/contact-us", "/testimonials", "/blogs", "/privacy-policy", "/terms-and-conditions", "/videos"];
const b = await chromium.launch({ executablePath: process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell" });
const report = [];
for (const [w, h, mobile] of [[390, 844, true], [1440, 900, false]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, reducedMotion: "reduce" });
  for (const r of routes) {
    const p = await ctx.newPage(); const errs = [];
    p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 120)));
    await p.goto(base + r, { waitUntil: "networkidle" }); await p.waitForTimeout(500);
    // trigger lazy images
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await p.waitForTimeout(600);
    const m = await p.evaluate(() => {
      const de = document.documentElement;
      const small = [...document.querySelectorAll("a,button,summary,input,select,textarea")].filter((e) => { const rc = e.getBoundingClientRect(); return rc.width > 0 && rc.height > 0 && (rc.height < 40 || rc.width < 40) && getComputedStyle(e).visibility !== "hidden" && !e.closest("[inert]") && !(e.tagName === "INPUT" && e.type === "checkbox" && e.closest("label")); }).map((e) => (e.textContent || e.getAttribute("aria-label") || e.tagName).trim().slice(0, 30) + ` ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`);
      const tiny = [...document.querySelectorAll("p,li,dd,dt,span,a,button,h1,h2,h3,figcaption,summary")].filter((e) => e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 14 && e.getBoundingClientRect().width > 0).length;
      const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length;
      return { overflow: de.scrollWidth - de.clientWidth, smallTargets: small.slice(0, 6), nSmall: small.length, tinyText: tiny, brokenImages: broken, imgs: document.images.length };
    });
    await p.screenshot({ path: `${out}/${(r === "/" ? "home" : r.slice(1))}-${w}.jpg`, fullPage: true, type: "jpeg", quality: 62 });
    report.push({ w, route: r, ...m, errors: errs.filter((e) => !/404/.test(e)).length });
    await p.close();
  }
  await ctx.close();
}
await b.close();
for (const x of report) console.log(`${x.w} ${x.route.padEnd(36)} overflow=${x.overflow} tinyText=${x.tinyText} broken=${x.brokenImages} imgs=${x.imgs} small=${x.nSmall}${x.nSmall ? " [" + x.smallTargets.join("; ") + "]" : ""} err=${x.errors}`);
