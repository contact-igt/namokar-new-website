# Test report (17 Oct 2026)

Default production build (no environment variables): `npm run lint` pass; `npx tsc --noEmit` pass; `npm run build` pass; `node scripts/qa-crawl.mjs`: 16 pages 200, three expected 404s (`/does-not-exist`, unknown article, `/videos`), 200 guessable media URLs for 28 pending assets all 404, no pending filename or YouTube ID or YouTube host in any page; 0 private files packaged. Production-default screenshots clean (no overflow, no text under 14 px, one h1, no console errors) at 375, 390, 768, 1440; contrast sweep: no text below WCAG AA.

Review preview (`ASSET_PREVIEW=on`), all 13 pages including `/videos` at 375, 390, 768, 1440: clean; contrast sweep: no text below AA.

Video tests (real browser, preview): local cataract video on a mobile viewport: 0 requests before play, 56 px play button with a descriptive label, plays with sound after a tap (user action), native controls present, pause and resume work, 720×1280, 77 s. Silent clips are muted. Walkthrough starts with the keyboard (Space on the focused Play button; visible focus outline). YouTube: 0 requests to YouTube before the click and no iframe; after a keyboard Enter the privacy-enhanced iframe loads (`youtube-nocookie.com`, title, allow list, referrer policy) and the player renders and plays; "Watch on YouTube" link present. Error state: a blocked local file shows "The video could not be loaded. Please try again later, or call the centre." Reduced motion: poster and button transitions drop to near zero. Fullscreen: `requestFullscreen()` on the playing local video succeeded and `exitFullscreen()` returned, at desktop and mobile viewports (headless; not tried on a physical phone). Orientation: 9:16 clips render in a 360 px-wide 9:16 frame, 16:9 in a full-width frame; mobile and desktop screenshots reviewed.

Security: preview-only media served to localhost only (unchanged); YouTube IDs and local video URLs appear in a page only when approved or in the local preview.

Not tested: YouTube playback inside a physical phone; captions (none exist); screen readers; Lighthouse.

Added on 18 Oct: preview-only security re-tested for every new media file (200 for localhost, 404 for a public Host header, 404 with a spoofed X-Forwarded-Host). Performance measured: see `docs/PERFORMANCE.md`.
