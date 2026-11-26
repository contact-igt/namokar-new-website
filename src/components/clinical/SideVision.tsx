"use client";

import { type CSSProperties, useState } from "react";
import Scene from "./Scene";
import Segmented from "./Segmented";

type Stage = "typical" | "early" | "advanced";
const R: Record<Stage, string> = { typical: "110%", early: "72%", advanced: "34%" };
const COPY: Record<Stage, string> = {
  typical: "The surrounding scene is visible across a broad field of vision.",
  early: "This view illustrates reduced sensitivity in part of the visual field. Early changes can go unnoticed.",
  advanced: "This view illustrates how extensive peripheral vision loss can leave a narrower area of useful vision.",
};

/**
 * An illustration of how glaucoma can narrow side vision gradually. It supports the page's
 * point that early changes often go unnoticed and that regular examinations matter. General,
 * not a test and not a prediction. Pending medical review (src/config/figures.ts).
 */
export default function SideVision() {
  const [stage, setStage] = useState<Stage>("typical");
  return (
    <div className="clin-compare">
      <div className="sv-stage" style={{ "--sv-r": R[stage] } as CSSProperties}>
        <Scene />
        <span className="sv-vig" aria-hidden="true" />
      </div>
      <div className="clin-row">
        <Segmented
          label="Simulated visual field changes"
          value={stage}
          onChange={setStage}
          options={[
            { value: "typical", label: "Typical Vision" },
            { value: "early", label: "Early Visual Field Changes" },
            { value: "advanced", label: "Advanced Visual Field Loss" },
          ]}
        />
        <p className="clin-cue" aria-live="polite">{COPY[stage]}</p>
      </div>
    </div>
  );
}
