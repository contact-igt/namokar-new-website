# SEO audit results

18 Oct 2026. Tools: `scripts/seo-audit.mjs`, `scripts/check-canonicals.mjs`, `scripts/check-media-exposure.mjs`, `scripts/qa-crawl.mjs`; raw output in `seo-audit-default.json` and `seo-audit-launch-simulation.json`. **Nothing was deployed and indexing was not activated.**

## How it was tested

| Mode | Build | Purpose |
|---|---|---|
| **Default (review) build** | `npm run build` with no environment variables, served on a local port | Proves the protections still hold: every page noindex, robots `Disallow: /`, empty sitemap, **no JSON-LD**, no media reachable |
| **Launch simulation** | A throw-away copy of the project in a scratch folder (outside the repository) with every page set `reviewed: true` and `ALLOW_INDEXING=on`, built and served on another port | Tests the *future* launch configuration (robots, sitemap, canonicals, structured data) without touching the real flags. The copy was deleted afterwards |

## Results

| Check | Default build | Launch simulation |
|---|---|---|
| Pages audited | 16 (the hidden `/videos` answers 404 as designed) | 16 |
| One `<title>` and one meta description per page; **no duplicates** | pass | pass |
| One `h1` per page; no skipped heading levels | pass | pass |
| `html lang="en-IN"`, viewport, one `<main>` | pass | pass |
| One canonical per page, absolute, https, on `https://namokareyecare.com`, equals the page's own path | pass (the home page was missing one: **fixed**) | pass |
| `og:title/description/type/url/image` and `twitter:card` on every page | pass | pass |
| Image alt attributes; in-page anchors resolve | pass | pass |
| `robots` meta | noindex, nofollow on all | index on 12 pages; **noindex kept on reviews, articles, privacy and terms** until they hold approved content |
| `robots.txt` | `Disallow: /` | `Allow: /`, `/api/` and `/media/` disallowed, sitemap link |
| `sitemap.xml` | **0 URLs** | 12 URLs on the production domain; **excludes** `/videos`, `/testimonials`, `/blogs`, `/privacy-policy`, `/terms-and-conditions` |
| JSON-LD | **none emitted (asserted)** | valid JSON, schema.org context, every `@id` reference resolves, breadcrumbs ordered, FAQ answers non-empty, no forbidden field (telephone, hours, ratings, reviews, sameAs, images, credentials) |
| Redirects | see REDIRECT_MAP.md | n/a |
| Crawl (`qa-crawl.mjs`) | 16/16 pages 200; 200 guessable media URLs for 28 pending assets all 404; no external hosts except the clinic domain and Google Maps | n/a |
| Media exposure (`check-media-exposure.mjs`) | **pass**: 41 confidential files (11 originals in the private folder, 28 pending assets, 2 AI originals), 2,952 URL probes, 882 build files hashed, none served or packaged | n/a |
| Lint, `tsc --noEmit`, production build | pass | build pass |

### Warnings (do not fail)

- Three titles run 66 to 74 characters: the two legal drafts (noindex) and Eyelid Surgery (Blepharoplasty). Search engines may shorten them.
- Descriptions on Reviews, Articles and the two legal drafts are short by design.

### Per-page metadata and structured data

| Path | Title | Title chars | Description chars | h1 | JSON-LD default | JSON-LD launch simulation | Robots default | Robots launch simulation |
|---|---|---|---|---|---|---|---|---|
| `/` | Namokar Eye & Oculoplasty Centre \| Eye Care in Ashok Vihar, Delhi | 65 | 147 | 1 | none | WebSite, MedicalClinic, WebPage, FAQPage | noindex, nofollow | index, follow |
| `/about-us` | About Us \| Namokar Eye & Oculoplasty Centre | 43 | 147 | 1 | none | AboutPage, MedicalClinic, BreadcrumbList | noindex, nofollow | index, follow |
| `/dr-poonam-jain` | Dr. Poonam Jain \| Senior Ophthalmologist in Ashok Vihar, Delhi | 62 | 157 | 1 | none | ProfilePage, Physician, FAQPage, BreadcrumbList | noindex, nofollow | index, follow |
| `/contact-us` | Contact Us \| Namokar Eye & Oculoplasty Centre | 45 | 140 | 1 | none | ContactPage, MedicalClinic, FAQPage, BreadcrumbList | noindex, nofollow | index, follow |
| `/our-services` | Our Services \| Namokar Eye & Oculoplasty Centre | 47 | 155 | 1 | none | CollectionPage, ItemList, FAQPage, BreadcrumbList | noindex, nofollow | index, follow |
| `/international-patients` | International Patients \| Namokar Eye & Oculoplasty Centre | 57 | 155 | 1 | none | WebPage, BreadcrumbList | noindex, nofollow | index, follow |
| `/testimonials` | Patient Reviews \| Namokar Eye & Oculoplasty Centre | 50 | 100 | 1 | none | BreadcrumbList | noindex, nofollow | noindex, nofollow |
| `/blogs` | Health Articles \| Namokar Eye & Oculoplasty Centre | 50 | 106 | 1 | none | BreadcrumbList | noindex, nofollow | noindex, nofollow |
| `/privacy-policy` | Privacy Policy (draft for review) \| Namokar Eye & Oculoplasty Centre | 68 | 107 | 1 | none | BreadcrumbList | noindex, nofollow | noindex, nofollow |
| `/terms-and-conditions` | Terms and Conditions (draft for review) \| Namokar Eye & Oculoplasty Centre | 74 | 113 | 1 | none | BreadcrumbList | noindex, nofollow | noindex, nofollow |
| `/stitchless-cataract-surgery` | Cataract Surgery \| Namokar Eye & Oculoplasty Centre | 51 | 158 | 1 | none | MedicalWebPage, FAQPage, BreadcrumbList | noindex, nofollow | index, follow |
| `/eyelid-surgery-blepharoplasty` | Eyelid Surgery (Blepharoplasty) \| Namokar Eye & Oculoplasty Centre | 66 | 158 | 1 | none | MedicalWebPage, FAQPage, BreadcrumbList | noindex, nofollow | index, follow |
| `/glaucoma-management` | Glaucoma Management \| Namokar Eye & Oculoplasty Centre | 54 | 155 | 1 | none | MedicalWebPage, FAQPage, BreadcrumbList | noindex, nofollow | index, follow |
| `/aesthetic-oculofacial` | Aesthetic Oculoplasty \| Namokar Eye & Oculoplasty Centre | 56 | 152 | 1 | none | MedicalWebPage, FAQPage, BreadcrumbList | noindex, nofollow | index, follow |
| `/eye-plastic-reconstructive-surgery` | Reconstructive Oculoplasty \| Namokar Eye & Oculoplasty Centre | 61 | 157 | 1 | none | MedicalWebPage, FAQPage, BreadcrumbList | noindex, nofollow | index, follow |
| `/comprehensive-eye-examinations` | Comprehensive Eye Examinations \| Namokar Eye & Oculoplasty Centre | 65 | 144 | 1 | none | MedicalWebPage, FAQPage, BreadcrumbList | noindex, nofollow | index, follow |

## The legacy WordPress site (for comparison; read 18 Oct 2026, 22 pages fetched)

- Titles were only "<Page> – Namokar Eye & Oculoplasty Centre" with no keywords or location (for example "Our Services", "Cataract Namokar landing page").
- **No meta descriptions** on any page checked.
- No plain-text `h1` was found on several pages (the site uses a page builder, so this may be markup nesting; not verified further).
- WordPress leftovers were in its own sitemap: a "Hello world!" post, a draft titled "oculoplasty positioning", an unused category, a form entry, a page named "Doctor_details".
- It is indexable (only `max-image-preview` set) and its `robots.txt` blocks only `/wp-admin/`.
- Its canonical on the home page is `https://namokareyecare.com/`, the same origin this site uses.

The new site is therefore better on every on-page measure, but **it is intentionally not indexable yet**, so the old site stays the one search engines see until launch.

## Not done (and not claimed)

| Item | Why |
|---|---|
| **Lighthouse** (performance, accessibility, best practices, SEO) | Needs a deployed staging URL or a Lighthouse run; none was made. Earlier lab timing (LCP under 1.6 s on throttled mobile) is not a Lighthouse score |
| Core Web Vitals field data | Needs real traffic |
| Rich Results Test and schema.org validator | Need a public URL or pasted code; do at staging |
| Search Console, Bing Webmaster verification | Need the domain and ownership |
| Real-device and screen-reader testing | Not available here |
| Search volumes, rankings, backlink counts | No licensed tool; nothing invented (KEYWORD_MAP.md, BACKLINK_OPPORTUNITIES.md) |
| Hreflang / Hindi pages | Not in scope; needs a Hindi-speaking clinician |

## Remaining SEO blockers before indexing may be switched on

1. Written authorisation to publish and to allow indexing.
2. Medical review of each page, then `reviewed: true` per page (LAUNCH_READINESS_CHECKLIST.md section 9).
3. Phone conflict C1 and the credential conflicts (C3, C4, C12) resolved; only then add `telephone` to the markup.
4. The five unbuilt legacy services decided; permanent (301) redirects confirmed.
5. Staging run of Lighthouse, Rich Results Test and real devices.
