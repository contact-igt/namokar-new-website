import { type Asset, ASSETS, srcOf, usable } from "@/config/assets";
import { type ServiceKey, SERVICES } from "@/config/site";

/**
 * The six treatments as the homepage "Find care" explorer shows them. Titles, routes and summaries
 * are the site's existing service entries (src/config/site.ts), so nothing new is claimed. Each
 * treatment lists photograph candidates in order of preference; the first one that is cleared for
 * use is shown (so approving or withholding a photograph never breaks the layout), and with none
 * the explorer shows a plain brand card instead of a picture. Captions describe what a photograph
 * SHOWS, never a procedure or an outcome.
 */
type Candidate = { asset: Asset; position: string };

const IMAGES: Record<ServiceKey, Candidate[]> = {
  cataract: [
    { asset: ASSETS.otModernA, position: "55% 50%" },
    { asset: ASSETS.otModernB, position: "55% 55%" },
  ],
  glaucoma: [
    { asset: ASSETS.docSlit, position: "58% 45%" },
    { asset: ASSETS.docDesk, position: "35% 40%" },
  ],
  exams: [
    { asset: ASSETS.chartDoor, position: "50% 40%" },
    { asset: ASSETS.consultation, position: "58% 40%" },
  ],
  eyelid: [
    { asset: ASSETS.docStanding, position: "50% 38%" },
    { asset: ASSETS.docBlazer, position: "50% 30%" },
  ],
  aesthetic: [
    { asset: ASSETS.docBlazer, position: "50% 28%" },
    { asset: ASSETS.reception, position: "42% 50%" },
  ],
  reconstructive: [
    { asset: ASSETS.otModernC, position: "50% 55%" },
    { asset: ASSETS.otEntrance, position: "50% 50%" },
  ],
};

export type TreatmentItem = {
  id: ServiceKey;
  title: string;
  short: string;
  href: string;
  summary: string;
  image: { src: string; alt: string; width: number; height: number; position: string } | null;
};

export function treatmentItems(): TreatmentItem[] {
  return SERVICES.map((s) => {
    const c = IMAGES[s.key].find((x) => usable(x.asset));
    return {
      id: s.key,
      title: s.title,
      short: s.short,
      href: s.href,
      summary: s.blurb,
      image: c
        ? { src: srcOf(c.asset), alt: c.asset.alt, width: c.asset.width, height: c.asset.height, position: c.position }
        : null,
    };
  });
}
