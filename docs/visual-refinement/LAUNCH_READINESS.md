# Launch readiness — 20 Oct 2026

## Technical state

The visual refinements are implemented in the current local working tree. The site remains in review mode: all public route entries are `reviewed: false`, indexing is off, `/videos` stays hidden until three videos are approved, and pending media and figures remain inaccessible in a default public build. No commit, push or deployment has occurred.

The mobile action bar is worth retaining provisionally. The appointment and Directions targets are at least 48 px high, sit within thumb reach, include safe-area padding, and the body reserves space below the last content. It is still awaiting client UX approval. The Directions link opens an address search; an exact verified map pin has not been supplied.

## Decisions required before publication

| Gate | Evidence / decision needed |
|---|---|
| Contact and business facts | Confirm the correct number: `+91 98104 19720` is in `src/config/site.ts`, while an approval document also lists `7827455040`. Confirm address, landmark and exact map pin. Confirm whether the exterior sign's “A UNIT OF KALOS HEALTH CARE PVT. LTD.” is the approved legal relationship and whether the image may be shown as captured. |
| Medical and credential review | A named clinician must review all service copy, FAQ answers, cataract-pattern drawings, revised lens-design wording and all other pending figures. Verify Dr. Poonam Jain's degree, fellowship and observership wording; the home page currently gives institutions more specifically than About and the doctor page. |
| Image rights and quality | Obtain consent for everyone identifiable (doctor, staff, patients), client approval for every facility image and footage item, and full-size authentic originals for the compressed glaucoma, staff-equipment and team photographs. The possibly retouched archive doctor portrait is no longer placed; its source remains unapproved. |
| Articles, testimonials, videos | No article or testimonial should be invented to fill a grid. Existing videos need client and content sign-off; the separate `/videos` route intentionally remains hidden until three videos are approved. |
| Legal and release | Privacy and terms pages are drafts pending legal review. Do not enable `ALLOW_INDEXING`, approve assets, set `reviewed: true`, or deploy until the relevant sign-offs are recorded and the default build's media/SEO checks are repeated. |

## Recommended next action

Conduct one joint clinical and client review using the loopback preview and the approval registry. Record explicit choices for the phone number, sign wording, portraits, people shown, cataract/IOL drawings and mobile action bar. Then approve individual registry entries, rerun the public-safe build and security checks, and only then plan deployment.
