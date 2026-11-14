"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./AssessmentJourneySection.module.css";

/**
 * 1. Consultation Icon (Eye with corner scan brackets)
 */
function ConsultationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="26"
      height="26"
      aria-hidden="true"
    >
      <path d="M3 8V5a2 2 0 0 1 2-2h3" />
      <path d="M16 3h3a2 2 0 0 1 2 2v3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
      <path d="M6 12s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4Z" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * 2. Personalized Plan Icon (Medical clipboard with medical plus)
 */
function PersonalizedPlanIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="26"
      height="26"
      aria-hidden="true"
    >
      <path d="M9 3h6a1 1 0 0 1 1 1v1.5H8V4a1 1 0 0 1 1-1Z" />
      <rect x="4.5" y="5.5" width="15" height="15.5" rx="2.5" />
      <path d="M12 9.5v6M9 12.5h6" strokeWidth="2.4" />
    </svg>
  );
}

/**
 * 3. Procedure Icon (Angled surgical scalpel / instrument with baseline)
 */
function ProcedureIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="26"
      height="26"
      aria-hidden="true"
    >
      <path d="m18.5 3.5-4.5 4.5-6 6c-1.5 1.5-3 4-3 4s2.5-1.5 4-3l6-6 4.5-4.5c.7-.7.7-1.8 0-2.2-.4-.4-1.3-.4-2 .2Z" />
      <path d="M4 20.5h16" strokeWidth="2.2" />
    </svg>
  );
}

/**
 * 4. Follow-up Icon (Calendar with clock)
 */
function FollowUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="26"
      height="26"
      aria-hidden="true"
    >
      <path d="M8 2v3M16 2v3" />
      <path d="M4 8.5h16" />
      <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
      <path d="M4 5v14a2 2 0 0 0 2 2h5" />
      <circle cx="8" cy="12.5" r="0.9" fill="currentColor" />
      <circle cx="12" cy="12.5" r="0.9" fill="currentColor" />
      <circle cx="8" cy="16.5" r="0.9" fill="currentColor" />
      <circle cx="16.5" cy="16.5" r="4.5" fill="#ffffff" />
      <circle cx="16.5" cy="16.5" r="4.5" />
      <path d="M16.5 14.5v2l1.6.9" strokeWidth="1.8" />
    </svg>
  );
}

export interface StepItem {
  title: string;
  text: string;
  stepNumber?: string;
  icon?: React.ReactNode;
}

const DEFAULT_STEPS: StepItem[] = [
  {
    stepNumber: "01",
    title: "Consultation",
    text: "The doctor evaluates the eyelids, under-eye area, facial structure, eye health and your expectations.",
    icon: <ConsultationIcon />,
  },
  {
    stepNumber: "02",
    title: "Personalized plan",
    text: "Treatment is planned based on whether the concern is cosmetic, functional or both.",
    icon: <PersonalizedPlanIcon />,
  },
  {
    stepNumber: "03",
    title: "Procedure",
    text: "Depending on the concern, treatment may be surgical or non-surgical.",
    icon: <ProcedureIcon />,
  },
  {
    stepNumber: "04",
    title: "Follow-up",
    text: "Post-procedure care and review are advised based on the treatment performed.",
    icon: <FollowUpIcon />,
  },
];

const ICONS_BY_INDEX = [
  <ConsultationIcon key="consultation" />,
  <PersonalizedPlanIcon key="plan" />,
  <ProcedureIcon key="procedure" />,
  <FollowUpIcon key="followup" />,
];

export interface AssessmentJourneySectionProps {
  id?: string;
  kicker?: string;
  heading?: string;
  lead?: string;
  journey?: Array<{ title: string; text: string }>;
  imageSrc?: string;
  imageAlt?: string;
}

export default function AssessmentJourneySection({
  id = "journey",
  kicker = "WHAT TO EXPECT",
  heading = "What an assessment involves",
  lead = "Treatment is planned around your eye health, facial structure, concerns and expectations.",
  journey,
  imageSrc = "/images/aesthetic/assessment-slit-exam-hq.webp",
  imageAlt = "Patient undergoing a slit-lamp eye examination and clinical assessment",
}: AssessmentJourneySectionProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const stepCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // If custom journey steps were passed, map them and assign fallback icons/numbers
  const steps: StepItem[] = journey
    ? journey.map((item, index) => ({
        stepNumber: String(index + 1).padStart(2, "0"),
        title: item.title,
        text: item.text,
        icon: ICONS_BY_INDEX[index % ICONS_BY_INDEX.length],
      }))
    : DEFAULT_STEPS;

  // Sync active step indicator on scroll as user scrolls past step cards
  useEffect(() => {
    const cards = stepCardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          const topVisible = intersecting.reduce((best, curr) =>
            curr.intersectionRatio > best.intersectionRatio ? curr : best
          );
          const idxVal = topVisible.target.getAttribute("data-step-index");
          if (idxVal !== null) {
            setActiveStep(Number(idxVal));
          }
        }
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0.2, 0.5, 0.8],
      }
    );

    cards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <section id={id} className={styles.sectionWrapper} aria-labelledby="assessment-heading">
      {/* Decorative Top-Left Organic Curved Wave */}
      <div className={styles.bgWaveTopLeft} aria-hidden="true">
        <svg viewBox="0 0 420 320" fill="none" className={styles.waveSvg} preserveAspectRatio="none">
          <path
            d="M-50,-20 C80,60 120,180 240,160 C340,140 380,240 420,290 L420,-20 Z"
            fill="#FFF5ED"
            fillOpacity="0.8"
          />
        </svg>
      </div>

      {/* Decorative Bottom-Right Organic Curved Wave */}
      <div className={styles.bgWaveBottomRight} aria-hidden="true">
        <svg viewBox="0 0 460 340" fill="none" className={styles.waveSvg} preserveAspectRatio="none">
          <path
            d="M120,340 C190,260 280,290 350,210 C400,150 440,130 460,80 L460,340 Z"
            fill="#FAF2EB"
            fillOpacity="0.75"
          />
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Kicker, Heading, Description & Slit-Lamp Exam Photo */}
          <div className={styles.leftCol}>
            {/* Kicker with rust-orange accent bar */}
            <div className={styles.kickerRow}>
              <span className={styles.kickerLine} aria-hidden="true" />
              <p className={styles.kickerText}>{kicker}</p>
            </div>

            {/* Main Section Title */}
            <h2 id="assessment-heading" className={styles.title}>
              {heading}
            </h2>

            {/* Description Lead */}
            <p className={styles.lead}>{lead}</p>

            {/* Clinical Slit-Lamp Exam Photo */}
            <div className={styles.photoWrapper}>
              <div className={styles.photoFrame}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={800}
                  height={480}
                  className={styles.examImage}
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Continuous Vertical Timeline + 4 Step Cards */}
          <div className={styles.rightCol}>
            <div className={styles.timelineContainer}>
              {/* Continuous vertical timeline connector line */}
              <div className={styles.timelineTrack} aria-hidden="true" />

              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                const num = step.stepNumber || String(idx + 1).padStart(2, "0");

                return (
                  <div
                    key={step.title || idx}
                    ref={(el) => {
                      stepCardRefs.current[idx] = el;
                    }}
                    data-step-index={idx}
                    className={`${styles.stepRow} ${isActive ? styles.stepRowActive : ""}`}
                    onMouseEnter={() => setActiveStep(idx)}
                    onClick={() => setActiveStep(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveStep(idx);
                      }
                    }}
                    aria-label={`Step ${num}: ${step.title}`}
                  >
                    {/* Timeline Badge Node */}
                    <div className={styles.stepNode}>
                      <span
                        className={`${styles.stepBadge} ${isActive ? styles.stepBadgeActive : ""}`}
                      >
                        {num}
                      </span>
                    </div>

                    {/* Direct horizontal connector arm */}
                    <div
                      className={`${styles.stepConnector} ${isActive ? styles.stepConnectorActive : ""}`}
                      aria-hidden="true"
                    />

                    {/* Step Card */}
                    <div className={`${styles.stepCard} ${isActive ? styles.stepCardActive : ""}`}>
                      <div
                        className={`${styles.cardIconWrap} ${isActive ? styles.cardIconWrapActive : ""}`}
                        aria-hidden="true"
                      >
                        {step.icon || ICONS_BY_INDEX[idx % ICONS_BY_INDEX.length]}
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.cardHeaderRow}>
                          <h3 className={styles.cardTitle}>{step.title}</h3>
                          <span
                            className={`${styles.cardStepTag} ${isActive ? styles.cardStepTagActive : ""}`}
                          >
                            STEP {num}
                          </span>
                        </div>
                        <p className={styles.cardText}>{step.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
