import { chromium } from "playwright-core";
import fs from "node:fs";
const [base, outFile] = process.argv.slice(2);
const exe = process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const b = await chromium.launch({ executablePath: exe });
const results = [];
const rec = (area, name, ok, detail = "") => { results.push({ area, name, ok, detail }); console.log(`${ok ? "PASS" : "FAIL"} [${area}] ${name}${detail ? " :: " + detail : ""}`); };

async function ctxFor(kind) {
  const o = kind === "mobile" ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : kind === "reduced" ? { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" } : { viewport: { width: 1440, height: 900 } };
  const ctx = await b.newContext(o); const p = await ctx.newPage(); const errs = [];
  p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 140)));
  p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 140)));
  return { ctx, p, errs };
}
const fig = (p, id) => p.locator(`[data-figure="${id}"]`);
const press = async (kind, p, loc) => (kind === "mobile" ? loc.tap() : loc.click());
const wait = (p, ms = 500) => p.waitForTimeout(ms);

for (const kind of ["desktop", "mobile"]) {
  const { ctx, p, errs } = await ctxFor(kind);
  const A = `cataract/${kind}`;
  await p.goto(base + "/stitchless-cataract-surgery", { waitUntil: "networkidle" }); await wait(p, 600);

  // Eye diagram
  let f = fig(p, "eyeAnatomy");
  await f.scrollIntoViewIfNeeded();
  await press(kind, p, f.getByRole("button", { name: "Cornea" })); await wait(p, 400);
  rec(A, "eye diagram: choosing Cornea shows its definition", (await f.locator(".clin-panel-h").textContent()) === "Cornea");
  await press(kind, p, f.getByRole("button", { name: "Clouded lens (cataract)" })); await wait(p, 400);
  rec(A, "eye diagram: clouded lens toggle", (await f.locator(".clin-cue").textContent()).includes("scattered"));
  // keyboard: focus a part button and press Space/Enter
  await f.getByRole("button", { name: "Retina" }).focus(); await p.keyboard.press("Enter"); await wait(p, 300);
  rec(A, "eye diagram: Enter on a focused part button", (await f.locator(".clin-panel-h").textContent()) === "Retina");

  // Lens compare
  f = fig(p, "lensCompare"); await f.scrollIntoViewIfNeeded();
  const cut = () => f.locator(".clin-compare").evaluate((e) => e.style.getPropertyValue("--cut"));
  const c0 = await cut();
  await f.locator('input[type="range"]').focus(); await p.keyboard.press("ArrowRight"); await p.keyboard.press("ArrowRight"); await wait(p, 200);
  rec(A, "lens compare: keyboard moves the slider", (await cut()) !== c0, `${c0} -> ${await cut()}`);
  const box = await f.locator(".lc-stage").boundingBox();
  if (kind === "desktop") { await p.mouse.move(box.x + box.width * 0.5, box.y + 40); await p.mouse.down(); await p.mouse.move(box.x + box.width * 0.2, box.y + 40, { steps: 6 }); await p.mouse.up(); }
  else { await p.touchscreen.tap(box.x + box.width * 0.2, box.y + 60); }
  await wait(p, 200);
  const cutNow = parseFloat(await cut());
  rec(A, `lens compare: ${kind === "desktop" ? "drag" : "tap"} sets the divider`, cutNow < 30, `cut=${cutNow.toFixed(0)}%`);
  await press(kind, p, f.getByRole("button", { name: "More advanced" })); await wait(p, 200);
  rec(A, "lens compare: severity changes blur", (await f.locator(".clin-compare").evaluate((e) => e.style.getPropertyValue("--blur"))) === "4px");

  // Lens designs
  f = fig(p, "lensDesigns"); await f.scrollIntoViewIfNeeded();
  await press(kind, p, f.getByRole("button", { name: "Multifocal" })); await wait(p, 500);
  rec(A, "lens designs: multifocal tab changes the description", (await f.locator(".clin-panel-h").textContent()).includes("More than one"));
  await press(kind, p, f.getByRole("button", { name: "Toric" })); await wait(p, 500);
  rec(A, "lens designs: toric tab", (await f.locator(".clin-panel-h").textContent()).includes("astigmatism"));
  await press(kind, p, f.getByRole("button", { name: "EDOF" })); await wait(p, 500);
  rec(A, "lens designs: EDOF tab", (await f.locator(".clin-panel-h").textContent()).includes("extended range"));

  // Cataract steps
  f = fig(p, "cataractSteps"); await f.scrollIntoViewIfNeeded();
  const stepTxt = () => f.locator(".clin-step-n").textContent();
  rec(A, "steps: starts at step 1 and does not move by itself", (await stepTxt()).includes("Step 1 of 4"));
  await wait(p, 3500);
  rec(A, "steps: still step 1 after 3.5 s (no autoplay)", (await stepTxt()).includes("Step 1 of 4"));
  await press(kind, p, f.getByRole("button", { name: "Next", exact: true })); await wait(p, 600);
  rec(A, "steps: Next goes to step 2", (await stepTxt()).includes("Step 2 of 4"));
  await press(kind, p, f.getByRole("button", { name: "Previous", exact: true })); await wait(p, 600);
  rec(A, "steps: Previous goes back to step 1", (await stepTxt()).includes("Step 1 of 4"));
  await press(kind, p, f.getByRole("button", { name: "Play", exact: true })); await wait(p, 3400);
  rec(A, "steps: Play advances by itself", !(await stepTxt()).includes("Step 1 of 4"), await stepTxt());
  await press(kind, p, f.getByRole("button", { name: "Pause", exact: true })); const held = await stepTxt(); await wait(p, 3500);
  rec(A, "steps: Pause holds the step", (await stepTxt()) === held);
  await f.getByRole("button", { name: /Step 4:/ }).focus(); await p.keyboard.press("Enter"); await wait(p, 500);
  rec(A, "steps: keyboard Enter on step 4 button", (await stepTxt()).includes("Step 4 of 4"));
  rec(A, "steps: Replay offered at the end", (await f.getByRole("button", { name: "Replay" }).count()) === 1);

  // Tap-target audit for every interactive element in every figure on the page
  const small = await p.$$eval("[data-figure] button, [data-figure] input, [data-figure] label", (els) => els.filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && Math.min(r.width, r.height) < 43.5 && !e.closest("[aria-hidden='true']") && !(e.tagName === "INPUT" && e.type === "checkbox"); }).map((e) => `${e.tagName} ${e.textContent?.trim().slice(0, 20)} ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`));
  rec(A, "all figure controls are at least 44 px", small.length === 0, small.slice(0, 4).join("; "));
  rec(A, "no console errors", errs.length === 0, errs.slice(0, 2).join(" | "));
  await ctx.close();
}

// Other pages: one assertion per figure
const others = [
  ["/glaucoma-management", "glaucomaFlow", "Drainage slowed", (t) => t.includes("slows")],
  ["/glaucoma-management", "sideVision", "Advanced narrowing", (t) => t.includes("Much of the side vision")],
  ["/comprehensive-eye-examinations", "examParts", "The back of the eye", (t) => t.includes("retina")],
  ["/eyelid-surgery-blepharoplasty", "eyelidPosition", "Drooping", (t) => t.includes("ptosis")],
  ["/eye-plastic-reconstructive-surgery", "tearPathway", "Puncta", (t) => t.includes("tiny openings")],
  ["/eye-plastic-reconstructive-surgery", "lidMalposition", "Turning in", (t) => t.includes("inwards")],
];
for (const kind of ["desktop", "mobile"]) {
  const { ctx, p, errs } = await ctxFor(kind);
  for (const [path, id, btn, test] of others) {
    await p.goto(base + path, { waitUntil: "networkidle" }); await wait(p, 400);
    const f = fig(p, id); await f.scrollIntoViewIfNeeded();
    await press(kind, p, f.getByRole("button", { name: btn, exact: true }).first()); await wait(p, 500);
    const t = (await f.locator(".clin-panel, .clin-cue").allTextContents()).join(" ");
    rec(`${path}/${kind}`, `${id}: "${btn}"`, test(t));
  }
  // checklist
  await p.goto(base + "/aesthetic-oculofacial", { waitUntil: "networkidle" }); await wait(p, 400);
  const f = fig(p, "consultationQuestions"); await f.scrollIntoViewIfNeeded();
  await press(kind, p, f.locator(".cq-item").nth(1)); await wait(p, 200);
  rec(`/aesthetic-oculofacial/${kind}`, "checklist: untick a question", (await f.locator("input:checked").count()) === 4);
  rec(`/aesthetic-oculofacial/${kind}`, "static question list replaced by the checklist", (await p.locator(".dash-list").count()) === 0);
  const small = await p.$$eval("[data-figure] button, [data-figure] .cq-item", (els) => els.filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && Math.min(r.width, r.height) < 43.5; }).length);
  rec(`${kind} figures`, "controls at least 44 px (aesthetic page)", small === 0);
  rec(`${kind} figures`, "no console errors across all pages", errs.length === 0, errs.slice(0, 2).join(" | "));
  await ctx.close();
}

// Reduced motion
{
  const { ctx, p, errs } = await ctxFor("reduced");
  await p.goto(base + "/stitchless-cataract-surgery", { waitUntil: "networkidle" }); await wait(p, 500);
  const f = fig(p, "cataractSteps"); await f.scrollIntoViewIfNeeded();
  const td = await f.locator(".clin-part, .step-dot").first().evaluate((e) => getComputedStyle(e).transitionDuration);
  rec("reduced motion", "CSS transitions are off (under 1 ms)", parseFloat(td) <= 0.001, td);
  rec("reduced motion", "parallax is off", (await p.locator(".parallax[data-on]").count()) === 0);
  await f.getByRole("button", { name: "Next", exact: true }).click(); await wait(p, 200);
  rec("reduced motion", "steps still work (picture changes without animation)", (await f.locator(".clin-step-n").textContent()).includes("Step 2"));
  const lensOpacity = await f.locator("svg g.fb").first().evaluate((e) => getComputedStyle(e).transform);
  rec("reduced motion", "no scale transform left on the animated lens", lensOpacity === "none" || lensOpacity === "matrix(1, 0, 0, 1, 0, 0)", lensOpacity);
  rec("reduced motion", "no console errors", errs.length === 0, errs.join(" | "));
  await ctx.close();
}

// Parallax on desktop pointer, absent on touch
{
  const d = await ctxFor("desktop");
  await d.p.goto(base + "/about-us", { waitUntil: "networkidle" }); await wait(d.p, 500);
  const on = await d.p.locator(".parallax[data-on]").count();
  await d.p.mouse.wheel(0, 300); await wait(d.p, 400);
  const tf = await d.p.locator(".parallax[data-on] img").first().evaluate((e) => getComputedStyle(e).transform).catch(() => "none");
  rec("parallax", "desktop pointer: enabled on the About hero photograph", on > 0 && tf !== "none", `${on} wrappers, transform ${tf.slice(0, 40)}`);
  await d.ctx.close();
  const m = await ctxFor("mobile");
  await m.p.goto(base + "/about-us", { waitUntil: "networkidle" }); await wait(m.p, 500);
  rec("parallax", "touch device: disabled", (await m.p.locator(".parallax[data-on]").count()) === 0);
  await m.ctx.close();
}

// Page entrance: only on client-side navigation, off for reduced motion
for (const reduced of [false, true]) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: reduced ? "reduce" : "no-preference" }); const p = await ctx.newPage(); const errs = [];
  p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 140)));
  await p.goto(base + "/", { waitUntil: "networkidle" }); await wait(p, 400);
  const first = await p.locator(".page-enter").count();
  await p.locator("header >> a", { hasText: "Contact Us" }).first().click(); await p.waitForURL("**/contact-us"); await wait(p, 60);
  const second = await p.locator(".page-enter").count();
  const anim = await p.locator(".page-enter").first().evaluate((e) => getComputedStyle(e).animationName).catch(() => "n/a");
  const A = `page entrance/${reduced ? "reduced motion" : "normal"}`;
  rec(A, "first page of a visit is not animated", first === 0);
  rec(A, "client-side navigation marks the new page", second === 1);
  rec(A, reduced ? "animation is off" : "animation is on", reduced ? anim === "none" : anim === "page-enter", anim);
  rec(A, "heading present after navigation", (await p.locator("h1").first().textContent()).length > 3);
  rec(A, "no console errors", errs.length === 0, errs.join(" | "));
  await ctx.close();
}

await b.close();
const failed = results.filter((r) => !r.ok);
fs.writeFileSync(outFile, JSON.stringify({ total: results.length, failed: failed.length, results }, null, 1));
console.log(`\n${results.length} checks, ${failed.length} failed`);
