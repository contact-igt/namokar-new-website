import HeadingText from "@/components/HeadingText";
import React from "react";
import Image from "next/image";
import styles from "./AestheticConditionsSection.module.css";

/**
 * 1. Heavy or tired-looking eyelids icon
 */
function HeavyEyelidsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-5 10-5 10 5 10 5-3.5 5-10 5-10-5-10-5Z" />
      <path d="M4 11c2.5-1.8 5-2.2 8-2.2s5.5.4 8 2.2" strokeWidth="2.2" />
      <circle cx="12" cy="12.5" r="3" fill="currentColor" fillOpacity="0.18" />
      <circle cx="12" cy="12.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

/**
 * 2. Excess upper eyelid skin icon (Eye with upward arrow)
 */
function ExcessSkinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path d="M2 14.5s3.5-5 10-5 10 5 10 5-3.5 5-10 5-10-5-10-5Z" />
      <circle cx="12" cy="14.5" r="2.8" />
      {/* Upward arrow indicating lift / excess skin */}
      <path d="M12 2v6M9 4.5l3-2.5 3 2.5" strokeWidth="2.1" />
    </svg>
  );
}

/**
 * 3. Under-eye bags or puffiness icon (Eye with lower crescent bag)
 */
function UnderEyeBagsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path d="M2 10.5s3.5-5 10-5 10 5 10 5-3.5 5-10 5-10-5-10-5Z" />
      <circle cx="12" cy="10.5" r="2.6" fill="currentColor" />
      {/* Puffy under-eye crescent pouch */}
      <path d="M4.5 14.5c2.2 3.8 12.8 3.8 15 0" strokeWidth="2.1" />
    </svg>
  );
}

/**
 * 4. Fine lines and wrinkles icon (Three wavy ripple lines)
 */
function WrinklesLinesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path d="M3.5 7.5c2.8-1.5 5.5-1.5 8.5 0s5.7 1.5 8.5 0" />
      <path d="M3.5 12c2.8-1.5 5.5-1.5 8.5 0s5.7 1.5 8.5 0" />
      <path d="M3.5 16.5c2.8-1.5 5.5-1.5 8.5 0s5.7 1.5 8.5 0" />
    </svg>
  );
}

/**
 * 5. Aesthetic oculofacial rejuvenation icon (Face profile with circle accent)
 */
function FacialRejuvenationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.2" />
      <path d="M9 10.2h.01M15 10.2h.01" strokeWidth="2.6" />
      <path d="M9.5 14.8c1.2 1.4 3.8 1.4 5 0" />
      {/* Sparkle badge on cheek */}
      <circle cx="17.2" cy="15.8" r="1.8" strokeWidth="1.6" />
    </svg>
  );
}

/**
 * 6. Drooping brows or under-eye hollowness icon
 */
function DroopingBrowsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden="true"
    >
      {/* Eyebrow arch with downward slope */}
      <path d="M3.5 9.5c3.2-3.4 9-3.8 14.5-.5" />
      {/* Lower contour arc */}
      <path d="M5.5 15.5c2.8-2 6.5-2 10.5.2" strokeWidth="1.9" />
    </svg>
  );
}

const CONDITIONS_DATA = [
  {
    id: "tired-eyelids",
    text: "Heavy or tired-looking eyelids",
    icon: HeavyEyelidsIcon,
  },
  {
    id: "excess-skin",
    text: "Excess upper eyelid skin",
    icon: ExcessSkinIcon,
  },
  {
    id: "under-eye-bags",
    text: "Under-eye bags or puffiness around the eyes",
    icon: UnderEyeBagsIcon,
  },
  {
    id: "fine-lines",
    text: "Fine lines and wrinkles around the eye area",
    icon: WrinklesLinesIcon,
  },
  {
    id: "facial-rejuvenation",
    text: "Aesthetic oculofacial concerns and facial rejuvenation around the eyes",
    icon: FacialRejuvenationIcon,
  },
  {
    id: "drooping-brows",
    text: "Drooping brows, under-eye hollowness or dark circles",
    icon: DroopingBrowsIcon,
  },
];

export interface AestheticConditionsSectionProps {
  id?: string;
  kicker?: string;
  heading?: import("react").ReactNode;
  lead?: string;
  note?: string;
}

export default function AestheticConditionsSection({
  id = "when",
  kicker = "KNOW THE SIGNS",
  heading = "Conditions and concerns addressed",
  lead = "Get expert care for a range of eye conditions, from common concerns to complex issues.",
  note = "Changes to the eyelids that are sudden, or come with pain or a change in vision, need medical attention before any cosmetic discussion.",
}: AestheticConditionsSectionProps) {
  return (
    <section id={id} className={styles.sectionWrapper} aria-labelledby="conditions-heading">
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Kicker, Heading, Description & Eye Chart Photo */}
          <div className={styles.leftCol}>
            {/* Kicker with rust-orange accent bar */}
            <div className={styles.kickerRow}>
              <span className={styles.kickerLine} aria-hidden="true" />
              <p className={styles.kickerText}>{kicker}</p>
            </div>

            {/* Main Section Title */}
            <h2 id="conditions-heading" className={styles.title}>
              <HeadingText>{heading}</HeadingText>
            </h2>

            {/* Description Text */}
            <p className={styles.lead}>{lead}</p>

            {/* Clinical Eye Examination Photo */}
            <div className={styles.photoWrapper}>
              <div className={styles.photoFrame}>
                <Image
                  src="/images/aesthetic/eye-exam-chart.webp"
                  alt="Clinical eye examination and assessment for oculofacial conditions"
                  width={824}
                  height={480}
                  sizes="(max-width: 528px) calc(100vw - 48px), (max-width: 1024px) 480px, (max-width: 1200px) 42vw, 510px"
                  className={styles.eyeImage}
                />
              </div>
            </div>
          </div>

          {/* Right Column: 6 Condition Cards + Warning Note */}
          <div className={styles.rightCol}>
            {CONDITIONS_DATA.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.id} className={styles.card}>
                  <div className={styles.iconBadge} aria-hidden="true">
                    <IconComp />
                  </div>
                  <p className={styles.cardText}>{item.text}</p>
                </div>
              );
            })}

            {/* Warning Callout Box */}
            <div className={styles.alertCallout} role="note">
              <div className={styles.alertIconBadge} aria-hidden="true">
                !
              </div>
              <p className={styles.alertText}>{note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
