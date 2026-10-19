# SEO, AEO and banner upgrade (18 Oct 2026)

An enhancement of the existing site, not a rebuild. **Nothing was deployed, committed or indexed.** The default build is unchanged in every release protection: all pages `noindex, nofollow`, `robots.txt` `Disallow: /`, empty sitemap, unapproved photographs and videos hidden and unreachable, every page still awaiting clinician review.

**Brief file:** `NAMOKAR_SEO_AEO_UPGRADE.md` was **not found** on this computer (searched Downloads, the project and the home folder). The work follows the five priorities in the request message. If the file exists elsewhere, send its path and any difference will be reconciled.

**Skills:** Anthropic's `frontend-design` and Marketing plugins are in the catalogue but were not enabled in this session, and no Vercel React/Design skill was found; they were not installed or simulated. An install card was shown; enable them if wanted. The Superpowers workflow (verify before claiming done, no invented facts) was followed.

## Modules

| # | Module | Result | Document |
|---|---|---|---|
| 1 | Four-slide home banner (centre, cataract, comprehensive care with glaucoma, oculoplasty) | Built, tested at 390 and 1440 px, no autoplay (project rule) | HERO_BANNER.md |
| 2 | Photo consistency, readability, mobile, interactions | Banner photographs with ordered fallbacks and brand cards; sweep of 17 pages at 390 and 1440 px: 0 overflow, 0 text under 14 px, 0 broken images, 0 controls under 44 px (one found and fixed) | HERO_BANNER.md, screenshots/ |
| 3 | Proofread and medical-claims preparation | 13 consistency fixes; 136 medical statements extracted for the clinical reviewer | CONTENT_PROOFREAD.md |
| 4 | Technical SEO | One metadata builder for all pages; canonical, Open Graph, Twitter; home canonical fixed; descriptions and titles tightened; JSON-LD (gated to launch); redirects; sitemap and robots held-back rules | SEO_AUDIT.md, STRUCTURED_DATA.md, REDIRECT_MAP.md |
| 5 | Local SEO, AEO, keyword map, content strategy, backlinks | Plans and research; no volumes, rankings or backlink counts invented; no outreach | KEYWORD_MAP.md, LOCAL_SEO_PLAN.md, AEO_STRATEGY.md, BACKLINK_OPPORTUNITIES.md |

## Code changed

| File | Change |
|---|---|
| `src/components/Hero.tsx` | Four-slide scroll-snap banner, tabs, buttons, arrow keys, scroll-lock fix |
| `src/app/page.tsx` | Banner shots with fallbacks; JSON-LD; metadata through the shared builder |
| `src/app/globals.css` | Banner track, brand card, controls; 44 px phone link in the call-to-action band |
| `src/lib/seo.ts` (new) | One builder for title, description, canonical, robots, Open Graph, Twitter |
| `src/lib/schema.ts` (new), `src/components/JsonLd.tsx` (new) | schema.org builders; renderer emitting only when `ALLOW_INDEXING=on` |
| `src/components/Breadcrumb.tsx`, `ServiceLayout.tsx` | Breadcrumb and service-page markup; service metadata via the builder |
| `src/app/*/page.tsx` (about, doctor, services, international, contact, reviews, articles, legal, videos) | Metadata through the builder; markup |
| `src/config/routes.ts` | `contentReady()`: empty reviews, empty articles, video library below three videos and unapproved legal drafts are never indexable |
| `src/config/redirects.ts` (new), `next.config.ts` | Legacy WordPress redirects |
| `src/config/site.ts`, `src/content/services.ts`, `src/content/why.ts`, `VisitPanel.tsx`, `BookButton.tsx` | Proofreading fixes; shared home title and description |
| `scripts/seo-audit.mjs`, `scripts/check-canonicals.mjs` (new) | Repeatable checks (the media exposure script and `.gitignore`/`.vercelignore` came from the security task) |

## How to re-run

```
npm run lint && npx tsc --noEmit && npm run build
npx next start -p 3103 &
node scripts/qa-crawl.mjs http://127.0.0.1:3103
node scripts/check-canonicals.mjs http://127.0.0.1:3103
node scripts/seo-audit.mjs http://127.0.0.1:3103
node scripts/check-media-exposure.mjs http://127.0.0.1:3103 --build-dir .next
```

Launch simulation (never in the repository): copy the project to a scratch folder, set every `reviewed: false` to `true` in the copy's `src/config/routes.ts`, run `ALLOW_INDEXING=on npx next build`, start it, then `node scripts/seo-audit.mjs <url> --indexing`.

## Decisions and blockers

See SEO_AUDIT.md ("Remaining SEO blockers") and the client approval package (docs/client-approval). In short: written publication authority; clinician review of every page; phone and credential conflicts; the five unbuilt legacy services; photograph and video approvals; Lighthouse, real-device and screen-reader tests on staging.
