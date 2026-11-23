"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./RefractiveEvaluationWorkup.module.css";

export interface RefractiveStep {
  number: string;
  title: string;
  shortDesc: string;
  image: string;
  alt: string;
}

export const REFRACTIVE_EVALUATION_STEPS: RefractiveStep[] = [
  {
    number: "01",
    title: "Visual Acuity & Refraction",
    shortDesc: "Uncorrected and spectacle-corrected vision are measured to establish the prescription. When needed, cycloplegic drops relax focusing to reveal hidden refractive error. Previous prescriptions help the doctor assess whether vision has been stable enough for treatment.",
    image: "/images/squint/cycloplegic-refraction.webp",
    alt: "Clinical optometrist performing precise refraction evaluation with trial lenses"
  },
  {
    number: "02",
    title: "Corneal Topography & Tomography",
    shortDesc: "Maps of the front and back corneal surfaces assess curvature and symmetry. Topography and tomography help identify irregular astigmatism, suspected keratoconus or other patterns that may make corneal laser treatment unsuitable.",
    image: "/images/refractive/corneal-mapping.svg",
    alt: "Educational schematic of front and back corneal curvature maps"
  },
  {
    number: "03",
    title: "Corneal Thickness Measurement",
    shortDesc: "Optical or ultrasonic pachymetry measures corneal thickness. The planned correction is assessed against the tissue that would remain, helping the surgeon judge structural safety. Thickness alone does not determine whether laser treatment is suitable.",
    image: "/images/refractive/corneal-thickness.svg",
    alt: "Educational cross-section showing corneal thickness measurement"
  },
  {
    number: "04",
    title: "Ocular Surface & Tear Film Assessment",
    shortDesc: "Slit-lamp and tear-film tests assess dryness, surface inflammation and tear stability. Problems may need treatment before measurements are repeated or surgery considered. Ocular-surface health also affects comfort and the clarity of vision during recovery.",
    image: "/images/aesthetic/doctor-exam-dsc06796.webp",
    alt: "Ophthalmologist examining ocular surface health and tear film with slit lamp"
  },
  {
    number: "05",
    title: "Anterior Chamber & Endothelial Assessment",
    shortDesc: "For ICL or IPCL, imaging and endothelial assessment check chamber depth, cell density and measurements needed for lens sizing. The aim is appropriate clearance from the natural lens and cornea; suitability remains an individual clinical decision.",
    image: "/images/refractive/anterior-chamber.svg",
    alt: "Educational diagram of anterior chamber depth, lens clearance and endothelial cells"
  },
  {
    number: "06",
    title: "Dilated Retinal & Optic Nerve Examination",
    shortDesc: "Dilating drops allow examination of the retina, macula and optic nerve. In myopic eyes, peripheral screening helps detect lattice degeneration or retinal tears. Findings may require further assessment or treatment before refractive surgery is considered.",
    image: "/images/squint/dilated-eye-health-examination.webp",
    alt: "Detailed dilated retinal examination of the fundus and optic nerve"
  },
  {
    number: "07",
    title: "Individualized Treatment Discussion",
    shortDesc: "The doctor reviews your results, daily visual needs and expectations, then discusses suitable options, risks, recovery and alternatives. Ask where a procedure would be performed and what follow-up it requires before deciding whether to proceed.",
    image: "/images/squint/detailed-clinical-history.webp",
    alt: "Doctor discussing customized refractive surgery options with patient"
  }
];

export default function RefractiveEvaluationWorkup() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const totalSteps = REFRACTIVE_EVALUATION_STEPS.length;

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
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const currentStep = REFRACTIVE_EVALUATION_STEPS[activeIndex];

  return (
    <div className={styles.workupSection}>
      <p className={styles.introText}>
        Before recommending treatment, the doctor assesses your prescription, corneal shape and thickness, tear film and internal eye health. These seven steps guide procedure selection and identify concerns that may make surgery unsuitable.
      </p>

      {/* Carousel Container */}
      <div
        className={styles.carouselContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label="How Eyes Are Evaluated Before Refractive Surgery"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            prevSlide();
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            nextSlide();
          }
        }}
      >
        <div className={styles.carouselStage}>
          {/* Previous Button */}
          <button
            type="button"
            className={styles.navArrow}
            onClick={prevSlide}
            aria-label="Previous evaluation step"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Active Card */}
          <article
            className={styles.featureCard}
            aria-live="polite"
          >
            <div className={styles.cardInner}>
              {/* Media Column (Left) */}
              <div className={styles.cardMedia}>
                <div className={`${styles.imageFrame} ${isTransitioning ? styles.imageFading : ""}`}>
                  <Image
                    key={currentStep.image}
                    src={currentStep.image}
                    alt={currentStep.alt}
                    fill
                    sizes="(max-width: 860px) 100vw, 480px"
                    className={styles.slideImage}
                    priority
                  />
                </div>
              </div>

              {/* Text Body Column (Right) */}
              <div className={`${styles.cardBody} ${isTransitioning ? styles.contentFading : ""}`}>
                <span className={styles.stepBadge}>{currentStep.number}</span>
                <h3 className={styles.stepTitle}>{currentStep.title}</h3>
                <div className={styles.stepDivider} aria-hidden="true" />
                <p className={styles.stepDesc}>{currentStep.shortDesc}</p>
              </div>
            </div>
          </article>

          {/* Next Button */}
          <button
            type="button"
            className={styles.navArrow}
            onClick={nextSlide}
            aria-label="Next evaluation step"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className={styles.dotsTrack} role="tablist" aria-label="Evaluation Steps">
          {REFRACTIVE_EVALUATION_STEPS.map((step, idx) => (
            <button
              key={step.number}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Go to step ${step.number}: ${step.title}`}
              className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ""}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>

        {/* Step Navigation Tabs */}
        <div className={styles.tabsNav} role="tablist" aria-label="Evaluation Step Navigation">
          {REFRACTIVE_EVALUATION_STEPS.map((step, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={step.number}
                ref={(el) => { tabRefs.current[idx] = el; }}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.tabItem} ${isActive ? styles.tabActive : ""}`}
                onClick={() => goToSlide(idx)}
              >
                <span className={styles.tabBadge}>{step.number}</span>
                <p className={styles.tabTitle}>{step.title}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
