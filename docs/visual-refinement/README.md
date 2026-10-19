# Pixel Eye reference-led refinement: report (19 Oct 2026)

Everything is **pending approval**; nothing was committed, pushed or deployed; indexing, robots, the empty sitemap, the media controls and the booking rule are unchanged. The work is visible only in the loopback-only local review at http://127.0.0.1:3100 (`npm run dev:preview`).

The brief names `NAMOKAR_PIXEL_EYE_REFINEMENT.md`; the file I read is `Namokar_Pixel_Eye_Reference_UI_Refinement_Master_Prompt.md` (Downloads). `NAMOKAR_FINAL_SPEC.md` and `RELEASE_BLOCKERS.md` do not exist in the project; the route registry (`src/config/routes.ts`) and `CLAUDE.md` were used instead.

## 1. Reference findings

[../reference-audit/PIXEL_EYE_DESIGN_AUDIT.md](../reference-audit/PIXEL_EYE_DESIGN_AUDIT.md). Both the live site and the public repository were reachable (the repository has no licence, so nothing was copied). The reference is not hospital-first (a lifestyle hero), its hero auto-advances with no controls, and it leans on claims Namokar may not make. What was worth adapting: one large image-led hero, the doctor shown once, numbered image-led treatment entries, and a thumb-reach action bar on phones. Hover and touch on its inner pages were not tested.

## 2. What changed (highest impact first)

1. **Doctor photographs:** outside her profile page, 23 appearances became 9 (home 7 to 2, services index 5 to 1, eyelid 2 to 0, glaucoma 1 to 0). Table and policy: [IMAGE_ASSIGNMENT_MATRIX.md](IMAGE_ASSIGNMENT_MATRIX.md).
2. **Homepage hero:** four distinct slides of the centre and its equipment (reception, operating microscope, eye chart, theatre), none a portrait; slide 1 now leads with comprehensive eye care. Manual controls, no autoplay.
3. **Homepage order:** hero, treatment explorer, facility gallery, local footage, one doctor introduction, video shelf, oculoplasty, why Namokar, FAQ, action. The second services list that repeated the explorer was removed.
4. **Treatment explorer and services index:** every treatment shows its own picture on desktop hover and keyboard focus, and its own card on touch. Cataract, glaucoma and examinations use photographs; eyelid, aesthetic and tear-passage care use three original line-drawing plates (new, `Plates.tsx`, pending medical review, preview only).
5. **Service pages:** heroes and second pictures reassigned so no two pages open on the same photograph and a doctor portrait is not the default.
6. **Phones:** fixed bottom bar with the appointment action and Directions (adapted from the reference's idea; no WhatsApp, hours or other unapproved channel).
7. About page: one doctor section and the team photograph, no third doctor image.

Route by route: [ROUTE_VISUAL_AUDIT.md](ROUTE_VISUAL_AUDIT.md).

## 3. Screenshots (git-ignored, private)

`screenshots/before` (home, services' neighbours and inner pages at 390 and 1440, full page and first screen, taken before this work), `screenshots/after` (the same set after, plus `hero-sheet-1440.jpg`, `hero-sheet-390.jpg`, `explorer-sheet.jpg`, `explorer-plates.jpg`, `cmp-home-1440.jpg` side by side). The services index has no before image; its before state is in `audit-before.json` (5 of 6 tiles showed her).

## 4. Page-gap recommendations

The site has 16 public routes plus a hidden `/videos`. Lean is better than long.

| Candidate | Evidence | Content readiness | Recommendation |
|---|---|---|---|
| Patient information or "your first visit" | "What should I bring?" is already answered on the home, services, doctor, contact and international pages and in the service journeys | Grounded but short; arrival details (hours, documents) are unconfirmed | **ADD TO EXISTING** (it is already there); a separate page would duplicate it |
| Facilities or gallery | Home and About galleries exist; fewer than six photographs, none approved | Not ready | **DEFER** until at least six facility photographs are approved |
| Eye health videos | `/videos` exists and is hidden until three videos are approved; 13 verified videos are placed on the pages already | Verified, not approved | **ADD TO EXISTING** (nothing to build); it appears by itself once approved |
| Consolidated FAQ | Each page already has 4 to 5 contextual questions; a combined page repeats them | None clinician-reviewed | **DEFER**; revisit after clinical review |
| Condition pages (ptosis, watering eye, entropion, squint, LASIK, children's eye care) | Ptosis, tear passages and malposition are covered inside the eyelid and reconstructive pages; squint, LASIK and paediatric are not confirmed services | Services not confirmed | **DEFER** (ptosis, watering eye, entropion: only after the client confirms them and a clinician reviews); **REJECT** squint, LASIK and paediatric pages until the centre confirms it offers them |
| Insurance, payment, cashless | None supplied | None | **REJECT** until the client provides documents |

**No new route was built.**

## 5. Videos

Unchanged in this pass; the verified set and placements are in [../video-integration/README.md](../video-integration/README.md).

## 6. Tests (19 Oct 2026)

- `npm run lint`: clean. `npx tsc --noEmit`: pass. Default production build (a copy outside iCloud): 28 pages.
- Default build: `qa-crawl` passed (all pages noindex), `check-canonicals` passed, `seo-audit` passed, `check-media-exposure` passed (no pending media reachable or named in any page or client file); `/media/archive-cataract-exam.webp`, `/media/hospital-reception.webp` and `/review` return 404; the home page HTML carries no `/media/` or plate reference. Explorer in the default build (brand cards): 88 of 88 checks.
- Preview, explorer matrix `docs/ui-refinement/qa-scripts/treatment-matrix.mjs` (updated to count plates): **94 of 94** (desktop hover, keyboard focus order, focus ring, click-through of all six, preview CTA, rapid sweeps, first-tap navigation on touch at 375, 390, 430 and 768, reduced motion).
- Layout sweep `layout-sweep.mjs` at 320, 375, 430, 768 and 1024 on 12 routes: no horizontal scroll, one `h1`, phone bar present below 768 px only, its buttons at least 44 px (48 px by design).
- Video and shelf regression (`docs/video-integration/qa-scripts/video-qa.mjs`): 388 of 388.
- Image audit: every route loaded and its images read before and after (`audit-before.json`, `audit-after.json`).
- Not run: Lighthouse, real phones, screen readers, non-Chromium browsers, an automated contrast sweep of the new bar and plate caption (colours reuse the existing AA tokens: white on `#A9440D`, graphite on white). I did not use sub-agents. Of the named skills only Superpowers is installed; Frontend Design, Emil Kowalski and Vercel skills are not, so none was used.

## 7. Files

Modified: `src/app/page.tsx`, `src/app/about-us/page.tsx`, `src/app/our-services/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `src/components/Hero.tsx`, `TreatmentExplorer.tsx`, `ServiceLayout.tsx`, `src/components/clinical/FigureHost.tsx`, `ClinicalFigure.tsx`, `src/config/figures.ts`, `src/content/covers.ts`, `src/lib/treatments.ts`, `docs/ui-refinement/qa-scripts/treatment-matrix.mjs`. New: `src/components/MobileActionBar.tsx`, `src/components/clinical/Plates.tsx`, and this folder plus `docs/reference-audit/`. (The working tree also holds the earlier, uncommitted video and archive work.)

## 8. Decisions for the client

1. Approve or replace the photographs and the people in them (consent), and supply full-size originals for the four low-resolution ones.
2. A clinician's review of the three plates (and all figures) before they are shown.
3. Confirm the "A unit of Kalos Health Care Pvt. Ltd." sign wording and the phone number conflict.
4. Say whether the phone bar should stay, and whether WhatsApp or opening hours may ever be shown.
5. Whether to confirm any of the condition pages (ptosis, watering eye, entropion) as services worth their own page.
