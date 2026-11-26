import type { Metadata } from "next";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import RegistrationRow from "@/components/RegistrationRow";
import FaqList from "@/components/FaqList";
import { ArrowRightIcon, CalendarIcon, GraduationCapIcon, InfoIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import { ASSETS, srcOf, usable } from "@/config/assets";
import { PAGES } from "@/config/routes";
import { DOCTOR_REGISTRATION, LINKS, SITE, TEL_HREF } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import JsonLd from "@/components/JsonLd";
import { faqPage, ids, physician, webPage } from "@/lib/schema";
import VideoPlayer from "@/components/VideoPlayer";
import { playerProps } from "@/lib/videoProps";
import { videosFor } from "@/content/videos";
import { treatmentItems } from "@/lib/treatments";
import heroStyles from "@/components/ServicePageHero.module.css";
import DoctorCareCarousel from "@/components/DoctorCareCarousel";
import styles from "./doctor.module.css";

export const metadata: Metadata = pageMeta("doctor", {
  title: "Dr. Poonam Jain – Ophthalmologist & Oculoplastic Surgeon, Delhi",
  description:
    "Meet Dr. Poonam Jain, an internationally trained ophthalmologist and oculoplastic surgeon with 28+ years of experience in eye care and aesthetic eyelid surgery in Delhi.",
  ogType: "profile",
});

const FAQS = [
  {
    q: "What does Dr. Poonam Jain specialise in?",
    a: "Dr. Poonam Jain is an internationally trained ophthalmologist and oculoplastic surgeon with over 28 years of clinical and surgical experience. Her areas of expertise include comprehensive ophthalmology, cataract care, functional and reconstructive oculoplasty, and aesthetic eyelid surgery.",
  },
  {
    q: "Can I consult Dr. Poonam Jain for a general eye check-up?",
    a: "Yes. Consultations include routine eye examinations, assessment of specific eye concerns and guidance on appropriate treatment options.",
  },
  {
    q: "Does Namokar provide squint treatment?",
    a: "Namokar offers squint assessment and management. Treatment depends on the patient's age, eye alignment, visual function and underlying cause. The appropriate treatment pathway will be discussed after examination.",
  },
  {
    q: "Does every squint require surgery?",
    a: "No. Depending on the type and cause of squint, treatment may involve spectacles, prisms, selected non-surgical management or eye muscle surgery.",
  },
  {
    q: "Does Dr. Poonam Jain perform aesthetic eyelid surgery?",
    a: "Dr. Poonam Jain's oculoplastic practice includes aesthetic eyelid procedures such as blepharoplasty. Treatment suitability, potential benefits, risks and expected outcomes are discussed during consultation.",
  },
  {
    q: "Are retina and LASIK services available at Namokar?",
    a: "Retina care and LASIK assessment are available through Namokar. The clinical team will guide patients regarding suitable procedures, the treating specialist and surgical arrangements.",
  },
  {
    q: "What should I bring to my consultation?",
    a: "Please bring previous eye reports, prescriptions, your current spectacles and a list of medications you take.",
  },
  {
    q: "When should I seek urgent eye care?",
    a: "Seek urgent medical assessment for sudden vision loss, new double vision, sudden eye misalignment, severe eye pain, new flashes, a sudden increase in floaters or a curtain-like shadow across your vision. Do not wait for a routine appointment.",
  },
  {
    q: "How do I arrange a consultation with Dr. Poonam Jain?",
    a: `Please call Namokar Eye & Oculoplasty Centre on ${SITE.phone.display}. The team will assist you in arranging a suitable consultation time.`,
  },
];

const serviceImages = {
  exams: "/images/services/eye-examination-care.webp",
  eyelid: "/images/services/eyelid-blepharoplasty-care.webp",
  aesthetic: "/images/services/aesthetic-oculoplasty-care.webp",
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

function MedalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="m8.5 12.5-1.5 8.5 5-3 5 3-1.5-8.5" />
    </svg>
  );
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export default function DoctorPage() {
  const online = onlineBookingAvailable();
  const hasWork = usable(ASSETS.docSlit) || usable(ASSETS.docBlazer);
  const doctorVideos = videosFor("doctor").map(playerProps).map((video) => video.kind === "local"
    ? { ...video, title: "A Glimpse into Dr. Poonam Jain’s Clinical Practice" }
    : video);
  const serviceCards = treatmentItems();

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
        eyebrow="Medical Director | Senior Ophthalmologist & Oculoplastic Surgeon"
        title="Dr. Poonam Jain, MS"
        lead="Internationally trained ophthalmologist with over 28 years of clinical and surgical experience, specialising in comprehensive eye care, functional and reconstructive oculoplasty, and aesthetic eyelid surgery."
        actions={
          <>
            <p>Namokar Eye &amp; Oculoplasty Centre, New Delhi</p>
            <a className="btn btn--primary" href={online ? `${LINKS.contact}#request` : TEL_HREF}>
              {online ? <CalendarIcon /> : <PhoneIcon />}
              {online ? "Request a Consultation" : "Book a Consultation"}
            </a>
          </>
        }
        media={<Image src="/images/Copy of DSC06852.JPG" alt="Dr. Poonam Jain seated at her consultation desk" fill priority sizes="(min-width: 960px) 46vw, 100vw" className="page-hero-img" />}
        below={<ul className={heroStyles.trustCards} aria-label="Dr. Poonam Jain’s professional highlights">
          <li className={heroStyles.trustCard}><span className={heroStyles.trustIcon}><CalendarIcon width={28} height={28} /></span><strong>28+ Years of Clinical Experience</strong></li>
          <li className={heroStyles.trustCard}><span className={heroStyles.trustIcon}><TrustIcon name="eye" /></span><strong>Internationally Trained</strong></li>
          <li className={heroStyles.trustCard}><span className={heroStyles.trustIcon}><TrustIcon name="shield" /></span><strong>Specialised Oculoplasty Expertise</strong></li>
          <li className={heroStyles.trustCard}><span className={heroStyles.trustIcon}><TrustIcon name="heart" /></span><strong>Comprehensive Eye Care</strong></li>
        </ul>}
      />

      <section id="about" className={`section ${styles.aboutSection}`} aria-labelledby="about-h">
        <div className={`container ${styles.aboutShell}`}>
          <div className={styles.aboutProfile}>
            <figure className={styles.aboutPortrait}>
              <div className={styles.aboutPortraitMedia}>
                <Image
                  src={srcOf(ASSETS.docSlit)}
                  alt={ASSETS.docSlit.alt}
                  fill
                  sizes="(min-width: 1360px) 400px, (min-width: 900px) 31vw, (min-width: 560px) 520px, 100vw"
                />
              </div>
              <figcaption>
                <span className={styles.aboutRoleIcon}><EyeIcon /></span>
                <span><strong>Medical Director</strong>Namokar Eye &amp; Oculoplasty Centre</span>
              </figcaption>
            </figure>
            <div className={styles.aboutBody}>
              <span className={styles.aboutKicker}>About Our Expert</span>
              <h2 id="about-h" className="h2">Dr. <span className="title-secondary">Poonam Jain</span></h2>
              <p>Dr. Poonam Jain is an internationally trained ophthalmologist, oculoplastic surgeon, founder and Medical Director of Namokar Eye &amp; Oculoplasty Centre in Ashok Vihar, New Delhi.</p>
              <p>With over 28 years of clinical and surgical experience, her expertise encompasses comprehensive ophthalmology, cataract surgery, functional and reconstructive oculoplasty, and aesthetic eyelid surgery.</p>
              <p>She previously served as a Senior Consultant at Centre for Sight before establishing Namokar Eye &amp; Oculoplasty Centre, bringing together comprehensive ophthalmic care and specialised periocular treatments.</p>
              <p>Her approach focuses on detailed clinical assessment, personalised treatment planning, informed decision-making and individual patient needs.</p>
              <ul className={styles.aboutCredentials} aria-label="Professional highlights">
                <li>
                  <Trophy strokeWidth={2.8} aria-hidden="true" />
                  <strong>28+ Years</strong>
                  <span>Clinical &amp; Surgical Experience</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21ZM10.25 6h3.5v4.25H18v3.5h-4.25V18h-3.5v-4.25H6v-3.5h4.25V6Z" />
                  </svg>
                  <strong>Expertise</strong>
                  <span>Comprehensive Ophthalmology &amp; Oculoplasty</span>
                </li>
                <li>
                  <svg viewBox="0 0 28 24" fill="currentColor" aria-hidden="true">
                    <circle cx="14" cy="6" r="4" />
                    <circle cx="5.5" cy="8" r="3" />
                    <circle cx="22.5" cy="8" r="3" />
                    <path d="M7 21v-2a7 7 0 0 1 14 0v2H7ZM0 20v-2a5.5 5.5 0 0 1 7.6-5.1A8.5 8.5 0 0 0 5.5 19v1H0Zm28 0h-5.5v-1a8.5 8.5 0 0 0-2.1-6.1A5.5 5.5 0 0 1 28 18v2Z" />
                  </svg>
                  <strong>Former Senior Consultant</strong>
                  <span>Centre for Sight</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 1a8 8 0 0 0-8 8c0 4 4.6 10.3 8 14 3.4-3.7 8-10 8-14a8 8 0 0 0-8-8Zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                  </svg>
                  <strong>Internationally Trained</strong>
                  <span>Ophthalmologist</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.aboutDetails}>
            <details className={styles.aboutTopic}>
              <summary>
                <span className={styles.aboutTopicIcon}><EyeIcon /></span>
                <span className={styles.aboutTopicCopy}>
                  <strong>Clinical, Surgical &amp; Aesthetic Expertise</strong>
                  <span>Dr. Jain&rsquo;s practice encompasses comprehensive ophthalmology, cataract surgery, functional and reconstructive oculoplasty, and aesthetic periocular procedures.</span>
                </span>
                <span className={styles.aboutArrow}><ArrowRightIcon aria-hidden="true" /></span>
              </summary>
              <p>Her oculoplastic expertise includes ptosis correction, eyelid reconstruction, management of eyelid-position abnormalities, tear-drainage procedures such as dacryocystorhinostomy (DCR), and orbital reconstruction.</p>
              <p>Her aesthetic practice includes blepharoplasty, brow lifts and midface lifts, with treatment planned according to individual anatomy, eye health, functional requirements and aesthetic concerns.</p>
              <p>At Namokar, comprehensive ophthalmic services also include glaucoma management, retina care, LASIK and refractive surgery, and squint assessment and management.</p>
            </details>
            <details className={styles.aboutTopic}>
              <summary>
                <span className={styles.aboutTopicIcon}><GraduationCapIcon aria-hidden="true" /></span>
                <span className={styles.aboutTopicCopy}>
                  <strong>International Training &amp; Advanced Surgical Education</strong>
                  <span>Dr. Jain pursued a fellowship in aesthetic oculoplasty at the Barraquer Institute in Barcelona, Spain, and undertook a clinical observership at the Wilmer Eye Institute, Johns Hopkins, Baltimore, USA.</span>
                </span>
                <span className={styles.aboutArrow}><ArrowRightIcon aria-hidden="true" /></span>
              </summary>
              <p>She also completed a hands-on workshop in oculofacial plastic surgery with Dr. Darab Hormozi at Maryland Aesthetic &amp; Reconstructive ASC in Baltimore, with training covering fat transfer, mini facelifts, brow lifts and midface lifts.</p>
              <p>Her international training complements her clinical experience in functional, reconstructive and aesthetic periocular care.</p>
            </details>
            <details className={styles.aboutTopic}>
              <summary>
                <span className={styles.aboutTopicIcon}><CalendarIcon aria-hidden="true" /></span>
                <span className={styles.aboutTopicCopy}>
                  <strong>Academic Contributions &amp; Surgical Workshops</strong>
                  <span>In 2005, she organised an international live-surgery workshop in Delhi where visiting faculty demonstrated upper eyelid surgery and transconjunctival lower eyelid blepharoplasty.</span>
                </span>
                <span className={styles.aboutArrow}><ArrowRightIcon aria-hidden="true" /></span>
              </summary>
              <p>She also conducted live demonstrations involving dermal fillers and botulinum toxin injections. Her academic contributions include lectures, teaching sessions and clinical workshops at national and international medical conferences, sharing her experience in oculoplasty and aesthetic periocular procedures.</p>
            </details>
            <details className={styles.aboutTopic}>
              <summary>
                <span className={styles.aboutTopicIcon}><BookIcon /></span>
                <span className={styles.aboutTopicCopy}>
                  <strong>Professional Contributions &amp; Publications</strong>
                  <span>Dr. Jain has served on the executive council of the Oculoplastics Association of India and on the editorial board of the Delhi Ophthalmological Society.</span>
                </span>
                <span className={styles.aboutArrow}><ArrowRightIcon aria-hidden="true" /></span>
              </summary>
              <p>She has contributed articles and reviewed oculoplasty manuscripts for the Delhi Journal of Ophthalmology. Alongside her clinical practice, she has contributed to professional education and knowledge-sharing within ophthalmology and oculoplasty. Her approach to medicine is guided by passion, compassion and individual patient care.</p>
            </details>
          </div>
          <div className={styles.aboutEducation}>
            <span className={styles.aboutTopicIcon}><GraduationCapIcon aria-hidden="true" /></span>
            <div>
              <h3>Medical Education &amp; Early Clinical Practice</h3>
              <p>She completed her MBBS at Maulana Azad Medical College and completed her MS in Ophthalmology at Safdarjung Hospital, both in New Delhi. She earned the National Talent Search Scholarship and Open Merit Scholarship and placed on the high-school merit list. As a senior resident at Safdarjung Hospital, she treated cataracts, glaucoma, squint (strabismus) and retinal disorders, and managed injuries around the eye, chemical injuries and ocular surface conditions. This comprehensive ophthalmic foundation supported her subsequent specialised work in oculoplasty and periocular surgery.</p>
            </div>
          </div>
          <h3 className={styles.focusHeading}>Areas of focus</h3>
          <ul className={styles.focusGrid}>
            <li><span className={styles.focusImage}><Image src={serviceImages.eyelid} alt="" fill sizes="(min-width: 768px) 180px, 30vw" /></span><span>Functional &amp; Reconstructive Oculoplasty &mdash; Care for ptosis, eyelid abnormalities, tear-drainage disorders and orbital reconstructive concerns.</span></li>
            <li><span className={styles.focusImage}><Image src={serviceImages.aesthetic} alt="" fill sizes="(min-width: 768px) 180px, 30vw" /></span><span>Aesthetic Oculoplasty &mdash; Specialised aesthetic eyelid surgery and periocular treatments.</span></li>
            <li><span className={styles.focusImage}><Image src={serviceImages.exams} alt="" fill sizes="(min-width: 768px) 180px, 30vw" /></span><span>Comprehensive Ophthalmology &amp; Cataract Care &mdash; Eye assessment, diagnosis and management, including cataract evaluation, lens selection and surgical planning.</span></li>
          </ul>
        </div>
      </section>

      <section id="training" className={`section ${styles.trainingSection}`} aria-labelledby="training-h">
        <div className={`container ${styles.trainingPanel}`}>
          <div className={`reveal ${styles.trainingHead}`}>
            <div className={styles.trainingKicker}>
              <span className={styles.trainingKickerDash} aria-hidden="true" />
              <span>Professional Credentials</span>
              <span className={styles.trainingKickerDash} aria-hidden="true" />
            </div>
            <h2 id="training-h" className={styles.trainingTitle}>Qualifications &amp; <span className="title-secondary">International Training</span></h2>
            <p className={styles.trainingLead}>Medical qualifications and specialised international training in ophthalmology and oculoplasty.</p>
          </div>
          <div className={`reveal ${styles.trainingGrid}`}>
            <div className={styles.trainingColumn}>
              <div className={styles.trainingColumnHead}>
                <span className={styles.trainingColumnIcon} aria-hidden="true">
                  <GraduationCapIcon width={22} height={22} />
                </span>
                <span>Qualifications</span>
              </div>
              <div className={styles.trainingCards}>
                <article className={styles.credCard}>
                  <div className={styles.credCardIconWrap} aria-hidden="true">
                    <GraduationCapIcon width={20} height={20} />
                  </div>
                  <h3 className={styles.credCardTitle}>MBBS</h3>
                  <p className={styles.credCardDesc}>Bachelor of Medicine and Bachelor of Surgery, Maulana Azad Medical College, New Delhi</p>
                </article>
                <article className={styles.credCard}>
                  <div className={styles.credCardIconWrap} aria-hidden="true">
                    <GraduationCapIcon width={20} height={20} />
                  </div>
                  <h3 className={styles.credCardTitle}>MS &ndash; Ophthalmology</h3>
                  <p className={styles.credCardDesc}>Master of Surgery in Ophthalmology, Safdarjung Hospital, New Delhi</p>
                </article>
              </div>
            </div>
            <div className={styles.trainingColumn}>
              <div className={styles.trainingColumnHead}>
                <span className={styles.trainingColumnIcon} aria-hidden="true">
                  <MedalIcon width={22} height={22} />
                </span>
                <span>Further training</span>
              </div>
              <div className={styles.trainingCards}>
                <article className={styles.credCard}>
                  <div className={styles.credCardIconWrap} aria-hidden="true">
                    <MedalIcon width={20} height={20} />
                  </div>
                  <h3 className={styles.credCardTitle}>Fellowship in Aesthetic Oculoplasty</h3>
                  <p className={styles.credCardDesc}>Barraquer Institute, Barcelona, Spain</p>
                </article>
                <article className={styles.credCard}>
                  <div className={styles.credCardIconWrap} aria-hidden="true">
                    <BookIcon width={20} height={20} />
                  </div>
                  <h3 className={styles.credCardTitle}>Clinical Observership</h3>
                  <p className={styles.credCardDesc}>Wilmer Eye Institute, Johns Hopkins, Baltimore, USA</p>
                </article>
              </div>
            </div>
          </div>
          {DOCTOR_REGISTRATION && <dl><RegistrationRow /></dl>}
          <div className={styles.trainingDisclaimer}>
            <span className={styles.trainingDisclaimerIcon} aria-hidden="true">
              <InfoIcon width={18} height={18} />
            </span>
            <span>International training credentials refer to completed professional training and do not imply current institutional affiliation.</span>
          </div>
        </div>
      </section>

      {hasWork && (
        <section id="room" className={`section ${styles.roomSection}`} aria-labelledby="room-h">
          <div className="container">
            <div className={`section-head reveal ${styles.centerHead}`}>
              <div className={styles.badgeWrapper}>
                <span className={styles.badgeLine} aria-hidden="true" />
                <span className={styles.kickerBadge}>At Namokar</span>
                <span className={styles.badgeLine} aria-hidden="true" />
              </div>
              <h2 id="room-h" className="h2">A Closer Look at Her <span className="title-secondary">Clinical Practice</span></h2>
              <HeadingAccentCurve className={styles.headingAccentLine} />
              <p className="lead">Dr. Poonam Jain&rsquo;s clinical practice focuses on detailed eye examinations, individual assessment and personalised treatment planning.</p>
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
                  <p>Dr. Poonam Jain in the eye examination room at Namokar.</p>
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
                  <p>Dr. Poonam Jain in her consultation room.</p>
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
                <span className={styles.kickerBadge}>In Her Own Words</span>
                <span className={styles.badgeLine} aria-hidden="true" />
              </div>
              <h2 id="doctor-video-h" className="h2">Hear from Dr. <span className="title-secondary">Poonam Jain</span></h2>
              <HeadingAccentCurve className={styles.headingAccentLine} />
              <p className="lead">Discover Dr. Poonam Jain&rsquo;s professional journey, approach to patient care and insights into ophthalmology, oculoplasty and eye health through her videos.</p>
              <p className={styles.videoDisclaimer}>
                These videos provide general information and do not replace an individual medical consultation.
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
            <div className={styles.badgeWrapper}>
              <span className={styles.badgeLine} aria-hidden="true" />
              <span className={styles.kickerBadge}>AREAS OF CARE</span>
              <span className={styles.badgeLine} aria-hidden="true" />
            </div>
            <h2 id="care-h" className="h2">Comprehensive Eye Care &amp; <span className="title-secondary">Specialised Treatments</span></h2>
            <p className="lead">
              Explore the range of ophthalmic and specialised oculoplastic services available through Namokar Eye &amp; Oculoplasty Centre. Treatment recommendations are based on individual clinical assessment.
            </p>
          </div>
          <DoctorCareCarousel services={serviceCards} />
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
            <h2 id="faq-h" className="h2">Before your <span className="title-secondary">visit</span></h2>
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
                <span className={styles.kickerBadge}>Consult Dr. Poonam Jain</span>
                <span className={styles.badgeLine} aria-hidden="true" />
              </div>
              <h2 id="doctor-cta-h" className="h2">See Better. <span className="title-secondary">Look Better.</span></h2>
              <HeadingAccentCurve className={styles.headingAccentLine} />
              <h3>Arrange Your Consultation</h3>
              <p className="lead">Whether you require comprehensive eye care, cataract assessment, squint evaluation or specialised aesthetic eyelid treatment, begin with a personalised consultation at Namokar.</p>
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
                  Call to Book a Consultation
                </a>
                <Link href={LINKS.contact} className={styles.btnSecondary}>
                  <PinIcon width={18} height={18} />
                  Contact &amp; Directions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
