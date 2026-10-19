"use client";

import { useState } from "react";
import { C } from "./EyeBase";
import PartList from "./PartList";
import Segmented from "./Segmented";

type Part = "gland" | "puncta" | "canaliculi" | "sac" | "duct";
const PARTS: { id: Part; name: string; text: string }[] = [
  { id: "gland", name: "Tear gland", text: "Makes the tears that keep the surface of the eye moist." },
  { id: "puncta", name: "Puncta", text: "Two tiny openings at the inner corner of the eyelids, where tears begin to drain." },
  { id: "canaliculi", name: "Canaliculi", text: "Thin channels that carry tears from the puncta to the tear sac." },
  { id: "sac", name: "Tear sac", text: "A small pouch that collects the tears." },
  { id: "duct", name: "Tear duct", text: "The channel that carries tears from the sac into the nose." },
];

const FLOW = "M130 86 C 150 100 190 110 262 120 C 290 124 300 132 306 150 L 306 178 C 306 220 316 260 330 318";
const FLOW_BLOCKED = "M130 86 C 150 100 190 110 262 120 C 290 124 300 132 306 150 L 306 178 C 306 200 308 216 309 228";

/**
 * How tears are made and drain (gland, puncta, canaliculi, sac, duct), and what a narrowed or
 * blocked passage can mean. Watering has several causes, and the figure says an examination is
 * needed. Pending medical review (src/config/figures.ts).
 */
export default function TearPathway() {
  const [part, setPart] = useState<Part>("sac");
  const [blocked, setBlocked] = useState(false);
  const hi = (p: Part) => (part === p ? C.orangeDark : C.ink);
  const w = (p: Part) => (part === p ? 7 : 4);
  const info = PARTS.find((x) => x.id === part)!;

  return (
    <div className="clin-grid">
      <div className="clin-stage">
        <svg viewBox="60 20 460 330" className="clin-svg" role="img" aria-label={`The tear drainage system. ${blocked ? "A blockage in the duct is shown." : "Tears drain normally."}`}>
          <text x="330" y="344" textAnchor="middle" fontSize="18" fontWeight="600" fontFamily="Inter, system-ui, sans-serif" fill={C.soft}>
            into the nose
          </text>
          {/* the eye */}
          <path d="M90 100 Q200 30 306 100 Q200 170 90 100Z" fill={C.white} stroke={C.ink} strokeWidth="4" />
          <circle cx="198" cy="100" r="30" fill={C.grey} />
          <circle cx="198" cy="100" r="12" fill={C.ink} />
          {/* tear gland, above the outer corner */}
          <ellipse cx="124" cy="58" rx="28" ry="14" fill={part === "gland" ? C.orangeDark : C.mist} stroke={hi("gland")} strokeWidth={w("gland")} />
          {/* the passage */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M302 98 C 312 106 314 120 308 142" stroke={hi("canaliculi")} strokeWidth={w("canaliculi")} />
            <path d="M298 108 C 308 124 308 134 306 146" stroke={hi("canaliculi")} strokeWidth={w("canaliculi")} />
          </g>
          <circle cx="302" cy="97" r="6" fill={part === "puncta" ? C.orangeDark : C.white} stroke={hi("puncta")} strokeWidth="3" />
          <circle cx="297" cy="109" r="5" fill={part === "puncta" ? C.orangeDark : C.white} stroke={hi("puncta")} strokeWidth="3" />
          <ellipse cx="306" cy="164" rx="16" ry="24" fill={part === "sac" ? C.orangeDark : C.mist} stroke={hi("sac")} strokeWidth={w("sac")} />
          <path d="M306 188 C 306 230 316 270 330 318" fill="none" stroke={hi("duct")} strokeWidth={part === "duct" ? 12 : 9} strokeLinecap="round" opacity={part === "duct" ? 1 : 0.85} />
          <path d="M306 188 C 306 230 316 270 330 318" fill="none" stroke={C.white} strokeWidth="4" strokeLinecap="round" />

          {/* tears moving along the passage: the whole way, or only as far as the blockage */}
          <path d={FLOW} fill="none" stroke={C.orange} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="1 9" style={{ opacity: blocked ? 0 : 1, transition: "opacity 450ms var(--ease)" }} />
          <path d={FLOW_BLOCKED} fill="none" stroke={C.orange} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="1 9" style={{ opacity: blocked ? 1 : 0, transition: "opacity 450ms var(--ease)" }} />
          {/* the blockage and the tears that back up */}
          <g style={{ opacity: blocked ? 1 : 0, transition: "opacity 300ms var(--ease)" }}>
            <path d="M292 236 L322 246 M322 236 L292 246" stroke={C.orangeDark} strokeWidth="6" strokeLinecap="round" />
            {[150, 190, 232].map((x) => (
              <path key={x} d={`M${x} 134 q4 8 0 12 q-4 -4 0 -12z`} fill={C.orange} />
            ))}
          </g>
        </svg>
        <p className="clin-cue" aria-live="polite">
          {blocked
            ? "If part of the passage is narrowed or blocked, tears cannot drain as they should, and the eye may water."
            : "Tears are made, spread across the eye, and drain through the puncta, canaliculi, sac and duct into the nose."}
        </p>
      </div>
      <div className="clin-side">
        <Segmented
          label="Drainage"
          value={blocked ? "blocked" : "open"}
          onChange={(v) => setBlocked(v === "blocked")}
          options={[
            { value: "open", label: "Tears drain" },
            { value: "blocked", label: "Passage blocked" },
          ]}
        />
        <PartList label="Parts of the tear drainage system" items={PARTS} value={part} onChange={setPart} />
        <div className="clin-panel" aria-live="polite">
          <div key={part} className="clin-swap">
              <h3 className="clin-panel-h">{info.name}</h3>
              <p>{info.text}</p>
            </div>
          <p className="clin-fine">Watering can come from dryness or irritation, infection, or a blocked tear-drainage passage, among other causes, so it needs to be examined.</p>
        </div>
      </div>
    </div>
  );
}
