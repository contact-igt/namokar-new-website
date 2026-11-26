import Image from "next/image";
import Link from "next/link";
import { LINKS, TEL_HREF, type ServiceKey } from "@/config/site";
import BookButton from "./BookButton";
import styles from "@/app/our-services/services.module.css";
import HomeFaqSection, { FaqIcon, type FaqIconName } from "./HomeFaqSection";
import { ArrowRightIcon, CalendarIcon } from "./Icons";

const topicIcons: Record<ServiceKey | "squint", FaqIconName[]> = {
  squint: ["eye", "doctor", "lid", "scalpel", "clipboard", "calendar", "pin"],
  retina: [],
  lasik: [],
  cataract: ["calendar", "eye", "scalpel", "doctor", "eye", "clipboard", "eye", "eye", "shield", "calendar", "eye", "scalpel", "phone", "clipboard"],
  glaucoma: ["shield", "eye", "eye", "doctor", "eye", "doctor", "shield", "clipboard", "drop", "scalpel", "eye", "drop", "eye", "calendar", "phone"],
  exams: ["calendar", "eye", "shield", "drop", "eye", "clipboard", "doctor", "phone"],
  eyelid: ["lid", "eye", "shield", "doctor", "calendar", "eye", "eyebag", "lid", "drop", "doctor", "calendar", "eye", "shield", "phone", "phone"],
  aesthetic: ["eye", "eyebag", "lid", "shield", "doctor", "calendar"],
  reconstructive: ["lid", "drop", "eye", "doctor", "shield", "clipboard"],
};

export default function ServicesFaqSection({
  items,
  aesthetic = false,
  heading,
  lead,
  serviceStyle = false,
  online = false,
  topic,
  image,
  allClosed = false,
}: {
  items: { q: string; a: string }[];
  aesthetic?: boolean;
  heading?: import("react").ReactNode;
  lead?: string;
  serviceStyle?: boolean;
  online?: boolean;
  topic?: ServiceKey | "squint";
  image?: string;
  allClosed?: boolean;
}) {
  const personalisedHighlights = topic === "exams" || topic === "cataract" || topic === "glaucoma" || !(aesthetic || serviceStyle);
  const bookingLabel = topic === "exams" ? (online ? "Request an Eye Examination" : "Book an Eye Examination")
    : topic === "glaucoma" ? (online ? "Request a Glaucoma Consultation" : "Book a Glaucoma Consultation")
    : topic === "eyelid" ? (online ? "Request an Eyelid Surgery Consultation" : "Book an Eyelid Surgery Consultation")
    : topic === "reconstructive" ? (online ? "Request a Reconstructive Oculoplasty Consultation" : "Book a Reconstructive Oculoplasty Consultation")
    : topic === "squint" ? (online ? "Request a Squint Consultation" : "Book a Squint Consultation")
    : topic === "aesthetic" ? (online ? "Request an Aesthetic Oculoplasty Consultation" : "Book an Aesthetic Oculoplasty Consultation") : undefined;
  return (
    <div className={styles.page}>
      <HomeFaqSection
        items={items}
        icons={serviceStyle && topic ? topicIcons[topic] : aesthetic ? ["lid", "eyebag", "shield", "doctor"] : ["eye", "doctor", "lid", "scalpel", "clipboard", "calendar", "pin"]}
        className={`${styles.servicesFaq} ${aesthetic && !heading ? styles.aestheticFaq : ""} ${serviceStyle ? styles.targetedServiceFaq : ""} ${image ? styles.faqWithImage : ""} ${topic === "cataract" ? styles.cataractFaq : ""}`}
        animateIntro={!serviceStyle}
        allClosed={allClosed}
        intro={
          <>
            <div className={styles.kickerWrap}>
              <span className={styles.kickerBar} aria-hidden="true" />
              <span className={styles.kickerText}>{serviceStyle || aesthetic ? "Common questions" : "Frequently Asked Questions"}</span>
            </div>
            <h2 id="faq-h" className={styles.sectionTitle}>
              {heading ?? (aesthetic ? <><span className={styles.faqTitleLine}>Your Aesthetic</span>{" "}<span className={styles.faqTitleLine}>Eye Care Questions,</span>{" "}<span className={`${styles.headingOrange} ${styles.faqTitleLine} title-secondary`}>Answered</span></> : <>Your Eye Care Questions, <span className={`${styles.headingOrange} title-secondary`}>Answered</span></>)}
            </h2>
            <p className={styles.sectionLead}>
              {lead ?? (aesthetic
                ? "Answers to common questions about aesthetic oculoplasty. Your eyes need to be examined before the doctor can advise which care is suitable for you."
                : "Get answers to common questions about our eye care services.")}
            </p>
            {image && (
              <div className={styles.faqImageWrap}>
                <Image
                  src={image}
                  alt="Optometric examination desk with prescription pad, eyeglasses, and eye chart"
                  width={1536}
                  height={1024}
                  className={styles.faqImage}
                  priority={false}
                />
              </div>
            )}
            <ul className={styles.faqBenefits} aria-label="Our approach to care">
              <li><span aria-hidden="true"><FaqIcon name="eye" /></span>{topic === "squint" ? "Doctor-Led Assessment" : topic === "aesthetic" || topic === "eyelid" || topic === "reconstructive" ? "Specialised Oculoplastic Care" : personalisedHighlights ? "Specialist Guidance" : "Expert guidance"}</li>
              <li><span aria-hidden="true"><FaqIcon name="shield" /></span>{topic === "aesthetic" ? "Individualised Aesthetic Planning" : topic === "eyelid" || topic === "reconstructive" || topic === "squint" ? "Individualised Treatment Planning" : personalisedHighlights ? "Personalised Care" : "Personalized care"}</li>
              <li><span aria-hidden="true"><FaqIcon name="heart" /></span>{topic === "squint" ? "Visual Function & Eye Health" : topic === "aesthetic" ? "Eye Health & Function" : topic === "reconstructive" ? "Eye Protection & Function" : topic === "glaucoma" ? "Long-Term Eye Care" : topic === "cataract" ? "Individualised Treatment Planning" : aesthetic || serviceStyle ? "Eye health first" : "Comprehensive Eye Care"}</li>
            </ul>
            {serviceStyle ? <BookButton online={online} className={styles.btnPrimary} label={bookingLabel} /> : <Link href={online ? `${LINKS.contact}#request` : TEL_HREF} className={styles.btnPrimary}>
              <CalendarIcon /> {online ? "Request a Consultation" : "Book a Consultation"} <ArrowRightIcon />
            </Link>}
          </>
        }
      />
    </div>
  );
}

