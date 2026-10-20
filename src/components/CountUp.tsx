"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure such as "25+" or "10,000+" up from zero the first time it scrolls into view.
 * Plain requestAnimationFrame, no library: it runs once, only while on screen, and not at all
 * for visitors who prefer reduced motion. The server and no-script render show the final
 * figure; text that holds no number (an institution name) is returned unchanged.
 */
export default function CountUp({
  value,
  duration = 1600,
}: {
  value: string;
  duration?: number;
}) {
  const match = /^(\d[\d,]*)(.*)$/.exec(value);
  const target = match ? Number(match[1].replace(/,/g, "")) : NaN;
  const suffix = match ? match[2] : "";
  const [shown, setShown] = useState<number>(target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(target * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  if (Number.isNaN(target)) return <>{value}</>;
  return (
    <span ref={ref}>
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
