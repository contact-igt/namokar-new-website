"use client";

import { animate } from "motion/mini";
import { useEffect, useRef, useState } from "react";
import { DUR, EASE_OUT } from "../motion/tokens";
import { C, EyeBase } from "./EyeBase";

const STEPS = [
  { title: "Before: a clouded lens", text: "The natural lens has become cloudy, so light does not focus as sharply on the retina." },
  {
    title: "A small opening",
    text: "A very small opening is made at the edge of the cornea so the surgeon can reach the lens. Whether stitches are needed depends on the eye and on the technique the surgeon chooses.",
  },
  { title: "The clouded lens is removed", text: "The clouded lens is taken out of the eye." },
  {
    title: "A clear lens is placed",
    text: "A clear artificial lens, called an intraocular lens (IOL), is placed where the natural lens was. Which design suits you is decided with your doctor.",
  },
] as const;

const AUTO_MS = 3000;

/** What each drawn part looks like at each step: opacity and a small transform (animated with Motion). */
const SHOW = {
  bag: (i: number) => ({ opacity: i >= 2 ? 0.8 : 0 }),
  cloudy: (i: number) => ({ opacity: i <= 1 ? 1 : 0, transform: i <= 1 ? "translateX(0px) scale(1)" : "translateX(-6px) scale(0.82)" }),
  fresh: (i: number) => ({ opacity: i >= 3 ? 1 : 0, transform: i >= 3 ? "scale(1)" : "scale(0.88)" }),
  opening: (i: number) => ({ opacity: i === 1 ? 1 : 0, transform: i === 1 ? "scale(1)" : "scale(0.9)" }),
};
const initial = (k: keyof typeof SHOW) => SHOW[k](0);

/**
 * A general outline of cataract surgery in four steps, fully under the visitor's control:
 * Previous and Next, Play (which advances by itself until the end and stops), numbered step
 * buttons, and Replay. Nothing moves until the visitor acts. The steps use only wording the
 * page already uses; no technique, duration or result is described. Pending medical review
 * (src/config/figures.ts).
 *
 * Motion for the picture comes from Motion's small WAAPI build (motion/mini, about 2 KB): opacity
 * and a small scale or shift, nothing else, and no animation at all (the picture just changes)
 * for visitors who asked for reduced motion. The wording swaps with a CSS fade.
 */
export default function CataractSteps() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const bag = useRef<SVGEllipseElement>(null);
  const cloudy = useRef<SVGGElement>(null);
  const fresh = useRef<SVGGElement>(null);
  const opening = useRef<SVGGElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = first.current || calm ? 0 : DUR.scene;
    first.current = false;
    const targets: [keyof typeof SHOW, Element | null][] = [
      ["bag", bag.current],
      ["cloudy", cloudy.current],
      ["fresh", fresh.current],
      ["opening", opening.current],
    ];
    for (const [k, el] of targets) if (el) animate(el, SHOW[k](i), { duration, ease: EASE_OUT });
  }, [i]);

  useEffect(() => {
    if (!playing) return;
    if (i >= STEPS.length - 1) {
      const t = setTimeout(() => setPlaying(false), 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI((n) => n + 1), AUTO_MS);
    return () => clearTimeout(t);
  }, [playing, i]);

  const go = (n: number) => {
    setPlaying(false);
    setI(Math.min(STEPS.length - 1, Math.max(0, n)));
  };
  const atEnd = i === STEPS.length - 1;

  return (
    <div className="clin-grid">
      <div className="clin-stage">
        <svg viewBox="150 70 290 260" className="clin-svg clin-svg--zoom" role="img" aria-label={`Step ${i + 1} of ${STEPS.length}: ${STEPS[i].title}`}>
          <EyeBase showLens={false}>
            {/* the lens capsule outline stays once the lens has gone */}
            <ellipse ref={bag} cx="294" cy="200" rx="25" ry="51" fill="none" stroke={C.grey} strokeWidth="2" strokeDasharray="4 5" style={initial("bag")} />
            {/* the natural, clouded lens */}
            <g ref={cloudy} className="fb" style={initial("cloudy")}>
              <ellipse cx="294" cy="200" rx="24" ry="50" fill={C.white} stroke={C.grey} strokeWidth="3" />
              <ellipse cx="294" cy="200" rx="24" ry="50" fill={C.cloud} opacity="0.92" />
              <ellipse cx="288" cy="188" rx="9" ry="16" fill={C.white} opacity="0.5" />
            </g>
            {/* the clear replacement lens, with its two supporting loops */}
            <g ref={fresh} className="fb" style={initial("fresh")}>
              <ellipse cx="294" cy="200" rx="18" ry="42" fill={C.white} stroke={C.ink} strokeWidth="3.5" />
              <path d="M294 158 C 308 142 326 146 326 164 M294 242 C 308 258 326 254 326 236" fill="none" stroke={C.grey} strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="289" cy="188" rx="5" ry="14" fill={C.porcelain} />
            </g>
            {/* the small opening, shown only at step 2 */}
            <g ref={opening} className="fb" style={initial("opening")}>
              <path d="M226 142 L246 128" stroke={C.orangeDark} strokeWidth="5" strokeLinecap="round" />
              <circle cx="236" cy="135" r="15" fill="none" stroke={C.orange} strokeWidth="2.5" strokeDasharray="3 4" />
            </g>
          </EyeBase>
        </svg>
      </div>

      <div className="clin-side">
        <ol className="steps-dots" aria-label="Steps">
          {STEPS.map((s, n) => (
            <li key={s.title}>
              <button type="button" className="step-dot" aria-label={`Step ${n + 1}: ${s.title}`} aria-current={n === i ? "step" : undefined} onClick={() => go(n)}>
                {n + 1}
              </button>
            </li>
          ))}
        </ol>
        <div className="clin-panel" aria-live="polite">
          <div key={i} className="clin-swap">
            <p className="clin-step-n">Step {i + 1} of {STEPS.length}</p>
            <h3 className="clin-panel-h">{STEPS[i].title}</h3>
            <p>{STEPS[i].text}</p>
          </div>
        </div>
        <div className="clin-actions">
          <button type="button" className="btn btn--secondary" onClick={() => go(i - 1)} disabled={i === 0}>
            Previous
          </button>
          <button type="button" className="btn btn--secondary" onClick={() => go(i + 1)} disabled={atEnd}>
            Next
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              if (playing) setPlaying(false);
              else {
                if (atEnd) setI(0);
                setPlaying(true);
              }
            }}
          >
            {playing ? "Pause" : atEnd ? "Replay" : "Play"}
          </button>
        </div>
        <p className="clin-fine">
          A general outline. Your doctor explains how the operation is arranged for you, and what to do before and afterwards.
        </p>
      </div>
    </div>
  );
}
