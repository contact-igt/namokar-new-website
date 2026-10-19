# Image assignment matrix (19 Oct 2026)

Every picture below is **pending approval** (`approved: false`; only the logo is approved) and shows only in the loopback-only local review. In the default build every photograph and plate is hidden and the pages fall back to plain brand cards. Photographs were opened and looked at before assignment; file names and registry alt text were not relied on. Photograph derivatives are the WebP files in `private-assets/` (originals are not in the project; the 11 raw clips stay in `~/Namokar-Private-Media/`).

## The problem, measured

Images of Dr. Poonam Jain (a "doctor" or "doctor and patient" entry in the registry) that appear on each page, counted by loading every route in the preview at 1440 px, before and after:

| Page | Before | After |
|---|---|---|
| `/` | 7 | 2 (one introduction portrait, one examination in the explorer) |
| `/our-services` | 5 | 1 |
| `/about-us` | 3 | 2 (her portrait, the team photograph) |
| `/stitchless-cataract-surgery` | 2 | 2 (an examination in progress; the exercise-clip poster) |
| `/glaucoma-management` | 1 | 0 |
| `/comprehensive-eye-examinations` | 2 | 1 (an examination in progress) |
| `/eyelid-surgery-blepharoplasty` | 2 | 0 |
| `/aesthetic-oculofacial` | 1 | 1 (her consultation desk) |
| `/eye-plastic-reconstructive-surgery` | 0 | 0 |
| `/dr-poonam-jain` | 4 | 4 (the profile page: portrait, two room photographs, a clip) |
| Total outside her profile page | 23 | 9 |

Raw data: `audit-before.json`, `audit-after.json`.

## Policy applied

Hospital space, then treatment, then explanation, then **one** doctor moment, then facility, then action. Her photographs are kept for: the one home introduction, the About page's doctor section, her profile page, the aesthetic page (her specialty), and photographs where an examination is being carried out. Treatment cards, hero slides and the services index use facilities and equipment, and, where the centre has no suitable photograph (eyelid, aesthetic, tear passages), three **original line-drawing plates** (`src/components/clinical/Plates.tsx`, registered as `plateEyelid`, `plateAesthetic`, `plateTear` in `src/config/figures.ts`, pending medical review, never photographs or results). No AI, stock or before/after image from the archive ZIP is used.

## Home carousel (hero), in order

| Slide | Message | Photograph (first cleared one is shown) | Why |
|---|---|---|---|
| 1 | Comprehensive Eye Care, Centred Around You. | `hospital-reception.webp`, then `hospital-exterior.webp` | The place first; no doctor |
| 2 | Cataract Care, Explained Clearly. | `hospital-ot-scope.webp` (operating microscope), then `hospital-console-wide.webp` | Cataract equipment |
| 3 | Eye Check-Ups to Glaucoma Care. | `hospital-chart-door.webp` (eye chart), then `archive-glaucoma-test.webp` | Examination and diagnosis |
| 4 | Specialist Care for Your Eyelids. | `hospital-ot-modern-c.webp`, then `hospital-ot-modern-b.webp` | The theatre; no portrait |

## Treatment explorer and services index (one visual per treatment, no repeats)

| Treatment | Picture | Kind |
|---|---|---|
| Cataract | `hospital-ot-modern-a.webp` | facility photograph |
| Glaucoma | `archive-glaucoma-test.webp` (staff member and patient at an eye-testing instrument) | photograph, people: consent needed |
| Eye examinations | `archive-exam-overhead.webp` (an examination in progress) | photograph, doctor and patient: consent needed |
| Eyelid surgery | plate `eyelid` | original line drawing |
| Aesthetic oculoplasty | plate `aesthetic` | original line drawing |
| Reconstructive | plate `tear` | original line drawing |

## Service pages

| Page | Hero | Second picture |
|---|---|---|
| Cataract | `archive-cataract-exam.webp` (a slit-lamp examination) | `hospital-console-wide.webp` |
| Glaucoma | `archive-glaucoma-test.webp` | `archive-staff-equipment.webp` |
| Eye examinations | `hospital-chart-door.webp` | `archive-exam-overhead.webp` |
| Eyelid | `hospital-ot-modern-b.webp` | plate `eyelid` |
| Aesthetic | `dr-poonam-jain-desk.webp` (her consultation desk) | plate `aesthetic` |
| Reconstructive | `hospital-ot-modern-c.webp` | plate `tear` |

Other pages: home gallery (exterior, `hospital-equipment.webp`, `hospital-ot-entrance.webp`, no doctor); home doctor introduction `dr-poonam-jain-portrait.webp`; About hero `hospital-reception.webp`, doctor section `archive-doctor-portrait.webp`, gallery starts with `archive-team-doctor.webp`; Doctor page hero `archive-doctor-scrubs.webp` with two room photographs; International and Contact use the exterior and reception.

## Authenticity, rights and consent

- All photographs are real photographs from the clinic's July 2026 shoot or the archive ZIP's `Gallery` and `cataract` folders (provenance: `docs/archive-integration/ARCHIVE_INVENTORY.md`). The two concept images (`art-iris-macro`, `art-optical-lens`) are labelled AI concept art (`assets-src/ai-generated/PROVENANCE.md`) and only the iris is on a page (the home oculoplasty section).
- Anyone identifiable needs consent before approval: Dr. Poonam Jain (all portraits and examination photographs), the patients in `archive-cataract-exam`, `archive-exam-overhead`, `archive-glaucoma-test`, and the staff in `archive-glaucoma-test`, `archive-staff-equipment`, `archive-team-doctor`, `hospital-reception`.
- Four archive photographs are web copies of about 1,000 to 1,500 px wide; full-size originals are needed before launch.
- The exterior sign reads "A UNIT OF KALOS HEALTH CARE PVT. LTD.": the client should confirm that wording is acceptable to show.
- Plates and every other figure need a clinician's review before they are shown. Lens artwork labelled monofocal, multifocal or toric in the archive is **not used**: it is AI-looking or manufacturer-style imagery.
- Fallback everywhere: a plain brand card or the existing text layout, never an empty frame (tested in the default build).

## Placement by page (generated from the preview)

The tables below were generated by loading each route in the preview and reading its images: file, subject, people, pixels, authenticity, approval. Plates (SVG) are listed above, not below.

### /

| Where it shows | File | Subject (from the registry, checked against the image) | People | Pixels | Authenticity | Approval |
|---|---|---|---|---|---|---|
| first screen | hospital-reception.webp | The reception area at Namokar Eye & Oculoplasty Centre, with the Namokar logo on the wall behind the desk | staff | 2000x1440 | real Namokar (July 2026 shoot) | pending (Pending: consent of the receptionist, then client sign-off.) |
| first screen | hospital-ot-scope.webp | An operating microscope and equipment in an operation theatre at the centre | none | 2400x1350 | real Namokar (July 2026 shoot) | pending (Pending: client sign-off.) |
| first screen | hospital-chart-door.webp | A wooden examination-room door with an eye-chart screen beside it | none | 1100x1584 | AI concept image (labelled, pending) | pending (Pending: client sign-off.) |
| first screen | hospital-ot-modern-c.webp | An operation theatre from a corner, with shelving, a trolley, the operating table and the microscope | none | 2400x1336 | real Namokar (July 2026 shoot) | pending (Pending: client sign-off.) |
| below the fold | hospital-ot-modern-a.webp | An operation theatre with an operating table, operating microscope, surgical console and a clock panel on the wall | none | 2400x1146 | real Namokar (July 2026 shoot) | pending (Pending: client sign-off.) |
| below the fold | archive-glaucoma-test.webp | A staff member and a patient at a pre-examination eye-testing instrument | staff and patient | 1059x1590 | real Namokar (archive ZIP derivative) | pending (Pending: consent of the staff member and the patient, then c) |
| below the fold | archive-exam-overhead.webp | Dr. Poonam Jain examining a patient at a slit-lamp unit; the patient is seen from behind | doctor and patient | 1600x2400 | real Namokar (archive ZIP derivative) | pending (Pending: Dr. Poonam Jain and the patient shown (consent), th) |
| below the fold | hospital-exterior.webp | video poster (see the video registry) | | | real Namokar footage frame | pending |
| below the fold | hospital-equipment.webp | A surgical console with a touchscreen on a trolley in the operation theatre | none | 1600x900 | real Namokar (July 2026 shoot) | pending (Pending: client sign-off.) |
| below the fold | hospital-ot-entrance.webp | The glass entrance to the operation theatre complex, with a restricted-area sign | none | 2400x1350 | real Namokar (July 2026 shoot) | pending (Pending: client sign-off.) |
| below the fold | walkthrough-poster.webp | An operation theatre at Namokar Eye & Oculoplasty Centre | none | 1920x1080 | real Namokar (July 2026 shoot) | pending (Pending: with the video.) |
| below the fold | video-ot-tour-poster.webp | Shelves and a trolley in the operation theatre area | none | 720x1280 | real Namokar (July 2026 shoot) | pending (Pending: with the video.) |
| below the fold | dr-poonam-jain-portrait.webp | Dr. Poonam Jain in a white coat, standing beside a chair in a consultation room | doctor | 1334x2000 | real Namokar (July 2026 shoot) | pending (Pending: Dr. Poonam Jain's approval, then client sign-off.) |
| below the fold | art-iris-macro.webp | Close-up of a brown iris lit with warm amber light | none | 1920x1072 | AI concept image (labelled, pending) | pending (Pending: client approval of AI artwork.) |

### /about-us

| Where it shows | File | Subject (from the registry, checked against the image) | People | Pixels | Authenticity | Approval |
|---|---|---|---|---|---|---|
| first screen | hospital-reception.webp | The reception area at Namokar Eye & Oculoplasty Centre, with the Namokar logo on the wall behind the desk | staff | 2000x1440 | real Namokar (July 2026 shoot) | pending (Pending: consent of the receptionist, then client sign-off.) |
| first screen | hospital-exterior.webp | video poster (see the video registry) | | | real Namokar footage frame | pending |
| below the fold | archive-doctor-portrait.webp | Portrait of Dr. Poonam Jain in a white coat | doctor | 1200x1200 | real Namokar (archive ZIP derivative) | pending (Pending: Dr. Poonam Jain approves this portrait, then client) |
| below the fold | archive-team-doctor.webp | Dr. Poonam Jain with members of the centre's team in the waiting area | doctor and staff | 1500x1000 | real Namokar (archive ZIP derivative) | pending (Pending: written consent of every person shown, then client ) |
| below the fold | hospital-ot-modern-b.webp | The same operation theatre from the door side, showing the operating table, operating microscope and a console on a stand | none | 2400x1086 | real Namokar (July 2026 shoot) | pending (Pending: client sign-off.) |
| below the fold | hospital-ot-modern-c.webp | An operation theatre from a corner, with shelving, a trolley, the operating table and the microscope | none | 2400x1336 | real Namokar (July 2026 shoot) | pending (Pending: client sign-off.) |
| below the fold | hospital-chart-door.webp | A wooden examination-room door with an eye-chart screen beside it | none | 1100x1584 | AI concept image (labelled, pending) | pending (Pending: client sign-off.) |

### /dr-poonam-jain

| Where it shows | File | Subject (from the registry, checked against the image) | People | Pixels | Authenticity | Approval |
|---|---|---|---|---|---|---|
| first screen | archive-doctor-scrubs.webp | Dr. Poonam Jain smiling, seated at her desk in navy scrubs | doctor | 1306x1800 | real Namokar (archive ZIP derivative) | pending (Pending: Dr. Poonam Jain approves this portrait, then client) |
| below the fold | dr-poonam-jain-slit.webp | Dr. Poonam Jain seated beside a slit-lamp examination unit in a consultation room | doctor | 2400x1600 | real Namokar (July 2026 shoot) | pending (Pending: Dr. Poonam Jain's approval, then client sign-off.) |
| below the fold | dr-poonam-jain-blazer.webp | Dr. Poonam Jain in a grey jacket standing in a consultation room | doctor | 1334x2000 | real Namokar (July 2026 shoot) | pending (Pending: Dr. Poonam Jain's approval, then client sign-off.) |
| below the fold | video-doctor-scrubs-poster.webp | Dr. Poonam Jain in scrubs beside an examination instrument | doctor | 720x1280 | real Namokar (July 2026 shoot) | pending (Pending: with the video.) |

### /our-services

| Where it shows | File | Subject (from the registry, checked against the image) | People | Pixels | Authenticity | Approval |
|---|---|---|---|---|---|---|
| below the fold | hospital-ot-modern-a.webp | An operation theatre with an operating table, operating microscope, surgical console and a clock panel on the wall | none | 2400x1146 | real Namokar (July 2026 shoot) | pending (Pending: client sign-off.) |
| below the fold | archive-glaucoma-test.webp | A staff member and a patient at a pre-examination eye-testing instrument | staff and patient | 1059x1590 | real Namokar (archive ZIP derivative) | pending (Pending: consent of the staff member and the patient, then c) |
| below the fold | archive-exam-overhead.webp | Dr. Poonam Jain examining a patient at a slit-lamp unit; the patient is seen from behind | doctor and patient | 1600x2400 | real Namokar (archive ZIP derivative) | pending (Pending: Dr. Poonam Jain and the patient shown (consent), th) |

### /stitchless-cataract-surgery

| Where it shows | File | Subject (from the registry, checked against the image) | People | Pixels | Authenticity | Approval |
|---|---|---|---|---|---|---|
| first screen | archive-cataract-exam.webp | Dr. Poonam Jain examining a patient at a slit-lamp unit in a consultation room | doctor and patient | 2400x1600 | real Namokar (archive ZIP derivative) | pending (Pending: Dr. Poonam Jain and the patient shown (consent), th) |
| below the fold | hospital-console-wide.webp | A surgical console with a touchscreen beside an operating microscope in an operation theatre | none | 2400x1350 | real Namokar (July 2026 shoot) | pending (Pending: client sign-off.) |
| below the fold | video-post-cataract-exercise-poster.webp | Title frame: Cataract surgery? When can you exercise? | doctor | 720x1280 | real Namokar (July 2026 shoot) | pending (Pending: with the video.) |

### /glaucoma-management

| Where it shows | File | Subject (from the registry, checked against the image) | People | Pixels | Authenticity | Approval |
|---|---|---|---|---|---|---|
| first screen | archive-glaucoma-test.webp | A staff member and a patient at a pre-examination eye-testing instrument | staff and patient | 1059x1590 | real Namokar (archive ZIP derivative) | pending (Pending: consent of the staff member and the patient, then c) |
| below the fold | archive-staff-equipment.webp | A staff member seated beside an eye-testing instrument in an examination room | staff | 1059x1590 | real Namokar (archive ZIP derivative) | pending (Pending: consent of the staff member, then client sign-off.) |

### /comprehensive-eye-examinations

| Where it shows | File | Subject (from the registry, checked against the image) | People | Pixels | Authenticity | Approval |
|---|---|---|---|---|---|---|
| first screen | hospital-chart-door.webp | A wooden examination-room door with an eye-chart screen beside it | none | 1100x1584 | AI concept image (labelled, pending) | pending (Pending: client sign-off.) |
| below the fold | archive-exam-overhead.webp | Dr. Poonam Jain examining a patient at a slit-lamp unit; the patient is seen from behind | doctor and patient | 1600x2400 | real Namokar (archive ZIP derivative) | pending (Pending: Dr. Poonam Jain and the patient shown (consent), th) |

### /eyelid-surgery-blepharoplasty

| Where it shows | File | Subject (from the registry, checked against the image) | People | Pixels | Authenticity | Approval |
|---|---|---|---|---|---|---|
| first screen | hospital-ot-modern-b.webp | The same operation theatre from the door side, showing the operating table, operating microscope and a console on a stand | none | 2400x1086 | real Namokar (July 2026 shoot) | pending (Pending: client sign-off.) |

### /aesthetic-oculofacial

| Where it shows | File | Subject (from the registry, checked against the image) | People | Pixels | Authenticity | Approval |
|---|---|---|---|---|---|---|
| first screen | dr-poonam-jain-desk.webp | Dr. Poonam Jain seated at her consultation desk, with a computer and a slit-lamp unit behind | doctor | 2400x1600 | real Namokar (July 2026 shoot) | pending (Pending: Dr. Poonam Jain's approval, then client sign-off.) |

### /eye-plastic-reconstructive-surgery

| Where it shows | File | Subject (from the registry, checked against the image) | People | Pixels | Authenticity | Approval |
|---|---|---|---|---|---|---|
| first screen | hospital-ot-modern-c.webp | An operation theatre from a corner, with shelving, a trolley, the operating table and the microscope | none | 2400x1336 | real Namokar (July 2026 shoot) | pending (Pending: client sign-off.) |

### /international-patients

| Where it shows | File | Subject (from the registry, checked against the image) | People | Pixels | Authenticity | Approval |
|---|---|---|---|---|---|---|
| below the fold | hospital-exterior.webp | video poster (see the video registry) | | | real Namokar footage frame | pending |
| below the fold | hospital-reception.webp | The reception area at Namokar Eye & Oculoplasty Centre, with the Namokar logo on the wall behind the desk | staff | 2000x1440 | real Namokar (July 2026 shoot) | pending (Pending: consent of the receptionist, then client sign-off.) |

### /contact-us

| Where it shows | File | Subject (from the registry, checked against the image) | People | Pixels | Authenticity | Approval |
|---|---|---|---|---|---|---|
| first screen | hospital-exterior.webp | video poster (see the video registry) | | | real Namokar footage frame | pending |
