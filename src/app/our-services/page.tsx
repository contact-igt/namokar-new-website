import type { Metadata } from "next";
import { pageMeta, withBrand } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { treatmentItems } from "@/lib/treatments";
import HomeCta from "@/components/HomeCta";
import ServicesFaqSection from "@/components/ServicesFaqSection";
import { ArrowRightIcon, CalendarIcon } from "@/components/Icons";
import ServicesUnifiedList, { type ServiceCardItem } from "@/components/ServicesUnifiedList";
import styles from "./services.module.css";
import { PAGES } from "@/config/routes";
import { LINKS, SERVICES, SITE } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import JsonLd from "@/components/JsonLd";
import { faqPage, itemList, webPage } from "@/lib/schema";

export const metadata: Metadata = pageMeta("services", {
  title: withBrand("Our Services"),
  description:
    "Cataract, glaucoma, eye examinations, eyelid surgery, aesthetic and reconstructive oculoplasty at Namokar Eye & Oculoplasty Centre, Ashok Vihar, New Delhi.",
});

const FAQS = [
  {
    q: "Which service do I need?",
    a: "If you are not sure, a comprehensive eye examination is a sensible place to start. Tell the doctor what you have noticed, such as blurred vision, a family history of eye disease, heavy eyelids or watering eyes, and the doctor can explain what is found and whether any other care would help.",
  },
  {
    q: "Is every treatment available at the centre?",
    a: "The centre confirms at the consultation which treatments it offers. This website describes general areas of care and does not promise any particular treatment.",
  },
  {
    q: "What is the difference between eyelid surgery, aesthetic and reconstructive oculoplasty?",
    a: "Eyelid surgery (blepharoplasty) deals with excess skin or fat on the eyelids. Aesthetic oculoplasty is care for the appearance of the eyelids and eye area, with eye health kept in view. Reconstructive oculoplasty is care for problems that affect how the eyelids or tear passages work, such as a drooping eyelid or a blocked tear duct. They can overlap, and the examination shows which applies to you.",
  },
  {
    q: "Will I need surgery?",
    a: "Not necessarily. Many visits end with an explanation, glasses, medicine or monitoring. If surgery or another treatment is advised, the doctor explains why, what the options and risks are, and you decide at your own pace.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Bring your current glasses, earlier prescriptions and eye reports, and a list of your medicines. If you have diabetes or other health conditions, bring any recent reports too.",
  },
  {
    q: "How do I arrange an appointment?",
    a: `Please call the centre on ${SITE.phone.display}, or see the Contact page for directions and other ways to reach us.`,
  },
  {
    q: "Where is the centre?",
    a: `${SITE.address.lines.join(", ")}, in ${SITE.area}.`,
  },
];

const SERVICE_CARD_ITEMS: ServiceCardItem[] = [
  { key: "squint", title: "Squint Correction", category: "vision", categoryLabel: "Comprehensive Vision Care", blurb: "Understand eye alignment, squint and lazy eye, and discuss the assessment and treatment appropriate to you.", href: LINKS.squint, image: "/images/squint/squint-hero.webp", alt: "Illustrative child eye-alignment consultation" },
  {
    key: "cataract",
    title: "Cataract Surgery",
    category: "vision",
    categoryLabel: "Comprehensive Vision Care",
    blurb:
      "For a clouded lens: careful assessment of your vision, and a clear discussion of when surgery is considered and what your options are.",
    href: LINKS.cataract,
    image: "/images/services/cataract-care.webp",
    alt: "Cataract surgery consultation and slit-lamp eye assessment",
  },
  {
    key: "glaucoma",
    title: "Glaucoma Management",
    category: "vision",
    categoryLabel: "Comprehensive Vision Care",
    blurb:
      "Glaucoma often has no early symptoms. Assessment, tests chosen by the doctor and regular follow-up, because it needs long-term monitoring.",
    href: LINKS.glaucoma,
    image: "/images/services/glaucoma-care.webp",
    alt: "Glaucoma diagnostic evaluation and eye pressure testing",
  },
  {
    key: "exams",
    title: "Comprehensive Eye Examinations",
    category: "vision",
    categoryLabel: "Comprehensive Vision Care",
    blurb:
      "A thorough check of how well you see and how healthy your eyes are, from routine check-ups to examinations for specific concerns, explained in plain language.",
    href: LINKS.exams,
    image: "/images/services/eye-examination-care.webp",
    alt: "Comprehensive eye examination with slit lamp technology",
  },
  {
    key: "eyelid",
    title: "Eyelid Surgery (Blepharoplasty)",
    category: "oculoplasty",
    categoryLabel: "Oculoplasty & Eye-Area Care",
    blurb:
      "Assessment of heavy or drooping eyelids and under-eye bags, for functional and cosmetic reasons, including whether surgery would help.",
    href: LINKS.eyelid,
    image: "/images/services/eyelid-blepharoplasty-care.webp",
    alt: "Specialist blepharoplasty and eyelid evaluation",
  },
  {
    key: "aesthetic",
    title: "Aesthetic Oculoplasty",
    category: "oculoplasty",
    categoryLabel: "Oculoplasty & Eye-Area Care",
    blurb:
      "Considered care for heavy eyelids, under-eye bags and age-related changes around the eyes, planned with eye health in mind.",
    href: LINKS.aesthetic,
    image: "/images/services/aesthetic-oculoplasty-care.webp",
    alt: "Aesthetic oculoplasty consultation for delicate eye areas",
  },
  {
    key: "reconstructive",
    title: "Reconstructive Oculoplasty",
    category: "oculoplasty",
    categoryLabel: "Oculoplasty & Eye-Area Care",
    blurb:
      "Assessment and treatment for drooping eyelids (ptosis), eyelid malposition and tear-drainage problems that affect comfort or function.",
    href: LINKS.reconstructive,
    image: "/images/services/reconstructive-oculoplasty-care.webp",
    alt: "Reconstructive oculoplasty and tear drainage treatment",
  },
  {
    key: "eyelid-surgery",
    title: "Eyelid Surgery",
    category: "oculoplasty",
    categoryLabel: "Oculoplasty & Eye-Area Care",
    blurb: "Explore assessment and care for eyelid concerns.",
    topics: [
      "Baggy Eyelids",
      "Droopy Eyelids (Ptosis)",
      "Hooded Eyelids",
      "Eyelid Lumps and Bumps",
      "Blepharoplasty",
      "Entropion / Ectropion Correction",
    ],
    href: LINKS.eyelid,
    image: "/images/blepharoplasty/blepharoplasty-indian-patient-close.webp",
    alt: "Clinician assessing a patient's eyelid position",
  },
  {
    key: "cosmetic-procedures",
    title: "Cosmetic Procedures",
    category: "oculoplasty",
    categoryLabel: "Oculoplasty & Eye-Area Care",
    blurb: "Discuss options for the appearance of the eye area.",
    topics: [
      "Anti-wrinkle Injections (Botox)",
      "Filler Injections",
      "Tear Trough Injections",
      "Laser Resurfacing",
      "Thread Lift",
    ],
    href: LINKS.aesthetic,
    image: "/images/aesthetic/conditions-eye-portrait.webp",
    alt: "Natural portrait showing the eye area and surrounding skin",
  },
  {
    key: "orbit-lacrimal",
    title: "Orbit & Lacrimal Surgery",
    category: "oculoplasty",
    categoryLabel: "Oculoplasty & Eye-Area Care",
    blurb: "Explore eye-socket and tear-drainage concerns.",
    topics: [
      "Thyroid Eye Disease",
      "Tumours of Orbit",
      "Artificial Eye",
      "Excessive Watering & Discharge",
      "Orbital Disease",
      "Eyelid and Orbit Cancers",
      "Bell's Palsy",
    ],
    href: LINKS.reconstructive,
    image: "/images/reconstructive/doctor-eyelid-examination.webp",
    alt: "Clinician examining a patient's eye in a consultation room",
  },
];

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Share your concern",
    text: "Tell us what has changed, what is troubling you and what you hope to understand.",
    image: "/images/journey/share-concern-v2.webp",
    alt: "Illustration of a patient sharing his concerns with an eye doctor",
  },
  {
    step: "02",
    title: "Understand your eyes",
    text: "An examination helps the doctor assess your eye health and discuss any tests you may need.",
    image: "/images/journey/eye-examination-v2.webp",
    alt: "Illustration of an eye examination using a slit lamp",
  },
  {
    step: "03",
    title: "Discuss your options",
    text: "Understand the findings, possible treatments and the benefits and risks relevant to you.",
    image: "/images/journey/discuss-options-v2.webp",
    alt: "Illustration of a doctor explaining eye care options to a patient",
  },
  {
    step: "04",
    title: "Plan your next step",
    text: "Agree on a care plan and receive guidance about treatment, monitoring or follow-up.",
    image: "/images/journey/plan-care-v2.webp",
    alt: "Illustration of a doctor and patient reviewing a care plan",
  },
];

export default function ServicesPage() {
  const pics = new Map(treatmentItems().map((t) => [t.id, t]));
  const online = onlineBookingAvailable();

  return (
    <main id="main" className={styles.page}>
      <JsonLd page="services"
        data={[
          webPage({ type: "CollectionPage", path: PAGES.services.path, name: "Our Services", description: metadata.description as string }),
          itemList("Services at Namokar Eye & Oculoplasty Centre", SERVICES.map((s) => ({ name: s.title, path: s.href }))),
          faqPage(PAGES.services.path, FAQS),
        ]}
      />

      {/* Hero Banner Section */}
      <section className={styles.hero} aria-labelledby="services-hero-h">
        {/* Soft Organic Decorative Background Wave */}
        <div className={styles.heroBgDecor} aria-hidden="true">
          <svg viewBox="0 0 1440 680" preserveAspectRatio="none" className={styles.heroBgSvg}>
            <defs>
              <linearGradient id="servicesPeachWave" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F8DFCB" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#FBE9DB" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFFBF7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 640 680 C 760 580, 940 500, 1140 480 C 1280 460, 1380 470, 1440 490 L 1440 680 Z"
              fill="url(#servicesPeachWave)"
            />
          </svg>
        </div>

        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href={LINKS.home}>Home</Link>
              </li>
              <li className={styles.crumbSep} aria-hidden="true">&gt;</li>
              <li aria-current="page">Our Services</li>
            </ol>
          </nav>

          <div className={styles.heroGrid}>
            {/* Left Column Copy & CTAs */}
            <div className={styles.heroCopy}>
              <div className={styles.kickerWrap}>
                <span className={styles.kickerBar} aria-hidden="true" />
                <span className={styles.kickerText}>OUR SERVICES</span>
              </div>

              <h1 id="services-hero-h" className={styles.heading}>
                Thoughtful care for every part of <span className={`${styles.headingOrange} title-secondary`}>your eyes.</span>
              </h1>

              <p className={styles.lead}>
                From routine eye examinations to specialist eyelid and oculoplasty care, explore our services at Namokar Eye &amp; Oculoplasty Centre. Find the care you need, with clear guidance at every step.
              </p>

              <div className={styles.actions}>
                <a href="#services-list" className={styles.btnPrimary}>
                  <span>Explore Our Services</span>
                  <ArrowRightIcon className={styles.btnArrow} width={20} height={20} />
                </a>

                <Link href={`${LINKS.contact}#request`} className={styles.btnSecondary}>
                  <CalendarIcon width={18} height={18} />
                  <span>Book a Consultation</span>
                </Link>
              </div>

              {/* 3 Feature Highlights with Icons & Dividers */}
              <div className={styles.highlights} role="list">
                <div className={styles.highlightItem} role="listitem">
                  <div className={styles.highlightIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#B85D19" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <span>Comprehensive<br />eye care</span>
                </div>

                <div className={styles.highlightSep} aria-hidden="true" />

                <div className={styles.highlightItem} role="listitem">
                  <div className={styles.highlightIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#B85D19" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <span>Specialist<br />oculoplasty</span>
                </div>

                <div className={styles.highlightSep} aria-hidden="true" />

                <div className={styles.highlightItem} role="listitem">
                  <div className={styles.highlightIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#B85D19" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7Z" />
                    </svg>
                  </div>
                  <span>Individual<br />attention</span>
                </div>
              </div>
            </div>

            {/* Right Column Visual Card */}
            <div className={styles.heroVisualCol}>
              <div className={styles.cardFrame}>
                <div className={styles.cardInner}>
                  {pics.get("exams")?.image && (
                    <Image
                      src={pics.get("exams")!.image!.src}
                      alt={pics.get("exams")!.image!.alt}
                      fill
                      priority
                      sizes="(min-width: 960px) 46vw, 100vw"
                      style={{ objectFit: "cover" }}
                    />
                  )}

                  {/* Floating Badge on Card */}
                  <div className={styles.floatingBadge}>
                    <div className={styles.badgeIcon} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#B85D19" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <div className={styles.badgeDivider} aria-hidden="true" />
                    <div className={styles.badgeText}>
                      <strong>Your care starts with understanding.</strong>
                      <span>Eye consultations in Ashok Vihar, New Delhi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Clinical Services Section */}
      <section id="services-list" className={styles.servicesSection} aria-labelledby="services-list-h">
        <div id="vision" className={styles.anchorOffset} aria-hidden="true" />
        <div id="oculoplasty" className={styles.anchorOffset} aria-hidden="true" />
        <div className="container">
          <div className={styles.servicesHeader}>
            <div className={styles.kickerWrap}>
              <span className={styles.kickerBar} aria-hidden="true" />
              <span className={styles.kickerText}>OUR SERVICES</span>
            </div>
            <h2 id="services-list-h" className={styles.sectionTitle}>
              Comprehensive Vision &amp; <span className={`${styles.headingOrange} title-secondary`}>Oculoplasty Care</span>
            </h2>
            <p className={styles.sectionLead}>
              Thoughtful, specialist eye care for all stages of life. Explore our core clinical services from cataract surgery and glaucoma management to delicate eyelid and reconstructive oculoplasty.
            </p>
          </div>

          <ServicesUnifiedList items={SERVICE_CARD_ITEMS} />
        </div>
      </section>

      {/* Your Care Journey Section */}
      <section className={styles.journey} aria-labelledby="journey-h">
        {/* Background decorative waves, dot grids, and eye illustration */}
        <div className={styles.journeyBgDecor} aria-hidden="true">
          {/* Top-right eye with HUD scanning graphic */}
          <div className={styles.journeyEyeDecor}>
            <Image
              src="/images/journey/eye-hud-faded-2x.webp"
              alt=""
              width={720}
              height={330}
              className={styles.journeyEyeImg}
              priority={false}
            />
          </div>

          {/* Left subtle dot grid */}
          <div className={styles.dotGridLeft} />

          {/* Right subtle dot grid */}
          <div className={styles.dotGridRight} />

          {/* Bottom decorative organic curves SVG */}
          <svg className={styles.bottomWaveSvg} viewBox="0 0 1440 160" fill="none" preserveAspectRatio="none">
            <path
              d="M0,90 C320,140 540,60 840,110 C1140,150 1320,80 1440,100 L1440,160 L0,160 Z"
              fill="#F4EAE2"
              fillOpacity="0.65"
            />
            <path
              d="M0,120 C240,85 480,135 720,115 C960,95 1200,145 1440,120 L1440,160 L0,160 Z"
              fill="#DCE9E5"
              fillOpacity="0.5"
            />
          </svg>
        </div>

        <div className="container">
          {/* Header area */}
          <div className={styles.journeyHeader}>
            <div className={styles.kickerWrap}>
              <span className={styles.kickerBar} aria-hidden="true" />
              <span className={styles.kickerText}>YOUR CARE JOURNEY</span>
            </div>

            <h2 id="journey-h" className={styles.journeyTitle}>
              A clear path from concern to <span className={`${styles.headingOrange} title-secondary`}>care.</span>
            </h2>

            <p className={styles.journeySubtitle}>
              Understand your eye health and feel informed about the next step.
            </p>
          </div>

          {/* Steps Process Grid */}
          <div className={styles.stepsWrap}>
            {/* Connecting subtle curved path behind circles on desktop */}
            <svg className={styles.connectingLine} viewBox="0 0 1140 60" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M 142 30 Q 285 12, 427 30 T 712 30 T 997 30"
                stroke="#E8C5B0"
                strokeWidth="1.5"
              />
            </svg>

            <ol className={styles.journeyStepsList}>
              {JOURNEY_STEPS.map((step) => (
                <li key={step.step} className={styles.journeyStepCard}>
                  {/* Circular Photo with white ring, orange outer ring and number badge */}
                  <div className={styles.stepCircleUnit}>
                    <div className={styles.stepCircleFrame}>
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        sizes="148px"
                        className={styles.stepUnitImg}
                      />
                    </div>
                    <span className={styles.stepNumBadge} aria-hidden="true">
                      {step.step}
                    </span>
                  </div>

                  {/* Content inside card */}
                  <h3 className={styles.stepCardTitle}>{step.title}</h3>
                  <p className={styles.stepCardText}>{step.text}</p>

                  {/* Subtle bottom indicator */}
                  <span className={styles.stepBottomAccent} aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>

          {/* CTA Button bottom left aligned */}
          <div className={styles.journeyCtaWrap}>
            <Link href={`${LINKS.contact}#request`} className={styles.journeyBtn}>
              <span>Book a Consultation</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <ServicesFaqSection items={FAQS} />

      <HomeCta online={online} id="services-cta" />
    </main>
  );
}
