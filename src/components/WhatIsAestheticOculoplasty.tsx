import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/config/site";
import { CalendarIcon } from "./Icons";
import styles from "./WhatIsAestheticOculoplasty.module.css";

/**
 * Eye icon with twin orange star sparkles for "Improve Appearance"
 */
function EyeWithSparklesIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 68 44"
      fill="none"
      className={className}
      width="48"
      height="32"
      aria-hidden="true"
    >
      {/* Eye contour */}
      <path
        d="M4 22C10.5 11 21 5.5 32 5.5C43 5.5 53.5 11 60 22C53.5 33 43 38.5 32 38.5C21 38.5 10.5 33 4 22Z"
        stroke="#0C454B"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Iris ring */}
      <circle cx="32" cy="22" r="8.5" stroke="#0C454B" strokeWidth="3" />
      {/* Pupil */}
      <circle cx="32" cy="22" r="3.5" fill="#0C454B" />

      {/* Primary sparkle star (larger, top-right) */}
      <path
        d="M58 2 C58 5.8 60.8 8.6 64.5 8.6 C60.8 8.6 58 11.4 58 15.2 C58 11.4 55.2 8.6 51.5 8.6 C55.2 8.6 58 5.8 58 2 Z"
        fill="#C35626"
      />
      {/* Secondary sparkle star (smaller, right) */}
      <path
        d="M63 15 C63 17.2 64.6 18.8 66.8 18.8 C64.6 18.8 63 20.4 63 22.6 C63 20.4 61.4 18.8 59.2 18.8 C61.4 18.8 63 17.2 63 15 Z"
        fill="#C35626"
      />
    </svg>
  );
}

/**
 * Shield icon with cross (+) for "Eye Health Comes First"
 */
function ShieldCrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      width="34"
      height="34"
      aria-hidden="true"
    >
      <path
        d="M18 3.5L6.5 8.2V17.2C6.5 24.5 11.4 31.2 18 33C24.6 31.2 29.5 24.5 29.5 17.2V8.2L18 3.5Z"
        stroke="#0C454B"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 12.5V23.5M12.5 18H23.5"
        stroke="#0C454B"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Line art lotus flower icon for "Natural-looking Results"
 */
function LotusFlowerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 46 38"
      fill="none"
      className={className}
      width="36"
      height="32"
      aria-hidden="true"
    >
      {/* Center upright petal */}
      <path
        d="M23 4C20.5 10.5 20 18.5 23 27C26 18.5 25.5 10.5 23 4Z"
        stroke="#0C454B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner-left petal */}
      <path
        d="M21 13.5C15.5 15.5 12 20 13.5 26.5C17.2 26.5 20.5 23.5 22 20"
        stroke="#0C454B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner-right petal */}
      <path
        d="M25 13.5C30.5 15.5 34 20 32.5 26.5C28.8 26.5 25.5 23.5 24 20"
        stroke="#0C454B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Outer-left petal */}
      <path
        d="M13.5 21.5C7.5 22 4.5 25.5 6.5 29C11.2 30 17 28.5 19 26.8"
        stroke="#0C454B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Outer-right petal */}
      <path
        d="M32.5 21.5C38.5 22 41.5 25.5 39.5 29C34.8 30 29 28.5 27 26.8"
        stroke="#0C454B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base water line curve */}
      <path
        d="M14.5 29.5C18.5 31.8 27.5 31.8 31.5 29.5"
        stroke="#0C454B"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export interface WhatIsAestheticOculoplastyProps {
  /** Optional breadcrumb flag */
  showBreadcrumb?: boolean;
  /** Current page crumb title */
  crumb?: string;
  /** Top kicker text */
  kicker?: string;
  /** Main heading line 1 in teal */
  titleTeal?: string;
  /** Main heading line 2 in terracotta orange */
  titleOrange?: string;
  /** Sub-headline text */
  subheading?: string;
  /** Body paragraph text */
  paragraph?: string;
  /** CTA button text */
  buttonLabel?: string;
  /** CTA button link destination */
  buttonHref?: string;
  /** Doctor photo url */
  doctorImage?: string;
  /** Doctor photo alt text */
  doctorAlt?: string;
  /** Top card image url (above eye image) */
  procedureImage?: string;
  /** Top card image alt text */
  procedureAlt?: string;
  /** Top card badge label */
  procedureLabel?: string;
  /** Eye photo url */
  eyeImage?: string;
  /** Eye photo alt text */
  eyeAlt?: string;
  /** Section ID for in-page anchors */
  id?: string;
}

export default function WhatIsAestheticOculoplasty({
  showBreadcrumb = false,
  crumb = "Aesthetic Oculoplasty",
  kicker = "WHAT IS AESTHETIC OCULOPLASTY?",
  titleTeal = "Aesthetic",
  titleOrange = "Oculoplasty",
  subheading = "Enhancing both function and appearance around your eyes.",
  paragraph = "Aesthetic oculoplasty focuses on improving the appearance of the eyelids, under-eye area and surrounding eye region while keeping eye safety and natural results as the priority.",
  buttonLabel = "Book a Consultation",
  buttonHref = `${LINKS.contact}#request`,
  doctorImage = "/images/aesthetic/aesthetic-doctor-treatment-focused.webp",
  doctorAlt = "Dr. Poonam Jain performing specialized eye examination and treatment at Namokar Eye & Oculoplasty Centre",
  procedureImage = "/images/aesthetic/aesthetic-procedure-card.webp",
  procedureAlt = "Delicate eyelid aesthetic evaluation and periocular contour care at Namokar Centre",
  procedureLabel = "Improve Appearance",
  eyeImage = "/images/aesthetic/aesthetic-eye-master.webp",
  eyeAlt = "Close-up of refreshed aesthetic eyelid contour and natural eyelashes",
  id = "what-is-aesthetic-oculoplasty",
}: WhatIsAestheticOculoplastyProps) {
  return (
    <section id={id} className={styles.sectionWrap} aria-label={kicker}>
      <div className={styles.bottomWaveWrap} aria-hidden="true" />
      {/* Decorative Bottom-Left Dot Matrix (6x4 grid) */}
      <div className={styles.dotGrid} aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={styles.dot} />
        ))}
      </div>

      <div className={styles.container}>
        {/* Optional Breadcrumb Navigation */}
        {showBreadcrumb && (
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className={styles.crumbSep} aria-hidden="true">&gt;</li>
              <li>
                <Link href={LINKS.allServices}>Services</Link>
              </li>
              <li className={styles.crumbSep} aria-hidden="true">&gt;</li>
              <li aria-current="page" className={styles.crumbCurrent}>{crumb}</li>
            </ol>
          </nav>
        )}

        {/* Main 2-Column Responsive Layout */}
        <div className={styles.mainGrid}>
          {/* Left Column: Heading, Subheading, Copy & CTA */}
          <div className={styles.leftCol}>
            {/* Kicker with Orange Bar */}
            <div className={styles.kickerWrap}>
              <span className={styles.kickerBar} aria-hidden="true" />
              <span className={styles.kickerText}>{kicker}</span>
            </div>

            {/* Main Headline */}
            <h1 className={styles.heading}>
              <span className={styles.titleTeal}>{titleTeal}</span>
              <span className={styles.titleOrange}>{titleOrange}</span>
            </h1>

            {/* Sub-headline */}
            <p className={styles.subheading}>{subheading}</p>

            {/* Explanatory Paragraph */}
            <p className={styles.paragraph}>{paragraph}</p>

            {/* Action CTA Button */}
            <Link href={buttonHref} className={styles.ctaBtn}>
              <span className={styles.btnCalendarIcon} aria-hidden="true">
                <CalendarIcon width={18} height={18} />
              </span>
              <span>{buttonLabel}</span>
              <span className={styles.btnArrow} aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Right Column: Composite Visuals & Feature Bar */}
          <div className={styles.rightCol}>
            {/* Top Visual Group */}
            <div className={styles.visualTopRow}>
              {/* Doctor Consultation Image Card */}
              <div className={styles.doctorCard}>
                <Image
                  src={doctorImage}
                  alt={doctorAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 36vw, (min-width: 600px) 50vw, 100vw"
                  className={styles.doctorImg}
                />
              </div>

              {/* Stacked Right Cards */}
              <div className={styles.sideCardsCol}>
                {/* 1. Suitable Image Card Above Eye: Eyelid Aesthetic Care / Improve Appearance */}
                <div className={styles.procedureCard}>
                  <Image
                    src={procedureImage}
                    alt={procedureAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 18vw, (min-width: 600px) 25vw, 50vw"
                    className={styles.procedureImg}
                  />
                  {procedureLabel && (
                    <div className={styles.procedureBadge}>
                      <span className={styles.procedureSparkle} aria-hidden="true">&#10022;</span>
                      <span>{procedureLabel}</span>
                    </div>
                  )}
                </div>

                {/* 2. Close-up Eye Photo Card */}
                <div className={styles.eyeCard}>
                  <Image
                    src={eyeImage}
                    alt={eyeAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 18vw, (min-width: 600px) 25vw, 50vw"
                    className={styles.eyeImg}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Floating Feature Card */}
            <div className={styles.featureBarCard} role="list">
              {/* Feature 1: Eye Health */}
              <div className={styles.featureItem} role="listitem">
                <div className={styles.featureIconBox} aria-hidden="true">
                  <ShieldCrossIcon />
                </div>
                <div className={styles.featureTextGroup}>
                  <div className={styles.featureTitle}>Eye Health Comes First</div>
                  <div className={styles.featureSubtitle}>A safe and careful approach.</div>
                </div>
              </div>

              {/* Vertical separator */}
              <div className={styles.featureDivider} aria-hidden="true" />

              {/* Feature 2: Natural Results */}
              <div className={styles.featureItem} role="listitem">
                <div className={styles.featureIconBox} aria-hidden="true">
                  <LotusFlowerIcon />
                </div>
                <div className={styles.featureTextGroup}>
                  <div className={styles.featureTitle}>Natural-looking Results</div>
                  <div className={styles.featureSubtitle}>Subtle, refined and long-lasting.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

