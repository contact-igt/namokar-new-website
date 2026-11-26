"use client";

import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import BookButton from "@/components/BookButton";
import { LINKS } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import styles from "./BlepharoplastyPageHero.module.css";

interface BlepharoplastyPageHeroProps {
  crumb?: string;
  kicker?: string;
  titleLine1?: string;
  titleLine2?: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
}

export default function BlepharoplastyPageHero({
  crumb = "Blepharoplasty",
  kicker = "EYELID SURGERY \u2013 BLEPHAROPLASTY",
  titleLine1 = "Functional & Aesthetic",
  titleLine2,
  lead = "Heavy, drooping or baggy eyelids can affect comfort and vision as well as appearance. The first step is a careful assessment to find out why.",
  image = "/images/blepharoplasty/blepharoplasty-hero-exam.webp",
  imageAlt = "Dr. Poonam Jain performing slit-lamp eye examination on a patient at Namokar Eye & Oculoplasty Centre",
}: BlepharoplastyPageHeroProps) {
  const online = onlineBookingAvailable();

  return (
    <div className={styles.heroWrapper}>
      <section className={styles.heroSection} aria-label="Blepharoplasty Overview">
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

              <h1 className={styles.heading}>
                <span className={styles.titleOpening}>{titleLine1}</span>{" "}
                <span className="title-secondary">
                  {titleLine2 ?? <>Eyelid Surgery{" "}<span className={styles.titleLocation}>in Delhi</span></>}
                </span>
              </h1>

              <div className={styles.description}>
                <p className={styles.lead}>{lead}</p>
                <p className={styles.doctorIntro}>Consult <strong>Dr. Poonam Jain</strong>, an internationally trained ophthalmologist and oculoplastic surgeon with over 28 years of clinical experience.</p>
              </div>

              {/* CTA Booking Button */}
              <div className={styles.actions}>
                <BookButton online={online} label={online ? "Request an Eyelid Surgery Consultation" : "Book an Eyelid Surgery Consultation"} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
