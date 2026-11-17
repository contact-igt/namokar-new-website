import React from "react";
import Image from "next/image";
import styles from "./WhatIsBlepharoplasty.module.css";

/* --------------------------------------------------------------------------
   SVG Icons
   -------------------------------------------------------------------------- */

/**
 * Key Benefit 1: Brighter, more alert eyes icon
 */
function AlertEyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="20"
      height="20"
      stroke="#C85A17"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12C5.5 6.5 12 4.5 12 4.5C12 4.5 18.5 6.5 22 12C18.5 17.5 12 19.5 12 19.5C12 19.5 5.5 17.5 2 12Z" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="12" cy="12" r="1.2" fill="#C85A17" />
    </svg>
  );
}

/**
 * Key Benefit 2: Youthful appearance face icon
 */
function YouthfulFaceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="20"
      height="20"
      stroke="#C85A17"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21C7 21 4.5 16 4.5 11.5C4.5 7 8 3.5 12 3.5C16 3.5 19.5 7 19.5 11.5C19.5 16 17 21 12 21Z" />
      <path d="M5.5 8C7 5 10 4 12 4C14 4 17 5 18.5 8" />
      <circle cx="9" cy="11.5" r="0.9" fill="#C85A17" />
      <circle cx="15" cy="11.5" r="0.9" fill="#C85A17" />
      <path d="M9.5 15C10.5 16.2 13.5 16.2 14.5 15" />
    </svg>
  );
}

/**
 * Key Benefit 3: Improved vision / eye shield icon
 */
function ImprovedVisionShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="20"
      height="20"
      stroke="#C85A17"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.5L4 6V11.5C4 16.8 7.4 20.8 12 22C16.6 20.8 20 16.8 20 11.5V6L12 2.5Z" />
      <path d="M7 12C8.8 9.5 12 9.5 12 9.5C12 9.5 15.2 9.5 17 12C15.2 14.5 12 14.5 12 14.5C12 14.5 8.8 14.5 7 12Z" />
      <circle cx="12" cy="12" r="1.8" fill="#C85A17" />
    </svg>
  );
}

/**
 * Indication 1: Heavy or drooping eyelids
 */
function HeavyLidsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="24"
      height="24"
      stroke="#C85A17"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 13C6 6.5 12 4.5 12 4.5C12 4.5 18 6.5 22 13C18 19.5 12 19.5 12 19.5C12 19.5 6 19.5 2 13Z" />
      <path d="M4 11C7 7.5 12 7.5 12 7.5C12 7.5 17 7.5 20 11" strokeWidth="2.2" />
      <circle cx="12" cy="13.5" r="3" />
      <circle cx="12" cy="13.5" r="1.2" fill="#C85A17" />
    </svg>
  );
}

/**
 * Indication 2: Obstructed upper vision / evening fatigue
 */
function ReadingVisionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="24"
      height="24"
      stroke="#C85A17"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

/**
 * Indication 3: Under-eye bags / puffiness or loose lid skin
 */
function EyeBagsGlassesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="24"
      height="24"
      stroke="#C85A17"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="12" r="4" />
      <circle cx="18" cy="12" r="4" />
      <path d="M10 12H14" strokeWidth="2" />
      <path d="M2 12h0.5M21.5 12H22" strokeWidth="2" />
    </svg>
  );
}

/**
 * Indication 4: Restore comfort & eye protection
 */
function ShieldCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="24"
      height="24"
      stroke="#C85A17"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.5L4 6V11.5C4 16.8 7.4 20.8 12 22C16.6 20.8 20 16.8 20 11.5V6L12 2.5Z" />
      <path d="M8.5 12L11 14.5L15.5 10" strokeWidth="2.1" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Types & Component
   -------------------------------------------------------------------------- */

export interface BlepharoplastyBenefit {
  icon: "alertEye" | "youthfulFace" | "improvedVision";
  text: string;
}

export interface BlepharoplastyIndication {
  icon: "heavyLids" | "readingNight" | "glasses" | "shieldCheck";
  text: string;
}

export interface WhatIsBlepharoplastyProps {
  id?: string;
  category?: string;
  titleTeal?: string;
  titleOrange?: string;
  subheading?: string;
  paragraph?: string;
  imageSrc?: string;
  imageAlt?: string;
  benefits?: BlepharoplastyBenefit[];
  indicationsTitle?: string;
  indications?: BlepharoplastyIndication[];
}

export default function WhatIsBlepharoplasty({
  id = "what-is-blepharoplasty",
  category = "OCULOPLASTY & EYE-AREA CARE",
  titleTeal = "What is",
  titleOrange = "Blepharoplasty?",
  subheading = "Restore a more youthful, refreshed look",
  paragraph = "Blepharoplasty is surgery on the eyelids. It removes or repositions excess skin and, where needed, fat from the upper lids, the lower lids or both. It may be considered when this extra tissue weighs on the eyelids, either because it affects vision and comfort, or because someone is unhappy with how their eyes look.",
  imageSrc = "/images/blepharoplasty/blepharoplasty-indian-macro-v2.webp",
  imageAlt = "High-end clinical macro close-up of Indian patient eye with delicate eyelid crease guideline arc and doctor gently elevating temple",
  benefits = [
    { icon: "alertEye", text: "Brighter, more alert eyes" },
    { icon: "youthfulFace", text: "A more youthful appearance" },
    { icon: "improvedVision", text: "Improved vision (if needed)" },
  ],
  indicationsTitle = "When to Consider Blepharoplasty?",
  indications = [
    {
      icon: "heavyLids",
      text: "Have heavy, tired or drooping eyelids",
    },
    {
      icon: "readingNight",
      text: "Upper lids blocking part of your vision",
    },
    {
      icon: "glasses",
      text: "Bags, puffiness or excess eyelid skin",
    },
    {
      icon: "shieldCheck",
      text: "Wish to restore eye comfort & open alert look",
    },
  ],
}: WhatIsBlepharoplastyProps) {
  return (
    <section id={id} className={styles.sectionWrap} aria-labelledby={`${id}-heading`}>
      {/* Ambient background decoration */}
      <div className={styles.bgDecor} aria-hidden="true">
        <svg
          className={styles.bgDecorSvg}
          viewBox="0 0 1440 760"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="topTealGlow" cx="80%" cy="15%" r="45%">
              <stop offset="0%" stopColor="#D8EFF2" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#EEF7F8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FCF9F6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="peachRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8DFCE" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FAF1E8" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Top-Right Soft Teal Halo */}
          <circle cx="1260" cy="120" r="320" fill="url(#topTealGlow)" />

          {/* Top-Right Concentric Peach Ring Segments */}
          <path
            d="M 880 -40 C 980 180, 1180 290, 1440 240"
            stroke="url(#peachRibbon)"
            strokeWidth="64"
            strokeLinecap="round"
          />
          <path
            d="M 1010 -30 C 1110 160, 1260 230, 1440 180"
            stroke="#FDEEE3"
            strokeWidth="38"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Bottom-Left Soft Peach Contour Ribbon */}
          <path
            d="M -60 520 C 100 580, 150 700, 100 840"
            stroke="#F9E5D6"
            strokeWidth="72"
            opacity="0.7"
          />
          <path
            d="M -30 450 C 140 520, 200 660, 160 840"
            stroke="#FDF0E6"
            strokeWidth="42"
            opacity="0.8"
          />
        </svg>
      </div>

      <div className={styles.container}>
        {/* Main 2-Column Responsive Layout */}
        <div className={styles.mainGrid}>
          {/* Left Column: Heading, Subheading, Copy & CTA */}
          <div className={styles.leftCol}>
            {/* Category / Kicker with terracotta horizontal dash */}
            <div className={styles.kickerWrap}>
              <span className={styles.kickerBar} aria-hidden="true" />
              <span className={styles.kickerText}>{category}</span>
            </div>

            {/* Main Headline */}
            <h2 id={`${id}-heading`} className={styles.heading}>
              <span className={styles.titleTeal}>{titleTeal}</span>
              <span className={`${styles.titleOrange} title-secondary`}>{titleOrange}</span>
            </h2>

            {/* Sub-headline */}
            <p className={styles.subheading}>{subheading}</p>

            {/* Explanatory Paragraph */}
            <p className={styles.paragraph}>{paragraph}</p>
          </div>

          {/* Right Column: Visual Photo Card with correctly displayed Key Benefits */}
          <div className={styles.rightCol}>
            <div className={styles.visualCard}>
              <div className={styles.visualImgWrap}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className={styles.visualImg}
                />
              </div>

              {/* Correctly displayed Key Benefits Card */}
              <aside className={styles.benefitsCard} aria-label="Key Benefits">
                <h3 className={styles.benefitsTitle}>Key Benefits</h3>
                <ul className={styles.benefitsList}>
                  {benefits.map((b, idx) => (
                    <li key={idx} className={styles.benefitItem}>
                      <span className={styles.benefitIconBadge} aria-hidden="true">
                        {b.icon === "alertEye" && <AlertEyeIcon />}
                        {b.icon === "youthfulFace" && <YouthfulFaceIcon />}
                        {b.icon === "improvedVision" && <ImprovedVisionShieldIcon />}
                      </span>
                      <span className={styles.benefitText}>{b.text}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </div>

        {/* Bottom Frosted Card: When to Consider Blepharoplasty? */}
        <div className={styles.bottomCard} role="region" aria-label={indicationsTitle}>
          <div className={styles.bottomLeftBlock}>
            <h3 className={styles.bottomHeading}>
              {indicationsTitle.includes("?") ? (
                <>
                  {indicationsTitle.replace("Blepharoplasty?", "").trim()}
                  <br />
                  Blepharoplasty?
                </>
              ) : (
                indicationsTitle
              )}
            </h3>
            <div className={styles.bottomDivider} aria-hidden="true" />
          </div>

          <div className={styles.bottomItemsGrid} role="list">
            {indications.map((item, idx) => (
              <div key={idx} className={styles.considerItem} role="listitem">
                <span className={styles.considerIconBadge} aria-hidden="true">
                  {item.icon === "heavyLids" && <HeavyLidsIcon />}
                  {item.icon === "readingNight" && <ReadingVisionIcon />}
                  {item.icon === "glasses" && <EyeBagsGlassesIcon />}
                  {item.icon === "shieldCheck" && <ShieldCheckIcon />}
                </span>
                <span className={styles.considerText}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
