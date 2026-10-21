# Glaucoma page: content enhancement report

Page: `/glaucoma-management` (`src/app/glaucoma-management/page.tsx`, `src/content/services.ts`)
Reference reviewed: the Pixel Eye Hospital glaucoma page (`/service/glaucoma`), used only to compare topic coverage and section order. No wording, images, doctor details or claims were copied. All new text is original, general patient information and still needs clinician sign-off (the page stays `reviewed: false` and noindex).

## Section-by-section comparison

| # | Pixel section | Namokar before | Gap | Action taken |
|---|---|---|---|---|
| 1 | Hero: "silent eye condition" | H1 and lead on regular check-ups | None | Kept |
| 2 | What is glaucoma? | Two paragraphs | Missing the "silent thief of sight" idea and the permanent-loss warning | Added a paragraph to the intro |
| 3 | Symptoms you may notice (glasses changes, tunnel vision, bumping, brighter light, blur, vague pain) | None | Missing section | New "Changes you may notice" section with a caution that none of these proves glaucoma |
| 4 | What can lead to glaucoma (pressure, family, age 40+, diabetes/BP, steroids, injury) | Five-item "Who should have regular eye checks" list | Missing age 40, diabetes or high blood pressure, known high pressure | List expanded to seven items |
| 5 | Types (POAG, normal-tension, acute angle-closure with emergency signs) | Only an FAQ on normal pressure | Missing section | New "Common types of glaucoma" cards plus an emergency callout |
| 6 | How it is diagnosed (tonometry, visual field, optic nerve, OCT) | Three checks | Missing OCT, gonioscopy and corneal thickness | "How glaucoma is found and followed" now lists six tests, worded as tests a doctor may use |
| 7 | Treatments (in FAQ: drops, laser, MIGS, surgery) | One journey step | Missing section | New "How glaucoma is treated" section covering drops, laser and surgery, and that treatment cannot restore lost vision |
| 8 | Clinical expertise, doctor cards | n/a | Pixel's doctors and qualifications are not ours | Not added (see below) |
| 9 | FAQs (9 questions) | 4 questions | 6 missing | Added: silent thief, early symptoms, who is at risk, diagnosis, treatments, follow-up frequency, when to see a specialist (now 11) |
| 10 | Patient experiences | n/a | Pixel's reviews are mostly cataract and dry eye, not glaucoma | Not added (see below) |
| 11 | Footer, contact, floating CTAs | Site-wide | None | No change |

Kept from the existing Namokar page and not on Pixel: the two interactive figures (fluid drainage, side-vision narrowing), the assessment journey, the related-care links and the booking call to action.

## Deliberately not carried over

- NABH badge, doctor names and qualifications, patient ratings and testimonials: not approved (`docs/NAMOKAR_CONTENT_VERIFICATION.md`).
- Pixel's YouTube links and its phone, email and addresses: videos come from `src/content/videos.ts` only, and contact details live in `src/config/site.ts`.
- An image of a squint shown under "What is glaucoma?" on Pixel is the wrong condition. We use our own glaucoma figures instead.
- Claims of "experienced ophthalmologists" or "advanced diagnostics" at this centre. The tests are described as general medical information, not as equipment we offer.
- Duplicate sections: Pixel repeats several blocks on the page.

## Items for the clinician to confirm

1. "MIGS" is now named under surgery as a general category of treatment; confirm the wording.
2. Which of OCT, gonioscopy and corneal thickness the centre actually performs. The page says "tests a doctor may use", so it makes no offer claim, but the clinician may want to tighten or extend this.
3. "Over 40" as the age risk marker.
4. A follow-up-frequency FAQ was added and defers to the doctor; confirm.
5. Add glaucoma-specific photographs only once they are approved in `src/config/assets.ts`.
