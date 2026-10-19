# Emergency release report (20 Oct 2026)

## Status: **BLOCKED. Not live.** A public-safe build exists and passes every technical check; publication is blocked by missing facts, consents and approvals, and by the absence of a deployment target.

| | |
|---|---|
| Deployment URL | None. Nothing was deployed. `https://namokareyecare.com/` is untouched and still serves the old site (no DNS or hosting change; the old site is the rollback) |
| Revision | Local working tree on top of `fc778c8` (the only commit, in the private repository `sushilathithiyaa-igt/namokar-new-website`). The changes since then are **not committed** |
| Verified | 20 Oct 2026, about 00:45 IST, against a default production build served at 127.0.0.1 and the local review preview at http://127.0.0.1:3100 |
| Why not deployed | (1) no hosting target is configured: no `.vercel` link, no Vercel CLI on this machine, no deployment workflow in the repository; (2) the content gates below are unmet; (3) replacing the live domain needs a DNS or hosting change that must not be made blind |

## Release gates

| Gate | Result |
|---|---|
| Doctor's registration (SMR/NMR) disclosed (NMC 3.2 Expl. III/IV, 9.1) | **FAIL**: number not supplied |
| Qualifications and training evidenced (MBBS, MS, Barraquer fellowship, Wilmer observership, institutions) | **FAIL**: no certificate on file |
| Phone number confirmed (98104 19720 vs 7827455040 vs 011-40392563 on the sign) | **FAIL**: conflict unresolved |
| Photographs and video: consent, rights, client approval | **FAIL**: every photograph and video except the logo is pending (38 registry entries); none shown in the public build |
| Clinician review of page medical wording and the clinical figures | **FAIL**: every page `reviewed: false` |
| NMC-prohibited content absent from the build | **PASS**: no superlatives, outcome or volume claims, offers, accreditation, scheme or insurance claims, reviews or testimonials, AI imagery (details: `NMC_CONTENT_VERIFICATION.md`) |
| Legal text (privacy, terms) approved | **FAIL**: drafts only |
| Indexing authorised | **NOT AUTHORISED**: noindex, `Disallow: /`, empty sitemap, no JSON-LD all preserved |
| Technical checks | **PASS** (below) |
| Deployment target and rollback | **FAIL**: no target configured; rollback is "leave the old site in place" |

## Completed in this sprint

- **Images.** Hospital-first hero (reception, operating microscope, eye chart, theatre), photographs and original line drawings spread so that Dr. Poonam Jain's photographs outside her profile fell from 23 appearances to 9 (earlier pass); no new image was generated, no archive AI or stock image used. The older archive was re-checked: its usable real photographs are already registered; `why-choice-hospital.png` is lower resolution than the existing exterior. The detailed pastel cross-section illustration described in the brief was **not** newly drawn; the existing original eye and lens figures were kept (still pending clinician review).
- **YouTube covers.** Every video card is now image-only: a topic photograph of the centre (not a video frame, nothing fetched from YouTube) or, when no photograph is cleared, a clean neutral cover with the logo; one small round play icon; the title and length in plain text beneath, once. No burned-in text, banners, badges or emoji on covers. The 13 verified videos are unchanged (see `docs/video-integration/`); the homepage shows three.
- **Walkthrough.** Integrated (single featured player, 12.3 MB web derivative, poster) in the protected preview only. **Held back from the public build** because the footage shows identifiable patients and carries burned-in claims (25+ years, internationally trained, cashless Mediclaim, a phone number): `docs/video-integration/WALKTHROUGH.md`.
- **Content and NMC.** Read the notice and all 13 pages of the Guidelines (R-13014/01/2024-Ethics, 6 Oct 2026). Withheld the reviews page (`/testimonials` now 404, no link, `REVIEWS_ALLOWED=false`). Added a registration-number hook (`DOCTOR_REGISTRATION`) so the doctor pages show it only once supplied, and put the gap in the route blocker. Audited the new site's claims and the old site's home page; none of the old site's contested claims (28+/25+ years, NABH, cashless and EMI, Ayushman, free consultation, "painless", "advanced") exists in the new site.
- **Technical.** `/media` Range handling improved; crawl scripts taught that `/testimonials` is withheld.

## Unresolved (nothing here was bypassed)

Medical credentials and registration; accreditation (none claimed; the old site's NABH claim is unverified); patient and staff consent and the photograph approvals; clinical review of figures, plates and pages; legal-entity wording ("Kalos Health Care" vs "Healthcare"); phone and hours; privacy and terms text; whether the old site's contested statements are corrected at source; indexing approval; deployment target.

## Tests actually run (20 Oct 2026)

- ESLint: clean. `tsc --noEmit`: pass. Production build (copy outside iCloud): 28 pages, no errors.
- Default build: `qa-crawl` all checks passed (15 of 15 pages noindex; `/videos` and `/testimonials` 404 as designed); `check-canonicals` passed; `seo-audit` passed; `check-media-exposure` passed (no confidential media reachable, named in a page or in the build output, original walkthrough in the root unreachable); robots `Disallow: /`; no JSON-LD; `/media/*` and `/review` 404.
- Browser release checks on the default build, `docs/launch/launch-qa.mjs`, 12 routes at 390 and 1440: **120 of 120** (one `h1`, no overflow, no console errors, no review badge, no `/media` or YouTube request, no broken image, every `tel:` link is the one configured number, phone bar shown on phones only, none of the risky or template phrases in the visible text). Screenshots in `docs/launch/screenshots` (git-ignored).
- Preview regression: video and shelf 386 of 386, walkthrough section 70 of 70, treatment explorer 94 of 94.
- Not run: Lighthouse, real devices, screen readers, other browsers, any post-deployment check (there was no deployment).

## Next actions (only what blocks a launch)

1. **Dr. Poonam Jain:** state or council name, registration number, and copies of the MBBS, MS, fellowship and observership certificates (exact titles and institutions).
2. **Client:** the one live phone number; opening hours if they are to be shown; the legal entity name and whether it goes in the footer.
3. **Consent and rights:** written consent from the patients and staff in each photograph and in the walkthrough, or replacement photographs; decide whether to edit the walkthrough (remove the claim captions and the sign) or keep it unpublished.
4. **Clinician:** review the service pages, the figures and plates, and the video selection; confirm the scope of treatments offered.
5. **Adviser:** the interpretation points at the end of `NMC_CONTENT_VERIFICATION.md`; approve the privacy and terms text.
6. **You:** where the site should be hosted (the repository has no deployment setup), who changes the domain's DNS, and whether indexing should be switched on at launch.
7. Move `namokar .mp4` out of the iCloud-synced project folder (for example to `~/Namokar-Private-Media/`); I did not move it without your permission.
