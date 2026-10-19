# Launch readiness checklist

Prepared 18 Oct 2026. **The website is not ready to launch, and this document does not authorise launch.** It lists every gate between today's review build and a public site, says what is already done, and says what is still open. Nothing here has been signed off.

Legend: ✅ done in the build and checked in this project's own tests · ⬜ open (needs the client, a reviewer or work not yet done) · ⛔ blocks launch until closed

## 0. Summary of what blocks launch

| # | Blocker | Owner | Detail |
|---|---|---|---|
| 1 | ⛔ Medical review of every clinical page | Medical reviewer | CONTENT_APPROVAL_MATRIX.md §3, §4 (A1) |
| 2 | ⛔ Source conflicts: phone, fellowship title, observership institution | Client | CONTENT_APPROVAL_MATRIX.md §2 (C1, C3, C4) |
| 3 | ⛔ Photography and video approvals and consents | Client, staff, doctor | MEDIA_APPROVAL_CATALOGUE.md |
| 4 | ⛔ Legal text for Privacy Policy and Terms (if linked) | Legal adviser | CONTENT_APPROVAL_MATRIX.md §4 (A6, A7) |
| 5 | ⛔ Written authorisation to publish and to allow indexing | Client | Section 9 below |
| 6 | ⛔ Lighthouse, real-device and screen-reader testing | Whoever launches | Section 10 below |
| 7 | ⛔ Deployment target, domain and old-site redirect plan agreed | Client and developer | Section 15 |
| 8 | ⛔ Source-folder hygiene (git unusable on this Mac; raw originals now moved out, see section 14) | Developer | Section 14 |

If the clinic wants a **phone-only** launch, items 1–5 shrink: the online form stays off, no legal text is needed for data collection, and any page or photograph that is not approved can simply be left out.

---

## 1. Brand and design review

| Check | State | Notes |
|---|---|---|
| Logo approved by the clinic | ✅ the only approved asset | NABH mark was cropped from the file; please confirm the cropped logo |
| Colour palette follows the approved orange-and-graphite logo; no blue, aqua or gradients | ✅ | Brand orange for rules and numerals; dark orange for buttons and orange text (6:1 on white) |
| Typography: Manrope headings, Inter body | ✅ | |
| Contrast: no text below WCAG AA on any route at 375 and 1440 wide | ✅ checked with a script over every route | Re-run after any colour change |
| Tone: no claims of results, ratings, years, accreditation, awards | ✅ | Nothing in the left-out list (CONTENT_APPROVAL_MATRIX.md §6) is on the site |
| Client's design review of all screenshots | ⬜ | docs/client-approval/screenshots (index in CLIENT_REVIEW.md) |
| "Preview only: not approved" tags | ✅ present in the review build; **absent in the default build, where unapproved media simply does not appear** | Do not launch the review build |

## 2. Media approval states

| Check | State |
|---|---|
| Registry: every photograph, poster, video and AI image is `approved: false`, except the logo | ✅ (re-verified for this package, see CLIENT_REVIEW.md) |
| All 14 YouTube videos `approved: false` | ✅ |
| Unapproved assets return 404 on every guessable URL | ✅ 200 URL guesses across 28 pending assets, all 404 (17 Oct) |
| Unapproved filename, YouTube ID or YouTube host absent from page HTML in the default build | ✅ |
| Private files packaged into a default deployment | ✅ 0 |
| Each approval recorded in writing (who, when, which file) before its flag is switched | ⬜ MEDIA_APPROVAL_CATALOGUE.md |
| Written consent from the receptionist (reception photograph) | ⬜ ⛔ for that photograph |
| Captions or transcript for any approved video that has speech | ⬜ see section 7 |
| Two operation-theatre question answered | ⬜ |
| Live-surgery clips (IMG_7324, IMG_7325 and similar) | Held. Not processed, not on the site, not approved. |

## 3. Telephone and navigation links

| Check | State |
|---|---|
| Every call button uses one `tel:` link from one setting (`SITE.phone`) | ✅ |
| The number is **correct and answered** | ⬜ ⛔ conflict C1 (+91 98104 19720 or 7827455040) |
| Every call button tested by a real phone dialling the number | ⬜ needs a real phone |
| Get Directions opens a Google Maps address *search* | ✅ works; **not the clinic's verified listing** |
| Replace with the clinic's Google Business Profile place link | ⬜ decision D5 |
| Internal links: crawl from the home page, every link returns 200 | ✅ 16 of 16 routes, plus true 404s for unknown pages |
| Menu and footer links go to the right pages | ✅ checked by script and by screenshot |
| Old website addresses that are not rebuilt (squint, LASIK/ICL, paediatric, myopia) return 404 | ✅ by design; ⬜ decide whether to redirect to Our Services (docs/full-site-build/ROUTES_AND_REDIRECTS.md) |

## 4. Contact functionality

| Check | State |
|---|---|
| Phone-only booking: all booking buttons read "Call to Book an Appointment" | ✅ |
| Online form is **off** and cannot be turned on by a public setting alone | ✅ needs both `APPOINTMENT_FORM_ENABLED=on` and a receiving address, both on the server |
| Form safeguards (if ever enabled): validation, hidden spam field, origin check, size limit, per-visitor rate limit, no logging of submissions | ✅ tested with a local mock receiver |
| Rate limit works across several servers | ⬜ the limiter is per-server memory; use a shared or edge limit if the form goes live |
| Real delivery to the clinic's receiving system tested end to end | ⬜ not possible until D8 is answered |
| Privacy notice approved and linked from the form | ⬜ ⛔ **do not activate the form before this** |
| Email, WhatsApp: none shown | ✅ intentional; ⬜ decisions D3, D4 |
| Opening hours: none shown | ✅ intentional; ⬜ decision D6 |

## 5. Mobile responsiveness

| Check | State |
|---|---|
| No horizontal scroll, one h1 per page, no text under 14 px | ✅ scripted, every route, 375, 390, 768, 1440 (home, services, cataract, doctor, contact also 320, 430, 1024, 1280) |
| Tap targets at least 44 px | ✅ designed and spot-checked |
| Screenshots at 390 and 1440 for every requested page | ✅ docs/client-approval/screenshots |
| Layout checked on physical phones and a tablet | ⬜ ⛔ not done: only an emulated browser has been used |
| Landscape orientation and very large text settings on a phone | ⬜ |

## 6. Accessibility and keyboard

| Check | State |
|---|---|
| Skip-to-content link, landmarks, one h1, descriptive link text | ✅ |
| Menu works with keyboard: Tab, Enter, Space, arrow keys, Home, End, Escape; focus returns to the trigger; Tab stays inside the open mobile menu | ✅ scripted |
| Photo gallery opens in a native dialog; Escape closes it | ✅ scripted (preview only) |
| Video: Play is a real button with a descriptive label; Space starts it from the keyboard; visible focus | ✅ |
| FAQ opens and closes by tap and keyboard | ✅ |
| Reduced-motion setting honoured (animations off) | ✅ |
| Colour contrast AA | ✅ |
| Screen-reader testing (VoiceOver on iPhone and Mac, TalkBack on Android) | ⬜ ⛔ not done |
| Alt text on every approved image reviewed by the client | ⬜ alt text sits beside each file in the media registry; approval of an image should include its alt text |
| Text resizing to 200%, Windows high-contrast mode | ⬜ |

## 7. Video captions

| Video | Speech? | Captions today | Needed |
|---|---|---|---|
| Local: walkthrough, theatre tour, doctor in scrubs | No (silent) | Not needed | A short text description is on the page |
| Local: cataract exercise video (77 s) | **Yes** | **None** | A caption file (WebVTT) and clinical review of the advice spoken |
| 14 YouTube videos | Yes (some Hindi) | Not checked | Confirm YouTube captions exist and are accurate; Hindi videos need a Hindi-speaking reviewer |

⬜ ⛔ for the cataract video and any YouTube video that is approved. The site already accepts a caption file; none has been produced and none has been invented.

## 8. SEO metadata and structured data

Every page has a unique title, description and canonical link, and **every page is currently `noindex, nofollow`**. Social sharing image: the logo on a white card. Structured data: **none in the review build**; at launch the types listed in docs/seo-aeo/STRUCTURED_DATA.md (no telephone, hours, ratings, reviews, images or credentials).

| Route | Title | Description | Canonical | Robots | Schema |
|---|---|---|---|---|---|
| `/` | Namokar Eye & Oculoplasty Centre \| Eye Care in Ashok Vihar, Delhi | Comprehensive eye care in Ashok Vihar, North Delhi, with specialist oculoplasty, led by Dr. Poonam Jain, Medical Director and Senior Ophthalmologist. | **none** | noindex, nofollow | MedicalClinic |
| `/about-us` | About Us \| Namokar Eye & Oculoplasty Centre | About Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi: comprehensive eye care and specialist oculoplasty, led by Dr. Poonam Jain, Medical Director and Senior Ophthalmologist. | /about-us | noindex, nofollow | none |
| `/dr-poonam-jain` | Dr. Poonam Jain, Medical Director & Senior Ophthalmologist \| Namokar Eye & Oculoplasty Centre | Dr. Poonam Jain leads Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi, with a particular focus on oculoplasty: the eyelids, tear passages and the area around the eye. | /dr-poonam-jain | noindex, nofollow | none |
| `/our-services` | Our Services \| Namokar Eye & Oculoplasty Centre | Eye care and oculoplasty services at Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi: cataract, glaucoma, eye examinations, eyelid surgery, aesthetic and reconstructive oculoplasty. | /our-services | noindex, nofollow | none |
| `/stitchless-cataract-surgery` | Cataract Surgery \| Namokar Eye & Oculoplasty Centre | General information about cataracts and cataract surgery, and how to arrange an eye examination at Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi. | /stitchless-cataract-surgery | noindex, nofollow | none |
| `/glaucoma-management` | Glaucoma Management \| Namokar Eye & Oculoplasty Centre | General information about glaucoma, why regular eye examinations matter, and how to arrange an assessment at Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi. | /glaucoma-management | noindex, nofollow | none |
| `/comprehensive-eye-examinations` | Comprehensive Eye Examinations \| Namokar Eye & Oculoplasty Centre | What a comprehensive eye examination involves and when to have one, with details of how to arrange a visit to Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi. | /comprehensive-eye-examinations | noindex, nofollow | none |
| `/eyelid-surgery-blepharoplasty` | Eyelid Surgery (Blepharoplasty) \| Namokar Eye & Oculoplasty Centre | General information about eyelid surgery (blepharoplasty) for heavy or drooping eyelids, and how to arrange an assessment at Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi. | /eyelid-surgery-blepharoplasty | noindex, nofollow | none |
| `/aesthetic-oculofacial` | Aesthetic Oculoplasty \| Namokar Eye & Oculoplasty Centre | Aesthetic oculofacial care for the eyelids and the area around the eyes, with a doctor's assessment first. Namokar Eye & Oculoplasty Centre, Ashok Vihar, New Delhi. | /aesthetic-oculofacial | noindex, nofollow | none |
| `/eye-plastic-reconstructive-surgery` | Eye Plastic and Reconstructive Surgery \| Namokar Eye & Oculoplasty Centre | Reconstructive oculoplasty: assessment of drooping eyelids, eyelid malposition and watering eyes at Namokar Eye & Oculoplasty Centre, Ashok Vihar, New Delhi. | /eye-plastic-reconstructive-surgery | noindex, nofollow | none |
| `/international-patients` | International and Outstation Patients \| Namokar Eye & Oculoplasty Centre | Planning a visit to Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi from outside Delhi or abroad: how to get in touch, what to bring and what to ask before you travel. | /international-patients | noindex, nofollow | none |
| `/testimonials` | Patient Reviews \| Namokar Eye & Oculoplasty Centre | Patient reviews of Namokar Eye & Oculoplasty Centre, Ashok Vihar, New Delhi. | /testimonials | noindex, nofollow | none |
| `/blogs` | Health Articles \| Namokar Eye & Oculoplasty Centre | Eye-health articles from Namokar Eye & Oculoplasty Centre, Ashok Vihar, New Delhi. | /blogs | noindex, nofollow | none |
| `/contact-us` | Contact Us \| Namokar Eye & Oculoplasty Centre | Contact Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi: call the centre, get directions and plan your visit or eye consultation. | /contact-us | noindex, nofollow | none |
| `/privacy-policy` | Privacy Policy (draft for review) \| Namokar Eye & Oculoplasty Centre | Draft privacy policy awaiting approval. | /privacy-policy | noindex, nofollow | none |
| `/terms-and-conditions` | Terms and Conditions (draft for review) \| Namokar Eye & Oculoplasty Centre | Draft terms and conditions awaiting approval. | /terms-and-conditions | noindex, nofollow | none |
| `/videos` | Eye Care Videos & Insights \| Namokar Eye & Oculoplasty Centre | Videos from Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi: a look inside the centre, meeting the doctor and general eye-health information. | /videos | noindex, nofollow | none |

**Fixed 18 Oct 2026:** the home page had no canonical link; it now declares `https://namokareyecare.com` (the clinic's live domain, verified to answer over https with `www` redirecting to it). Every route's canonical, `og:url` and robots meta is checked by `node scripts/check-canonicals.mjs <url>`; all pass, and `noindex, nofollow` is unchanged.

Still to do:
- ⬜ Client to approve the titles and descriptions above (they are marketing wording).
- ⬜ Confirm the production domain (`https://namokareyecare.com` is configured, conflict C11).
- ⬜ The `MedicalClinic` block repeats the address and domain: only publish it after both are confirmed. Add a phone number to it only after C1 is answered.
- ⬜ Validate with Google's Rich Results test and Search Console after launch.
- ⬜ Do not add `Physician`, `Review`, `AggregateRating` or hours markup until the matching content is approved.

> **Update 18 Oct 2026 (SEO phase):** structured data is now emitted only when `ALLOW_INDEXING=on`; the sitemap and robots meta additionally exclude `/videos`, reviews, articles and the two legal drafts until they hold approved content (`contentReady()`); every page has one canonical, Open Graph and a Twitter card; legacy redirects are coded (docs/seo-aeo/REDIRECT_MAP.md). See docs/seo-aeo/SEO_AUDIT.md.

> **Update 18 Oct 2026 (immersive phase):** eleven clinical figures are built and **pending medical review** (docs/immersive/README.md). They are hidden in every normal build. Approve each (or leave it out) before launch; sign-off goes in `src/config/figures.ts` and the verification ledger. A default build has 0 figures and ships no animation library; JavaScript is 160 KB per page and the largest paint is under 0.9 s on a throttled phone.

> **Update 19 Oct 2026 (UI refinement):** the local review no longer labels each picture; pending items are listed at the private `/review` index. Review servers now listen on 127.0.0.1 only and the proxy refuses optimizer requests for pending media unless local (docs/ui-refinement/QA_REPORT.md). The homepage treatment explorer shows brand cards, not photographs, until its six photographs are approved.

## 9. robots.txt and sitemap — changes required before launch (**NOT made**)

Today: `robots.txt` is `User-agent: * / Disallow: /`, `sitemap.xml` is empty, and every page carries `noindex, nofollow`. **We have not changed any of this and will not until the client authorises publication in writing.**

Launch requires all three of these, in this order, each as a separate recorded step:

1. ⬜ In `src/config/routes.ts`, set `reviewed: true` **per page**, only for a page whose medical and factual wording has been signed off. Pages left `false` stay `noindex` and out of the sitemap.
2. ⬜ Set the server setting `ALLOW_INDEXING=on` in the **production** environment only. This switches `robots.txt` to `Allow: /` (with `/api/` and `/media/` disallowed) and fills the sitemap with the reviewed pages only.
3. ⬜ After deployment, fetch `/robots.txt`, `/sitemap.xml` and the page source of one page and confirm: no stray `noindex`, the sitemap lists only reviewed pages, the sitemap uses the production domain, and the privacy and terms pages are only listed if their legal text is approved.

Not to be done early: staging and preview environments must keep `ALLOW_INDEXING` unset.

## 10. Lighthouse, real-device and other testing still required

| Test | State |
|---|---|
| Lab timing in a throttled mobile browser (home, About, Cataract, Contact) | ✅ LCP 0.73–0.9 s default build; 0.9–1.6 s review build; CLS about 0 (docs/PERFORMANCE.md) |
| **Lighthouse** (mobile and desktop, performance, accessibility, best practice, SEO) on the deployed staging site | ⬜ ⛔ **not run**. The numbers above are not Lighthouse scores |
| Real-device testing: iPhone Safari, Android Chrome, one tablet, one desktop Safari/Chrome/Edge | ⬜ ⛔ not done |
| Video playback on a real phone, including full-screen and YouTube click-to-load | ⬜ (only headless tests so far) |
| Network conditions: a slow mobile connection from Delhi | ⬜ |
| Screen reader pass | ⬜ ⛔ |
| Real call from a phone, and a real directions tap | ⬜ |
| Cross-browser check of the map ("Show map" only loads Google after a tap) | ⬜ |
| Accessibility audit with a tool (axe) as well as the manual passes | ⬜ |

## 11. Environment-variable validation

The site reads these settings. **None needs to be set for a safe default build.**

| Setting | Meaning | Local review | Staging | Production, before launch | Production, at launch |
|---|---|---|---|---|---|
| `ASSET_PREVIEW` | Shows unapproved media, to localhost visitors only | `on` (review only) | **unset** | **unset** (also forced off by the platform when it reports production) | **unset** |
| `ALLOW_INDEXING` | Lets search engines in | unset | **unset** | **unset** | `on`, only once section 9 steps 1–2 are authorised |
| `APPOINTMENT_FORM_ENABLED` | Turns the online form on | unset | unset | **unset** | unset unless D7–D10 answered |
| `APPOINTMENT_WEBHOOK_URL` | Receiving address for form submissions | unset | unset | unset | set only with the line above |
| `APPOINTMENT_WEBHOOK_TOKEN` | Secret sent to the receiver (optional) | unset | unset | unset | server-side secret, never in the browser |
| `VERCEL_ENV` | Provided by the hosting platform, not set by us | — | preview | production | production |

Validation steps:
- ⬜ Print the configured values on each environment and compare to this table.
- ⬜ Run `node scripts/qa-crawl.mjs <url>` against staging and confirm: all pages 200, every pending asset 404, no cookies, robots as expected.
- ⬜ Confirm no secret is in a `NEXT_PUBLIC_` variable (none is today).
- ⬜ Confirm `.env*` files are not committed (they are git-ignored).
- ⛔ **Never set `ASSET_PREVIEW` on any environment reachable from the internet.**

## 12. npm audit findings and disposition

| Scope | Result | Disposition |
|---|---|---|
| Production dependencies (`npm audit --omit=dev`) | 0 vulnerabilities | None needed |
| All dependencies (`npm audit`) | 5 high severity findings, all in the lint tool chain (`eslint-config-next` → `fast-glob` → `micromatch` → `braces`, a regular-expression slow-down in file matching) | **Accepted for now.** They run only on a developer's computer, never on the website or for visitors. The only suggested fix is a forced, breaking upgrade, which we did not apply. ⬜ Re-run `npm audit` immediately before launch and upgrade the lint tooling in a separate, tested change |

Date of the last audit: 18 Oct 2026. Re-check before any launch.

## 13. Media-preview isolation

| Check | State |
|---|---|
| Private media lives in `private-assets/`, **not** in `public/` | ✅ |
| `/media/<file>` returns 404 unless the asset is approved | ✅ |
| Preview mode serves only when the request really comes from the same computer (localhost), not from another host, and not with a spoofed forwarding header | ✅ tested |
| Preview is forced off on the hosting platform's production environment | ✅ |
| A default build packages **0** private files | ✅ checked |
| Review screenshots in this package were taken from a local-only preview and contain unapproved photographs, including an identifiable staff member | ⛔ **Do not publish or commit this folder to a public place.** See CLIENT_REVIEW.md |
| A build made with `ASSET_PREVIEW=on` (`.next`) is never deployed | ⬜ rule for the person deploying: delete `.next` and rebuild with no preview setting |

## 14. Source folder and repository hygiene

| Item | State | Action |
|---|---|---|
| **(Addressed 18 Oct 2026: `.gitignore` and `.vercelignore` now exclude these, see docs/PRELAUNCH_SECURITY_REPORT.md; the 11 files were moved on 18 Oct 2026 to `~/Namokar-Private-Media/`, outside the project and iCloud-synced Documents, checksums verified.)** Raw media originals (about 290 MB: IMG_7324.MOV, IMG_7325 (1).MOV, IMG_7326 (1).MOV, IMG_7441.MOV, IMG_7460.MOV, Catract Excercise.m4v, five .HEIC photographs) sit loose in the project's top folder and are not covered by `.gitignore`** | ⬜ ⛔ | They include live-surgery footage with an identifiable patient. If the folder is committed or uploaded as it stands, they go with it. Move them out of the project (to a private archive) or add them to `.gitignore` and any deploy-ignore file, **before** any commit or deployment. The originals are unchanged and now live only in the private folder. Keep that folder out of cloud storage and Git |
| `git` is unusable on this Mac until the Xcode licence is accepted (`sudo xcodebuild -license`, needs an administrator) | ⬜ | Nothing has been committed from this machine in this task |
| The project is inside an iCloud-synced folder, which creates duplicate " 2" files in generated output | ⬜ | Move to a non-synced folder when approved (docs/DEV_ENVIRONMENT.md); not done without your say-so |
| Documents in `docs/client-approval` contain images of unapproved photographs | ⬜ | Keep the repository private or exclude this folder from any public copy |

## 15. Deployment and rollback plan

**Hosting is not yet chosen.** The plan below assumes a hosting platform with separate staging and production environments and instant rollback (for example Vercel, which the code already recognises). **No deployment of any kind has been done, and none will be without written approval.**

Before deployment
1. ⬜ Written client authorisation to publish (the whole site or named pages).
2. ⬜ Every ⛔ item in section 0 closed, or the affected page or asset left out.
3. ⬜ Domain, DNS access and who controls it confirmed; DNS time-to-live lowered to a few minutes at least a day ahead.
4. ⬜ Old-site redirect map agreed (docs/full-site-build/ROUTES_AND_REDIRECTS.md); the old WordPress site stays reachable on a private address until the new one is verified.
5. ⬜ Fresh clean build with no preview setting (`rm -rf .next`; `npm run lint`; `npx tsc --noEmit`; `npm run build`).

Staged release
6. ⬜ Deploy to a **staging** address with `ALLOW_INDEXING` unset (search engines stay out).
7. ⬜ Run the crawl script, Lighthouse, real-device and screen-reader tests against staging; the client reviews staging.
8. ⬜ Flip approved media flags and `reviewed` flags in code, one recorded commit per approval batch; rebuild; repeat step 7 for those pages.
9. ⬜ Move the domain to the new site (DNS change). Keep indexing off for the first check.
10. ⬜ Only then set `ALLOW_INDEXING=on` in production, redeploy, check robots, sitemap, and a sample page (section 9), and submit the sitemap in Google Search Console.
11. ⬜ Create or verify the Google Business Profile link and phone number (D1, D5).

After launch
12. ⬜ Watch for 404s, form errors (if on), and phone enquiries for the first week.

Rollback
- **Fast rollback of a bad release:** re-promote the previous deployment on the hosting platform (one action, no rebuild).
- **A wrong photograph or video went live:** set that asset's flag back to `approved: false` and redeploy; the file stops being served and is no longer packaged. Ask the platform to purge its cache.
- **Indexing should be undone:** unset `ALLOW_INDEXING`, redeploy (`robots.txt` returns to `Disallow: /`, pages return to `noindex`), and use Search Console's removal tool.
- **Whole site must revert:** point DNS back to the old site (kept alive for the first weeks; that is why step 3 lowers the time-to-live).
- **Form misbehaving:** unset `APPOINTMENT_FORM_ENABLED`; every booking button goes back to "Call to Book an Appointment".

## 16. Sign-off (not signed)

| Gate | Name | Date | Signature |
|---|---|---|---|
| Brand and design | | | |
| Medical content | | | |
| Facts and contact details | | | |
| Photography and video | | | |
| Legal (privacy, terms, data handling) | | | |
| Technical (tests, environment, deployment) | | | |
| Authorisation to publish and to allow indexing | | | |
