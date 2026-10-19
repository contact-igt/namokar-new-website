// Treatment explorer test matrix. Usage: node treatment-matrix.mjs <base-url> <out.json> [--no-images]
// The Next dev-only warning about the logo being the LCP image is ignored: it is a false positive
// (the header and footer share one logo file and Next keys images by src), and absent in production.
// Needs playwright-core and a Chromium headless shell (path below). Run against a build with
// ASSET_PREVIEW=on to see the photographs, or without it to test the brand-card fallback.
import { chromium } from "playwright-core";
import fs from "node:fs";
const [base, out, ...flags] = process.argv.slice(2);
const noImages = flags.includes("--no-images");
const exe = process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const b = await chromium.launch({ executablePath: exe });
const R = []; const rec = (area, name, ok, detail = "") => { R.push({ area, name, ok, detail }); console.log(`${ok ? "PASS" : "FAIL"} [${area}] ${name}${detail ? " :: " + detail : ""}`); };
const rows = [];

async function open(ctxOpts) {
  const ctx = await b.newContext(ctxOpts); const p = await ctx.newPage(); const errs = [];
  p.on("console", (m) => ["error", "warning"].includes(m.type()) && !/Download the React DevTools|HMR|WebSocket|Fast Refresh|detected as the Largest Contentful Paint/.test(m.text()) && errs.push(m.type() + ": " + m.text().slice(0, 140)));
  p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 140)));
  await p.goto(base + "/", { waitUntil: "networkidle" }); await p.waitForTimeout(700);
  return { ctx, p, errs };
}

// ---------------- Desktop 1440 (mouse + keyboard)
{
  const { ctx, p, errs } = await open({ viewport: { width: 1440, height: 900 } });
  const links = p.locator(".tx-link"); const n = await links.count();
  rec("desktop", "six treatment links present", n === 6, `${n}`);
  const meta = await links.evaluateAll((els) => els.map((e) => ({ href: e.getAttribute("href"), title: e.querySelector(".tx-title").textContent.trim() })));
  await p.locator("#find-care").scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  const srcs = new Set();
  for (let i = 0; i < n; i++) {
    await links.nth(i).hover(); await p.waitForTimeout(450);
    const info = await p.locator(".tx-info-title").textContent();
    const cta = await p.locator(".tx-cta").getAttribute("href");
    const img = await p.evaluate(() => { const e = document.querySelector('.tx-img[data-active="true"]'); if (!e) return null; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); if (e.tagName !== "IMG") return { src: "plate:" + (e.querySelector("linearGradient")?.id || "?"), nat: 1, op: cs.opacity, disp: cs.display, w: Math.round(r.width), h: Math.round(r.height), alt: "line-drawing plate" }; return { src: e.currentSrc.split("?")[0] + "|" + (new URL(e.currentSrc).searchParams.get("url") || ""), nat: e.naturalWidth, op: cs.opacity, disp: cs.display, w: Math.round(r.width), h: Math.round(r.height), alt: e.alt }; });
    const sum = (await p.locator(".tx-info-sum").textContent()).trim();
    const blocked = await links.nth(i).evaluate((e) => { const r = e.getBoundingClientRect(); const t = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return !e.contains(t); });
    rec("desktop", `${meta[i].title}: hover shows its title`, info === meta[i].title, info);
    rec("desktop", `${meta[i].title}: preview CTA points to ${meta[i].href}`, cta === meta[i].href, cta);
    rec("desktop", `${meta[i].title}: label is not covered by anything`, !blocked);
    if (!noImages) {
      rec("desktop", `${meta[i].title}: image visible and loaded`, !!img && img.nat > 0 && img.op === "1" && img.disp !== "none" && img.w > 300 && img.h > 250, img ? `${img.w}x${img.h} nat=${img.nat} alt="${img.alt.slice(0, 40)}"` : "none");
      if (img) srcs.add(img.src);
    } else rec("desktop", `${meta[i].title}: brand card shown without a photograph`, (await p.locator(".tx-card").count()) === 1 && (await p.locator(".tx-img").count()) === 0);
    rows.push({ title: meta[i].title, href: meta[i].href, summary: sum, image: img ? img.src.split("/").pop().slice(0, 60) : "brand card (no photograph cleared)", alt: img?.alt ?? "" });
  }
  if (!noImages) rec("desktop", "six different pictures (no repeated image)", srcs.size === 6, `${srcs.size} distinct`);
  // pointer moves from label into the preview: still there and clickable
  await links.nth(2).hover(); await p.waitForTimeout(300);
  const box = await p.locator(".tx-info").boundingBox();
  await p.mouse.move(box.x + 20, box.y + 20, { steps: 8 }); await p.waitForTimeout(400);
  rec("desktop", "preview stays when the pointer moves into it", (await p.locator(".tx-info-title").textContent()) === meta[2].title);
  // sweep: rapid random hovers, final state must match the last one
  let last = 0; for (let k = 0; k < 40; k++) { last = Math.floor(Math.random() * n); await links.nth(last).hover({ force: true }); await p.waitForTimeout(25); }
  await p.waitForTimeout(500);
  rec("desktop", "rapid sweep leaves the correct preview (no stale image)", (await p.locator(".tx-info-title").textContent()) === meta[last].title);
  if (!noImages) rec("desktop", "exactly one image is visible after the sweep", (await p.locator('.tx-img[data-active="true"]').count()) === 1 && (await p.locator('.tx-img[data-active="false"]').evaluateAll((e) => e.every((x) => getComputedStyle(x).opacity === "0"))));
  // click each label
  for (let i = 0; i < n; i++) {
    await p.goto(base + "/", { waitUntil: "networkidle" }); await p.locator("#find-care").scrollIntoViewIfNeeded();
    await p.locator(".tx-link").nth(i).click(); await p.waitForURL("**" + meta[i].href); await p.waitForSelector("h1"); await p.waitForTimeout(200);
    rec("desktop", `click ${meta[i].title} → ${meta[i].href}`, (await p.locator("h1:visible").count()) === 1 && (await p.title()).length > 5, p.url().replace(base, ""));
  }
  // click the preview CTA
  await p.goto(base + "/", { waitUntil: "networkidle" }); await p.locator("#find-care").scrollIntoViewIfNeeded();
  await p.locator(".tx-link").nth(4).hover(); await p.waitForTimeout(400); await p.locator(".tx-cta").click(); await p.waitForURL("**" + meta[4].href);
  rec("desktop", "preview CTA click navigates", p.url().endsWith(meta[4].href));
  // keyboard
  await p.goto(base + "/", { waitUntil: "networkidle" }); await p.locator("#find-care").scrollIntoViewIfNeeded();
  await p.locator(".tx-link").first().focus();
  const seen = [];
  for (let i = 0; i < n; i++) { seen.push(await p.locator(".tx-info-title").textContent()); await p.keyboard.press("Tab"); await p.waitForTimeout(150); }
  rec("desktop", "keyboard Tab moves the preview through all six", seen.join("|") === meta.map((m) => m.title).join("|"), seen.join(" > ").slice(0, 120));
  const ring = await p.locator(".tx-link").nth(1).evaluate((e) => { e.focus(); const o = getComputedStyle(e).outlineStyle; return o; });
  rec("desktop", "focus-visible ring on a label (keyboard)", ring !== "none", ring);
  await p.locator(".tx-link").nth(3).focus(); await p.keyboard.press("Enter"); await p.waitForURL("**" + meta[3].href);
  rec("desktop", "keyboard Enter navigates", p.url().endsWith(meta[3].href));
  rec("desktop", "no console errors or warnings", errs.length === 0, errs.slice(0, 2).join(" | "));
  await ctx.close();
}

// ---------------- Touch: phones and tablet
for (const [w, h] of [[375, 812], [390, 844], [430, 932], [768, 1024]]) {
  const { ctx, p, errs } = await open({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true });
  const A = `touch ${w}`;
  const links = p.locator(".tx-link"); const n = await links.count();
  const meta = await links.evaluateAll((els) => els.map((e) => ({ href: e.getAttribute("href"), title: e.querySelector(".tx-title").textContent.trim() })));
  await p.locator("#find-care").scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
  const stage = await p.locator(".tx-stage").evaluate((e) => getComputedStyle(e).display);
  rec(A, "card layout, no hover-only preview panel", stage === "none");
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  rec(A, "no horizontal page overflow", overflow === 0, `${overflow}`);
  const sw = await p.locator(".tx-list").evaluate((e) => ({ scroll: e.scrollWidth > e.clientWidth + 2, snap: getComputedStyle(e).scrollSnapType, mode: getComputedStyle(e).display }));
  rec(A, w < 640 ? "swipeable snap row" : "grid of cards", w < 640 ? sw.scroll && sw.snap.includes("x") : sw.mode === "grid", JSON.stringify(sw));
  const sizes = await links.evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return Math.round(Math.min(r.width, r.height)); }));
  rec(A, "every card is at least 44 px", Math.min(...sizes) >= 44, `${Math.min(...sizes)}`);
  if (!noImages) {
    const vis = await p.locator(".tx-thumb-img, .tx-thumb--plate .plate").evaluateAll((els) => els.map((e) => ({ vis: e.getBoundingClientRect().width > 100 })));
    rec(A, "every card shows its own picture", vis.length === n && vis.every((v) => v.vis), `${vis.length} pictures`);
  }
  // swipe: native scroll of the row by touch drag (only where the row scrolls)
  if (w < 640) {
    const before = await p.locator(".tx-list").evaluate((e) => e.scrollLeft);
    const cdp = await ctx.newCDPSession(p); const bx = await p.locator(".tx-list").boundingBox();
    await cdp.send("Input.synthesizeScrollGesture", { x: bx.x + bx.width / 2, y: bx.y + 120, xDistance: -260, yDistance: 0, speed: 900, gestureSourceType: "touch" }); await p.waitForTimeout(600);
    const after = await p.locator(".tx-list").evaluate((e) => e.scrollLeft);
    rec(A, "swiping moves the row without navigating", after > before + 40 && p.url() === base + "/", `${Math.round(before)} -> ${Math.round(after)}`);
  }
  // first tap on every card navigates
  for (let i = 0; i < n; i++) {
    await p.goto(base + "/", { waitUntil: "networkidle" }); await p.locator("#find-care").scrollIntoViewIfNeeded();
    await p.locator(".tx-link").nth(i).scrollIntoViewIfNeeded(); await p.locator(".tx-link").nth(i).tap(); await p.waitForURL("**" + meta[i].href, { timeout: 8000 }).catch(() => {});
    rec(A, `first tap on ${meta[i].title} navigates`, p.url().endsWith(meta[i].href), p.url().replace(base, ""));
  }
  rec(A, "no console errors or warnings", errs.length === 0, errs.slice(0, 2).join(" | "));
  await ctx.close();
}

// ---------------- Reduced motion
{
  const { ctx, p, errs } = await open({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await p.locator("#find-care").scrollIntoViewIfNeeded();
  await p.locator(".tx-link").nth(1).hover(); await p.waitForTimeout(100);
  const d = await p.locator(".tx-link").nth(1).evaluate((e) => getComputedStyle(e).transitionDuration);
  const a = await p.locator(".tx-info").evaluate((e) => getComputedStyle(e).animationName);
  rec("reduced motion", "transitions and the info animation are off", parseFloat(d) <= 0.001 && a === "none", `${d} / ${a}`);
  rec("reduced motion", "preview still switches", (await p.locator(".tx-info-title").textContent()).includes("Glaucoma"));
  rec("reduced motion", "no console errors", errs.length === 0, errs.join(" | "));
  await ctx.close();
}
await b.close();
const failed = R.filter((r) => !r.ok);
fs.writeFileSync(out, JSON.stringify({ total: R.length, failed: failed.length, rows, results: R }, null, 1));
console.log(`\n${R.length} checks, ${failed.length} failed`);
