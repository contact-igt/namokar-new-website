"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "./useMedia";

/**
 * Subtle scroll parallax for a photograph, on a desktop pointer only and never with reduced
 * motion. A passive scroll listener (one animation frame per scroll) writes a CSS variable
 * (--py) that the stylesheet applies to the image as a transform (see .parallax in globals.css),
 * so overlays such as the "Preview only" tag stay still. On touch devices and for visitors who
 * asked for less motion nothing is attached. Deliberately tiny and independent of the animation
 * library, because it ships on every page that has a hero photograph.
 */
export default function Parallax({ children, range = 14 }: { children: ReactNode; range?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const calm = usePrefersReducedMotion();
  const on = fine && !calm;

  useEffect(() => {
    const el = ref.current;
    if (!on || !el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height); // 0 entering, 1 leaving
      el.style.setProperty("--py", `${((0.5 - Math.min(1, Math.max(0, p))) * 2 * range).toFixed(1)}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      el.style.removeProperty("--py");
    };
  }, [on, range]);

  return (
    <div ref={ref} className="parallax" data-on={on || undefined}>
      {children}
    </div>
  );
}
