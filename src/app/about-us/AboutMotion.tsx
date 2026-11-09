"use client";

import { useEffect } from "react";

/** Progressive enhancement: content stays visible without JavaScript or motion support. */
export default function AboutMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-about-page]");
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");
    const animations = new Set<Animation>();
    const targets = root.querySelectorAll<HTMLElement>([
      ".about-hero-copy", ".about-hero-mobile-media", ".about-heading-block",
      ".about-copy > p", ".about-copy-main > p", ".about-right > .ed", ".about-services",
      ".doctor-kicker-wrap", ".doctor-photo", ".doctor-summary > h2",
      ".doctor-summary > p", ".doctor-specialties > .areas-h", ".focus-grid",
      ".doctor-actions", ".doctor-training-head", ".cred-card",
      ".doctor-training-fine", ".centre-head", ".fg-card",
      ".vsec-showcase-head", ".vsec-showcase-stage", "#journey .section-head",
      ".journey-card", ".cta-inner",
    ].join(","));

    const observer = new IntersectionObserver((entries) => {
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches || entry.boundingClientRect.bottom < 0) continue;

        const animation = entry.target.animate([
          { opacity: 0.55, translate: `0 ${compact.matches ? 4 : 8}px` },
          { opacity: 1, translate: "0 0" },
        ], {
          duration: compact.matches ? 280 : 360,
          delay: compact.matches ? 0 : Math.min(stagger++ * 35, 70),
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.05, rootMargin: "0px 0px -16px 0px" });

    const cancelMotion = () => {
      if (!preference.matches) return;
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };

    targets.forEach((target) => observer.observe(target));
    preference.addEventListener("change", cancelMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", cancelMotion);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return null;
}
