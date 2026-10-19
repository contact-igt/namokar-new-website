import { ASSET_PREVIEW } from "./assets";

/**
 * Registry of every clinical illustration and interactive explainer (the diagrams, lens
 * comparisons and step-by-step animations). It follows the same workflow as the photograph
 * registry in assets.ts:
 *
 *  - `approved: false` means a clinician has NOT signed the figure off. It is not rendered in
 *    a normal build, in development or in production; the page keeps its plain text.
 *  - With the server variable ASSET_PREVIEW=on (local review only, never production) pending
 *    figures render with a visible "Preview only: pending medical review" tag.
 *  - Do not set `approved: true` without the named reviewer's written sign-off recorded in
 *    docs/NAMOKAR_CONTENT_VERIFICATION.md and in `reviewer` below.
 *
 * Every figure here is an ORIGINAL VECTOR illustration drawn in code for this site
 * (src/components/clinical). No AI image generation, no stock art, no photographs of people,
 * patients, results or facilities. Provenance: docs/immersive/FIGURE_PROVENANCE.md.
 */
export type Figure = {
  title: string;
  /** Which page it appears on. */
  page: string;
  approved: boolean;
  /** Name, registration number and date of the clinician who signed it off, once they have. */
  reviewer: { name: string; registration: string; date: string } | null;
  /** What the reviewer is being asked to check. */
  check: string;
};

export const FIGURES = {
  eyeAnatomy: {
    title: "Eye cross-section with a healthy and a clouded lens",
    page: "Cataract Surgery",
    approved: false,
    reviewer: null,
    check: "Labels, proportions and plain-language definitions of cornea, iris, pupil, lens, retina and optic nerve.",
  },
  lensCompare: {
    title: "Clear and clouded lens: an illustration of how vision can look",
    page: "Cataract Surgery",
    approved: false,
    reviewer: null,
    check: "That the blur, fading and glare simulation is a fair, non-alarming illustration and carries the right caveat.",
  },
  lensDesigns: {
    title: "Replacement lens designs (distance, distance and near, astigmatism)",
    page: "Cataract Surgery",
    approved: false,
    reviewer: null,
    check: "That the three design descriptions are accurate and promise no outcome.",
  },
  cataractSteps: {
    title: "Cataract surgery: a general outline in four steps",
    page: "Cataract Surgery",
    approved: false,
    reviewer: null,
    check: "Order and wording of the four steps, and that nothing implies a particular technique, duration or result.",
  },
  glaucomaFlow: {
    title: "How fluid drains from the eye, and how pressure can rise",
    page: "Glaucoma Management",
    approved: false,
    reviewer: null,
    check: "Anatomy of the fluid pathway and the wording about raised pressure and the optic nerve.",
  },
  sideVision: {
    title: "How glaucoma can narrow side vision over time",
    page: "Glaucoma Management",
    approved: false,
    reviewer: null,
    check: "That the narrowing illustration is appropriate, not alarming, and clearly general.",
  },
  examParts: {
    title: "Parts of the eye looked at in an examination",
    page: "Comprehensive Eye Examinations",
    approved: false,
    reviewer: null,
    check: "That each examination step is paired with the right part of the eye.",
  },
  eyelidPosition: {
    title: "Upper eyelid position: typical, drooping, and excess skin",
    page: "Eyelid Surgery (Blepharoplasty)",
    approved: false,
    reviewer: null,
    check: "That the three schematics describe ptosis and excess skin correctly and are not diagnostic.",
  },
  tearPathway: {
    title: "How tears drain, and what a blockage can mean",
    page: "Reconstructive Oculoplasty",
    approved: false,
    reviewer: null,
    check: "Anatomy of the tear drainage system and the wording about blockage and watering.",
  },
  lidMalposition: {
    title: "Eyelid turning inwards (entropion) and outwards (ectropion)",
    page: "Reconstructive Oculoplasty",
    approved: false,
    reviewer: null,
    check: "That both schematics and their one-line descriptions are correct.",
  },
  consultationQuestions: {
    title: "Questions worth asking at any consultation (checklist)",
    page: "Aesthetic Oculoplasty",
    approved: false,
    reviewer: null,
    check: "That the questions are appropriate; this one carries no clinical diagram.",
  },
} as const satisfies Record<string, Figure>;

export type FigureKey = keyof typeof FIGURES;

/** May this figure render right now? */
export const figureUsable = (key: FigureKey): boolean => FIGURES[key].approved || ASSET_PREVIEW;

/** Rendered only because the local review preview is on. */
export const figurePreviewOnly = (key: FigureKey): boolean => !FIGURES[key].approved && ASSET_PREVIEW;
