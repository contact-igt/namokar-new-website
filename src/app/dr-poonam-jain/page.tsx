import type { Metadata } from "next";
import Image from "next/image";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import EditorialImage from "@/components/EditorialImage";
import RegistrationRow from "@/components/RegistrationRow";
import BookButton, { SecondaryContact } from "@/components/BookButton";
import FaqList from "@/components/FaqList";
import { GraduationCapIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import { ASSETS, usable } from "@/config/assets";
import { PAGES } from "@/config/routes";
import { LINKS, SERVICES, SITE, TEL_HREF } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import JsonLd from "@/components/JsonLd";
import { faqPage, ids, physician, webPage } from "@/lib/schema";
import VideoSection from "@/components/VideoSection";
import { videosFor } from "@/content/videos";
import styles from "./doctor.module.css";

export const metadata: Metadata = pageMeta("doctor", {
  title: "Dr. Poonam Jain | Senior Ophthalmologist in Ashok Vihar, Delhi",
  description:
    "Dr. Poonam Jain, Medical Director and Senior Ophthalmologist at Namokar Eye & Oculoplasty Centre, Ashok Vihar, New Delhi. Focus: oculoplasty and eyelid care.",
  ogType: "profile",
});

const FAQS = [
  {
    q: "How do I arrange a consultation?",
    a: `Please call the centre on ${SITE.phone.display}. Tell the team briefly what is troubling you and they will help you find a time.`,
  },
  {
    q: "What should I bring?",
    a: "Previous prescriptions and eye reports, your current spectacles and a list of the medicines you take.",
  },
  {
    q: "What is the difference between a fellowship and an observership?",
    a: "A fellowship is a period of advanced clinical training. An observership means observing clinical practice at another institution. It is not a degree or a fellowship.",
  },
];

const serviceImages = {
  cataract: "/images/services/cataract-care.webp",
  glaucoma: "/images/services/glaucoma-care.webp",
  exams: "/images/services/eye-examination-care.webp",
  eyelid: "/images/services/eyelid-blepharoplasty-care.webp",
  aesthetic: "/images/services/aesthetic-oculoplasty-care.webp",
  reconstructive: "/images/services/reconstructive-oculoplasty-care.webp",
} as const;

export default function DoctorPage() {
  const online = onlineBookingAvailable();
  const hasWork = usable(ASSETS.docSlit) || usable(ASSETS.docBlazer);

  return (
    <main id="main" className={styles.page}>
      <JsonLd page="doctor"
        data={[
          webPage({ type: "ProfilePage", path: PAGES.doctor.path, name: "Dr. Poonam Jain", description: metadata.description as string, mainEntityId: ids.physician }),
          physician(),
          faqPage(PAGES.doctor.path, FAQS),
        ]}
      />
      <PageHero
        crumb="Dr. Poonam Jain"
        trail={[{ label: "About", href: LINKS.about }]}
        eyebrow="Medical Director & Senior Ophthalmologist"
        title="Dr. Poonam Jain"
        lead="Leads Namokar Eye & Oculoplasty Centre, with a particular focus on oculoplasty."
        actions={<BookButton online={online} />}
        media={<Image src="/images/blepharoplasty/preview-aesthetic-hero.jpg" alt="Dr. Poonam Jain beside a slit-lamp examination unit" fill priority sizes="(min-width: 960px) 46vw, 100vw" className="page-hero-img" />}
      />

      <section id="about" className={`section ${styles.aboutSection}`} aria-labelledby="about-h">
        <div className={`container ${styles.aboutShell}`}>
          <div className={`section-head reveal ${styles.centerHead}`}>
            <p className="kicker">About the doctor</p>
            <h2 id="about-h" className="h2">Doctor-led care, built around you</h2>
          </div>
          <div className={`reveal ${styles.aboutBody}`}>
            <p>
              Dr. Poonam Jain is the Medical Director and Senior Ophthalmologist at
              Namokar. She has a particular focus on oculoplasty, the specialty that
              looks after the eyelids, tear passages and the area around the eyes.
            </p>
            <p>
              Care at Namokar is doctor-led. You are examined and advised by the doctor,
              and the discussion is built around your eyes, your concerns and the options
              that suit you.
            </p>
          </div>
          <h3 className={styles.focusHeading}>Areas of focus</h3>
          <ul className={styles.focusGrid}>
            <li><span className={styles.focusImage}><Image src={serviceImages.eyelid} alt="" fill sizes="(min-width: 768px) 180px, 30vw" /></span><span>Oculoplasty: functional and aesthetic eyelid care</span></li>
            <li><span className={styles.focusImage}><Image src={serviceImages.reconstructive} alt="" fill sizes="(min-width: 768px) 180px, 30vw" /></span><span>Tear-drainage problems and watering eyes</span></li>
            <li><span className={styles.focusImage}><Image src={serviceImages.exams} alt="" fill sizes="(min-width: 768px) 180px, 30vw" /></span><span>Comprehensive eye care as a senior ophthalmologist</span></li>
          </ul>
        </div>
      </section>

      <section id="training" className={`section section--porcelain ${styles.trainingSection}`} aria-labelledby="training-h">
        <div className={`container train-grid ${styles.trainingPanel}`}>
          <GraduationCapIcon className={styles.trainingGraphic} aria-hidden="true" />
          <div className="section-head reveal">
            <p className="kicker">Expertise</p>
            <h2 id="training-h" className="h2">Qualifications and training</h2>
            <p className="lead">As they are currently recorded.</p>
          </div>
          <div className="train-cols reveal">
            <div>
              <h3 className="h3">Qualifications</h3>
              <dl className="cred-rows">
                <div>
                  <dt>MBBS</dt>
                  <dd>Bachelor of Medicine and Bachelor of Surgery</dd>
                </div>
                <div>
                  <dt>MS, Ophthalmology</dt>
                  <dd>Postgraduate surgical degree in ophthalmology</dd>
                </div>
                <RegistrationRow />
              </dl>
            </div>
            <div>
              <h3 className="h3">Further training</h3>
              <dl className="cred-rows">
                <div>
                  <dt>Fellowship</dt>
                  <dd>Oculoplasty, Barraquer Institute, Barcelona</dd>
                </div>
                <div>
                  <dt>Observership</dt>
                  <dd>Wilmer Eye Institute, Johns Hopkins, Baltimore</dd>
                </div>
              </dl>
            </div>
            <p className="fine">
              Both are past training, not a current affiliation with, or endorsement by,
              those institutions.
            </p>
          </div>
        </div>
      </section>

      {hasWork && (
        <section id="room" className={`section ${styles.roomSection}`} aria-labelledby="room-h">
          <div className="container">
            <div className="section-head reveal">
              <p className="kicker">At the centre</p>
              <h2 id="room-h" className="h2">In the consultation room</h2>
            </div>
            <div className={`pair ${styles.roomPair}`}>
              <EditorialImage
                asset={ASSETS.docSlit}
                caption="Dr. Poonam Jain beside a slit-lamp examination unit."
                ratio="wide"
                position="55% 45%"
                sizes="(min-width: 960px) 58vw, 100vw"
              />
              <EditorialImage
                asset={ASSETS.docBlazer}
                caption="In her consultation room."
                ratio="tall"
                position="50% 30%"
                sizes="(min-width: 960px) 40vw, 100vw"
              />
            </div>
          </div>
        </section>
      )}

      <div className={styles.videoSection}>
        <VideoSection
          id="doctor-video"
          videos={videosFor("doctor")}
          kicker="In her own words"
          heading="Hear from Dr. Poonam Jain"
          lead="A short talk from the centre's YouTube channel, and a clip at the centre."
          note="Statements in the videos are the doctor's own views, not a promise of any result."
        />
      </div>

      <section id="care" className={`section ${styles.careSection}`} aria-labelledby="care-h">
        <div className="container">
          <div className={`section-head reveal ${styles.careHead}`}>
            <p className="kicker">Areas of care</p>
            <h2 id="care-h" className="h2">Where she can help</h2>
            <p className="lead">
              Which treatments are offered is confirmed at the consultation.
            </p>
          </div>
          <ul className={styles.careGrid}>
            {SERVICES.map((s) => (
              <li key={s.key} className="reveal">
                <Link href={s.href} className={styles.careCard}>
                  <span className={styles.careImage}><Image src={serviceImages[s.key]} alt="" fill sizes="(min-width: 1200px) 190px, (min-width: 768px) 30vw, 45vw" /></span>
                  <span className={styles.careTitle}>{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className={`section section--porcelain ${styles.faqSection}`} aria-labelledby="faq-h">
        <div className="container faq-grid">
          <div className="section-head reveal">
            <p className="kicker">Common questions</p>
            <h2 id="faq-h" className="h2">Before your visit</h2>
          </div>
          <FaqList items={FAQS} />
        </div>
      </section>

      <section className={styles.consultationSection} aria-labelledby="doctor-cta-h">
        <div className="container">
          <div className={styles.consultationCard}>
            <div className={styles.consultationImage}><Image src="/images/Hands Cupping Glowing Eye Icon.png" alt="Hands holding a glowing eye symbol" fill sizes="(min-width: 768px) 40vw, 100vw" /></div>
            <div className={styles.consultationContent}>
              <p className="kicker">Consultation</p>
              <h2 id="doctor-cta-h" className="h2">Arrange a consultation.</h2>
              <p className="lead">Contact the centre to plan your visit or arrange an eye consultation.</p>
              <div className={styles.consultationDetails}>
                <p><PinIcon aria-hidden="true" /><span>{SITE.address.lines.join(", ")}</span></p>
                <p><PhoneIcon aria-hidden="true" /><a href={TEL_HREF}>{SITE.phone.display}</a></p>
              </div>
              <div className={styles.consultationActions}><BookButton online={online} /><SecondaryContact online={online} /></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
