# Measured performance (18 Oct 2026)

Method: Chromium (headless) via Playwright against local production builds, fresh browser each load, observers for LCP, layout shift and long tasks. Mobile runs use a 390×844 viewport at 2× with **4× CPU slowdown and ~1.6 Mbit/s, 150 ms latency**; desktop runs are unthrottled on a fast Mac and mostly show localhost speed. These are lab numbers on one machine, not Lighthouse scores and not field data. INP was not measured (a click-to-next-paint time is shown instead).

| Build | Page (mobile, throttled) | LCP | CLS | Blocking time |
|---|---|---|---|---|
| Default (photos hidden) | Home | 0.90 s (heading) | 0.000 | ~15 ms |
| Default | About / Cataract / Contact | 0.73–0.74 s | 0.000–0.001 | under 10 ms |
| Preview (all photos) | Home | 1.31 s (hero photo) | 0.000 | ~16 ms |
| Preview | About | 1.26 s | 0.000 | ~2 ms |
| Preview | Cataract | 0.89 s | 0.000 | ~2 ms |
| Preview | Contact | 1.58 s (street photo) | 0.000 | ~3 ms |

Page weight on the wire: about 90–120 KB default, 130–180 KB in the preview (before below-the-fold images load). Targets in the brief (LCP ≤ 2.5 s, CLS ≤ 0.1) are met in this lab setup. A real-device or Lighthouse run is still advisable after deployment.

# Dependencies
`npm audit --omit=dev`: **0 vulnerabilities** in what ships. `npm audit` reports 5 high findings, all in the lint tool chain (`eslint-config-next` → `fast-glob` → `micromatch` → `braces`, a regular-expression denial-of-service in globbing). They affect only developer machines, and the only offered fix is a forced, breaking change, so it was not applied.
