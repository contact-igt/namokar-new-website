# Video integration: working state (19 Oct 2026)

| Module | Status | Evidence |
|---|---|---|
| V0 Audit | done | Baseline screenshots (`screenshots/baseline`). Existing registry, player and shelf inspected. All 27 registered and supplied IDs verified from YouTube's own watch-page data in a real browser; official channel handle in the brief returns 404 (real channel found). |
| V1 Manifest | done | `src/content/videoFacts.ts`; `evidence`, `sensitive`, `learnMore` in `videos.ts`; 2 entries added; 3 missing links resolved by exact title on the channel; matrix in `VIDEO_VERIFICATION_MATRIX.md`. |
| V2 Component | done | Procedure note, poster hover, reduced-motion/data handling, shelf link-through. |
| V3 Pages | done | Placement per README (home shelf, cataract, glaucoma, exams, eyelid, reconstructive, aesthetic, doctor, about). |
| V4 QA | done | 388/388 Playwright checks; lint, tsc, default build, crawl, canonicals, SEO and media-exposure pass; real playback of two videos. |

Decisions: no YouTube thumbnails (request before Play); no VideoObject markup (nothing approved); Shorts only if on the Shorts tab; the earlier homepage Shorts moved off the homepage to match the brief; neutral on-site titles.

Open: all approvals listed in README.md; nothing committed.
