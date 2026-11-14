import React from "react";
import Link from "next/link";
import { LINKS } from "@/config/site";
import styles from "./BlepharoplastyReasonsSection.module.css";

/* ============================================================
   Enhanced SVG Icons matching reference mockup with high precision
   ============================================================ */

/** 1. Eyelids that feel heavy or droop - Feather Icon */
function FeatherIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      width="26"
      height="26"
      aria-hidden="true"
    >
      {/* Quill stem */}
      <path
        d="M4 24L9.5 18.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Feather vane body */}
      <path
        d="M23.8 4.2C19.5 3.8 14 7.2 11 10.2L9.5 11.7C8.5 12.7 8.2 14.2 8.8 15.5L10 18L12.5 16.8C13.8 17.5 15.3 17.2 16.3 16.2L17.8 14.7C20.8 11.7 24.2 6.2 23.8 4.2Z"
        fill="currentColor"
      />
      {/* Slits in the feather vane */}
      <path
        d="M14.5 13L17.5 10M11.5 16L14 13.5"
        stroke="#FEECE2"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 2. Upper eyelids that block part of your vision - Viewfinder/Focus Frame Eye */
function ViewfinderEyeIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="26"
      height="26"
      aria-hidden="true"
    >
      {/* 4 Viewfinder Focus Corner Brackets */}
      <path d="M4.5 9.5V5.5H8.5" />
      <path d="M19.5 5.5H23.5V9.5" />
      <path d="M4.5 18.5V22.5H8.5" />
      <path d="M19.5 22.5H23.5V18.5" />
      {/* Centered Eye */}
      <path d="M7.5 14C9.8 10 18.2 10 20.5 14C18.2 18 9.8 18 7.5 14Z" />
      <circle cx="14" cy="14" r="2.2" fill="currentColor" />
    </svg>
  );
}

/** 3. Needing to tilt your head back or lift your eyebrows */
function HeadTiltIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="26"
      height="26"
      aria-hidden="true"
    >
      {/* Head contour tilted back */}
      <path d="M14 3.5C8.5 3.5 6 7 6 11.5C6 15 8 18 10.5 19.5V23H17.5V19.5C20 18 22 15 22 11.5C22 7 19.5 3.5 14 3.5Z" />
      {/* Ears */}
      <path d="M6 12C5 12 4.2 12.8 4.2 13.8C4.2 14.8 5 15.5 6 15.5M22 12C23 12 23.8 12.8 23.8 13.8C23.8 14.8 23 15.5 22 15.5" />
      {/* High raised eyebrows */}
      <path d="M9.5 9C10.5 8 11.8 8 12.8 9M15.2 9C16.2 8 17.5 8 18.5 9" strokeWidth="2.2" />
      {/* Eye dots */}
      <circle cx="11.2" cy="12.2" r="1" fill="currentColor" />
      <circle cx="16.8" cy="12.2" r="1" fill="currentColor" />
      {/* Nose and mouth */}
      <path d="M14 12.8V15M12.5 17.5C13.5 18.3 14.5 18.3 15.5 17.5" />
    </svg>
  );
}

/** 4. Eyes that feel tired or strained, especially by the end of the day */
function TiredEyesIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="26"
      height="26"
      aria-hidden="true"
    >
      {/* Eye shape */}
      <path d="M3.5 14C6.8 8.8 21.2 8.8 24.5 14C21.2 19.2 6.8 19.2 3.5 14Z" />
      <circle cx="14" cy="14" r="2.8" fill="currentColor" />
      {/* Radiating strain dashes above */}
      <path d="M14 4.5V2M8.8 5.8L7.5 3.5M19.2 5.8L20.5 3.5M4.5 9.5L2.5 8.2M23.5 9.5L25.5 8.2" strokeWidth="2.1" />
      {/* Strain dashes below */}
      <path d="M14 23.5V26M9.5 22.2L8.2 24.5M18.5 22.2L19.8 24.5" strokeWidth="1.8" />
    </svg>
  );
}

/** 5. Skin that rests on the lashes or irritates in the eyelid fold */
function SkinLashesIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="26"
      height="26"
      aria-hidden="true"
    >
      {/* Overhanging fold curve */}
      <path d="M6 8.5C11 6.5 17 6.5 22 8.5" strokeWidth="1.8" opacity="0.6" strokeDasharray="1.5 2" />
      {/* Main Eyelid curve */}
      <path d="M3.5 12C7.5 15 20.5 15 24.5 12" strokeWidth="2.4" />
      {/* 7 Downward fanning lashes */}
      <path d="M5.5 13.5L3.8 17.5M8.5 14.5L7.2 19.2M11.5 15.2L10.8 20.5M14 15.5V21M16.5 15.2L17.2 20.5M19.5 14.5L20.8 19.2M22.5 13.5L24.2 17.5" strokeWidth="2.2" />
    </svg>
  );
}

/** 6. Bags or puffiness under the eyes */
function UnderEyeBagsIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="26"
      height="26"
      aria-hidden="true"
    >
      {/* Eye */}
      <path d="M4 12C7.5 7.5 20.5 7.5 24 12C20.5 16.5 7.5 16.5 4 12Z" />
      <circle cx="14" cy="12" r="2.6" fill="currentColor" />
      {/* Puffy under-eye crescent contour lines */}
      <path d="M6.5 15.8C9 19.5 19 19.5 21.5 15.8" strokeWidth="2.1" />
      <path d="M9 19.2C11 22.2 17 22.2 19 19.2" strokeWidth="1.8" />
    </svg>
  );
}

/** 7. One eyelid sitting lower than the other - Asymmetrical Eye */
function AsymmetricEyelidIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="26"
      height="26"
      aria-hidden="true"
    >
      {/* Outer eye boundary */}
      <path d="M3.5 15.5C6.5 9.5 21.5 9.5 24.5 15.5C21.5 21.5 6.5 21.5 3.5 15.5Z" />
      {/* Drooping eyelid dipping low over pupil on one half */}
      <path d="M4 14.5C8 10 13 13.5 24 15.5" strokeWidth="2.3" />
      <circle cx="14" cy="15.5" r="2.4" fill="currentColor" />
      {/* Asymmetry level indicator marks */}
      <path d="M21 7.5L23.5 10M23.5 7.5L21 10" strokeWidth="1.8" />
    </svg>
  );
}

/** 8. Eyelid changes that appeared suddenly - Alert Eye with Arched Brow */
function SuddenChangesIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="26"
      height="26"
      aria-hidden="true"
    >
      {/* High startled arched eyebrow */}
      <path d="M5.5 8C10 3.8 18 3.8 22.5 8" strokeWidth="2.4" />
      {/* Wide alert eye contour */}
      <path d="M4 16C7.5 10 20.5 10 24 16C20.5 21 7.5 21 4 16Z" />
      <circle cx="14" cy="15.8" r="2.6" fill="currentColor" />
      {/* Sudden change alert accent tick */}
      <path d="M24.5 11L26 9.5" strokeWidth="2" />
    </svg>
  );
}

/* ============================================================
   Ordered Items Data matching the 4x2 Grid in Reference Image
   ============================================================ */
const REASONS_ITEMS = [
  {
    id: "heavy-droop",
    text: "Eyelids that feel heavy or droop",
    icon: FeatherIcon,
    theme: "peach", // Col 1, Row 1
  },
  {
    id: "block-vision",
    text: "Upper eyelids that block part of your vision",
    icon: ViewfinderEyeIcon,
    theme: "teal", // Col 2, Row 1
  },
  {
    id: "head-tilt",
    text: "Needing to tilt your head back or lift your eyebrows to see clearly",
    icon: HeadTiltIcon,
    theme: "teal", // Col 1, Row 2
  },
  {
    id: "tired-strained",
    text: "Eyes that feel tired or strained, especially by the end of the day",
    icon: TiredEyesIcon,
    theme: "peach", // Col 2, Row 2
  },
  {
    id: "skin-lashes",
    text: "Skin that rests on the lashes or irritates in the eyelid fold",
    icon: SkinLashesIcon,
    theme: "peach", // Col 1, Row 3
  },
  {
    id: "puffiness-bags",
    text: "Bags or puffiness under the eyes",
    icon: UnderEyeBagsIcon,
    theme: "teal", // Col 2, Row 3
  },
  {
    id: "asymmetric-eyelid",
    text: "One eyelid sitting lower than the other",
    icon: AsymmetricEyelidIcon,
    theme: "teal", // Col 1, Row 4
  },
  {
    id: "sudden-changes",
    text: "Eyelid changes that appeared suddenly",
    icon: SuddenChangesIcon,
    theme: "peach", // Col 2, Row 4
  },
];

export interface BlepharoplastyReasonsSectionProps {
  id?: string;
  kicker?: string;
  headingPrefix?: string;
  headingHighlight?: string;
  lead?: string;
  note?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function BlepharoplastyReasonsSection({
  id = "when",
  kicker = "KNOW THE SIGNS",
  headingPrefix = "Reasons to Ask for",
  headingHighlight = "an Assessment",
  lead = "If you notice any of these signs, it may be time to consult an eye specialist.",
  buttonLabel = "Book a Consultation",
  buttonHref = `${LINKS.contact}#request`,
}: BlepharoplastyReasonsSectionProps) {
  return (
    <section id={id} className={styles.sectionWrapper} aria-labelledby="reasons-heading">
      {/* Background Decorative Elements: Waves & Dot Matrices */}
      <div className={styles.bgDecor} aria-hidden="true">
        {/* Top-Left Fluid Waves */}
        <svg
          className={styles.topLeftWaves}
          viewBox="0 0 460 320"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M-40,0 C60,0 200,45 240,165 C270,255 190,310 90,320 L-40,320 Z"
            fill="#FCEFE6"
            opacity="0.75"
          />
          <path
            d="M-40,0 C40,0 150,30 180,125 C205,200 140,250 65,260 L-40,260 Z"
            fill="#F8E5D7"
            opacity="0.6"
          />
        </svg>

        {/* Bottom-Right Fluid Waves */}
        <svg
          className={styles.bottomRightWaves}
          viewBox="0 0 460 320"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M500,320 C380,320 270,275 235,175 C200,80 280,20 370,0 L500,0 Z"
            fill="#FCEFE6"
            opacity="0.7"
          />
          <path
            d="M500,320 C410,320 325,290 295,205 C270,125 340,60 410,40 L500,40 Z"
            fill="#F8E5D7"
            opacity="0.5"
          />
        </svg>

        {/* Top-Right Dot Matrix (10 cols x 2 rows) */}
        <div className={styles.dotMatrixTopRight}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={styles.dot} />
          ))}
        </div>

        {/* Bottom-Left Dot Matrix (5 cols x 4 rows) */}
        <div className={styles.dotMatrixBottomLeft}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={styles.dot} />
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* 1. Header: Kicker, Title with terracotta highlight, Subtitle */}
        <div className={styles.header}>
          <div className={styles.kickerRow}>
            <span className={styles.kickerLine} aria-hidden="true" />
            <p className={styles.kickerText}>{kicker}</p>
          </div>

          <h2 id="reasons-heading" className={styles.title}>
            {headingPrefix}{" "}
            <span className={styles.titleHighlight}>{headingHighlight}</span>
          </h2>

          <p className={styles.lead}>{lead}</p>
        </div>

        {/* 2. 4x2 Grid of Sign Cards */}
        <div className={styles.grid}>
          {REASONS_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const badgeClass =
              item.theme === "teal"
                ? styles.iconBadgeTeal
                : styles.iconBadgePeach;

            return (
              <div key={item.id} className={styles.card}>
                <div className={badgeClass} aria-hidden="true">
                  <IconComponent />
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.cardText}>{item.text}</p>
                </div>
                <div className={styles.arrowBadge} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="12"
                    height="12"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Below Book Consultation & Urgent Attention Callout Banner */}
        <div className={styles.alertBanner} role="note" aria-label="Urgent medical note">
          <div className={styles.alertContent}>
            {/* Exact Warning Triangle with Rounded Vertices and Exclamation Mark */}
            <div className={styles.warningBadge} aria-hidden="true">
              <svg
                viewBox="0 0 48 42"
                fill="none"
                width="46"
                height="40"
              >
                <path
                  d="M21.4 3.2C22.6 1.1 25.4 1.1 26.6 3.2L46.4 35.8C47.6 37.9 46.1 40.5 43.8 40.5H4.2C1.9 40.5 0.4 37.9 1.6 35.8L21.4 3.2Z"
                  fill="#D45D28"
                />
                {/* Exclamation vertical bar */}
                <rect x="22" y="14" width="4" height="12" rx="2" fill="#FFFFFF" />
                {/* Exclamation dot */}
                <circle cx="24" cy="31" r="2.2" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Vertical Divider */}
            <div className={styles.alertDivider} aria-hidden="true" />

            {/* Alert Text with Prompt Medical Attention highlight */}
            <p className={styles.alertText}>
              A drooping eyelid that appears suddenly, or comes with double vision,
              headache or eye pain,{" "}
              <strong className={styles.alertHighlight}>
                needs prompt medical attention.
              </strong>
            </p>
          </div>

          {/* Book Consultation Button */}
          <Link href={buttonHref} className={styles.alertBtn}>
            <span>{buttonLabel}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="14"
              height="14"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
