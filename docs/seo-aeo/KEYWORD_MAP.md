# Keyword map

18 Oct 2026. **No search volumes, rankings or difficulty scores appear here, because none were measured.** Every term below is a hypothesis built from the six agreed services, the clinic's own YouTube video titles, the legacy WordPress page titles and ordinary patient phrasing. Before launch, measure them in Google Search Console (once the site is verified), Google Keyword Planner (needs a Google Ads account) or another tool the clinic licenses, and replace the "Volume" column.

## How the map is used

- One **primary** phrase per page, a few **supporting** phrases, one **question** to answer first (answer-first paragraphs feed featured snippets and AI answer engines).
- Local modifier: **Ashok Vihar** and **Delhi** (the address is in Ashok Vihar, Delhi 110052). Titles use the short form "Ashok Vihar, Delhi"; running text uses "Ashok Vihar, New Delhi" (see CONTENT_PROOFREAD.md).
- **No page is optimised for a claim the clinic has not approved** (best, top, painless, guaranteed, years of experience, NABH, ratings, cost or insurance terms). Those terms are listed at the end as deliberately not targeted.

## Map

| Page | Primary phrase | Supporting phrases | Searcher's question (answered first on the page) | Intent | Volume | Status / blocker |
|---|---|---|---|---|---|---|
| `/` Home | eye care Ashok Vihar | eye centre Ashok Vihar Delhi; oculoplasty centre Delhi; eye specialist Ashok Vihar | Where is a specialist eye centre near Ashok Vihar? | Local, navigational | not measured | Phone, address, photographs unconfirmed |
| `/about-us` | Namokar Eye & Oculoplasty Centre | about Namokar eye centre; eye centre Ashok Vihar | Who runs the centre and what does it offer? | Brand | not measured | Credentials unconfirmed |
| `/dr-poonam-jain` | Dr Poonam Jain ophthalmologist | Dr Poonam Jain Ashok Vihar; senior ophthalmologist Delhi | Who is Dr. Poonam Jain? | Brand / person | not measured | Qualification wording (C3, C4, C12), portrait consent |
| `/our-services` | eye care services Ashok Vihar | cataract glaucoma eyelid services Delhi; oculoplasty services Delhi | What eye care does the centre offer? | Informational / local | not measured | Service scope unconfirmed |
| `/stitchless-cataract-surgery` | cataract surgery Ashok Vihar | cataract surgery Delhi; stitchless cataract surgery; cataract symptoms; when to have cataract surgery; intraocular lens types | What is a cataract and when is surgery considered? | Informational, local | not measured | Medical review. Avoid "painless", "100%", "blade-free" |
| `/glaucoma-management` | glaucoma check-up Delhi | glaucoma symptoms; glaucoma treatment Delhi; glaucoma monitoring | Why does glaucoma need regular eye examinations? | Informational | not measured | Medical review |
| `/comprehensive-eye-examinations` | eye check-up Ashok Vihar | comprehensive eye examination; eye test Delhi; dilated eye exam | What happens at a comprehensive eye examination? | Informational, local | not measured | Which tests are offered is unconfirmed |
| `/eyelid-surgery-blepharoplasty` | blepharoplasty Delhi | eyelid surgery Delhi; droopy eyelids surgery; heavy eyelids; upper eyelid surgery | What is blepharoplasty and who considers it? | Informational, local | not measured | Medical review; no recovery times or guarantees |
| `/aesthetic-oculofacial` | aesthetic oculoplasty Delhi | under-eye bags treatment; tired-looking eyes; eyelid ageing changes | What does aesthetic oculoplasty involve? | Informational | not measured | **Offered treatments unconfirmed** (injectables are not claimed) |
| `/eye-plastic-reconstructive-surgery` | ptosis surgery Delhi | drooping eyelid treatment; watering eyes treatment; blocked tear duct; entropion ectropion | Why is my eyelid drooping, or my eye watering? | Informational | not measured | Scope of conditions treated unconfirmed; medical review |
| `/international-patients` | eye surgery in Delhi for patients from abroad | planning eye treatment in India; outstation patients eye consultation | How do I arrange a visit from outside Delhi? | Informational / planning | not measured | **No assistance is promised until the clinic states it** |
| `/contact-us` | eye clinic Ashok Vihar contact | Namokar eye centre phone; Namokar eye centre address; directions | How do I reach and book the centre? | Navigational | not measured | Phone (C1), hours, Google Business Profile link |
| `/testimonials`, `/blogs` | (none) | (none) | (none) | n/a | n/a | Stay noindex until consented reviews and reviewed articles exist |

## Hindi and bilingual terms (candidate, not implemented)

The clinic already publishes Hindi videos (for example on cataract causes, glaucoma myths, children's glasses). Hindi search phrases such as "मोतियाबिंद" (cataract) and "ग्लूकोमा" (glaucoma) are plausible patient terms. **Not implemented**: Hindi pages need a Hindi-speaking clinician's review and a decision on `hreflang`. Recommended as a second phase.

## Services on the legacy site with no page here

`squint (adult and paediatric)`, `LASIK / ICL refractive surgery`, `paediatric eye care`, `myopia control`, `cornea services`. They exist on the old WordPress site as pages and may carry search traffic. **Decision needed:** is each offered? If yes, each needs a clinician-reviewed page and its own keyword row. If no, retire (redirect to Our Services, see REDIRECT_MAP.md). Until then they are not targeted.

## Content gaps (clinician-reviewed articles, titles only)

No article text exists or was generated. These are topics suggested by the clinic's own video subjects and by the pages' FAQ sections; each needs a named clinical reviewer before it is written for publication (fields in `src/content/articles.ts`).

| Working title | Page it supports | Matching clinic video |
|---|---|---|
| When is the right time to have cataract surgery? | Cataract | "Get your cataract surgery done at the right time…" |
| What to expect after cataract surgery: activity and exercise | Cataract | "Cataract surgery: when can you exercise?" (local video) |
| Glaucoma myths: what the evidence says | Glaucoma | "Four misconceptions about glaucoma" |
| Why eyes get tired after screen time | Eye examinations | "Do your eyes feel tired after long screen time?" |
| Do blue-light glasses help? | Eye examinations | "Do blue-blocking glasses really make a difference?" |
| Drooping eyelids: function or appearance? | Eyelid, Reconstructive | "Blepharoplasty: eyelid lift surgery" |
| Why does my eye keep watering? | Reconstructive | (Home FAQ) |
| What is entropion? | Reconstructive | "Entropion surgery" |
| Preparing for a visit from outside Delhi | International | (none) |

## Terms deliberately not targeted

best / top / No. 1 eye hospital; painless, bloodless, blade-free, 100% safe; guaranteed results; before-and-after; cost, price, EMI, insurance, cashless, Ayushman Bharat; NABH; "years of experience"; competitor names. None is approved, and several would break the standing claim rules.

## To replace "not measured"

1. Verify the domain in Google Search Console after launch; read real queries and impressions for 4 to 8 weeks.
2. Before launch, ask whoever runs the clinic's marketing for any existing Google Ads search-term or Search Console reports on the current WordPress site (none was supplied; no figures from other documents were used here).
3. Use Keyword Planner for the Delhi region for the terms in the "Primary phrase" column and record the ranges here, with the date.
