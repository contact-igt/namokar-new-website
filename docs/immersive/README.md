# Immersive upgrade: interactive medical explainers and a motion system

18 Oct 2026. An enhancement of the existing site, not a rebuild. **Nothing was committed or deployed, indexing is still off, nothing is marked medically approved, and no image-generation credit was spent.**

> **Brief file:** `NAMOKAR_IMMERSIVE_UPGRADE.md` was **not found** on this computer (searched Downloads, the project and the home folder), so the work follows the priorities in the request message. Send the file's path and any difference will be reconciled.
>
> **Skills:** Superpowers was available and its verify-before-claiming rule was followed. Anthropic's `frontend-design`, an Emil Kowalski skill and a Vercel React/Design skill are **not enabled in this session** (only the catalogue entry for `frontend-design` exists), so they were not used; the motion principles listed in `src/components/motion/tokens.ts` come from general practice, not from those skills.

## 1. The safeguard that shapes everything

Every illustration and interactive explainer is **medical content**, so each one is a **pending figure** in a registry (`src/config/figures.ts`) that works exactly like the photograph registry:

| State | What a visitor sees |
|---|---|
| Default (review) build, `approved: false` | **Nothing.** The page keeps its plain text, no figure code is rendered, and the page's own HTML contains no diagram (verified on every page) |
| Local review preview (`ASSET_PREVIEW=on`, never production) | The figure with an orange **"Preview only: pending medical review"** tag |
| After a named clinician signs it off and `approved: true` is set | The figure, without the tag |

The aesthetic page's static list of questions is shown in the default build and replaced by the interactive checklist only when that figure is usable. Nothing was changed in `reviewed`, `ALLOW_INDEXING`, the media registry or the booking logic.

## 2. Every route and what changed

| Route | Upgrade |
|---|---|
| `/` Home | The four-slide hospital-first banner (centre, cataract, comprehensive care including glaucoma, oculoplasty) from the SEO phase: swipe, buttons, tabs, arrow keys, no autoplay. New: subtle desktop photograph parallax |
| **`/stitchless-cataract-surgery`** | **Four interactive figures:** (1) eye cross-section with seven selectable parts and a healthy/clouded lens switch that changes how light is drawn; (2) a drag-to-compare "clear vs clouded" view with three strengths; (3) the three replacement-lens designs as ray diagrams; (4) **cataract surgery in four steps**, user-controlled (Previous, Next, Play, Pause, Replay, numbered steps) |
| `/glaucoma-management` | (1) How fluid is made and drains, with a "drainage slowed" switch and a pressure meter; (2) how side vision can narrow gradually (three stages) |
| `/comprehensive-eye-examinations` | Five examination steps, each paired with the part of the eye it looks at (an eye chart for "how well you see") |
| `/eyelid-surgery-blepharoplasty` | Upper eyelid: typical, drooping (ptosis), excess skin |
| `/aesthetic-oculofacial` | Interactive checklist of the page's five consultation questions, with "Copy my list" (nothing stored or sent) |
| `/eye-plastic-reconstructive-surgery` | (1) How tears drain (gland, puncta, canaliculi, sac, duct) with a "passage blocked" switch; (2) lower eyelid in section: typical, turning in (entropion), turning out (ectropion) |
| `/about-us`, `/dr-poonam-jain`, `/our-services`, `/international-patients`, `/contact-us`, `/testimonials`, `/blogs`, legal drafts, `/videos` | No new content. They gain the shared motion layer: desktop photograph parallax (where a photograph exists), page entrance on navigation, press feedback, and the breadcrumb fixes below |

Site-wide fixes found while testing: the breadcrumb wrapped when the web font loaded and shifted the page (layout shift 0.12 on four pages, now 0.00 to 0.016); breadcrumb links were 39 px wide (now 44 px); figure labels were under 14 px.

## 3. New components (all in `src/components`)

| Component | What it is |
|---|---|
| `clinical/ClinicalFigure` | The single gate: checks the registry, adds the preview tag and the standard caveat caption; renders the figure through `FigureHost` only when usable |
| `clinical/EyeBase`, `Scene` | Shared vector parts (the eye cross-section; an abstract street scene), drawn in code in the brand palette |
| `clinical/EyeDiagram`, `LensCompare`, `LensDesigns`, `CataractSteps` | The four cataract figures |
| `clinical/GlaucomaFlow`, `SideVision`, `ExamParts`, `EyelidPosition`, `TearPathway`, `LidMalposition`, `ConsultationQuestions` | The other pages' figures |
| `clinical/FigureHost` | Maps a figure id to its component, each loaded as its own code-split chunk on the client |
| `clinical/Segmented`, `PartList` | Accessible 44 px segmented control and part picker (real buttons, `aria-pressed`) |
| `motion/tokens.ts` | The motion vocabulary: strong ease-out, 120 to 450 ms, transform and opacity only, press scale 0.97, reduced-motion rules |
| `motion/Parallax`, `motion/useMedia` | Dependency-free desktop-pointer parallax; media-query hooks |
| `app/template.tsx` | Page entrance (200 ms opacity and 6 px shift) on client-side navigation only |
| `config/figures.ts` | The figure approval registry |

## 4. The motion system, and why it looks like this

- **CSS for simple states** (hover, press, selected, panel swaps, fades, the pressure meter). Hover effects apply only on a fine pointer (`@media (hover:hover) and (pointer:fine)`); every button gives press feedback.
- **Motion for React (`motion@14.3.0`) only where an interaction is genuinely sequenced:** the cataract surgery picture, using Motion's tiny WAAPI build (`motion/mini`, about 2 KB). GSAP was not needed and not installed.
- **Why not Motion everywhere:** the first version used Motion's React components for all figures. Measurement showed that cost about **52 KB gzipped on every page**, even in the default build where the figures are hidden (Next preloads the client chunks of components a page imports), so it was replaced. Default-build JavaScript per page fell from 240 KB to **160 KB** (20 files to 15), and no page downloads `motion/react`.
- **Route transitions:** React's `<ViewTransition>` was tried and **removed**: it delayed the home page's largest paint on a throttled phone from 0.90 s to 1.31 s. Replaced by `app/template.tsx`, which animates only client-side navigations, so the first page costs nothing.
- **Reduced motion:** CSS animations and transitions are off, parallax is not attached, the surgery picture changes without animation, and the page entrance is off (all tested).
- **Touch:** every figure control is a 44 px button; the compare slider works by drag, tap and the keyboard (it is a real range input).

## 5. Illustrations: provenance

All 11 figures are **original vector illustrations drawn in code** for this site. **No AI image generation, no stock art, no photographs of people, patients, results or facilities, no fake doctor imagery.** Full list, sources and what each reviewer must check: [FIGURE_PROVENANCE.md](FIGURE_PROVENANCE.md). The exact wording a clinician must approve, in every control state: [FIGURE_TEXT_FOR_REVIEW.md](FIGURE_TEXT_FOR_REVIEW.md).

**Image-generation authorisation:** none was needed or requested. Vector art is better for clinical diagrams (exact, editable, reviewable). If you want any raster or AI artwork (for example editorial section art), that is a chargeable batch and I will ask first, with a count and a cost.

## 6. Evidence

> The screenshots and videos show **unapproved photographs** (the home banner and page heroes in the review preview), so `docs/**/screenshots/` and `docs/**/demos/` are git-ignored and must not be published. The figures themselves contain no photographs.

| What | Where |
|---|---|
| **Screenshots of every figure** (phone 390 px and desktop 1440 px) | `screenshots/figures/<page>-<figure>-<width>.png` |
| Hero banner, all four slides | `screenshots/hero/390-slide-1…4.png`, `1440-slide-1…4.png` |
| Every route, full page, phone and desktop | `screenshots/pages/` (34 images) |
| **Demo videos** (≈55 s each: banner, then every figure, tapped or clicked) | [`demos/immersive-tour-desktop.mp4`](demos/immersive-tour-desktop.mp4), [`demos/immersive-tour-mobile.mp4`](demos/immersive-tour-mobile.mp4) |
| Reproducible tests and recorders | `qa-scripts/` (see section 8) |
| Interaction test results | `interaction-tests.json` |
| Layout sweep (overflow, text size, broken images, tap targets) | `layout-sweep-preview.txt` |
| Performance | `perf-default-build.txt`, `perf-review-preview-build.txt` |

## 7. Test results (18 Oct 2026, fresh builds)

| Check | Result |
|---|---|
| `npm run lint` | Pass, no warnings |
| `npx tsc --noEmit` | Pass |
| `npm run build` (default, no variables) | Pass, 27 pages |
| **Interaction suite** on the production review-preview build (Playwright, Chromium) | **73 checks, 0 failed**: every figure on desktop (mouse) and phone (touch), keyboard operation (Enter on a focused control, arrow keys on the slider), the surgery stepper (Next, Previous, Play advances, Pause holds, no movement without a click for 3.5 s, Replay), all figure controls at least 44 px, no console errors, reduced motion (transitions off, parallax off, picture still changes), parallax on for a desktop pointer and off for touch, page entrance only after navigation and off for reduced motion |
| Layout sweep, 17 routes × 2 widths | **34 of 34 clean**: no horizontal scroll, no text under 14 px, no broken images, no tap target under 40 px, no console errors |
| Default build: figures hidden | **0 figures and 0 "pending review" strings in the HTML** of all six treatment pages |
| `scripts/qa-crawl.mjs` | Pass: 16 of 16 routes 200, 200 media guesses all 404, 16 of 16 noindex |
| `scripts/check-canonicals.mjs`, `scripts/seo-audit.mjs` | Pass (canonical, Open Graph, robots, no structured data in the default build) |
| `scripts/check-media-exposure.mjs` | Pass: 2,952 probes, 41 confidential files, none reachable or in the build |
| Default build, throttled phone (4× CPU, 1.6 Mbit/s) | **Largest paint 0.76 to 0.91 s on all 12 routes**; layout shift 0.000 to 0.016; JavaScript 160 KB per page |
| Review-preview build, throttled phone | Home 1.28 s (hero photograph), treatment pages 0.9 to 1.05 s, layout shift 0.000 to 0.015. Each figure's code is 4 to 10 KB gzipped and loads only on its page |

**Not done (and not claimed):** Lighthouse, real phones and tablets (swipe feel, the compare slider on a real touch screen), a screen-reader pass (VoiceOver, TalkBack), a keyboard-only walkthrough by a person, and cross-browser testing beyond Chromium. SVG labels were enlarged for phones but their legibility on a real device is unconfirmed. The demos show Chromium screencasts, not a physical device.

**How the final numbers were obtained:** from a copy of the project in a folder outside iCloud. In the iCloud-synced project folder, iCloud deleted rebuilt files late (build chunks whose names were unchanged), which gave false 500 errors during testing; see `docs/DEV_ENVIRONMENT.md`. Build and test outside iCloud, or move the project.

## 8. Reproduce

```
ASSET_PREVIEW=on npm run build && ASSET_PREVIEW=on npx next start -p 3106   # review preview (never deploy)
node docs/immersive/qa-scripts/immersive-qa.mjs http://localhost:3106 out.json   # 73 checks
node docs/immersive/qa-scripts/figs.mjs http://localhost:3106 /stitchless-cataract-surgery shots 390 1440
node docs/immersive/qa-scripts/demos.mjs http://localhost:3106 vid                # frames; stitch with ffmpeg
```

The scripts need `playwright-core` and a Chromium headless shell (the path is set at the top of each file); they are not project dependencies. Local review preview: `npm run dev:preview`, then http://localhost:3100.

## 9. Remaining approvals (nothing here is approved)

1. **Medical review of all 11 figures** by a named, qualified clinician: [FIGURE_TEXT_FOR_REVIEW.md](FIGURE_TEXT_FOR_REVIEW.md) has every sentence in every state. Record name, registration number and date in `src/config/figures.ts` (`reviewer`) and in `docs/NAMOKAR_CONTENT_VERIFICATION.md`, then set `approved: true` per figure. Points for the reviewer: the "clouded lens" simulation (blur, fading, glare), the four-step surgery outline ("a very small opening", "the clouded lens is taken out"), the glaucoma pressure explanation and the side-vision narrowing, the eyelid and lid-malposition schematics, and "Spectacles may still be wanted for reading" (distance lens).
2. The existing items in the client approval package are unchanged: copy sign-off for the pages, photographs, videos, legal text, phone and credential conflicts, written publication authority.
3. Decide whether the figures should ship at launch or after all treatment pages are reviewed (each can be approved separately).
4. Autoplay on the banner remains a decision (project rule: none).
5. Lighthouse, real devices and screen readers before launch (LAUNCH_READINESS_CHECKLIST.md section 10).
