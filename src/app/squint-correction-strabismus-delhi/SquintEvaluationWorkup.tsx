"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SquintEvaluationWorkup.module.css";

export interface EvaluationStep {
  number: string;
  title: string;
  shortDesc: string;
  image: string;
  alt: string;
}

export const EVALUATION_STEPS: EvaluationStep[] = [
  {
    number: "01",
    title: "Detailed Clinical History",
    shortDesc: "The doctor asks when the eye turn started, whether it comes and goes, and about double vision, previous treatment, general health, and relevant family or birth history.",
    image: "/images/squint/detailed-clinical-history.webp",
    alt: "Ophthalmologist discussing clinical eye-alignment history with patient"
  },
  {
    number: "02",
    title: "Visual Acuity Testing",
    shortDesc: "Age-appropriate tests measure vision in each eye. Differences between the eyes help guide assessment for amblyopia or other causes of reduced vision.",
    image: "/images/squint/visual-acuity-testing.webp",
    alt: "Young patient undergoing age-appropriate visual acuity testing"
  },
  {
    number: "03",
    title: "Cycloplegic Refraction",
    shortDesc: "Drops temporarily relax focusing so the doctor can measure the full spectacle prescription, including long-sightedness that may contribute to inward crossing.",
    image: "/images/squint/cycloplegic-refraction.webp",
    alt: "Pediatric eye care professional performing refraction assessment with trial lenses"
  },
  {
    number: "04",
    title: "Corneal Reflex & Cover Testing",
    shortDesc: "The doctor observes light reflections and eye movement during cover testing to check for a visible or latent deviation, using tests suited to the patient's age and ability.",
    image: "/images/squint/corneal-reflex-cover-testing.webp",
    alt: "Clinician conducting corneal light reflex and cover test"
  },
  {
    number: "05",
    title: "Prism Bar Measurements (PCT)",
    shortDesc: "Prisms help measure the angle of misalignment at near and distance and, when useful, in different directions of gaze.",
    image: "/images/squint/prism-bar-measurements.webp",
    alt: "Eye alignment examination using an ophthalmic prism bar"
  },
  {
    number: "06",
    title: "Ocular Motility & Binocular Function",
    shortDesc: "The doctor checks how each eye moves and how well the eyes work together. Binocular function testing may include stereopsis, or depth perception.",
    image: "/images/squint/ocular-motility-binocular-function.webp",
    alt: "Clinician evaluating extraocular eye movements and ocular motility"
  },
  {
    number: "07",
    title: "Dilated Eye Health Examination",
    shortDesc: "An examination of the cornea, lens, retina and optic nerve can help identify eye conditions that affect vision or contribute to misalignment.",
    image: "/images/squint/dilated-eye-health-examination.webp",
    alt: "Comprehensive slit-lamp and dilated retinal eye health examination"
  }
];

export default function SquintEvaluationWorkup() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const totalSteps = EVALUATION_STEPS.length;

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setActiveIndex(index);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % totalSteps;
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 300);
      return next;
    });
  }, [totalSteps]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev - 1 + totalSteps) % totalSteps;
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 300);
      return next;
    });
  }, [totalSteps]);

  // Automatic rotation approximately every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  const currentStep = EVALUATION_STEPS[activeIndex];

  return (
    <div className={styles.workupSection}>
      {/* PART A — INTRODUCTORY AREA (STATIC) */}
      <p className={styles.introText}>
        A comprehensive assessment evaluates visual function, eye movements, alignment and eye health. The doctor selects tests based on age, symptoms and examination findings. Some patients may need additional investigations, such as blood tests, imaging or specialist assessment. The centre can discuss which tests or referrals are appropriate.
      </p>

      {/* PART B — INTERACTIVE EVALUATION CAROUSEL */}
      <div
        className={styles.carouselContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label="How Squint is Evaluated Steps"
        tabIndex={0}
      >
        <div className={styles.carouselStage}>
          {/* Previous Arrow Button */}
          <button
            type="button"
            className={`${styles.navArrow} ${styles.prevArrow}`}
            onClick={prevSlide}
            aria-label="Previous evaluation step"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Main Feature Card */}
          <article
            className={styles.featureCard}
            role="group"
            aria-roledescription="slide"
            aria-label={`Step ${currentStep.number} of ${totalSteps}: ${currentStep.title}`}
            id={`eval-slide-${activeIndex}`}
          >
            <div className={styles.cardInner}>
              {/* Left Column: Medical Photograph */}
              <div className={styles.cardMedia}>
                <div
                  className={`${styles.imageFrame} ${
                    isTransitioning ? styles.imageFading : ""
                  }`}
                >
                  <Image
                    src={currentStep.image}
                    alt={currentStep.alt}
                    fill
                    sizes="(min-width: 960px) 420px, 90vw"
                    className={styles.slideImage}
                    priority={activeIndex === 0}
                  />
                </div>
              </div>

              {/* Right Column: Step details */}
              <div
                className={`${styles.cardBody} ${
                  isTransitioning ? styles.contentFading : ""
                }`}
              >
                <span className={styles.stepBadge}>{currentStep.number}</span>
                <h3 className={styles.stepTitle}>{currentStep.title}</h3>
                <div className={styles.stepDivider} aria-hidden="true" />
                <p className={styles.stepDesc}>{currentStep.shortDesc}</p>
              </div>
            </div>
          </article>

          {/* Next Arrow Button */}
          <button
            type="button"
            className={`${styles.navArrow} ${styles.nextArrow}`}
            onClick={nextSlide}
            aria-label="Next evaluation step"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div
          className={styles.dotsTrack}
          role="tablist"
          aria-label="Slide indicators"
        >
          {EVALUATION_STEPS.map((step, i) => (
            <button
              key={step.number}
              type="button"
              className={`${styles.dot} ${
                i === activeIndex ? styles.dotActive : ""
              }`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${step.number}: ${step.title}`}
              aria-selected={i === activeIndex}
              role="tab"
            />
          ))}
        </div>

        {/* Numbered Navigation Items (7 Tabs) */}
        <nav
          className={styles.tabsNav}
          aria-label="Evaluation Steps Navigation"
          role="tablist"
        >
          {EVALUATION_STEPS.map((step, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={step.number}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`eval-slide-${i}`}
                className={`${styles.tabItem} ${
                  isActive ? styles.tabActive : ""
                }`}
                onClick={() => {
                  goToSlide(i);
                  tabRefs.current[i]?.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center"
                  });
                }}
              >
                <span className={styles.tabBadge}>{step.number}</span>
                <span className={styles.tabTitle}>{step.title}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
