# QA report

19 Oct 2026. Authoritative results come from a copy of the project in a folder **outside iCloud** (iCloud deletes rebuilt files late and gives false failures, see `docs/DEV_ENVIRONMENT.md`). Nothing was committed, deployed or indexed; no approval flag, release flag or paid-generation credit was touched.

## Commands run and results

| Check | Result |
|---|---|
| `npm run lint` | Pass, no warnings |
| `npx tsc --noEmit` (after the build generates the framework's layout types) | Pass |
| `npm run build`, no variables (28 pages: the new `/review` is one of them) | Pass |
| `node scripts/qa-crawl.mjs` (default build) | Pass: 16 of 16 routes, all noindex, 200 guessed media URLs for pending assets all 404 |
| `node scripts/check-canonicals.mjs`, `node scripts/seo-audit.mjs` | Pass |
| `node scripts/check-media-exposure.mjs … --build-dir .next` | Pass: no confidential file reachable, named in a page or in the build output |
| `/review` in the default build; review badge in the default HTML | **404**; **0** badges |
| Treatment explorer, **default build** (brand cards, no photographs) | **88 checks, 0 failed** |
| Treatment explorer, **review preview** (photographs) | **94 checks, 0 failed**: hover, preview link, click, keyboard, 6 different pictures, rapid-sweep race, touch at 375, 390, 430 and 768 px (first tap on every card), reduced motion, no console errors |
| Earlier interaction suite (11 clinical figures, banner, parallax, page entrance) re-run on the final build | **73 checks, 0 failed** |
| Layout sweep, 17 routes × 390 and 1440, default build and review preview | **34 of 34 clean** each (no overflow, no text under 14 px, no broken images, no control under 40 px, no console errors) |
| Contrast sweep | No text below WCAG AA |

## Private-preview protection (the "Preview only" labels were removed)

Pictures, videos and figures now render **without** per-image labels in the local review. Protection is unchanged or stronger:

- No asset's `approved` flag changed (only the logo is approved); `docs/client-approval/` and the registry are as before. The new `/review` page lists every pending photograph, video, figure and page with its outstanding approval, and answers **404** unless the server is the local review preview and the request is local.
- **A weakness was found and fixed.** Before: from another device on the Wi-Fi, a request with a forged `Host: localhost` header received pending media and the preview; and a resized copy in the image optimizer cache, made for a local request, could be served to anyone. After:
  1. The review servers listen on **127.0.0.1 only** (`npm run dev:preview`, new `npm run start:preview`): another device cannot connect (tested: connection refused).
  2. Defence in depth if a server is ever started on all interfaces: the request must also carry no non-loopback `X-Forwarded-For` (Next records the real socket address there), the proxy (`src/proxy.ts`) now refuses `/_next/image` requests for pending media unless local, and `/review` is gated the same way.
  3. Tested on an all-interfaces server: LAN address 404; LAN + forged `Host` 404; LAN + forged `X-Forwarded-Host` 404; optimizer from LAN 404 (even with a warm cache); forged `Host` to a loopback server 404; path traversal 404; raw original 404.
  - **Known limit:** on an all-interfaces server, a deliberately crafted request that forges both `Host` and `X-Forwarded-For` still passes. That is why the loopback binding is the real control. Never start the review preview with `-H 0.0.0.0` or on a shared network.
- A phone on the same Wi-Fi therefore cannot see the review at all. For phone checks use the real-device route in the launch checklist (a build with no pending media).

## Performance (throttled phone: 4× CPU slowdown, 1.6 Mbit/s, 150 ms)

| | Before this task | After |
|---|---|---|
| Largest paint, home | about 0.90 s | **0.92 s** |
| Largest paint, other routes | 0.76 to 0.79 s | **0.81 s** |
| Layout shift | 0.000 to 0.016 | 0.000 to 0.001 on the routes re-measured |
| JavaScript per page (compressed) | 160 KB | **161 KB** (no new library) |
| Stylesheet (compressed) | 12 KB | 14 KB |
| Home page images, review preview, desktop / phone | n/a | 472 KB / 271 KB in total (explorer photographs load lazily; phone cards use thumbnails) |

The roughly 40 ms later first paint comes from the added gradient and explorer styles. A mid-task regression (home largest paint 1.3 to 1.5 s) was traced to making the footer logo load eagerly and was reverted. Lighthouse was **not** run.

## Defects found and fixed during testing

Matrix clicks failing because the previous page stays in the DOM, hidden (test now counts visible headings); preview flicker when sweeping towards the preview (hover intent); dev-console logo warning (documented false positive, ignored in the test); review badge overlapping phone content (smaller, 44 px); the security weakness above.

## Not done

Lighthouse; real phones and tablets (swipe feel, iOS rubber-banding); screen-reader pass; browsers other than Chromium; a keyboard-only walkthrough by a person; checking a deployed build. The explorer's pictures are pending approval, so the normal site shows brand cards until they are approved.
