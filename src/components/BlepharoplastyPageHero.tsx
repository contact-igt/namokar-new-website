import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/config/site";
import { CalendarIcon } from "./Icons";
import styles from "./BlepharoplastyPageHero.module.css";

/** Eyelid contour icon for Refreshed Eyelid Contour */
function EyelidContourIcon() {
  return (
    <svg viewBox="0 0 32 24" fill="none" width="24" height="18" aria-hidden="true">
      {/* Natural upper crease arc */}
      <path
        d="M5 6C11 1.5 21 1.5 27 6"
        stroke="#0C454B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Main eye contour */}
      <path
        d="M2 12C6 5.5 11 3 16 3C21 3 26 5.5 30 12C26 18.5 21 21 16 21C11 21 6 18.5 2 12Z"
        stroke="#0C454B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="12" r="4.5" stroke="#0C454B" strokeWidth="2.2" />
      <circle cx="16" cy="12" r="2" fill="#0C454B" />
    </svg>
  );
}

/** Clear eye icon for Clear Vision & Comfort */
function ClearVisionIcon() {
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
      {/* Light sparkles on top right */}
      <path d="M25 4L26 2M28 5L30 5" stroke="#C85A17" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Shield with checkmark for Oculoplastic Safety & Precision */
function ShieldPrecisionIcon() {
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

interface BlepharoplastyPageHeroProps {
  crumb?: string;
  kicker?: string;
  lead?: string;
  buttonLabel?: string;
  buttonHref?: string;
  image?: string;
  imageAlt?: string;
}

export default function BlepharoplastyPageHero({
  crumb = "Eyelid Surgery (Blepharoplasty)",
  kicker = "BLEPHAROPLASTY",
  lead = "Heavy, drooping or baggy eyelids can affect comfort and vision as well as appearance. The first step is a careful assessment to find out why.",
  buttonLabel = "Book a Consultation",
  buttonHref = `${LINKS.contact}#request`,
  image = "/images/blepharoplasty/blepharoplasty-hero-exam.webp",
  imageAlt = "Dr. Poonam Jain performing slit-lamp eye examination on a patient at Namokar Eye & Oculoplasty Centre",
}: BlepharoplastyPageHeroProps) {
  return (
    <div className={styles.heroWrapper}>
      {/* Background Decorative Elements */}
      <div className={styles.bgDecor} aria-hidden="true">
        {/* Soft warm peach ambient glow at top right */}
        <div className={styles.ambientGlow} />

        {/* Delicate warm peach & cream flowing curves across the bottom */}
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
          {/* Warm terracotta eyelid contour accent line */}
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

      {/* Right-side Doctor Examination Artwork with Left-to-Right Opacity Gradient Fade (Desktop) */}
      <div className={styles.heroRightVisual} aria-hidden="true">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 1080px) 58vw, 100vw"
          className={styles.heroRightImg}
        />
      </div>

      <div className={`container ${styles.heroContainer}`}>
        {/* Left Column Copy & Action */}
        <div className={styles.heroCopy}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className={styles.crumbsSep} aria-hidden="true">&gt;</li>
              <li>
                <Link href="/our-services">Services</Link>
              </li>
              <li className={styles.crumbsSep} aria-hidden="true">&gt;</li>
              <li aria-current="page">{crumb}</li>
            </ol>
          </nav>

          <div className={styles.kickerWrap}>
            <span className={styles.kickerBar} aria-hidden="true" />
            <span className={styles.kickerText}>{kicker}</span>
          </div>

          <h1 className={styles.heading}>
            Eyelid surgery<br />
            begins with an<br />
            <span className={styles.headingOrange}>assessment.</span>
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
            <a href="#reasons" className={styles.btnSecondary}>
              <span>Explore Reasons</span>
              <span aria-hidden="true">&darr;</span>
            </a>
          </div>
        </div>

        {/* Mobile/Tablet Fallback Image (shown only when screen is <1080px) */}
        <div className={styles.heroMobileVisual}>
          <div className={styles.mobilePhotoFrame}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1079px) 100vw, 1px"
              className={styles.mobilePhotoImg}
            />
          </div>
        </div>

        {/* Floating Bottom Feature Pill Card */}
        <div className={styles.floatingCardWrap}>
          <div className={styles.featurePillCard}>
            {/* Circular Blepharoplasty Eyelid Close-up Photo with Dual Ring Frame */}
            <div className={styles.circleEyeWrapper}>
              <Image
                src="/images/blepharoplasty/blepharoplasty-stats-eyelid.webp"
                alt="Close-up of refined natural eyelid contour and crease"
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
                  <EyelidContourIcon />
                </div>
                <div className={styles.featureText}>
                  Refreshed<br />Eyelid Contour
                </div>
              </div>

              <div className={styles.featureDivider} aria-hidden="true" />

              <div className={styles.featureItem} role="listitem">
                <div className={styles.featureIconCircle} aria-hidden="true">
                  <ClearVisionIcon />
                </div>
                <div className={styles.featureText}>
                  Clear Vision<br />& Comfort
                </div>
              </div>

              <div className={styles.featureDivider} aria-hidden="true" />

              <div className={styles.featureItem} role="listitem">
                <div className={styles.featureIconCircle} aria-hidden="true">
                  <ShieldPrecisionIcon />
                </div>
                <div className={styles.featureText}>
                  Oculoplastic<br />Precision
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
