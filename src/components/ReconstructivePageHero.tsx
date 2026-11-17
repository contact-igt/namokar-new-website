"use client";

import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import BookButton from "@/components/BookButton";
import { LINKS } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import styles from "./ReconstructivePageHero.module.css";

interface ReconstructivePageHeroProps {
  crumb?: string;
  kicker?: string;
  titleLine1?: string;
  titleLine2?: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
}

export default function ReconstructivePageHero({
  crumb = "Reconstructive Oculoplasty",
  kicker = "RECONSTRUCTIVE OCULOPLASTY",
  titleLine1 = "Restoring eye function,",
  titleLine2 = "comfort and confidence.",
  lead = "Reconstructive oculoplasty treats medical and functional concerns of the eyelids, tear ducts, eye socket and surrounding eye structures with a focus on safety, comfort and natural restoration.",
  image = "/images/reconstructive/doctor-eyelid-examination.webp",
  imageAlt = "Illustrative image of an eye doctor carefully examining a patient's eyelid in a clinical treatment room at Namokar Eye & Oculoplasty Centre",
}: ReconstructivePageHeroProps) {
  const online = onlineBookingAvailable();

  return (
    <div className={styles.heroWrapper}>
      <section className={styles.heroSection} aria-label="Reconstructive Oculoplasty Overview">
        {/* Right-side Consultation Artwork with Left-to-Right Opacity Gradient Fade */}
        <div className={styles.heroRightVisual} aria-hidden="true">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className={styles.heroRightImg}
          />
          <div className={styles.mobileBgProtection} />
        </div>

        <div className={`container ${styles.container}`}>
          <div className={styles.mainLayout}>
            {/* Left Column: Breadcrumb, Kicker, Heading, Description, Booking Button */}
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

              {/* Two-line heading */}
              <h1 className={styles.heading}>
                <span>{titleLine1}</span>
                <span className="title-secondary">{titleLine2}</span>
              </h1>

              {/* Body lead description */}
              <p className={styles.lead}>{lead}</p>

              {/* CTA Booking Button */}
              <div className={styles.actions}>
                <BookButton online={online} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
