# Hover, focus and tap behaviour: treatment explorer

19 Oct 2026. Component: `src/components/TreatmentExplorer.tsx`; data: `src/lib/treatments.ts`; styles: "Find care" block in `src/app/globals.css`. It sits directly under the hero (it replaces the small "Find care" chips) and is the first thing below the banner on every screen size.

## What it does

| Device | Behaviour |
|---|---|
| **Desktop, mouse** (960 px and up) | A list of the six treatments (real Next.js links) and one shared preview. Resting the pointer on a treatment (70 ms hover intent, so sweeping towards the preview does not flicker through the others) or tabbing to it changes the preview: photograph (240 ms crossfade, 3.5 % settle zoom), title, summary, and an "Explore treatment" link. Clicking the label, or the preview link, goes to the treatment page. The preview is always on screen (default: the first treatment) and stays when the pointer leaves the list, so it can be reached and clicked; there is no floating panel to dismiss, so Escape has nothing to close. |
| **Keyboard** | Tab moves through the six labels and the preview follows (visible focus ring); Enter opens the page. |
| **Touch, phones** (under 640 px) | Each treatment is one card with its photograph, title, summary and arrow, in a swipeable snap row. A card is one link: **the first tap navigates**. Nothing needs hover. The next card peeks to show it scrolls. |
| **Tablets and touch laptops** | A grid of the same cards (2 columns; 3 on a wide touch screen). A wide screen **without** a mouse also gets cards, never the hover layout. |
| **No cleared photograph** (every normal build today) | The same layout with a graphite brand card instead of a picture, so the explorer is attractive and fully working in production without any unapproved media. |
| **Reduced motion** | Transitions and the info fade are off; the preview still switches. |

Auto-advance: the hero banner does not advance by itself, so there is nothing to pause while a label is used.

## Results by treatment (review preview, photographs on, 1440 px, Playwright)

| Label | Route | Image id (file) | Image alt (from the media registry) | Hover shows its title | Image visible and loaded | Preview link correct | Click goes to route | Consent state |
|---|---|---|---|---|---|---|---|---|
| Cataract Surgery | `/stitchless-cataract-surgery` | `otModernA` (hospital-ot-modern-a.webp) | An operation theatre with an operating table, operating microscope, su… | pass | pass | pass | pass | Pending: client approval (no people) |
| Glaucoma Management | `/glaucoma-management` | `docSlit` (dr-poonam-jain-slit.webp) | Dr. Poonam Jain seated beside a slit-lamp examination unit in a consul… | pass | pass | pass | pass | Pending: Dr. Poonam Jain's approval, then client |
| Comprehensive Eye Examinations | `/comprehensive-eye-examinations` | `chartDoor` (hospital-chart-door.webp) | A wooden examination-room door with an eye-chart screen beside it… | pass | pass | pass | pass | Pending: client approval (no people) |
| Eyelid Surgery (Blepharoplasty) | `/eyelid-surgery-blepharoplasty` | `docStanding` (dr-poonam-jain-standing.webp) | Dr. Poonam Jain standing in her consultation room with her arms folded… | pass | pass | pass | pass | Pending: Dr. Poonam Jain's approval, then client |
| Aesthetic Oculoplasty | `/aesthetic-oculofacial` | `docBlazer` (dr-poonam-jain-blazer.webp) | Dr. Poonam Jain in a grey jacket standing in a consultation room… | pass | pass | pass | pass | Pending: Dr. Poonam Jain's approval, then client |
| Reconstructive Oculoplasty | `/eye-plastic-reconstructive-surgery` | `otModernC` (hospital-ot-modern-c.webp) | An operation theatre from a corner, with shelving, a trolley, the oper… | pass | pass | pass | pass | Pending: client approval (no people) |

Also verified in the same run: six **different** pictures (no repeat); the preview stays when the pointer moves into it; 40 rapid random hovers leave exactly one correct preview (no stale image); keyboard Tab walks all six in order; focus ring present; Enter navigates; no label is covered by another element (`elementFromPoint`); no console errors or warnings; touch at **375, 390, 430 and 768 px**: card layout, no hover-only panel, no horizontal overflow, every card at least 44 px, swipe moves the row without navigating, **first tap on all six cards navigates**; reduced motion.

**Totals:** review preview with photographs **94 checks, 0 failed** (`hover-matrix-preview.json`); normal build with brand cards (no photographs) **88 checks, 0 failed** (`hover-matrix-default-build.json`). Reproduce: `qa-scripts/treatment-matrix.mjs <url> <out.json> [--no-images]`.

## Notes

- Titles, routes and summaries are the site's existing service entries (`src/config/site.ts`); no new claim was written.
- The six pictures were chosen from the media registry, each with a fallback candidate. Captions describe what a photograph shows, never a procedure or result. **Three of them show Dr. Poonam Jain** (glaucoma, eyelid and aesthetic), so her approval gates those cards; if she declines, the next candidate (or the brand card) appears automatically.
- All six photographs are **pending approval** and appear only in the private review preview. Nothing was approved in this task.
- Evidence: `screenshots/after/states/explorer-1440-hover-1…6.jpg`, `explorer-1440-keyboard-focus.jpg`, `explorer-375/390/430/768/1024.jpg`; videos `demos/treatment-explorer-desktop-hover.mp4` and `demos/treatment-explorer-mobile-swipe-tap.mp4`.
