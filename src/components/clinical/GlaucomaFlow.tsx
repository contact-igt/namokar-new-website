"use client";

import { useState } from "react";
import { C, EyeBase } from "./EyeBase";
import Segmented from "./Segmented";

type State = "normal" | "slowed";

const TEXT: Record<State, { title: string; text: string }> = {
  normal: {
    title: "Fluid drains as it is made",
    text: "The inside of the front of the eye is kept in balance. A clear fluid is made continuously, flows through the pupil, and drains away at the angle where the iris meets the cornea. The pressure inside the eye stays within a healthy range.",
  },
  slowed: {
    title: "Drainage slows, and pressure can rise",
    text: "In many people with glaucoma, the fluid drains too slowly and the pressure inside the eye rises. Over time, raised pressure can damage the optic nerve. Some people develop glaucoma with pressure in the usual range, so only an examination can say.",
  },
};

/**
 * How the clear fluid at the front of the eye is made and drains, and one common way pressure
 * can rise. Wording stays general; the page also says glaucoma can occur at normal pressure.
 * Pending medical review (src/config/figures.ts).
 */
export default function GlaucomaFlow() {
  const [s, setS] = useState<State>("normal");
  const slowed = s === "slowed";
  const fade = (on: boolean, hi = 1, lo = 0) => ({ opacity: on ? hi : lo, transition: "opacity 450ms var(--ease)" });

  return (
    <div className="clin-grid">
      <div className="clin-stage">
        <svg viewBox="170 50 420 310" className="clin-svg" role="img" aria-label={`Cross-section of the eye showing fluid made at the front and draining. State: ${TEXT[s].title}.`}>
          <EyeBase focus={slowed ? ["cornea", "iris", "lens", "nerve"] : ["cornea", "iris", "lens"]}>
            {/* upper and lower flow: made near the lens, through the pupil, out at the angle */}
            {[1, -1].map((k) => (
              <g key={k} transform={k === 1 ? undefined : "translate(0 400) scale(1 -1)"} fill="none" stroke={C.ink} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M282 134 C 286 156 278 176 262 186 L 240 190" strokeDasharray="1 8" />
                <path d="M240 190 L 232 196 M240 190 L 234 182" />
                <path d="M238 176 C 232 156 238 138 248 126" style={fade(!slowed, 1, 0.18)} />
                <path d="M248 126 L 241 133 M248 126 L 250 136" style={fade(!slowed, 1, 0.18)} />
                {/* the drainage angle, narrowed when slowed */}
                <rect x="243" y="108" width="14" height="10" rx="2" stroke="none" fill={C.orangeDark} style={fade(slowed, 1, 0.35)} />
              </g>
            ))}
            {/* fluid backing up in the front of the eye */}
            <ellipse cx="248" cy="200" rx="9" ry="30" fill={C.orange} style={fade(slowed, 0.28, 0)} />
            {/* the optic nerve, outlined when pressure is raised */}
            <rect x="478" y="182" width="94" height="38" rx="10" fill="none" stroke={C.orangeDark} strokeWidth="3" strokeDasharray="6 6" style={fade(slowed)} />
          </EyeBase>
        </svg>
        <div className="meter" role="img" aria-label={`Pressure inside the eye: ${slowed ? "raised" : "within the usual range"}`}>
          <span className="meter-label">Pressure inside the eye</span>
          <span className="meter-track">
            <span className="meter-fill" style={{ transform: `scaleX(${slowed ? 0.88 : 0.4})` }} />
          </span>
        </div>
      </div>
      <div className="clin-side">
        <Segmented
          label="Drainage"
          value={s}
          onChange={setS}
          options={[
            { value: "normal", label: "Drains normally" },
            { value: "slowed", label: "Drainage slowed" },
          ]}
        />
        <div className="clin-panel" aria-live="polite">
          <div key={s} className="clin-swap">
              <h3 className="clin-panel-h">{TEXT[s].title}</h3>
              <p>{TEXT[s].text}</p>
            </div>
        </div>
      </div>
    </div>
  );
}
