import { type Asset, ASSETS, srcOf, usable } from "@/config/assets";
import { figureUsable } from "@/config/figures";
import { type ServiceKey, SERVICES } from "@/config/site";
import type { PlateName } from "@/components/clinical/Plates";

/**
 * The six treatments as the homepage "Find care" explorer and the services index show them.
 * Titles, routes and summaries are the site's existing service entries (src/config/site.ts), so
 * nothing new is claimed. Each treatment names what best pictures it, in order of preference:
 * photographs of the centre (the first one cleared for use is shown, so approving or withholding
 * a photograph never breaks the layout) and, where the centre has no suitable photograph, one of
 * the site's own line-drawing plates (also pending review). With neither cleared the explorer
 * shows a plain brand card. Doctor portraits are deliberately NOT used here: they belong in the
 * doctor introduction and on the doctor's profile unless a cleared clinician photograph provides
 * the most truthful human context for a treatment. Captions describe what a picture SHOWS, never
 * a procedure or an outcome.
 */
type Candidate =
  | { asset: Asset; position: string }
  | {
      image: { src: string; alt: string; width: number; height: number; sourceLabel?: string };
      position: string;
    };

const IMAGES: Record<ServiceKey, Candidate[]> = {
  cataract: [
    { asset: ASSETS.homeTheatreNov, position: "50% 50%" },
    { asset: ASSETS.otModernA, position: "55% 50%" },
    { asset: ASSETS.otModernB, position: "55% 55%" },
  ],
  glaucoma: [
    {
      image: {
        src: "/images/Copy of DSC06976.JPG",
        alt: "Eye examination equipment and clinician in a treatment room",
        width: 6000,
        height: 4000,
      },
      position: "50% 50%",
    },
    { asset: ASSETS.archGlaucomaTest, position: "50% 58%" },
    { asset: ASSETS.archStaffEquipment, position: "50% 45%" },
  ],
  exams: [
    {
      image: {
        src: "/images/Copy of DSC06884.JPG",
        alt: "Comprehensive eye examination at a slit-lamp instrument",
        width: 6000,
        height: 4000,
      },
      position: "50% 50%",
    },
    { asset: ASSETS.chartDoor, position: "50% 40%" },
  ],
  eyelid: [
    { asset: ASSETS.homeDoctorNov, position: "50% 50%" },
    { asset: ASSETS.docSlit, position: "52% 50%" },
  ],
  aesthetic: [
    { asset: ASSETS.docSlit, position: "52% 50%" },
  ],
  reconstructive: [
    { asset: ASSETS.archCataractExam, position: "55% 50%" },
    { asset: ASSETS.docSlit, position: "52% 50%" },
  ],
};

const PLATES: Partial<Record<ServiceKey, { name: PlateName; figure: "plateEyelid" | "plateAesthetic" | "plateTear" }>> = {
  eyelid: { name: "eyelid", figure: "plateEyelid" },
  aesthetic: { name: "aesthetic", figure: "plateAesthetic" },
  reconstructive: { name: "tear", figure: "plateTear" },
};

export type TreatmentItem = {
  id: ServiceKey;
  title: string;
  short: string;
  href: string;
  summary: string;
  image: { src: string; alt: string; width: number; height: number; position: string; sourceLabel?: string } | null;
  /** A line-drawing plate, used only when there is no photograph and the plate is cleared. */
  plate: PlateName | null;
};

export function treatmentItems(): TreatmentItem[] {
  return SERVICES.map((s) => {
    const c = IMAGES[s.key].find((x) => "image" in x || usable(x.asset));
    const p = PLATES[s.key];
    return {
      id: s.key,
      title: s.title,
      short: s.short,
      href: s.href,
      summary: s.blurb,
      image: c
        ? "image" in c
          ? { ...c.image, position: c.position }
          : { src: srcOf(c.asset), alt: c.asset.alt, width: c.asset.width, height: c.asset.height, position: c.position }
        : null,
      plate: !c && p && figureUsable(p.figure) ? p.name : null,
    };
  });
}
