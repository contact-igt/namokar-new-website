"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { InteractiveKey } from "@/config/figures";

/**
 * Maps a figure id to its component, each loaded as its own code-split chunk on the client, so a
 * page that shows one figure does not carry the code of the others. Server-rendered as usual
 * (the figure's markup is in the page HTML) and hydrated when its chunk arrives.
 */
const FIGURES: Record<InteractiveKey, ComponentType> = {
  eyeAnatomy: dynamic(() => import("./EyeDiagram")),
  cataractPatterns: dynamic(() => import("./CataractPatterns")),
  eyeCompare: dynamic(() => import("./EyeCompare")),
  lensCompare: dynamic(() => import("./LensCompare")),
  lensDesigns: dynamic(() => import("./LensDesigns")),
  cataractSteps: dynamic(() => import("./CataractSteps")),
  glaucomaFlow: dynamic(() => import("./GlaucomaFlow")),
  sideVision: dynamic(() => import("./SideVision")),
  examParts: dynamic(() => import("./ExamParts")),
  eyelidPosition: dynamic(() => import("./EyelidPosition")),
  tearPathway: dynamic(() => import("./TearPathway")),
  lidMalposition: dynamic(() => import("./LidMalposition")),
  consultationQuestions: dynamic(() => import("./ConsultationQuestions")),
};

export default function FigureHost({ id }: { id: InteractiveKey }) {
  const Figure = FIGURES[id];
  return <Figure />;
}
