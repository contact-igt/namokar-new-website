import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/config/site";
import { CalendarIcon } from "./Icons";
import styles from "./GlaucomaVisionSection.module.css";

/** Tunnel vision eye icon in Teal */
function ChronicVisionIcon() {
  return (
    <svg viewBox="0 0 32 24" fill="none" width="28" height="22" aria-hidden="true">
      <path
        d="M2 12C6 5.5 11 3 16 3C21 3 26 5.5 30 12C26 18.5 21 21 16 21C11 21 6 18.5 2 12Z"
        stroke="#167E88"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="12" r="5" stroke="#167E88" strokeWidth="2.2" />
      <circle cx="16" cy="12" r="2.2" fill="#167E88" />
    </svg>
  );
}

/** Alert / acute emergency icon in Terracotta */
function AcuteAlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="26" height="26" aria-hidden="true">
      <path
        d="M12 3L2 21H22L12 3Z"
        stroke="#C85A17"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="9" x2="12" y2="13.5" stroke="#C85A17" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1.3" fill="#C85A17" />
    </svg>
  );
}

/** Solid teal circle checkmark */
function TealCheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true" className={styles.checkIcon}>
      <circle cx="10" cy="10" r="10" fill="#167E88" />
      <path d="M6 10.2L8.8 13L14 7.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Solid terracotta circle checkmark */
function OrangeCheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true" className={styles.checkIcon}>
      <circle cx="10" cy="10" r="10" fill="#C85A17" />
      <path d="M6 10.2L8.8 13L14 7.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CHRONIC_SIGNS = [
  "Gradual, painless narrowing of peripheral (side) vision",
  "Central vision often remains crisp until advanced stages",
  "Bumping into objects, edges, or door frames unknowingly",
  "Needing significantly brighter lighting to read or navigate",
  "Often unnoticed early on without regular comprehensive eye exams",
];

const ACUTE_SIGNS = [
  "Sudden, intense eye pain radiating to forehead and temple",
  "Severe headache accompanied by nausea or vomiting",
  "Rapidly blurred, misty, or hazy vision with sudden onset",
  "Rainbow-colored halos or rings appearing around lights",
  "Requires emergency ophthalmic intervention to safeguard the optic nerve",
];

export interface GlaucomaVisionSectionProps {
  id?: string;
  kicker?: string;
  headingLine1?: string;
  headingLine2?: string;
  lead?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function GlaucomaVisionSection({
  id = "vision-symptoms",
  kicker = "RECOGNISING THE SIGNS",
  headingLine1 = "How Glaucoma Affects",
  headingLine2 = "Your Vision?",
  lead = "Glaucoma is often called the silent thief of sight because peripheral vision can fade gradually without pain. In contrast, acute angle-closure attacks strike suddenly with intense ocular pain and headache—demanding prompt medical care.",
  buttonLabel = "Book an Examination",
  buttonHref = `${LINKS.contact}#request`,
}: GlaucomaVisionSectionProps) {
  return (
    <section id={id} className={styles.sectionWrapper} aria-labelledby="glaucoma-vision-heading">
      {/* Background Decorative Accents */}
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.bubbleTopCenter1} />
        <div className={styles.bubbleTopCenter2} />

        {/* Bottom-left Dot Matrix */}
        <div className={styles.dotMatrixBottomLeft}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={styles.dot} />
          ))}
        </div>

        {/* Right-middle Dot Matrix */}
        <div className={styles.dotMatrixRight}>
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className={styles.dot} />
          ))}
        </div>

        {/* Bottom-Right Organic Wave Curves */}
        <svg
          className={styles.bottomRightWaves}
          viewBox="0 0 380 220"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 60,220 C 140,160 220,170 380,110 L 380,220 Z"
            fill="#E0F0EE"
            opacity="0.75"
          />
          <path
            d="M 120,220 C 200,180 270,195 380,140 L 380,220 Z"
            fill="#FAE8DD"
            opacity="0.85"
          />
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
        {/* Top Grid: Copy & CTA on Left, Duo Medical Image Cards on Right */}
        <div className={styles.topGrid}>
          {/* Left Column */}
          <div className={styles.leftCol}>
            <div className={styles.kickerWrap}>
              <span className={styles.kickerBar} aria-hidden="true" />
              <span className={styles.kickerText}>{kicker}</span>
            </div>

            <h2 id="glaucoma-vision-heading" className={styles.heading}>
              {headingLine1}
              <span className={`${styles.headingHighlight} title-secondary`}>{headingLine2}</span>
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

          {/* Right Column: Duo Visual Showcase (Tunnel Vision + Acute Symptoms) */}
          <div className={styles.visualShowcase}>
            {/* Card 1: Tunnel Vision */}
            <div className={styles.visualCard}>
              <div className={styles.imageFrame}>
                <Image
                  src="/images/glaucoma/glaucoma-tunnel-vision.webp"
                  alt="Medical simulation of tunnel vision and peripheral field loss caused by glaucoma"
                  fill
                  sizes="(min-width: 1024px) 280px, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <span className={`${styles.floatingBadge} ${styles.badgeTeal}`}>
                  Gradual Side-Vision Loss
                </span>
              </div>
              <div className={styles.cardFooter}>
                <h3 className={styles.cardTitle}>Tunnel Vision Effect</h3>
                <p className={styles.cardCaption}>
                  Peripheral edges shade dark while central vision stays clear early on.
                </p>
              </div>
            </div>

            {/* Card 2: Acute Attack Symptoms */}
            <div className={styles.visualCard}>
              <div className={styles.imageFrame}>
                <Image
                  src="/images/glaucoma/glaucoma-acute-symptoms-hq.webp"
                  alt="Clinical representation of acute angle-closure glaucoma symptoms: severe headache, ocular pain, and nausea"
                  fill
                  sizes="(min-width: 1024px) 280px, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <span className={`${styles.floatingBadge} ${styles.badgeCoral}`}>
                  Acute Eye Pain & Headache
                </span>
              </div>
              <div className={styles.cardFooter}>
                <h3 className={styles.cardTitle}>Acute Glaucoma Attack</h3>
                <p className={styles.cardCaption}>
                  Sudden severe eye ache, migraine-like headache & nausea need urgent care.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Detailed Clinical Comparison Cards */}
        <div className={styles.cardsGrid}>
          {/* Card 1: Chronic Open-Angle Signs */}
          <div className={`${styles.conditionCard} ${styles.cardChronic}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIconWrap} ${styles.cardIconTeal}`}>
                <ChronicVisionIcon />
              </div>
              <div>
                <h3 className={styles.cardHeadTitle}>Open-Angle Glaucoma</h3>
                <p className={styles.cardHeadSubtitle}>Gradual, silent progression over time</p>
              </div>
            </div>
            <ul className={styles.symptomList}>
              {CHRONIC_SIGNS.map((item, idx) => (
                <li key={idx} className={styles.symptomItem}>
                  <TealCheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Acute Angle-Closure Signs */}
          <div className={`${styles.conditionCard} ${styles.cardAcute}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIconWrap} ${styles.cardIconCoral}`}>
                <AcuteAlertIcon />
              </div>
              <div>
                <h3 className={styles.cardHeadTitle}>Acute Angle-Closure</h3>
                <p className={styles.cardHeadSubtitle}>Sudden pressure spike & emergency signs</p>
              </div>
            </div>
            <ul className={styles.symptomList}>
              {ACUTE_SIGNS.map((item, idx) => (
                <li key={idx} className={styles.symptomItem}>
                  <OrangeCheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
