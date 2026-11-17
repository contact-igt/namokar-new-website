import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { LINKS } from "@/config/site";
import { CalendarIcon } from "./Icons";
import styles from "./ServicePageHero.module.css";

/** Eye icon matching reference */
function EyeIcon({ width = 24, height = 24 }: { width?: number; height?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={width}
      height={height}
      aria-hidden="true"
    >
      <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Shield with checkmark for Expert Doctors */
function ShieldCheckIcon({ width = 24, height = 24 }: { width?: number; height?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={width}
      height={height}
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/** Heart icon for Compassionate Care */
function HeartIcon({ width = 24, height = 24 }: { width?: number; height?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={width}
      height={height}
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7Z" />
    </svg>
  );
}

interface ServicePageHeroProps {
  crumb?: string;
  kicker?: string;
  titleLine1?: string;
  titleLine2?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function ServicePageHero({
  crumb = "Cataract Surgery",
  kicker = "CATARACT SURGERY",
  titleLine1 = "Clear Vision,",
  titleLine2 = "Brighter Life.",
  body = "Advanced cataract surgery with precision technology to help you see the world clearly again.",
  primaryLabel = "Learn About Cataract Surgery",
  primaryHref = "#overview",
  secondaryLabel = "Book a Consultation",
  secondaryHref = `${LINKS.contact}#request`,
}: ServicePageHeroProps) {
  return (
    <div className={styles.heroWrapper}>
      <section className={styles.heroSection} aria-label="Cataract Care Overview">
        {/* Full-width background image with right-aligned examination equipment */}
        <div className={styles.heroBg} aria-hidden="true">
          <Image
            src="/images/55b29aeb-2558-4b4e-b632-b0d35046e843.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImg}
          />
          <div className={styles.mobileBgProtection} />
        </div>

        <div className={styles.container}>
          {/* Main 2-column hero content */}
          <div className={styles.mainLayout}>
            {/* Left Column: Breadcrumbs, Section Label, Heading, Description, CTA Buttons */}
            <div className={styles.colText}>
              <div className={styles.breadcrumbWrap}>
                <Breadcrumb
                  current={crumb}
                  trail={[{ label: "Services", href: LINKS.allServices }]}
                />
              </div>

              {/* Section Kicker with orange bar */}
              <div className={styles.kicker}>
                <span className={styles.kickerBar} aria-hidden="true" />
                <span>{kicker}</span>
              </div>

              {/* Two-line heading with the shared secondary accent */}
              <h1 className={styles.heading}>
                <span>{titleLine1}</span>
                <span className="title-secondary">{titleLine2}</span>
              </h1>

              {/* Body lead description */}
              <p className={styles.lead}>{body}</p>

              {/* CTA Action Buttons */}
              <div className={styles.actions}>
                <a href={primaryHref} className={styles.btnPrimary}>
                  <span>{primaryLabel}</span>
                  <span className={styles.btnArrow} aria-hidden="true">
                    &rarr;
                  </span>
                </a>

                <Link href={secondaryHref} className={styles.btnSecondary}>
                  <span className={styles.btnIcon} aria-hidden="true">
                    <CalendarIcon width={18} height={18} />
                  </span>
                  <span>{secondaryLabel}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Area & Floating Badge */}
            <div className={styles.colVisual}>
              <div className={styles.mobileEquipment} aria-hidden="true">
                <Image
                  src="/images/55b29aeb-2558-4b4e-b632-b0d35046e843.png"
                  alt="Ophthalmic examination equipment"
                  fill
                  sizes="(max-width: 959px) 100vw, 1px"
                  className={styles.mobileEquipmentImg}
                />
              </div>
              <div className={styles.badgeWrap}>
                <div className={styles.infoBadge}>
                  <span className={styles.badgeIcon} aria-hidden="true">
                    <EyeIcon width={22} height={22} />
                  </span>
                  <span className={styles.badgeDivider} aria-hidden="true" />
                  <div className={styles.badgeText}>
                    <strong>See Clearly Again</strong>
                    <span>with Our Expert Cataract Care</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row of 4 trust cards above the full section background */}
          <ul className={styles.trustCards} aria-label="Key Cataract Care Highlights">
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <CalendarIcon width={28} height={28} />
              </span>
              <strong>Trusted Eye Care Since 25+ Years</strong>
            </li>
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <EyeIcon width={28} height={28} />
              </span>
              <strong>Advanced Technology</strong>
            </li>
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <ShieldCheckIcon width={28} height={28} />
              </span>
              <strong>Expert Doctors</strong>
            </li>
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <HeartIcon width={28} height={28} />
              </span>
              <strong>Compassionate Care</strong>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

