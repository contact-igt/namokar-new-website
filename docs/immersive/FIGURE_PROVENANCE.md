# Figure provenance and approval status

Updated 20 Oct 2026. Registry: `src/config/figures.ts`. **All clinical figures and the three treatment plates are pending. None is approved.**

## How they were made

- **Original vector illustrations drawn in code** (React and inline SVG) for this site on 18 Oct 2026, in the brand palette (graphite `#243238`, orange `#D66B1F`, dark orange `#A9440D`, porcelain `#F7F9FA`, orange mist `#FFF2E8`).
- **No AI image generation** (no Gamma, no other tool), **no stock art**, **no photographs**, **no likeness of any doctor, staff member or patient**, no patient outcome, no hospital interior or equipment. The street scene is an abstract graphic of buildings, a tree and a sign.
- **No image-generation credit was spent.** Nothing chargeable was run.
- Source of every anatomical drawing: schematic, simplified and not to scale, drawn from general anatomical knowledge, **not** copied or traced from any textbook, website or atlas. It has not been checked against a reference by a clinician. That is the reviewer's job.
- Library: the cataract steps use Motion's small WAAPI build (`motion/mini`); everything else is CSS. Licence: Motion is MIT licensed; nothing else was added.

## Register

| Figure id | Page | What it shows | Source | Reviewer must check | Status |
|---|---|---|---|---|---|
| `eyeAnatomy` | Cataract | Eye cross-section; seven parts; healthy or clouded lens; light drawn focused or scattered | Original SVG | Labels, proportions, definitions; light-ray simplification | **Pending** |
| `cataractPatterns` | Cataract | Matched clear/clouded natural lenses and three region-based cataract patterns | Original SVG, 20 Oct 2026 | Front/back orientation, clouding regions, wording and scale caveat | **Pending** |
| `lensCompare` | Cataract | Drag to compare clear and clouded views of an abstract scene; three strengths (blur, faded colour, glare) | Original SVG and CSS filters | That the simulation is fair and not alarming; caveat wording | **Pending** |
| `lensDesigns` | Cataract | Simplified focus illustrations: monofocal, multifocal, toric and EDOF | Original SVG, EDOF state and copy revised 20 Oct 2026 | Accuracy of each description and optical simplification; no availability or outcome promise | **Pending** |
| `cataractSteps` | Cataract | Four steps: clouded lens, small opening, lens removed, clear lens placed | Original SVG; Motion mini | Order and wording; nothing implies a technique, duration or result | **Pending** |
| `glaucomaFlow` | Glaucoma | Fluid made, flows through the pupil, drains at the angle; slowed drainage and pressure | Original SVG | Fluid pathway; wording on pressure and the optic nerve; normal-pressure glaucoma noted | **Pending** |
| `sideVision` | Glaucoma | Side vision narrowing in three stages | Original SVG and CSS | Appropriateness and tone | **Pending** |
| `examParts` | Eye examinations | Five examination steps paired with parts of the eye; a letter chart | Original SVG | Pairings (for example eye pressure with the front of the eye) | **Pending** |
| `eyelidPosition` | Eyelid surgery | Typical, drooping and excess-skin upper lid | Original SVG | Correct depiction of ptosis and excess skin; not diagnostic | **Pending** |
| `tearPathway` | Reconstructive | Gland, puncta, canaliculi, sac, duct; blocked passage and watering | Original SVG | Anatomy and wording | **Pending** |
| `lidMalposition` | Reconstructive | Lower lid in section: typical, entropion, ectropion | Original SVG | Both schematics and one-line descriptions | **Pending** |
| `consultationQuestions` | Aesthetic | Checklist of five consultation questions with "Copy my list" | The page's own questions | That the questions are appropriate; no clinical diagram | **Pending** |

## Statements first written for these figures

The older page text is already in the medical-claims register (docs/seo-aeo/CONTENT_PROOFREAD.md). These sentences are new and are the ones to read most carefully:

- "In a cataract, the lens becomes cloudy." / "With a clear lens, light focuses at one point on the retina." / "With a clouded lens, light is scattered, so it does not focus as sharply on the retina."
- "A cataract can make vision look blurred or dim, colours look faded or yellowed, and bright light glare. How much, and when, varies from person to person."
- The four replacement-lens descriptions and the new cataract-pattern wording are transcribed in `FIGURE_TEXT_FOR_REVIEW.md` and need fresh clinical sign-off.
- "The inside of the front of the eye is kept in balance…" and "In many people with glaucoma, the fluid drains too slowly and the pressure inside the eye rises. Over time, raised pressure can damage the optic nerve. Some people develop glaucoma with pressure in the usual range."
- "The edge of the upper lid sits near the top of the coloured part of the eye, and the whole pupil is clear." and "Extra skin can hang over the lid edge and rest on the eyelashes…"
- The four surgery steps (including "A very small opening is made at the edge of the cornea so the surgeon can reach the lens.").
- The definitions of puncta, canaliculi, tear sac and tear duct.

## Process to approve a figure

1. The reviewer reads FIGURE_TEXT_FOR_REVIEW.md and looks at the figure in the review preview (`npm run dev:preview`, http://localhost:3100).
2. The reviewer signs (name, registration number, date) and marks changes; the developer applies them.
3. Record the sign-off in `docs/NAMOKAR_CONTENT_VERIFICATION.md`, fill `reviewer` and set `approved: true` for that figure only in `src/config/figures.ts`.
4. Rebuild with no preview variable and confirm the figure appears without the preview tag (`node scripts/qa-crawl.mjs` and the page screenshots).
