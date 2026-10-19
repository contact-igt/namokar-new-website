# NMC content verification and claims audit (20 Oct 2026)

**This is an engineering audit against the primary text, not legal advice or formal clearance.** Every interpretation below that is not plain from the wording is flagged for the clinic's responsible medical professional or legal adviser.

## 1. Primary source actually read

- **Public Notice No. R-13014/01/2024-Ethics, dated 06/10/2026**, National Medical Commission, Ethics & Medical Registration Board, signed digitally by the Secretary, with the annexed *Guidelines on Ethical Advertising and Public Communication by Hospitals/Medical Institutions and Registered Medical Practitioners*. In force "with immediate effect" (notice para 2; Guidelines 1.2).
- URL: https://nmc.org.in/whats-new/download/1874 (listed on https://nmc.org.in/whats-new?type=news as "06/10/2026-Guidelines on Ethical Advertising and Public Communication..."). File `20261006154257-publicnotice-ethics.pdf`, 13 pages, 2.95 MB. It is a scanned PDF with no text layer, so I read all 13 pages as images. The copy used was fetched to a scratch folder outside the project and is not in the repository.
- **Not obtained or read:** the Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations, 2002 (only as cited in 9.2: Regulations 6.1.1 and 6.1.2), the NMC Act 2019 text, the Writ Petition (Civil) 1160/2023 order the notice cites, and any Delhi clinical-establishment law (the Guidelines' 4.3 says that law prevails over them for hospitals). These need the legal adviser.

## 2. What the Guidelines say that bears on this website (clause numbers are the document's own)

| Clause | Provision (paraphrased) | Effect on the site |
|---|---|---|
| 3.2, 3.5 | "Advertisement" covers any communication that promotes services, reputation, skills, qualifications, achievements or facilities; "medium" expressly includes websites, blogs, AI-generated promotion and audio-visual content | The whole website is within scope |
| 3.2 Expl. I, II | Ordinary informational discourse without promotional intent is exempt; information on equipment, technology or diagnostic facilities may be given as fact if it makes no superiority, guaranteed-accuracy, outcome or comparative claim | Facility and equipment descriptions stay factual; no "advanced", "latest", "state of the art" |
| 3.2 Expl. III, IV | A doctor, and a clinical establishment publishing electronic media posts, should disclose the doctor's name, qualifications, registration status and SMR/NMR registration number | **Registration number is missing from the site: launch dependency** |
| 3.2 Expl. V; 8.1(ii), (xi), (xii) | No fake, paid or misleading reviews or testimonials; an RMP shall not request or share patient testimonials for promotion; no use of patients or employees for prohibited endorsements; no manipulated ratings | Reviews and testimonials withheld (see 4) |
| 5.1 | Doctors may take part in health education that does not promote their practice or solicit patients | Educational pages and videos stay educational |
| 6.1 to 6.4 | Patient photographs, videos, records, clinical images or testimonials not to be used for advertising unless lawful consent and safeguards; **6.2: consent does not by itself make a testimonial, promotional patient story, before-and-after depiction or success claim permissible**; blur or crop identifying features | No patient imagery, before-and-after or stories; identifiable-patient footage stays unpublished |
| 7.2 | AI-generated promotional campaigns for commercial interest are prohibited; permitted AI content must carry an explicit source mark; (a) no misleading AI content on diagnosis, outcomes, qualifications, patient experiences; (b) no AI-created patient images or endorsements; (c) disclose AI where material | No AI-generated image is on any page (see 3); the original line drawings are code-drawn, not AI, and are labelled pending review |
| 7.4 | Do not share patient data such as names, faces, anomalies that can be identified publicly | Same as 6 |
| 8.1(i) | No advertising meant to create unnecessary demand, unnecessary diagnostics or fear-based marketing | Page copy stays calm and cautious ("not everyone needs surgery") |
| 8.1(iii) | No advertising of personal achievements, success rates or number of patients treated, with "Guaranteed cures", "Best doctors", "No.1", "100% success", "painless treatment", "Miracle treatment" given as examples | None on the new site; all present on the old site |
| 8.1(v), (vi) | No publishing cases for promotion, surgical results, before-and-after photographs, celebrity patients or personal success stories except for scientific or educational purposes with anonymised consent; no unrealistic expectations, concealed risks | None used |
| 8.1(ix) | No comparative or superiority claims ("best", "No.1", "leading", "most trusted", "top", "unmatched") unless objectively verifiable, on a transparent, independently ascertainable method | "Leading", "advanced", "premier" removed or never used |
| 8.1(x) | No discounts, limited-period offers, contests, coupons, gifts, cashbacks, referral benefits or free procedures likely to encourage unnecessary care; lawful disclosure of charges must be factual | None on the new site; "Free Consultation", "0% EMI" on the old site not carried |
| 8.3(i), (ii) | A hospital may state factual, objective, verifiable information: name, location, contact details, departments, facilities, equipment, services, **accreditation status**, charges; not solicitation, inducement, superiority, guaranteed outcomes or "promotional portrayal of an individual RMP" | Basis for the site's factual tone; accreditation only with a record |
| 9.1 | A hospital website with a **directory of its doctors** (names, recognised qualifications, specialties, registration details, availability) that serves a patient-information function is materially distinct from a paid promotion | Supports a plain doctor profile; needs the registration details |
| 9.2 | Use of an RMP's photograph is not permitted where it is self-advertisement, solicitation or promotional publicity | **Interpretation needed** for the doctor portraits on the home, About and profile pages (see 4) |

## 3. Claims audit: the new site (visible, in this repository)

Decision key: retain / revise / remove / withhold. "Evidence" is what exists in the project; **none of the credentials has a primary document on file**.

| # | Exact text or element | Page | Evidence | Status | Decision | Clause |
|---|---|---|---|---|---|---|
| 1 | "Dr. Poonam Jain" and role "Medical Director & Senior Ophthalmologist" | Home, About, Doctor, JSON-LD | Brief and old site only | Unverified; "Senior" is a descriptive claim | Retain, needs client confirmation of title | 3.2 Expl. III/IV, 8.1(ix) |
| 2 | "MBBS", "MS, Ophthalmology" (home also names Maulana Azad Medical College and Safdarjung Hospital) | Home, About, Doctor | Old site; no certificate | Unverified | Retain only after certificates are seen; otherwise withhold the doctor pages | 9.1 |
| 3 | "Fellowship: Oculoplasty, Barraquer Institute, Barcelona" | Home, About, Doctor | Old site (it says both "Oculoplasty" and "Aesthetic Oculoplasty") | Unverified; exact title unconfirmed | Retain wording as is, pending certificate | 9.1, 8.1(vi) |
| 4 | "Observership: Wilmer Eye Institute, Johns Hopkins, Baltimore" plus the note that an observership "is not a degree or a fellowship" | Home, About, Doctor | Old site says "Johns Hopkins Hospital" | Unverified; wording already distinguishes it from a fellowship | Retain with the note; confirm institution name | 9.1 |
| 5 | **Medical registration (SMR/NMR) number** | Doctor, About | **Not supplied** | Missing | Withhold the doctor pages until supplied; a row appears automatically once `DOCTOR_REGISTRATION` is set | 3.2 Expl. III/IV, 9.1 |
| 6 | Doctor portraits (home introduction, About, profile) | Home, About, Doctor | Pending images; none shows in the public build | Interpretation needed | Public build shows a name plate, no photograph; keep portraits on the profile page only if the adviser accepts them as directory information | 9.2, 8.3(ii) |
| 7 | "Care at Namokar is doctor-led. You are examined and advised by the doctor" | Home, Doctor | Brief positioning | Unverified but descriptive | Retain, doctor to confirm | 8.3(i) |
| 8 | "The centre has a reception, consultation and examination rooms, and an operation theatre." | Home, About | July 2026 photographs and video | Supported by the client's own photographs | Retain | 8.3(i), 3.2 Expl. II |
| 9 | Service names and one-line descriptions (cataract, glaucoma, comprehensive eye examination, eyelid surgery, aesthetic oculoplasty, reconstructive oculoplasty) | Home, Services, service pages | Brief; scope not clinician-signed | Pending clinician sign-off of scope (e.g. injectables not listed on purpose) | Retain, `reviewed:false` stays | 8.3(i), 8.1(vi) |
| 10 | Cataract, glaucoma, eyelid and tear-drainage explanations and FAQs (e.g. "Glaucoma is usually managed long term rather than cured", "no result can be guaranteed") | Service pages | Written conservatively for this build | Needs a doctor's review | Retain, flagged; none promises an outcome | 8.1(i), (iii), (vi) |
| 11 | Address "13A, Pocket A, Phase 3, Ashok Vihar, Delhi 110052", landmark "Near Satyawati College, opposite Madrina Restaurant" | Footer, Contact, CTA | Old site, signboard | Needs checking against the active listing | Retain, confirm | 8.3(i) |
| 12 | Phone **+91 98104 19720** (every clickable call action) | Header, hero, CTA, footer, JSON-LD only when confirmed | Old site; the signboard in the walkthrough video also shows 011-40392563, and earlier videos show 7827455040 | **Conflict** | Keep the single configured number; **client must confirm which number is live** | 8.3(i) |
| 13 | Legal-entity line "A unit of Kalos Health Care Pvt. Ltd." | Not on any page (visible only on the exterior sign in pending photographs and the walkthrough) | Sign photograph | Spelling differs between sources ("Healthcare" vs "Health Care") | Not published; adviser to confirm entity and whether it belongs in the footer | 8.3(i) |
| 14 | Opening hours, email, WhatsApp | Not shown | Old site lists hours; none approved | Not supplied | Withhold (already absent) | 8.3(i) |
| 15 | "Patient reviews" page and any review, rating or testimonial | `/testimonials` | None supplied; old site shows reviews and "4.9" style figures | Prohibited as promotion even with consent | **Withhold: the route now answers 404, with no link, sitemap entry or markup** (`REVIEWS_ALLOWED = false`) | 3.2 Expl. V, 6.2, 8.1(ii), (xi) |
| 16 | Years of experience, patient counts, success rates, awards, NABH, insurer, scheme and EMI statements | Nowhere | None | Not present | Keep absent | 8.1(iii), (ix), (x), 8.3(i) |
| 17 | Photographs of the centre, staff and patients | All pages | All pending; patients and staff identifiable in some; consent not recorded | Not publishable | **Withheld** from the public build (brand fallbacks instead); media route 404 | 6.1 to 6.4, 7.4 |
| 18 | Original line drawings (eyelid, aesthetic, tear passages) and the eye and lens figures | Service pages, explorer | Drawn in code; no clinician has reviewed them | Pending clinician review | Withheld from the public build; labelled pending | 7.2 (not AI), 8.1(vi) |
| 19 | AI-generated artwork | Not used on any page (two concept images exist in `private-assets`, unused) | `assets-src/ai-generated/PROVENANCE.md` | n/a | Keep unused; if ever used, mark "AI-generated" | 7.2 |
| 20 | 13 YouTube videos from the clinic's channel (e.g. "Dr. Poonam Jain talks about cataract surgery") | Home shelf, service pages | Channel and IDs verified 19 Oct; content never reviewed; one lower third shows an unconfirmed number | Pending clinical and consent review | Withheld from the public build; titles shown neutrally | 5.1, 6.1, 8.1(iii), (vi) |
| 21 | Clinic walkthrough video | Home | Probe and frames reviewed 20 Oct: identifiable patients and staff; burned-in text "25+ Years of Surgical Expertise", "Internationally trained doctor...", "Highly Trained Staff", "Advanced Diagnostic Technology"; street sign "Cashless Mediclaim Facility Available" and a phone number | **Not publishable as it stands** | **Withheld**; needs consent and edits or documentary proof | 6.1, 7.4, 8.1(iii), (ix), (x), 8.3(ii) |
| 22 | Footer line "Information on this website is general guidance and does not replace an examination" | Footer | Own wording | Fine | Retain | 8.1(vi) |
| 23 | Booking | All pages | "Call to Book an Appointment" only; the form is off; no free or discounted offer | Fine | Retain | 8.1(x) |
| 24 | Privacy Policy and Terms | `/privacy-policy`, `/terms-and-conditions` | Drafts, not approved by a legal adviser | Not publishable as final | Keep as review-only drafts; do not present as final | n/a |

## 4. Claims audit: the currently published site (https://namokareyecare.com/, home page text read 20 Oct 2026)

These are the old site's statements as found; **none was carried into the new site**. Replacing the old site with the new one would therefore remove them. I did not check the old site's other pages for Healix, "Michael" or dummy reviews: the repository's earlier ledger records that its About page contained "Dr. Michael Reynolds, Founder Healix", garbled filler and a "Rajesh Kumar" testimonial (see `docs/NAMOKAR_CONTENT_VERIFICATION.md`).

| Old-site text (home) | Evidence | Verdict | Clause |
|---|---|---|---|
| "28+ years in Ophthalmology & Oculoplasty", "28 years of expertise ...", "25+ Years of Eye Care Experience" (contradict each other) | none | Remove; unverifiable and contradictory | 8.1(iii) |
| "NABH-accredited eye centre in North Delhi", "NABH Accredited Eye Centre in North Delhi" | no certificate; earlier note says the logo image carried an "Entry Level" NABH mark | Remove until the current certificate, its scope and validity are shown | 8.3(i) allows accreditation status only if factual |
| "Cashless & EMI Options"; "cashless treatment with all major insurers"; "0% EMI available for eligible procedures"; "Ayushman Bharat, government schemes, and all major private TPA insurance" | none | Remove | 8.1(x), 8.3(i) |
| "Free Consultation" | none | Remove | 8.1(x) |
| "ADVANCED EYE CARE EXCELLENCE", "Advanced Oculoplasty Care", "cutting-edge diagnostic tools", "premier institutions" | none | Remove | 8.1(ix), 3.2 Expl. II |
| "painless recovery and crystal-clear vision" | none | Remove | 8.1(iii), (vi) |
| Reviews section, patient stories | no consent or source | Remove | 3.2 Expl. V, 6.2 |
| Opening hours (Mon to Sat, Sun) and "+91-9810419720" | unverified | Confirm; not carried (hours) / one number kept pending confirmation | 8.3(i) |

## 5. Open items for the clinic's adviser

1. Whether doctor portraits on a hospital website are "directory" information (9.1) or "self-advertisement" (9.2), and whether the home page introduction should stay.
2. Whether educational videos on the clinic's own channel, embedded on the site, are exempt under 3.2 Expl. I and 5.1.
3. Delhi clinical-establishment rules (4.3) and the 2002 Regulations 6.1.1 and 6.1.2.
4. Registration number, certificates for each qualification and training line, the current NABH record (if any), and the legal entity and its footer wording.
