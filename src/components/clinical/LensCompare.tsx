"use client";

import { type CSSProperties, type PointerEvent, useId, useRef, useState } from "react";
import Scene from "./Scene";
import Segmented from "./Segmented";

const LEVELS = {
  mild: { blur: 1.2, contrast: 0.86, sepia: 0.16, bright: 0.98, glare: 0.18 },
  moderate: { blur: 2.4, contrast: 0.72, sepia: 0.3, bright: 0.93, glare: 0.32 },
  advanced: { blur: 4, contrast: 0.58, sepia: 0.45, bright: 0.88, glare: 0.46 },
} as const;
type Level = keyof typeof LEVELS;

/**
 * Drag to compare a clear view with an illustration of how a clouded lens can affect vision:
 * blur, faded colour and glare. A conceptual simulation on an abstract scene; real experiences
 * vary a great deal, and the caption says so. Pending medical review (src/config/figures.ts).
 * The slider is a real range input, so it works with a keyboard, a finger or a screen reader.
 */
export default function LensCompare() {
  const [cut, setCut] = useState(50);
  const [level, setLevel] = useState<Level>("moderate");
  const stage = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const L = LEVELS[level];

  const fromPointer = (e: PointerEvent) => {
    const r = stage.current?.getBoundingClientRect();
    if (r) setCut(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
  };

  const style = {
    "--cut": `${cut}%`,
    "--blur": `${L.blur}px`,
    "--contrast": L.contrast,
    "--sepia": L.sepia,
    "--bright": L.bright,
    "--glare": L.glare,
  } as CSSProperties;

  return (
    <div className="clin-compare" style={style}>
      <div
        ref={stage}
        className="lc-stage"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e);
        }}
        onPointerMove={(e) => e.buttons === 1 && fromPointer(e)}
      >
        <div className="lc-layer">
          <Scene id={`${uid}a`} />
        </div>
        <div className="lc-layer lc-cloudy">
          <Scene id={`${uid}b`} />
          <span className="lc-glare" aria-hidden="true" />
        </div>
        <span className="lc-line" aria-hidden="true">
          <span className="lc-knob" />
        </span>
        <span className="lc-tag lc-tag--l">Clear lens</span>
        <span className="lc-tag lc-tag--r">Clouded lens (illustration)</span>
      </div>
      <label className="lc-range">
        <span className="sr-only">Move to compare a clear lens with a clouded lens</span>
        <input type="range" min={0} max={100} value={cut} onChange={(e) => setCut(Number(e.target.value))} />
      </label>
      <div className="clin-row">
        <Segmented
          label="How clouded"
          value={level}
          onChange={setLevel}
          options={[
            { value: "mild", label: "Mild" },
            { value: "moderate", label: "Moderate" },
            { value: "advanced", label: "More advanced" },
          ]}
        />
        <p className="clin-cue">
          A cataract can make vision look blurred or dim, colours look faded or yellowed, and bright
          light glare. How much, and when, varies from person to person.
        </p>
      </div>
    </div>
  );
}
