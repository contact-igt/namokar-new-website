import Link from "next/link";
import { LINKS } from "@/config/site";
import styles from "@/app/our-services/services.module.css";
import HomeFaqSection, { FaqIcon } from "./HomeFaqSection";
import { ArrowRightIcon, CalendarIcon } from "./Icons";

export default function ServicesFaqSection({ items, aesthetic = false, heading, lead }: {
  items: { q: string; a: string }[];
  aesthetic?: boolean;
  heading?: string;
  lead?: string;
}) {
  return (
    <div className={styles.page}>
      <HomeFaqSection
        items={items}
        icons={aesthetic ? ["lid", "eyebag", "shield", "doctor"] : ["eye", "doctor", "lid", "scalpel", "clipboard", "calendar", "pin"]}
        className={`${styles.servicesFaq} ${aesthetic && !heading ? styles.aestheticFaq : ""}`}
        intro={
          <>
            <div className={styles.kickerWrap}>
              <span className={styles.kickerBar} aria-hidden="true" />
              <span className={styles.kickerText}>{aesthetic ? "Common questions" : "Finding your way"}</span>
            </div>
            <h2 id="faq-h" className={styles.sectionTitle}>
              {heading ?? (aesthetic ? <><span className={styles.faqTitleLine}>Your Aesthetic</span>{" "}<span className={styles.faqTitleLine}>Eye Care Questions,</span>{" "}<span className={`${styles.headingOrange} ${styles.faqTitleLine}`}>Answered</span></> : <>Your Eye Care Questions, <span className={styles.headingOrange}>Answered</span></>)}
            </h2>
            <p className={styles.sectionLead}>
              {lead ?? (aesthetic
                ? "Answers to common questions about aesthetic oculoplasty. Your eyes need to be examined before the doctor can advise which care is suitable for you."
                : "Get answers to common questions about our eye care services.")}
            </p>
            <ul className={styles.faqBenefits} aria-label="Our approach to care">
              <li><span aria-hidden="true"><FaqIcon name="eye" /></span>Expert guidance</li>
              <li><span aria-hidden="true"><FaqIcon name="shield" /></span>Personalized care</li>
              <li><span aria-hidden="true"><FaqIcon name="heart" /></span>{aesthetic ? "Eye health first" : "Better vision"}</li>
            </ul>
            <Link href={`${LINKS.contact}#request`} className={styles.btnPrimary}>
              <CalendarIcon /> Book a Consultation <ArrowRightIcon />
            </Link>
          </>
        }
      />
    </div>
  );
}
