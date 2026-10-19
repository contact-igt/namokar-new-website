# Photography upgrade: how to review

Image-rich design review (local only, shows every pending photograph with a "Preview only" tag):

    npm run dev:preview          # http://localhost:3100
    # or a production build for review on this machine only
    npm run build:preview && npx next start -p 3106

Default (what would ship today, all photographs hidden): `npm run dev` or `npm run build`.

Preview media is served only to localhost; a request that names any other host gets 404, and `ASSET_PREVIEW` is ignored when `VERCEL_ENV=production`. Never deploy a build made with `ASSET_PREVIEW=on`, and never upload `.next`.

Folders here: `IMAGE_INVENTORY.md`, `IMAGE_PLACEMENT_MATRIX.md`, `MISSING_SHOTS.md`, `contact-sheet/`, `screenshots/` (`before/`, `preview/`, `production-default/`, `interaction/`).
