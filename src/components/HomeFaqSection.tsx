import HeadingText from "@/components/HeadingText";
import homeStyles from "@/app/home-redesign.module.css";
import { useId, type ReactNode } from "react";
import { PinIcon } from "@/components/Icons";

export type FaqIconName = "eye" | "lid" | "drop" | "doctor" | "scalpel" | "eyebag" | "calendar" | "clipboard" | "phone" | "pin" | "shield" | "heart";

export function FaqIcon({ name }: { name: FaqIconName }) {
  const icons = {
    pin: <PinIcon width="22" height="22" />,
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
        <path d="m8 12 3 3 5-6" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    ),
    eye: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6-10-6-10-6Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    lid: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M4 10.5c3 3.5 13 3.5 16 0" />
        <line x1="5.5" y1="12" x2="4.5" y2="15.5" />
        <line x1="9" y1="13.2" x2="8.5" y2="17" />
        <line x1="12.5" y1="13.5" x2="12.5" y2="17.5" />
        <line x1="16" y1="13.2" x2="16.5" y2="17" />
        <line x1="19.5" y1="12" x2="20.5" y2="15.5" />
      </svg>
    ),
    drop: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M12 2.7c-3.8 4.8-6 8-6 11.3a6 6 0 0 0 12 0c0-3.3-2.2-6.5-6-11.3Z" />
      </svg>
    ),
    doctor: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="12" cy="7" r="3.5" />
        <path d="M5 6.5C5 5 7 4 12 4s7 1 7 2.5v1.5H5Z" />
        <path d="M4 20a8 8 0 0 1 16 0" />
        <path d="M12 14v4M10 16h4" />
      </svg>
    ),
    scalpel: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="m4 20 8.5-8.5" />
        <path d="M14.5 9.5 18 6c1.5-1.5 3-1 3.5-.5s1 2-.5 3.5l-3.5 3.5-3-3Z" />
      </svg>
    ),
    eyebag: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M2.5 11s3.6-5 9.5-5 9.5 5 9.5 5-3.6 5-9.5 5-9.5-5-9.5-5Z" />
        <circle cx="12" cy="11" r="2.5" />
        <path d="M6 16.5c2 2 10 2 12 0" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <rect x="3.5" y="4.5" width="17" height="15.5" rx="3" />
        <path d="M3.5 9.5h17M8 2.5v4M16 2.5v4" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
    clipboard: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 2h6v3H9Z" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="15" y2="14" />
        <line x1="9" y1="18" x2="12" y2="18" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  };
  return icons[name] || icons.eye;
}

export default function HomeFaqSection({items, title = "Questions Patients Often Ask", eyebrow = "Common questions", intro, className = "", icons, animateIntro = true, allClosed = false}: {items: {q: string; a: string}[]; title?: string; eyebrow?: string; intro?: ReactNode; className?: string; icons?: FaqIconName[]; animateIntro?: boolean; allClosed?: boolean}) {
  const accordionName = useId();
  return <div className={homeStyles.homeRedesign}>
        <section id="faq" className={`section faq-section ${className}`} aria-labelledby="faq-h">
          <div className="container faq-shell">
            <div className={`faq-intro${animateIntro ? " reveal" : ""}`}>
              {intro ?? <>
              <p className="kicker faq-kicker">{eyebrow}</p>
              <h2 id="faq-h" className="h2 faq-h2"><HeadingText>{title}</HeadingText></h2>
              <p className="faq-lead">
                This is general information. Your own eyes need to be examined before
                anyone can advise you.
              </p>
              </>}
            </div>

            <div className="faq-list faq-list--cards">
              {items.map((f, i) => {
                const iconNames = ["eye", "lid", "drop", "doctor", "scalpel", "eyebag", "calendar", "clipboard", "phone"] as const;
                const iconName = icons?.[i] ?? iconNames[i] ?? "eye";
                return (
                  <details key={f.q} name={accordionName} className="faq-card" open={!allClosed && i === 0 ? true : undefined}>
                    <summary className="faq-summary">
                      <span className="faq-card-icon" aria-hidden="true">
                        <FaqIcon name={iconName} />
                      </span>
                      <span className="faq-question-text">{f.q}</span>
                      <span className="faq-chevron-wrap" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </summary>
                    <p className="faq-answer">{f.a}</p>
                  </details>
                );
              })}
            </div>
          </div>
        </section>
  </div>;
}
