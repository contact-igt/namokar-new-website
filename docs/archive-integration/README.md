# Archive images and official YouTube Shorts: integration report (19 Oct 2026)

Everything here was pending approval when this report was created. On 20 Oct 2026, the project owner selected `archTeamDoctor` for the homepage centre carousel; that one asset is now approved in `src/config/assets.ts`. The remaining archive assets retain their original status. Indexing is unchanged (noindex, `Disallow: /`, empty sitemap).

## What was and was not available

- The three briefs named in the request (`Namokar_Claude_Code_Archive_Images_YouTube_Shorts_Integration.md`, `Namokar_ZIP_Media_Placement_Review.md`, `Namokar_Uploaded_ZIP_Full_File_Inventory.md`) are **not on this computer** (searched Downloads, Desktop, Documents and Spotlight). I worked from the request text and from my own review of the ZIP, so the image choices below are mine, not the placement review's. If you send those files I will reconcile them.
- The ZIP is `namokareyecare-website-frontend-main.zip` (two byte-identical copies in Downloads). A copy was also extracted into the project root as `namokareyecare-website-frontend-main/`. It is the older Pages Router project and was treated as read-only: nothing was merged (no config, routes, packages or skills). It is now git-ignored, Vercel-ignored and excluded from ESLint.
- The channel handle in the request, `@dr.poonamjain-namokareyeoc5696`, still returns HTTP 404 (re-checked today). The channel that exists, and that the site already uses, is `@dr.poonamjain-NamokarEyeCentre` (name "Dr. Poonam Jain - Namokar Eye & Oculoplasty Centre"). Its ownership by the clinic is still inferred and needs the client's confirmation.

## Archive images

**159 image files audited** (137 unique after removing byte-identical duplicates, logos and icons); full per-file table: [ARCHIVE_INVENTORY.md](ARCHIVE_INVENTORY.md). **7 imported, 6 placed** (one is held in reserve).

Most of the archive is not usable under this project's rules. By my visual review: about 51 are illustrations or photographs that look AI-generated or stock (procedures, faces, devices), 14 are before/after-style images, 9 are stock portraits, 21 are composited banners with glow backgrounds, 4 are other doctors, 4 are manufacturer-style lens product images, and 2 are third-party institution photographs. Only the clinic's own July 2026 shoot photographs (the `Gallery/IMG_*` files and the 6000 px originals) are real clinic photographs. Several of those are already in the registry (`IMG_0024`, `0025`, `00262`, `00321`, `0037`), so they were not imported again.

### Imported (all `approved: false` in `src/config/assets.ts`)

| Registry key | Derivative in `private-assets/` | Original (archive path, pixels) | Visible people | Approval needed |
|---|---|---|---|---|
| `archCataractExam` | `archive-cataract-exam.webp` 2400x1600 | `cataract/cataract-stitchless.JPG`, 6000x4000 | Dr. Poonam Jain, one patient (back/side) | Doctor, patient consent, client |
| `archExamOverhead` | `archive-exam-overhead.webp` 1600x2400 | `Aesthetic/expected_approach_doctor.JPG`, 6000x4000 (identical to `cataract/why_choose_namokar_doctor.JPG`); rotated upright | Dr. Poonam Jain, one patient (from behind) | Doctor, patient consent, client |
| `archGlaucomaTest` | `archive-glaucoma-test.webp` 1059x1590 | `Gallery/IMG_0009.JPG`, 1059x1590 (no larger original supplied) | One staff member, one patient (from behind) | Staff and patient consent, client |
| `archStaffEquipment` | `archive-staff-equipment.webp` 1059x1590 | `Gallery/IMG_0062.JPG`, 1059x1590 | One staff member | Staff consent, client |
| `archDoctorPortrait` | `archive-doctor-portrait.webp` 1200x1200 | `Doctors/Main_doctor.png`, 1200x1200; looks retouched | Dr. Poonam Jain | Her approval of this portrait, client |
| `archDoctorScrubs` | `archive-doctor-scrubs.webp` 1306x1800 | `about/about_doctor.png`, 1306x1800 | Dr. Poonam Jain | Her approval, client |
| `archTeamDoctor` | `archive-team-doctor.webp` 1500x1000 | `Gallery/IMG_0053.JPG`, 1500x1000 | Dr. Poonam Jain and several team members | Approved for the homepage centre carousel by the project owner, 20 Oct 2026 |

Originals were not touched. Derivatives are WebP (quality 82, longest side at most 2400 px), orientation corrected, **all metadata (including any GPS) removed**. Next.js serves the responsive sizes from them through `/media/<file>`, which is 404 unless the asset is approved or the loopback review is on. Three originals are web-compressed copies (about 200 KB each: `IMG_0009`, `IMG_0062`, `IMG_0053`); the clinic should supply full-size files before launch.

### Placement matrix (what the preview shows)

| Page | Slot | Photograph | Notes |
|---|---|---|---|
| `/` | "Find care" explorer, Cataract | `archCataractExam` | Replaces a theatre photo |
| `/` | Explorer, Glaucoma | `archGlaucomaTest` | |
| `/` | Explorer, Eye examinations | `archExamOverhead` | |
| `/` | Explorer, Aesthetic | `archDoctorScrubs` | |
| `/stitchless-cataract-surgery` | Hero | `archCataractExam` | Theatre photo moves to the second slot |
| `/glaucoma-management` | In-page photograph | `archGlaucomaTest` | Hero unchanged (consultation desk) |
| `/comprehensive-eye-examinations` | In-page photograph | `archExamOverhead` | Hero unchanged (slit-lamp room) |
| `/aesthetic-oculofacial` | Hero | `archDoctorPortrait` | Reception moves to the second slot |
| `/dr-poonam-jain` | Hero | `archDoctorScrubs` | Falls back to the earlier standing portrait |
| `/about-us` | "Meet your doctor" | `archDoctorPortrait` | Falls back to the earlier standing portrait |
| `/about-us` | Photo gallery (first) | `archTeamDoctor` | |
| `/eyelid-surgery-blepharoplasty`, `/eye-plastic-reconstructive-surgery`, `/international-patients`, `/contact-us` | none changed | | The archive holds only AI-style imagery for eyelid and reconstructive work, and nothing better than the existing exterior and reception photographs for international and contact. Real photographs of the clinic are the gap to fill. |

The same photograph appears on the homepage explorer and on its own treatment page for four treatments (the explorer is a preview of that page). No photograph is used across different treatments. `archStaffEquipment` is imported but not placed.

## YouTube

> Superseded in part on 19 Oct 2026 by [../video-integration/README.md](../video-integration/README.md): the homepage shelf, the Shorts per page and the video durations changed there. The verification method below is still accurate.

Method: the channel's Shorts tab was read in the built-in browser (57 Shorts), and every ID was checked with YouTube's oEmbed service (HTTP 200, author "Dr. Poonam Jain - Namokar Eye & Oculoplasty Centre"). Titles, IDs and embeddability are verified. **I did not watch or clinically review any video**; one Short (IOL) was played in the browser to confirm that embedding works. Durations of Shorts are not recorded, so the player says "Short". All entries are `approved: false`.

| Video ID | Kind | Title (channel) | Page |
|---|---|---|---|
| `mPDSc3AxoAk` | video, 2:54 (not a Short) | Why I Became an Eye Surgeon? | Home shelf, `/dr-poonam-jain` |
| `C9AzcSy416o` | Short | Looking for specialised eye care in Ashok Vihar, Delhi? | Home shelf |
| `u3psA5Fu79U` | Short | Wondering when you can exercise after cataract surgery? | Home shelf |
| `kX04UgyjkWo` | video, 1:41 (not a Short) | Dr. Poonam Jain - A Leading Eye Surgeon of Ashok Vihar Talks About Cataract Surgery | `/stitchless-cataract-surgery` |
| `_hkRLpO3JVE` | Short | Going for Cataract surgery? ... Select the best IOL | `/stitchless-cataract-surgery` |
| `0YHUAEUcM2g` | Short | Glaucoma is the overarching term for a group of conditions... | `/glaucoma-management` |
| `wtk1RA5bJvk` | Short | Experiencing blurry distance vision after long hours of computer work? | `/comprehensive-eye-examinations` |
| `_eoMAt_0dYw` | Short | Heavy, hooded upper eyelids can make the eyes look tired... | `/eyelid-surgery-blepharoplasty` |
| `hUw7A6a0rgo` | Short | Ever noticed one eye looking smaller in your selfies? | `/eyelid-surgery-blepharoplasty` |
| `_urlz_Hk7bM` | Short | Dark circles getting more noticeable? | `/aesthetic-oculofacial` |
| `Kc4AGn2i-Uk` | Short | Not every under-eye trend online is harmless. | `/aesthetic-oculofacial` |
| `PwZ7FS7ad_U` | Short | Is your lower eyelid turning inward with age? | `/eye-plastic-reconstructive-surgery` |
| `JcXB5aIS0vM` | Short | Eyes feeling heavy, bulging, or painful? ... | `/eye-plastic-reconstructive-surgery` |

The earlier 16:9 videos (`0xW4m-m_M8E`, `SqmpI_G8o5I`, `82siQa3LgUY`, `ZfZpmkXPa4k`, `NznjjjSRJ1s`) keep their pages. The two videos you named were used as standard videos, not Shorts. Not used on purpose: duplicate uploads of the same Short (`N-qZS9Q6VOo`, `UUghddeacVA`, the four Holi uploads), patient-testimonial Shorts ("Happy Patient"), Botox and filler promotions, paediatric Shorts (outside the six services), Hindi Shorts (need a Hindi-speaking reviewer), and the dated untitled uploads. No video was added for International or Contact, and none was forced onto a page where it did not fit.

Review notes per video are in `src/content/videos.ts` (the `review` field), for example that the IOL title says "best" and the "Dr. Poonam Jain talks about cataract surgery" lower third shows an unconfirmed telephone number.

## Code changes

- New: `src/components/VideoShelf.tsx` (homepage doctor-led shelf: one player at a time, click to load; choosing another video removes the loaded frame), `docs/archive-integration/*`.
- `VideoPlayer.tsx`: optional controlled mode (`playing`, `onPlay`); the existing 16:9 and 9:16 click-to-load player is the reusable component.
- `VideoSection.tsx`: a row layout for pages that have only vertical Shorts.
- `videos.ts`: `ys()` helper for Shorts, 11 Shorts, two reassigned standard videos, exact official titles, wide videos listed before vertical ones.
- `assets.ts` (7 pending entries, patient values added to `people`), `covers.ts`, `treatments.ts`, `app/page.tsx` (shelf; "Explore" now shows local footage only), `about-us`, `dr-poonam-jain` pages, `globals.css` (shelf and Shorts row), `eslint.config.mjs`, `.gitignore`, `.vercelignore`.

## Tests (run 19 Oct 2026)

- `npm run lint`: clean. `npx tsc --noEmit`: pass. Default production build (in a copy outside iCloud): 28 pages.
- Default build: `qa-crawl` all checks passed (16/16 pages noindex), `check-canonicals` passed, `seo-audit` passed, `check-media-exposure` passed (35 pending private assets, none reachable or named in pages). None of the new video IDs, `archive-*` file names or the word "youtube" appears in any default page; `/media/archive-*.webp` and `/review` return 404.
- Preview (`docs/archive-integration/qa-scripts/video-qa.mjs`, Chromium headless): 116 of 116 checks, at 390 and 1440 on 8 pages: no request to YouTube and no iframe before Play, exactly one `youtube-nocookie.com` iframe after Play, Play target at least 44 px, no console errors, no horizontal scroll; on the homepage the shelf lists 3 videos, choosing another removes the loaded player, and the chosen Short loads in a single frame. A separate check at 320, 375, 430, 768 and 1024: no horizontal scroll, one visible `h1`, video targets at least 44 px.
- Real playback: the IOL Short was played in the built-in browser and showed the doctor with the channel handle overlay. The other Shorts were not played.
- Screenshots (git-ignored, private): `screenshots/loop1`, `loop2`, `video`. Two refinement loops were used: the first found the aesthetic hero cropping the face, fixed by changing the image and crop.

## Not done, and approvals outstanding

- Not tested: Lighthouse, real phones, screen readers, non-Chromium browsers, playback of the other Shorts.
- Approvals: Dr. Poonam Jain (portraits and the three photographs she appears in), written consent of patients and staff shown, clinician review of all 13 videos, client confirmation of YouTube channel ownership, full-size originals for the three web-copy photographs, and the same unresolved items as before (phone number conflict, credentials, legal text, publication authority).
- To publish an asset: set `approved: true` in `assets.ts` (or in `videos.ts` for a video) only after the sign-off is recorded in `docs/NAMOKAR_CONTENT_VERIFICATION.md`.
