# Video integration report (19 Oct 2026)

Everything is **pending approval** (`approved: false` for every video; no client, consent or medical sign-off exists). Nothing was committed or deployed. The videos appear only in the loopback-only local review, http://127.0.0.1:3100 (`npm run dev:preview`); the default build shows no video, no video ID and no YouTube reference anywhere, and `/videos` is 404.

Brief: `Namokar_YouTube_Video_Curation_Integration_Final.md` (read in full). It asks me to read `NAMOKAR_VIDEO_INTEGRATION.md`, which is not on this computer; the Downloads file above is the brief I followed. Verification evidence: [VIDEO_VERIFICATION_MATRIX.md](VIDEO_VERIFICATION_MATRIX.md). Working log: [STATE.md](STATE.md).

## Exact placement matrix (preview)

| Page | Videos shown, in order | Layout |
|---|---|---|
| `/` | Shelf "Eye Care Videos & Clinic Stories": (1) `0xW4m-m_M8E` centre walkthrough, (2) `kX04UgyjkWo` cataract talk, (3) `mPDSc3AxoAk` founder story. Each card links to its page (About, Cataract, Doctor) | One stage, a list of 3 cards, one YouTube frame at a time; local footage stays in the separate "Step Inside Our Centre" section |
| `/stitchless-cataract-surgery` | `kX04UgyjkWo`, `D5uIbXIihuc` (when to consider surgery), then the local post-surgery exercise clip (pending local footage) | Two 16:9 beside the text, vertical clip below |
| `/glaucoma-management` | `SqmpI_G8o5I` (Hindi misconceptions, standard 16:9), `0YHUAEUcM2g` (Short) | Wide plus vertical |
| `/comprehensive-eye-examinations` | `82siQa3LgUY` (screen time), `wtk1RA5bJvk` (Short) | Wide plus vertical |
| `/eyelid-surgery-blepharoplasty` | `ZfZpmkXPa4k` (blepharoplasty), `_eoMAt_0dYw` (Short, heavy upper eyelids) | Wide plus vertical; procedure note before Play |
| `/eye-plastic-reconstructive-surgery` | `NznjjjSRJ1s` (entropion surgery), `PwZ7FS7ad_U` (Short, lower eyelid turning inward) | Wide plus vertical; procedure note before Play |
| `/aesthetic-oculofacial` | `_urlz_Hk7bM`, `Kc4AGn2i-Uk` (both Shorts) | Two verticals side by side; the blepharoplasty video is not repeated here |
| `/dr-poonam-jain` | `mPDSc3AxoAk`, plus the local doctor clip (pending) | Wide plus vertical |
| `/about-us` | `0xW4m-m_M8E` | Split |
| `/international-patients`, `/contact-us` | none | The brief says no video by default there |

Held (registered, on no page, with the reason in `src/content/videos.ts`): `Bt8DUnLJdZA` (absolute-claim title), `kmaEBmU1ty4`, `VbAoKQIq87o`, `B6JggoiqX9I` (Hindi review), `41E5Dhpyll8` (evidence claims), `sR6B4Kjr5JE`, `mrx8xKLUCQE`, `ztQ5mbvSNVs` (paediatric, outside the six services), `u3psA5Fu79U` (same topic as the local exercise clip), `_hkRLpO3JVE` ("select the best IOL"), `C9AzcSy416o`, `hUw7A6a0rgo`, `JcXB5aIS0vM`. The homepage no longer lists the earlier two Shorts (`C9AzcSy416o`, `u3psA5Fu79U`): this brief asks for the walkthrough, a cataract video and the founder story. Say so if you want them back.

## What changed

- **Registry** (`src/content/videos.ts`, new `src/content/videoFacts.ts`): each YouTube entry now carries `evidence` (checked date, channel ID, publisher verified, embeddable, upload date, length, picture size, format `short` or `standard`, consent and medical review both `pending`). Length and 9:16 or 16:9 come from YouTube's data, not the supplied list. Two entries added. Neutral on-site titles; exact titles in `officialTitle`. A `sensitive` flag and a `learnMore` link.
- **Player** (`VideoPlayer.tsx`, existing click-to-load component): procedure note before Play for the two surgery videos; restrained poster hover (scale 1.02, hover-capable pointers only), disabled for reduced motion and reduced data. Everything else it already did: poster and title before Play, no request to YouTube until Play, `youtube-nocookie.com`, always a "Watch on YouTube" link, 44 px Play target, separate 9:16 and 16:9 frames.
- **Shelf** (`VideoShelf.tsx`): heading "Eye Care Videos & Clinic Stories.", link-through to the matching page, one frame at a time.
- **Pages:** `ServiceLayout.tsx` heading depends on how many videos there are; duo layout aligned at the top (`globals.css`).
- Not built, on purpose: no YouTube thumbnails (fetching them is a request to YouTube before Play, and the brief asks for permission and rights first), so cards use a first-party title poster; no `VideoObject` markup (nothing is approved or public); no carousel or modal; no captions or transcripts (none exist for these videos).

## Tests (19 Oct 2026)

- `npm run lint`: clean. `npx tsc --noEmit`: pass. Default production build (copy outside iCloud): 28 pages.
- Default build: `qa-crawl` all checks passed (16/16 pages noindex), `check-canonicals` passed, `seo-audit` passed, `check-media-exposure` passed. None of the video IDs, `youtube` or the player markup appears in any default page or client chunk.
- Preview, `docs/video-integration/qa-scripts/video-qa.mjs` (Chromium headless): **388 of 388 checks** at 375, 390, 768 and 1440 on 12 routes: no request to YouTube and no iframe before Play; the expected videos on each page; vertical frames portrait and at most 360 px wide, landscape frames landscape; Play targets at least 44 px; exact Watch-on-YouTube links; procedure note on the two surgery pages; no console errors, no horizontal scroll, one `h1`; no video on the international, contact and services pages. Interaction, at 1440 and on a phone-sized touch viewport with reduced motion: keyboard focus ring on Play, Enter loads a titled `youtube-nocookie.com` iframe, reduced motion turns the poster transition off, with the embed blocked the YouTube link stays and points at the exact video, the shelf selects by Enter, does not load YouTube on selection, shows one frame after Play and removes it when another card is chosen.
- Real playback in the built-in browser: the cataract video played in the shelf (timecode 0:03 / 1:41) and an IOL Short played earlier. The other videos were not played. Not tested: Lighthouse, real phones, screen readers, non-Chromium browsers, whether a given video is later made private or has embedding disabled.
- Screenshots (git-ignored, private): `screenshots/baseline`, `loop1`, `loop2` (two refinement loops: fewer Shorts per page, alignment, headings), `final`.

## Skills

Only Superpowers is enabled here (its verification discipline was followed). Frontend Design, Emil Kowalski and Vercel skills are not installed or listed, so none was used; the work followed the project's own rules and standard practice. Herdr was not touched. No sub-agents were used.

## Approvals still needed

1. Client confirmation that the channel `@dr.poonamjain-NamokarEyeCentre` is theirs (the handle in the brief does not exist).
2. A clinician's review of every video's content and of the surrounding page text; Hindi review for `SqmpI_G8o5I`.
3. Consent for patients visible in the walkthrough and any procedure footage; client decision on showing surgery videos at all.
4. Written confirmation that the unconfirmed phone number (7827455040) on screen in some videos is acceptable or the videos stay off.
5. Captions or transcripts, if the client wants them.
6. Only then set `approved: true` in `src/content/videos.ts` for each video, with the sign-off recorded in `docs/NAMOKAR_CONTENT_VERIFICATION.md`.
