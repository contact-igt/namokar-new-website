# Structured data (JSON-LD)

18 Oct 2026. Code: `src/lib/schema.ts` (builders), `src/components/JsonLd.tsx` (renderer), wired into every page.

## Rule that protects the release

**JSON-LD is emitted only when the server is set to be indexed (`ALLOW_INDEXING=on`).** In the default review build no page carries any structured data (verified: `scripts/seo-audit.mjs` fails if one does). This is a change from earlier phases, where the home page always emitted a `MedicalClinic` block. Unreviewed facts are no longer packaged for search or AI answer engines before launch.

## What each page emits at launch

| Page | Types |
|---|---|
| Home | `WebSite`, `MedicalClinic`, `WebPage`, `FAQPage` |
| About Us | `AboutPage`, `MedicalClinic`, `BreadcrumbList` |
| Dr. Poonam Jain | `ProfilePage`, `Physician`, `FAQPage`, `BreadcrumbList` |
| Our Services | `CollectionPage`, `ItemList` (the six services), `FAQPage`, `BreadcrumbList` |
| Six service pages | `MedicalWebPage` (with `about` naming the condition or procedure), `FAQPage`, `BreadcrumbList` |
| International Patients | `WebPage`, `BreadcrumbList` |
| Contact Us | `ContactPage`, `MedicalClinic`, `FAQPage`, `BreadcrumbList` |
| Reviews, Articles, legal drafts | `BreadcrumbList` only (and they are not indexable until they hold content, see below) |

Entities link by `@id` (`/#clinic`, `/#website`, `/dr-poonam-jain#physician`), so the clinic, the site and the doctor are one connected graph rather than separate blocks.

## What is deliberately NOT in the markup

| Field | Why it is absent | When it can be added |
|---|---|---|
| `telephone` | Conflict C1: two numbers appear in the clinic's own materials | After the clinic names the number; flip `PHONE_CONFIRMED` in `schema.ts` |
| `openingHours` | None approved | After the clinic supplies hours |
| `aggregateRating`, `review` | No consented reviews; the old "4.9 from 299" is unverifiable. Google also forbids self-serving ratings markup for the business itself | Never for self-ratings |
| `sameAs` (social, directory profiles) | No approved profiles; the audit's YouTube handle did not exist | After the clinic confirms ownership of each profile |
| `image` | No photograph is approved | After approval, use only approved assets |
| `alumniOf`, degrees, `award` | Qualification wording unconfirmed (C3, C4, C12) | After the doctor confirms wording |
| `lastReviewed`, `reviewedBy` | No clinician has reviewed any page | `webPage()` accepts `review: { by, on }`; add a real reviewer's name and date from the sign-off record only |
| `priceRange`, `isAcceptingNewPatients`, `availableService` | Not stated by the clinic | After approval |

`scripts/seo-audit.mjs` fails the build of the launch simulation if any of these fields appears.

## Which pages are indexable (sitemap and robots)

`indexable(page) = ALLOW_INDEXING && reviewed && contentReady`. New in this phase: **`contentReady`** (`src/config/routes.ts`) keeps four kinds of page out of search even at launch until they hold real content:

- `/videos` (answers 404 until three videos are approved) was being listed in the sitemap in the launch simulation; it no longer is.
- `/testimonials` and `/blogs` (empty placeholder pages) stay `noindex` until a consented review or a reviewed article exists.
- `/privacy-policy` and `/terms-and-conditions` stay `noindex` while they are drafts (until `PRIVACY_URL` is set to the approved legal page).

## Validation

- Machine checks (JSON validity, `@context`, resolvable `@id`, breadcrumb order, FAQ answers non-empty, no forbidden fields, no markup in the default build): pass, see SEO_AUDIT.md.
- **Not done:** Google's Rich Results Test and the schema.org validator need the deployed, public URL (or pasted code); do them at staging. `medicalSpecialty: "Ophthalmology"` is a free-text value inherited from the earlier build and should be checked in that validator.
- Google has restricted FAQ rich results to a small set of authoritative sites, so `FAQPage` markup may not produce a visible rich result. It still describes the questions and answers precisely for search and answer engines and is harmless where unused.
