import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./Icons";
import styles from "./WhatIsReconstructiveOculoplasty.module.css";

/* ------------------------------------------------------------------
   Bespoke SVG Icons matching the reference design
   ------------------------------------------------------------------ */

/** Eyelid Reconstruction icon (clean eyelid crease with central iris) */
function EyelidIcon() {
  return (
    <svg viewBox="0 0 28 20" fill="none" width="26" height="18" stroke="#0C454B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 10.5C6.5 4 14 3.5 14 3.5C14 3.5 21.5 4 25.5 10.5" stroke="#C85A17" strokeWidth="2.2" />
      <path d="M2.5 10.5C6.5 17 14 17.5 14 17.5C14 17.5 21.5 17 25.5 10.5" stroke="#0C454B" strokeWidth="2" />
      <circle cx="14" cy="10.5" r="3.2" fill="#0C454B" />
      <circle cx="14" cy="10.5" r="1.2" fill="#fff" />
    </svg>
  );
}

/** Tear Duct Surgery icon (delicate teardrop) */
function TearDropIcon() {
  return (
    <svg viewBox="0 0 22 26" fill="none" width="20" height="23" stroke="#0C454B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 2.5C11 2.5 3.5 12 3.5 17C3.5 21.1 6.9 24.5 11 24.5C15.1 24.5 18.5 21.1 18.5 17C18.5 12 11 2.5 11 2.5Z" />
      <path d="M13.5 15C13.5 17 12.2 18.5 10 18.5" stroke="#C85A17" strokeWidth="1.8" />
    </svg>
  );
}

/** Eye Socket / Orbit Reconstruction icon */
function EyeSocketIcon() {
  return (
    <svg viewBox="0 0 28 20" fill="none" width="26" height="18" stroke="#0C454B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 10C5.5 4.5 14 4.5 14 4.5C14 4.5 22.5 4.5 26 10C22.5 15.5 14 15.5 14 15.5C14 15.5 5.5 15.5 2 10Z" />
      <circle cx="14" cy="10" r="4.6" stroke="#C85A17" strokeWidth="1.8" />
      <circle cx="14" cy="10" r="2.2" fill="#0C454B" />
    </svg>
  );
}

/** Shield icon for "Restore Function" */
function RestoreFunctionShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="#0C454B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5L4 6V11.5C4 16.8 7.4 20.8 12 22C16.6 20.8 20 16.8 20 11.5V6L12 2.5Z" />
      <path d="M8.5 12L11 14.5L15.5 10" stroke="#C85A17" strokeWidth="2.2" />
    </svg>
  );
}

/** Eye icon for "Improve Appearance" */
function ImproveAppearanceEyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="#0C454B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12C5.5 6.5 12 4.5 12 4.5C12 4.5 18.5 6.5 22 12C18.5 17.5 12 19.5 12 19.5C12 19.5 5.5 17.5 2 10Z" />
      <circle cx="12" cy="12" r="3.2" stroke="#C85A17" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.2" fill="#0C454B" />
    </svg>
  );
}

/** Heart pulse / Quality of Life icon */
function QualityOfLifeHeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="#0C454B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.64169 1.54871 7.04096 1.54871 8.5C1.54871 9.95904 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93794 22.4518 9.22251 22.4518 8.5C22.4518 7.77749 22.3095 7.06206 22.0329 6.39462C21.7564 5.72718 21.351 5.12079 20.84 4.61Z" />
      <path d="M7 11.5L9.5 14L12.5 9.5L14.5 13H17" stroke="#C85A17" strokeWidth="1.8" />
    </svg>
  );
}

export interface WhatIsReconstructiveOculoplastyProps {
  id?: string;
  category?: string;
  titleTeal?: string;
  titleOrange?: string;
  intro?: string[];
  imageSrc?: string;
  imageAlt?: string;
}

export default function WhatIsReconstructiveOculoplasty({
  id = "overview",
  category = "UNDERSTANDING RECONSTRUCTIVE OCULOPLASTY",
  titleTeal = "What is\nReconstructive",
  titleOrange = "Oculoplasty?",
  intro = [
    "Reconstructive oculoplasty is a specialized eye surgery field that deals with the structures around the eye, including the eyelids, tear ducts, orbit and eye socket.",
    "It is used to correct functional problems, improve comfort, protect the eye and restore appearance after disease, injury or structural changes.",
  ],
  imageSrc = "/images/reconstructive/reconstructive-periocular-eye.jpg",
  imageAlt = "Clinical photograph of periocular eye area, natural eyebrow, eyelid contour, and tear drainage region",
}: WhatIsReconstructiveOculoplastyProps) {
  return (
    <section id={id} className={styles.sectionWrap} aria-labelledby={`${id}-heading`}>
      {/* Background Decorative Soft Wave Vectors */}
      <div className={styles.bgLayer} aria-hidden="true">
        <svg
          className={styles.bgSvg}
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Subtle curved arch in warm terracotta/cream */}
          <path
            d="M440 0 C 410 180, 430 360, 520 490 C 560 550, 620 590, 700 600"
            stroke="rgba(200, 90, 23, 0.08)"
            strokeWidth="36"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="1380" cy="80" r="260" stroke="rgba(12, 69, 75, 0.04)" strokeWidth="1.5" />
          <path
            d="M-20 480 C 260 420, 540 540, 880 470 C 1140 420, 1340 500, 1460 460"
            stroke="rgba(200, 90, 23, 0.06)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className={styles.container}>
        {/* ── 3-Column Main Grid ── */}
        <div className={styles.mainGrid}>
          {/* Column 1: Left Content (Previous content used, button removed) */}
          <div className={styles.leftCol}>
            <div className={styles.kickerWrap}>
              <span className={styles.kickerBar} aria-hidden="true" />
              <span className={styles.kickerText}>{category}</span>
            </div>

            <h2 id={`${id}-heading`} className={styles.heading}>
              <span className={styles.titleTeal}>
                What is<br />Reconstructive
              </span>
              <span className={`${styles.titleOrange} title-secondary`}>
                Oculoplasty?
              </span>
            </h2>

            {intro.map((p, idx) => (
              <p key={idx} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </div>

          {/* Column 2: Rectangle Clinical Image Card */}
          <div className={styles.imageCol}>
            <div className={styles.imageCard}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 468px) calc(100vw - 48px), (max-width: 768px) 420px, (max-width: 1080px) 45vw, 34vw"
                className={styles.macroImg}
              />
            </div>
          </div>

          {/* Column 3: 3 Enhanced Procedure Cards with Custom Arrow */}
          <div className={styles.cardsCol} role="list">
            {/* Card 1: Eyelid Reconstruction */}
            <Link href="#lidMalposition" className={styles.procedureCard} role="listitem">
              <div className={styles.cardLeftGroup}>
                <div className={styles.cardIconCircle} aria-hidden="true">
                  <EyelidIcon />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>
                    Eyelid Reconstruction
                  </h3>
                  <p>Assessment of eyelid abnormalities, functional concerns and structural defects.</p>
                </div>
              </div>
              <span className={styles.cardArrowBox} aria-hidden="true">
                <ArrowRightIcon width={18} height={18} />
              </span>
            </Link>

            {/* Card 2: Tear Duct Surgery */}
            <Link href="#tearPathway" className={styles.procedureCard} role="listitem">
              <div className={styles.cardLeftGroup}>
                <div className={styles.cardIconCircle} aria-hidden="true">
                  <TearDropIcon />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>
                    Tear Drainage &amp; Lacrimal Surgery
                  </h3>
                  <p>Evaluation and management of conditions affecting the normal drainage of tears.</p>
                </div>
              </div>
              <span className={styles.cardArrowBox} aria-hidden="true">
                <ArrowRightIcon width={18} height={18} />
              </span>
            </Link>

            {/* Card 3: Eye Socket Reconstruction */}
            <Link href="#terms" className={styles.procedureCard} role="listitem">
              <div className={styles.cardLeftGroup}>
                <div className={styles.cardIconCircle} aria-hidden="true">
                  <EyeSocketIcon />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>
                    Orbital &amp; Eye Socket Care
                  </h3>
                  <p>Assessment of selected conditions affecting the eye socket and surrounding tissues.</p>
                </div>
              </div>
              <span className={styles.cardArrowBox} aria-hidden="true">
                <ArrowRightIcon width={18} height={18} />
              </span>
            </Link>
          </div>
        </div>

        {/* ── Bottom Feature Bar ── */}
        <div className={styles.bottomBar} role="region" aria-label="Key Outcomes">
          {/* Outcome 1 */}
          <div className={styles.bottomItem}>
            <span className={styles.bottomIconBox} aria-hidden="true">
              <RestoreFunctionShieldIcon />
            </span>
            <span className={styles.bottomItemText}>Improve Eyelid Function</span>
          </div>

          {/* Outcome 2 */}
          <div className={styles.bottomItem}>
            <span className={styles.bottomIconBox} aria-hidden="true">
              <ImproveAppearanceEyeIcon />
            </span>
            <span className={styles.bottomItemText}>Restore Structure &amp; Appearance</span>
          </div>

          {/* Outcome 3 */}
          <div className={styles.bottomItem}>
            <span className={styles.bottomIconBox} aria-hidden="true">
              <QualityOfLifeHeartIcon />
            </span>
            <span className={styles.bottomItemText}>Support Eye Protection &amp; Comfort</span>
          </div>
        </div>
      </div>
    </section>
  );
}
