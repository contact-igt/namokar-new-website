import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import FacilityGallery from "@/components/FacilityGallery";
import RegistrationRow from "@/components/RegistrationRow";
import JsonLd from "@/components/JsonLd";
import HomeCta from "@/components/HomeCta";
import WalkthroughSection from "@/components/WalkthroughSection";
import { ArrowRightIcon, CalendarIcon, ChevronDownIcon } from "@/components/Icons";
import { ASSETS } from "@/config/assets";
import { PAGES } from "@/config/routes";
import { LINKS, SERVICES, TEL_HREF } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import { compact, photoItem } from "@/lib/photos";
import { clinic, ids, webPage } from "@/lib/schema";
import { playerProps } from "@/lib/videoProps";
import { videosFor } from "@/content/videos";
import homeStyles from "../home-redesign.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = pageMeta("about", {
  title: "About Namokar Eye & Oculoplasty Centre, Delhi",
  description:
    "Learn about Namokar Eye & Oculoplasty Centre in Ashok Vihar, Delhi, led by Dr. Poonam Jain, an internationally trained ophthalmologist with 28+ years of experience.",
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
  { title: "Comprehensive Ophthalmology", icon: "eye-care", href: LINKS.allServices, text: "Routine eye examinations, cataract care, glaucoma management, squint assessment and personalised treatment for various eye conditions." },
  { title: "Retina & Vision Correction", icon: "periocular", href: LINKS.refractive, text: "Retinal assessment, treatment and refractive surgery options based on individual eye health and suitability." },
  { title: "Functional & Reconstructive Oculoplasty", icon: "tear-passage", href: LINKS.reconstructive, text: "Specialised care for ptosis, eyelid abnormalities, tear-drainage disorders and reconstructive concerns." },
  { title: "Aesthetic Eyelid Surgery", icon: "eyelid", href: LINKS.eyelid, text: "Personalised surgical and aesthetic care for the eyelids and periocular region." },
];

const DOCTOR_EXPERTISE = [
  { title: "Comprehensive Ophthalmology", icon: "eye-care", text: "Diagnosis, assessment and management of a wide range of ophthalmic conditions." },
  { title: "Cataract & Surgical Eye Care", icon: "periocular", text: "Cataract evaluation, intraocular lens selection and personalised surgical treatment planning." },
  { title: "Functional & Reconstructive Oculoplasty", icon: "tear-passage", text: "Specialised care for ptosis, eyelid malposition, tear-drainage disorders and reconstructive concerns." },
  { title: "Aesthetic & Periocular Oculoplasty", icon: "eyelid", text: "Functional and aesthetic eyelid assessment, blepharoplasty and personalised periocular care." },
];

const SERVICE_DESCRIPTIONS = {
  cataract: "Assessment and surgical treatment of cataracts, with suitable intraocular lens options based on eye health and visual requirements.",
  retina: "Diagnosis and management of retinal conditions, with medical and surgical treatment options based on clinical assessment.",
  lasik: "Detailed evaluation and suitable vision correction procedures to reduce dependence on spectacles or contact lenses.",
  glaucoma: "Early detection, clinical assessment, appropriate treatment and long-term monitoring to help preserve vision.",
  exams: "Detailed evaluation of vision and overall eye health for routine and condition-specific concerns.",
  eyelid: "Functional and aesthetic eyelid surgery addressing excess eyelid skin and under-eye bags.",
  aesthetic: "Specialised care for aesthetic concerns and age-related changes involving the eyelids and surrounding eye area.",
  reconstructive: "Assessment and treatment of ptosis, eyelid abnormalities, tear-drainage disorders and other conditions affecting the structures around the eyes.",
} satisfies Record<(typeof SERVICES)[number]["key"], string>;

const CARE_SERVICES = [
  ...SERVICES.map(({ key, title, href }) => ({ title, href, description: SERVICE_DESCRIPTIONS[key] })),
  { title: PAGES.squint.label, href: PAGES.squint.path, description: "Assessment of eye alignment in children and adults, with treatment options based on the cause and individual examination findings." },
];

const JOURNEY = [
  { title: "Appointment Booking", icon: "calendar", text: "Contact our team to discuss your eye concern and arrange a suitable consultation." },
  { title: "Welcome & Registration", icon: "team", text: "Our reception team will assist with registration and guide you through the consultation process." },
  { title: "Consultation & Eye Examination", icon: "exam", text: "Your doctor will understand your concerns, review your medical history and perform appropriate eye examinations." },
  { title: "Diagnosis & Personalised Treatment Plan", icon: "plan", text: "Clinical findings, suitable treatment options, potential benefits, risks and alternatives will be discussed before deciding on the next steps." },
  { title: "Follow-up & Continued Care", icon: "follow", text: "Follow-up appointments and ongoing monitoring will be recommended according to your condition and treatment requirements." },
] as const;

export default function AboutPage() {
  const online = onlineBookingAvailable();
  const bookingLabel = online ? "Request a Consultation" : "Book a Consultation";
  const bookingHref = online ? `${LINKS.contact}#request` : TEL_HREF;
  // Group the original photographs into the shared four categories.
  const originalGallery = {
    theatre: photoItem(ASSETS.homeTheatreNov, { title: "Operation theatre", caption: "The operating table, microscope and surgical equipment used for eye procedures.", position: "50% 55%" }),
    room: photoItem(ASSETS.homeDiagnosticsNov, { title: "Examination room", caption: "Diagnostic instruments used during a detailed eye examination.", position: "50% 50%" }),
    consultation: photoItem(ASSETS.archCataractExam, { title: "Consultation & Eye Examination", caption: "Detailed eye examinations and clinical assessments to understand each patient's eye health and vision needs.", position: "55% 50%" }),
    team: photoItem(ASSETS.archTeamDoctor, { title: "Our care team", caption: "Dr. Poonam Jain and the dedicated clinical and support team at Namokar Eye & Oculoplasty Centre.", position: "50% 40%" }),
  };
  const caringPhoto = originalGallery.room ?? originalGallery.theatre;
  const gallery = compact([
    originalGallery.consultation,
    { src: "/images/Modern Clinic Reception Desk.png", alt: "The reception desk at Namokar Eye & Oculoplasty Centre", width: 1448, height: 1086, title: "Reception", caption: "A welcoming environment for patients and their families.", icon: "/images/reception-new.png", position: "50% 50%", preview: false },
    originalGallery.team && { ...originalGallery.team, title: "Our Team", icon: "/images/multiple-users-silhouette.png", photographs: [originalGallery.team] },
    caringPhoto && { ...caringPhoto, title: "Caring Spaces", caption: "Clinical spaces and diagnostic facilities supporting personalised ophthalmic care.", icon: "/images/microscope.png", photographs: compact([originalGallery.room, originalGallery.theatre]) },
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
              <h1 id="about-hero-h">Complete Eye Care with <span className="title-secondary">Specialised Oculoplasty Expertise</span></h1>
              <p>Namokar Eye &amp; Oculoplasty Centre in Ashok Vihar, New Delhi, brings together comprehensive eye care, advanced ophthalmic treatments and specialised aesthetic eyelid surgery under one roof.</p>
              <p>Led by Dr. Poonam Jain, an internationally trained ophthalmologist and oculoplastic surgeon with over 28 years of experience, the centre focuses on personalised care for your vision, eye health and periocular concerns.</p>
              <p><strong>See Better. Look Better.</strong></p>
              <div className={styles.actions}>
                <a href={bookingHref} className="btn btn--primary">{bookingLabel} <ArrowRightIcon width={18} height={18} /></a>
                <a href="#hospital" className="btn btn--secondary">Know Our Centre <ArrowRightIcon width={18} height={18} /></a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroCollage}>
                <figure className={styles.heroExterior}><Image src="/images/Namokar Eye Centre Exterior.png" alt="The exterior of Namokar Eye & Oculoplasty Centre" fill loading="eager" fetchPriority="high" sizes="(min-width: 960px) 75vw, 150vw" /></figure>
                <figure className={styles.heroReception}><Image src="/images/Modern Clinic Reception Desk.png" alt="The reception desk at Namokar Eye & Oculoplasty Centre" fill sizes="(min-width: 960px) 24vw, 50vw" /></figure>
              </div>
              <p className={styles.collageCaption}>Welcome to Namokar Eye &amp; Oculoplasty Centre, where comprehensive eye care meets specialised oculoplasty.</p>
            </div>
          </div>
          <ul className={styles.trustCards} aria-label="Our approach to care">
            <li><CalendarIcon /><strong>28+ Years of Clinical Experience</strong></li>
            <li><AboutIcon name="eye" /><strong>Modern Diagnostic Facilities</strong></li>
            <li><AboutIcon name="shield" /><strong>Internationally Trained Expertise</strong></li>
            <li><AboutIcon name="heart" /><strong>Personalised Patient Care</strong></li>
          </ul>
        </div>
      </section>

      <section id="about" className={styles.waveSection} aria-labelledby="about-h">
        <div className={`container ${styles.introGrid}`}>
          <div className={styles.introRight}>
            <div className={styles.introCopy}>
              <p className="kicker">About Namokar</p>
              <h2 id="about-h">Comprehensive Eye Care &amp; <span className="title-secondary">Advanced Oculoplasty Under One Roof</span></h2>
              <p>Namokar Eye &amp; Oculoplasty Centre, located in Ashok Vihar, New Delhi, provides comprehensive ophthalmic care, including eye examinations, cataract surgery, glaucoma management, retina care, LASIK and refractive surgery, and squint assessment and correction.</p>
              <p>A key speciality at Namokar is functional, reconstructive and aesthetic oculoplasty, focusing on the eyelids, tear-drainage system, eye socket and surrounding structures.</p>
              <p>Led by Dr. Poonam Jain, the centre combines clinical experience, international training and personalised treatment planning to address patients&rsquo; vision, eye health, eyelid function and aesthetic concerns.</p>
            </div>
            <div className={styles.introCare}>
              <div className={styles.accordions}>
                <section className={styles.careAvailable} aria-labelledby="care-available-h">
                  <h3 id="care-available-h">Care Available at Namokar</h3>
                  <div className={styles.answer}><p>Comprehensive ophthalmic treatments and specialised oculoplasty services, with care tailored to individual patient needs.</p></div>
                </section>
                <details>
                  <summary>Customised Management <ChevronDownIcon /></summary>
                  <div className={styles.answer}>
                    <p>Care is led by Dr. Poonam Jain, Medical Director and Senior Ophthalmologist. Consultations are built around understanding your concern, examining your eyes carefully and explaining the available options in clear language.</p>
                    <p>Our aim is not to rush a patient towards treatment. Where treatment may help, the reason, the alternatives and the next steps are discussed, so that you can make an informed decision at your own pace.</p>
                  </div>
                </details>
                {CARE_SERVICES.map((service) => <details key={service.href}><summary>{service.title}<ChevronDownIcon /></summary><div className={styles.answer}><p>{service.description}</p><Link href={service.href} className="text-link">{service.title}<ArrowRightIcon width={16} height={16} /></Link></div></details>)}
              </div>
            </div>
          </div>
          <div className={styles.introVisual}>
            <div className={styles.introCollage}>
              <figure className={styles.introReception}><Image src="/images/Modern Reception Desk with Attentive Professional.png" alt="A receptionist at the Namokar reception counter" fill sizes="(min-width: 960px) 38vw, 90vw" /></figure>
              <figure className={styles.introRoom}><Image src="/images/Professional Clinical Team Portrait.png" alt="Six members of the Namokar clinical team standing together" fill sizes="(min-width: 960px) 22vw, (min-width: 601px) 50vw, 92vw" /></figure>
            </div>
            <section className={styles.specialtySection} aria-labelledby="about-expertise-h">
              <h3 id="about-expertise-h">Our Specialities</h3>
              <div className={styles.specialtyAccordions}>
                {SPECIALTIES.map((item) => <details key={item.icon} name="about-expertise">
                  <summary><Image src={`/images/doctor-expertise-${item.icon}.webp`} width={48} height={48} alt="" /><strong>{item.title}</strong><ChevronDownIcon /></summary>
                  <div className={styles.specialtyAnswer}>
                    <p>{item.text}</p>
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
              <Image src="/images/aesthetic/dr-poonam-jain-slit-clean.webp" alt="Dr. Poonam Jain beside a slit lamp at Namokar Eye & Oculoplasty Centre" width={1200} height={800} sizes="(min-width: 960px) 42vw, (min-width: 640px) 640px, 100vw" />
            </figure>
            <div className={styles.doctorHighlights} aria-label="Professional highlights">
              <div className={styles.doctorExperience}><strong>28+</strong><span>Years of Clinical &amp; Surgical Experience</span></div>
              <ul><li>Internationally Trained</li><li>Ophthalmologist &amp; Oculoplastic Surgeon</li></ul>
            </div>
          </div>
          <div className={`${styles.doctorCopy} ${styles.doctorIntro}`}>
            <p className="kicker">Meet your doctor</p>
            <h2 id="doctor-h">Dr. <span className="title-secondary">Poonam Jain</span></h2>
            <p className={styles.designation}>Medical Director &bull; Senior Ophthalmologist &amp; Oculoplastic Surgeon</p>
            <p>Dr. Poonam Jain is an internationally trained ophthalmologist and oculoplastic surgeon with over 28 years of clinical and surgical experience.</p>
            <p>Her clinical expertise encompasses comprehensive ophthalmic care, cataract surgery and specialised functional, reconstructive and aesthetic oculoplasty, with a particular focus on the eyelids, tear-drainage system and periocular region.</p>
            <p>She completed her postgraduate training in ophthalmology at Safdarjung Hospital, New Delhi, pursued a fellowship in aesthetic oculoplasty at the Barraquer Institute in Barcelona, Spain, and undertook a clinical observership at the Wilmer Eye Institute, Johns Hopkins, USA.</p>
            <p>As the founder and Medical Director of Namokar Eye &amp; Oculoplasty Centre, she focuses on personalised assessments, informed treatment decisions and individualised patient care.</p>
            <div className={styles.actions}>
              <a href={bookingHref} className="btn btn--primary">{bookingLabel} <ArrowRightIcon width={18} height={18} /></a>
              <Link href={LINKS.doctor} className="btn btn--secondary">Read Dr. Jain&apos;s Biography <ArrowRightIcon width={18} height={18} /></Link>
            </div>
          </div>
          <div className={styles.doctorPanels}>
              <section className={styles.infoPanel} aria-labelledby="expertise-h">
                <h3 id="expertise-h"><span className={styles.headingIcon}><AboutIcon name="eye" /></span>Areas of Expertise</h3>
                <ul className={styles.expertiseList}>
                  {DOCTOR_EXPERTISE.map((item) => <li key={item.icon}><Image src={`/images/doctor-expertise-${item.icon}.webp`} width={52} height={52} alt="" /><div><strong>{item.title}</strong><span>{item.text}</span></div></li>)}
                </ul>
              </section>
              <section id="training" className={styles.infoPanel} aria-labelledby="training-h">
                <h3 id="training-h"><span className={`${styles.headingIcon} ${styles.capIcon}`}><AboutIcon name="cap" /></span>Qualifications &amp; International Training</h3>
                <dl className={styles.timeline}>
                  <div><dt>MBBS</dt><dd>Maulana Azad Medical College, New Delhi, India</dd></div>
                  <div><dt>MS &ndash; Ophthalmology</dt><dd>Safdarjung Hospital, New Delhi, India</dd></div>
                  <RegistrationRow />
                  <div><dt>Fellowship in Aesthetic Oculoplasty</dt><dd>Barraquer Institute, Barcelona, Spain</dd></div>
                  <div><dt>Clinical Observership</dt><dd>Wilmer Eye Institute, Johns Hopkins, Baltimore, USA</dd></div>
                </dl>
              </section>
          </div>
        </div>
      </section>

      {gallery.length > 0 && <section id="hospital" className={styles.waveSection} aria-labelledby="hospital-h">
        <div className="container">
          <div className={styles.centeredHeading}>
            <p className="kicker">Our centre</p>
            <h2 id="hospital-h">The People and Spaces <span className="title-secondary">Behind Your Care</span></h2>
            <p>Meet our dedicated team and explore the clinical facilities at Namokar Eye &amp; Oculoplasty Centre, where personalised eye care begins with patient comfort, careful assessment and individual attention.</p>
          </div>
          <FacilityGallery items={gallery} label="Photographs inside the centre" showcase />
        </div>
      </section>}

      <div className={`${styles.waveSection} ${styles.walkthroughOuter}`}>
        <div className={homeStyles.homeRedesign}>
          <WalkthroughSection id="about-video" video={walkthrough ? { ...playerProps(walkthrough), title: "A Closer Look Inside Namokar Eye & Oculoplasty Centre, Delhi" } : undefined}
            eyebrow="Explore Our Centre"
            heading="Take a Walk Through Namokar"
            showDescription={false}
            lead="Explore Namokar Eye & Oculoplasty Centre before your visit. Take a closer look at our reception, consultation rooms, examination areas and clinical environment in Ashok Vihar, New Delhi."
            note="The video is general information and loads from YouTube only when you press play." />
        </div>
      </div>

      <section id="journey" className={`${styles.waveSection} ${styles.visitSection}`} aria-labelledby="journey-h">
        <div className="container">
          <div className={styles.centeredHeading}>
            <p className="kicker">Your visit</p>
            <h2 id="journey-h">What to Expect When <span className="title-secondary">You Visit Namokar</span></h2>
            <p>From your first appointment to treatment planning and follow-up, our team guides you through each stage of your eye care journey based on your individual needs.</p>
          </div>
          <ol className={styles.journey}>
            {JOURNEY.map((step, index) => <li key={step.title} className={styles.journeyCard}>
              <span className={styles.journeyIcon}>{step.icon === "calendar" ? <CalendarIcon /> : <AboutIcon name={step.icon} />}</span>
              <h3>{step.title}</h3><p>{step.text}</p>
              {index < JOURNEY.length - 1 && <span className={styles.connector} aria-hidden="true"><ArrowRightIcon width={17} height={17} /></span>}
            </li>)}
          </ol>
          <section className={styles.visitPreparation} aria-labelledby="visit-notes-h">
            <h3 id="visit-notes-h">Consultation notes</h3>
            <ul>
              <li><strong>What to bring.</strong> Please bring your previous eye reports, prescriptions, current spectacles and a list of medications to your consultation.</li>
              <li><strong>Treatment and outcomes.</strong> Treatment recommendations and outcomes vary according to individual clinical conditions.</li>
            </ul>
            <p className={styles.visitUrgent}><strong>Seek urgent medical assessment</strong> for sudden vision loss, severe eye pain, new flashes, a sudden increase in floaters, or a curtain-like shadow across your vision. Do not wait for a routine consultation.</p>
          </section>
        </div>
      </section>

      <div className={styles.waveSection}>
        <div className={`${homeStyles.homeRedesign} ${styles.ctaOuter}`}><HomeCta
          online={online}
          heading="See Better. Look Better."
          subheading="Book Your Consultation Today"
          onlineBookingLabel="Request a Consultation"
          desc="Whether you need a routine eye examination, specialised ophthalmic treatment or aesthetic eyelid care, begin with a personalised consultation at Namokar Eye & Oculoplasty Centre."
        /></div>
      </div>
    </main>
  );
}
