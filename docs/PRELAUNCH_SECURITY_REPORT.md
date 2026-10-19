# Pre-launch security and metadata corrections

18 Oct 2026. Scope: confidential media exposure and the missing homepage canonical. Nothing was deleted, moved or overwritten, no history was touched, nothing was committed or deployed, and indexing protections are unchanged.

## 1. Sensitive files identified

| Location | Files | What they contain | Sensitivity |
|---|---|---|---|
| Project root (raw originals) — **moved 18 Oct 2026 to `~/Namokar-Private-Media/`** | `IMG_7324.MOV` (24 MB), `IMG_7325 (1).MOV` (15 MB) | **Live eye surgery: operating surgeon, patient partly visible; the second shows the operative eye exposed.** No patient consent, no clinical review | **Highest: patient imagery** |
| | `IMG_7326 (1).MOV` (134 MB) | Theatre walk-through; a masked surgeon visible through a window | High: staff, unapproved |
| | `IMG_7441.MOV`, `IMG_7460.MOV` | Dr. Poonam Jain in scrubs, and by a device | High: doctor, unapproved |
| | `Catract Excercise.m4v` (95 MB) | Dr. Poonam Jain speaking; inserted footage of an unidentified man with an eye shield, stock-style scenes | High: doctor, third-party footage, licence unknown |
| | `IMG_7483`–`IMG_7487.HEIC` (5 files, about 1.7 MB each) | Operation theatre, no people. **Originals carry GPS location metadata** | Medium: unapproved, location data |
| `private-assets/` | 20 photographs and posters, 4 videos, 2 AI images (derivatives, metadata stripped) | Includes Dr. Poonam Jain (6 images, 2 videos), a receptionist (reception photo), empty theatres, exterior. No patient imagery | Medium: unapproved staff and doctor photographs; **all pending** |
| `assets-src/ai-generated/` | 2 JPG originals | AI-generated iris and lens artwork, no people | Low: pending approval |
| `docs/photography-upgrade/contact-sheet/` | 12 contact sheets | Thumbnails of the whole July shoot: **a large crowd at an unrelated event and photographs of Neyani Eye Hospital (a different, third-party hospital)** (seen directly), and, according to the image inventory, team members and patients being examined (not re-opened in this task) | High: identifiable people, third-party material |
| `docs/media-integration/contact-sheets/` | 9 sheets | Frames from every supplied clip including the held surgery clips, and YouTube thumbnails | High |
| `docs/client-approval/thumbs/`, `screenshots/` | 24 thumbnails, 52 page screenshots | Pending photographs including the receptionist and the doctor | Medium |
| `docs/screenshots/`, `docs/full-site-build/screenshots/`, `docs/media-integration/screenshots/`, `docs/photography-upgrade/screenshots/` | about 1,300 screenshots, about 470 MB | Review-preview pages showing pending photographs; reference screenshots of other websites | Medium |
| `.next/dev/cache/images/` (while the dev preview runs) | optimised copies of pending images | Copies of pending photographs | Medium: generated, now deleted |
| `public/`, `src/app/*.png` | logo, three icons | The approved logo and icons only | None |

No file in `public/` is confidential. No patient imagery exists anywhere except the two raw surgery clips in the project root (and frames of them in the media-integration contact sheets).

## 2. Git tracking and exclusion status

- **This folder has no `.git` of its own.** The environment reports a repository because **the home directory `/Users/sushil` is itself a Git repository** (branch `main`, remote `origin` = `github.com/contact-igt/igt.git`, which is an unrelated project). That repository has **no local commits and an empty index**, so **nothing from this project is tracked or committed anywhere**, and no history contains it. I read this from the `.git` files only; the `git` command itself is blocked on this Mac until the Xcode licence is accepted, and I did not work around that.
- **Risk found:** running `git add .` or `git commit` inside this folder would add files to that home-level repository, and a push would send them to the unrelated remote. No exact tracked-file list exists to report because nothing is tracked.
- `.gitignore` before this task covered only build output and environment files. **Nothing protected the raw originals.**
- `.gitignore` now excludes (tested with the standard gitignore matcher over all 1,503 files in the project):
  - every raw video or photograph file type in the project root, written case-insensitively because this Mac's Git ignores case (`.MOV`, `.m4v`, `.mp4`, `.HEIC`, `.JPG`, `.PNG`, `.DNG`, and others), plus `raw-media/`, `originals/`, `source-media/`, `client-media/`, `incoming/`;
  - `docs/client-approval/screenshots/` and `thumbs/`, and every `docs/**/screenshots/`, `contact-sheet/`, `contact-sheets/` folder (the written `.md` documents stay trackable: 24 of them);
  - `.next*` build and preview output.
  Result: all 11 root originals are ignored; no image under `docs/` remains trackable.
- **Deliberately not ignored:** `private-assets/` (28 files) and `assets-src/`. The site serves approved media from `private-assets/`, so a deployment built from the repository needs it. This is a decision for you (section 6).
- New `.vercelignore` (used instead of `.gitignore` by `vercel deploy` from a folder): excludes build output, `.env*`, the raw originals, `docs/` and `assets-src/`. It does **not** exclude `private-assets/` (same reason).

## 3. Remaining exposure paths

| Path | State |
|---|---|
| Public assets (`public/`) | Clean: logo only |
| `/media/<file>` | Registry-only lookup; unapproved files answer 404; no user input reaches the file path. Verified (section 5) |
| `/_next/image` | Cannot fetch a pending file or any root original: 404 for every probe |
| Public API routes | Only `/api/appointment` (form, off by default); no media |
| Production build output | Verified clean: no build file is byte-identical to any original or pending asset; no trace file packages `private-assets`, `assets-src` or `docs` |
| Preview build artifacts | **Remaining risk, now guarded.** A build made with `ASSET_PREVIEW=on` packages every pending file into `.next`. Added: `next.config.ts` now **refuses to build** when `ASSET_PREVIEW=on` and the host platform's variables (`VERCEL`, `VERCEL_ENV`) are present (tested: build aborts with a clear message). A local preview build in `.next` must still never be uploaded; `.next*` is ignored by both `.gitignore` and `.vercelignore` |
| **Home-level Git repository** | **Open.** See section 2. Needs a decision (section 6) |
| Raw originals in the project folder | **Closed 18 Oct 2026:** moved to `~/Namokar-Private-Media/` (section 7). None remain in the project |
| iCloud | The project is in an iCloud-synced folder, so the raw originals, including the surgery clips, are synced to iCloud (your own account). Moving them out fixes the Mac copy only if the destination is not synced |
| `private-assets/` in a repository or an uploaded folder | Pending doctor and receptionist photographs would be uploaded with the source. They are not packaged into the running site and are refused at request time, but they would be on the host's source storage. Keep the repository private, or see section 6 |
| File names of originals inside server-only code chunks | The asset registry's source notes name the original files. They are in `.next/server` only, never in a client file or a served page |

## 4. Canonical corrections

How canonicals are generated: the root layout sets `metadataBase` from `SITE.origin` (`https://namokareyecare.com`). Each page declares `alternates.canonical` as a path, and Next.js turns it into an absolute URL. The root layout deliberately declares none (otherwise every page without its own would claim "/").

- **Domain verified** by request: `https://namokareyecare.com` answers 200 with no redirect; `https://www.` and `http://` redirect to it; the live clinic site's own canonical is the same origin. (Whether the *new* site will be hosted there remains your decision.)
- **Fix:** `src/app/page.tsx` now exports `metadata` with `alternates.canonical = "/"` and a full `openGraph` including `url`, so the home page matches every other page. The shared description constant moved to `HOME_DESCRIPTION` in `src/config/site.ts` (used by the layout and the home page, text unchanged).
- Next.js writes the home canonical as the bare origin `https://namokareyecare.com`, which is the same URL as origin plus `/`; the checker accepts both.
- **Result for all 16 public routes:** one canonical each, absolute, https, on the production origin, no query, no fragment, no trailing slash, equal to the route's own path. `og:url`, where present, equals the canonical. Four routes (testimonials, blogs, privacy, terms) have a canonical but no `og:url`; this is harmless and was left alone.
- `/videos` (hidden until three videos are approved) and unknown addresses answer a true 404. `/about-us/` redirects (308) to `/about-us`.
- Preserved: every page is `noindex, nofollow`; `robots.txt` is `Disallow: /`; `sitemap.xml` is empty; `ALLOW_INDEXING` untouched. No deployment.

## 5. Test results (default production build, no environment variables)

| Check | Result |
|---|---|
| `npm run lint` | Pass, no warnings |
| `npx tsc --noEmit` | Pass (run after the build, which generates the framework's layout types) |
| `npm run build` | Pass, 27 static pages |
| `node scripts/check-canonicals.mjs` | Pass: 16 pages, `/videos` 404, robots and sitemap as expected |
| `node scripts/check-media-exposure.mjs … --build-dir .next` | **Pass.** 41 confidential files (11 root originals, 28 pending private assets, 2 AI originals); 2,952 URL probes (direct paths, `/media/`, path traversal with encoded and double slashes, upper-case names, `/_next/image` at two sizes, spoofed `Host` and `X-Forwarded-Host`) none served; 7 pages scanned for file names, none; 874 build files compared by SHA-256 with every original, none identical; trace files package 0 private files |
| Hosted-build guard | `VERCEL=1 ASSET_PREVIEW=on next build` aborts with "ASSET_PREVIEW=on is for local review only" |
| `.gitignore` | Tested against all 1,503 project files with a gitignore-spec matcher: 11 of 11 root originals ignored |

Not re-run: the full `qa-crawl.mjs` and the preview-mode security tests from 17 to 18 Oct (the media route and registry were not changed). Git itself could not be run (Xcode licence).

New repeatable scripts: `scripts/check-canonicals.mjs`, `scripts/check-media-exposure.mjs`.

## 6. Actions requiring your approval

1. ~~Move the raw originals out of the project~~ **Done 18 Oct 2026** (section 7). Still open for you: whether to keep the two live-surgery clips at all (or delete them), and whether to back the private folder up somewhere that is not cloud-synced.
2. **Give the project its own Git repository** instead of the home-directory one: this needs the Xcode licence accepted on this Mac (`sudo xcodebuild -license`, which needs an administrator), then `git init` in this folder and a **private** remote. Until then do not run `git add` or `git commit` here. I will not change the home repository.
3. **Decide where `private-assets/` lives.** Options: (a) keep it in a private repository (simple; pending photographs are on the host's source storage but never served); (b) ignore it and add only approved files with `git add -f` one by one (stronger; approved media must then be added by hand); (c) move media to private object storage later. I recommend (a) with a private repository for now, and (b) if the repository may ever be shared.
4. **Docs images.** About 1,350 screenshots and contact sheets (about 500 MB) remain on disk, now ignored. The contact sheets (`docs/photography-upgrade/contact-sheet/`, `docs/media-integration/contact-sheets/`) show staff, a crowd, a third-party hospital and frames of the surgery clips. Recommend archiving them with the originals, or deleting them if the audit trail is not needed. I have not touched them.
5. **If any of these files is ever committed by mistake** (safe procedure; I will not run it without your say-so): stop and do not push; `git rm --cached <file>` and commit to stop tracking; if it was **never pushed**, `git reset --soft` to the commit before and recommit without it; if it **was pushed**, treat the files as exposed: rewrite history with `git filter-repo --invert-paths --path <file>` on a fresh clone, force-push after coordinating with every collaborator, ask the host to purge cached objects, and for the surgery clips tell the clinic. History rewriting needs your explicit authorisation.
6. **Preview artifacts (optional):** point preview builds at a separate output folder (for example `.next-preview`) so a preview can never overwrite or be mistaken for the deployable `.next`. This changes how type generation and the dev server find their files, so I have not done it.
7. **Confirm** that `https://namokareyecare.com` will be the production domain (conflict C11 in the approval package).

## 7. Raw originals moved (18 Oct 2026)

- **Destination:** `~/Namokar-Private-Media/` (outside the project and outside iCloud-synced Documents; folder mode 700, files mode 600; not synced, not in Git). A `.gitignore` containing `*` sits inside it, because the home directory is itself a Git repository (empty index, unrelated remote). No iCloud file-provider attribute is present on the folder.
- **Files (11), names and formats unchanged:** Catract Excercise.m4v, IMG_7324.MOV, IMG_7325 (1).MOV, IMG_7326 (1).MOV, IMG_7441.MOV, IMG_7460.MOV, IMG_7483.HEIC to IMG_7487.HEIC. Total 294,012,499 bytes.
- **Verification:** size and SHA-256 recorded before the copy, and re-checked on the sources immediately before copying and on the copies afterwards: 11 of 11 identical. Only then were exactly those 11 files removed from the project root. Original modification times were preserved.
- **Not touched:** `private-assets/` (28 files), the approved logo in `public/images`, the AI originals in `assets-src/`.
- **Website impact:** none. The site reads media only from `private-assets/` through the registry (`src/app/media/[file]/route.ts`). The only mentions of the original files are text provenance notes in `src/config/assets.ts` (three notes now say the original is kept outside the project).
- **If an original is ever needed again** (for example to cut a longer approved video), take a copy from the private folder; never put the originals back in the project folder.
