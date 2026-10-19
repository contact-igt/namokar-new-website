# Final image placement and source decisions — 20 Oct 2026

The exhaustive route-by-route photograph list remains in `IMAGE_ASSIGNMENT_MATRIX.md`; the approval source of truth is `src/config/assets.ts`. Every photograph below is a pending local-review asset in `private-assets/`, served through `/media/` only when the loopback preview is enabled. No pending image is published by the default build.

| File / source | Resolution / type | Exact current placement | Relevance and decision | Status |
|---|---|---|---|---|
| `archive-glaucoma-test.webp` — archive `Gallery/IMG_0009.JPG`, a compressed web copy | 1059×1590 WebP | Glaucoma hero; home explorer and services index glaucoma visual; fallback for home eye-care hero slide | Authentic staff and patient at an eye-testing instrument. Retained for private review at its existing rendered size; request the camera original before publication. | Pending staff and patient consent, client approval and a better original. |
| `archive-staff-equipment.webp` — archive `Gallery/IMG_0062.JPG`, a compressed web copy | 1059×1590 WebP | Glaucoma secondary editorial image; fallback explorer image | Authentic eye-testing instrument and staff. Retained only behind the media gate; request camera original. | Pending staff consent, client approval and a better original. |
| `archive-team-doctor.webp` — archive `Gallery/IMG_0053.JPG`, a compressed web copy | 1500×1000 WebP | Removed from the About Us gallery in this pass; no active page placement | Authentic team context, but compressed and requiring multiple consents. The About gallery now opens with the real reception image. Request the camera original if the team image is reconsidered. | Pending every person's consent, client approval and a better original. |
| `archive-doctor-portrait.webp` — archive `Doctors/Main_doctor.png` | 1200×1200 WebP | Removed from About Us doctor section in this pass; no active page placement | The registry notes a possibly retouched appearance. About now uses the authentic `dr-poonam-jain-portrait.webp` (1334×2000) in the same meaningful doctor section, still pending approval. Request an unretouched source if the archive portrait is wanted later. | Archive portrait remains pending and unpublished; replacement portrait needs doctor and client approval. |

No higher-resolution close duplicate of these four was found among the 159 archive images or the retained private raw media. `Doctors/Main_doctor-new.jpeg` is the same 1200×1200 composition at heavier compression. None was upscaled, synthesised or silently retouched.

## Original editable artwork

| Source | Format and resolution | Exact placement | Medical relevance and approval |
|---|---|---|---|
| `src/components/clinical/Plates.tsx` — `PlateEyelid`, `PlateAesthetic`, `PlateTear` | Inline SVG, resolution independent; dedicated `full`, `card` and `thumbnail` viewBoxes | Home treatment explorer, Our Services rows, and the corresponding eyelid, aesthetic and reconstructive page introductions | Distinct lid, eye-area and tear-passage drawings. Original code artwork; all three remain pending clinical review in `src/config/figures.ts`. |
| `src/components/clinical/CataractPatterns.tsx` | Inline SVG, resolution independent | Cataract page, “Clear lens and common cataract patterns” | Matched clear/clouded natural lens sections and nuclear, cortical and posterior subcapsular regions. Original code artwork; pending clinical review. |
| `src/components/clinical/LensDesigns.tsx` | Inline SVG, resolution independent | Cataract page, “Understanding replacement lens designs” | Monofocal, multifocal, toric and EDOF concepts. Revised educational wording and EDOF state; pending clinical review. |

The authentic exterior image still shows “A UNIT OF KALOS HEALTH CARE PVT. LTD.” in its sign. It is pending confirmation and was not altered.
