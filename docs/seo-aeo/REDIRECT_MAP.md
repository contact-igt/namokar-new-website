# Redirect map: WordPress site to the new site

18 Oct 2026. Implemented in `src/config/redirects.ts` and wired into `next.config.ts`. **Not deployed, not live.** Nothing redirects anyone until the new site is deployed to the production domain.

## Where the legacy list came from

The live site's own sitemap (`https://namokareyecare.com/wp-sitemap.xml`, read 18 Oct 2026) lists **21 pages, 2 posts, 1 category and 1 form**. Its `robots.txt` blocks only `/wp-admin/`. Every legacy page had a title only: **no meta descriptions** were found. Nothing was inferred from slugs; every address below is one the sitemap listed.

## Map

| Legacy address (title on the old site) | New destination | Type | Reason | Status |
|---|---|---|---|---|
| `/` | `/` | same | Home | no rule needed |
| `/about-us/` | `/about-us` | automatic 308 (slash removal) | Same page | built in |
| `/our-services/` | `/our-services` | automatic 308 | Same page | built in |
| `/testimonials/` | `/testimonials` | automatic 308 | Same page; **empty until consented reviews exist** | built in |
| `/international-patients/` | `/international-patients` | automatic 308 | Same page | built in |
| `/blogs/` | `/blogs` | automatic 308 | Same page; empty (the old listing had no posts) | built in |
| `/contact-us/` | `/contact-us` | automatic 308 | Same page | built in |
| `/dr-poonam-jain/` | `/dr-poonam-jain` | automatic 308 | Same page. (An earlier note said the old site had no doctor page; the sitemap shows it does.) | built in |
| `/stitchless-cataract-surgery/` | `/stitchless-cataract-surgery` | automatic 308 | Same slug | built in |
| `/eyelid-surgery-blepharoplasty/` | same | automatic 308 | Same slug | built in |
| `/glaucoma-management/` | same | automatic 308 | Same slug | built in |
| `/eye-plastic-reconstructive-surgery/` | same | automatic 308 | Same slug (old title "Eye Plastic & Reconstructive Surgery"; new name "Reconstructive Oculoplasty") | built in |
| `/aesthetic-oculofacial/` | same | automatic 308 | Same slug (old title "Aesthetic Oculofacial") | built in |
| `/cataract-namokar/` ("Landing page for Catract") | `/stitchless-cataract-surgery` | **301** | Old advertising landing page for cataract | coded; confirm |
| `/oculoplasty-namokar/` ("Oculoplasty-Namokar-landing-page") | `/our-services` | **301** | Old oculoplasty landing page; the services hub covers both oculoplasty groups | coded; confirm |
| `/detailed-page/` ("Doctor_details") | `/dr-poonam-jain` | 307 (temporary) | Looks like an internal template; destination unconfirmed | coded; **client to confirm** |
| `/squint-adult-paediatric/` | `/our-services` | 307 (temporary) | Service not in the agreed six | coded; **client decision** |
| `/refractive-surgery-lasik-icl/` | `/our-services` | 307 | same | **client decision** |
| `/paediatric-eye-care/` | `/our-services` | 307 | same | **client decision** |
| `/myopia-control/` | `/our-services` | 307 | same | **client decision** |
| `/cornea-services/` | `/our-services` | 307 | same | **client decision** |
| `/hello-world/`, `/elementor-930/` ("oculoplasty positioning"), `/category/uncategorized/`, `/metform-form/new-form-1773655823/` | none | **404** | WordPress sample post, a draft page, an empty category and a form entry. Not content. A clean 404 is correct | no rule |
| `/feed/`, `/comments/feed/`, `/wp-admin/`, `/wp-json/`, `/wp-sitemap*.xml` | none | 404 | WordPress machinery | no rule |

Hops: a legacy address that ends in a slash reaches a coded destination in **two** hops (Next.js removes the slash with a 308, then the rule applies). This is normal and accepted by search engines; a single hop would need the trailing-slash behaviour of the whole site changed.

## Decisions needed

1. **The five unbuilt services** (squint, LASIK/ICL, paediatric, myopia control, cornea). If the clinic offers one, it needs a clinician-reviewed page (then redirect the legacy address to it with a 301). If it does not, keep the redirect to Our Services (switch to permanent 301 at launch) or let it 404.
2. **`/detailed-page/`** destination.
3. **Switch 307 to 301** for every row above once its destination is confirmed (`permanent: true` in `src/config/redirects.ts`). A 301 is cached by browsers and passes ranking signals; use it only when sure.
4. Keep the old site reachable on a private address until the redirects are verified (LAUNCH_READINESS_CHECKLIST.md §15).

## Verified on a default production build (18 Oct 2026)

| Request | Result |
|---|---|
| `/about-us/` | 308 to `/about-us` |
| `/stitchless-cataract-surgery/` | 308 to `/stitchless-cataract-surgery` |
| `/cataract-namokar` | 308 to `/stitchless-cataract-surgery` (the build reports the 301 as a 308, the permanent redirect Next.js sends) |
| `/detailed-page`, `/refractive-surgery-lasik-icl`, `/paediatric-eye-care`, `/cornea-services` | 307 to the destination above |
| `/hello-world/`, `/elementor-930/` | 308 to the slash-free address, then a true 404 |

## Not redirected on purpose

Query-string and campaign URLs of the old advertising landing pages are not known. When the clinic confirms the live ad destinations, point them at the new pages and update the ads.
