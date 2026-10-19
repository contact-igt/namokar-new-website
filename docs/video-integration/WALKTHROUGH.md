# Clinic walkthrough replacement (20 Oct 2026)

Status: **integrated in the protected local preview only; not publishable as it stands.**

## Source
- File: `namokar .mp4` (note the space before the dot) in the project root, next to `package.json`; 84,568,275 bytes; fully downloaded (not an iCloud placeholder). **Untouched**: SHA-256 `6b032713…84ca` before and after. Git-ignored (`/*.mp4`) and Vercel-ignored; it is not in `public/`, `private-assets/` or any build. It should still be moved to `~/Namokar-Private-Media/` (outside the iCloud-synced project); I did not move it without your say-so.
- Probe: 30.42 s; 2528x1440 (about 16:9, 1.756); HEVC Main, 60 fps, about 22 Mbps; AAC-LC stereo 44.1 kHz with a real audio track (mean level -18.9 dB, so it is not silent; I could not listen, so I do not know whether it is speech or music); no rotation; created 19 Oct 2026.

## What the footage shows (a frame every 2 s, 15 frames, all reviewed)
Street entrance and signage; the reception desk with two staff; patients being examined with diagnostic instruments (an auto-refractor and a slit lamp), the examiners and a male doctor in a white coat with a patient wearing trial frames; an indirect-ophthalmoscopy examination by a woman doctor in a white coat; a branded end card with a web address. **No operation theatre appears**, so the section never says so.

## Sensitive content (why it stays pending)
- **Identifiable patients** being examined, plus several staff and a second doctor: consent needed, or editing.
- **Burned-in claims**: "25+ Years of Surgical Expertise", "Internationally trained doctor delivering trusted and precise eye care", "Highly Trained Staff", "Advanced Diagnostic Technology", and on the street sign "Cashless Mediclaim Facility Available", "Senior Eye Surgeon" and a telephone number (011-40392563). Under the project rules and the NMC advertising rules these need documentary proof or removal. I did not edit them out (no unauthorised alteration).
- The end card shows a web address; the sign reads "A unit of Kalos Health Care Pvt. Ltd.".

## Derivatives (in `private-assets/`, git-ignored, served only through `/media`)
- `clinic-walkthrough.mp4`: H.264 High, yuv420p, 1920x1094 (shape preserved, not upscaled: the source is larger), 30 fps, CRF 24 capped at 6 Mbps (about 3.2 Mbps), AAC 128 kbps stereo (audio kept), fast-start (`moov` at the start of the file). **12.3 MB** (86 percent smaller than the source), 30.42 s.
- `clinic-walkthrough-poster.webp`: 1920x1094, 111 KB, frame at 3.2 s (the street entrance: clear, no caption overlay, no patient close-up).
- Both registered `approved: false` in `src/config/assets.ts` with the issues above.

## Page
`WalkthroughSection.tsx` replaces the two old cards (the old entries stay in the registry and files are untouched; they are simply no longer on the homepage). Heading kept; subtitle "Explore the spaces, facilities and environment where we care for your eyes."; one wide player (max 1100 px) in the exact source shape, a 92 px centred play button (76 px on phones), the title and "From the street entrance to reception and the examination rooms." underneath. Click to play, no autoplay, no `<video>` until Play, `preload=metadata`, native controls, `playsInline`. The old "without sound / no patients" wording is gone. The section renders nothing in a normal build.

## Media route
`/media/[file]` already supported Range; it now reads only the requested bytes instead of the whole file on every seek. 206 and 416 verified; forged Host, forwarded address and path traversal all 404; body byte-identical to the file.

## Tests (20 Oct 2026)
- Lint clean, `tsc` clean, default build 28 pages.
- Section QA (`wtqa.mjs`, Chromium) at 375, 390, 768, 1024, 1440: 70 of 70 (section present, old cards and wording gone, one player, no `<video>` before Play, only the poster requested, shape kept, no overflow, Play control at least 44 px and not covered by the fixed action bar, no console errors).
- Real playback in the built-in browser (H.264): no video element before Play; after Play it ran (2.3 s to 4.3 s), paused, sought to 20 s (ready state 4), resumed, buffered 0 to 26.6 s, controls on, `playsInline`, no autoplay attribute, audio decoded (not muted), fullscreen available. I did not click the browser's fullscreen button.
- Keyboard: Enter on the focused Play button (3 px focus ring) creates the player.
- Default build: section, file names and video absent from every page and client chunk; `/media/clinic-walkthrough.mp4` and the poster 404 (also with a Range header); `check-media-exposure` passed, including with the original placed in the project root (1 root original counted, unreachable); `qa-crawl`, canonicals and SEO audit pass.
- Regression in the preview: explorer 94 of 94, video and shelf 386 of 386.
