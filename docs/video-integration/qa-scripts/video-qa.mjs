// Usage: node video-qa.mjs <preview-url> <screenshot-dir>   (playwright-core + a Chromium; set CHROMIUM to override)
import { chromium } from "playwright-core";
const [base, out] = process.argv.slice(2);
const exe = process.env.CHROMIUM ?? process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const b = await chromium.launch({ executablePath: exe });
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else fail++; if (!c || process.env.VERBOSE) console.log((c ? "PASS " : "FAIL ") + m); };

// Expected players per route in the local review preview (titles as shown on the site).
const EXPECT = {
  "/": ["A closer look inside Namokar", "Dr. Poonam Jain talks about cataract surgery", "Why I became an eye surgeon"],
  "/stitchless-cataract-surgery": ["Dr. Poonam Jain talks about cataract surgery", "Cataract surgery: when to consider it"],
  "/glaucoma-management": ["Four misconceptions about glaucoma", "What is glaucoma?"],
  "/comprehensive-eye-examinations": ["Do your eyes feel tired after long screen time?", "Blurry distance vision"],
  "/eyelid-surgery-blepharoplasty": ["Blepharoplasty: eyelid lift surgery", "Heavy, hooded upper eyelids"],
  "/eye-plastic-reconstructive-surgery": ["Entropion surgery", "lower eyelid turning inward"],
  "/aesthetic-oculofacial": ["Dark circles", "under-eye trend"],
  "/dr-poonam-jain": ["Why I became an eye surgeon"],
  "/about-us": ["A closer look inside Namokar"],
};
const SENSITIVE = ["/eye-plastic-reconstructive-surgery", "/eyelid-surgery-blepharoplasty"];
const NONE = ["/contact-us", "/international-patients", "/our-services"];

for (const [w, h] of [[375, 812], [390, 844], [768, 1024], [1440, 900]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: w < 768 });
  for (const route of [...Object.keys(EXPECT), ...NONE]) {
    const p = await ctx.newPage();
    const yt = []; p.on("request", (r) => /youtube|ytimg|googlevideo/.test(r.url()) && yt.push(r.url()));
    const errs = []; p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 120)));
    await p.goto(base + route, { waitUntil: "networkidle" });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } });
    await p.waitForTimeout(300);
    const tag = `${w} ${route}`;
    ok(yt.length === 0, `${tag}: no request to YouTube before Play`);
    ok((await p.locator("iframe").count()) === 0, `${tag}: no iframe before Play`);
    ok(errs.length === 0, `${tag}: no console errors ${errs[0] ?? ""}`);
    ok(!(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)), `${tag}: no horizontal scroll`);
    ok((await p.locator("h1:visible").count()) === 1, `${tag}: one h1`);
    if (NONE.includes(route)) {
      ok((await p.locator("button.vp-play").count()) === 0, `${tag}: no video on this page`);
    } else if (w === 1440 || w === 390) {
      // the homepage shelf stages one video and lists the others as cards
      const all = route === "/"
        ? [...(await p.locator("button.vp-play").evaluateAll((els) => els.map((e) => e.getAttribute("aria-label") ?? ""))), ...(await p.locator(".shelf-title").allTextContents())]
        : await p.locator("button.vp-play").evaluateAll((els) => els.map((e) => e.getAttribute("aria-label") ?? ""));
      for (const needle of EXPECT[route]) ok(all.some((l) => l.includes(needle)), `${tag}: shows "${needle}"`);
      // format: portrait frame for 9:16, landscape for 16:9; never stretched or cropped by the wrong shape
      const frames = await p.locator(".vp-frame").evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return { v: e.classList.contains("vp-frame--v"), w: r.width, h: r.height }; }));
      for (const f of frames) ok(f.v ? f.h > f.w && f.w <= 361 : f.w > f.h, `${tag}: ${f.v ? "vertical" : "landscape"} frame is ${Math.round(f.w)}x${Math.round(f.h)}`);
      const btns = await p.locator("button.vp-play").evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); }));
      ok(btns.every((m) => m >= 44), `${tag}: every Play target >= 44px`);
      if (SENSITIVE.includes(route)) ok((await p.locator(".vp-warn").count()) >= 1, `${tag}: procedure note before Play`);
      // watch links
      const links = await p.locator("a[href^='https://www.youtube.com/watch?v=']").evaluateAll((a) => a.map((x) => x.getAttribute("href")));
      ok(links.every((l) => /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/.test(l)), `${tag}: Watch on YouTube links are exact (${links.length})`);
    }
    await p.close();
  }
  await ctx.close();
}

// ---- interaction: keyboard, embed denied, reduced motion, shelf (desktop and phone)
for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(base + "/stitchless-cataract-surgery", { waitUntil: "networkidle" });
  const play = p.locator("button.vp-play").first();
  await play.scrollIntoViewIfNeeded();
  await play.focus();
  const outline = await play.evaluate((e) => getComputedStyle(e).outlineStyle);
  ok(outline !== "none", `${w} keyboard: Play shows a focus outline`);
  await p.keyboard.press("Enter");
  await p.waitForSelector("iframe", { timeout: 5000 }).catch(() => {});
  const src = await p.locator("iframe").first().getAttribute("src").catch(() => "");
  ok(/^https:\/\/www\.youtube-nocookie\.com\/embed\/kX04UgyjkWo\?/.test(src ?? ""), `${w} keyboard: Enter loads the privacy-enhanced player ${String(src).slice(0, 56)}`);
  ok((await p.locator("iframe").getAttribute("title")) === "Dr. Poonam Jain talks about cataract surgery", `${w} iframe has a title`);
  const reduced = await p.evaluate(() => getComputedStyle(document.querySelector(".vp-yt-poster, .vp-frame") ?? document.body).transitionDuration);
  ok(!reduced || parseFloat(reduced) <= 0.001, `${w} reduced motion: poster transition is effectively off (${reduced})`);
  await p.screenshot({ path: `${out}/cataract-playing-${w}.jpg`, type: "jpeg", quality: 70 });
  await p.close();

  // embed denied (the iframe request is blocked): the player area stays and the YouTube link is there
  const q = await ctx.newPage();
  await q.route(/youtube-nocookie\.com/, (r) => r.abort());
  await q.goto(base + "/eyelid-surgery-blepharoplasty", { waitUntil: "networkidle" });
  const pb = q.locator("button.vp-play").first(); await pb.scrollIntoViewIfNeeded(); await pb.click();
  await q.waitForTimeout(800);
  ok((await q.locator("a:has-text('Watch on YouTube')").first().isVisible()), `${w} embed blocked: Watch on YouTube link stays visible`);
  ok((await q.locator("a:has-text('Watch on YouTube')").first().getAttribute("href")) === "https://www.youtube.com/watch?v=ZfZpmkXPa4k", `${w} embed blocked: link goes to the exact video`);
  await q.close();

  // home shelf
  const s = await ctx.newPage();
  await s.goto(base + "/", { waitUntil: "networkidle" });
  const items = s.locator(".shelf-item");
  ok((await items.count()) === 3, `${w} home shelf: 3 cards`);
  ok((await s.locator(".shelf-learn").count()) === 1, `${w} home shelf: link-through to the topic page`);
  await items.nth(1).scrollIntoViewIfNeeded(); await items.nth(1).focus(); await s.keyboard.press("Enter");
  ok((await items.nth(1).getAttribute("aria-pressed")) === "true", `${w} home shelf: Enter selects a card`);
  ok((await s.locator("iframe").count()) === 0, `${w} home shelf: selecting does not load YouTube`);
  await s.locator(".shelf-stage button.vp-play").click();
  await s.waitForSelector("iframe");
  ok((await s.locator("iframe").count()) === 1, `${w} home shelf: one frame after Play`);
  await items.nth(2).click();
  ok((await s.locator("iframe").count()) === 0, `${w} home shelf: choosing another card removes the loaded frame`);
  await s.screenshot({ path: `${out}/home-shelf-${w}.jpg`, type: "jpeg", quality: 70 });
  await s.close();
  await ctx.close();
}
await b.close();
console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
