"use client";

import { useState } from "react";
import { C, EyeBase, type EyePart, Marker, PART_MARK, PART_ORDER, PART_TEXT } from "./EyeBase";
import Segmented from "./Segmented";

const RAYS_CLEAR = ["M110 140 L205 168 L300 192 L486 200", "M110 200 L486 200", "M110 260 L205 232 L300 208 L486 200"];
const RAYS_SCATTER = ["M110 140 L205 168 L300 192 L480 150", "M110 200 L300 200 L486 214", "M110 260 L205 232 L300 208 L480 252"];

/**
 * Interactive cross-section of the eye. Choose a part (a button below, or a numbered marker) to
 * read what it does; switch the lens between healthy and clouded to see how light is affected.
 * A conceptual illustration for general understanding. Pending medical review (see
 * src/config/figures.ts), so it only renders in the local review preview until signed off.
 */
export default function EyeDiagram() {
  const [part, setPart] = useState<EyePart>("lens");
  const [cataract, setCataract] = useState(false);
  const info = PART_TEXT[part];

  return (
    <div className="clin-grid">
      <div className="clin-stage">
        <svg viewBox="100 40 500 330" className="clin-svg" role="img" aria-label={`Cross-section of an eye, with the ${cataract ? "clouded" : "healthy"} lens shown. Use the buttons below to learn about each part.`}>
          <EyeBase cloud={cataract ? 1 : 0}>
            {PART_ORDER.map((p, i) => (
              <g key={p} onClick={() => setPart(p)} style={{ cursor: "pointer" }}>
                <Marker n={i + 1} x={PART_MARK[p].at[0]} y={PART_MARK[p].at[1]} to={PART_MARK[p].to} on={p === part} />
              </g>
            ))}
          </EyeBase>
          {/* light entering from the left */}
          <g style={{ opacity: cataract ? 0 : 1, transition: "opacity 300ms var(--ease)" }} fill="none" stroke={C.orange} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {RAYS_CLEAR.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <g style={{ opacity: cataract ? 0.85 : 0, transition: "opacity 300ms var(--ease)" }} fill="none" stroke={C.orange} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 7">
            {RAYS_SCATTER.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <text x="110" y="176" fontSize="19" fontWeight="600" fontFamily="Inter, system-ui, sans-serif" fill={C.soft}>
            Light
          </text>
        </svg>
        <p className="clin-cue" aria-live="polite">
          {cataract
            ? "With a clouded lens, light is scattered, so it does not focus as sharply on the retina."
            : "With a clear lens, light focuses at one point on the retina."}
        </p>
      </div>

      <div className="clin-side">
        <Segmented
          label="Lens"
          value={cataract ? "cataract" : "healthy"}
          onChange={(v) => setCataract(v === "cataract")}
          options={[
            { value: "healthy", label: "Healthy lens" },
            { value: "cataract", label: "Clouded lens (cataract)" },
          ]}
        />
        <ul className="clin-parts" aria-label="Parts of the eye">
          {PART_ORDER.map((p, i) => (
            <li key={p}>
              <button type="button" className="clin-part" aria-pressed={p === part} onClick={() => setPart(p)}>
                <span className="clin-part-n" aria-hidden="true">{i + 1}</span>
                {PART_TEXT[p].name}
              </button>
            </li>
          ))}
        </ul>
        <div className="clin-panel" aria-live="polite">
          <div key={part} className="clin-swap">
              <h3 className="clin-panel-h">{info.name}</h3>
              <p>{info.text}</p>
            </div>
        </div>
      </div>
    </div>
  );
}
