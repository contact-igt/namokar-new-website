import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/config/site";
import { CalendarIcon } from "./Icons";
import styles from "./ExpertEyeCareSection.module.css";

/** Top kicker eye icon */
function EyeBadgeIcon() {
  return (
    <svg viewBox="0 0 24 16" fill="none" width="18" height="13" aria-hidden="true">
      <path
        d="M1 8C3.8 3.5 7.5 1.5 12 1.5C16.5 1.5 20.2 3.5 23 8C20.2 12.5 16.5 14.5 12 14.5C7.5 14.5 3.8 12.5 1 8Z"
        stroke="#C35626"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="8" r="3.2" stroke="#C35626" strokeWidth="1.8" />
      <circle cx="12" cy="8" r="1.4" fill="#C35626" />
    </svg>
  );
}

/** Card 1: Eyelid surgery icon */
function EyelidCardIcon() {
  return (
    <svg viewBox="0 0 32 24" fill="none" width="28" height="22" aria-hidden="true">
      <path
        d="M2 12C6 5.5 11 2.5 16 2.5C21 2.5 26 5.5 30 12C26 18.5 21 21.5 16 21.5C11 21.5 6 18.5 2 12Z"
        stroke="#C35626"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="12" r="5" stroke="#C35626" strokeWidth="2" />
      <circle cx="16" cy="12" r="2.2" fill="#C35626" />
    </svg>
  );
}

/** Card 2: Reconstructive oculoplasty eyelid & lashes icon */
function ReconstructiveCardIcon() {
  return (
    <svg viewBox="0 0 32 26" fill="none" width="28" height="24" aria-hidden="true">
      <path
        d="M3 13C8 6 13 3.5 16 3.5C19 3.5 24 6 29 13"
        stroke="#C35626"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="16" cy="13" r="4.2" stroke="#C35626" strokeWidth="2" />
      <circle cx="16" cy="13" r="1.8" fill="#C35626" />
      <line x1="16" y1="18.5" x2="16" y2="23" stroke="#C35626" strokeWidth="2" strokeLinecap="round" />
      <line x1="11.5" y1="17.5" x2="9.5" y2="21.5" stroke="#C35626" strokeWidth="2" strokeLinecap="round" />
      <line x1="20.5" y1="17.5" x2="22.5" y2="21.5" stroke="#C35626" strokeWidth="2" strokeLinecap="round" />
      <line x1="7.5" y1="16" x2="5.5" y2="19.5" stroke="#C35626" strokeWidth="2" strokeLinecap="round" />
      <line x1="24.5" y1="16" x2="26.5" y2="19.5" stroke="#C35626" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Card 3: Comprehensive eye exams shield icon */
function ComprehensiveCardIcon() {
  return (
    <svg viewBox="0 0 34 26" fill="none" width="30" height="24" aria-hidden="true">
      <path
        d="M2 13C6 6.5 11 3.5 16 3.5C21 3.5 26 6.5 30 13C27.5 17 23.5 19.5 19.5 20.5"
        stroke="#C35626"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="13" r="4.5" stroke="#C35626" strokeWidth="2" />
      <path
        d="M23 10.5L28 12.5V17C28 20.5 25.5 23.5 23 24.5C20.5 23.5 18 20.5 18 17V12.5L23 10.5Z"
        fill="#FFFFFF"
        stroke="#C35626"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 17.5L22.2 19.2L25.5 15.5"
        stroke="#C35626"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Right arrow icon for enhanced action buttons */
function ArrowRightIconComponent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      width="14"
      height="14"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8H13M13 8L8.8 3.8M13 8L8.8 12.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const SERVICE_CARD_IMAGES: Record<string, { image: string; alt: string }> = {
  eyelid: {
    image: "/images/services/eyelid-blepharoplasty-care.webp",
    alt: "Specialist blepharoplasty and eyelid evaluation",
  },
  reconstructive: {
    image: "/images/services/reconstructive-oculoplasty-care.webp",
    alt: "Reconstructive oculoplasty and tear drainage treatment",
  },
  exams: {
    image: "/images/services/eye-examination-care.webp",
    alt: "Comprehensive eye examination with slit lamp technology",
  },
  aesthetic: {
    image: "/images/services/aesthetic-oculoplasty-care.webp",
    alt: "Aesthetic oculoplasty consultation for delicate eye areas",
  },
  cataract: {
    image: "/images/services/cataract-care.webp",
    alt: "Cataract surgery consultation and slit-lamp eye assessment",
  },
  glaucoma: {
    image: "/images/services/glaucoma-care.webp",
    alt: "Glaucoma diagnostic evaluation and eye pressure testing",
  },
};

const SERVICES_DATA = [
  {
    title: "Eyelid Surgery\n(Blepharoplasty)",
    desc: "Assessment of heavy or drooping eyelids and under-eye bags, for functional and cosmetic reasons, including whether surgery would help.",
    href: LINKS.eyelid,
    image: "/images/services/eyelid-blepharoplasty-care.webp",
    alt: "Specialist blepharoplasty and eyelid evaluation",
    icon: <EyelidCardIcon />,
  },
  {
    title: "Reconstructive\nOculoplasty",
    desc: "Assessment and treatment for drooping eyelids (ptosis), eyelid malposition and tear-drainage problems.",
    href: LINKS.reconstructive,
    image: "/images/services/reconstructive-oculoplasty-care.webp",
    alt: "Reconstructive oculoplasty and tear drainage treatment",
    icon: <ReconstructiveCardIcon />,
  },
  {
    title: "Comprehensive\nEye Examinations",
    desc: "A thorough check of how well you see and how healthy your eyes are, from routine check-ups to specific concerns.",
    href: LINKS.exams,
    image: "/images/services/eye-examination-care.webp",
    alt: "Comprehensive eye examination with slit lamp technology",
    icon: <ComprehensiveCardIcon />,
  },
];

export default function ExpertEyeCareSection({
  id = "related-care",
  items,
  badge = "Related Care",
  heading,
  subtitle,
  showBanner = true,
}: {
  id?: string;
  items?: { title: string; desc: string; href: string; image: string; alt: string }[];
  badge?: string;
  heading?: React.ReactNode;
  subtitle?: React.ReactNode;
  showBanner?: boolean;
}) {
  return (
    <section id={id} className={styles.sectionWrap} aria-labelledby={`${id}-h`}>
      {/* Decorative Top-Left Soft Peach Wave */}
      <div className={styles.bgWaveTopLeft} aria-hidden="true">
        <svg viewBox="0 0 420 220" fill="none" preserveAspectRatio="none">
          <path
            d="M 0,0 C 120,40 240,110 320,180 C 370,220 400,240 420,260 L 0,260 Z"
            fill="#FDF1E8"
            opacity="0.6"
          />
        </svg>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          {/* Top Pill Badge */}
          <div className={styles.pillBadge}>
            <EyeBadgeIcon />
            <span>{badge}</span>
          </div>

          {/* Heading */}
          <h2 id={`${id}-h`} className={styles.heading}>
            {heading ?? (
              <>
                Expert <span className={styles.headingOrange}>Eye Care</span> Services
              </>
            )}
          </h2>

          {/* Subtitle */}
          {subtitle !== undefined ? (
            subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null
          ) : !heading ? (
            <p className={styles.subtitle}>
              Comprehensive treatments and assessments for better vision and healthier eyes.
            </p>
          ) : null}

          {/* Small Terracotta Accent Bar */}
          <span className={styles.accentBar} aria-hidden="true" />
        </div>

        {/* 3 Services Cards Grid */}
        <div className={styles.cardsGrid}>
          {(items ? items.map((item) => ({ ...item, icon: <EyeBadgeIcon /> })) : SERVICES_DATA).map((card, idx) => (
            <div key={idx} className={styles.serviceCard}>
              {/* Card Top Image */}
              <div className={styles.cardImageWrap}>
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 992px) 31vw, (min-width: 600px) 46vw, 100vw"
                  className={styles.cardImg}
                />
              </div>

              {/* Floating Center Circular Icon Badge */}
              <div className={styles.iconCircleBadge} aria-hidden="true">
                {card.icon}
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  {card.title.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < card.title.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h3>
                <p className={styles.cardDesc}>{card.desc}</p>
                <div className={styles.cardAction}>
                  <Link href={card.href} className={styles.learnMoreBtn}>
                    <span>Learn More</span>
                    <span className={styles.arrowCircle} aria-hidden="true">
                      <ArrowRightIconComponent />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Card: "Your Vision. Our Priority." */}
        {showBanner && <div className={styles.bottomBannerCard}>
          {/* Left Eye Graphic with HUD Arc */}
          <div className={styles.bannerEyeCol}>
            <div className={styles.bannerEyeWrap}>
              <Image
                src="/images/related-care/banner-eye-graphic.webp"
                alt="Advanced precision eye care at Namokar Centre"
                fill
                sizes="(min-width: 768px) 210px, 160px"
                className={styles.bannerEyeImg}
              />
            </div>
          </div>

          {/* Center Copy */}
          <div className={styles.bannerCopyCol}>
            <h3 className={styles.bannerHeadline}>
              Your Vision. <span className={styles.bannerHeadlineOrange}>Our Priority.</span>
            </h3>
            <p className={styles.bannerSubtext}>
              Trust Namokar Eye &amp; Oculoplasty Centre for advanced and compassionate eye care.
            </p>
          </div>

          {/* Right Action CTA Button */}
          <div className={styles.bannerActionCol}>
            <Link href={`${LINKS.contact}#request`} className={styles.consultationBtn}>
              <span className={styles.btnCalendarIcon} aria-hidden="true">
                <CalendarIcon width={18} height={18} />
              </span>
              <span>Book a Consultation</span>
              <span className={styles.bannerArrowCircle} aria-hidden="true">
                <ArrowRightIconComponent />
              </span>
            </Link>
          </div>

          {/* Background Top-Right Dot Matrix */}
          <div className={styles.bannerDotMatrix} aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className={styles.dot} />
            ))}
          </div>
        </div>}
      </div>
    </section>
  );
}

