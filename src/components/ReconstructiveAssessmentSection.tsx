"use client";

import React from "react";
import Image from "next/image";
import styles from "./ReconstructiveAssessmentSection.module.css";

/* ============================================================
   Pure Vector Icons with high clinical clarity
   ============================================================ */

/* 1. Evaluation: Eye examined with magnifying glass */
function EvaluationMagnifierIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* Eye shape */}
      <path
        d="M6 22C10 14 16 9 22 9C28 9 34 14 38 22C34 30 28 35 22 35C16 35 10 30 6 22Z"
        stroke="#0B3847"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Iris */}
      <circle cx="21" cy="22" r="6.5" fill="#4A8B9E" fillOpacity="0.25" stroke="#0B3847" strokeWidth="2" />
      {/* Pupil */}
      <circle cx="21" cy="22" r="3" fill="#0B3847" />
      {/* Magnifier glass */}
      <circle cx="27" cy="21" r="6" fill="#FDF1E7" stroke="#0B3847" strokeWidth="2.2" />
      {/* Magnifier handle */}
      <path d="M31.5 25.5L37 31" stroke="#C05818" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* 2. Diagnosis and Planning: Medical clipboard with checklist */
function DiagnosisClipboardIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* Clipboard board */}
      <rect x="10" y="8" width="24" height="30" rx="3" fill="#FFFFFF" stroke="#0B3847" strokeWidth="2.4" />
      {/* Top Clip */}
      <path
        d="M17 6H27C27.55 6 28 6.45 28 7V9C28 9.55 27.55 10 27 10H17C16.45 10 16 9.55 16 9V7C16 6.45 16.45 6 17 6Z"
        fill="#0B3847"
      />
      {/* Checklist rows: Orange checkmark + text line */}
      <path d="M14 16L16 18L19 14.5" stroke="#C05818" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="16.5" x2="30" y2="16.5" stroke="#0B3847" strokeWidth="2" strokeLinecap="round" />

      <path d="M14 23L16 25L19 21.5" stroke="#C05818" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="23.5" x2="30" y2="23.5" stroke="#0B3847" strokeWidth="2" strokeLinecap="round" />

      <path d="M14 30L16 32L19 28.5" stroke="#C05818" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="30.5" x2="28" y2="30.5" stroke="#0B3847" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* 3. Surgical or Medical Management: Surgical scalpel */
function TreatmentScalpelIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* Metallic sharp blade */}
      <path
        d="M26 12L34 8C33 13 30 17 26 18L23 15L26 12Z"
        fill="#E8F4F8"
        stroke="#0B3847"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Blade spine highlight */}
      <line x1="27" y1="13" x2="31" y2="10" stroke="#C05818" strokeWidth="1.6" strokeLinecap="round" />
      {/* Blue instrument handle */}
      <path
        d="M23 15L11 31C10 32.5 10.5 34 12 34.5C13.5 35 15 34 16 32.5L26 18L23 15Z"
        fill="#4A8B9E"
        stroke="#0B3847"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Grip ridges */}
      <line x1="18" y1="22" x2="21" y2="24" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="26" x2="18" y2="28" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* 4. Recovery and Follow-up: Protective shield with eye */
function RecoveryShieldIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* Protective Shield */}
      <path
        d="M22 8L32 12V22C32 29 27.5 34 22 37C16.5 34 12 29 12 22V12L22 8Z"
        fill="#FFFFFF"
        stroke="#0B3847"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Eye inside shield */}
      <path
        d="M16 22C18 19 20 17.5 22 17.5C24 17.5 26 19 28 22C26 25 24 26.5 22 26.5C20 26.5 18 25 16 22Z"
        stroke="#0B3847"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="22" r="3" fill="#4A8B9E" />
      <circle cx="22" cy="22" r="1.3" fill="#0B3847" />
    </svg>
  );
}

/* Chevron right for step card */
function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.cardArrow}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export interface ReconstructiveAssessmentSectionProps {
  id?: string;
  kicker?: string;
  headingTop?: string;
  headingMiddle?: string;
  headingAccent?: string;
  lead?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageBadgeText?: string;
}

const ASSESSMENT_STEPS = [
  {
    stepNumber: "01",
    title: "Detailed evaluation",
    desc: "The doctor examines your eyelid position, eye-surface health, tear drainage, vision-related concerns and your symptoms.",
    icon: <EvaluationMagnifierIcon />,
  },
  {
    stepNumber: "02",
    title: "Diagnosis and planning",
    desc: "The plan is based on whether the issue affects comfort, eye protection, vision, appearance or a combination of these.",
    icon: <DiagnosisClipboardIcon />,
  },
  {
    stepNumber: "03",
    title: "Surgical or medical management",
    desc: "Depending on the condition, the doctor may recommend a corrective procedure or another suitable treatment plan.",
    icon: <TreatmentScalpelIcon />,
  },
  {
    stepNumber: "04",
    title: "Recovery and follow-up",
    desc: "Recovery depends on the condition and procedure performed. Follow-up visits help monitor healing and outcome.",
    icon: <RecoveryShieldIcon />,
  },
];

export default function ReconstructiveAssessmentSection({
  id = "journey",
  kicker = "WHAT TO EXPECT",
  headingTop = "What an",
  headingMiddle = "assessment",
  headingAccent = "involves",
  lead = "Care is planned around eye protection, comfort, vision-related concerns and the cause of the condition.",
  imageSrc = "/images/reconstructive/assessment/clinical-assessment-exam.webp",
  imageAlt = "Dr. Poonam Jain performing an in-depth slit-lamp eye examination and clinical consultation",
  imageBadgeText = "Clinical Slit-Lamp Assessment",
}: ReconstructiveAssessmentSectionProps) {
  return (
    <section id={id} className={styles.sectionWrapper} aria-labelledby="assessment-h">
      {/* Background Subtle Dot Grid in Top-Right */}
      <div className={styles.dotGridTopRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* Main 2-Column Grid */}
        <div className={styles.mainGrid}>
          {/* Left Column: Eyebrow, Heading, Lead & Grounded Rectangular Clinical Photo */}
          <div className={styles.leftCol}>
            {/* Kicker */}
            <div className={styles.kickerRow}>
              <span className={styles.kickerLine} aria-hidden="true" />
              <p className={styles.kickerText}>{kicker}</p>
            </div>

            {/* Heading */}
            <h2 id="assessment-h" className={styles.heading}>
              <span className={styles.headingMain}>{headingTop}</span>
              <span className={styles.headingMain}>{headingMiddle}</span>
              <span className={`${styles.headingAccent} title-secondary`}>{headingAccent}</span>
            </h2>

            {/* Subtitle / Lead */}
            <p className={styles.leadText}>{lead}</p>

            {/* Rectangular Clinical Consultation Photo */}
            <div className={styles.photoWrapper}>
              <div className={styles.photoFrame}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={1200}
                  height={750}
                  className={styles.examImage}
                  priority={false}
                />
                {imageBadgeText && (
                  <div className={styles.photoBadge} aria-hidden="true">
                    <span className={styles.photoBadgeDot} />
                    <span>{imageBadgeText}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Continuous Vertical Timeline + 4 Step Cards */}
          <div className={styles.rightCol}>
            {/* 4 Step Cards with Numbered Nodes */}
            {ASSESSMENT_STEPS.map((step) => (
              <div key={step.stepNumber} className={styles.stepRow}>
                {/* Numbered Circular Node directly on the timeline track */}
                <span className={styles.stepNode} aria-hidden="true">
                  {step.stepNumber}
                </span>

                {/* Step Card */}
                <div
                  className={styles.stepCard}
                  role="article"
                  aria-label={`Step ${step.stepNumber}: ${step.title}`}
                >
                  {/* Fully Rounded Circle Icon Container */}
                  <div className={styles.cardIconWrapper} aria-hidden="true">
                    {step.icon}
                  </div>

                  {/* Card Content */}
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                    <p className={styles.cardDesc}>{step.desc}</p>
                  </div>

                  {/* Chevron Right */}
                  <ChevronRightIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
