"use client";

import { type ReactNode } from "react";
import Slider from "react-slick";
import { usePrefersReducedMotion, useQuery } from "@/components/motion/useMedia";
import styles from "./exams.module.css";

export default function ExamPartsCarousel({ children }: { children: ReactNode }) {
  const mobile = useQuery("(width < 576px)");
  const reducedMotion = usePrefersReducedMotion();

  if (!mobile) {
    return <div className={styles.bentoGrid}>{children}</div>;
  }

  return (
    <Slider
      className={styles.bentoCarousel}
      arrows={false}
      dots
      appendDots={(dots) => <ul>{dots}</ul>}
      infinite={false}
      slidesToShow={1}
      slidesToScroll={1}
      speed={reducedMotion ? 0 : 400}
      customPaging={(index) => (
        <button type="button" aria-label={`Show exam step ${index + 1}`} />
      )}
    >
      {children}
    </Slider>
  );
}
