import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/config/site";
import { CalendarIcon } from "./Icons";
import styles from "./AestheticPageHero.module.css";

/** Eye icon for Enhance Your Appearance */
function EyeEnhanceIcon() {
  return (
    <svg viewBox="0 0 32 24" fill="none" width="24" height="18" aria-hidden="true">
      <path
        d="M2 12C6 5 11 2 16 2C21 2 26 5 30 12C26 19 21 22 16 22C11 22 6 19 2 12Z"
        stroke="#0C454B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="12" r="5" stroke="#0C454B" strokeWidth="2.2" />
      <circle cx="16" cy="12" r="2.2" fill="#0C454B" />
    </svg>
  );
}

/** Shield with checkmark for Maintain Eye Safety */
function ShieldSafetyIcon() {
  return (
    <svg viewBox="0 0 28 32" fill="none" width="20" height="23" aria-hidden="true">
      <path
        d="M14 2L3 6.5V14.5C3 21.5 7.8 28 14 30C20.2 28 25 21.5 25 14.5V6.5L14 2Z"
        stroke="#0C454B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 15L12.5 18.5L19 11.5"
        stroke="#0C454B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Lotus flower icon for Natural Results */
function LotusResultIcon() {
  return (
    <svg viewBox="0 0 36 30" fill="none" width="26" height="22" aria-hidden="true">
      {/* Center petal */}
      <path
        d="M18 3C16 8.5 15.5 15 18 22C20.5 15 20 8.5 18 3Z"
        stroke="#0C454B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner left */}
      <path
        d="M16.5 11C12 12.5 9 16 10 21.5C13 21.5 15.5 19 17 16"
        stroke="#0C454B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner right */}
      <path
        d="M19.5 11C24 12.5 27 16 26 21.5C23 21.5 20.5 19 19 16"
        stroke="#0C454B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Outer left */}
      <path
        d="M10.5 17C5.5 17.5 3 20.5 4.5 23.5C8.5 24.5 13 23.5 15 22"
        stroke="#0C454B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Outer right */}
      <path
        d="M25.5 17C30.5 17.5 33 20.5 31.5 23.5C27.5 24.5 23 23.5 21 22"
        stroke="#0C454B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom base curve */}
      <path
        d="M11 24.5C14.5 26.5 21.5 26.5 25 24.5"
        stroke="#0C454B"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface AestheticPageHeroProps {
  kicker?: string;
  lead?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function AestheticPageHero({
  kicker = "AESTHETIC OCULOPLASTY",
  lead = "Aesthetic oculoplasty focuses on improving the appearance of the eyelids, under-eye area and surrounding eye region while keeping eye safety and natural results as the priority.",
  buttonLabel = "Book a Consultation",
  buttonHref = `${LINKS.contact}#request`,
}: AestheticPageHeroProps) {
  return (
    <div className={styles.heroWrapper}>
      {/* Background Decorative Elements */}
      <div className={styles.bgDecor} aria-hidden="true">
        {/* Soft warm peach ambient glow at top right */}
        <div className={styles.ambientGlow} />

        {/* Delicate warm peach & cream flowing curves across the bottom (NO green) */}
        <svg
          className={styles.bottomPeachWave}
          viewBox="0 0 1440 240"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Subtle warm champagne foundation wave */}
          <path
            d="M 0,160 C 240,110 480,180 780,140 C 1080,100 1280,160 1440,130 L 1440,240 L 0,240 Z"
            fill="#F7ECE3"
            opacity="0.6"
          />
          {/* Soft peach flowing curve */}
          <path
            d="M 0,185 C 320,130 640,195 960,155 C 1200,125 1360,165 1440,150 L 1440,240 L 0,240 Z"
            fill="#FAECE1"
            opacity="0.85"
          />
          {/* Warm terracotta thin accent line */}
          <path
            d="M 0,185 C 320,130 640,195 960,155 C 1200,125 1360,165 1440,150"
            stroke="#E8A27A"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
          />
          {/* Soft botanical accent petals in warm apricot on bottom-left */}
          <g fill="#EAC8B4" opacity="0.65">
            <path d="M120,155 C135,130 155,142 145,165 C138,178 125,170 120,155 Z" />
            <path d="M155,148 C178,130 195,145 186,166 C176,175 160,166 155,148 Z" />
            <path d="M185,158 C208,145 220,162 208,178 C196,185 185,172 185,158 Z" />
          </g>
        </svg>

        {/* Top-right subtle terracotta dot matrix (6x4) */}
        <div className={styles.dotMatrix}>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className={styles.dot} />
          ))}
        </div>
      </div>

      {/* Right-side Doctor Artwork with Left-to-Right Opacity Gradient Fade (Desktop) */}
      <div className={styles.heroRightVisual} aria-hidden="true">
        <Image
          src="/images/aesthetic/dr-poonam-jain-aesthetic-hero.webp"
          alt="Dr. Poonam Jain, Senior Oculoplasty Specialist in Consultation at Namokar Eye & Oculoplasty Centre"
          fill
          priority
          sizes="(min-width: 1080px) 58vw, 100vw"
          className={styles.heroRightImg}
        />
      </div>

      <div className={`container ${styles.heroContainer}`}>
        {/* Left Column Copy & Action */}
        <div className={styles.heroCopy}>
          <div className={styles.kickerWrap}>
            <span className={styles.kickerBar} aria-hidden="true" />
            <span className={styles.kickerText}>{kicker}</span>
          </div>

          <h1 className={styles.heading}>
            Natural-looking<br />
            eye rejuvenation<br />
            with aesthetic<br />
            <span className={styles.headingOrange}>oculoplasty.</span>
          </h1>

          <p className={styles.lead}>{lead}</p>

          <div className={styles.actions}>
            <Link href={buttonHref} className={styles.btnPrimary}>
              <span className={styles.btnIcon} aria-hidden="true">
                <CalendarIcon width={18} height={18} />
              </span>
              <span>{buttonLabel}</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Mobile/Tablet Fallback Image (shown only when screen is <1080px) */}
        <div className={styles.heroMobileVisual}>
          <div className={styles.mobilePhotoFrame}>
            <Image
              src="/images/aesthetic/dr-poonam-jain-aesthetic-hero.webp"
              alt="Dr. Poonam Jain, Senior Oculoplasty Specialist in Consultation at Namokar Eye & Oculoplasty Centre"
              fill
              sizes="(max-width: 1079px) 100vw, 1px"
              className={styles.mobilePhotoImg}
            />
          </div>
        </div>

        {/* Floating Bottom Feature Pill Card */}
        <div className={styles.floatingCardWrap}>
          <div className={styles.featurePillCard}>
            {/* Circular Aesthetic Eye Close-up Photo with Dual Ring Frame */}
            <div className={styles.circleEyeWrapper}>
              <Image
                src="/images/aesthetic/aesthetic-eye-circle.webp"
                alt="Close-up of refreshed aesthetic eyelid and eyelash contour"
                fill
                sizes="144px"
                className={styles.circleEyeImg}
                priority
              />
            </div>

            {/* 3 Key Clinical Features: Icon Centered Over 2 Lines of Text */}
            <div className={styles.featuresList} role="list">
              <div className={styles.featureItem} role="listitem">
                <div className={styles.featureIconCircle} aria-hidden="true">
                  <EyeEnhanceIcon />
                </div>
                <div className={styles.featureText}>
                  Enhance<br />Your Appearance
                </div>
              </div>

              <div className={styles.featureDivider} aria-hidden="true" />

              <div className={styles.featureItem} role="listitem">
                <div className={styles.featureIconCircle} aria-hidden="true">
                  <ShieldSafetyIcon />
                </div>
                <div className={styles.featureText}>
                  Maintain<br />Eye Safety
                </div>
              </div>

              <div className={styles.featureDivider} aria-hidden="true" />

              <div className={styles.featureItem} role="listitem">
                <div className={styles.featureIconCircle} aria-hidden="true">
                  <LotusResultIcon />
                </div>
                <div className={styles.featureText}>
                  Natural<br />Results
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

