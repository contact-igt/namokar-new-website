# Blepharoplasty page: content enhancement report

Page: `/eyelid-surgery-blepharoplasty` (`src/app/eyelid-surgery-blepharoplasty/page.tsx`, `eyelid` entry in `src/content/services.ts`)
No reference site was given for this page, so all additions are original general patient information. Nothing is copied from another site.

## Constraints followed

- Existing sections only; no new sections or layout changes. The clinical figure (`eyelidPosition`) is untouched.
- No claims about this centre's surgeons, experience, technique, equipment, anaesthesia, hospital stay, recovery times or results. Phrases such as "the doctor explains" and "no result can be guaranteed" are kept.
- No before-and-after language, no "scarless", "painless" or "natural-looking results" promises.
- Everything stays `reviewed: false` and noindex until a clinician signs it off.

## Section-by-section changes

| Section | Before | After |
|---|---|---|
| Hero lead | "The first step is to find out why." | Now "a careful assessment to find out why" |
| What is blepharoplasty? | 2 paragraphs | 3 paragraphs. What the operation does (removes or repositions skin and, where needed, fat; upper, lower or both); why eyelids change (ageing, inherited tendency) and why surgery is only one possible outcome; the assessment looks at eyelid closure, tear film and general health so any plan keeps the eye comfortable and safe |
| Functional or cosmetic? | 3 + 3 bullets | 5 + 5 bullets. Functional adds head-tilting or brow-lifting to see and irritating skin folds. Cosmetic adds hooded lids hiding the crease and uneven-looking lids. Lead adds that the eyelids are examined first |
| Upper eyelid position figure | Unchanged | Unchanged |
| Reasons to ask for an assessment | 5 items | 8 items. New: tilting head or lifting brows to see, tired eyes by end of day, skin resting on lashes or irritating the fold. Urgent note now includes eye pain |
| What an assessment involves | 5 steps | 6 steps. "Consultation and history" now covers general health, medicines, eye or thyroid conditions and earlier surgery; "Examination" covers lid position and movement, closure, tear film and working out whether skin, fat, ptosis or a mix is involved; risks step mentions not having surgery as an option; planning step adds what to tell the team beforehand |
| FAQs | 4 | 9. New: is it only cosmetic; who might be suitable; can upper and lower lids be treated together; visible scars; effect on dry eyes. Risks answer adds dryness. Recovery answer notes common early swelling, bruising and dryness without giving timings |

## Items for the clinician to confirm

1. Whether the thyroid and dry-eye history questions match how the centre takes a history.
2. The wording on incisions "planned to lie in natural creases where possible".
3. That upper-and-lower lid treatment together can be mentioned generally.
4. The dryness and early swelling or bruising wording in the risks and recovery answers.
5. Whether to describe suitability more specifically; it currently defers to the examination.
6. Any photographs for this page only after approval in `src/config/assets.ts`.
