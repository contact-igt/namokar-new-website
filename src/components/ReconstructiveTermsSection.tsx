"use client";

import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/config/site";
import styles from "./ReconstructiveTermsSection.module.css";

interface TermItem {
  key: string;
  term: string;
  text: string;
  icon: string;
  href: string;
  customClass: string;
}

const LEFT_TERMS: TermItem[] = [
  {
    key: "ptosis",
    term: "Ptosis",
    text: "An upper eyelid that sits lower than normal.",
    icon: "/images/reconstructive/term-ptosis.webp",
    href: "#lidMalposition",
    customClass: styles.cardPtosis,
  },
  {
    key: "ectropion",
    term: "Ectropion",
    text: "An eyelid that turns outwards, away from the eye.",
    icon: "/images/reconstructive/term-ectropion.webp",
    href: "#lidMalposition",
    customClass: styles.cardEctropion,
  },
  {
    key: "tearduct",
    term: "Tear-duct blockage",
    text: "A narrowing or block in the channel that drains tears.",
    icon: "/images/reconstructive/term-tearduct.webp",
    href: "#tearPathway",
    customClass: styles.cardTearDuct,
  },
];

const RIGHT_TERMS: TermItem[] = [
  {
    key: "entropion",
    term: "Entropion",
    text: "An eyelid that turns inwards, so the lashes rub the eye.",
    icon: "/images/reconstructive/term-entropion.webp",
    href: "#lidMalposition",
    customClass: styles.cardEntropion,
  },
  {
    key: "epiphora",
    term: "Epiphora",
    text: "Watering of the eye, often because tears are not draining.",
    icon: "/images/reconstructive/term-epiphora.webp",
    href: "#tearPathway",
    customClass: styles.cardEpiphora,
  },
  {
    key: "orbit",
    term: "Orbit",
    text: "The bony socket that holds the eye.",
    icon: "/images/reconstructive/term-orbit.webp",
    href: "#journey",
    customClass: styles.cardOrbit,
  },
];

function CalendarIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function ReconstructiveTermsSection({ id = "terms" }: { id?: string }) {
  return (
    <section id={id} className={styles.section} aria-labelledby="terms-h">
      <div className={styles.container}>
        <div className={styles.mainLayout}>
          {/* LEFT COLUMN: Headings & CTA */}
          <div className={styles.leftCol}>
            <div className={styles.kickerRow}>
              <span className={styles.kickerLine} aria-hidden="true" />
              <span className={styles.kickerText}>In Plain Words</span>
            </div>

            <h2 id="terms-h" className={styles.heading}>
              Terms you
              <br />
              <span className="title-secondary">may hear</span>
            </h2>

            <p className={styles.lead}>
              Oculoplasty uses some unfamiliar words. These are the common ones. The
              doctor explains any others.
            </p>

            <Link href={`${LINKS.contact}#request`} className={styles.bookButton}>
              <CalendarIcon />
              <span>Book a Consultation</span>
              <span className={styles.btnArrow} aria-hidden="true">
                &gt;
              </span>
            </Link>
          </div>

          {/* RIGHT COLUMN: Center Eye + 6 Radial Cards */}
          <div className={styles.rightCol}>
            {/* Left 3 Cards (Ptosis, Ectropion, Tear-duct blockage) */}
            <div className={styles.cardColLeft}>
              {LEFT_TERMS.map((item) => (
                <div key={item.key} className={`${styles.card} ${item.customClass}`}>
                  <div className={styles.iconBadge}>
                    <Image
                      src={item.icon}
                      alt={item.term}
                      width={68}
                      height={68}
                      className={styles.iconImg}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTerm}>{item.term}</h3>
                    <p className={styles.cardDesc}>{item.text}</p>
                    <Link href={item.href} className={styles.learnMoreLink}>
                      Learn More
                      <ChevronRightIcon />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Circular Eye with Concentric Rings and Dots */}
            <div className={styles.eyeCenterCol}>
              <div className={styles.outerOrbitRing} aria-hidden="true" />
              <div className={styles.connectorLineLeft} aria-hidden="true" />
              <div className={styles.connectorLineRight} aria-hidden="true" />
              <div className={styles.eyeCircleFrame}>
                <Image
                  src="/images/reconstructive/terms-center-eye-hq.webp"
                  alt="Oculoplasty clinical eye examination"
                  width={240}
                  height={240}
                  priority
                  className={styles.eyeImage}
                />
              </div>
            </div>

            {/* Right 3 Cards (Entropion, Epiphora, Orbit) */}
            <div className={styles.cardColRight}>
              {RIGHT_TERMS.map((item) => (
                <div key={item.key} className={`${styles.card} ${item.customClass}`}>
                  <div className={styles.iconBadge}>
                    <Image
                      src={item.icon}
                      alt={item.term}
                      width={68}
                      height={68}
                      className={styles.iconImg}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTerm}>{item.term}</h3>
                    <p className={styles.cardDesc}>{item.text}</p>
                    <Link href={item.href} className={styles.learnMoreLink}>
                      Learn More
                      <ChevronRightIcon />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

