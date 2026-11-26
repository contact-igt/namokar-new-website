"use client";

import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/config/site";
import { ArrowRightIcon } from "./Icons";
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
    text: "An abnormally low upper eyelid margin. It can be present from birth or develop later.",
    icon: "/images/reconstructive/term-ptosis.webp",
    href: "#lidMalposition",
    customClass: styles.cardPtosis,
  },
  {
    key: "ectropion",
    term: "Ectropion",
    text: "An eyelid margin that turns outwards, exposing the eye surface or disrupting tear drainage.",
    icon: "/images/reconstructive/term-ectropion.webp",
    href: "#lidMalposition",
    customClass: styles.cardEctropion,
  },
  {
    key: "tearduct",
    term: "Tear-duct blockage",
    text: "A narrowing or obstruction within the system that drains tears from the eye into the nose.",
    icon: "/images/reconstructive/term-tearduct.webp",
    href: "#tearPathway",
    customClass: styles.cardTearDuct,
  },
];

const RIGHT_TERMS: TermItem[] = [
  {
    key: "entropion",
    term: "Entropion",
    text: "An eyelid margin that turns inwards, allowing lashes or skin to rub the eye surface.",
    icon: "/images/reconstructive/term-entropion.webp",
    href: "#lidMalposition",
    customClass: styles.cardEntropion,
  },
  {
    key: "epiphora",
    term: "Epiphora",
    text: "Excessive watering of the eye. Causes include dry eye, irritation, allergies, eyelid abnormalities, excess tear production and impaired drainage.",
    icon: "/images/reconstructive/term-epiphora.webp",
    href: "#tearPathway",
    customClass: styles.cardEpiphora,
  },
  {
    key: "orbit",
    term: "Orbit",
    text: "The bony cavity containing the eye, eye muscles, optic nerve, blood vessels, fat and other supporting structures.",
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
              <span className={styles.kickerText}>Understanding Oculoplasty</span>
            </div>

            <h2 id="terms-h" className={styles.heading}>
              Common Oculoplasty
              <br />
              <span className="title-secondary">Conditions &amp; Medical Terms</span>
            </h2>

            <p className={styles.lead}>
              Understanding common eyelid, tear-drainage and orbital conditions can help you make informed decisions about your eye care.
            </p>

            <Link href={`${LINKS.contact}#request`} className={styles.bookButton}>
              <CalendarIcon />
              <span>Book a Consultation</span>
              <span className={styles.btnArrow} aria-hidden="true">
                <ArrowRightIcon width={18} height={18} />
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

