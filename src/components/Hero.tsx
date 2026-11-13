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
import { CalendarIcon } from "./Icons";
import { usePrefersReducedMotion } from "./motion/useMedia";

const AUTO_MS = 5500;
const BACKGROUND_AUTO_MS = 6000;

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
] as const;

const HERO_BACKGROUNDS = [
  { id: "exterior", image: "/images/Namokar Eye Centre Exterior.png", alt: "The exterior of Namokar Eye & Oculoplasty Centre" },
  { id: "centre", image: "/images/Modern Ophthalmology Exam Room 11.png", alt: "Diagnostic eye examination setup with orange chair and advanced ophthalmic equipment" },
  { id: "waiting", image: "/images/Modern Ophthalmology Clinic Waiting Room-clean.png", alt: "The waiting room and diagnostic equipment at Namokar Eye & Oculoplasty Centre" },
  { id: "cataract", image: "/images/Modern Ophthalmology Exam Room.png", alt: "Warm ophthalmic consultation and slit-lamp examination room at Namokar Eye Centre" },
] as const;

const TRUST_ITEMS = [
  { label: "25+ Years of Eye Care Experience", enabled: true },
  { label: "10,000+ Patients Treated", enabled: true },
  { label: "Barraquer Institute Trained Specialist", enabled: true },
  { label: "International Clinical Exposure", enabled: true },
  { label: "Modern Diagnostic Facilities", enabled: true },
  { label: "Patient-Centred Care", enabled: true },
  { label: "Comprehensive Eye Care", enabled: true },
  { label: "Specialist Oculoplasty Care", enabled: true },
  { label: "Advanced Ophthalmic Technology", enabled: true },
  // Enable after the current certificate and display authorization are confirmed.
  { label: "NABH Accreditation", enabled: false },
] as const;

export default function Hero({
  online,
}: {
  panel?: ReactNode;
  online: boolean;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [backgroundActive, setBackgroundActive] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
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

  // Photography has its own clock; content navigation, focus and hover never reset it.
  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      if (!document.hidden) {
        setBackgroundActive((previous) => (previous + 1) % HERO_BACKGROUNDS.length);
      }
    }, BACKGROUND_AUTO_MS);
    return () => clearInterval(timer);
  }, [reducedMotion]);

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
        <div className="hero-lens-watermark" aria-hidden="true" />
        <div className="hero-banner-visual">
          {HERO_BACKGROUNDS.map((background, i) => (
            <div
              key={background.id}
              className={`hero-image-layer hero-image-layer--${background.id} ${backgroundActive === i ? "is-active" : ""}`}
              aria-hidden={backgroundActive !== i}
            >
              <Image
                src={background.image}
                alt={background.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "eager"}
                sizes="100vw"
                className={`hero-slide-image hero-slide-image--${background.id}`}
              />
            </div>
          ))}
        </div>

        {/* Slide pagination */}
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

      <div className="hero-stats-band hero-trust-marquee" role="region" aria-label="Why patients trust Namokar">
        <div className="hero-trust-track">
          {[0, 1].map((copy) => (
            <div className="hero-trust-group" key={copy} aria-hidden={copy === 1}>
              {TRUST_ITEMS.filter((item) => item.enabled).map((item) => (
                <span className="hero-trust-item" key={item.label}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6-9.5-6-9.5-6Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {item.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
