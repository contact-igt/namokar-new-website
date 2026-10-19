# Namokar homepage: content verification ledger

Reviewed 15 Oct 2026. Source for everything below is the published site `namokareyecare.com` plus the project brief. Nothing here has been confirmed by the client yet unless marked.

| Claim / item | Where used | Source | Status | Action |
|---|---|---|---|---|
| Dr. Poonam Jain, Medical Director & Senior Ophthalmologist | Hero, trust strip, doctor section | Brief, live site | Supported | None |
| Fellowship in oculoplasty, Barraquer Institute, Barcelona | Hero chip, trust, doctor | Brief, live site ("oculoplasty"; the March call said "aesthetic oculoplasty") | Needs approval of exact wording | Confirm title |
| Observership, Wilmer Eye Institute, Johns Hopkins | Trust, doctor | Brief; live site says "Johns Hopkins Hospital" | Needs approval | Confirm institution name |
| MBBS (Maulana Azad Medical College), MS Ophthalmology (Safdarjung Hospital) | Doctor section | Live site only | Needs approval | Confirm |
| Phone +91 98104 19720 | Header, hero, CTA, footer | Live site and the clinic signboard in the 21 July video (which also shows a second number, 7827455040). Internal notes mention a different common IVR | **Blocker** | Confirm which number is live before launch (edit `SITE.phone`) |
| Two AI-generated conceptual images (iris macro in the Oculoplasty section, lens still life on the Cataract card) | Oculoplasty section, services | Generated 15 Oct 2026, see `assets-src/ai-generated/PROVENANCE.md` | Needs client approval; the iris image carries a "Conceptual image" label | Approve, or replace with licensed photography |
| Address 13A, Pocket A, Phase 3, Ashok Vihar, Delhi 110052; near Satyawati College, opposite Madrina Restaurant | CTA, footer, JSON-LD | Live site | Needs check against active listing | Confirm |
| Directions link | CTA, footer | Google Maps search built from the address text | Not a verified listing pin | Replace with the clinic's real Maps link |
| Service links (cataract, aesthetic, reconstructive, glaucoma, all services), About, Contact | Nav, cards, CTAs | Live site URLs | Exist on the live site; not re-checked for content | None |
| Comprehensive Eye Examinations link | Service card | No dedicated page found | Links to services overview | Provide page if one exists |
| Education/first-visit and FAQ copy | Visit, FAQ | Written conservatively for this build | Needs doctor review | Doctor to approve wording |
| Hero/“doctor-led” positioning copy | Hero, doctor, why | Brief positioning | Needs approval | Confirm |

## Hospital photography and video (added 15 Oct 2026)
Sources are the client's own folders already on this machine: the July 2026 photo shoot (`~/Downloads/IMAGES`, same files as the Drive "Hospital images" and "July photos" folders) and the July 2026 hospital clips (`~/Downloads/VIDEO`, same as the Drive "Hospital videos" folder). Metadata (including GPS) is stripped in the WebP copies. The Drive links themselves could be listed but not downloaded from here, so the local copies were used.

| Image / media | Where used | Source file | People shown | Status |
|---|---|---|---|---|
| Reception (hero) | Hero, slide 1 | IMG_4308.heic, cropped on the right to remove a wall QR code | One receptionist, small and distant | **Needs staff consent**, or swap |
| Consultation room | Hero slide 2, gallery | IMG_0026.JPG | Dr. Poonam Jain | Doctor's own approval |
| Operation theatre | Gallery | IMG_0037.JPG | None | Client approval |
| Dr. Poonam Jain portrait | Doctor section | IMG_0033.JPG | Dr. Poonam Jain | Doctor's own approval |
| Walkthrough video (33 s, silent) | "Step Inside Our Centre" | Cut from IMG_4306, 4228, 4251, 4259, 4260, 4274, 4266, 4262, 4273 | None identifiable (one gloved hand at frame edge in two clips) | **Hidden until approved** (`ASSETS.walkthroughVideo.approved`) |
| Walkthrough poster | Same section | Frame from IMG_4260.MOV | None | With the video |

Reviewed and not used: team group photos (IMG_0046–0060; many identifiable staff, one frame shows reception counter with team), photo walls (third-party portraits), IMG_0058 (an insurer "empanelled with" board: an unverified claim), exterior signboard (shows another doctor's name and phone numbers), patient examination shots (identifiable patients), and the earlier agency video with the burned-in NABH mark. The 33 s cut is shorter than the 60–120 s target because only face-free clips were used; a longer cut needs staff and patient consent.

## About Us and Contact Us pages (added 16 Oct 2026)
The About copy uses only facts already in this ledger; the live About page was read as research only. It contains template filler ("Dr. Michael Reynolds, Founder Healix", a garbled mission statement, a testimonial from "Rajesh Kumar"), an NABH claim, "25+ years" and "over 28 years" on the same page, and an unverified "Cashless Facility". None of that was used.

| Item | Where used | Status | Action |
|---|---|---|---|
| MBBS and MS (Ophthalmology) as degree names only; college names (Maulana Azad, Safdarjung) not shown on About | About, training | Degrees listed by the project owner; institutions only on the old site and the homepage | Client to confirm; decide whether to show colleges on both pages |
| Fellowship "Oculoplasty", Barraquer Institute, Barcelona | About, training | The old site says "Oculoplasty" in one place and "Aesthetic Oculoplasty" in another | Confirm exact title |
| Observership, Wilmer Eye Institute, Johns Hopkins, Baltimore | About, training | Old site says "Johns Hopkins Hospital" | Confirm institution name |
| "Areas of focus" (functional/aesthetic eyelid care, tear drainage, comprehensive eye care) | About, doctor | Derived from the homepage service copy | Doctor to approve |
| Care-journey steps | About | General outline written for this build, no outcome promises | Doctor to approve |
| Equipment photo (touchscreen surgical console) | About gallery | Frame from the July video IMG_4266; the console's own brand name is visible on the unit, not mentioned in copy | Client approval |
| Phone +91 98104 19720 (and 7827455040 on the signboard) | Contact | Unchanged; still unconfirmed | **Confirm which number is live** |
| Email | Contact | None found anywhere; the action is hidden | Provide if wanted (`CHANNELS.email`) |
| WhatsApp (old site links wa.me/919810419720) | Contact | Number and use not approved; hidden | Approve (`CHANNELS.whatsapp`) |
| Opening hours (old site: Mon–Sat 9 AM–4 PM) | Contact | Candidate only; the page says hours are not listed | Validate, then set `HOURS` |
| Map | Contact | Google embed of an address *search*. It found a listing named "Namokar Eye & Oculoplasty Centre By…" but that is not a verified pin | Supply the Google Business Profile link (`MAP.verifiedPinUrl`) |
| Online appointment form | Contact | Built, **switched off**. No delivery backend exists | See "Appointment form" below |

### Appointment form
Off by default. It exists only when BOTH server variables are set: `APPOINTMENT_FORM_ENABLED=on` and `APPOINTMENT_WEBHOOK_URL` (https; optional `APPOINTMENT_WEBHOOK_TOKEN`). There is no public (`NEXT_PUBLIC_`) switch, so setting a frontend flag alone does nothing (verified: the page shows no form and `/api/appointment` answers 503). While it is off, every appointment button reads "Call to Book an Appointment" and dials the centre. Before enabling, the client must decide: who receives enquiries and where (the webhook target), how long they are kept, a privacy notice (set `PRIVACY_URL` in `src/config/site.ts`), and what to do for non-Indian numbers (the form accepts Indian 10-digit numbers only).

### Asset approval matrix (source of truth: `src/config/assets.ts`)
Status "pending" means it is NOT shown in any default build, in `npm run dev` or in production, and `/media/<file>` answers 404. Nothing was moved from pending to approved in this pass.

| Asset (file in /private-assets) | Shows | Source | Approval needed | Status | In production default |
|---|---|---|---|---|---|
| Logo (`public/images/namokar-logo.webp`) | Brand | Live site Untitled-design-9.png, NABH mark cropped | Described by the owner as the approved logo | approved | **Yes** |
| hospital-reception.webp | Receptionist | July shoot IMG_4308 | Receptionist's consent, client | pending | No |
| hospital-consultation-room.webp | Dr. Poonam Jain | July shoot IMG_0026 | Doctor, client | pending | No |
| dr-poonam-jain-portrait.webp | Dr. Poonam Jain | July shoot IMG_0033 | Doctor, client | pending | No |
| hospital-operation-theatre.webp | No one | July shoot IMG_0037 | Client | pending | No |
| hospital-equipment.webp | No one; console brand visible | July clip IMG_4266 | Client | pending | No |
| namokar-walkthrough.mp4 (33 s, silent) | No one identifiable | July clips (see above) | Client | pending | No |
| walkthrough-poster.webp | No one | July clip IMG_4260 | Client | pending | No |
| art-iris-macro.webp | AI concept art | Gamma, 15 Oct 2026 | Client approval of AI art | pending | No |
| art-optical-lens.webp | AI concept art | Gamma, 15 Oct 2026 | Client approval of AI art | pending | No |

How to review or release
- **Review (never in production):** `npm run dev:preview` or `npm run build:preview` set the server variable `ASSET_PREVIEW=on`. Every pending asset then carries a visible "Preview only: not approved" tag. Plain `npm run dev` does not show them. Never set `ASSET_PREVIEW` in a production environment.
- **Release one asset:** record the sign-off here, then set its `approved: true` in `src/config/assets.ts`. No file move is needed; the page and the media route both read that flag.
- **Fallbacks in production default:** hero shows a "Visit the centre" panel (logo, address, phone, directions); About hero shows an "At a glance" panel; the doctor sections show a "PJ" name plate; the Cataract card and the oculoplasty section are text-only; the hospital gallery and the walkthrough section are left out entirely rather than shown as empty frames.
- **Deployment note:** `private-assets/` is included in deployments (`outputFileTracingIncludes`) so approved assets can be served, but it is not in `public/`, and a pending asset is never served.

## Deliberately omitted
Years of experience (25+ / 28+ / 30+ conflict), NABH badge (the live logo image includes an "Entry Level" NABH mark; it was cropped out until the certificate is verified), ratings and review counts, testimonials, patient counts, awards, hours, WhatsApp, social links, Dr. Shekhar Sanghi and Dr. Ankur Gupta (listed on the live site, no approved bios), before/after photos (the live "octoplasty" image is not an authentic clinic case), conference photographs (show third parties and a patient slide), video frames that show staff or patients, privacy and terms links (no pages exist).

## Asset requests
Staff consent for the reception photo (or a reception shot with no one at the desk), a waiting-area photo without posters or patients, a longer cleared walkthrough, and a building exterior without third-party signage; one authorised photograph per service (cards accept `photo` in `SERVICES`); a clean standalone logo file; NABH certificate and logo if the badge is to be shown.

## Full-site build (16 Oct 2026)
Status, fact check and blockers for the added pages are in `docs/full-site-build/` (CONTENT_FACT_CHECK.md, RELEASE_BLOCKERS.md, ASSET_APPROVAL_MATRIX.md). The asset table above remains the single record of media approval. Note: the old site's service-page and testimonial claims were NOT carried over; see CONTENT_FACT_CHECK.md.

## Photography upgrade (16 Oct 2026)
Ten more assets were registered, all **pending**: hospital-exterior, hospital-ot-wide, hospital-ot-scope, hospital-console-wide, hospital-ot-entrance, hospital-chart-door (video frames, no people), dr-poonam-jain-desk, -slit, -standing, -blazer (July shoot, doctor). Full list, sources and subjects: `src/config/assets.ts` and `docs/photography-upgrade/IMAGE_INVENTORY.md`. The "RAW PHOTOS" folder is **Neyani Eye Hospital**, not Namokar, and must never be used. The exterior sign shows the legal-entity line "A unit of Kalos Health Care Pvt. Ltd." (client to confirm it may appear).

## Media integration (17 Oct 2026)
Pending, added: three theatre photographs, three local videos (and posters), and 14 YouTube videos on the clinic's channel (@dr.poonamjain-NamokarEyeCentre, ownership to be confirmed; the audit's handle does not exist). Two live-surgery clips were held and not processed. Details: `docs/media-integration/`. The clinic's YouTube videos show 7827455040, supporting that it is a number the clinic uses; the live number is still unconfirmed.

## Raw originals moved out of the project (18 Oct 2026)
The 11 original files from the October 2026 additions (three photograph pairs, the cataract exercise video, the theatre tour, two doctor clips and the two held live-surgery clips) were moved, unaltered and checksum-verified, to `~/Namokar-Private-Media/`, outside the project and outside iCloud-synced Documents. The site uses only the derivatives in `private-assets/`. See docs/PRELAUNCH_SECURITY_REPORT.md section 7.

## Clinical illustrations and interactive explainers (added 18 Oct 2026)
Eleven original vector figures (no AI generation, no photographs) on the six treatment pages. All are **pending** in `src/config/figures.ts`: hidden in every normal build, visible with a "Preview only: pending medical review" tag in the local review preview. Register, provenance and the questions for the reviewer: `docs/immersive/FIGURE_PROVENANCE.md`; every sentence in every state: `docs/immersive/FIGURE_TEXT_FOR_REVIEW.md`. Nothing here has been signed off.

| Figure | Page | Reviewer | Date | Status |
|---|---|---|---|---|
| eyeAnatomy, lensCompare, lensDesigns, cataractSteps | Cataract Surgery | none | n/a | pending |
| glaucomaFlow, sideVision | Glaucoma Management | none | n/a | pending |
| examParts | Comprehensive Eye Examinations | none | n/a | pending |
| eyelidPosition | Eyelid Surgery (Blepharoplasty) | none | n/a | pending |
| consultationQuestions | Aesthetic Oculoplasty | none | n/a | pending |
| tearPathway, lidMalposition | Reconstructive Oculoplasty | none | n/a | pending |
