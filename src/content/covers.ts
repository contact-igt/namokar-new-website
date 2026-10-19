import type { Asset } from "@/config/assets";
import { ASSETS } from "@/config/assets";
import type { ServiceKey } from "@/config/site";

/**
 * Photographs for each service, chosen from what is actually available. Captions describe
 * what the photograph SHOWS (a room, a piece of equipment), never what was done there, and
 * none suggests an actual patient, procedure or result. Where a service has no
 * directly relevant photograph the picture is a neutral view of the centre.
 * All assets are pending approval: see src/config/assets.ts.
 */
export type Cover = {
  asset: Asset;
  caption: string;
  position: string;
};

export const COVERS: Record<ServiceKey, { primary: Cover; secondary?: Cover }> = {
  cataract: {
    primary: { asset: ASSETS.otModernA, caption: "An operation theatre at the centre, with an operating microscope and a surgical console.", position: "55% 50%" },
    secondary: { asset: ASSETS.otModernB, caption: "The theatre seen from the door.", position: "55% 55%" },
  },
  glaucoma: {
    primary: { asset: ASSETS.docDesk, caption: "A consultation desk at the centre.", position: "35% 40%" },
    secondary: { asset: ASSETS.chartDoor, caption: "An eye-chart screen beside an examination room door.", position: "50% 40%" },
  },
  exams: {
    primary: { asset: ASSETS.docSlit, caption: "A slit-lamp examination unit in a consultation room.", position: "55% 45%" },
    secondary: { asset: ASSETS.chartDoor, caption: "An eye-chart screen beside an examination room door.", position: "50% 40%" },
  },
  eyelid: {
    primary: { asset: ASSETS.docStanding, caption: "A consultation room at the centre.", position: "50% 40%" },
    secondary: { asset: ASSETS.docBlazer, caption: "Dr. Poonam Jain in her consultation room.", position: "50% 30%" },
  },
  aesthetic: {
    primary: { asset: ASSETS.reception, caption: "Reception at the centre.", position: "42% 50%" },
    secondary: { asset: ASSETS.docBlazer, caption: "Dr. Poonam Jain in her consultation room.", position: "50% 30%" },
  },
  reconstructive: {
    primary: { asset: ASSETS.otModernC, caption: "An operation theatre at the centre.", position: "50% 55%" },
    secondary: { asset: ASSETS.otEntrance, caption: "The entrance to the operation theatre complex.", position: "50% 50%" },
  },
};
