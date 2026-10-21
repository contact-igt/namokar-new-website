# Comprehensive eye examinations page: content enhancement report

Page: `/comprehensive-eye-examinations` (`src/app/comprehensive-eye-examinations/page.tsx`, `exams` entry in `src/content/services.ts`)
Reference reviewed: the Pixel Eye Hospital all-services page (`/service`).

## What the reference actually offers

The Pixel all-services page is an index of eight services (cataract, LASIK, paediatric, squint, dry eye, retina, keratoconus, glaucoma), each with a short blurb and an "Explore More" link. It has no comprehensive eye examination content at all: no list of tests, no "who needs one", no frequency, no steps and no FAQs. The only related text is a passing "routine eye checks" in the intro and photo captions of children being examined.

So there was nothing to copy. The enhancement below uses the one idea worth borrowing from Pixel's page (each service starts with an evaluation, then the doctor explains the findings and options step by step, in plain language) and fills the gaps with original, general information written for this site.

## Constraints followed

- No new sections. Only the content inside the existing sections changed: hero lead, "What a comprehensive examination is", "What an examination may include", "Reasons to book an eye check", "What an assessment involves" and the FAQ.
- No claims about this centre's equipment, experience, timings or outcomes. Tests are described as things a doctor may use. The page still says it does not list the equipment available.
- Nothing from Pixel's text, doctors, NABH badge, contact details or addresses.
- The clinical figure (`examParts`) is untouched.

## Section-by-section changes

| Section | Before | After |
|---|---|---|
| Hero lead | One sentence | Adds "explained step by step" |
| What a comprehensive examination is | 2 paragraphs | 3 paragraphs: more than a spectacle number and for adults and children; many conditions (cataract, glaucoma, diabetes-related eye changes) develop slowly without pain, so early finding matters; the doctor chooses the tests and explains the findings plainly |
| What an examination may include | 5 items | 7 items. New: history and symptoms; how your eyes work together (movement and alignment). Existing items expanded: both-eye and near/distance vision, what the front of the eye shows (dryness, infection, injury, early cataract), what the back of the eye shows (glaucoma and diabetes changes) |
| Reasons to book an eye check | 5 items | 9 items. New: screen strain, watering or dry or red eyes, floaters and flashes (check promptly), high blood pressure, signs in children, being over 40. The urgent-care note is unchanged |
| What an assessment involves | 5 steps | 6 steps. New "Your history and symptoms" step; "Before you come" adds contact lenses and noting symptoms; the explanation step covers what glasses your eyes need; review depends on age, health and findings |
| FAQs | 4 | 8. New: how this differs from a simple vision test; whether problems can be found before they are noticed; what to bring; whether children should be examined. Frequency answer now mentions diabetes and family history |

## Items for the clinician to confirm

1. "Over 40" as the age at which near-vision change and risk start to rise.
2. The floaters and flashes wording ("should be checked promptly").
3. The children's signs list (squinting, sitting close to screens, rubbing eyes, difficulty reading).
4. Whether eye movement and alignment checks should be described as part of a standard examination at this centre.
5. Whether the FAQ on frequency should give any general guidance beyond "the doctor will advise".

All text is general information and the page stays `reviewed: false` and noindex until sign-off.
