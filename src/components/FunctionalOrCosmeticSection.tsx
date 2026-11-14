import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/config/site";
import { CalendarIcon } from "./Icons";
import styles from "./FunctionalOrCosmeticSection.module.css";

/** Eye icon in terracotta for Functional Reasons */
function FunctionalEyeIcon() {
  return (
    <svg viewBox="0 0 32 24" fill="none" width="30" height="22" aria-hidden="true">
      <path
        d="M2 12C6 5.5 11 3 16 3C21 3 26 5.5 30 12C26 18.5 21 21 16 21C11 21 6 18.5 2 12Z"
        stroke="#C85A17"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="12" r="5" stroke="#C85A17" strokeWidth="2.2" />
      <circle cx="16" cy="12" r="2.2" fill="#C85A17" />
    </svg>
  );
}

/** Eye with sparkles icon in teal for Cosmetic Reasons */
function CosmeticEyeIcon() {
  return (
    <svg viewBox="0 0 34 26" fill="none" width="32" height="24" aria-hidden="true">
      <path
        d="M2 14C6 7.5 11 5 16 5C21 5 26 7.5 30 14C26 20.5 21 23 16 23C11 23 6 20.5 2 14Z"
        stroke="#167E88"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="14" r="4.5" stroke="#167E88" strokeWidth="2.2" />
      <circle cx="16" cy="14" r="2" fill="#167E88" />
      {/* Top right sparkle stars */}
      <path d="M26 4L26.8 6.2L29 7L26.8 7.8L26 10L25.2 7.8L23 7L25.2 6.2L26 4Z" fill="#167E88" />
      <path d="M30 10L30.5 11.2L31.7 11.7L30.5 12.2L30 13.4L29.5 12.2L28.3 11.7L29.5 11.2L30 10Z" fill="#167E88" />
    </svg>
  );
}

/** Solid terracotta circle checkmark */
function OrangeCheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#E06D2B" />
      <path d="M6 10.2L8.8 13L14 7.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Solid teal circle checkmark */
function TealCheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#167E88" />
      <path d="M6 10.2L8.8 13L14 7.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FUNCTIONAL_REASONS = [
  "Excess skin that rests on the eyelashes or blocks part of the view",
  "Eyelids that feel heavy or make the eyes tired",
  "Difficulty keeping the eyes open comfortably",
  "Tilting the head back or lifting the brows to see more clearly",
  "Skin folds that irritate or rub on the lids",
];

const COSMETIC_REASONS = [
  "A tired or heavy look around the eyes",
  "Bags or puffiness beneath the eyes",
  "Loose skin on the upper or lower lids",
  "Hooded lids that hide the natural eyelid crease",
  "Eyelids that look uneven from one side to the other",
];

export interface FunctionalOrCosmeticSectionProps {
  id?: string;
  kicker?: string;
  lead?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function FunctionalOrCosmeticSection({
  id = "reasons",
  kicker = "WHY PEOPLE CONSIDER IT",
  lead = "Many people have a mixture of reasons. The reason affects how any treatment is planned, so the doctor asks about both and examines the eyelids before suggesting anything.",
  buttonLabel = "Book a Consultation",
  buttonHref = `${LINKS.contact}#request`,
}: FunctionalOrCosmeticSectionProps) {
  return (
    <section id={id} className={styles.sectionWrapper} aria-labelledby="reasons-heading">
      {/* Background Decorative Elements */}
      <div className={styles.bgDecor} aria-hidden="true">
        {/* Floating Apricot Bubbles */}
        <div className={styles.bubbleTopCenter1} />
        <div className={styles.bubbleTopCenter2} />

        {/* Bottom-left Dot Matrix (4x5) */}
        <div className={styles.dotMatrixBottomLeft}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={styles.dot} />
          ))}
        </div>

        {/* Right-middle Dot Matrix (4x4) */}
        <div className={styles.dotMatrixRight}>
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className={styles.dot} />
          ))}
        </div>

        {/* Bottom-Right Organic Wave Curves (Mint & Peach) */}
        <svg
          className={styles.bottomRightWaves}
          viewBox="0 0 380 220"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Mint pastel wave */}
          <path
            d="M 60,220 C 140,160 220,170 380,110 L 380,220 Z"
            fill="#E0F0EE"
            opacity="0.75"
          />
          {/* Soft peach wave */}
          <path
            d="M 120,220 C 200,180 270,195 380,140 L 380,220 Z"
            fill="#FAE8DD"
            opacity="0.85"
          />
          {/* Terracotta stroke */}
          <path
            d="M 120,220 C 200,180 270,195 380,140"
            stroke="#E8A27A"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className={styles.container}>
        {/* Top Grid: Copy & CTA Button on Left, Eye Artwork on Right */}
        <div className={styles.topGrid}>
          {/* Left Column: Kicker, Heading, Description & Action */}
          <div className={styles.leftCol}>
            <div className={styles.kickerWrap}>
              <span className={styles.kickerBar} aria-hidden="true" />
              <span className={styles.kickerText}>{kicker}</span>
            </div>

            <h2 id="reasons-heading" className={styles.heading}>
              Functional or
              <span className={styles.headingHighlight}>Cosmetic?</span>
            </h2>

            <p className={styles.lead}>{lead}</p>

            <Link href={buttonHref} className={styles.ctaBtn}>
              <span className={styles.ctaBtnIcon} aria-hidden="true">
                <CalendarIcon width={18} height={18} />
              </span>
              <span>{buttonLabel}</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Right Column: Duo Visual Showcase (Functional & Cosmetic side-by-side like Image 1) */}
          <div className={styles.eyeVisualWrapper}>
            <div className={styles.eyeVisualDuo}>
              {/* Card 1: Functional */}
              <div className={`${styles.duoCard} ${styles.duoCardFunctional}`}>
                <div className={styles.duoImageFrame}>
                  <Image
                    src="/images/blepharoplasty/bleph-duo-functional-v3.webp"
                    alt="Illustrative close-up of a hooded upper eyelid"
                    fill
                    sizes="(min-width: 960px) 25vw, 50vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  <span className={`${styles.duoBadge} ${styles.badgeFunctional}`}>
                    Functional Correction
                  </span>
                </div>
                <div className={styles.duoCardFooter}>
                  <h3 className={styles.duoCardTitle}>Impaired Field of View</h3>
                  <p className={styles.duoCardCaption}>
                    Clears hooding resting on eyelashes and relieves brow-lifting strain.
                  </p>
                </div>
              </div>

              {/* Card 2: Cosmetic */}
              <div className={`${styles.duoCard} ${styles.duoCardCosmetic}`}>
                <div className={styles.duoImageFrame}>
                  <Image
                    src="/images/blepharoplasty/bleph-duo-cosmetic-v3.webp"
                    alt="Illustrative portrait of a woman with natural eyelid creases and a rested appearance"
                    fill
                    sizes="(min-width: 960px) 25vw, 50vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  <span className={`${styles.duoBadge} ${styles.badgeCosmetic}`}>
                    Cosmetic Rejuvenation
                  </span>
                </div>
                <div className={styles.duoCardFooter}>
                  <h3 className={styles.duoCardTitle}>Refreshed, Rested Look</h3>
                  <p className={styles.duoCardCaption}>
                    Smooths heavy bags, restores crease definition, and eliminates tired look.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid: 2 Comparison Cards (Functional Reasons vs Cosmetic Reasons) */}
        <div className={styles.cardsGrid}>
          {/* Card 1: Functional Reasons */}
          <div className={`${styles.reasonCard} ${styles.cardFunctional}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconCircle} ${styles.iconCircleFunctional}`} aria-hidden="true">
                <FunctionalEyeIcon />
              </div>
              <div className={styles.cardTitleWrap}>
                <h3 className={styles.cardTitle}>Functional Reasons</h3>
                <span className={styles.cardUnderlineFunctional} aria-hidden="true" />
              </div>
            </div>

            <ul className={styles.reasonsList}>
              {FUNCTIONAL_REASONS.map((item, index) => (
                <li key={index} className={styles.reasonItem}>
                  <span className={styles.checkIconWrap} aria-hidden="true">
                    <OrangeCheckIcon />
                  </span>
                  <p className={styles.reasonText}>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Cosmetic Reasons */}
          <div className={`${styles.reasonCard} ${styles.cardCosmetic}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconCircle} ${styles.iconCircleCosmetic}`} aria-hidden="true">
                <CosmeticEyeIcon />
              </div>
              <div className={styles.cardTitleWrap}>
                <h3 className={styles.cardTitle}>Cosmetic Reasons</h3>
                <span className={styles.cardUnderlineCosmetic} aria-hidden="true" />
              </div>
            </div>

            <ul className={styles.reasonsList}>
              {COSMETIC_REASONS.map((item, index) => (
                <li key={index} className={styles.reasonItem}>
                  <span className={styles.checkIconWrap} aria-hidden="true">
                    <TealCheckIcon />
                  </span>
                  <p className={styles.reasonText}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

