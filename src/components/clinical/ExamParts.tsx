"use client";

import { useState } from "react";
import { C, EyeBase, type EyePart } from "./EyeBase";
import PartList from "./PartList";

type Step = "see" | "specs" | "pressure" | "front" | "back";

const STEPS: { id: Step; name: string; title: string; text: string; focus: EyePart[] }[] = [
  { id: "see", name: "How well you see", title: "How well you see", text: "Your vision is checked with and without spectacles.", focus: [] },
  { id: "specs", name: "Spectacle needs", title: "Spectacle needs", text: "Your eyes are tested to see whether glasses would help, or whether your prescription has changed.", focus: ["cornea", "lens"] },
  { id: "pressure", name: "Eye pressure", title: "Eye pressure", text: "The pressure inside the eye may be measured, as part of looking for conditions such as glaucoma.", focus: ["cornea", "vitreous"] },
  { id: "front", name: "The front of the eye", title: "The front of the eye", text: "The eyelids, the surface of the eye and the lens are examined.", focus: ["cornea", "iris", "pupil", "lens"] },
  { id: "back", name: "The back of the eye", title: "The back of the eye", text: "The retina and the optic nerve are looked at, sometimes after drops that widen the pupil.", focus: ["retina", "nerve", "vitreous"] },
];

/** A plain letter chart: rows get smaller, as on a vision chart. */
function Chart() {
  const rows: [string, number][] = [["E", 46], ["F P", 36], ["T O Z", 28], ["L P E D", 22], ["P E C F D", 17]];
  let y = 70;
  return (
    <g>
      <rect x="270" y="40" width="190" height="290" rx="8" fill={C.white} stroke={C.ink} strokeWidth="4" />
      {rows.map(([t, size]) => {
        y += size + 14;
        return (
          <text key={t} x="365" y={y} textAnchor="middle" fontSize={size} fontWeight="700" fontFamily="Inter, system-ui, sans-serif" fill={C.ink} letterSpacing="0.12em">
            {t}
          </text>
        );
      })}
    </g>
  );
}

/**
 * Which part of the eye each step of an eye examination looks at. The five steps and their
 * wording are the ones already on the page ("What an examination may include"), and the page's
 * note that tests are chosen by the doctor applies. Pending medical review (src/config/figures.ts).
 */
export default function ExamParts() {
  const [id, setId] = useState<Step>("front");
  const step = STEPS.find((s) => s.id === id)!;
  return (
    <div className="clin-grid">
      <div className="clin-stage">
        <svg viewBox="100 40 500 330" className="clin-svg" role="img" aria-label={`Examination step: ${step.title}`}>
          <g key={id === "see" ? "chart" : "eye"} className="clin-fade">
              {id === "see" ? <Chart /> : <EyeBase focus={step.focus} />}
            </g>
        </svg>
      </div>
      <div className="clin-side">
        <PartList label="Examination steps" items={STEPS.map((s) => ({ id: s.id, name: s.name }))} value={id} onChange={setId} />
        <div className="clin-panel" aria-live="polite">
          <div key={id} className="clin-swap">
              <h3 className="clin-panel-h">{step.title}</h3>
              <p>{step.text}</p>
            </div>
          <p className="clin-fine">The tests used depend on your symptoms and age and are chosen by the doctor.</p>
        </div>
      </div>
    </div>
  );
}
