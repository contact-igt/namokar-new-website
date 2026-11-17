import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/config/site";
import styles from "./BlepharoplastyReasonsSection.module.css";

const REASONS_ITEMS = [
  {
    id: "heavy-droop",
    text: "Eyelids that feel heavy or droop",
    theme: "peach", // Col 1, Row 1
  },
  {
    id: "block-vision",
    text: "Upper eyelids that block part of your vision",
    theme: "teal", // Col 2, Row 1
  },
  {
    id: "head-tilt",
    text: "Needing to tilt your head back or lift your eyebrows to see clearly",
    theme: "teal", // Col 1, Row 2
  },
  {
    id: "tired-strained",
    text: "Eyes that feel tired or strained, especially by the end of the day",
    theme: "peach", // Col 2, Row 2
  },
  {
    id: "skin-lashes",
    text: "Skin that rests on the lashes or irritates in the eyelid fold",
    theme: "peach", // Col 1, Row 3
  },
  {
    id: "puffiness-bags",
    text: "Bags or puffiness under the eyes",
    theme: "teal", // Col 2, Row 3
  },
  {
    id: "asymmetric-eyelid",
    text: "One eyelid sitting lower than the other",
    theme: "teal", // Col 1, Row 4
  },
  {
    id: "sudden-changes",
    text: "Eyelid changes that appeared suddenly",
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
            <span className={`${styles.titleHighlight} title-secondary`}>{headingHighlight}</span>
          </h2>

          <p className={styles.lead}>{lead}</p>
        </div>

        {/* 2. 4x2 Grid of Sign Cards */}
        <div className={styles.grid}>
          {REASONS_ITEMS.map((item) => {
            const badgeClass =
              item.theme === "teal"
                ? styles.iconBadgeTeal
                : styles.iconBadgePeach;

            return (
              <div key={item.id} className={styles.card}>
                <div className={badgeClass} aria-hidden="true">
                  <Image
                    src={`/images/blepharoplasty/reasons/${item.id}.webp`}
                    alt=""
                    width={104}
                    height={104}
                    sizes="52px"
                    className={styles.reasonImage}
                  />
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
