import type { Asset } from "@/config/assets";
import { ASSETS } from "@/config/assets";
import type { PlateName } from "@/components/clinical/Plates";
import type { ServiceKey } from "@/config/site";

/**
 * Pictures for each service page, chosen from what is actually available and spread so that no
 * two treatment pages open on the same photograph and doctor portraits are not the default.
 * The hero is a photograph of the centre that fits the topic (an examination in progress, a
 * diagnostic instrument, an eye chart, an operation theatre); the second picture is a different
 * photograph or one of the site's own line-drawing plates (Plates.tsx). Dr. Poonam Jain appears
 * only where the topic is her consultation (the aesthetic page) or in an examination being carried
 * out; her portraits live on the home, about and profile pages. Captions describe what a picture
 * SHOWS (a room, an instrument), never what was done there, and none suggests a patient outcome.
 * All assets are pending approval: see src/config/assets.ts and src/config/figures.ts.
 */
export type Cover = {
  asset: Asset;
  caption: string;
  position: string;
};

export type PlateCover = { plate: PlateName; figure: "plateEyelid" | "plateAesthetic" | "plateTear"; caption: string };

export const COVERS: Record<ServiceKey, { primary: Cover; secondary?: Cover; plate?: PlateCover }> = {
  cataract: {
    primary: { asset: ASSETS.archCataractExam, caption: "A slit-lamp examination in a consultation room at the centre.", position: "50% 45%" },
    secondary: { asset: ASSETS.consoleWide, caption: "A surgical console in the theatre area at the centre.", position: "50% 50%" },
  },
  glaucoma: {
    primary: { asset: ASSETS.archExamOverhead, caption: "A slit-lamp eye examination at the centre.", position: "50% 60%" },
    secondary: { asset: ASSETS.archGlaucomaTest, caption: "A pre-examination eye test at the centre.", position: "50% 55%" },
  },
  exams: {
    primary: { asset: ASSETS.chartDoor, caption: "An eye-chart screen beside an examination room door.", position: "50% 42%" },
    secondary: { asset: ASSETS.archStaffEquipment, caption: "An eye-testing instrument in an examination room.", position: "50% 40%" },
  },
  eyelid: {
    primary: { asset: ASSETS.otModernB, caption: "An operation theatre at the centre.", position: "55% 55%" },
    plate: { plate: "eyelid", figure: "plateEyelid", caption: "The brow, the crease of the upper eyelid and the eyelid margin. A drawing, not a result." },
  },
  aesthetic: {
    primary: { asset: ASSETS.docDesk, caption: "Personalized aesthetic oculoplasty care begins with a comprehensive eye-area assessment.", position: "38% 40%" },
    secondary: { asset: ASSETS.aestheticOverviewAi, caption: "Aesthetic oculoplasty care is explained through a personalized eye-area consultation.", position: "50% 50%" },
  },
  reconstructive: {
    primary: { asset: ASSETS.otModernC, caption: "An operation theatre at the centre.", position: "50% 55%" },
    plate: { plate: "tear", figure: "plateTear", caption: "The tear passages: the small openings, the canals, the sac and the duct. A drawing." },
  },
};
