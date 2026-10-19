# Image placement matrix

All photographs below are **pending approval** (only the logo is approved), so none is visible in a default production build. Where an image is hidden, the page falls back as noted. "Preview" means `npm run dev:preview` / `ASSET_PREVIEW=on`, where each carries a "Preview only: not approved" tag.

Components: `AssetImage` (gate), `EditorialImage` (fixed-ratio frame with caption), `FacilityGallery` (asymmetric set + lightbox), service tiles and thumbnails (`our-services`), `PageHero` media. Cover choices live in `src/content/covers.ts`.

| Page | Slot | Asset (registry key → file) | Subjects | Production-default fallback |
|---|---|---|---|---|
| `/` | Hero slide 1 | reception → hospital-reception.webp | receptionist | "Visit the centre" panel |
| `/` | Hero slide 2 | consultation → hospital-consultation-room.webp | Dr. Poonam Jain | same panel (hero shows panel when either photo is missing) |
| `/` | "Take a Closer Look" gallery (4, lightbox) | otWide, consultation, consoleWide, exterior | none; doctor in consultation | section omitted |
| `/` | Clinic walkthrough | walkthroughVideo + walkthroughPoster | none | section omitted |
| `/` | Doctor section | portrait → dr-poonam-jain-portrait.webp | doctor | "PJ" name plate |
| `/` | Cataract feature card | otScope → hospital-ot-scope.webp | none | card without image |
| `/` | Oculoplasty band | artIris → art-iris-macro.webp (AI, labelled "Conceptual image") | none | text only |
| `/about-us` | Hero | reception | receptionist | "At a glance" panel |
| `/about-us` | About Namokar, lead image | exterior → hospital-exterior.webp | none | omitted |
| `/about-us` | Doctor | portrait | doctor | name plate |
| `/about-us` | Inside Our Hospital (5, lightbox) | reception, consultation, otWide, equipment, chartDoor | receptionist, doctor | whole section omitted |
| `/dr-poonam-jain` | Hero | portrait | doctor | name plate |
| `/dr-poonam-jain` | In the consultation room (pair) | docSlit, docBlazer | doctor | section omitted |
| `/our-services` | Vision-care tiles | otScope (cataract), docDesk (glaucoma), docSlit (examinations) | none / doctor | tiles without images |
| `/our-services` | Oculoplasty rows (thumbnail, tablet+) | docStanding (eyelid), reception (aesthetic), otWide (reconstructive) | doctor / receptionist / none | rows without thumbnails |
| `/stitchless-cataract-surgery` | Hero + supporting | otScope; consoleWide | none | help panel |
| `/glaucoma-management` | Hero + supporting | docDesk; chartDoor | doctor | help panel |
| `/comprehensive-eye-examinations` | Hero + supporting | docSlit; chartDoor | doctor | help panel |
| `/eyelid-surgery-blepharoplasty` | Hero + supporting | docStanding; docBlazer | doctor | help panel |
| `/aesthetic-oculofacial` | Hero + supporting | reception; docBlazer | receptionist, doctor | help panel |
| `/eye-plastic-reconstructive-surgery` | Hero + supporting | otWide; otEntrance | none | help panel |
| `/international-patients` | "What you will see" pair | exterior, reception | receptionist | section omitted |
| `/contact-us` | Hero | exterior | none | text hero |
| `/testimonials`, `/blogs` | none by design | | | honest empty states kept |
| legal, 404, error | none | | | |

Registered but not placed: `theatre` (hospital-operation-theatre.webp, superseded by otWide), `artLens` (AI lens still life, no longer used on the cataract card, which now shows a real theatre photograph).

## Honest limits of the choices
- **Service pages use what exists.** There is no photograph of a cataract operation, an eyelid consultation, a glaucoma test or reconstructive work, and none is faked. Captions say only what the picture shows ("an operating microscope in an operation theatre"; "a consultation room"). Glaucoma, eyelid, aesthetic and examinations covers are consultation-room photographs of the doctor, which is a weak match to the topic; they are marked for replacement in `MISSING_SHOTS.md`.
- **No image implies a patient, procedure or result.** Equipment and theatre pictures are empty rooms.
- **The exterior** shows the legal-entity line "A unit of Kalos Health Care Pvt. Ltd." on the sign. Confirm the client is content to show it.

## Interactions delivered
- Hover zoom (about 1.03, 600–700 ms ease) on gallery photos, tiles and editorial images, only for `(hover: hover) and (pointer: fine)`; disabled under reduced motion.
- Lightbox (`FacilityGallery`): native modal `<dialog>`; opens by click or tap, Previous/Next buttons and Left/Right keys, caption with "n of N" announced politely, Close button, Escape and backdrop click, focus returns to the photograph that opened it. No hover dependency.
- Arrow nudge on service tiles and rows.
