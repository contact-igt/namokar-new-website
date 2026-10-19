# Test report (16 Oct 2026, local, default production build unless stated)

| Check | Command / method | Result |
|---|---|---|
| Lint | `npm run lint` | pass, no warnings |
| Types | `npx tsc --noEmit` | pass |
| Build | `npm run build` (no environment variables) | pass; 16 pages + sitemap, robots, icons, `/media`, `/api/appointment`, proxy |
| Route crawl | `node scripts/qa-crawl.mjs http://127.0.0.1:3103` | 16/16 pages 200; `/does-not-exist` and `/blogs/not-a-real-article` 404; all passed |
| Media leak probes | same script | 67 URL guesses for 9 pending assets, all 404; no pending filename in any page HTML |
| Build packaging | read `.nft.json` of `/media` | 0 private files (9 when `ASSET_PREVIEW=on`) |
| Preview safety | requests to a preview build | 200 for loopback Host; 404 for another Host, and with spoofed `X-Forwarded-Host`; 404 when `VERCEL_ENV=production` |
| Indexing | robots.txt, meta | `Disallow: /`; 16/16 pages `noindex`; sitemap empty |
| Cookies | crawl | none set |
| Layout | Playwright, `docs/full-site-build/screenshots/production-default/` | home, services, cataract, doctor, contact at 320, 375, 390, 430, 768, 1024, 1280, 1440; every other route at 375, 390, 768, 1440; no horizontal overflow, no text under 14px, one h1 each |
| Console | same runs | no errors (the 404 page logs the expected 404 resource) |
| Contrast | `contrast.mjs` over every route at 375 and 1440 | no text below WCAG AA (found and fixed one dark-on-dark band) |
| Navigation | `nav.mjs` | desktop: hover opens, stays open crossing the gap, closes on leave, ArrowDown/End/Escape work and return focus, click navigates and closes, outside click closes, current group marked; mobile: menu locks scroll, sub-menu opens, link closes menu and unlocks scroll, Escape closes |
| FAQ | tap | opens (native `<details>`) |
| Reduced motion | emulation | hero and reveal animations off, transitions near zero |
| Map | earlier pass | nothing from Google loads until "Show map" |
| Form (earlier pass, with a local mock endpoint) | curl + Playwright | public flag alone cannot enable it; success only on 2xx; honeypot, origin, size, rate-limit, validation all behave; no logging; no secret in client bundle |
| Video | earlier pass | click-to-play, no download before play, range requests (206) |

Performance was measured later with Playwright, see `docs/PERFORMANCE.md`. Not done: a Lighthouse run; screen-reader testing; testing on real devices; real email/CRM delivery; lightbox (no gallery exists).
