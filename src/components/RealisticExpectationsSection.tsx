"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LINKS } from "@/config/site";
import { ArrowRightIcon, CalendarIcon } from "./Icons";
import styles from "./RealisticExpectationsSection.module.css";

/**
 * Question data matching the design mockup and clinical consultation needs.
 */
interface QuestionItem {
  id: string;
  text: string;
  isExtra?: boolean;
}

const ALL_QUESTIONS: QuestionItem[] = [
  { id: "q1", text: "What is the underlying cause of my concern?" },
  { id: "q2", text: "Which treatment is being recommended, and why?" },
  { id: "q3", text: "Are there surgical or non-surgical alternatives?" },
  { id: "q4", text: "What changes can I realistically expect?" },
  { id: "q5", text: "What are the limitations and potential risks for me?", isExtra: true },
  { id: "q6", text: "What does recovery involve for my work and daily life?", isExtra: true },
  { id: "q7", text: "How long may the treatment effects last?", isExtra: true },
  { id: "q8", text: "What follow-up or additional treatment might I need?", isExtra: true },
  { id: "q9", text: "How would complications or unsatisfactory outcomes be managed?", isExtra: true },
];

/**
 * User Profile Avatar Silhouette Icon for Card Header
 */
function UserProfileIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/**
 * Clipboard Copy Icon
 */
function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width="16"
      height="16"
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

/**
 * Checkmark icon for copied state
 */
function CheckSuccessIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export interface RealisticExpectationsSectionProps {
  id?: string;
  bookingHref?: string;
}

export default function RealisticExpectationsSection({
  id = "expectations",
  bookingHref = `${LINKS.contact}#request`,
}: RealisticExpectationsSectionProps) {
  // Checkbox state: start with questions ready to be ticked
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
  });

  const [showExtra, setShowExtra] = useState(false);
  const [copied, setCopied] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const toggleQuestion = (qId: string) => {
    setCheckedMap((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
    // Reset copy state on changes
    setCopied(false);
    setStatusMsg("");
  };

  const visibleQuestions = ALL_QUESTIONS.filter((q) => !q.isExtra || showExtra);

  const handleCopyList = async () => {
    // If none checked, select all visible questions by default
    let selectedQuestions = visibleQuestions.filter((q) => checkedMap[q.id]);
    if (selectedQuestions.length === 0) {
      // Auto-check visible ones for better user experience
      const updated: Record<string, boolean> = { ...checkedMap };
      visibleQuestions.forEach((q) => {
        updated[q.id] = true;
      });
      setCheckedMap(updated);
      selectedQuestions = visibleQuestions;
    }

    const textToCopy = selectedQuestions
      .map((q, idx) => `${idx + 1}. ${q.text}`)
      .join("\n");

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
      }
      setCopied(true);
      setStatusMsg("✓ Copied! Paste into notes for your appointment.");
      setTimeout(() => {
        setCopied(false);
      }, 4000);
    } catch {
      setStatusMsg("Select questions above and copy manually if needed.");
    }
  };

  return (
    <section id={id} className={styles.sectionWrapper} aria-labelledby="expectations-heading">
      {/* Background Graphic Layer (Woman, ribbons, clinic bokeh, teal/orange wave) */}
      <div className={styles.bgLayer} aria-hidden="true" />

      {/* Scrim for crystal clear readability */}
      <div className={styles.bgScrim} aria-hidden="true" />

      {/* Main Container */}
      <div className={styles.contentContainer}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Copy & Actions */}
          <div className={styles.copyCol}>
            {/* Kicker with rust-orange accent bar */}
            <div className={styles.kickerRow}>
              <span className={styles.kickerLine} aria-hidden="true" />
              <p className={styles.kickerText}>REALISTIC TREATMENT EXPECTATIONS</p>
            </div>

            {/* Headline */}
            <h2 id="expectations-heading" className={styles.title}>
              Every Face Is Different. <span className={`${styles.highlight} title-secondary`}>Every Treatment Is Personal.</span>
            </h2>

            {/* Paragraph Description */}
            <p className={styles.lead}>
              Natural facial asymmetry, individual anatomy and ageing influence the appearance of the eyelids. Your consultation explores what changes are realistic, the potential risks and limitations, and options that consider facial harmony, personal preferences, eye health and eyelid function.
            </p>

            {/* CTA Button */}
            <Link href={bookingHref} className={styles.ctaBtn}>
              <span className={styles.ctaCalendarIcon} aria-hidden="true">
                <CalendarIcon width={19} height={19} />
              </span>
              <span>Book a Consultation</span>
              <span className={styles.ctaArrow} aria-hidden="true">
                <ArrowRightIcon width={18} height={18} />
              </span>
            </Link>
          </div>

          {/* Center Column: Floating Interactive Card */}
          <div className={styles.cardCol}>
            <div className={styles.floatingCard}>
              {/* Card Header with user silhouette icon */}
              <div className={styles.cardHeader}>
                <div className={styles.cardIconBox} aria-hidden="true">
                  <UserProfileIcon />
                </div>
                <h3 className={styles.cardTitle}>
                  Questions to Ask During Your Consultation
                </h3>
              </div>

              {/* Card Subtitle */}
              <p className={styles.cardSubtitle}>
                Select the questions you would like to discuss with your doctor.
              </p>

              {/* Checkboxes List */}
              <ul className={styles.questionsList} role="group" aria-label="Consultation questions">
                {visibleQuestions.map((q) => {
                  const isChecked = !!checkedMap[q.id];
                  return (
                    <li key={q.id}>
                      <label className={styles.questionItem}>
                        <input
                          type="checkbox"
                          className={styles.hiddenCheckbox}
                          checked={isChecked}
                          onChange={() => toggleQuestion(q.id)}
                          aria-label={q.text}
                        />
                        <span
                          className={`${styles.customCheckbox} ${
                            isChecked ? styles.customCheckboxChecked : ""
                          }`}
                          aria-hidden="true"
                        >
                          {isChecked && (
                            <svg
                              className={styles.checkSvg}
                              viewBox="0 0 14 14"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2.5 7.5L5.5 10.5L11.5 3.5" />
                            </svg>
                          )}
                        </span>
                        <span className={styles.questionText}>{q.text}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>

              {/* Show more toggle if 5th question is hidden */}
              {!showExtra && (
                <button
                  type="button"
                  className={styles.moreToggleBtn}
                  onClick={() => setShowExtra(true)}
                >
                  Show {ALL_QUESTIONS.filter((question) => question.isExtra).length} more questions
                </button>
              )}

              {/* Card Action: Copy my list */}
              <div className={styles.cardActions}>
                <button
                  type="button"
                  className={`${styles.copyBtn} ${copied ? styles.copyBtnSuccess : ""}`}
                  onClick={handleCopyList}
                >
                  {copied ? (
                    <>
                      <CheckSuccessIcon className={styles.copyIcon} />
                      <span>List Copied!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className={styles.copyIcon} />
                      <span>Copy my list</span>
                    </>
                  )}
                </button>
              </div>

              {/* Accessible Feedback message */}
              <p className={styles.statusMessage} aria-live="polite">
                {statusMsg}
              </p>
            </div>
          </div>

          {/* Right Spacer Column (Desktop visual visibility) */}
          <div className={styles.spacerCol} aria-hidden="true" />
        </div>

      </div>
    </section>
  );
}
