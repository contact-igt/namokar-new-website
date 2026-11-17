"use client";

import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import BookButton from "@/components/BookButton";
import { LINKS } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import styles from "./GlaucomaPageHero.module.css";

interface GlaucomaPageHeroProps {
  crumb?: string;
  kicker?: string;
  titleLine1?: string;
  titleLine2?: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
}

export default function GlaucomaPageHero({
  crumb = "Glaucoma Management",
  kicker = "GLAUCOMA MANAGEMENT",
  titleLine1 = "Protecting Sight,",
  titleLine2 = "Preserving Vision.",
  lead = "Glaucoma develops gradually without early warning. Regular examinations, precise pressure monitoring, and tailored treatment protect your optic nerve and sight.",
  image = "/images/archive-glaucoma-test.webp",
  imageAlt = "Advanced glaucoma eye pressure and optic nerve testing equipment at Namokar Eye & Oculoplasty Centre",
}: GlaucomaPageHeroProps) {
  const online = onlineBookingAvailable();

  return (
    <div className={styles.heroWrapper}>
      <section className={styles.heroSection} aria-label="Glaucoma Management Overview">
        {/* Right-side Visual Artwork with Left-to-Right Opacity Gradient Fade */}
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
