"use client";

import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import BookButton from "@/components/BookButton";
import { LINKS } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import styles from "./AestheticPageHero.module.css";

interface AestheticPageHeroProps {
  crumb?: string;
  kicker?: string;
  titleLine1?: string;
  titleLine2?: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
}

export default function AestheticPageHero({
  crumb = "Aesthetic Oculoplasty",
  kicker = "AESTHETIC OCULOPLASTY",
  titleLine1 = "Aesthetic Eyelid Surgery",
  titleLine2 = "& Periocular Rejuvenation",
  lead = "Aesthetic oculoplasty focuses on improving the appearance of the eyelids, under-eye area and surrounding eye region while keeping eye safety and natural results as the priority.",
  image = "/images/aesthetic/dr-poonam-jain-aesthetic-hero.webp",
  imageAlt = "Dr. Poonam Jain, Senior Oculoplasty Specialist in Consultation at Namokar Eye & Oculoplasty Centre",
}: AestheticPageHeroProps) {
  const online = onlineBookingAvailable();

  return (
    <div className={styles.heroWrapper}>
      <section className={styles.heroSection} aria-label="Aesthetic Oculoplasty Overview">
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
                <span>{titleLine1}</span>{" "}
                <span className="title-secondary">{titleLine2}</span>
              </h1>

              <div className={styles.description}>
                <p className={styles.lead}>{lead}</p>
                <p className={styles.doctorIntro}>Consult Dr. Poonam Jain, an internationally trained ophthalmologist and oculoplastic surgeon with over 28 years of clinical and surgical experience.</p>
              </div>

              {/* CTA Booking Button */}
              <div className={styles.actions}>
                <BookButton online={online} label={online ? "Request an Aesthetic Oculoplasty Consultation" : "Book an Aesthetic Oculoplasty Consultation"} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
