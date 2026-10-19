# Answer-engine (AEO) strategy and approved-content workflow

18 Oct 2026. AEO means being the clear, correct source when a search feature or an AI assistant answers a patient's question. For a medical site that depends on **accuracy and review**, not on volume.

## 1. Principles

1. **Answer first.** Each page opens its topic with a plain two-sentence answer, then detail. Already true for the service pages ("What is a cataract?", "What is an intraocular lens?").
2. **One fact, one wording, everywhere.** The clinic's name, address, doctor's title and services are written from single sources (`src/config/site.ts`, `src/content/*`). An assistant that meets two versions may quote the wrong one.
3. **No claim an assistant could repeat that the clinic has not approved.** No outcomes, ratings, years of experience, accreditation or prices. The pages already say "not medical advice" and "the doctor decides".
4. **Questions in the patient's words** as visible FAQ text and as `FAQPage` markup (emitted at launch). Each page has 4 or 5; the Home, Doctor, Services and Contact pages have their own.
5. **Reviewed content carries its reviewer.** When a clinician signs a page off, record the name and date (`PAGES[...]`, `webPage({ review })`) so it can be shown ("Reviewed by …, date") and marked up.
6. **Crawlable by assistants and search alike.** Server-rendered HTML, no content behind scripts or tabs (the banner's four messages are all in the page source), one `h1`, short sections with descriptive headings, sitemap at launch.

## 2. Question inventory (existing, from the current pages)

| Page | Questions answered on the page today |
|---|---|
| Home | Why is a comprehensive eye check-up important? What can a drooping eyelid (ptosis) mean? Why do my eyes keep watering? What should I bring to my first visit? How do I arrange an appointment? |
| Cataract | Do cataracts need surgery straight away? What is an intraocular lens (IOL)? What does "stitchless" mean? Is cataract surgery suitable for everyone? What should I bring to my first visit? |
| Glaucoma, Eye examinations, Eyelid, Aesthetic, Reconstructive | 4 questions each, in `src/content/services.ts` |
| Doctor | How do I arrange a consultation? What should I bring? What is the difference between a fellowship and an observership? |
| Services | Which service do I need? Is every treatment available? How do I arrange an appointment? Where is the centre? |
| Contact | How can I request an appointment? Where is Namokar located? Can I call before visiting? How do I find the centre? |

All medical answers are **awaiting medical review** (CONTENT_APPROVAL_MATRIX.md section 3).

## 3. Questions worth adding (titles only; no answers are drafted here)

Each needs a named clinical reviewer to write or approve the answer. Add them to the relevant page's FAQ, or as an article.

| Candidate question | Page | Note |
|---|---|---|
| What are the early signs of glaucoma? | Glaucoma | Existing text says "often no early symptoms"; reviewer to expand |
| How often should adults have an eye examination? | Eye examinations | Reviewer to state the interval; the page currently says "your doctor will advise" |
| Is blepharoplasty only cosmetic? | Eyelid | Page already separates functional and cosmetic reasons |
| What is a blocked tear duct? | Reconstructive | Terms box exists |
| Can I travel for a consultation? What should I send beforehand? | International | **Depends on what the clinic actually offers**; the page promises nothing today |
| What should I do in an eye emergency? | All service pages | Each page says "needs urgent medical attention"; the clinic must supply whom to call (C-decision) |

## 4. Approved-content workflow (applies to pages, FAQ answers and articles)

| Stage | Who | Output | Blocks publication if missing |
|---|---|---|---|
| 1. Brief | Marketing | Topic, page, target question, source documents | n/a |
| 2. Draft | Writer (human or assistant) using only cited sources | Draft with every medical statement marked | n/a |
| 3. Fact sources | Writer | A source for each statement (guideline, textbook, the clinic's own policy), recorded beside the draft. **Never an assistant's memory alone** | Yes |
| 4. Clinical review | Named qualified clinician | Name, registration number, date, marked changes, "approved / approved with changes / not approved" | Yes |
| 5. Client approval | Dr. Poonam Jain or the owner | Written yes for wording, claims and any photograph | Yes |
| 6. Legal check (only for claims about price, results, advertising, reviews) | Legal adviser | Written yes | Yes for those claims |
| 7. Publish | Developer | `reviewed: true` on the page (or article added to `src/content/articles.ts` with `clinicalReviewer`), changelog entry | n/a |
| 8. Revisit | Reviewer | Review date; re-review at least yearly or on any guideline change | Page marked stale |

Rules for assistants writing drafts: never invent statistics, studies, patient stories, quotes, credentials or search volumes; cite or leave a gap; prefer "may" and "the doctor decides"; no absolute words (always, never, 100%, painless, safe) about procedures.

## 5. How to check how assistants answer (procedure, to run after launch; nothing was run)

1. Keep a fixed list of 20 to 30 patient questions (the inventory above plus section 3).
2. Once a month, ask each major assistant and search the same questions, from an Indian location, with no personalisation. Record the date, the assistant, whether the clinic appears, what it says about the clinic, and any **incorrect fact**.
3. For every incorrect fact (hours, phone, accreditation, experience, ratings), find where it came from (usually a directory, see LOCAL_SEO_PLAN.md section 2), correct the source, and re-test next month.
4. Never optimise by adding unverified claims to match what an assistant says.

## 6. Technical items for assistants

- `robots.txt` at launch allows all crawlers (`Allow: /`, `/api/` and `/media/` disallowed). Whether to allow or block specific AI crawlers is a **policy decision for the clinic** (some owners prefer to be quoted, some do not); it is not changed here.
- An `llms.txt` file is optional and unproven; not added.
- Keep page text in HTML, not images. Alt text on every approved photograph describes what is visible and nothing more.
