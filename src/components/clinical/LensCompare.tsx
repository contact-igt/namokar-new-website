"use client";

import { type CSSProperties, type PointerEvent, useRef, useState } from "react";
import Image from "next/image";
import Scene from "./Scene";

const LEVELS = {
  mild: { blur: 1.2, contrast: 0.86, sepia: 0.16, bright: 0.98, glare: 0.18 },
  moderate: { blur: 2.4, contrast: 0.72, sepia: 0.3, bright: 0.93, glare: 0.32 },
  advanced: { blur: 4, contrast: 0.58, sepia: 0.45, bright: 0.88, glare: 0.46 },
} as const;
type Level = keyof typeof LEVELS;

const LEVEL_DETAILS: Record<Level, {
  title: string;
  description: string;
  impact: string;
  signs: [string, string][];
}> = {
  mild: {
    title: "Mild Cataract",
    description: "In the early stage, vision may still seem normal, but subtle changes begin to appear.",
    impact: "Daily activities are usually unaffected, but regular eye examinations help detect cataracts before symptoms become significant.",
    signs: [["≈", "Slight blurring of vision"], ["◐", "Colours appear slightly dull"], ["☼", "Mild glare at night"], ["▤", "Minor difficulty reading fine text"]],
  },
  moderate: {
    title: "Moderate Cataract",
    description: "Clouding can make everyday tasks more difficult, especially in dim light or when facing bright lights.",
    impact: "An eye examination can help you understand whether changes to glasses or treatment discussions are appropriate.",
    signs: [["≈", "More noticeable blur"], ["◐", "Colours look less vivid"], ["☼", "Glare from headlights"], ["▤", "Reading needs brighter light"]],
  },
  advanced: {
    title: "Advanced Cataract",
    description: "Clouding can substantially affect clarity, contrast and confidence with visual tasks.",
    impact: "Please arrange an eye examination to discuss your symptoms and the options that may be suitable for you.",
    signs: [["≈", "Marked blurring of vision"], ["◐", "Faded colours and contrast"], ["☼", "Strong glare sensitivity"], ["▤", "Difficulty with detailed tasks"]],
  },
};
const LEVEL_ORDER: Level[] = ["mild", "moderate", "advanced"];

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
  const L = LEVELS[level];
  const detail = LEVEL_DETAILS[level];
  const levelIndex = LEVEL_ORDER.indexOf(level);

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
    "--severity": String(levelIndex),
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
          <Scene />
        </div>
        <div className="lc-layer lc-cloudy">
          <Scene />
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
        <input className="sr-only" type="range" min={0} max={100} value={cut} onChange={(e) => setCut(Number(e.target.value))} />
      </label>
      <div className="lc-severity" role="group" aria-label="Choose cataract severity">
        <span className="lc-severity-track" aria-hidden="true"><span /></span>
        <div className="lc-severity-stops">
          {LEVEL_ORDER.map((option) => (
            <button
              key={option}
              type="button"
              className="lc-severity-stop"
              aria-pressed={level === option}
              onClick={() => setLevel(option)}
            >
              <span className="lc-severity-dot" />
              <span>{option === "advanced" ? "Advanced" : option[0].toUpperCase() + option.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>
      <section className="lc-summary" aria-live="polite">
        <div className="lc-eye"><Image src="/images/cataract-eye-illustration.png" alt="" width={196} height={196} /></div>
        <div className="lc-summary-copy">
          <h3>{detail.title}</h3>
          <p>{detail.description}</p>
          <ul className="lc-signs">
            {detail.signs.map(([symbol, text]) => <li key={text}><span aria-hidden="true">{symbol}</span>{text}</li>)}
          </ul>
        </div>
        <aside className="lc-impact">
          <h4><span aria-hidden="true">☼</span> Daily impact</h4>
          <p>{detail.impact}</p>
        </aside>
      </section>
    </div>
  );
}
