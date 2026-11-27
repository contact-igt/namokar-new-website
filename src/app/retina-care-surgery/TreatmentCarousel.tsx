"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./retina.module.css";

export default function TreatmentCarousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function updateEdges() {
    const element = track.current;
    if (!element) return;

    const { clientWidth, scrollLeft, scrollWidth } = element;
    setAtStart(scrollLeft <= 1);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  }

  useEffect(() => {
    const element = track.current;
    if (!element) return;

    const observer = new ResizeObserver(updateEdges);
    observer.observe(element);
    updateEdges();
    return () => observer.disconnect();
  }, []);

  function move(direction: -1 | 1) {
    const element = track.current;
    const first = element?.children[0];
    const second = element?.children[1];
    if (!element || !first || !second) return;

    const step = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    element.scrollBy({ left: direction * step });
  }

  return (
    <div className={styles.treatmentCarousel}>
      <button type="button" className={styles.treatmentArrow} aria-label="Previous treatment option" aria-controls="retina-treatment-track" disabled={atStart} onClick={() => move(-1)}>
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <div
        id="retina-treatment-track"
        ref={track}
        className={styles.pathways}
        role="group"
        aria-label="Retina treatment cards"
        tabIndex={0}
        onScroll={updateEdges}
        onKeyDown={event => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }}
      >
        {children}
      </div>
      <button type="button" className={styles.treatmentArrow} aria-label="Next treatment option" aria-controls="retina-treatment-track" disabled={atEnd} onClick={() => move(1)}>
        <ChevronRight size={22} aria-hidden="true" />
      </button>
    </div>
  );
}
