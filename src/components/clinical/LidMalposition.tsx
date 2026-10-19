"use client";

import { useState } from "react";
import { C, EyeBase } from "./EyeBase";
import Segmented from "./Segmented";

type Pos = "typical" | "entropion" | "ectropion";
const COPY: Record<Pos, { title: string; text: string }> = {
  typical: { title: "A typical lower eyelid", text: "The edge of the lid rests against the eye, and the lashes point away from it." },
  entropion: { title: "Entropion: turning inwards", text: "An eyelid that turns inwards, so the lashes rub the eye." },
  ectropion: { title: "Ectropion: turning outwards", text: "An eyelid that turns outwards, away from the eye." },
};

const LID: Record<Pos, { m: [number, number]; lash: [number, number]; into: boolean }> = {
  typical: { m: [240, 304], lash: [-0.75, 0.66], into: false },
  entropion: { m: [256, 314], lash: [0.66, -0.75], into: false },
  ectropion: { m: [212, 332], lash: [-0.74, 0.67], into: true },
};

/** The lower lid in section against the eye (front of the eye at the left). */
function Scene({ pos }: { pos: Pos }) {
  const { m: [mx, my], lash: [lx, ly], into } = LID[pos];
  const body = `M404 376 C ${(404 + mx) / 2 + 30} ${376 + 8} ${mx + 34} ${my + 40} ${mx} ${my}`;
  return (
    <g>
      <EyeBase />
      <path d={body} fill="none" stroke={C.ink} strokeWidth="28" strokeLinecap="round" />
      <path d={body} fill="none" stroke={C.mist} strokeWidth="20" strokeLinecap="round" />
      {into && <path d={`M404 366 C ${(404 + mx) / 2 + 30} ${366 + 8} ${mx + 40} ${my + 34} ${mx + 8} ${my + 6}`} fill="none" stroke={C.orange} strokeWidth="5" strokeLinecap="round" />}
      {[-1, 0, 1].map((i) => (
        <path key={i} d={`M${mx + -ly * i * 8} ${my + lx * i * 8} l${lx * 22} ${ly * 22}`} stroke={C.ink} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      ))}
      {pos === "entropion" && <circle cx={mx + 14} cy={my - 16} r="20" fill="none" stroke={C.orangeDark} strokeWidth="3" strokeDasharray="5 5" />}
    </g>
  );
}

/**
 * Two ways a lid can sit wrongly (entropion and ectropion) beside the typical position, drawn
 * in section. The one-line descriptions are the ones already on the page. Pending medical review
 * (src/config/figures.ts).
 */
export default function LidMalposition() {
  const [p, setP] = useState<Pos>("typical");
  return (
    <div className="clin-grid">
      <div className="clin-stage">
        <svg viewBox="170 120 300 290" className="clin-svg clin-svg--zoom" role="img" aria-label={COPY[p].title}>
          <g key={p} className="clin-fade">
            <Scene pos={p} />
          </g>
        </svg>
      </div>
      <div className="clin-side">
        <Segmented
          label="Eyelid position"
          value={p}
          onChange={setP}
          options={[
            { value: "typical", label: "Typical" },
            { value: "entropion", label: "Turning in" },
            { value: "ectropion", label: "Turning out" },
          ]}
        />
        <div className="clin-panel" aria-live="polite">
          <div key={p} className="clin-swap">
              <h3 className="clin-panel-h">{COPY[p].title}</h3>
              <p>{COPY[p].text}</p>
            </div>
        </div>
      </div>
    </div>
  );
}
