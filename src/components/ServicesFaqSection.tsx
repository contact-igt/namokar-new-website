import Link from "next/link";
import { LINKS } from "@/config/site";
import BookButton from "./BookButton";
import styles from "@/app/our-services/services.module.css";
import HomeFaqSection, { FaqIcon, type FaqIconName } from "./HomeFaqSection";
import { ArrowRightIcon, CalendarIcon } from "./Icons";

const topicIcons: Record<"cataract" | "glaucoma" | "exams", FaqIconName[]> = {
  cataract: ["doctor", "eye", "scalpel", "doctor", "drop", "eye", "clipboard"],
  glaucoma: ["shield", "eye", "calendar", "doctor", "eye", "eye", "shield", "clipboard", "drop", "calendar", "doctor"],
  exams: ["calendar", "eye", "shield", "drop", "eye", "clipboard", "doctor", "phone"],
};

export default function ServicesFaqSection({ items, aesthetic = false, heading, lead, serviceStyle = false, online = false, topic }: {
  items: { q: string; a: string }[];
  aesthetic?: boolean;
  heading?: string;
  lead?: string;
  serviceStyle?: boolean;
  online?: boolean;
  topic?: "cataract" | "glaucoma" | "exams";
}) {
  return (
    <div className={styles.page}>
      <HomeFaqSection
        items={items}
        icons={serviceStyle && topic ? topicIcons[topic] : aesthetic ? ["lid", "eyebag", "shield", "doctor"] : ["eye", "doctor", "lid", "scalpel", "clipboard", "calendar", "pin"]}
        className={`${styles.servicesFaq} ${aesthetic && !heading ? styles.aestheticFaq : ""} ${serviceStyle ? styles.targetedServiceFaq : ""}`}
        animateIntro={!serviceStyle}
        intro={
          <>
            <div className={styles.kickerWrap}>
              <span className={styles.kickerBar} aria-hidden="true" />
              <span className={styles.kickerText}>{serviceStyle || aesthetic ? "Common questions" : "Finding your way"}</span>
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
              <li><span aria-hidden="true"><FaqIcon name="heart" /></span>{aesthetic || serviceStyle ? "Eye health first" : "Better vision"}</li>
            </ul>
            {serviceStyle ? <BookButton online={online} className={styles.btnPrimary} /> : <Link href={`${LINKS.contact}#request`} className={styles.btnPrimary}>
              <CalendarIcon /> Book a Consultation <ArrowRightIcon />
            </Link>}
          </>
        }
      />
    </div>
  );
}
