import Image from "next/image";
import { SERVICE_CONTENT } from "@/content/services";
import { ArrowRightIcon } from "./Icons";
import styles from "./BlepharoplastyReasonsSection.module.css";

const REASONS_ITEMS = SERVICE_CONTENT.eyelid.seekHelp.items;
const REASON_IMAGES = ["heavy-droop", "block-vision", "head-tilt", "tired-strained", "skin-lashes", "puffiness-bags", "asymmetric-eyelid", "sudden-changes"];

export interface BlepharoplastyReasonsSectionProps {
  id?: string;
  kicker?: string;
  headingPrefix?: string;
  headingHighlight?: string;
  lead?: string;
}

export default function BlepharoplastyReasonsSection({
  id = "when",
  kicker = "SIGNS & CONCERNS",
  headingPrefix = "When Should You Consider",
  headingHighlight = "an Eyelid Assessment?",
  lead = "An oculoplastic assessment can help identify the cause of functional or aesthetic eyelid concerns and determine whether treatment may be appropriate.",
}: BlepharoplastyReasonsSectionProps) {
  return (
    <section id={id} className={styles.sectionWrapper} aria-labelledby={`${id}-heading`}>
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

          <h2 id={`${id}-heading`} className={styles.title}>
            {headingPrefix}{" "}
            <span className={`${styles.titleHighlight} title-secondary`}>{headingHighlight}</span>
          </h2>

          <p className={styles.lead}>{lead}</p>
        </div>

        {/* 2. 4x2 Grid of Sign Cards */}
        <div className={styles.grid}>
          {REASONS_ITEMS.map((item, index) => {
            const badgeClass =
              index % 4 === 1 || index % 4 === 2
                ? styles.iconBadgeTeal
                : styles.iconBadgePeach;

            return (
              <div key={item} className={styles.card}>
                <div className={badgeClass} aria-hidden="true">
                  <Image
                    src={`/images/blepharoplasty/reasons/${REASON_IMAGES[index]}.webp`}
                    alt=""
                    width={104}
                    height={104}
                    sizes="52px"
                    className={styles.reasonImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.cardText}>{item}</p>
                </div>
                <div className={styles.arrowBadge} aria-hidden="true">
                  <ArrowRightIcon width={12} height={12} stroke="#FFFFFF" />
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
            <p className={styles.alertText}><strong className={styles.alertHighlight}>Sudden Eyelid Drooping Requires Immediate Assessment.</strong>{" "}{SERVICE_CONTENT.eyelid.seekHelp.note}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
