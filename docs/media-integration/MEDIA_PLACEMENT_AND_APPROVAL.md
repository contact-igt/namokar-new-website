# Placement and approval matrix (new media)

Everything is **pending**; nothing was approved. Default builds show none of it (no photo, no video, no YouTube ID in any page, `/videos` returns 404). The local review preview shows all of it with "Preview only" tags.

| Page | Photographs | Videos |
|---|---|---|
| Home | Gallery lead: hospital-ot-modern-b; cataract card: hospital-ot-modern-a | "Explore Namokar": local walkthrough (16:9, 33 s, silent) and Inside the operation theatre area (9:16, 43 s, silent) |
| About | Gallery adds ot-modern-b and ot-modern-c | YouTube: A closer look inside Namokar (0:54) |
| Dr. Poonam Jain | unchanged | YouTube: Why I became an eye surgeon; local clip: Dr. Poonam Jain at the centre (silent) |
| Cataract | hero hospital-ot-modern-a, supporting ot-modern-b | local: Cataract surgery: when can you exercise? (1:17, with speech) |
| Glaucoma | unchanged (consultation photos) | YouTube: four glaucoma misconceptions (Hindi title) |
| Eye examinations | unchanged | YouTube: tired eyes after screen time |
| Eyelid | unchanged | YouTube: Blepharoplasty |
| Aesthetic | unchanged | none |
| Reconstructive | hero hospital-ot-modern-c | YouTube: Entropion surgery |
| International, Contact | unchanged | none |
| `/videos` (new, hidden) | | library of 18 videos in four groups, appears only when at least 3 are approved |

| Asset | Approval needed |
|---|---|
| ot-modern-a, -b, -c | Client sign-off; which theatre is current |
| video-ot-tour (+poster) | Client sign-off; staff glimpse |
| video-doctor-scrubs (+poster) | Dr. Poonam Jain, client |
| video-post-cataract-exercise (+poster) | Dr. Poonam Jain; clinician review of the advice; licence for inserted footage; captions |
| 14 YouTube videos | Client confirms channel ownership; per video: clinician review, consent where patients show, and `approved: true` in `src/content/videos.ts` |

## How to approve
Local files: set `approved: true` in `src/config/assets.ts` (video and its poster). YouTube: set `approved: true` on the entry in `src/content/videos.ts`. Record sign-off in `docs/NAMOKAR_CONTENT_VERIFICATION.md`.

## Original-to-derivative record
IMG_7483.HEIC → hospital-ot-modern-a.webp · IMG_7485.HEIC → hospital-ot-modern-b.webp · IMG_7487.HEIC → hospital-ot-modern-c.webp · IMG_7326 (1).MOV → video-ot-tour.mp4 + video-ot-tour-poster.webp · IMG_7441.MOV → video-doctor-scrubs.mp4 + poster · Catract Excercise.m4v → video-post-cataract-exercise.mp4 + poster. All derivatives are in `private-assets/`, none in `public/`.
