import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { treatmentItems } from "@/lib/treatments";
import HomeCta from "@/components/HomeCta";
import ServicesFaqSection from "@/components/ServicesFaqSection";
import { ArrowRightIcon, CalendarIcon } from "@/components/Icons";
import ServicesUnifiedList, { type ServiceCardItem } from "@/components/ServicesUnifiedList";
import styles from "./services.module.css";
import { PAGES } from "@/config/routes";
import { LINKS, serviceByKey, SITE, TEL_HREF } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import JsonLd from "@/components/JsonLd";
import { faqPage, itemList, webPage } from "@/lib/schema";

export const metadata: Metadata = pageMeta("services", {
  title: "Eye Care & Oculoplasty Services in Delhi | Namokar",
  description:
    "Explore cataract, retina, LASIK, glaucoma, squint and specialised oculoplasty services at Namokar Eye & Oculoplasty Centre in Ashok Vihar, Delhi.",
});

const FAQS = [
  {
    q: "Which eye care service do I need?",
    a: "If you are unsure which service is appropriate, begin with a comprehensive eye examination. Your ophthalmologist will assess your symptoms, medical history and eye health before recommending suitable investigations or treatment.",
  },
  {
    q: "What eye care services are available at Namokar?",
    a: "Namokar offers comprehensive eye examinations, cataract surgery, glaucoma management, retina care, LASIK and refractive surgery, squint care, eyelid surgery, and functional, reconstructive and aesthetic oculoplasty. Specific treatment recommendations and surgical arrangements are discussed during consultation.",
  },
  {
    q: "What is the difference between eyelid surgery, aesthetic oculoplasty and reconstructive oculoplasty?",
    a: "Blepharoplasty addresses excess eyelid skin or fat for functional or aesthetic reasons. Aesthetic oculoplasty focuses on the appearance of the eyelids and surrounding eye area. Reconstructive oculoplasty addresses structural and functional concerns such as ptosis, eyelid abnormalities and tear-drainage disorders. These areas may overlap.",
  },
  {
    q: "Will I need surgery for my eye condition?",
    a: "Not necessarily. Depending on the condition, treatment may involve spectacles, medication, monitoring, non-surgical procedures or surgery. Your doctor will discuss the appropriate options after examination.",
  },
  {
    q: "Is LASIK suitable for everyone?",
    a: "No. LASIK suitability depends on factors such as age, prescription stability, corneal health and overall eye health. A detailed preoperative assessment is necessary before recommending refractive surgery.",
  },
  {
    q: "Can squint be treated in children and adults?",
    a: "Yes. Squint can occur in children and adults. Treatment depends on the cause, age, eye alignment and visual function, and may involve spectacles, prisms, selected non-surgical treatments or eye muscle surgery.",
  },
  {
    q: "Do all retinal conditions require surgery?",
    a: "No. Depending on the retinal condition and its severity, treatment may involve monitoring, medication, injections, laser treatment or surgery. An appropriate treatment plan is determined after retinal assessment.",
  },
  {
    q: "When should I seek urgent eye care?",
    a: "Sudden vision loss, new flashes, a sudden increase in floaters, a curtain-like shadow across your vision, severe eye pain, sudden double vision or an eye injury require urgent medical assessment. Do not wait for a routine appointment.",
  },
  {
    q: "What should I bring to my first consultation?",
    a: "Please bring your current spectacles, previous eye reports, prescriptions and a list of medications. If you have diabetes or other medical conditions, bring relevant recent medical reports.",
  },
  {
    q: "How do I arrange an appointment?",
    a: `Call Namokar Eye & Oculoplasty Centre on ${SITE.phone.display}. Our team will assist you in arranging a suitable consultation time.`,
  },
  {
    q: "Where is Namokar Eye & Oculoplasty Centre located?",
    a: `${SITE.address.lines.join(", ")}. Visit our Contact Us page for directions and contact details.`,
  },
];

const CARD_ORDER = ["cataract", "glaucoma", "retina", "lasik", "squint", "exams", "eyelid", "aesthetic", "reconstructive"] as const;

const CARD_COPY: Record<(typeof CARD_ORDER)[number], string> = {
  cataract: "Assessment and surgical treatment of cataracts, with intraocular lens options selected according to your eye health, visual needs and lifestyle.",
  glaucoma: "Early detection, diagnostic assessment, personalised treatment and long-term monitoring to help protect vision and reduce the risk of further optic nerve damage.",
  retina: "Specialised assessment and management of retinal conditions, with medical and surgical treatment options based on individual clinical findings.",
  lasik: "Detailed assessment and suitable vision correction procedures designed to reduce dependence on spectacles or contact lenses.",
  squint: "Assessment and management of eye misalignment in children and adults, with treatment focused on eye alignment, visual function and individual needs.",
  exams: "Detailed evaluation of vision and overall eye health, supporting early detection and appropriate management of routine and specific eye concerns.",
  eyelid: "Functional and aesthetic eyelid surgery addressing excess eyelid skin and under-eye bags, with careful consideration of eye health and individual suitability.",
  aesthetic: "Personalised surgical and non-surgical care for age-related changes and aesthetic concerns involving the eyelids and surrounding eye area.",
  reconstructive: "Specialised assessment and treatment of ptosis, eyelid-position abnormalities, tear-drainage disorders and orbital reconstructive concerns.",
};

const CARD_IMAGES: Partial<Record<(typeof CARD_ORDER)[number], { src: string; alt: string }>> = {
  cataract: { src: "/images/services/cataract-care.webp", alt: "Cataract surgery consultation and slit-lamp eye assessment" },
  glaucoma: { src: "/images/services/glaucoma-care.webp", alt: "Glaucoma diagnostic evaluation and eye pressure testing" },
  exams: { src: "/images/services/eye-examination-care.webp", alt: "Comprehensive eye examination with slit lamp technology" },
  eyelid: { src: "/images/services/eyelid-blepharoplasty-care.webp", alt: "Specialist blepharoplasty and eyelid evaluation" },
  aesthetic: { src: "/images/services/aesthetic-oculoplasty-care.webp", alt: "Aesthetic oculoplasty consultation for delicate eye areas" },
  reconstructive: { src: "/images/services/reconstructive-oculoplasty-care.webp", alt: "Reconstructive oculoplasty and tear drainage treatment" },
};

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Share Your Concerns",
    text: "Discuss your symptoms, medical history, vision needs and any functional or aesthetic concerns with your doctor.",
    image: "/images/journey/share-concern-v2.webp",
    alt: "Illustration of a patient sharing his concerns with an eye doctor",
  },
  {
    step: "02",
    title: "Comprehensive Assessment",
    text: "Undergo appropriate eye examinations and diagnostic tests to help identify the underlying condition.",
    image: "/images/journey/eye-examination-v2.webp",
    alt: "Illustration of an eye examination using a slit lamp",
  },
  {
    step: "03",
    title: "Discuss Your Treatment Options",
    text: "Understand the clinical findings, available treatments, expected benefits, potential risks and alternatives.",
    image: "/images/journey/discuss-options-v2.webp",
    alt: "Illustration of a doctor explaining eye care options to a patient",
  },
  {
    step: "04",
    title: "Personalised Care Plan",
    text: "Receive guidance on suitable treatment, surgical planning, ongoing monitoring or follow-up based on your individual needs.",
    image: "/images/journey/plan-care-v2.webp",
    alt: "Illustration of a doctor and patient reviewing a care plan",
  },
];

export default function ServicesPage() {
  const pics = new Map(treatmentItems().map((t) => [t.id, t]));
  const online = onlineBookingAvailable();
  const bookingHref = online ? `${LINKS.contact}#request` : TEL_HREF;
  const bookingLabel = online ? "Request a Consultation" : "Book a Consultation";
  const serviceCards: ServiceCardItem[] = CARD_ORDER.map((key) => {
    const service = key === "squint" ? { title: PAGES.squint.label, href: LINKS.squint, group: "vision" as const } : serviceByKey(key);
    const photo = CARD_IMAGES[key] ?? pics.get(key)?.image;
    return {
      key,
      title: service.title,
      category: service.group,
      blurb: CARD_COPY[key],
      href: service.href,
      image: photo?.src ?? "/images/services/eye-examination-care.webp",
      alt: photo?.alt ?? "",
    };
  });

  return (
    <main id="main" className={styles.page}>
      <JsonLd page="services"
        data={[
          webPage({ type: "CollectionPage", path: PAGES.services.path, name: "Our Services", description: metadata.description as string }),
          itemList("Services at Namokar Eye & Oculoplasty Centre", serviceCards.map(({ title, href }) => ({ name: title, path: href }))),
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

        <div className={`container ${styles.heroContent}`}>
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
                Complete Eye Care &amp; <span className={`${styles.headingOrange} title-secondary`}>Advanced Oculoplasty</span>
              </h1>

              <p className={styles.lead}>
                From routine eye examinations, cataract surgery and retina care to LASIK, squint treatment and specialised aesthetic eyelid surgery, Namokar offers personalised ophthalmic care tailored to your individual needs.
              </p>

              <div className={styles.actions}>
                <a href="#services-list" className={styles.btnPrimary}>
                  <span>Explore Our Services</span>
                  <ArrowRightIcon className={styles.btnArrow} width={20} height={20} />
                </a>

                <Link href={bookingHref} className={styles.btnSecondary}>
                  <CalendarIcon width={18} height={18} />
                  <span>{bookingLabel}</span>
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
                  <span>Comprehensive<br />Eye Care</span>
                </div>

                <div className={styles.highlightSep} aria-hidden="true" />

                <div className={styles.highlightItem} role="listitem">
                  <div className={styles.highlightIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#B85D19" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <span>Specialised<br />Oculoplasty</span>
                </div>

                <div className={styles.highlightSep} aria-hidden="true" />

                <div className={styles.highlightItem} role="listitem">
                  <div className={styles.highlightIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#B85D19" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7Z" />
                    </svg>
                  </div>
                  <span>Personalised<br />Treatment</span>
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
                      <strong>Your Care Starts with Understanding</strong>
                      <span>Comprehensive eye consultations in Ashok Vihar, New Delhi.</span>
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
              <span className={styles.kickerText}>OUR SPECIALITIES</span>
            </div>
            <h2 id="services-list-h" className={styles.sectionTitle}>
              Comprehensive Eye Care &amp; <span className={`${styles.headingOrange} title-secondary`}>Specialised Treatments</span>
            </h2>
            <p className={styles.sectionLead}>
              Explore a comprehensive range of ophthalmic services, from routine eye examinations, cataract surgery, retina care, glaucoma management, LASIK and squint treatment to functional, reconstructive and aesthetic oculoplasty.
            </p>
            <p className={styles.sectionLead}>
              At Namokar, treatment recommendations are based on individual eye health, clinical findings and patient needs.
            </p>
          </div>

          <ServicesUnifiedList items={serviceCards} />
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
              A Clear Path from Concern to <span className={`${styles.headingOrange} title-secondary`}>Care</span>
            </h2>

            <p className={styles.journeySubtitle}>
              Understand your eye health, explore suitable treatment options and make informed decisions about your care.
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
            <Link href={bookingHref} className={styles.journeyBtn}>
              <span>{bookingLabel}</span>
              <ArrowRightIcon width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>

      <ServicesFaqSection
        items={FAQS}
        online={online}
        lead="Find answers to common questions about our ophthalmic services, specialised oculoplasty and treatment options."
      />

      <HomeCta
        online={online}
        id="services-cta"
        heading="See Better. Look Better."
        subheading="Book Your Consultation Today"
        desc="From routine eye examinations and specialised ophthalmic treatments to functional and aesthetic eyelid surgery, begin your personalised care journey at Namokar Eye & Oculoplasty Centre."
        onlineBookingLabel="Request a Consultation"
      />
    </main>
  );
}
