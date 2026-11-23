"use client";

import { useEffect } from "react";
import { DUR, EASE_OUT } from "@/components/motion/tokens";
import styles from "./refractive.module.css";

export default function RefractiveReveal() {
  useEffect(() => {
    const root = document.querySelector(`.${styles.page}`);
    if (!root || !("IntersectionObserver" in window)) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting, target }, index) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        if (preference.matches) return;
        const animation = target.animate(
          [{ opacity: 0.72, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: DUR.scene * 1000, delay: (index % 3) * 40, easing: `cubic-bezier(${EASE_OUT.join(",")})` },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0.12 });
    root.querySelectorAll("section header, article, #surgery-day li").forEach(element => {
      if (!element.closest('[aria-roledescription="carousel"]')) observer.observe(element);
    });
    const reduce = () => { if (preference.matches) animations.forEach(animation => animation.cancel()); };
    preference.addEventListener("change", reduce);
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); preference.removeEventListener("change", reduce); };
  }, []);
  return null;
}
