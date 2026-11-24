"use client";

import { useRef, type ReactNode } from "react";
import styles from "./AftercareCarousel.module.css";

export default function AftercareCarousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  function move(direction: number) {
    const element = track.current;
    if (element) element.scrollBy({ left: direction * element.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <div className={styles.carousel} role="region" aria-label="Recovery and eye care cards">
    <button type="button" className={styles.arrow} aria-label="Previous aftercare cards" onClick={() => move(-1)}>‹</button>
    <div ref={track} className={styles.track} tabIndex={0} onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>{children}</div>
    <button type="button" className={styles.arrow} aria-label="Next aftercare cards" onClick={() => move(1)}>›</button>
  </div>;
}
