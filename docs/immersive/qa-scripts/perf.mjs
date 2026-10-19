import { chromium } from "playwright-core";
const base = process.argv[2]; const routes = process.argv.slice(3);
const b = await chromium.launch({ executablePath: process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell" });
for (const [label, vp, mob, throttle] of [["mobile 390 (4x CPU slowdown, Fast-4G-like network)", { width: 390, height: 844 }, true, true], ["desktop 1440 (no throttling)", { width: 1440, height: 900 }, false, false]]) {
  console.log("==", label);
  for (const r of routes) {
    const ctx = await b.newContext({ viewport: vp, isMobile: mob, hasTouch: mob, deviceScaleFactor: mob ? 2 : 1 });
    const p = await ctx.newPage();
    if (throttle) { const c = await ctx.newCDPSession(p); await c.send("Network.enable"); await c.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 }); await c.send("Emulation.setCPUThrottlingRate", { rate: 4 }); }
    await p.addInitScript(() => { window.__m = { lcp: 0, lcpEl: "", cls: 0, longTasks: 0, tbt: 0 }; new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__m.lcp = e.startTime; window.__m.lcpEl = (e.element?.tagName || "") + "." + (e.element?.className || "").toString().slice(0, 24); } }).observe({ type: "largest-contentful-paint", buffered: true }); new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; }).observe({ type: "layout-shift", buffered: true }); new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__m.longTasks++; window.__m.tbt += Math.max(0, e.duration - 50); } }).observe({ type: "longtask", buffered: true }); });
    let bytes = 0; p.on("response", async (res) => { try { const len = res.headers()["content-length"]; if (len) bytes += +len; } catch {} });
    await p.goto(base + r, { waitUntil: "load", timeout: 90000 }); await p.waitForTimeout(3500);
    const m = await p.evaluate(() => ({ ...window.__m, ttfb: Math.round(performance.getEntriesByType("navigation")[0].responseStart), fcp: Math.round(performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0) }));
    // INP proxy: time from tap to next paint on the menu toggle / first button
    let inp = null; try { const sel = mob ? 'button[aria-label="Open menu"]' : "button.slide-tab"; inp = await p.evaluate(async (s) => { const el = document.querySelector(s); if (!el) return null; const t0 = performance.now(); el.click(); await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); return Math.round(performance.now() - t0); }, sel); } catch {}
    console.log(r.padEnd(34), `LCP ${Math.round(m.lcp)}ms (${m.lcpEl})`, `| FCP ${m.fcp}ms | TTFB ${m.ttfb}ms | CLS ${m.cls.toFixed(3)} | TBT~${Math.round(m.tbt)}ms | click→paint ${inp}ms | ~${Math.round(bytes / 1024)}KB`);
    await ctx.close();
  }
}
await b.close();
