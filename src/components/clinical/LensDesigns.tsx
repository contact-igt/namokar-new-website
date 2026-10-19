"use client";

import { useState } from "react";
import { C } from "./EyeBase";
import Segmented from "./Segmented";

type Design = "distance" | "near" | "astigmatism" | "edof";

const COPY: Record<Design, { tab: string; title: string; text: string }> = {
  distance: {
    tab: "Monofocal",
    title: "One main focal distance",
    text: "A monofocal lens has one main focus, often chosen for distance. Spectacles may still be needed for other distances.",
  },
  near: {
    tab: "Multifocal",
    title: "More than one focal distance",
    text: "A multifocal design distributes light across more than one focus. It can involve visual trade-offs, which need an individual discussion.",
  },
  astigmatism: {
    tab: "Toric",
    title: "Addresses astigmatism",
    text: "A toric lens is designed to address corneal astigmatism. Toric features can be combined with other lens designs.",
  },
  edof: {
    tab: "EDOF",
    title: "An extended range of focus",
    text: "An extended depth of focus design aims to give a continuous range of useful vision. Reading glasses may still be needed.",
  },
};

/** The lens in side view, with two small supporting loops (haptics). */
function Lens({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x} 40 C ${x + 34} 90 ${x + 34} 150 ${x} 200 C ${x - 34} 150 ${x - 34} 90 ${x} 40Z`} fill={C.white} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
      <path d={`M${x} 38 C ${x + 24} 14 ${x + 52} 20 ${x + 54} 44 M${x} 202 C ${x + 24} 226 ${x + 52} 220 ${x + 54} 196`} fill="none" stroke={C.grey} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Rays({ design }: { design: Design }) {
  const stroke = { fill: "none", stroke: C.orange, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (design === "distance") {
    return (
      <g {...stroke}>
        {[70, 120, 170].map((y) => (
          <path key={y} d={`M30 ${y} L226 ${y} L500 120`} />
        ))}
        <circle cx="500" cy="120" r="7" fill={C.orange} stroke="none" />
      </g>
    );
  }
  if (design === "near") {
    return (
      <g {...stroke}>
        {[70, 170].map((y) => (
          <path key={`f${y}`} d={`M30 ${y} L226 ${y} L500 120`} />
        ))}
        {[95, 145].map((y) => (
          <path key={`n${y}`} d={`M30 ${y} L226 ${y} L560 120`} strokeDasharray="1 8" />
        ))}
        <circle cx="500" cy="120" r="7" fill={C.orange} stroke="none" />
        <circle cx="560" cy="120" r="7" fill={C.orange} stroke="none" opacity="0.55" />
      </g>
    );
  }
  if (design === "edof") {
    return (
      <g {...stroke}>
        {[75, 120, 165].map((y) => <path key={y} d={`M30 ${y} L226 ${y} L500 ${120 + (y - 120) * 0.15}`} />)}
        <rect x="492" y="107" width="16" height="26" rx="8" fill={C.orange} stroke="none" opacity="0.45" />
      </g>
    );
  }
  return (
    <g {...stroke}>
      {[70, 170].map((y) => (
        <path key={`v${y}`} d={`M30 ${y} L226 ${y} L500 120`} />
      ))}
      {[100, 140].map((y) => (
        <path key={`h${y}`} d={`M30 ${y} L226 ${y} L500 120`} strokeDasharray="1 8" />
      ))}
      <circle cx="500" cy="120" r="7" fill={C.orange} stroke="none" />
      <path d="M205 70 L247 170 M247 70 L205 170" stroke={C.grey} strokeWidth="2.5" opacity="0.8" />
    </g>
  );
}

/**
 * Four common replacement lens design terms, as simplified focus concepts with a plain
 * description of each. No brand names, no promises. Pending medical review (src/config/figures.ts).
 */
export default function LensDesigns() {
  const [d, setD] = useState<Design>("distance");
  return (
    <div className="clin-grid">
      <div className="clin-stage">
        <svg viewBox="0 0 640 240" className="clin-svg" role="img" aria-label={`Simplified focus illustration for a replacement lens: ${COPY[d].title}`}>
          <rect x="0" y="0" width="640" height="240" fill={C.porcelain} />
          <Lens x={226} />
          <line x1="500" y1="40" x2="500" y2="200" stroke={C.orangeDark} strokeWidth="5" strokeLinecap="round" opacity="0.5" />
          <text x="500" y="226" textAnchor="middle" fontSize="22" fontWeight="600" fontFamily="Inter, system-ui, sans-serif" fill={C.soft}>
            Retina
          </text>
          <g key={d} className="clin-fade">
            <Rays design={d} />
          </g>
        </svg>
      </div>
      <div className="clin-side">
        <Segmented
          label="Lens design"
          value={d}
          onChange={setD}
          options={(Object.keys(COPY) as Design[]).map((k) => ({ value: k, label: COPY[k].tab }))}
        />
        <div className="clin-panel" aria-live="polite">
          <div key={d} className="clin-swap">
              <h3 className="clin-panel-h">{COPY[d].title}</h3>
              <p>{COPY[d].text}</p>
            </div>
          <p className="clin-fine">
            Which design, if any, suits you depends on your eyes, your daily activities and your
            expectations. These simplified diagrams do not predict your vision. No lens can promise
            that you will never need spectacles.
          </p>
        </div>
      </div>
    </div>
  );
}
