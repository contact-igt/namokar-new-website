import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMeta, withBrand } from "@/lib/seo";
import FacilityGallery from "@/components/FacilityGallery";
import RegistrationRow from "@/components/RegistrationRow";
import JsonLd from "@/components/JsonLd";
import HomeCta from "@/components/HomeCta";
import WalkthroughSection from "@/components/WalkthroughSection";
import { ArrowRightIcon, CalendarIcon, ChevronDownIcon } from "@/components/Icons";
import { ASSETS } from "@/config/assets";
import { PAGES } from "@/config/routes";
import { LINKS, SERVICES, SITE, TEL_HREF } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import { compact, photoItem } from "@/lib/photos";
import { clinic, ids, webPage } from "@/lib/schema";
import { playerProps } from "@/lib/videoProps";
import { videosFor } from "@/content/videos";
import homeStyles from "../home-redesign.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = pageMeta("about", {
  title: withBrand("About Us"),
  description:
    "About Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi: comprehensive eye care and oculoplasty, led by Dr. Poonam Jain, Medical Director.",
});

function AboutIcon({ name }: { name: "eye" | "shield" | "heart" | "team" | "cap" | "exam" | "plan" | "follow" }) {
  const shapes = {
    eye: <><path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
    heart: <path d="M20.5 5.5a5 5 0 0 0-7 0L12 7l-1.5-1.5a5 5 0 0 0-7 7L12 21l8.5-8.5a5 5 0 0 0 0-7Z" />,
    team: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0M14 20a4 4 0 0 1 7-1.5" /></>,
    cap: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v6c3 2 9 2 12 0v-6M22 9v7" /></>,
    exam: <><path d="M5 3v6a5 5 0 0 0 10 0V3M3 3h4M13 3h4M10 14v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="3" /></>,
    plan: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 3h6v4H9zM9 11h6M9 15h6M9 18h3" /></>,
    follow: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4m-6 9 2 2 4-4" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name]}</svg>;
}

const SPECIALTIES = [
  { title: "Eyelid & Oculoplasty Care", icon: "eyelid", href: LINKS.eyelid, descriptions: ["Functional and aesthetic oculoplasty", "Ptosis and eyelid-position concerns", "Blepharoplasty and eye-area concerns"] },
  { title: "Tear Passage Care", icon: "tear-passage", href: LINKS.reconstructive, descriptions: ["Watering eyes and tear-drainage disorders"] },
  { title: "Periocular Conditions", icon: "periocular", href: LINKS.reconstructive, descriptions: ["Conditions around the eyes"] },
  { title: "Comprehensive Eye Care", icon: "eye-care", href: LINKS.exams, descriptions: ["Comprehensive ophthalmology", "Cataract evaluation and eye care"] },
];

const JOURNEY = [
  { title: "Appointment Booking", icon: "calendar", text: "Contact the centre and briefly tell the team your concern, so they can help arrange the appropriate consultation." },
  { title: "Warm Reception", icon: "team", text: "The reception at our Ashok Vihar centre, where your visit begins." },
  { title: "Consultation & Examination", icon: "exam", text: "Your eyes are examined based on your symptoms and your reason for visiting. The doctor reviews the examination findings, listens to your concerns and explains what they mean in understandable language." },
  { title: "Diagnosis & Treatment Plan", icon: "plan", text: "If treatment could help, the available options are explained. Not every patient requires surgery or a procedure." },
  { title: "Follow-up Care", icon: "follow", text: "Some eye conditions need monitoring or follow-up, such as glaucoma. The doctor will explain what is appropriate for you." },
] as const;

export default function AboutPage() {
  const online = onlineBookingAvailable();
  const bookingHref = online ? `${LINKS.contact}#request` : TEL_HREF;
  // Retain every original photograph and caption, grouped into the shared four categories.
  const originalGallery = {
    theatre: photoItem(ASSETS.homeTheatreNov, { title: "Operation theatre", caption: "The operating table, microscope and surgical equipment used for eye procedures.", position: "50% 55%" }),
    room: photoItem(ASSETS.homeDiagnosticsNov, { title: "Examination room", caption: "Diagnostic instruments used during a detailed eye examination.", position: "50% 50%" }),
    consultation: photoItem(ASSETS.archCataractExam, { title: "A detailed eye examination", caption: "Dr. Poonam Jain examining a patient at a slit-lamp, the microscope used to look closely at the front of the eye.", position: "55% 50%" }),
    team: photoItem(ASSETS.archTeamDoctor, { title: "Our care team", caption: "Dr. Poonam Jain with members of the team who look after patients, in the waiting area.", position: "50% 40%" }),
  };
  const caringPhoto = originalGallery.room ?? originalGallery.theatre;
  const gallery = compact([
    originalGallery.consultation && { ...originalGallery.consultation, title: "Consultation & Eye Examination", photographs: [originalGallery.consultation] },
    { src: "/images/Modern Clinic Reception Desk.png", alt: "The reception desk at Namokar Eye & Oculoplasty Centre", width: 1448, height: 1086, title: "Reception", caption: "A warm and welcoming space for our patients.", icon: "/images/reception-new.png", position: "50% 50%", preview: false },
    originalGallery.team && { ...originalGallery.team, title: "Our Team", icon: "/images/multiple-users-silhouette.png", photographs: [originalGallery.team] },
    caringPhoto && { ...caringPhoto, title: "Caring Spaces", icon: "/images/microscope.png", photographs: compact([originalGallery.room, originalGallery.theatre]) },
  ]);
  const walkthrough = videosFor("about")[0];

  return (
    <main id="main" className={styles.aboutPage}>
      <JsonLd page="about" data={[
        webPage({ type: "AboutPage", path: PAGES.about.path, name: "About Us", description: metadata.description as string, mainEntityId: ids.clinic }),
        clinic(),
      ]} />

      <section className={`${styles.waveSection} ${styles.hero}`} aria-labelledby="about-hero-h">
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href={LINKS.home}>Home</Link><ArrowRightIcon width={13} height={13} /><span aria-current="page">About Us</span></nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className="kicker">About Namokar</p>
              <h1 id="about-hero-h">Eye Care Built Around Understanding, Expertise &amp; Individual Attention</h1>
              <p>Namokar Eye &amp; Oculoplasty Centre is an eye-care centre in Ashok Vihar, New Delhi, offering comprehensive ophthalmology alongside specialist oculoplasty care led by Dr. Poonam Jain, Senior Ophthalmologist and Oculoplasty Surgeon. Our approach begins with understanding your concern before discussing the next step.</p>
              <div className={styles.actions}>
                <a href={bookingHref} className="btn btn--primary">Book an Appointment <ArrowRightIcon width={18} height={18} /></a>
                <a href="#hospital" className="btn btn--secondary">Know Our Centre <ArrowRightIcon width={18} height={18} /></a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroCollage}>
                <figure className={styles.heroExterior}><Image src="/images/Namokar Eye Centre Exterior.png" alt="The exterior of Namokar Eye & Oculoplasty Centre" fill loading="eager" fetchPriority="high" sizes="(min-width: 960px) 75vw, 150vw" /></figure>
                <figure className={styles.heroReception}><Image src="/images/Modern Clinic Reception Desk.png" alt="The reception desk at Namokar Eye & Oculoplasty Centre" fill sizes="(min-width: 960px) 24vw, 50vw" /></figure>
              </div>
              <p className={styles.collageCaption}>Welcome to Namokar. The reception at our Ashok Vihar centre, where your visit begins.</p>
            </div>
          </div>
          <ul className={styles.trustCards} aria-label="Our approach to care">
            <li><CalendarIcon /><strong>Trusted Eye Care Since 25+ Years</strong></li>
            <li><AboutIcon name="eye" /><strong>Advanced Technology</strong></li>
            <li><AboutIcon name="shield" /><strong>Expert Doctors</strong></li>
            <li><AboutIcon name="heart" /><strong>Compassionate Care</strong></li>
          </ul>
        </div>
      </section>

      <section id="about" className={styles.waveSection} aria-labelledby="about-h">
        <div className={`container ${styles.introGrid}`}>
          <div className={styles.introRight}>
            <div className={styles.introCopy}>
              <p className="kicker">About Namokar</p>
              <h2 id="about-h">Comprehensive Eye Care With a Special Focus on Oculoplasty</h2>
              <p>Namokar Eye &amp; Oculoplasty Centre is located in {SITE.area} and provides comprehensive eye care, including routine and condition-specific eye examinations, cataract care, glaucoma management and other ophthalmic concerns. The centre has a reception, consultation and examination rooms, and an operation theatre.</p>
              <p>A key area of focus at Namokar is oculoplasty, the branch of ophthalmology concerned with the eyelids, tear passages, eye socket and surrounding eye area. This includes both functional concerns, such as drooping eyelids and watering eyes, and aesthetic concerns involving the eyelids and under-eye area.</p>
            </div>
            <div className={styles.introCare}>
              <div className={styles.accordions}>
                <section className={styles.careAvailable} aria-labelledby="care-available-h">
                  <h3 id="care-available-h">Care Available at Namokar</h3>
                  <div className={styles.answer}><p>Comprehensive ophthalmology and specialist oculoplasty under one centre.</p></div>
                </section>
                <details>
                  <summary>Customised Management <ChevronDownIcon /></summary>
                  <div className={styles.answer}>
                    <p>Care is led by Dr. Poonam Jain, Medical Director and Senior Ophthalmologist. Consultations are built around understanding your concern, examining your eyes carefully and explaining the available options in clear language.</p>
                    <p>Our aim is not to rush a patient towards treatment. Where treatment may help, the reason, the alternatives and the next steps are discussed, so that you can make an informed decision at your own pace.</p>
                  </div>
                </details>
                {SERVICES.map((service) => <details key={service.key}><summary>{service.title}<ChevronDownIcon /></summary><div className={styles.answer}><p>{service.blurb}</p><Link href={service.href} className="text-link">{service.title}<ArrowRightIcon width={16} height={16} /></Link></div></details>)}
              </div>
            </div>
          </div>
          <div className={styles.introVisual}>
            <div className={styles.introCollage}>
              <figure className={styles.introReception}><Image src="/images/Modern Reception Desk with Attentive Professional.png" alt="A receptionist at the Namokar reception counter" fill sizes="(min-width: 960px) 38vw, 90vw" /></figure>
              <figure className={styles.introRoom}><Image src="/images/Professional Clinical Team Portrait.png" alt="Six members of the Namokar clinical team standing together" fill sizes="(min-width: 960px) 22vw, (min-width: 601px) 50vw, 92vw" /></figure>
            </div>
            <section className={styles.specialtySection} aria-labelledby="about-expertise-h">
              <h3 id="about-expertise-h">Areas of Expertise</h3>
              <div className={styles.specialtyAccordions}>
                {SPECIALTIES.map((item) => <details key={item.icon} name="about-expertise">
                  <summary><Image src={`/images/doctor-expertise-${item.icon}.webp`} width={48} height={48} alt="" /><strong>{item.title}</strong><ChevronDownIcon /></summary>
                  <div className={styles.specialtyAnswer}>
                    {item.descriptions.map((text) => <p key={text}>{text}</p>)}
                    <Link href={item.href} className="text-link">Learn more <ArrowRightIcon width={16} height={16} /><span className="sr-only"> about {item.title}</span></Link>
                  </div>
                </details>)}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section id="doctor" className={`${styles.waveSection} ${styles.doctorSection}`} aria-labelledby="doctor-h">
        <div className={`container ${styles.doctorGrid}`}>
          <div className={styles.doctorVisual}>
            <figure className={styles.doctorPhoto}>
              <Image src="/images/Copy of DSC06852.JPG" alt="Dr. Poonam Jain seated at her consultation desk at Namokar Eye & Oculoplasty Centre" width={6000} height={4000} sizes="(min-width: 960px) 42vw, 100vw" />
            </figure>
            <div className={styles.doctorHighlights} aria-label="Professional highlights">
              <div className={styles.doctorExperience}><strong>25+</strong><span>Years of Experience</span></div>
              <ul><li>Senior Ophthalmologist</li><li>Oculoplasty Surgeon</li><li>Patient-focused Care</li></ul>
            </div>
          </div>
          <div className={`${styles.doctorCopy} ${styles.doctorIntro}`}>
            <p className="kicker">Meet your doctor</p>
            <h2 id="doctor-h">Meet Dr. Poonam Jain</h2>
            <p className={styles.designation}>Medical Director &bull; Senior Ophthalmologist &bull; Oculoplasty Surgeon</p>
            <p>With 25+ years of experience in ophthalmology and oculoplasty, Dr. Poonam Jain leads clinical care at Namokar Eye &amp; Oculoplasty Centre.</p>
            <p>Alongside comprehensive ophthalmology, she has a particular clinical focus on oculoplasty, including functional and aesthetic conditions involving the eyelids, tear passages and surrounding eye area. Her approach is centred on careful evaluation, clear communication and treatment planning based on the individual patient&apos;s needs.</p>
            <div className={styles.actions}>
              <a href={bookingHref} className="btn btn--primary">Book an Appointment <ArrowRightIcon width={18} height={18} /></a>
              <Link href={LINKS.doctor} className="btn btn--secondary">Read About Doctor <ArrowRightIcon width={18} height={18} /></Link>
            </div>
          </div>
          <div className={styles.doctorPanels}>
              <section className={styles.infoPanel} aria-labelledby="expertise-h">
                <h3 id="expertise-h"><span className={styles.headingIcon}><AboutIcon name="eye" /></span>Areas of Expertise</h3>
                <ul className={styles.expertiseList}>
                  {SPECIALTIES.map((item) => <li key={item.icon}><Image src={`/images/doctor-expertise-${item.icon}.webp`} width={52} height={52} alt="" /><div><strong>{item.title}</strong>{item.descriptions.map((text) => <span key={text}>{text}</span>)}</div></li>)}
                </ul>
              </section>
              <section id="training" className={styles.infoPanel} aria-labelledby="training-h">
                <h3 id="training-h"><span className={`${styles.headingIcon} ${styles.capIcon}`}><AboutIcon name="cap" /></span>Qualifications &amp; Advanced Training</h3>
                <dl className={styles.timeline}>
                  <div><dt>MBBS</dt><dd>Maulana Azad Medical College, New Delhi</dd></div>
                  <div><dt>MS, Ophthalmology</dt><dd>Safdarjung Hospital, New Delhi</dd></div>
                  <RegistrationRow />
                  <div><dt>Fellowship in Oculoplasty</dt><dd>Barraquer Institute, Barcelona, Spain</dd></div>
                  <div><dt>Observership</dt><dd>Wilmer Eye Institute, Johns Hopkins, Baltimore, USA</dd></div>
                </dl>
              </section>
          </div>
        </div>
      </section>

      {gallery.length > 0 && <section id="hospital" className={styles.waveSection} aria-labelledby="hospital-h">
        <div className="container">
          <div className={styles.centeredHeading}>
            <p className="kicker">Our centre</p>
            <h2 id="hospital-h">The People and Spaces Behind Your Care</h2>
            <p>Meet the team and see the actual rooms where patients are welcomed, examined and treated at our Ashok Vihar centre.</p>
          </div>
          <FacilityGallery items={gallery} label="Photographs inside the centre" showcase />
        </div>
      </section>}

      <div className={`${styles.waveSection} ${styles.walkthroughOuter}`}>
        <div className={homeStyles.homeRedesign}>
          <WalkthroughSection id="about-video" video={walkthrough ? playerProps(walkthrough) : undefined}
            eyebrow="Look Inside"
            heading="Take a Walk Through Namokar"
            showDescription={false}
            lead="Before your visit, see the reception, consultation spaces, examination areas and other parts of our Ashok Vihar centre."
            note="The video is general information and loads from YouTube only when you press play." />
        </div>
      </div>

      <section id="journey" className={`${styles.waveSection} ${styles.visitSection}`} aria-labelledby="journey-h">
        <div className="container">
          <div className={styles.centeredHeading}>
            <p className="kicker">Your visit</p>
            <h2 id="journey-h">What to Expect When You Visit Namokar</h2>
            <p>A general outline of how a visit usually goes. Each patient&apos;s care depends on their own eyes and needs, and no particular outcome can be promised.</p>
          </div>
          <ol className={styles.journey}>
            {JOURNEY.map((step, index) => <li key={step.title} className={styles.journeyCard}>
              <span className={styles.journeyIcon}>{step.icon === "calendar" ? <CalendarIcon /> : <AboutIcon name={step.icon} />}</span>
              <h3>{step.title}</h3><p>{step.text}</p>
              {index < JOURNEY.length - 1 && <span className={styles.connector} aria-hidden="true"><ArrowRightIcon width={17} height={17} /></span>}
            </li>)}
          </ol>
          <p className={styles.visitPreparation}>Bring previous prescriptions, reports, scans, your current spectacles and your medication list where relevant.</p>
        </div>
      </section>

      <div className={styles.waveSection}>
        <div className={`${homeStyles.homeRedesign} ${styles.ctaOuter}`}><HomeCta online={online} /></div>
      </div>
    </main>
  );
}
