"use client";

import { type CSSProperties, useState } from "react";
import Scene from "./Scene";
import Segmented from "./Segmented";

type Stage = "typical" | "early" | "advanced";
const R: Record<Stage, string> = { typical: "110%", early: "72%", advanced: "34%" };
const COPY: Record<Stage, string> = {
  typical: "The whole scene is in view, including its edges.",
  early: "The outer edges begin to fade. Because the centre stays clear, this is often not noticed at first.",
  advanced: "Much of the side vision has gone and the view narrows towards the centre.",
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
          label="Side vision over time"
          value={stage}
          onChange={setStage}
          options={[
            { value: "typical", label: "Typical view" },
            { value: "early", label: "Early narrowing" },
            { value: "advanced", label: "Advanced narrowing" },
          ]}
        />
        <p className="clin-cue" aria-live="polite">{COPY[stage]}</p>
        <p className="clin-fine">
          Vision lost to glaucoma does not come back, and early on most people notice nothing.
          Regular examination is how it is found, and how any change is caught.
        </p>
      </div>
    </div>
  );
}
