import { chromium } from "playwright-core";
import fs from "node:fs";
const [base, vidDir] = process.argv.slice(2);
const exe = process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const b = await chromium.launch({ executablePath: exe });
const pause = (p, ms) => p.waitForTimeout(ms);
for (const kind of ["desktop", "mobile"]) {
  const size = kind === "mobile" ? { width: 390, height: 844 } : { width: 1280, height: 800 };
  const ctx = await b.newContext({ viewport: size, isMobile: kind === "mobile", hasTouch: kind === "mobile", });
  const p = await ctx.newPage();
  const frames = []; const fdir = `${vidDir}/${kind}-frames`; fs.rmSync(fdir, { recursive: true, force: true }); fs.mkdirSync(fdir, { recursive: true });
  const cdp = await ctx.newCDPSession(p);
  cdp.on("Page.screencastFrame", async ({ data, sessionId, metadata }) => { const n = frames.length; fs.writeFileSync(`${fdir}/${String(n).padStart(5, "0")}.jpg`, Buffer.from(data, "base64")); frames.push(metadata.timestamp); try { await cdp.send("Page.screencastFrameAck", { sessionId }); } catch {} });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 72, everyNthFrame: 1 });
  const go = async (loc) => { await loc.scrollIntoViewIfNeeded(); await pause(p, 500); };
  const hit = async (loc) => { await loc.scrollIntoViewIfNeeded(); if (kind === "mobile") await loc.tap();
    else await loc.click(); await pause(p, 1100); };
  const fig = (id) => p.locator(`[data-figure="${id}"]`);

  await p.goto(base + "/", { waitUntil: "networkidle" }); await pause(p, 1400);
  for (let i = 0; i < 3; i++) { await hit(p.getByRole("button", { name: "Next photograph" })); await pause(p, 700); }
  await hit(p.getByRole("button", { name: "Oculoplasty", exact: true })); await pause(p, 900);

  await p.goto(base + "/stitchless-cataract-surgery", { waitUntil: "networkidle" }); await pause(p, 900);
  let f = fig("eyeAnatomy"); await go(f);
  for (const n of ["Cornea", "Lens", "Retina"]) await hit(f.getByRole("button", { name: n, exact: true }));
  await hit(f.getByRole("button", { name: "Clouded lens (cataract)" })); await pause(p, 1200);

  f = fig("lensCompare"); await go(f);
  const stage = f.locator(".lc-stage"); const box = await stage.boundingBox();
  if (kind === "desktop") { await p.mouse.move(box.x + box.width * 0.7, box.y + 60); await p.mouse.down(); await p.mouse.move(box.x + box.width * 0.25, box.y + 60, { steps: 30 }); await p.mouse.move(box.x + box.width * 0.8, box.y + 60, { steps: 30 }); await p.mouse.up(); }
  else { await p.touchscreen.tap(box.x + box.width * 0.25, box.y + 60); await pause(p, 700); await p.touchscreen.tap(box.x + box.width * 0.75, box.y + 60); }
  await pause(p, 600);
  await hit(f.getByRole("button", { name: "More advanced" })); await pause(p, 900);

  f = fig("lensDesigns"); await go(f);
  for (const n of ["Distance and near", "Astigmatism"]) await hit(f.getByRole("button", { name: n, exact: true }));

  f = fig("cataractSteps"); await go(f);
  await hit(f.getByRole("button", { name: "Play", exact: true })); await pause(p, 9800);
  await hit(f.getByRole("button", { name: "Replay", exact: true })); await pause(p, 3200); await hit(f.getByRole("button", { name: "Pause", exact: true }));

  await p.goto(base + "/glaucoma-management", { waitUntil: "networkidle" });
  f = fig("glaucomaFlow"); await go(f); await hit(f.getByRole("button", { name: "Drainage slowed" })); await pause(p, 1200);
  f = fig("sideVision"); await go(f); await hit(f.getByRole("button", { name: "Early narrowing" })); await hit(f.getByRole("button", { name: "Advanced narrowing" })); await pause(p, 900);

  await p.goto(base + "/eye-plastic-reconstructive-surgery", { waitUntil: "networkidle" });
  f = fig("tearPathway"); await go(f); await hit(f.getByRole("button", { name: "Passage blocked" })); await pause(p, 1400);
  f = fig("lidMalposition"); await go(f); await hit(f.getByRole("button", { name: "Turning in" })); await hit(f.getByRole("button", { name: "Turning out" })); await pause(p, 800);
  await cdp.send("Page.stopScreencast");
  let list = "";
  frames.forEach((t, i) => { const d = i < frames.length - 1 ? Math.max(0.02, frames[i + 1] - t) : 1.5; list += `file '${fdir}/${String(i).padStart(5, "0")}.jpg'\nduration ${d.toFixed(3)}\n`; });
  list += `file '${fdir}/${String(frames.length - 1).padStart(5, "0")}.jpg'\n`;
  fs.writeFileSync(`${vidDir}/${kind}.txt`, list);
  console.log(kind, frames.length, "frames", (frames.at(-1) - frames[0]).toFixed(1), "s");
  await ctx.close();
}
await b.close();
