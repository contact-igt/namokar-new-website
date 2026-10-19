# Routes and redirects (16 Oct 2026)

Source of truth in code: `src/config/site.ts` (`LINKS`), `src/config/routes.ts` (`PAGES`, navigation, indexing).
"Reviewed" is false for every page, so none is offered to search engines yet (`robots.txt` disallows all; every page has `noindex`; `sitemap.xml` is empty). Set `ALLOW_INDEXING=on` on the server at launch and flip `reviewed` per page once its sign-off is recorded.

| Route | Status | Legacy URL | Content approved | Media approved | CTA | Test status |
|---|---|---|---|---|---|---|
| `/` | Built | `/` | No (phone, credentials, address) | No photos; fallback panel | Call to Book / Contact and Directions | crawl 200, 8 widths, contrast OK |
| `/about-us` | Built | `/about-us/` (308 to canonical) | No | No photos; fallback panel | Call to Book | crawl 200, 4 widths |
| `/dr-poonam-jain` | Built (new) | none on old site | No (credential wording, biography) | No portrait; name plate | Call to Book | crawl 200, 8 widths |
| `/our-services` | Built (new) | `/our-services/` | No | text-led | Call to Book | crawl 200, 8 widths |
| `/stitchless-cataract-surgery` | Built (new) | same slug | No (clinician sign-off) | text-led | Call to Book | crawl 200, 8 widths |
| `/glaucoma-management` | Built (new) | same slug | No | text-led | Call to Book | crawl 200, 4 widths |
| `/comprehensive-eye-examinations` | Built (new) | none (old site listed it with no page) | No; scope of tests unconfirmed | text-led | Call to Book | crawl 200, 4 widths |
| `/eyelid-surgery-blepharoplasty` | Built (new) | same slug | No | text-led | Call to Book | crawl 200, 4 widths |
| `/aesthetic-oculofacial` | Built (new) | same slug | No; offered treatments unconfirmed | text-led | Call to Book | crawl 200, 4 widths |
| `/eye-plastic-reconstructive-surgery` | Built (new) | same slug | No | text-led | Call to Book | crawl 200, 4 widths |
| `/international-patients` | Built (new) | same slug | No; says only what is safe, lists what it does NOT promise | text-led | Call to Book | crawl 200, 4 widths |
| `/testimonials` | Built, honest empty state | `/testimonials/` | No reviews supplied | none | Call to Book | crawl 200, 4 widths |
| `/blogs` | Built, honest empty state | `/blogs/` | No articles supplied | none | Call to Book | crawl 200, 4 widths |
| `/blogs/[slug]` | Built; no articles; unknown slug returns true 404 (`src/proxy.ts`) | none (old index listed no posts) | n/a | n/a | n/a | `/blogs/not-a-real-article` = 404 |
| `/contact-us` | Built | `/contact-us/` | No (phone, hours, pin) | n/a | Call; form off | crawl 200, 8 widths |
| `/privacy-policy` | Review-only draft template, no invented legal text | `#` on old site | Legal text not approved | n/a | n/a | crawl 200, noindex |
| `/terms-and-conditions` | Review-only draft template | `#` on old site | Legal text not approved | n/a | n/a | crawl 200, noindex |
| `not-found`, `error` | Built | n/a | n/a | n/a | Home, services, contact, call | 404 verified |
| `/gallery` | **Not built**, by design | none | no approved photographs | none | | no empty gallery |
| `/api/appointment` | Built; off by default | n/a | n/a | n/a | n/a | see TEST_REPORT |
| `/media/[file]` | Built; serves approved assets only | n/a | n/a | n/a | n/a | 67 probes, all 404 |

## Navigation
Header: Home, About (About Us, Dr. Poonam Jain), Services (six pages and View all), International Patients, Contact Us, phone button. Footer lists the same pages plus the six services. Articles and Patient Reviews are in the footer only when real content exists (none today). Privacy and Terms are not linked anywhere while drafts. Every link is an internal route or `tel:`/Google Maps.

## Redirects
- Old URLs end with a slash (`/about-us/`). Next.js sends them to the slashless canonical URL with a 308 (checked for eight of them).
- The old WordPress site's `/blogs/` listed no posts, so no article redirects exist. When articles are added, add each old permalink to `redirects()` in `next.config.ts`.
- Pages on the old site that are **not** rebuilt, because they are not in the agreed service list and their content cannot be verified: `/squint-adult-paediatric`, `/refractive-surgery-lasik-icl`, `/paediatric-eye-care`, `/myopia-control` (and Cornea, Retina, Corporate Screening, which had no page). They now return 404. If the clinic offers them, supply approved content; otherwise leave them or redirect to `/our-services` (client decision).
- Pages were not fetched for: old `/squint-adult-paediatric` etc. (listed only as links). Their content was not read and is not inferred from slugs.
