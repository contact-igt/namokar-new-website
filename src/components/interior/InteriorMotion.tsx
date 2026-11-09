"use client";

import { useEffect, useRef } from "react";

/** Matches About's short reveals; every element remains visible without this enhancement. */
export default function InteriorMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Next can retain inactive routes in hidden Activity trees during navigation.
    // Resolve this instance's own page instead of selecting a previously cached page.
    const root = anchor.current?.closest<HTMLElement>("[data-interior-page]");
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");
    const animations = new Set<Animation>();
    const candidates = [...new Set([...root.querySelectorAll<HTMLElement>([
      ".page-hero-copy > .crumbs", ".page-hero-copy > .page-eyebrow",
      ".cataract-hero-copy > .crumbs", ".cataract-hero-copy > .page-eyebrow",
      ".page-title", ".page-lead", ".page-actions", ".page-hero-media",
      ".cataract-hero-mobile-media", ".help-panel", ".reveal", ".section-head",
      ".why-row", ".cataract-journey-card", ".ed", ".vlib-group", ".cta-inner",
      ".train-col", ".find-card", ".compare > div", ".empty-state",
      ".thank-you-card", ".thank-you-next",
    ].join(","))].flatMap((target) => {
      // Reveal related cards individually, including image/copy spreads whose wrapper
      // deliberately has no box. Avoid animating an entire long grid as one slab.
      if (target.matches(".tile-grid, .train-cols") || getComputedStyle(target).display === "contents") {
        return [...target.children].filter((child): child is HTMLElement => child instanceof HTMLElement);
      }
      return [target];
    }))];
    const selected = new Set(candidates);
    // Animate a group once, rather than stacking a reveal on each of its descendants.
    const targets = candidates.filter((target) => {
      for (let parent = target.parentElement; parent && parent !== root; parent = parent.parentElement) {
        if (selected.has(parent)) return false;
      }
      return true;
    });
    const observer = new IntersectionObserver((entries) => {
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches) continue;
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

  return <span ref={anchor} hidden aria-hidden="true" />;
}
