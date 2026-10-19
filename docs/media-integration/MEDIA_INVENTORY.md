# New media: inventory and audit (17 Oct 2026)

**Update 18 Oct 2026: the 11 original files were moved out of the project to `~/Namokar-Private-Media/` (outside the project and outside iCloud-synced Documents; folder mode 700, files mode 600; not synced, not in Git). Names, formats and contents are unchanged (size and SHA-256 verified before and after). The website uses only the derivatives in `private-assets/`; nothing reads the originals.**

All 11 files were in the project root, fully downloaded (size equals allocated blocks, no iCloud placeholder) and readable. One name differs from the list: it is **`Catract Excercise.m4v`** (sic). Originals are untouched. Contact sheets: `contact-sheets/`.

## Photographs (HEIC, 4032×3024, Display P3, GPS present in the originals)
| Original | Shows | People | Verdict | Derivative (private-assets, sRGB WebP, no metadata) |
|---|---|---|---|---|
| IMG_7483.HEIC | Operation theatre: table, microscope, console, clock panel | none | USED | hospital-ot-modern-a.webp, 2400×1146 (cropped below the ceiling unit) |
| IMG_7485.HEIC | Same theatre from the door side | none | USED | hospital-ot-modern-b.webp, 2400×1086 |
| IMG_7487.HEIC | Theatre from a corner, shelving and trolley | none | USED | hospital-ot-modern-c.webp, 2400×1336 |
| IMG_7484.HEIC, IMG_7486.HEIC | Same theatre, near-duplicate angles | none | Reserve (not published) | none |

Notes: sharp, natural colour (only +2 % contrast). The ceiling air-handling unit carries its **manufacturer's** ISO/CE/QR/"airborne infection control" label; the crops exclude it so it cannot be read as the centre's accreditation. Two different theatres now appear across the shoots (cream-walled with green floor, and this white-and-blue one): **client to say which are current.**

## Videos
| Original | Length / format | Audio | Shows | Verdict | Derivative |
|---|---|---|---|---|---|
| Catract Excercise.m4v | 77 s, 1080×1920 H.264 | speech (about -33 dB mean) | Dr. Poonam Jain explains "Cataract surgery? When can you exercise?", with a logo, on-screen text and inserted footage (a man with an eye shield, gym and yoga scenes that look stock or generated) | USED on the cataract page, pending | video-post-cataract-exercise.mp4 (720×1280, 9.1 MB, AAC) |
| IMG_7326 (1).MOV | 43 s, vertical 4K HEVC | room noise only | Walk through theatre doors and rooms; a hand opens a door; a masked surgeon visible through a window | USED on Home, pending | video-ot-tour.mp4 (720×1280, 4.4 MB, silent) |
| IMG_7441.MOV | 5.8 s, vertical | room noise | Dr. Poonam Jain in scrubs by an examination instrument, turns and smiles | USED on Doctor page, pending | video-doctor-scrubs.mp4 (0.5 MB, silent) |
| IMG_7324.MOV | 7 s, vertical 4K | faint | **Live eye operation**: surgeon at the microscope, patient partly visible | **HELD, not processed** | none |
| IMG_7325 (1).MOV | 5 s, vertical 4K | faint | **Live eye operation, operative eye exposed** | **HELD, not processed** | none |
| IMG_7460.MOV | 3.7 s, vertical | faint | Dr. Poonam Jain by a printer-like device | Not used (adds nothing) | none |

Reasons for holding the surgery clips: identifiable operative eye and patient, no consent on file, and a procedure with no clinical review or voice-over. They must not be published without written patient consent and clinical review.

Encoding: H.264 High, yuv420p, `+faststart`, CRF 27, rotation applied, metadata removed. Posters are frames chosen for sharpness (the tour's frame at 23 s was picked by edge-detail scoring; the 20 s frame was motion-blurred).

**Captions and transcripts:** none produced. No speech-to-text tool is installed and I did not install one. The cataract video contains speech, so captions are a publication requirement. `VideoPlayer` supports a captions track once a `.vtt` is added to the registry and the manifest's `captions` field.

## YouTube
See `YOUTUBE_VIDEOS.md`.
