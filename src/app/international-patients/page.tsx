import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookButton, { SecondaryContact } from "@/components/BookButton";
import JsonLd from "@/components/JsonLd";
import { ArrowRightIcon, InfoIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { PAGES } from "@/config/routes";
import { LINKS, MAPS_LINK, SERVICES, SITE, TEL_HREF } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import { pageMeta, withBrand } from "@/lib/seo";
import { webPage } from "@/lib/schema";
import styles from "./international.module.css";
import homeStyles from "../home-redesign.module.css";

export const metadata: Metadata = pageMeta("international", {
  title: withBrand("International Patients"),
  description:
    "Visiting Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi from outside Delhi or abroad: how to get in touch, what to bring and what to ask first.",
});

const STEPS = [
  {
    title: "Call to ask about a visit",
    text: `Telephone the centre on ${SITE.phone.display} and say briefly what is troubling you. The team will tell you how a visit can be arranged.`,
  },
  {
    title: "Agree a time",
    text: "Confirm the day and time with the centre before you book travel. A telephone enquiry is not a booking until the centre confirms it.",
  },
  {
    title: "Gather what to bring",
    text: "Previous prescriptions, eye reports and scans, your current spectacles, a list of your medicines and a list of your questions.",
  },
  {
    title: "See the doctor in person",
    text: "The doctor examines your eyes and explains the findings and the options. Treatment, where it is needed, is discussed before you decide.",
  },
  {
    title: "Ask about follow-up before you travel",
    text: "Some conditions need review after a visit. Ask the centre what follow-up you may need, and whether it can be arranged where you live.",
  },
];

export default function InternationalPage() {
  const online = onlineBookingAvailable();

  return (
    <main id="main" className={styles.page}>
      <JsonLd page="international"
        data={webPage({ path: PAGES.international.path, name: "International and Outstation Patients", description: metadata.description as string })}
      />
      <svg className={styles.shapeDefinitions} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="international-hero-shape" clipPathUnits="objectBoundingBox">
            <path d="M.24,.005 C.46,-.025 .82,-.015 1,.12 L1,.85 C1,.93 .97,.97 .93,.965 C.83,.95 .81,.78 .67,.73 C.53,.68 .43,.78 .29,.89 C.15,1 .025,.87 0,.63 C-.03,.37 .065,.085 .24,.005 Z" />
          </clipPath>
          <clipPath id="international-reception-shape" clipPathUnits="objectBoundingBox">
            <path d="M.37,.015 C.56,0 .79,0 .93,.015 C.98,.03 1,.12 1,.28 C1,.48 .99,.72 .95,.88 C.91,.98 .80,1 .60,1 L.23,1 C.08,.98 0,.81 0,.57 C0,.26 .14,.04 .37,.015 Z" />
          </clipPath>
          <clipPath id="international-entrance-shape" clipPathUnits="objectBoundingBox">
            <path d="M.18,.04 C.38,-.01 .72,.01 .88,.04 C.96,.06 1,.15 1,.30 C1,.52 .99,.75 .94,.88 C.88,.98 .72,1 .50,.98 C.30,.97 .16,.93 .08,.80 C-.01,.66 -.01,.34 .08,.20 C.12,.10 .15,.05 .18,.04 Z" />
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
              <h1 id="international-h">Visiting from outside Delhi or abroad.</h1>
              <p className={styles.heroLead}>How to get in touch, what to bring and what to ask before you travel to the centre in Ashok Vihar.</p>
              <BookButton online={online} className={`btn btn--primary ${styles.heroButton}`} />
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
                <p><strong>Comprehensive Eye Care</strong><span>Specialist Oculoplasty Care</span></p>
              </div>
            </div>
          </div>
          <aside className={styles.contactStrip} aria-label="Contact the centre">
            <strong>Contact the centre</strong>
            <p><PinIcon /><span>{SITE.name}, {SITE.address.street}, New Delhi.</span></p>
            <a href={TEL_HREF}><PhoneIcon />{SITE.phone.display}</a>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"><PinIcon />Get directions<span className="sr-only"> (opens in a new tab)</span></a>
          </aside>
        </div>
      </section>

      <div className={styles.postHero}>
        <section id="plan" className={`${styles.section} ${styles.waveSection}`} aria-labelledby="plan-h">
        <div className="container">
          <div className={styles.centerHeading}>
            <p className={styles.eyebrow}>Planning your visit</p>
            <h2 id="plan-h">From first call to follow-up</h2>
            <p>A general outline of how a visit from further away usually works.</p>
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
        </div>
      </section>

      <section id="arrive" className={`${styles.section} ${styles.arrive} ${styles.waveSection}`} aria-labelledby="arrive-h">
        <div className={`container ${styles.arriveGrid}`}>
          <div className={styles.arriveHeading}>
            <p className={styles.eyebrow}>When you arrive</p>
            <h2 id="arrive-h">What you will see</h2>
            <p>The centre is on the street front in Ashok Vihar, with a reception at the entrance.</p>
            <ul className={styles.arrivalDetails}>
              <li id="arrival-reception-caption"><span><InfoIcon /></span>The reception desk at the centre entrance.</li>
              <li id="arrival-entrance-caption"><span><PinIcon /></span>The centre entrance from the street.</li>
            </ul>
          </div>
          <div className={styles.gallery}>
            <figure className={styles.galleryPrimary} aria-labelledby="arrival-reception-caption">
              <div className={styles.galleryImage}><Image src="/images/Modern Reception Desk with Attentive Professional.png" alt="The reception desk at Namokar Eye & Oculoplasty Centre" fill sizes="(min-width: 960px) 43vw, 74vw" /></div>
            </figure>
            <figure className={styles.gallerySecondary} aria-labelledby="arrival-entrance-caption">
              <div className={styles.galleryImage}><Image src="/images/Namokar Eye Centre Courtyard Entrance.png" alt="The courtyard entrance to Namokar Eye & Oculoplasty Centre" fill sizes="(min-width: 960px) 26vw, 45vw" /></div>
            </figure>
          </div>
        </div>
      </section>

      <section id="careful" className={`${styles.section} ${styles.waveSection}`} aria-labelledby="careful-h">
        <div className="container">
          <div className={styles.noteCard}>
            <div>
              <p className={styles.eyebrow}>Please note</p>
              <h2 id="careful-h">What this page does not promise</h2>
            </div>
            <div className={styles.noteCopy}>
              <p>This page does not list help with visas, travel, accommodation, airport transfers, translation or insurance. If you need any of these, please ask the centre what is possible before you plan a trip.</p>
              <p>The centre cannot give a diagnosis or treatment advice without examining you. Please do not send medical records or personal health details through this website. If you would like the doctor to see your reports, ask the centre how to share them.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="care" className={`${styles.section} ${styles.careSection}`} aria-labelledby="care-h">
        <div className="container">
          <div className={styles.centerHeading}>
            <p className={styles.eyebrow}>Areas of care</p>
            <h2 id="care-h">What the centre looks after</h2>
            <p>Which treatments are offered is confirmed at the consultation.</p>
          </div>
          <ul className={styles.serviceGrid}>
            {SERVICES.map((service, index) => (
              <li key={service.key}>
                <Link href={service.href} className={styles.serviceCard}>
                  <span className={styles.serviceNumber} aria-hidden="true">0{index + 1}</span>
                  <span>{service.title}</span>
                  <ArrowRightIcon width={20} height={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
              <p className={styles.eyebrow}>Finding the centre</p>
              <h2 id="find-h">Where we are</h2>
            </div>
            <div className={styles.locationDetails}>
              <address>
                <PinIcon />
                <span>{SITE.address.lines.map((line) => <span key={line}>{line}<br /></span>)}{SITE.address.landmark && <span>{SITE.address.landmark}</span>}</span>
              </address>
              <a href={TEL_HREF}><PhoneIcon />{SITE.phone.display}</a>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"><PinIcon />Get directions<span className="sr-only"> (opens in a new tab)</span></a>
            </div>
            <p className={styles.locationNote}>The <Link href={LINKS.contact}>Contact page</Link> has a map.</p>
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
                <h2 id="intl-cta-h" className="cta-title">Planning to visit?</h2>
                <p className="cta-desc">Contact the centre to plan your visit or arrange an eye consultation.</p>
                <div className={styles.ctaContact}>
                  <p><PinIcon /><span>{SITE.address.lines.join(", ")}</span></p>
                  <p><PhoneIcon /><a href={TEL_HREF}>{SITE.phone.display}</a></p>
                </div>
                <div className="cta-panel-actions">
                  <BookButton online={online} />
                  <SecondaryContact online={online} className="btn cta-call-button" />
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
