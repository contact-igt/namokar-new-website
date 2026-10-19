// Records the treatment explorer as a screencast: mouse hover through all six labels and a click on desktop,
// swipe and first-tap on a phone. Writes frame lists; stitch with ffmpeg (see the README line printed at the end).
import { chromium } from "playwright-core";
import fs from "node:fs";
const [base, dir] = process.argv.slice(2);
const exe = process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const b = await chromium.launch({ executablePath: exe });
async function record(name, opts, run) {
  const ctx = await b.newContext(opts); const p = await ctx.newPage();
  const fdir = `${dir}/${name}-frames`; fs.rmSync(fdir, { recursive: true, force: true }); fs.mkdirSync(fdir, { recursive: true });
  const ts = []; const cdp = await ctx.newCDPSession(p);
  cdp.on("Page.screencastFrame", async ({ data, sessionId, metadata }) => { fs.writeFileSync(`${fdir}/${String(ts.length).padStart(5, "0")}.jpg`, Buffer.from(data, "base64")); ts.push(metadata.timestamp); try { await cdp.send("Page.screencastFrameAck", { sessionId }); } catch {} });
  await p.goto(base + "/", { waitUntil: "networkidle" }); await p.waitForTimeout(600);
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 75, everyNthFrame: 1 });
  await run(p, cdp);
  await cdp.send("Page.stopScreencast");
  let list = ""; ts.forEach((t, i) => { list += `file '${fdir}/${String(i).padStart(5, "0")}.jpg'\nduration ${(i < ts.length - 1 ? Math.max(0.02, ts[i + 1] - t) : 1.2).toFixed(3)}\n`; });
  list += `file '${fdir}/${String(ts.length - 1).padStart(5, "0")}.jpg'\n`; fs.writeFileSync(`${dir}/${name}.txt`, list);
  console.log(name, ts.length, "frames", (ts.at(-1) - ts[0]).toFixed(1), "s"); await ctx.close();
}
await record("desktop-hover", { viewport: { width: 1280, height: 800 } }, async (p) => {
  await p.locator("#find-care").scrollIntoViewIfNeeded(); await p.waitForTimeout(900);
  const links = p.locator(".tx-link"); const n = await links.count();
  for (let i = 0; i < n; i++) { await links.nth(i).hover(); await p.waitForTimeout(1100); }
  await p.keyboard.press("Tab"); await p.waitForTimeout(500);
  await links.nth(1).hover(); await p.waitForTimeout(900); await links.nth(1).click(); await p.waitForURL("**/glaucoma-management"); await p.waitForTimeout(1500);
});
await record("mobile-swipe-tap", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, async (p, cdp) => {
  await p.locator("#find-care").scrollIntoViewIfNeeded(); await p.waitForTimeout(900);
  const bx = await p.locator(".tx-list").boundingBox();
  for (let k = 0; k < 3; k++) { await cdp.send("Input.synthesizeScrollGesture", { x: bx.x + bx.width / 2, y: bx.y + 120, xDistance: -300, yDistance: 0, speed: 700, gestureSourceType: "touch" }); await p.waitForTimeout(900); }
  await p.locator(".tx-link").nth(3).tap(); await p.waitForURL("**/eyelid-surgery-blepharoplasty"); await p.waitForTimeout(1500);
});
await b.close();
console.log("stitch: ffmpeg -f concat -safe 0 -i <name>.txt -vf fps=25,format=yuv420p -c:v libx264 -crf 28 <name>.mp4");
