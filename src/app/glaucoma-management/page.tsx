import ServiceVideoCarousel from "@/components/ServiceVideoCarousel";
import HeadingText from "@/components/HeadingText";
import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceLayout from "@/components/ServiceLayout";
import { pageMeta } from "@/lib/seo";
import { LINKS, TEL_HREF } from "@/config/site";
import { SERVICE_CONTENT } from "@/content/services";
import { videosFor } from "@/content/videos";
import { onlineBookingAvailable } from "@/lib/booking";
import { playerProps } from "@/lib/videoProps";
import HomeCta from "@/components/HomeCta";
import GlaucomaVideoCard from "./GlaucomaVideoCard";
import ServicesFaqSection from "@/components/ServicesFaqSection";
import { ArrowDownIcon, CalendarIcon, InfoIcon, PhoneIcon } from "@/components/Icons";
import styles from "./glaucoma.module.css";

const c = SERVICE_CONTENT.glaucoma;

export const metadata = pageMeta("glaucoma", {
  title: `${c.metaTitle} | Namokar`,
  description: c.metaDescription,
});

const JOURNEY_IMAGES = [
  "/images/glaucoma-journey-1.jpg",
  "/images/glaucoma-journey-2.jpg",
  "/images/glaucoma-journey-3.jpg",
  "/images/ChatGPT Image Nov 14, 2026, 03_48_23 PM.png",
  "/images/glaucoma-journey-5.jpg",
];

const SIGNS = [
  { title: "Gradual Loss of Side Vision", text: "Peripheral vision may become affected as glaucoma progresses." },
  { title: "Blind Spots in Your Vision", text: "Areas of reduced visual sensitivity may develop without being immediately noticeable." },
  { title: "Difficulty Noticing Surrounding Objects", text: "Visual field changes can make it harder to notice objects or people in parts of your surroundings." },
  { title: "Difficulty Finding Your Way Around", text: "More advanced visual field loss may make it harder to move through familiar, crowded or unfamiliar places." },
  { title: "Tunnel Vision in Advanced Glaucoma", text: "Extensive peripheral vision loss may leave a narrower area of useful vision." },
  { title: "Central Vision Difficulties", text: "Some forms of glaucoma can affect areas near central vision, potentially interfering with reading and other daily activities." },
];

const TYPES = [
  { title: "Open-Angle Glaucoma", text: "The drainage angle remains open, but resistance to fluid outflow can raise eye pressure. Higher pressure increases the risk of optic nerve damage, though damage can also occur at normal measured pressure. Early stages usually have no noticeable symptoms." },
  { title: "Normal-Tension Glaucoma", text: "A form of open-angle glaucoma in which characteristic optic nerve damage occurs despite eye pressure measurements being within the normal range." },
  { title: "Angle-Closure Glaucoma", text: "The drainage angle becomes obstructed, affecting the outflow of fluid. Angle closure can develop gradually or occur suddenly as an acute medical emergency." },
];

const TESTS = [
  { title: "Eye Pressure Measurement (Tonometry)", text: "Measures intraocular pressure, an important modifiable risk factor in glaucoma." },
  { title: "Optic Nerve Examination", text: "Assesses the appearance of the optic nerve for changes associated with glaucoma." },
  { title: "Visual Field Testing (Perimetry)", text: "Measures visual sensitivity at different points in central and peripheral vision to detect and monitor functional changes." },
  { title: "OCT Scan", text: "Optical coherence tomography evaluates retinal nerve fibre and ganglion cell structures that may be affected by glaucoma." },
  { title: "Drainage Angle Examination (Gonioscopy)", text: "Shows whether the drainage angle is open, narrow or closed and helps guide classification and treatment." },
  { title: "Corneal Thickness Measurement (Pachymetry)", text: "Measures central corneal thickness to help interpret eye pressure readings and assess glaucoma risk." },
];

const TREATMENTS = [
  {
    title: "Glaucoma Eye Drops",
    text: "Prescription drops lower eye pressure by reducing fluid production or improving drainage. Use them as directed and attend regular monitoring.",
    img: "/images/glaucoma-treat-drops.jpg",
    kind: "drop",
  },
  {
    title: "Laser Treatment",
    text: "Different lasers can improve fluid outflow or address certain mechanisms of angle closure. Laser may be an initial or additional treatment for suitable patients.",
    img: "/images/glaucoma-laser-treatment.webp",
    kind: "scan",
  },
  {
    title: "Glaucoma Surgery",
    text: "Procedures lower pressure in different ways. Surgery may be considered earlier in selected cases, including some patients with advanced disease, or when other options are unsuitable or insufficient.",
    img: "/images/glaucoma-treat-surgery.jpg",
    kind: "check",
  },
] as const;

const VIDEO_COPY: Record<string, { title: string; description: string }> = {
  SqmpI_G8o5I: {
    title: "Four Common Misconceptions About Glaucoma",
    description: "Dr. Poonam Jain discusses common misunderstandings about glaucoma and its management.",
  },
  "0YHUAEUcM2g": {
    title: "What Is Glaucoma?",
    description: "Understand glaucoma, its effect on the optic nerve and the importance of timely diagnosis and ongoing care.",
  },
};

function Mark({ kind = "eye" }: { kind?: "eye" | "drop" | "scan" | "check" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "eye" && (
        <>
          <path d="M2 12s3.5-5.5 10-5.5S22 12 22 12s-3.5 5.5-10 5.5S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.8" />
        </>
      )}
      {kind === "drop" && (
        <path d="M12 2.5S6 9.4 6 14a6 6 0 0 0 12 0c0-4.6-6-11.5-6-11.5Z" />
      )}
      {kind === "scan" && (
        <>
          <path d="M8 3H4v4m12-4h4v4M4 17v4h4m12-4v4h-4" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
      {kind === "check" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m7.5 12 3 3 6-6" />
        </>
      )}
    </svg>
  );
}

export default function Page() {
  const online = onlineBookingAvailable();
  const bookingHref = online ? `${LINKS.contact}#request` : TEL_HREF;

  // 1. HERO SECTION (Matches Cataract & Comprehensive Eye Exam UI)
  const hero = (
    <div className={styles.heroWrapper}>
      <section className={styles.heroSection} aria-labelledby="glaucoma-hero-h">
        {/* Right-side Consultation Artwork with Left-to-Right Opacity Gradient Fade */}
        <div className={styles.heroRightVisual} aria-hidden="true">
          <Image
            src="/images/Copy of DSC06796.JPG"
            alt="Eye examination at Namokar Eye & Oculoplasty Centre"
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 100vw"
            className={styles.heroRightImg}
            unoptimized
          />
        </div>

        <div className={`container ${styles.container}`}>
          {/* Main 2-column hero content */}
          <div className={styles.mainLayout}>
            {/* Left Column: Breadcrumb, Kicker, Heading, Description, CTA Actions */}
            <div className={styles.colText}>
              <div className={styles.breadcrumbWrap}>
                <Breadcrumb
                  current="Glaucoma Management"
                  trail={[{ label: "Services", href: LINKS.allServices }]}
                />
              </div>

              {/* Section Kicker with orange bar */}
              <div className={styles.kicker}>
                <span className={styles.kickerBar} aria-hidden="true" />
                <span>GLAUCOMA MANAGEMENT</span>
              </div>

              {/* Two-line heading */}
              <h1 id="glaucoma-hero-h" className={styles.heading}>
                <span>Glaucoma Detection,</span>{" "}
                <span className="title-secondary">Treatment &amp; Vision Protection</span>
              </h1>

              {/* Body lead description */}
              <p className={styles.lead}>{c.lead}</p>

              {/* CTA Action Buttons */}
              <div className={styles.actions}>
                <a href={bookingHref} className={styles.btnPrimary}>
                  {online ? <CalendarIcon width={18} height={18} /> : <PhoneIcon width={18} height={18} />}
                  <span>{online ? "Request a Glaucoma Consultation" : "Book a Glaucoma Consultation"}</span>
                </a>
                <a href="#overview" className={styles.btnSecondary}>
                  <span>Learn About Glaucoma</span>
                  <ArrowDownIcon className={styles.btnArrow} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right Column: Floating Informational Badge on visual */}
            <div className={styles.colVisual}>
              <div className={styles.badgeWrap}>
                <div className={styles.infoBadge}>
                  <span className={styles.badgeIcon} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="22"
                      height="22"
                    >
                      <path d="M2 12s3.8-6.5 10-6.5 10 6.5 10 6.5-3.8 6.5-10 6.5-10-6.5-10-6.5Z" />
                      <circle cx="12" cy="12" r="3.2" strokeWidth="2" />
                    </svg>
                  </span>
                  <span className={styles.badgeDivider} aria-hidden="true" />
                  <div className={styles.badgeText}>
                    <strong>Personalised Glaucoma Assessment</strong>
                    <span>&amp; Management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row of 4 trust cards above the full section background */}
          <ul className={styles.trustCards} aria-label="Key Glaucoma Care Highlights">
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3.8-6.5 10-6.5 10 6.5 10 6.5-3.8 6.5-10 6.5-10-6.5-10-6.5Z" />
                  <circle cx="12" cy="12" r="3.2" strokeWidth="2" />
                </svg>
              </span>
              <strong>Early Detection &amp; Eye Assessment</strong>
            </li>
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </span>
              <strong>Optic Nerve Evaluation</strong>
            </li>
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <strong>Personalised Glaucoma Management</strong>
            </li>
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </span>
              <strong>Long-Term Monitoring &amp; Care</strong>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );

  // 2. OVERVIEW SECTION (“WHAT IS GLAUCOMA?”)
  const overview = (
    <section
      id="overview"
      className={styles.overviewSection}
      aria-labelledby="overview-h"
    >
      {/* Full-width background image with eye illustration on left */}
      <div className={styles.overviewBg} aria-hidden="true">
        <Image
          src="/images/828d4946-fb2e-45f2-b03c-d4f46e7c10a9.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.overviewBgImg}
        />
        <div className={styles.mobileBgProtection} />
      </div>

      <div className={`container ${styles.overviewGrid}`}>
        <div className={styles.overviewSpacer} aria-hidden="true" />
        <div className={styles.overviewContent}>
          <div className={styles.kicker}>
            <span className={styles.kickerBar} aria-hidden="true" />
            <span>UNDERSTANDING GLAUCOMA</span>
          </div>
          <h2 id="overview-h" className={styles.overviewHeading}>
            <HeadingText>{c.introHeading}</HeadingText>
          </h2>
          <div className={styles.overviewText}>
            <p>{c.intro[0]}</p>
            <p>{c.intro[1]}</p>
            <div className={styles.overviewCallout}>
              <span className={styles.calloutIconWrap} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="22"
                  height="22"
                >
                  <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M7.5 18c1.3.8 2.8 1.2 4.5 1.2s3.2-.4 4.5-1.2" />
                </svg>
              </span>
              <p className={styles.calloutText}>{c.intro[2]}</p>
            </div>
            <p>{c.intro[3]}</p>
          </div>
        </div>
      </div>

      <div className={`container ${styles.overviewFeatures}`}>
        <article>
          <span className={styles.featureIconWrap} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="22"
              height="22"
            >
              <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" />
              <circle cx="12" cy="12" r="3" />
              <path d="M7.5 18c1.3.8 2.8 1.2 4.5 1.2s3.2-.4 4.5-1.2" />
            </svg>
          </span>
          <div className={styles.featureContent}>
            <strong>Optic Nerve Damage</strong>
            <p>Glaucoma damages the optic nerve and can permanently affect vision.</p>
          </div>
        </article>
        <article>
          <span className={styles.featureIconWrap} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="22"
              height="22"
            >
              <circle cx="12" cy="12" r="7" />
              <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
              <line x1="12" y1="2" x2="12" y2="5" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="2" y1="12" x2="5" y2="12" />
              <line x1="19" y1="12" x2="22" y2="12" />
            </svg>
          </span>
          <div className={styles.featureContent}>
            <strong>Often No Early Symptoms</strong>
            <p>Common forms of glaucoma may progress without pain or noticeable visual changes.</p>
          </div>
        </article>
        <article>
          <span className={styles.featureIconWrap} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="22"
              height="22"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <div className={styles.featureContent}>
            <strong>Protecting Remaining Vision</strong>
            <p>Early detection and appropriate treatment can help reduce the risk of further vision loss.</p>
          </div>
        </article>
      </div>
    </section>
  );

  // 9. AWARENESS SECTION & 10. GUIDED ASSESSMENT JOURNEY
  const afterEditorial = (
    <>
      {/* 9. “KNOW THE SIGNS” (AWARENESS) SECTION */}
      <section id="when" className={styles.awarenessSection} aria-labelledby="when-h">
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.eyebrow}>Know Your Risk</p>
            <h2 id="when-h"><HeadingText>{c.seekHelp.heading}</HeadingText></h2>
            <p className={styles.leadText}>Glaucoma can affect people of different ages. Regular examinations are particularly important if you have risk factors.</p>
          </div>
          <div className={styles.awarenessGrid}>
            {c.seekHelp.items.map((item) => (
              <div key={item} className={styles.awarenessItem}>
                <span className={styles.awarenessMarker} aria-hidden="true">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3.2 8.2 6.4 11.4 12.8 4.6" />
                  </svg>
                </span>
                <span>{item}</span>
              </div>
            ))}
            <p className={styles.leadText}>Risk factors do not establish a diagnosis. Ask your ophthalmologist about an examination schedule based on your individual risk. Speak to the prescribing doctor before changing steroid medicines.</p>
            <div className={styles.awarenessAlertBox}>
              <div>
                <strong>Acute Angle Closure Is a Medical Emergency</strong>
                <span>{c.seekHelp.note}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. “WHAT TO EXPECT / WHAT AN ASSESSMENT INVOLVES” */}
      <section id="journey" className={styles.journeySection} aria-labelledby="journey-h">
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.eyebrow}>Your Glaucoma Care Journey</p>
            <h2 id="journey-h">From Glaucoma Assessment <span className="title-secondary">to Long-Term Care</span></h2>
            <p className={styles.leadText}>
              {c.journeyLead}
            </p>
          </div>

          <div className={styles.journeyFlow}>
            {c.journey.map((step, idx) => (
              <div key={step.title} className={styles.journeyStep}>
                <div className={styles.journeyCircleWrap}>
                  <span className={styles.journeyBadge}>{String(idx + 1).padStart(2, "0")}</span>
                  <Image
                    src={JOURNEY_IMAGES[idx]}
                    alt={step.title}
                    width={130}
                    height={130}
                    className={styles.journeyCircleImg}
                    unoptimized
                  />
                </div>
                {idx < c.journey.length - 1 && (
                  <span className={styles.journeyArrow} aria-hidden="true">
                    ❯❯❯
                  </span>
                )}
                <h3 className={styles.journeyTitle}>{step.title}</h3>
                <p className={styles.journeyText}>{step.text}</p>
                {idx < c.journey.length - 1 && (
                  <span className={styles.journeyConnector} aria-hidden="true">
                    <ArrowDownIcon width={19} height={19} />
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className={styles.sectionNote}>
            <strong>Follow-up:</strong> Glaucoma may progress even when pressure appears controlled. Regular evaluation of optic nerve structure and visual function remains important.
          </p>
        </div>
      </section>
    </>
  );

  const videos = videosFor("glaucoma");
  const video = (
    <section id="watch" className={styles.videoSection} aria-labelledby="watch-h">
      <div className="container">
        <div className={styles.centerHead}>
          <p className={styles.eyebrow}>Insights from Your Doctor</p>
          <h2 id="watch-h">Understanding Glaucoma <span className="title-secondary">with Dr. Poonam Jain</span></h2>
          <p className={styles.leadText}>
            Learn about glaucoma, optic nerve health, common misconceptions, early detection and the importance of regular eye examinations through educational videos from Dr. Poonam Jain.
          </p>
        </div>
        <div className={styles.videoGrid}>
          <ServiceVideoCarousel>
            {videos.map((v) => {
              const props = playerProps(v);
              const copy = props.videoId ? VIDEO_COPY[props.videoId] : undefined;
              return (
                <GlaucomaVideoCard
                  key={v.id}
                  videoId={props.videoId || ""}
                  title={copy?.title ?? v.title}
                  description={copy?.description ?? v.description}
                  poster={props.poster || "/images/glaucoma-thumbnail1-new.jpg"}
                  watchUrl={props.watchUrl || `https://www.youtube.com/watch?v=${props.videoId}`}
                  language={v.language}
                  category={v.category}
                />
              );
            })}
          </ServiceVideoCarousel>
        </div>
      </div>
    </section>
  );

  const faqs = SERVICE_CONTENT.glaucoma.faqs;
  const faq = (
    <ServicesFaqSection
      items={faqs}
      heading="Questions Patients Often Ask About Glaucoma"
      lead="Find answers to common questions about glaucoma diagnosis, treatment, risk factors and long-term eye care."
      serviceStyle
      topic="glaucoma"
      online={online}
      image="/images/452e8467-0cbd-4c38-a11d-1ca6ff9f6035.png"
      allClosed
    />
  );

  const closing = (
    <HomeCta
      online={online}
      id="glaucoma-cta"
      heading="Book Your Glaucoma Consultation"
      desc="Whether you have a family history of glaucoma, elevated eye pressure or require ongoing glaucoma management, consult Dr. Poonam Jain for a detailed eye assessment and personalised care plan."
      onlineBookingLabel="Request a Consultation"
      note="Experiencing sudden severe eye pain or sudden vision loss? Seek immediate emergency eye care."
    />
  );

  return (
    <ServiceLayout
      serviceKey="glaucoma"
      className={styles.page}
      hero={hero}
      overview={overview}
      afterEditorial={afterEditorial}
      video={video}
      faq={faq}
      closing={closing}
    >
      {/* 3. “WHY CHECKUPS MATTER” (EARLY / SILENT) */}
      <section
        id="silent"
        className={styles.earlySection}
        aria-labelledby="silent-h"
      >
        <div className="container">
          <div className={styles.earlyPanel}>
            <div className={styles.earlyContent}>
              <p className={styles.eyebrow}>Why Regular Check-ups Matter</p>
              <h2 id="silent-h" className={styles.earlyHeading}>
                Glaucoma Often Has No Early Symptoms. <span className="title-secondary">Early Detection Matters.</span>
              </h2>
              <p className={styles.earlyLead}>
                Vision lost due to glaucoma cannot usually be restored. Regular eye examinations can help identify optic nerve changes before noticeable vision loss occurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. “SIGNS TO NOTICE” SECTION & 5. NOTE BOX */}
      <section id="signs" className={styles.signsSection} aria-labelledby="signs-h">
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.eyebrow}>Signs &amp; Symptoms</p>
            <h2 id="signs-h">Understanding the <span className="title-secondary">Symptoms of Glaucoma</span></h2>
            <p className={styles.leadText}>
              Most people with early open-angle glaucoma do not experience noticeable symptoms. As it progresses, changes in the field of vision may become apparent.
            </p>
          </div>

          <div className={styles.signsLayout}>
            <div className={styles.signsVisualSpacer} aria-hidden="true" />
            <div className={styles.signsListCol}>
              <ul className={styles.signsGrid}>
                {SIGNS.map((s, idx) => (
                  <li key={s.title} className={styles.signCard}>
                    <div className={styles.signIconWrap}>
                      <Mark kind={idx % 2 === 0 ? "eye" : "scan"} />
                    </div>
                    <div className={styles.signContent}>
                      <h3 className={styles.signTitle}>{s.title}</h3>
                      <p className={styles.signText}>{s.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. SMALL WHITE NOTE BOX (INTEGRATED NATURALLY) */}
          <div className={styles.signsNote}>
            <InfoIcon className={styles.emergencyIcon} aria-hidden="true" />
            <p>
              These symptoms can occur with other eye conditions, and glaucoma can be present without noticeable symptoms. A comprehensive eye examination is needed for diagnosis.
            </p>
          </div>
          <div className={styles.emergencyWarning}>
            <svg className={styles.emergencyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3 2 21h20L12 3Z" />
              <path d="M12 9v4m0 4h.01" />
            </svg>
            <div className={styles.emergencyText}><strong>Acute Angle Closure Is a Medical Emergency.</strong> {c.seekHelp.note}</div>
          </div>
        </div>
      </section>

      {/* 6. “COMMON TYPES OF GLAUCOMA” */}
      <section id="types" className={styles.typesSection} aria-labelledby="types-h">
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.eyebrow}>Types of Glaucoma</p>
            <h2 id="types-h">Common Types <span className="title-secondary">of Glaucoma</span></h2>
            <p className={styles.leadText}>
              Glaucoma can develop through different mechanisms. Identifying the type helps your ophthalmologist recommend appropriate treatment and follow-up.
            </p>
          </div>

          <div className={styles.typesLayout}>
            <div className={styles.typesVisualCol}>
              <div className={styles.typesGlobeCard}>
                <Image
                  src="/images/glaucoma-eye-pressure-globe.png"
                  alt="Illustrated eye cross-section showing the drainage angle and optic nerve"
                  width={520}
                  height={500}
                  className={styles.typesGlobeImg}
                  unoptimized
                />
                <div className={styles.typesGlobeCaption}>
                  <strong>Eye Pressure &amp; Optic Nerve Health</strong>
                  <span>Raised intraocular pressure can contribute to optic nerve damage. Glaucoma can also develop at normal eye pressure, and multiple factors influence its progression.</span>
                </div>
              </div>
            </div>

            <div className={styles.typesListCol}>
              <div className={styles.typesCards}>
                <div className={styles.typeCard}>
                  <div className={styles.typeCardBadge}>01</div>
                  <div className={styles.typeCardBody}>
                    <h3 className={styles.typeCardTitle}>{TYPES[0].title}</h3>
                    <p className={styles.typeCardText}>{TYPES[0].text}</p>
                  </div>
                </div>

                <div className={styles.typeCard}>
                  <div className={styles.typeCardBadge}>02</div>
                  <div className={styles.typeCardBody}>
                    <h3 className={styles.typeCardTitle}>{TYPES[1].title}</h3>
                    <p className={styles.typeCardText}>{TYPES[1].text}</p>
                  </div>
                </div>

                <div className={styles.typeCard}>
                  <div className={styles.typeCardBadge}>03</div>
                  <div className={styles.typeCardBody}>
                    <h3 className={styles.typeCardTitle}>{TYPES[2].title}</h3>
                    <p className={styles.typeCardText}>{TYPES[2].text}</p>
                  </div>
                </div>
              </div>
              <p className={styles.sectionNote}>
                <strong>Note:</strong> Other forms, including secondary and childhood glaucoma, also exist. These cards describe selected clinical presentations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. “DIAGNOSIS AND MONITORING” */}
      <section id="monitoring" className={styles.monitoringSection} aria-labelledby="monitoring-h">
        <div className="container">
          <div className={styles.monitoringHeaderWrap}>
            <div className={styles.monitoringCopy}>
              <p className={styles.eyebrow}>Diagnosis &amp; Monitoring</p>
              <h2 id="monitoring-h">How Glaucoma Is <span className="title-secondary">Diagnosed &amp; Monitored</span></h2>
              <p className={styles.leadText}>
                A glaucoma assessment combines examination and appropriate tests to evaluate eye pressure, optic nerve health, the drainage angle and visual function. Eye pressure alone cannot confirm or rule out glaucoma.
              </p>
            </div>
            <figure className={styles.monitoringPhoto}>
              <Image
                src="/images/archive-glaucoma-test.webp"
                alt="Eye testing instrument at Namokar Eye & Oculoplasty Centre"
                fill
                sizes="(max-width: 1100px) 100vw, 50vw"
                className={styles.monitoringImg}
                unoptimized
              />
            </figure>
          </div>

          <ul className={styles.testGrid}>
            {TESTS.map((t, i) => (
              <li key={t.title} className={styles.testCard}>
                <div className={styles.testNumber}>0{i + 1}</div>
                <h3 className={styles.testTitle}>{t.title}</h3>
                <p className={styles.testText}>{t.text}</p>
              </li>
            ))}
          </ul>
          <p className={styles.sectionNote}>
            <strong>Testing and follow-up:</strong> Your ophthalmologist will decide which tests you need and how often to repeat them. OCT findings should be interpreted alongside the examination, visual field testing and other relevant investigations.
          </p>
        </div>
      </section>

      <ClinicalFigure
        id="glaucomaFlow"
        className={styles.explained}
        eyebrow="Understanding Eye Pressure"
        heading="How Fluid Drainage Affects Eye Pressure"
        intro="The eye produces a clear fluid called aqueous humour. A balance between production and drainage helps regulate eye pressure. Aqueous humour is inside the eye, while tears lubricate its surface."
        note="These illustrations show one way eye pressure can rise. Glaucoma can also occur without elevated measured eye pressure."
      />

      {/* 8. “HOW GLAUCOMA IS TREATED” */}
      <section id="treatment" className={styles.treatmentSection} aria-labelledby="treatment-h">
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.eyebrow}>Glaucoma Treatment</p>
            <h2 id="treatment-h">Glaucoma Treatment &amp; <span className="title-secondary">Long-Term Management</span></h2>
            <p className={styles.leadText}>
              Treatment aims to lower intraocular pressure and reduce the risk of further optic nerve damage. It cannot restore vision already lost due to glaucoma. Your options depend on glaucoma type, severity, pressure, examination findings and individual needs.
            </p>
          </div>

          <ul className={styles.treatmentGrid}>
            {TREATMENTS.map((item) => (
              <li key={item.title} className={styles.treatmentCard}>
                <div className={styles.treatmentPhotoWrap}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={400}
                    height={220}
                    className={styles.treatmentImg}
                    unoptimized
                  />
                </div>
                <div className={styles.treatmentBody}>
                  <div className={styles.treatmentIconBadge}>
                    <Mark kind={item.kind} />
                  </div>
                  <h3 className={styles.treatmentTitle}>{item.title}</h3>
                  <p className={styles.treatmentText}>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={`${styles.sectionNote} ${styles.treatmentCallout}`}>
            <p>
              Your ophthalmologist will discuss the benefits, risks and alternatives for suitable treatments. Regular monitoring remains important after medication, laser treatment or surgery.
            </p>
            <p><strong>Keep using prescribed glaucoma medicines</strong> unless your ophthalmologist advises a change, even if your pressure improves or you have laser treatment or surgery.</p>
            <details>
              <summary>How different glaucoma procedures work</summary>
              <p>These are general examples. Your ophthalmologist can explain which options are suitable and how treatment is arranged.</p>
              <ul>
                <li><strong>Selective laser trabeculoplasty (SLT)</strong> improves drainage through the trabecular meshwork in suitable open-angle glaucoma.</li>
                <li><strong>Laser peripheral iridotomy (LPI)</strong> addresses pupillary block in suitable angle-closure conditions.</li>
                <li><strong>Trabeculectomy and glaucoma drainage devices</strong> provide an alternative drainage route.</li>
                <li><strong>Minimally invasive glaucoma surgery (MIGS)</strong> includes procedures that lower pressure through different mechanisms.</li>
                <li><strong>Lens extraction</strong> may be appropriate in selected cases of angle closure.</li>
              </ul>
            </details>
          </div>
        </div>
      </section>

      <ClinicalFigure
        id="sideVision"
        className={styles.explained}
        eyebrow="Understanding Visual Field Loss"
        heading="How Glaucoma Can Affect Your Field of Vision"
        intro="Glaucoma may cause changes in different areas of your visual field. They can develop gradually and may go unnoticed early on."
        note="This simulation is for education. Visual field changes vary and may not look like darkened areas or uniform tunnel vision. A visual field test and clinical examination are needed to assess actual vision loss."
      />
    </ServiceLayout>
  );
}

