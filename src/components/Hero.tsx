"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { LINKS } from "@/config/site";
import CountUp from "./CountUp";
import { CalendarIcon } from "./Icons";

const AUTO_MS = 5500;

export const HERO_SLIDES = [
  {
    id: "centre",
    tab: "Our Centre",
    label: "Our centre",
    badge: "Trusted Eye Care Since 25+ Years",
    titlePrefix: "Complete Eye Care, With",
    titleSub: "a ",
    titleHighlight: "Personal Approach.",
    body: "From routine eye examinations to cataract, glaucoma and oculoplasty care, every visit starts with a careful assessment.",
    more: { label: "About the centre", href: LINKS.about },
  },
  {
    id: "cataract",
    tab: "Cataract",
    label: "Cataract care",
    badge: "Advanced Micro-Incision Surgery",
    titlePrefix: "Cataract Care,",
    titleSub: "",
    titleHighlight: "Explained Clearly.",
    body: "Careful assessment of your vision and a clear discussion of your treatment options with premium IOL choices.",
    more: { label: "About cataract surgery", href: LINKS.cataract },
  },
  {
    id: "oculoplasty",
    tab: "Oculoplasty",
    label: "Specialist oculoplasty",
    badge: "Fellowship-Trained Specialist",
    titlePrefix: "Specialist Eyelid &",
    titleSub: "",
    titleHighlight: "Tear-Duct Care.",
    body: "Care for drooping or heavy eyelids, watering eyes and under-eye concerns, tailored after careful evaluation.",
    more: { label: "Explore eyelid care", href: LINKS.eyelid },
  },
] as const;

export default function Hero({
  online,
}: {
  panel?: ReactNode;
  online: boolean;
}) {
  const [active, setActive] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = HERO_SLIDES.length;

  const go = useCallback(
    (to: number) => {
      setActive((to + count) % count);
    },
    [count],
  );

  // Auto-advance banner on a timer
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (!document.hidden) {
        setActive((prev) => (prev + 1) % count);
      }
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  };

  const currentSlide = HERO_SLIDES[active];

  return (
    <div className="hero-banner-wrapper">
      <section
        className="hero-banner-section"
        aria-roledescription="carousel"
        aria-label="Namokar Highlights and Care Services"
        onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {/* The clinic photograph stays in place while the copy advances. */}
        <div className="hero-banner-visual" aria-hidden="true">
          <Image
            src="/images/Copy of DSC07064 - Copy-200kb.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-static-image"
          />
        </div>

        {/* Floating Three Dots Pagination (Bottom Right) */}
        <div
          className="hero-slider-pagination"
          role="tablist"
          aria-label="Slide Selection"
        >
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              className={`hero-slider-dot ${active === i ? "is-active" : ""}`}
              aria-label={`Slide ${i + 1}: ${slide.tab}`}
              aria-selected={active === i}
              onClick={() => go(i)}
            />
          ))}
        </div>

        {/* Main Banner Content Container */}
        <div className="container hero-banner-container">
          <div className="hero-banner-content">
            <div className="hero-slide-copy" key={currentSlide.id}>
              {/* Top Trust Badge */}
              <div className="hero-banner-badge">
              <span className="hero-badge-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="14"
                  height="14"
                >
                  <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span className="hero-badge-text">
                {currentSlide.badge}
              </span>
              </div>

              {/* Slide Headline */}
              <h1 className="hero-banner-heading">
              {currentSlide.titlePrefix}{" "}
              {currentSlide.titleSub && (
                <span className="hero-heading-sub">{currentSlide.titleSub}</span>
              )}
              <span className="hero-heading-highlight">
                {currentSlide.titleHighlight}
              </span>
              </h1>

              {/* Slide Description */}
              <p className="hero-banner-body">
                {currentSlide.body}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="hero-banner-actions">
              <Link href={`${LINKS.contact}#request`} className="hero-btn-primary">
                <span className="hero-btn-icon" aria-hidden="true">
                  <CalendarIcon width={19} height={19} />
                </span>
                <span>Book a Consultation</span>
                <span className="hero-btn-arrow" aria-hidden="true">&rarr;</span>
              </Link>

              <a href="#explore" className="hero-btn-secondary">
                <span className="hero-btn-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                  </svg>
                </span>
                <span>Watch Our Video</span>
              </a>
            </div>

            {/* Feature Highlights Strip (3 Items) */}
            <div className="hero-banner-features" role="list">
              <div className="hero-feature-item" role="listitem">
                <span className="hero-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <span className="hero-feature-text">
                  Advanced<br />Technology
                </span>
              </div>

              <div className="hero-feature-sep" aria-hidden="true" />

              <div className="hero-feature-item" role="listitem">
                <span className="hero-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <span className="hero-feature-text">
                  Expert<br />Doctors
                </span>
              </div>

              <div className="hero-feature-sep" aria-hidden="true" />

              <div className="hero-feature-item" role="listitem">
                <span className="hero-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7Z" />
                  </svg>
                </span>
                <span className="hero-feature-text">
                  Compassionate<br />Care
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Wave Transition */}
        <div className="hero-banner-wave" aria-hidden="true">
          <Image
            src="/images/bg-banner-wave.svg"
            alt=""
            fill
            sizes="100vw"
            className="hero-wave-svg"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* Dark Teal Stats Bar with 4 Key Metrics */}
      <div className="hero-stats-band" role="region" aria-label="Key Facts and Excellence">
        <div className="container hero-stats-container">
          <div className="hero-stats-grid">
            {/* 1. Specialist Fellowship */}
            <div className="hero-stat-col hero-stat-col--specialist">
              <span className="hero-stat-badge-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </span>
              <div className="hero-stat-desc">
                <span className="hero-stat-sub">Barraquer Institute</span>
                <strong className="hero-stat-main">Trained Specialist</strong>
              </div>
            </div>

            <div className="hero-stat-sep" aria-hidden="true" />

            {/* 2. 25+ Years */}
            <div className="hero-stat-col">
              <span className="hero-stat-num">
                <CountUp value="25+" />
              </span>
              <span className="hero-stat-label">Years of Excellence</span>
            </div>

            <div className="hero-stat-sep" aria-hidden="true" />

            {/* 3. 10,000+ Patients */}
            <div className="hero-stat-col">
              <span className="hero-stat-num">
                <CountUp value="10,000+" />
              </span>
              <span className="hero-stat-label">Happy Patients</span>
            </div>

            <div className="hero-stat-sep" aria-hidden="true" />

            {/* 4. Verified facilities count */}
            <div className="hero-stat-col">
              <span className="hero-stat-num">
                <CountUp value="6" />
              </span>
              <span className="hero-stat-label">Advanced Facilities</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
