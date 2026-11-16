import type { Metadata } from "next";
import Image from "next/image";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import RegistrationRow from "@/components/RegistrationRow";
import BookButton from "@/components/BookButton";
import FaqList from "@/components/FaqList";
import { CalendarIcon, GraduationCapIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import { ASSETS, srcOf, usable } from "@/config/assets";
import { PAGES } from "@/config/routes";
import { LINKS, SERVICES, SITE, TEL_HREF } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import JsonLd from "@/components/JsonLd";
import { faqPage, ids, physician, webPage } from "@/lib/schema";
import VideoPlayer from "@/components/VideoPlayer";
import { playerProps } from "@/lib/videoProps";
import { videosFor } from "@/content/videos";
import heroStyles from "@/components/ServicePageHero.module.css";
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

function TrustIcon({ name }: { name: "eye" | "shield" | "heart" }) {
  const shape = {
    eye: <><path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
    heart: <path d="M20.5 5.5a5 5 0 0 0-7 0L12 7l-1.5-1.5a5 5 0 0 0-7 7L12 21l8.5-8.5a5 5 0 0 0 0-7Z" />,
  };
  return <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shape[name]}</svg>;
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function HeadingAccentCurve({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 3C45 11 95 11 138 3" stroke="#e07a2c" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export default function DoctorPage() {
  const online = onlineBookingAvailable();
  const hasWork = usable(ASSETS.docSlit) || usable(ASSETS.docBlazer);
  const doctorVideos = videosFor("doctor").map(playerProps);

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
        media={<Image src="/images/Copy of DSC06852.JPG" alt="Dr. Poonam Jain seated at her consultation desk" fill priority sizes="(min-width: 960px) 46vw, 100vw" className="page-hero-img" />}
        below={<ul className={heroStyles.trustCards} aria-label="Our approach to care">
          <li className={heroStyles.trustCard}><span className={heroStyles.trustIcon}><CalendarIcon width={28} height={28} /></span><strong>Trusted Eye Care Since 25+ Years</strong></li>
          <li className={heroStyles.trustCard}><span className={heroStyles.trustIcon}><TrustIcon name="eye" /></span><strong>Advanced Technology</strong></li>
          <li className={heroStyles.trustCard}><span className={heroStyles.trustIcon}><TrustIcon name="shield" /></span><strong>Expert Doctors</strong></li>
          <li className={heroStyles.trustCard}><span className={heroStyles.trustIcon}><TrustIcon name="heart" /></span><strong>Compassionate Care</strong></li>
        </ul>}
      />

      <section id="about" className={`section ${styles.aboutSection}`} aria-labelledby="about-h">
        <div className={`container ${styles.aboutShell}`}>
          <div className={`section-head reveal ${styles.centerHead}`}>
            <p className="kicker">About the doctor</p>
            <h2 id="about-h" className="h2">Doctor-led care, built around you</h2>
          </div>
          <div className={`reveal ${styles.aboutBody}`}>
            <div className={styles.aboutCard}>
              <span className={styles.aboutIcon}><TrustIcon name="eye" /></span>
              <p>Dr. Poonam Jain is the <strong>Medical Director and Senior Ophthalmologist</strong> at Namokar. She has a particular focus on <strong>oculoplasty</strong>, the specialty that looks after the eyelids, tear passages and the area around the eyes.</p>
            </div>
            <div className={styles.aboutCard}>
              <span className={styles.aboutIcon}><TrustIcon name="heart" /></span>
              <p>Care at Namokar is <strong>doctor-led</strong>. You are examined and advised by the doctor, and the discussion is built around your eyes, your concerns and the options that suit you.</p>
            </div>
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
            <div className={`section-head reveal ${styles.centerHead}`}>
              <div className={styles.badgeWrapper}>
                <span className={styles.badgeLine} aria-hidden="true" />
                <span className={styles.kickerBadge}>At the centre</span>
                <span className={styles.badgeLine} aria-hidden="true" />
              </div>
              <h2 id="room-h" className="h2">In the consultation room</h2>
              <HeadingAccentCurve className={styles.headingAccentLine} />
            </div>
            <div className={styles.showcaseGrid}>
              <article className={styles.showcaseCard}>
                <div className={styles.showcaseMedia}>
                  <Image
                    src={srcOf(ASSETS.docSlit)}
                    alt="Dr. Poonam Jain beside a slit-lamp examination unit"
                    fill
                    priority
                    sizes="(min-width: 960px) 48vw, 100vw"
                    className={styles.showcaseImg}
                    style={{ objectPosition: "55% 45%" }}
                  />
                </div>
                <div className={styles.showcaseCaption}>
                  <span className={styles.showcaseIcon} aria-hidden="true">
                    <EyeIcon width={20} height={20} />
                  </span>
                  <span className={styles.showcaseDivider} aria-hidden="true" />
                  <p>Dr. Poonam Jain beside a slit-lamp examination unit.</p>
                </div>
              </article>
              <article className={styles.showcaseCard}>
                <div className={styles.showcaseMedia}>
                  <Image
                    src={srcOf(ASSETS.docBlazer)}
                    alt="In her consultation room"
                    fill
                    priority
                    sizes="(min-width: 960px) 48vw, 100vw"
                    className={styles.showcaseImg}
                    style={{ objectPosition: "50% 25%" }}
                  />
                </div>
                <div className={styles.showcaseCaption}>
                  <span className={styles.showcaseIcon} aria-hidden="true">
                    <UserIcon width={20} height={20} />
                  </span>
                  <span className={styles.showcaseDivider} aria-hidden="true" />
                  <p>In her consultation room.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
      )}

      {doctorVideos.length > 0 && (
        <section id="doctor-video" className={`section ${styles.videoSection}`} aria-labelledby="doctor-video-h">
          <div className="container">
            <div className={`section-head reveal ${styles.centerHead}`}>
              <div className={styles.badgeWrapper}>
                <span className={styles.badgeLine} aria-hidden="true" />
                <span className={styles.kickerBadge}>In her own words</span>
                <span className={styles.badgeLine} aria-hidden="true" />
              </div>
              <h2 id="doctor-video-h" className="h2">Hear from Dr. Poonam Jain</h2>
              <HeadingAccentCurve className={styles.headingAccentLine} />
              <p className="lead">A short talk from the centre&apos;s YouTube channel, and a clip at the centre.</p>
              <p className={styles.videoDisclaimer}>
                Statements in the videos are the doctor&apos;s own views, not a promise of any result.
              </p>
            </div>
            <div className={styles.videoDuo}>
              <div className={styles.videoPrimary}>
                <VideoPlayer v={doctorVideos[0]} sizes="(min-width: 960px) 58vw, 100vw" />
              </div>
              {doctorVideos[1] && (
                <div className={styles.videoSecondary}>
                  <VideoPlayer v={doctorVideos[1]} sizes="360px" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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

      <section id="faq" className={`section ${styles.faqSection}`} aria-labelledby="faq-h">
        <div className={`container ${styles.faqContainer}`}>
          <div className={`section-head reveal ${styles.centerHead}`}>
            <div className={styles.badgeWrapper}>
              <span className={styles.badgeLine} aria-hidden="true" />
              <span className={styles.kickerBadge}>Common questions</span>
              <span className={styles.badgeLine} aria-hidden="true" />
            </div>
            <h2 id="faq-h" className="h2">Before your visit</h2>
            <HeadingAccentCurve className={styles.headingAccentLine} />
            <p className="lead">Common questions before planning a consultation.</p>
          </div>
          <div className={styles.faqBody}>
            <FaqList items={FAQS} />
          </div>
        </div>
      </section>

      <section className={styles.consultationSection} aria-labelledby="doctor-cta-h">
        <div className="container">
          <div className={styles.consultationGrid}>
            <div className={styles.consultationVisual}>
              <Image
                src="/images/Hands Cupping Glowing Eye Icon.png"
                alt="Hands holding a glowing eye symbol"
                fill
                priority
                sizes="(min-width: 960px) 44vw, 100vw"
                className={styles.consultationImg}
              />
            </div>
            <div className={styles.consultationContent}>
              <div className={styles.badgeWrapper}>
                <span className={styles.kickerBadge}>Consultation</span>
                <span className={styles.badgeLine} aria-hidden="true" />
              </div>
              <h2 id="doctor-cta-h" className="h2">Arrange a consultation.</h2>
              <HeadingAccentCurve className={styles.headingAccentLine} />
              <p className="lead">Contact the centre to plan your visit or arrange an eye consultation.</p>
              <div className={styles.consultationInfoBox}>
                <div className={styles.infoRow}>
                  <span className={styles.infoIconWrap} aria-hidden="true">
                    <PinIcon width={18} height={18} />
                  </span>
                  <span className={styles.infoAddress}>{SITE.address.lines.join(", ")}</span>
                </div>
                <div className={styles.infoDivider} aria-hidden="true" />
                <div className={styles.infoRow}>
                  <span className={styles.infoIconWrap} aria-hidden="true">
                    <PhoneIcon width={18} height={18} />
                  </span>
                  <a href={TEL_HREF} className={styles.infoPhone}>{SITE.phone.display}</a>
                </div>
              </div>
              <div className={styles.consultationActions}>
                <a href={TEL_HREF} className={styles.btnPrimary}>
                  <PhoneIcon width={18} height={18} />
                  Call to Book an Appointment
                </a>
                <Link href={LINKS.contact} className={styles.btnSecondary}>
                  <PinIcon width={18} height={18} />
                  Contact and Directions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
