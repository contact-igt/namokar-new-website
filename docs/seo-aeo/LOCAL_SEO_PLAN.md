# Local SEO plan

18 Oct 2026. A plan, not an action list that has been carried out: **no external account was edited, no listing was claimed or changed, and no organisation was contacted.**

## 1. The clinic's entity, as it must read everywhere (NAP)

| Element | Value on this site today | Status |
|---|---|---|
| Name | Namokar Eye & Oculoplasty Centre | Confirmed (brief and published site) |
| Address | 13A, Pocket A, Phase 3, Ashok Vihar, Delhi 110052 (landmark: near Satyawati College, opposite Madrina Restaurant) | Unverified against the Google Business Profile |
| Phone | +91 98104 19720 | **Conflict C1** (7827455040 also appears on the signboard and in two YouTube videos) |
| Website | https://namokareyecare.com | The clinic's live domain (verified to respond), confirm for the new site (C11) |
| Hours | none shown | Not approved |
| Primary category | to be chosen in the profile | Client |

**Name, address and phone must be identical on the website, Google Business Profile and every directory.** Resolving conflict C1 comes first; every other local task depends on it.

## 2. What a search for the clinic shows today (third-party listings)

A web search on 18 Oct 2026 for the clinic and the doctor returned third-party directory pages that already describe the clinic. The search-result summaries disagree with one another and with the clinic's own site. **They were read as search summaries, not opened and verified**, and are listed here because they are the places a patient (or an AI assistant) may read false or unapproved claims:

| Directory (as found) | What its summary said | Conflict with the clinic's own materials |
|---|---|---|
| hexahealth.com clinic and doctor pages | Doctor experience "38+ years"; the clinic "NABH-accredited"; a rating "4.9 from 99 ratings"; clinic hours "open 24 hours" and the doctor "Monday to Saturday, 9 AM to 6 PM"; MBBS Maulana Azad Medical College 1987, MS Safdarjung Hospital 1991; Delhi Medical Council registration | Experience (25+, 28+, 38, 26 elsewhere), NABH (unverified), rating (unverifiable), hours (two different values), exact degree years (not on this site) |
| docindia.org doctor and procedure pages | Doctor experience "26 years"; the clinic listed under oculoplasty and facial aesthetic services in Delhi | Experience figure |

**Action (client):** claim or request correction of each listing so that it carries only approved facts, and do not repeat unverified claims (NABH, ratings, hours, years) on this site. We cannot edit them.

## 3. Google Business Profile (the single most important local asset)

To do, by the clinic (we need the profile owner's access or the profile link):

1. Confirm the profile exists, who owns it, and that it is verified.
2. Set the name exactly as above (no keywords added), the address and a **service-area / storefront** setting that matches reality.
3. Phone: the number chosen in C1 as primary; the other as additional only if the clinic wants it.
4. **Hours**: only the hours the clinic confirms (including holidays and Sunday).
5. Categories: pick the primary and secondary from Google's current list in the profile editor (for example the ophthalmology and eye-care categories). Choose what is true; do not add categories for services not offered.
6. Services list: the six agreed services, using the website's plain wording, no outcomes.
7. Website link: `https://namokareyecare.com/` (home page). Appointment link: the Contact page (appointments are by phone while online booking is off, so do not use a "book online" link).
8. Photos: **only approved photographs** (MEDIA_APPROVAL_CATALOGUE.md). The same consent rules apply as on the website.
9. Provide the profile's **place link** so Get Directions and the Contact map land on the entrance (decision D5 in the approval package).
10. Questions and Answers: seed with the clinic's own approved answers, not generated ones.

## 4. Reviews: an ethical process

- Ask real patients, once, after their visit, in neutral words ("If you would like to share your experience, you can leave a Google review"). Never offer payment, gifts or discounts, never filter who is asked, and never write or edit a review for a patient.
- Reply to reviews with no clinical details. A patient's confidentiality applies in a reply.
- **Check Indian medical advertising rules before any review programme is publicised or any review is displayed on the website.** Rules on how doctors may advertise or use patient testimonials are the legal adviser's call; this site publishes no review until a consented, traceable one exists (`src/content/testimonials.ts` requires a consent date and a source).
- Do not embed ratings markup for the clinic's own reviews on its own site (search engines ignore or penalise it).

## 5. Citations (consistent listings)

Priority is quality and accuracy, not volume. Start with listings that already exist (section 2), then add only reputable directories the clinic is happy to appear in. Candidate types: a general business directory, medical directories for Delhi, professional-society listings (see BACKLINK_OPPORTUNITIES.md). For each: same name, address, phone and website; approved facts only; one person owns the logins.

## 6. On-site local signals (done in this phase)

| Signal | State |
|---|---|
| Name, address, phone in the footer and Contact page from a single source (`src/config/site.ts`) | done earlier |
| `MedicalClinic` JSON-LD with the address, linked to the site and the doctor | built, emitted only at launch (STRUCTURED_DATA.md) |
| Click-to-call link and a Google Maps directions link on every page | done earlier |
| Locality in titles, descriptions and headings ("Ashok Vihar, Delhi") | done |
| Embedded map | loads only after a tap (privacy); it is a search for the address, not a pin, until the place link is supplied |
| Opening hours, `telephone` in markup | **waiting for the client** |

## 7. Measurement (after launch, nothing measured yet)

Google Business Profile insights (calls, directions, searches), Search Console (queries containing "Ashok Vihar"), calls received per week. No baseline exists and none is invented here. Set one before launch by writing down the current weekly call count.

## 8. Do not

Buy reviews or links; use a virtual office or a second address; create duplicate profiles; put keywords in the business name; list services not offered; publish a phone number the clinic does not answer.
