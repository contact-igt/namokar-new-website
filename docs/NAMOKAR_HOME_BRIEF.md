# Homepage brief (as built, 18 Oct 2026)

The original brief asked for this file; it was not written at the time and is recorded here from the final implementation.

**Positioning.** Comprehensive eye care first; specialist oculoplasty as the strength. Hospital-first: real facility photography leads, the doctor follows. Never invent credentials, statistics, accreditation, hours, reviews or contact details.

**Identity.** Orange and graphite from the logo (`#D66B1F`, `#A9440D` for buttons and text, `#243238`), porcelain `#F7F9FA`, Manrope headings, Inter body. No blue gradients, no icon badges.

**Section order** (`src/app/page.tsx`)
1. Header: logo, grouped navigation, phone button (primary while online booking is off).
2. Hero: hospital photograph with two manual messages (comprehensive care, then oculoplasty); fallback "Visit the centre" panel when no photo is approved. Actions: "Call to Book an Appointment" / "Contact and Directions".
3. Find care: the six services as links.
4. The centre: gallery with lightbox (omitted without approved photos).
5. Explore Namokar: video section (omitted without approved video).
6. Meet Dr. Poonam Jain: portrait or name plate, verified-pending credentials.
7. Our specialised services: one featured card, five rows.
8. Oculoplasty: functional and aesthetic concerns.
9. Why Namokar, FAQ, closing call to action, footer.

**Mobile first.** Designed at 375–390 px; checked at 320, 375, 390, 430, 768, 1024, 1280, 1440. Tap targets at least 44 px, body 17–18 px, no horizontal scroll, reduced motion respected.

**Outstanding approvals.** See `docs/NAMOKAR_CONTENT_VERIFICATION.md` and `docs/full-site-build/RELEASE_BLOCKERS.md`.
