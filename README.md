# Namokar Eye & Oculoplasty Centre: website

Next.js 16 (App Router) + React + TypeScript. Read `CLAUDE.md` first: it holds the design, content and approval rules.

## Run
    npm install
    npm run dev            # safe default: pending photos and videos are hidden
    npm run dev:preview    # LOCAL REVIEW ONLY: shows pending media with "Preview only" tags (never deploy this)
    npm run build && npm start

## Checks
    npm run lint
    npx tsc --noEmit
    npm run build
    node scripts/qa-crawl.mjs http://127.0.0.1:3103   # route crawl + media/YouTube leak probes (against a default build)

## Where things live
- `src/config/site.ts` contact details and internal routes · `src/config/routes.ts` page registry and indexing
- `src/config/assets.ts` every photo/video with source and approval · `private-assets/` the files (not in `public/`)
- `src/content/` services, videos, articles, reviews · `docs/` ledgers, QA, media and photography notes
- Online booking is off unless the server sets `APPOINTMENT_FORM_ENABLED=on` and `APPOINTMENT_WEBHOOK_URL`.
- Namokar website leads use `INVICTUS_NAMOKAR_LEADS_URL=https://<invictus-api>/api/v1/namokar/website-leads`; the Invictus backend owns the PulseOS token and Sheets mirror.
- Search indexing is off until the server sets `ALLOW_INDEXING=on` and pages are marked reviewed.
