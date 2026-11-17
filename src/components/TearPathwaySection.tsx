"use client";

import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/config/site";
import styles from "./TearPathwaySection.module.css";

/* ============================================================
   SVG Icons matching the reference design
   ============================================================ */

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="18"
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

function CheckIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LightbulbIcon() {
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
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
    </svg>
  );
}

function AlertCircleIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default function TearPathwaySection({
  id = "tearPathway",
  heading = "How tears drain, and what a blockage can mean",
  intro = "Compare normal tear drainage with what can happen when the passage is blocked.",
}: {
  id?: string;
  heading?: string;
  intro?: string;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-h`}>
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          {/* ============================================================
              LEFT COLUMN: Copy & CTA Button
              ============================================================ */}
          <div className={styles.leftCol}>
            <div className={styles.copyWrapper}>
              <div className={styles.kickerRow}>
                <span className={styles.kickerLine} aria-hidden="true" />
                <span className={styles.kickerText}>See it explained</span>
              </div>

              <h2 id={`${id}-h`} className={styles.heading}>
                {heading.includes("and what") ? (
                  <>
                    How tears drain,
                    <br />
                    and what a{" "}
                    <span className={`${styles.headingSecondary} title-secondary`}>
                      blockage
                      <br />
                      can mean
                    </span>
                  </>
                ) : (
                  heading
                )}
              </h2>

              <p className={styles.lead}>{intro}</p>

              <Link href={`${LINKS.contact}#request`} className={styles.ctaButton}>
                <CalendarIcon />
                <span>Book a Consultation</span>
                <span className={styles.btnArrow} aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>

          {/* ============================================================
              RIGHT COLUMN: Side-by-Side Comparison Cards
              ============================================================ */}
          <div className={styles.rightCol}>
            <div className={styles.cardsGrid}>
              {/* ---------------- CARD 1: Normal Drainage ---------------- */}
              <div
                className={styles.card}
                role="region"
                aria-label="Normal Drainage Explanation"
              >
                <div className={styles.badgeContainer}>
                  <span className={styles.badgeNormal}>Normal Drainage</span>
                </div>

                <div className={styles.cardImageFrame}>
                  <Image
                    src="/images/tears-drain.png"
                    alt="Diagram showing normal tear drainage from the eye corner down the tear duct into the nose"
                    width={1536}
                    height={1024}
                    priority
                    className={styles.cardImage}
                  />
                </div>

                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <span className={styles.checkCircleNormal}>
                      <CheckIcon />
                    </span>
                    <span className={styles.checkText}>
                      Tears flow from the eye corner
                    </span>
                  </li>
                  <li className={styles.checkItem}>
                    <span className={styles.checkCircleNormal}>
                      <CheckIcon />
                    </span>
                    <span className={styles.checkText}>
                      Through the tear ducts
                    </span>
                  </li>
                  <li className={styles.checkItem}>
                    <span className={styles.checkCircleNormal}>
                      <CheckIcon />
                    </span>
                    <span className={styles.checkText}>Into the nose</span>
                  </li>
                </ul>

                <div className={styles.calloutNormal}>
                  <div className={styles.calloutIconCircleNormal}>
                    <LightbulbIcon />
                  </div>
                  <p className={styles.calloutTextNormal}>
                    This keeps your eyes hydrated and clear.
                  </p>
                </div>
              </div>

              {/* ---------------- CARD 2: Blocked Passage ---------------- */}
              <div
                className={styles.card}
                role="region"
                aria-label="Blocked Passage Explanation"
              >
                <div className={styles.badgeContainer}>
                  <span className={styles.badgeBlocked}>Blocked Passage</span>
                </div>

                <div className={styles.cardImageFrame}>
                  <Image
                    src="/images/passage-blocked.png"
                    alt="Diagram showing a blocked passage in the tear duct causing fluid retention"
                    width={1536}
                    height={1024}
                    priority
                    className={styles.cardImage}
                  />
                </div>

                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <span className={styles.checkCircleBlocked}>
                      <CheckIcon />
                    </span>
                    <span className={styles.checkText}>
                      Tears cannot drain properly
                    </span>
                  </li>
                  <li className={styles.checkItem}>
                    <span className={styles.checkCircleBlocked}>
                      <CheckIcon />
                    </span>
                    <span className={styles.checkText}>
                      May lead to watery eyes
                    </span>
                  </li>
                  <li className={styles.checkItem}>
                    <span className={styles.checkCircleBlocked}>
                      <CheckIcon />
                    </span>
                    <span className={styles.checkText}>
                      Or recurrent infections
                    </span>
                  </li>
                </ul>

                <div className={styles.calloutBlocked}>
                  <div className={styles.calloutIconCircleBlocked}>
                    <AlertCircleIcon />
                  </div>
                  <p className={styles.calloutTextBlocked}>
                    A blocked passage can cause excessive tearing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
