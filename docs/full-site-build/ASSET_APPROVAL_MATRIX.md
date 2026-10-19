# Asset approval matrix

The canonical record is the table in `docs/NAMOKAR_CONTENT_VERIFICATION.md` and the flags in `src/config/assets.ts`. This file does not repeat them to avoid conflicting statuses. Summary on 16 Oct 2026: the logo is approved; the other nine assets (five photographs, one video, one video poster, two AI concept images) are **pending**, and nothing was changed to approved.

Verified in the default production build:
- No pending file is in `public/`, in the page HTML, in `sitemap.xml` or in metadata (Open Graph image is the logo).
- `/media/<file>` answers 404 for all nine, `/images/`, `/video/`, `/private-assets/` and `/_next/image?url=…` variants answer 404 (67 probes, `scripts/qa-crawl.mjs`).
- The build output lists **zero** private files for packaging (`outputFileTracingExcludes`), so a deployment from this build does not carry them.
- `ASSET_PREVIEW=on` is forced off when `VERCEL_ENV=production`, and `/media` serves pending files to loopback hosts only (a request with another Host header, even with `X-Forwarded-Host: localhost`, gets 404).
- Caveat: a build made with `ASSET_PREVIEW=on` bakes preview image tags into its pages. Never deploy such a build; use it only on your own machine. `.next/` is a build artefact and must never be uploaded wholesale (it can hold cached copies of images from earlier preview runs).
