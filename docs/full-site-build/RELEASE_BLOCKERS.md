# Release blockers: client decisions needed

1. **Telephone number.** `+91 98104 19720` (old site) versus `7827455040` (clinic signboard in the July video). Edit `SITE.phone` only after confirmation.
2. **Credentials.** Exact wording for MBBS and MS (institutions), the Barraquer fellowship title ("Oculoplasty" or "Aesthetic Oculoplasty") and the Wilmer/Johns Hopkins observership; Dr. Poonam Jain's approval of the biography and "areas of focus".
3. **Clinician review of every service page** (see CONTENT_FACT_CHECK.md), then set `reviewed: true` in `src/config/routes.ts`. Also decide the scope of services: whether aesthetic injectables, squint, LASIK/ICL, paediatric care, myopia control, cornea and retina are offered (old site listed them) and whether they get pages.
4. **Photography consent and approval.** Receptionist (reception shot), Dr. Poonam Jain (portrait, consultation room), client for theatre, equipment (console brand visible), video and poster, and the two AI concept images. Until then production shows text fallbacks.
5. **Clinic video.** Approve the 33-second silent cut, or commission a longer one with consent.
6. **Reviews.** Consented, traceable reviews (name or initials, text, source link). The old 15 reviews and "4.9 from 299" cannot be used as they stand.
7. **Articles.** Clinician-written or reviewed articles; old blog listed none.
8. **Legal text.** Privacy policy and terms from the clinic's legal adviser; then set `PRIVACY_URL` and link the pages.
9. **Online appointment form.** Decide recipient system, retention and privacy notice; then set `APPOINTMENT_FORM_ENABLED=on` and `APPOINTMENT_WEBHOOK_URL`. The in-memory rate limiter does not work across several server instances; use an edge or shared limit.
10. **Opening hours, email, WhatsApp, Google Business Profile pin** (all unset on purpose). Old site's Mon–Sat 9–4 is a candidate.
11. **International patients.** Confirm what help the centre really gives (reports review, visit planning, accommodation, etc.). The page currently promises none.
12. **Launch switches.** `ALLOW_INDEXING=on` (server) and per-page `reviewed: true`; then check `robots.txt` and `sitemap.xml`. Do not deploy `.next` from a machine that ever ran with `ASSET_PREVIEW=on`.
13. **Working folder.** Move the project out of iCloud-synced Documents (see `docs/DEV_ENVIRONMENT.md`); not done without approval.
