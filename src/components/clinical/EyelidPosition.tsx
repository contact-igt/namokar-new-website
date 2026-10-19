"use client";

import { useState } from "react";
import { C } from "./EyeBase";
import Segmented from "./Segmented";

type Pos = "typical" | "ptosis" | "excess";
const COPY: Record<Pos, { title: string; text: string }> = {
  typical: { title: "A typical upper eyelid", text: "The edge of the upper lid sits near the top of the coloured part of the eye, and the whole pupil is clear." },
  ptosis: { title: "A drooping eyelid (ptosis)", text: "Ptosis means the upper eyelid sits lower than normal. It can sometimes affect vision, and an examination is needed to find the cause." },
  excess: { title: "Excess skin on the upper lid", text: "Extra skin can hang over the lid edge and rest on the eyelashes, and sometimes blocks part of the view. Some people also find it makes the eyes feel heavy or tired." },
};

const OPEN = "M170 175 Q320 61 470 175 Q320 255 170 175Z";

/** The eye opening, iris and pupil, shared by the three states. */
function Eye({ children }: { children: React.ReactNode }) {
  return (
    <g>
      <clipPath id="eyelid-open"><path d={OPEN} /></clipPath>
      <path d={OPEN} fill={C.white} />
      <g clipPath="url(#eyelid-open)">
        <circle cx="320" cy="168" r="54" fill={C.grey} />
        <circle cx="320" cy="168" r="22" fill={C.ink} />
        <circle cx="308" cy="156" r="6" fill={C.white} opacity="0.85" />
      </g>
      {children}
    </g>
  );
}

const lid = (c: number) => `M170 175 Q320 ${c} 470 175 L475 140 Q320 ${c - 66} 165 140Z`;
const margin = (c: number) => `M170 175 Q320 ${c} 470 175`;

function Lid({ c }: { c: number }) {
  return (
    <g>
      <path d={lid(c)} fill={C.mist} />
      <path d={`M165 140 Q320 ${c - 66} 475 140`} fill="none" stroke={C.grey} strokeWidth="2.5" strokeLinecap="round" />
      <path d={margin(c)} fill="none" stroke={C.ink} strokeWidth="5" strokeLinecap="round" />
      {[200, 235, 270, 305, 340, 375, 410, 445].map((x) => {
        const t = (x - 170) / 300;
        const y = (1 - t) ** 2 * 175 + 2 * (1 - t) * t * c + t * t * 175;
        return <path key={x} d={`M${x} ${y.toFixed(1)} l${((x - 320) / 320) * 7} -11`} stroke={C.ink} strokeWidth="3" strokeLinecap="round" fill="none" />;
      })}
    </g>
  );
}

/**
 * Three schematics of the upper eyelid: typical, drooping (ptosis) and excess skin. They echo the
 * page's own definitions and are not a way to diagnose anything. Pending medical review
 * (src/config/figures.ts).
 */
export default function EyelidPosition() {
  const [p, setP] = useState<Pos>("typical");
  return (
    <div className="clin-grid">
      <div className="clin-stage">
        <svg viewBox="130 40 380 240" className="clin-svg" role="img" aria-label={COPY[p].title}>
          <Eye>
            <g key={p} className="clin-fade">
                {p === "typical" && <Lid c={61} />}
                {p === "ptosis" && <Lid c={117} />}
                {p === "excess" && (
                  <g>
                    <Lid c={61} />
                    <path d="M300 112 Q410 100 470 175 L470 138 Q420 118 300 112Z" fill="#F4D2B3" stroke={C.orangeDark} strokeWidth="2.5" strokeDasharray="6 5" />
                    <path d="M300 112 Q410 112 470 175" fill="none" stroke={C.orangeDark} strokeWidth="3" />
                  </g>
                )}
              </g>
          </Eye>
        </svg>
      </div>
      <div className="clin-side">
        <Segmented
          label="Eyelid position"
          value={p}
          onChange={setP}
          options={[
            { value: "typical", label: "Typical" },
            { value: "ptosis", label: "Drooping" },
            { value: "excess", label: "Excess skin" },
          ]}
        />
        <div className="clin-panel" aria-live="polite">
          <div key={p} className="clin-swap">
              <h3 className="clin-panel-h">{COPY[p].title}</h3>
              <p>{COPY[p].text}</p>
            </div>
          <p className="clin-fine">Drooping and excess skin can look alike. An examination is needed to tell them apart and to decide whether treatment is suitable.</p>
        </div>
      </div>
    </div>
  );
}
