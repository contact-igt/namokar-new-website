# Route visual audit (19 Oct 2026)

Reviewed in the local preview at 390 and 1440 (and 320, 375, 430, 768, 1024 for overflow, headings and tap targets). Before shots: `screenshots/before` (captured before this work). After shots: `screenshots/after`. Both git-ignored.

| Route | Visual direction now | Interaction | CTA | Issues found | What changed |
|---|---|---|---|---|---|
| `/` | Hospital first: four hero slides (reception, operating microscope, eye chart, theatre) with no doctor photograph; explorer; facility gallery (exterior, equipment, theatre entrance); local walkthrough footage; **one** doctor introduction; YouTube shelf; oculoplasty band; why Namokar; FAQ; call to action | Manual hero (arrows, tabs, swipe, arrow keys); explorer hover and focus with first-tap navigation on touch | Hero button, phone bar on phones | 7 doctor photographs; hero slide 1 led with "specialist" only; a second services list repeating the explorer; gallery included a doctor photograph | Rebuilt hero set, hero copy for slide 1 (comprehensive eye care first), gallery without a doctor, duplicate "Our specialised services" section removed, explorer carries all six with distinct pictures |
| `/about-us` | Reception hero, exterior, one doctor section, team photograph, theatre and eye-chart gallery | Gallery lightbox | Book button | A third doctor photograph in the gallery | Consultation-room photograph (doctor) removed from the gallery; team photograph first |
| `/dr-poonam-jain` | Her profile: scrubs portrait hero, two room photographs, talk and clip | Video | Book button | None new | Unchanged in this pass (the right place for her photographs) |
| `/our-services` | Each service shows its own picture, no portrait cards | Tiles and rows are links | Book button | 5 of 6 tiles showed her | Same pictures as the home explorer: photographs for cataract, glaucoma, examinations; line-drawing plates for the three oculoplasty services |
| `/stitchless-cataract-surgery` | Examination in progress hero, surgical console, lens figures, two YouTube videos | Figures, video | Book button | Hero was a theatre photo that repeated on the home page | Hero and second picture reassigned |
| `/glaucoma-management` | Diagnostic instrument photographs; two videos | Video | Book button | Hero was a doctor desk photograph | Reassigned: no doctor image |
| `/comprehensive-eye-examinations` | Eye-chart hero, an examination photograph, two videos | Video | Book button | Hero was a doctor photograph | Reassigned |
| `/eyelid-surgery-blepharoplasty` | Theatre hero, eyelid plate, two videos | Figure, video | Book button | Both pictures were doctor photographs | Reassigned; plate added |
| `/aesthetic-oculofacial` | Her consultation desk (her specialty), aesthetic plate, two Shorts | Video | Book button | The same portrait as About | Different photograph; plate added |
| `/eye-plastic-reconstructive-surgery` | Theatre hero, tear-passage plate, entropion video and Short | Figure, video | Book button | Theatre photograph shared with the home hero | Plate added as the second picture |
| `/international-patients` | Exterior and reception | none | Contact | None | Unchanged; no travel, accommodation or insurance claim |
| `/contact-us` | Exterior, call and directions first | Map on demand | Call | None | Unchanged |
| `/testimonials`, `/blogs`, `/blogs/[slug]` | Honest empty states | none | none | None | Unchanged |
| `/privacy-policy`, `/terms-and-conditions` | Plain text drafts | none | none | None | Unchanged |
| `/videos` | Hidden (404) until three videos are approved | | | | Unchanged |
| 404 and error | Plain branded page | | | | Unchanged |

Site-wide: a fixed phone-only bar (appointment action, Directions), 48 px targets, hidden from 768 px; body gets bottom padding on phones.

Remaining visual issues I know of:
- The treatment plates are simple line art and look small as list thumbnails on the services index; they are clearest in the explorer preview and on the service pages.
- The "Local design review" badge sits over page content on phones in the preview (preview only; it does not exist in the default build).
- The hero's vertical photographs (eye chart, diagnostic test) are cropped to the landscape frame; the subject is centred but part of the picture is lost.
- Four photographs are low-resolution web copies (see the matrix).
