import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell" });
const [base, r] = process.argv.slice(2);
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }); const p = await ctx.newPage();
const c = await ctx.newCDPSession(p); await c.send("Network.enable"); await c.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: 96000 }); await c.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await p.addInitScript(() => { window.__s = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__s.push({ t: Math.round(e.startTime), v: +e.value.toFixed(3), src: e.sources.map((s) => (s.node?.nodeName || "?") + "." + (s.node?.className?.toString?.() || "").slice(0, 30) + " " + JSON.stringify(s.previousRect) + "->" + JSON.stringify(s.currentRect)) }); }).observe({ type: "layout-shift", buffered: true }); });
await p.goto(base + r, { waitUntil: "load" }); await p.waitForTimeout(3500);
console.log(JSON.stringify(await p.evaluate(() => window.__s), null, 1));
await b.close();
