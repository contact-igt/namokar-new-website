"use client";

import React from "react";
import Link from "next/link";
import AssetImage from "@/components/AssetImage";
import { ASSETS } from "@/config/assets";
import { LINKS } from "@/config/site";
import styles from "./UpperEyelidPositionSection.module.css";

export type EyelidTone = "typical" | "in" | "out";

export interface ConditionData {
  key: EyelidTone;
  title: string;
  subtitle: string;
  badgeLabel: string;
  asset: typeof ASSETS.upperEyelidTypicalAi;
  imageTag: string;
  appearance: string;
  assessment: string;
  nextStep: string;
  nextStepTag: string;
}

export const CONDITIONS: ConditionData[] = [
  {
    key: "typical",
    title: "Typical",
    subtitle: "Upper eyelid",
    badgeLabel: "Normal Baseline",
    asset: ASSETS.upperEyelidTypicalAi,
    imageTag: "Clear pupil & unobstructed iris",
    appearance: "The lid edge sits near the top of the coloured part of the eye and the pupil is clear.",
    assessment: "Usually a normal finding.",
    nextStep: "No treatment is needed for a typical lid position.",
    nextStepTag: "No Action Needed",
  },
  {
    key: "in",
    title: "Drooping",
    subtitle: "Ptosis (Lid Muscle)",
    badgeLabel: "Muscle Weakness",
    asset: ASSETS.upperEyelidDroopingAi,
    imageTag: "Lid edge covers upper pupil",
    appearance: "The lid edge sits lower than usual and may partly cover the iris or pupil.",
    assessment: "An examination identifies the cause and whether vision is affected.",
    nextStep: "The doctor discusses the cause and the options that suit your eyes.",
    nextStepTag: "Specialist Assessment",
  },
  {
    key: "out",
    title: "Excess skin",
    subtitle: "Upper lid (Skin Fold)",
    badgeLabel: "Skin Laxity",
    asset: ASSETS.upperEyelidExcessSkinAi,
    imageTag: "Lax skin fold overhangs crease",
    appearance: "An extra skin fold can hang over the crease or rest on the eyelashes.",
    assessment: "An examination distinguishes excess skin from a drooping lid and checks its effect on vision.",
    nextStep: "The doctor explains whether any treatment could help and what it can change.",
    nextStepTag: "Treatment Discussion",
  },
];

/* ==========================================================================
   Bespoke Medical Duotone SVG Icons for Category Rail
   ========================================================================== */

/** Header Calipers & Benchmark Target Icon */
function ComparisonFocusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#0C454B" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="#C85A17" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.5" fill="#167E88" stroke="#0C454B" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

/** Row 1: High-Definition Clinical Lens & Slit-Lamp Camera */
function CameraEyeIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" aria-hidden="true">
      {/* Outer camera body */}
      <rect x="3.5" y="8.5" width="25" height="18" rx="4.5" fill="#0C454B" fillOpacity="0.08" stroke="#0C454B" strokeWidth="2" />
      {/* Top prism viewfinder */}
      <path d="M11 8.5L13 4.5H19L21 8.5" stroke="#0C454B" strokeWidth="2" strokeLinejoin="round" fill="#167E88" fillOpacity="0.25" />
      {/* Sensor indicator */}
      <circle cx="23.5" cy="12.5" r="1.5" fill="#C85A17" />
      {/* Optical lens ring */}
      <circle cx="16" cy="17.5" r="5.5" fill="#FFFFFF" stroke="#0C454B" strokeWidth="1.8" />
      {/* Anatomical iris aperture */}
      <path d="M12.5 17.5C13.5 15.5 14.8 14.5 16 14.5C17.2 14.5 18.5 15.5 19.5 17.5C18.5 19.5 17.2 20.5 16 20.5C14.8 20.5 13.5 19.5 12.5 17.5Z" fill="#167E88" />
      <circle cx="16" cy="17.5" r="1.8" fill="#FFFFFF" />
    </svg>
  );
}

/** Row 2: Ophthalmic Examination Loupe & Biometric Eye Scan */
function EyeScanIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" aria-hidden="true">
      {/* Diagnostic scanning bracket corners */}
      <path d="M4 9V6C4 4.89543 4.89543 4 6 4H9" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <path d="M23 4H26C27.1046 4 28 4.89543 28 6V9" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 23V26C4 27.1046 4.89543 28 6 28H9" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <path d="M23 28H26C27.1046 28 28 27.1046 28 26V23" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      {/* Eye contour */}
      <path d="M6 16C9 10.5 13 8 16 8C19 8 23 10.5 26 16C23 21.5 19 24 16 24C13 24 9 21.5 6 16Z" fill="#FEF3C7" stroke="#92400E" strokeWidth="2" strokeLinejoin="round" />
      {/* Iris & pupil with light reflex */}
      <circle cx="16" cy="16" r="4.5" fill="#F59E0B" fillOpacity="0.4" stroke="#92400E" strokeWidth="1.8" />
      <circle cx="16" cy="16" r="2.2" fill="#92400E" />
      <circle cx="17.2" cy="14.8" r="0.8" fill="#FFFFFF" />
      {/* Focal measurement alignment marks */}
      <line x1="8.5" y1="16" x2="11" y2="16" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="16" x2="23.5" y2="16" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Row 3: Diagnostic Clinical Shield & Caduceus Stethoscope */
function ClinicalShieldIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" aria-hidden="true">
      {/* Clinical Shield */}
      <path d="M16 3.5L6.5 7.5V15C6.5 21.5 10.5 26.8 16 28.5C21.5 26.8 25.5 21.5 25.5 15V7.5L16 3.5Z" fill="#DCFCE7" stroke="#047857" strokeWidth="2" strokeLinejoin="round" />
      {/* Stethoscope binaural contour */}
      <path d="M11 11.5V14.5C11 17.26 13.24 19.5 16 19.5C18.76 19.5 21 17.26 21 14.5V11.5" stroke="#065F46" strokeWidth="2" strokeLinecap="round" />
      {/* Ear tips */}
      <circle cx="11" cy="10.5" r="1.3" fill="#047857" />
      <circle cx="21" cy="10.5" r="1.3" fill="#047857" />
      {/* Stethoscope chestpiece bell */}
      <circle cx="16" cy="22.5" r="2.5" fill="#10B981" stroke="#065F46" strokeWidth="1.6" />
      {/* Central Diagnostic Cross */}
      <path d="M16 12V16M14 14H18" stroke="#047857" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Row 4: Treatment Pathway & Clinical Roadmap */
function PathwayIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" aria-hidden="true">
      {/* Clipboard / Action plan base */}
      <rect x="5.5" y="6.5" width="21" height="21" rx="4" fill="#FFEDD5" stroke="#C2410C" strokeWidth="2" />
      {/* Top clip */}
      <path d="M12 6.5V4C12 3.45 12.45 3 13 3H19C19.55 3 20 3.45 20 4V6.5" fill="#FFFFFF" stroke="#C2410C" strokeWidth="1.8" />
      {/* Pathway milestones with connection rails */}
      <circle cx="11" cy="13" r="2" fill="#E06D2B" />
      <line x1="15" y1="13" x2="22" y2="13" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="11" cy="19" r="2" fill="#E06D2B" />
      <line x1="15" y1="19" x2="22" y2="19" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round" />
      {/* Confirmed action checkmark badge */}
      <circle cx="21.5" cy="22.5" r="4.5" fill="#C85A17" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M19.5 22.5L21 24L24 21" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10.5l4 4 8-8" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="10" y1="6" x2="10" y2="11" />
      <circle cx="10" cy="14.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FoldIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7c4-3 10-3 14 0" />
      <path d="M3 13c4-3 10-3 14 0" />
    </svg>
  );
}

/**
 * Reusable enhanced comparison table component
 */
export function UpperEyelidComparisonTable() {
  return (
    <div className={styles.tableContainerCard}>
      {/* Mobile Swipe / Scroll Hint */}
      <div className={styles.mobileScrollHint} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span>Scroll horizontally to compare all three conditions</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      <div
        className={styles.scrollArea}
        tabIndex={0}
        role="region"
        aria-label="Scrollable upper eyelid position comparison table"
      >
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th scope="col" className={`${styles.headCategory} ${styles.colCategory}`}>
                <div className={styles.headCategoryInner}>
                  <span className={styles.headCategoryBadge}>
                    <ComparisonFocusIcon />
                    Comparison Criteria
                  </span>
                  <span className={styles.headCategoryTitle}>Clinical Factors</span>
                  <span className={styles.headCategorySub}>Side-by-side specialist evaluation</span>
                </div>
              </th>

              {CONDITIONS.map((c) => {
                const isTypical = c.key === "typical";
                const isDrooping = c.key === "in";
                return (
                  <th
                    key={c.key}
                    scope="col"
                    className={`${
                      isTypical
                        ? styles.headTypical
                        : isDrooping
                        ? styles.headDrooping
                        : styles.headExcess
                    } ${styles.colCondition}`}
                  >
                    <div className={styles.headConditionInner}>
                      <span
                        className={
                          isTypical
                            ? styles.statusBadgeTypical
                            : isDrooping
                            ? styles.statusBadgeDrooping
                            : styles.statusBadgeExcess
                        }
                      >
                        {isTypical && <CheckIcon />}
                        {isDrooping && <AlertIcon />}
                        {!isTypical && !isDrooping && <FoldIcon />}
                        {c.badgeLabel}
                      </span>

                      <span
                        className={`${styles.headTitle} ${
                          isTypical
                            ? styles.headTitleTypical
                            : isDrooping
                            ? styles.headTitleDrooping
                            : styles.headTitleExcess
                        }`}
                      >
                        {c.title}
                      </span>

                      <span className={styles.headSubtitle}>{c.subtitle}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {/* Row 1: Illustration */}
            <tr>
              <th scope="row" className={styles.rowHeaderCell}>
                <div className={`${styles.categoryCard} ${styles.cardStripeTeal}`}>
                  <div className={`${styles.rowIconBox} ${styles.iconBoxTeal}`}>
                    <CameraEyeIcon />
                  </div>
                  <div className={styles.rowHeaderTexts}>
                    <span className={`${styles.categoryMicroTag} ${styles.categoryMicroTagTeal}`}>
                      Criteria 01 • Visual
                    </span>
                    <strong className={styles.rowHeaderTitle}>Illustration</strong>
                    <span className={styles.rowHeaderSub}>Clinical appearance &amp; eyelid contour</span>
                  </div>
                </div>
              </th>

              {CONDITIONS.map((c) => {
                const isTypical = c.key === "typical";
                const isDrooping = c.key === "in";
                return (
                  <td
                    key={`img-${c.key}`}
                    className={
                      isTypical
                        ? styles.cellTypical
                        : isDrooping
                        ? styles.cellDrooping
                        : styles.cellExcess
                    }
                  >
                    <div
                      className={`${styles.imageFrameWrapper} ${
                        isTypical
                          ? styles.imageFrameWrapperTypical
                          : isDrooping
                          ? styles.imageFrameWrapperDrooping
                          : styles.imageFrameWrapperExcess
                      }`}
                    >
                      <div className={styles.imageViewport}>
                        <AssetImage
                          asset={c.asset}
                          sizes="(min-width: 960px) 26vw, 80vw"
                        />
                      </div>
                      <div className={styles.imageFloatingBadge}>
                        {c.imageTag}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Row 2: What it can look like */}
            <tr>
              <th scope="row" className={styles.rowHeaderCell}>
                <div className={`${styles.categoryCard} ${styles.cardStripeAmber}`}>
                  <div className={`${styles.rowIconBox} ${styles.iconBoxAmber}`}>
                    <EyeScanIcon />
                  </div>
                  <div className={styles.rowHeaderTexts}>
                    <span className={`${styles.categoryMicroTag} ${styles.categoryMicroTagAmber}`}>
                      Criteria 02 • Physical Signs
                    </span>
                    <strong className={styles.rowHeaderTitle}>What it can look like</strong>
                    <span className={styles.rowHeaderSub}>Observable eyelid signs</span>
                  </div>
                </div>
              </th>

              {CONDITIONS.map((c) => {
                const isTypical = c.key === "typical";
                const isDrooping = c.key === "in";
                return (
                  <td
                    key={`look-${c.key}`}
                    className={
                      isTypical
                        ? styles.cellTypical
                        : isDrooping
                        ? styles.cellDrooping
                        : styles.cellExcess
                    }
                  >
                    <div
                      className={`${styles.cellCard} ${
                        isTypical
                          ? styles.cellCardTypical
                          : isDrooping
                          ? styles.cellCardDrooping
                          : styles.cellCardExcess
                      }`}
                    >
                      <span
                        className={`${styles.iconBullet} ${
                          isTypical
                            ? styles.iconBulletTypical
                            : isDrooping
                            ? styles.iconBulletDrooping
                            : styles.iconBulletExcess
                        }`}
                        aria-hidden="true"
                      >
                        {isTypical ? <CheckIcon /> : isDrooping ? <AlertIcon /> : <FoldIcon />}
                      </span>
                      <p className={styles.cellText}>{c.appearance}</p>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Row 3: Why assessment matters */}
            <tr>
              <th scope="row" className={styles.rowHeaderCell}>
                <div className={`${styles.categoryCard} ${styles.cardStripeEmerald}`}>
                  <div className={`${styles.rowIconBox} ${styles.iconBoxEmerald}`}>
                    <ClinicalShieldIcon />
                  </div>
                  <div className={styles.rowHeaderTexts}>
                    <span className={`${styles.categoryMicroTag} ${styles.categoryMicroTagEmerald}`}>
                      Criteria 03 • Diagnosis
                    </span>
                    <strong className={styles.rowHeaderTitle}>Why assessment matters</strong>
                    <span className={styles.rowHeaderSub}>Diagnostic evaluation</span>
                  </div>
                </div>
              </th>

              {CONDITIONS.map((c) => {
                const isTypical = c.key === "typical";
                const isDrooping = c.key === "in";
                return (
                  <td
                    key={`assess-${c.key}`}
                    className={
                      isTypical
                        ? styles.cellTypical
                        : isDrooping
                        ? styles.cellDrooping
                        : styles.cellExcess
                    }
                  >
                    <div
                      className={`${styles.cellCard} ${
                        isTypical
                          ? styles.cellCardTypical
                          : isDrooping
                          ? styles.cellCardDrooping
                          : styles.cellCardExcess
                      }`}
                    >
                      <span
                        className={`${styles.iconBullet} ${
                          isTypical
                            ? styles.iconBulletTypical
                            : isDrooping
                            ? styles.iconBulletDrooping
                            : styles.iconBulletExcess
                        }`}
                        aria-hidden="true"
                      >
                        {isTypical ? <CheckIcon /> : isDrooping ? <AlertIcon /> : <FoldIcon />}
                      </span>
                      <p className={styles.cellText}>{c.assessment}</p>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Row 4: Next step */}
            <tr>
              <th scope="row" className={styles.rowHeaderCell}>
                <div className={`${styles.categoryCard} ${styles.cardStripeOrange}`}>
                  <div className={`${styles.rowIconBox} ${styles.iconBoxOrange}`}>
                    <PathwayIcon />
                  </div>
                  <div className={styles.rowHeaderTexts}>
                    <span className={`${styles.categoryMicroTag} ${styles.categoryMicroTagOrange}`}>
                      Criteria 04 • Care Pathway
                    </span>
                    <strong className={styles.rowHeaderTitle}>Next step</strong>
                    <span className={styles.rowHeaderSub}>Clinical care pathway</span>
                  </div>
                </div>
              </th>

              {CONDITIONS.map((c) => {
                const isTypical = c.key === "typical";
                const isDrooping = c.key === "in";
                return (
                  <td
                    key={`step-${c.key}`}
                    className={
                      isTypical
                        ? styles.cellTypical
                        : isDrooping
                        ? styles.cellDrooping
                        : styles.cellExcess
                    }
                  >
                    <div
                      className={`${styles.cellCard} ${
                        isTypical
                          ? styles.cellCardTypical
                          : isDrooping
                          ? styles.cellCardDrooping
                          : styles.cellCardExcess
                      }`}
                    >
                      <span
                        className={`${styles.iconBullet} ${
                          isTypical
                            ? styles.iconBulletTypical
                            : isDrooping
                            ? styles.iconBulletDrooping
                            : styles.iconBulletExcess
                        }`}
                        aria-hidden="true"
                      >
                        {isTypical ? <CheckIcon /> : isDrooping ? <AlertIcon /> : <FoldIcon />}
                      </span>
                      <div>
                        <p className={styles.cellText}>{c.nextStep}</p>
                        <span
                          className={`${styles.nextStepTag} ${
                            isTypical
                              ? styles.nextStepTagTypical
                              : isDrooping
                              ? styles.nextStepTagDrooping
                              : styles.nextStepTagExcess
                          }`}
                        >
                          {c.nextStepTag}
                        </span>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export interface UpperEyelidPositionSectionProps {
  id?: string;
  kicker?: string;
  heading?: string;
  intro?: string;
}

export default function UpperEyelidPositionSection({
  id = "eyelidPosition",
  kicker = "See it explained",
  heading = "Upper eyelid position",
  intro = "Three simple pictures: a typical lid, a drooping lid and excess skin. They can look alike, which is why an examination matters.",
}: UpperEyelidPositionSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} className={styles.sectionWrap} aria-labelledby={headingId} data-figure="eyelidPosition">
      {/* Background Decorative Layer */}
      <div className={styles.bgDecor} aria-hidden="true">
        {/* Subtle realistic medical texture layer */}
        <div className={styles.bgTextureLayer} />

        {/* Ophthalmology / Eye HUD watermark graphic */}
        <div className={styles.bgEyeHud} />

        {/* Soft ambient radial aura glows */}
        <div className={styles.auraAmber} />
        <div className={styles.auraMint} />

        {/* Optical Orbit Contour Rings */}
        <div className={styles.orbitDecor}>
          <div className={styles.orbitDecorInner} />
        </div>

        {/* Top-Right Decorative Dot Matrix */}
        <div className={styles.dotMatrixTopRight}>
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={`tr-${i}`} className={styles.dotTeal} />
          ))}
        </div>

        {/* Bottom-Left Decorative Dot Matrix */}
        <div className={styles.dotMatrixBottomLeft}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={`bl-${i}`} className={styles.dotTerracotta} />
          ))}
        </div>

        {/* Top Flowing SVG Wave Ribbon */}
        <svg
          className={styles.topWaves}
          viewBox="0 0 480 180"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M -20,0 C 120,80 240,40 380,110 L 480,0 Z"
            fill="#EAF4F2"
            opacity="0.65"
          />
          <path
            d="M -20,0 C 80,50 200,30 320,80 L 420,0 Z"
            fill="#FFF1E8"
            opacity="0.75"
          />
        </svg>

        {/* Bottom Flowing SVG Wave Ribbon */}
        <svg
          className={styles.bottomWaves}
          viewBox="0 0 420 200"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 60,200 C 160,130 260,150 420,80 L 420,200 Z"
            fill="#EAF4F2"
            opacity="0.65"
          />
          <path
            d="M 120,200 C 220,150 300,165 420,110 L 420,200 Z"
            fill="#FFF1E8"
            opacity="0.75"
          />
        </svg>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.kickerWrap}>
            <span className={styles.kickerBar} aria-hidden="true" />
            <span className={styles.kickerText}>{kicker}</span>
          </div>

          <h2 id={headingId} className={styles.title}>
            Upper eyelid <span className={styles.titleHighlight}>position</span>
          </h2>

          <p className={styles.lead}>{intro}</p>

          {/* Quick Summary Chips */}
          <div className={styles.quickLegend} aria-label="Conditions overview">
            <div className={styles.legendChip}>
              <span className={styles.legendDotTypical} aria-hidden="true" />
              <span>Typical: Normal baseline position</span>
            </div>
            <div className={styles.legendChip}>
              <span className={styles.legendDotDrooping} aria-hidden="true" />
              <span>Drooping (Ptosis): Lid muscle sits lower</span>
            </div>
            <div className={styles.legendChip}>
              <span className={styles.legendDotExcess} aria-hidden="true" />
              <span>Excess Skin: Redundant fold over crease</span>
            </div>
          </div>
        </div>

        {/* Main Comparison Table Card Container */}
        <UpperEyelidComparisonTable />

        {/* Bottom Specialist Advice Bar */}
        <div className={styles.bottomAdviceCard}>
          <div className={styles.adviceLeft}>
            <div className={styles.adviceIconCircle}>
              <ClinicalShieldIcon />
            </div>
            <div className={styles.adviceTexts}>
              <h3 className={styles.adviceTitle}>Specialist Examination Note</h3>
              <p className={styles.adviceDesc}>
                Ptosis (lid muscle weakness) and dermatochalasis (excess eyelid skin) frequently occur together. Only an in-person clinical evaluation by an oculoplastic surgeon can confirm the underlying cause and determine whether blepharoplasty, ptosis correction, or a combined procedure is appropriate.
              </p>
            </div>
          </div>
          <Link href={`${LINKS.contact}#request`} className={styles.adviceCtaBtn}>
            <span>Book an Eyelid Assessment</span>
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M4 10h12m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
