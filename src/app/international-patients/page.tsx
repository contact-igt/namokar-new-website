import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import JsonLd from "@/components/JsonLd";
import ServicesFaqSection from "@/components/ServicesFaqSection";
import { ArrowRightIcon, InfoIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { PAGES } from "@/config/routes";
import { LINKS, MAPS_LINK, SERVICES, SITE, TEL_HREF } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import { pageMeta } from "@/lib/seo";
import { webPage } from "@/lib/schema";
import styles from "./international.module.css";
import homeStyles from "../home-redesign.module.css";
import VisitChecklist from "./VisitChecklist";

export const metadata: Metadata = pageMeta("international", {
  title: "International Patients – Eye Care in Delhi | Namokar",
  description:
    "Plan your eye consultation at Namokar Eye & Oculoplasty Centre, Delhi, India. Comprehensive eye care and specialised oculoplasty led by Dr. Poonam Jain.",
});

const address = `${SITE.address.lines.join(", ")}, India`;
const flyingWarning = "Do not fly or travel to high altitudes while a gas or air bubble remains inside your eye. Lower air pressure can expand the bubble, dangerously increase eye pressure and cause permanent vision loss. Wait until the bubble has completely resolved and your treating ophthalmologist confirms that travel is safe.";
const urgentWarning = "Seek urgent or emergency eye care near your current location for sudden loss or significant reduction of vision, severe eye pain, sudden flashes or new floaters, a curtain-like shadow across your vision, new double vision or eye misalignment, sudden eyelid drooping, significant injury or chemical exposure, or severe or worsening symptoms after surgery. Do not wait for an appointment or travel to Delhi.";

const STEPS = [
  {
    title: "Initial Enquiry",
    text: `Call ${SITE.phone.display} and briefly explain your symptoms and reason for seeking consultation. Ask about appointment availability.`,
  },
  {
    title: "Appointment & Travel Planning",
    text: "Confirm your consultation date and time before booking travel. Discuss whether additional examinations, treatment or follow-up visits may be needed.",
  },
  {
    title: "Prepare Your Medical Records",
    text: "Bring previous eye reports, prescriptions, current spectacles and details of earlier surgery, ongoing treatment and medications.",
  },
  {
    title: "Clinical Assessment & Treatment Planning",
    text: "Your ophthalmologist examines your eyes and explains the findings, suitable treatment options, possible benefits, risks and alternatives.",
  },
  {
    title: "Follow-up & Return Travel",
    text: "Discuss recovery, follow-up examinations, travel precautions and any continued care you may need in your home city or country.",
  },
];

const FAQs = [
  { q: "Can patients from outside Delhi or overseas consult at Namokar?", a: "Contact the centre to discuss consultation availability and arrangements before planning your visit." },
  { q: "How do I arrange an appointment before travelling to Delhi?", a: `Call ${SITE.phone.display} to discuss your eye concern. Your appointment is confirmed once the centre agrees a date and time with you.` },
  { q: "Can I share my previous medical reports before travelling?", a: "Ask the centre how to share documents securely. Avoid submitting sensitive records through general enquiry forms or unverified communication channels." },
  { q: "Can I receive a treatment recommendation before visiting?", a: "Previous medical information may help guide preliminary discussions. A definitive diagnosis, surgical suitability and individual treatment recommendations may require an in-person examination and further investigations." },
  { q: "What eye care services are available at Namokar?", a: "Areas of care include cataract, retina, glaucoma, refractive surgery, squint, comprehensive eye examinations and functional, reconstructive and aesthetic eyelid care. Specific procedure availability and surgical arrangements are discussed individually." },
  { q: "Can my surgery be scheduled in advance?", a: "Contact the centre to discuss possible arrangements. Surgery can be confirmed once the required assessment, treatment suitability and surgical arrangements have been established." },
  { q: "How much will my eye treatment cost?", a: "Costs depend on your diagnosis, tests, proposed procedure and individual needs. Ask about consultation charges and how treatment estimates are determined." },
  { q: "How long will I need to stay in Delhi?", a: "The recommended stay depends on your condition, treatment, recovery and follow-up schedule. Discuss your return plans with the treating team before making final arrangements." },
  { q: "Should I travel with a family member or companion?", a: "A companion may be helpful if pupil dilation, surgery, anaesthesia or postoperative assistance is expected. Ask the centre what your visit may require." },
  { q: "Does Namokar provide visa, accommodation or airport transfer assistance?", a: "Ask the centre before travelling whether any help with travel documentation, accommodation or transport is available." },
  { q: "Can I use my international health insurance?", a: "Insurance arrangements vary between providers and policies. Confirm coverage directly with your insurer and discuss payment arrangements with Namokar before travelling or starting treatment." },
  { q: "Is it safe to fly after eye surgery?", a: `Travel depends on the procedure and your recovery. ${flyingWarning}` },
  { q: "Can I continue follow-up care in my home country?", a: "Depending on the treatment, follow-up with a local ophthalmologist may be appropriate. Discuss the review schedule and request relevant records and instructions before returning home." },
  { q: "What if I experience an eye emergency before travelling?", a: urgentWarning },
  { q: "Where is Namokar Eye & Oculoplasty Centre located?", a: `The centre is at ${address}. Contact the centre for directions and appointment arrangements.` },
];

const serviceGroups = [
  {
    title: "Comprehensive Eye Care",
    services: [
      ...SERVICES.filter(({ group }) => group === "vision"),
      { key: "squint", title: PAGES.squint.label, href: PAGES.squint.path },
    ],
    offset: 0,
  },
  { title: "Specialised Oculoplasty", services: SERVICES.filter(({ group }) => group === "oculoplasty"), offset: 6 },
];

const stayPlanning = [
  ["Individual Treatment Plan", "Recommendations are based on your eye health, medical history and examination findings."],
  ["Treatment Cost Guidance", "Ask about estimated consultation, investigation, surgical and follow-up costs."],
  ["Duration of Stay", "Your recommended stay depends on the condition, treatment and postoperative monitoring required."],
  ["Continued Eye Care", "Discuss whether follow-up with an ophthalmologist near home would be appropriate."],
];

const travelConsiderations = [
  ["Cataract Surgery", "Discuss postoperative examinations, healing and safe return travel with your surgeon."],
  ["Retina Surgery", "Travel restrictions depend on the procedure and whether a gas or air bubble was used."],
  ["LASIK & Refractive Surgery", "Follow instructions on drops, dryness, eye protection and postoperative examinations."],
  ["Glaucoma Surgery", "Plan for eye pressure checks, healing and treatment-specific follow-up."],
  ["Squint Surgery", "Follow postoperative instructions and arrange alignment and healing checks."],
  ["Eyelid & Oculoplasty Surgery", "Allow for swelling, wound healing and postoperative reviews as advised."],
];

export default function InternationalPage() {
  const online = onlineBookingAvailable();
  const consultationLabel = online ? "Request a Consultation" : "Plan Your Consultation";

  return (
    <main id="main" className={styles.page}>
      <JsonLd page="international"
        data={webPage({ path: PAGES.international.path, name: "International and Outstation Patients", description: metadata.description as string })}
      />
      <svg className={styles.shapeDefinitions} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="international-hero-shape" clipPathUnits="objectBoundingBox">
            <path d="M.24,.005 C.46,-.025 .82,-.015 1,.12 L1,.85 C1,.93 .97,.97 .93,.965 C.83,.95 .81,.78 .67,.73 C.53,.68 .43,.78 .29,.89 C.15,1 .045,.87 .025,.63 C.005,.39 .065,.085 .24,.005 Z" />
          </clipPath>
        </defs>
      </svg>

      <section className={styles.hero} aria-labelledby="international-h">
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href={LINKS.home}>Home</Link><span aria-hidden="true">/</span>
            <Link href={LINKS.about}>About</Link><span aria-hidden="true">/</span>
            <span aria-current="page">International Patients</span>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>International Patients</p>
              <h1 id="international-h">Specialised Eye Care for <span className="title-secondary">International &amp; Outstation Patients</span></h1>
              <p className={styles.heroLead}>Namokar Eye &amp; Oculoplasty Centre welcomes patients from across India and overseas seeking comprehensive ophthalmic care and specialised functional, reconstructive and aesthetic oculoplasty.</p>
              <p className={styles.heroLead}>Led by Dr. Poonam Jain, an internationally trained ophthalmologist and oculoplastic surgeon with over 28 years of clinical and surgical experience, the centre focuses on individual assessment and personalised treatment planning.</p>
              <BookButton online={online} label={consultationLabel} className={`btn btn--primary ${styles.heroButton}`} />
            </div>
            <div className={styles.heroVisual}>
              <figure className={styles.heroImage}>
                <Image src="/images/Modern Clinic Reception Desk.png" alt="The reception desk at Namokar Eye & Oculoplasty Centre" fill priority sizes="(min-width: 960px) 60vw, 100vw" />
              </figure>
              <div className={styles.heroClaim}>
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
                  <path d="M3 24c5.8-8.7 12.8-13 21-13s15.2 4.3 21 13c-5.8 8.7-12.8 13-21 13S8.8 32.7 3 24Z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
                  <circle cx="24" cy="24" r="2.5" fill="currentColor" />
                </svg>
                <p><strong>Comprehensive Eye Care</strong><span>Specialised Functional, Reconstructive &amp; Aesthetic Oculoplasty</span></p>
              </div>
            </div>
          </div>
          <aside className={styles.contactStrip} aria-label="Contact the centre">
            <strong>Contact Our Centre</strong>
            <p><PinIcon /><span>{SITE.name}, {address}</span></p>
            <a href={TEL_HREF}><PhoneIcon />{SITE.phone.display}</a>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"><PinIcon />Get Directions<span className="sr-only"> (opens in a new tab)</span></a>
          </aside>
        </div>
      </section>

      <div className={styles.postHero}>
        <section id="doctor" className={`${styles.section} ${styles.waveSection}`} aria-labelledby="doctor-h">
          <div className="container">
            <div className={styles.noteCard}>
              <div>
                <p className={styles.eyebrow}>Meet Your Doctor</p>
                <h2 id="doctor-h">Dr. Poonam Jain, <span className="title-secondary">MS</span></h2>
              </div>
              <div className={styles.noteCopy}>
                <p><strong>Medical Director · Senior Ophthalmologist &amp; Oculoplastic Surgeon</strong></p>
                <p>Dr. Jain has over 28 years of clinical and surgical experience in comprehensive ophthalmology, cataract surgery and functional, reconstructive and aesthetic oculoplasty.</p>
                <p>Her international training includes a fellowship in aesthetic oculoplasty at the Barraquer Institute in Barcelona, Spain, and a clinical observership at the Wilmer Eye Institute, Johns Hopkins, USA.</p>
                <p><Link href={LINKS.doctor}>Learn More About Dr. Poonam Jain</Link></p>
              </div>
            </div>
          </div>
        </section>
        <section id="plan" className={`${styles.section} ${styles.waveSection}`} aria-labelledby="plan-h">
        <div className="container">
          <div className={styles.centerHeading}>
            <p className={styles.eyebrow}>Planning your visit</p>
            <h2 id="plan-h">Your Journey from <span className="title-secondary">Consultation to Follow-up</span></h2>
            <p>Contact our centre before travelling to discuss appointment availability, clinical requirements and the possible next steps in your care.</p>
          </div>
          <ol className={styles.steps}>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles.stepCard}>
                <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p className={styles.heroLead}>An initial enquiry helps with planning. Confirm your appointment and any treatment arrangements with the centre before travelling.</p>
        </div>
      </section>

      <section id="arrive" className={`${styles.section} ${styles.arrive} ${styles.waveSection}`} aria-labelledby="arrive-h">
        <div className={`container ${styles.arriveGrid}`}>
          <div className={styles.arriveHeading}>
            <p className={styles.eyebrow}>Welcome to Namokar</p>
            <h2 id="arrive-h">Your Visit <span className="title-secondary">to Our Centre</span></h2>
            <p>Our centre in Ashok Vihar, New Delhi, provides comprehensive eye examinations and specialised ophthalmic care. The reception team can assist with registration and guide you through the consultation process.</p>
            <ul className={styles.arrivalDetails}>
              <li id="arrival-reception-caption"><span><InfoIcon /></span>A reception area for patients and accompanying family members.</li>
              <li id="arrival-entrance-caption"><span><PinIcon /></span>Namokar Eye &amp; Oculoplasty Centre in Ashok Vihar, New Delhi.</li>
              <li><span><InfoIcon /></span>Personalised consultations and guidance on clinical assessment and further care.</li>
            </ul>
          </div>
          <div className={styles.gallery}>
            <figure className={styles.galleryPrimary} aria-labelledby="arrival-reception-caption">
              <Image src="/images/Modern Reception Desk with Attentive Professional.png" alt="The reception desk at Namokar Eye & Oculoplasty Centre" fill sizes="(min-width: 960px) 34vw, (min-width: 840px) 440px, 54vw" />
            </figure>
            <figure className={styles.gallerySecondary} aria-labelledby="arrival-entrance-caption">
              <Image src="/images/Namokar Eye Centre Courtyard Entrance.png" alt="The courtyard entrance to Namokar Eye & Oculoplasty Centre" fill sizes="(min-width: 960px) 24vw, (min-width: 840px) 305px, 38vw" />
            </figure>
          </div>
        </div>
      </section>

      <section id="careful" className={`${styles.section} ${styles.waveSection}`} aria-labelledby="careful-h">
        <div className="container">
          <div className={styles.noteCard}>
            <div>
              <p className={styles.eyebrow}>Important Information Before You Travel</p>
              <h2 id="careful-h">Planning Your Visit <span className="title-secondary">with Confidence</span></h2>
            </div>
            <div className={styles.noteCopy}>
              <p>Before travelling, ask the centre about appointment availability, consultation requirements and any support you may need with travel, accommodation, documentation, language or insurance.</p>
              <p>Preliminary enquiries help with planning. A definitive diagnosis, surgical suitability, treatment recommendations, cost estimates and recovery guidance may require an in-person examination and diagnostic tests.</p>
              <p><strong>Medical records and privacy.</strong> Ask the centre how to share medical documents securely. Avoid sending sensitive records, passport details or personal health information through general enquiry forms or unverified channels.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="care" className={`${styles.section} ${styles.careSection}`} aria-labelledby="care-h">
        <div className="container">
          <div className={styles.centerHeading}>
            <p className={styles.eyebrow}>Our Specialities</p>
            <h2 id="care-h">Comprehensive Eye Care &amp; <span className="title-secondary">Specialised Oculoplasty</span></h2>
            <p>Explore ophthalmic and oculoplastic care for vision, eye health, function and appearance. Treatment suitability and surgical arrangements are discussed after clinical assessment.</p>
          </div>
          {serviceGroups.map(({ title, services, offset }) => (
            <div key={title} className={styles.serviceGroup}>
              <h3 className="h3">{title}</h3>
              <ul className={styles.serviceGrid}>
                {services.map((service, index) => (
                  <li key={service.key}>
                    <Link href={service.href} className={styles.serviceCard}>
                      <span className={styles.serviceNumber} aria-hidden="true">0{offset + index + 1}</span>
                      <span>{service.title}</span>
                      <ArrowRightIcon width={20} height={20} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="prepare" className={`${styles.section} ${styles.waveSection}`} aria-labelledby="prepare-h">
        <div className="container">
          <div className={styles.noteCard}>
            <div>
              <p className={styles.eyebrow}>Before Your Visit</p>
              <h2 id="prepare-h">What to Bring to <span className="title-secondary">Your Eye Consultation</span></h2>
              <p>Relevant records help your ophthalmologist understand your medical history and plan any investigations you need.</p>
              <p>Consider bringing English translations where possible. Continue your prescribed medicines and eye drops unless your treating doctor advises otherwise.</p>
            </div>
            <div className={styles.noteCopy}><VisitChecklist /></div>
          </div>
        </div>
      </section>

      <section id="stay" className={`${styles.section} ${styles.waveSection}`} aria-labelledby="stay-h">
        <div className="container">
          <div className={styles.centerHeading}>
            <h2 id="stay-h">Understanding Treatment Costs &amp; <span className="title-secondary">Planning Your Stay</span></h2>
            <p>Cost and duration depend on your diagnosis, tests, planned procedure and individual needs. Ask about estimates, recovery and follow-up before deciding on surgery or return travel.</p>
          </div>
          <ul className={styles.serviceGrid}>
            {stayPlanning.map(([title, text]) => (
              <li key={title} className={styles.stepCard}><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ul>
          <p className={styles.heroLead}>Keep return travel flexible until you have discussed your recovery and follow-up needs with the treating team.</p>
        </div>
      </section>

      <section id="travel-after-treatment" className={`${styles.section} ${styles.waveSection}`} aria-labelledby="travel-h">
        <div className="container">
          <div className={styles.centerHeading}>
            <p className={styles.eyebrow}>Travel &amp; Recovery Guidance</p>
            <h2 id="travel-h">Travelling Safely <span className="title-secondary">After Eye Treatment</span></h2>
            <p>Ask your ophthalmologist when it is safe to travel and what follow-up, eye protection, medication or activity restrictions you need. The advice depends on your procedure and recovery.</p>
          </div>
          <ul className={styles.serviceGrid}>
            {travelConsiderations.map(([title, text]) => (
              <li key={title} className={styles.stepCard}><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ul>
          <div className={`${styles.noteCard} ${styles.travelWarning}`}>
            <h3>Do Not Fly with a Gas or Air Bubble Inside Your Eye</h3>
            <div className={styles.noteCopy}><p>{flyingWarning}</p></div>
          </div>
          <p className={styles.heroLead}>Before leaving Delhi, discuss your follow-up schedule and request treatment summaries, prescriptions and postoperative instructions. If you need continued monitoring, ask how to arrange care with an ophthalmologist near home.</p>
        </div>
      </section>

      <section id="urgent-eye-care" className={`${styles.section} ${styles.waveSection}`} aria-labelledby="urgent-h">
        <div className="container">
          <div className={styles.noteCard}>
            <h2 id="urgent-h">When to Seek <span className="title-secondary">Immediate Medical Attention</span></h2>
            <div className={styles.noteCopy}><p>{urgentWarning}</p></div>
          </div>
        </div>
      </section>

      <ServicesFaqSection
        items={FAQs}
        heading="International Patients – Frequently Asked Questions"
        lead="Practical guidance on appointments, medical records, travel and follow-up."
        serviceStyle
        online={online}
        allClosed
      />

      <section id="find" className={`${styles.section} ${styles.waveSection}`} aria-labelledby="find-h">
        <div className="container">
          <div className={styles.locationCard}>
            <div className={styles.locationIntro}>
              <svg className={styles.locationMotif} viewBox="0 0 240 180" fill="none" aria-hidden="true" focusable="false">
                <path d="m8 123 64-30 56 12 66-38 37 57-74 44-64-15-61 19Z" fill="#f7cda9" fillOpacity=".32" />
                <path d="m14 143 61-29 61 14 76-41M47 105l46 48m36-48 28 63m27-90-69 79" stroke="#fff9f3" strokeWidth="5" />
                <ellipse cx="130" cy="130" rx="39" ry="13" fill="#e79651" fillOpacity=".14" />
                <ellipse cx="130" cy="130" rx="25" ry="7" stroke="#db8b46" strokeOpacity=".35" />
                <path d="M130 45a27 27 0 0 0-27 27c0 20 27 51 27 51s27-31 27-51a27 27 0 0 0-27-27Z" fill="#e89753" />
                <circle cx="130" cy="72" r="10" fill="#fff8f0" />
              </svg>
              <p className={styles.eyebrow}>Visit Our Centre</p>
              <h2 id="find-h">Find Namokar Eye &amp; Oculoplasty Centre <span className="title-secondary">in New Delhi</span></h2>
              <p>Confirm your appointment and travel arrangements before visiting.</p>
            </div>
            <div className={styles.locationDetails}>
              <address>
                <PinIcon />
                <span><strong>{SITE.name}</strong><br />{address}</span>
              </address>
              <p>Contact the centre to confirm consultation timings and availability.</p>
              <a href={TEL_HREF}><PhoneIcon />Call the Centre · {SITE.phone.display}</a>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"><PinIcon />Get Directions<span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
        </div>
      </section>

      <div className={`${homeStyles.homeRedesign} ${styles.bottomCta}`}>
        <section className="cta-section" aria-labelledby="intl-cta-h">
          <div className="container">
            <div className="cta-panel">
              <figure className="cta-visual" aria-hidden="true">
                <Image src="/images/Hands Cupping Glowing Eye Icon.png" alt="" fill sizes="(min-width: 760px) 38vw, 100vw" className="cta-panel-image" />
              </figure>
              <div className="cta-panel-copy">
                <p className={styles.eyebrow}>Plan Your Visit to Namokar</p>
                <h2 id="intl-cta-h" className="cta-title">Specialised Eye Care, <span className="title-secondary">Wherever You Come From</span></h2>
                <p className="cta-desc">Whether you are travelling from another city in India or from overseas, contact Namokar Eye &amp; Oculoplasty Centre to discuss your eye care needs, appointment availability and personalised treatment guidance.</p>
                <p className="cta-desc"><strong>Complete Eye Care &amp; Specialised Oculoplasty</strong><br />See Better. Look Better.</p>
                <div className={styles.ctaContact}>
                  <p><PinIcon /><span>{address}</span></p>
                  <p><PhoneIcon /><a href={TEL_HREF}>{SITE.phone.display}</a></p>
                </div>
                <div className="cta-panel-actions">
                  {online ? (
                    <>
                      <BookButton online label={consultationLabel} />
                      <a href={TEL_HREF} className="btn cta-call-button"><PhoneIcon />Call Us Now</a>
                    </>
                  ) : (
                    <>
                      <a href="#plan" className="btn btn--primary">Plan Your Consultation</a>
                      <BookButton online={false} className="btn cta-call-button" label="Call Us Now" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
    </main>
  );
}
