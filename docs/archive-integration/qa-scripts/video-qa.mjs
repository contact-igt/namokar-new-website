// Usage: node video-qa.mjs <base-url> <out-dir>   (needs playwright-core and a Chromium)
import { chromium } from "playwright-core";
const [base, out] = process.argv.slice(2);
const exe = process.env.CHROMIUM ?? process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const b = await chromium.launch({ executablePath: exe });
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else fail++; console.log((c ? "PASS " : "FAIL ") + m); };
const PAGES = { "/": "home", "/stitchless-cataract-surgery": "cataract", "/glaucoma-management": "glaucoma", "/comprehensive-eye-examinations": "exams", "/eyelid-surgery-blepharoplasty": "eyelid", "/aesthetic-oculofacial": "aesthetic", "/eye-plastic-reconstructive-surgery": "reconstructive", "/dr-poonam-jain": "doctor" };
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: w < 768, reducedMotion: "reduce" });
  for (const [route, name] of Object.entries(PAGES)) {
    const p = await ctx.newPage();
    const yt = []; p.on("request", (r) => /youtube|ytimg|googlevideo/.test(r.url()) && yt.push(r.url()));
    const errs = []; p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 120)));
    await p.goto(base + route, { waitUntil: "networkidle" });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } });
    await p.waitForTimeout(400);
    ok(yt.length === 0, `${w} ${name}: no request to YouTube before Play (${yt.length})`);
    ok((await p.locator("iframe").count()) === 0, `${w} ${name}: no iframe before Play`);
    ok(errs.filter((e) => !/Largest Contentful/.test(e)).length === 0, `${w} ${name}: no console errors ${errs[0] ?? ""}`);
    const hscroll = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    ok(!hscroll, `${w} ${name}: no horizontal scroll`);
    const plays = name === "home" ? p.locator(".shelf-stage button.vp-play") : p.locator("button.vp-play");
    const n = await plays.count();
    if (name !== "doctor" || true) ok(n >= 1, `${w} ${name}: ${n} Play button(s) in preview`);
    if (n) {
      const box = await plays.first().boundingBox();
      ok(box && box.height >= 44, `${w} ${name}: Play target >= 44px (${box && Math.round(box.height)})`);
      await plays.first().scrollIntoViewIfNeeded();
      await plays.first().click();
      await p.waitForSelector("iframe", { timeout: 5000 }).catch(() => {});
      const frames = await p.locator("iframe").count();
      const src = frames ? await p.locator("iframe").first().getAttribute("src") : "";
      ok(frames === 1 && /^https:\/\/www\.youtube-nocookie\.com\/embed\/[\w-]{11}\?/.test(src), `${w} ${name}: one nocookie iframe after Play (${frames}) ${src.slice(0, 60)}`);
      if (name === "home" && w === 1440) {
        // shelf: choose another video, the first player is removed, nothing autoloads
        const items = p.locator(".shelf-item");
        ok((await items.count()) === 3, "home: shelf lists 3 videos");
        await items.nth(1).click();
        await p.waitForTimeout(300);
        ok((await p.locator("iframe").count()) === 0, "home: choosing another video removes the loaded player");
        ok((await items.nth(1).getAttribute("aria-pressed")) === "true", "home: chosen item is pressed");
        await p.locator(".shelf-stage button.vp-play").click();
        await p.waitForSelector("iframe");
        const s2 = await p.locator("iframe").getAttribute("src");
        ok((await p.locator("iframe").count()) === 1 && s2.includes("C9AzcSy416o"), "home: Short loads in a single frame " + s2.slice(0, 70));
        await p.keyboard.press("Tab");
        await p.screenshot({ path: `${out}/home-shelf-playing-${w}.jpg`, type: "jpeg", quality: 70 });
      }
    }
    if (n) {
      const sec = p.locator("section:has(button.vp-play), section:has(iframe)").first();
      await sec.scrollIntoViewIfNeeded();
      await p.screenshot({ path: `${out}/${name}-video-${w}.jpg`, type: "jpeg", quality: 70 });
    }
    await p.close();
  }
  await ctx.close();
}
await b.close();
console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
