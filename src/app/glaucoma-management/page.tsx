import HeadingText from "@/components/HeadingText";
import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import BookButton from "@/components/BookButton";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";
import { LINKS, SITE, TEL_HREF } from "@/config/site";
import { SERVICE_CONTENT } from "@/content/services";
import { videosFor } from "@/content/videos";
import { onlineBookingAvailable } from "@/lib/booking";
import { playerProps } from "@/lib/videoProps";
import VideoPlayer from "@/components/VideoPlayer";
import HomeCta from "@/components/HomeCta";
import GlaucomaVideoCard from "./GlaucomaVideoCard";
import ServicesFaqSection from "@/components/ServicesFaqSection";
import { PhoneIcon } from "@/components/Icons";
import styles from "./glaucoma.module.css";

export const metadata = serviceMetadata("glaucoma");

type Item = { title: string; text: string };

const BGS = {
  early: "/images/ChatGPT Image Nov 14, 2026, 12_34_33 PM.png",
  signs: "/images/e4b58cbe-e728-4a38-b079-aedcd4cbe6d6.png",
};

const JOURNEY_DATA = [
  {
    num: "01",
    img: "/images/glaucoma-journey-1.jpg",
    title: "Examination",
    text: "Your eyes are examined, including the optic nerve at the back of the eye.",
  },
  {
    num: "02",
    img: "/images/glaucoma-journey-2.jpg",
    title: "Diagnostic Tests",
    text: "Tests measure intraocular pressure and visual field to check nerve function.",
  },
  {
    num: "03",
    img: "/images/glaucoma-journey-3.jpg",
    title: "Findings & Plan",
    text: "The doctor explains what was found and formulates a personalised care plan.",
  },
  {
    num: "04",
    img: "/images/ChatGPT Image Nov 14, 2026, 03_48_23 PM.png",
    title: "Targeted Treatment",
    text: "Glaucoma is treated with eye drops, laser or surgery depending on your eyes.",
  },
  {
    num: "05",
    img: "/images/glaucoma-journey-5.jpg",
    title: "Regular Follow-up",
    text: "Ongoing monitoring keeps eye pressure controlled and preserves vision.",
  },
];

const SIGNS: Item[] = [
  {
    title: "Changing glasses often",
    text: "Needing a new prescription again and again can be a sign worth mentioning to the doctor.",
  },
  {
    title: "Narrowing side vision",
    text: "Side (peripheral) vision can shrink slowly, sometimes described as tunnel vision.",
  },
  {
    title: "Missing things at the edge",
    text: "Bumping into objects or people, or tripping, because part of the view is missing.",
  },
  {
    title: "Needing brighter light",
    text: "Finding that you need much more light than before to see well.",
  },
  {
    title: "Blurred or hazy vision",
    text: "Vision that looks misty or less clear, without an obvious reason.",
  },
  {
    title: "A vague ache around the eye",
    text: "A dull ache or feeling of pressure in or around the eye.",
  },
];

const TYPES: Item[] = [
  {
    title: "Open-angle glaucoma",
    text: "The most common type. The drainage channels of the eye stay open but drain too slowly, and damage builds up gradually. There is usually no pain and no early symptom.",
  },
  {
    title: "Normal-tension glaucoma",
    text: "The optic nerve is damaged even though the eye pressure measures within the normal range. It is one reason a full examination is needed and not a pressure reading alone.",
  },
  {
    title: "Angle-closure glaucoma",
    text: "The drainage angle of the eye becomes narrow or blocked. It can build up slowly or, in an acute attack, within hours.",
  },
];

const TESTS: Item[] = [
  {
    title: "Eye pressure (tonometry)",
    text: "Measures the pressure inside the eye, because raised pressure is a common factor in glaucoma.",
  },
  {
    title: "Optic nerve examination",
    text: "The nerve at the back of the eye is examined for thinning or other changes that glaucoma causes.",
  },
  {
    title: "Visual field test",
    text: "Maps your side vision and shows whether any part of it has been lost, often without the person noticing.",
  },
  {
    title: "OCT scan",
    text: "A scan that can show the thickness of the nerve fibre layer, which helps to pick up change over time.",
  },
  {
    title: "Drainage angle (gonioscopy)",
    text: "Looks at the drainage angle of the eye, which helps to tell the types of glaucoma apart.",
  },
  {
    title: "Corneal thickness",
    text: "The thickness of the front of the eye can affect how an eye pressure reading is interpreted.",
  },
];

const TREATMENTS: { title: string; text: string; img: string; kind: "drop" | "scan" | "check" }[] = [
  {
    title: "Eye drops",
    text: "Often the first step. Drops lower the pressure in the eye, and they only work when they are used regularly as prescribed.",
    img: "/images/glaucoma-treat-drops.jpg",
    kind: "drop",
  },
  {
    title: "Laser treatment",
    text: "In suitable eyes, a laser can help fluid drain more easily or open a narrow drainage angle.",
    img: "/images/glaucoma-treat-laser.jpg",
    kind: "scan",
  },
  {
    title: "Surgery",
    text: "When drops or laser are not enough, surgery creates a new route for fluid to leave the eye. Options range from minimally invasive glaucoma surgery (MIGS) to conventional operations.",
    img: "/images/glaucoma-treat-surgery.jpg",
    kind: "check",
  },
];

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
  const c = SERVICE_CONTENT.glaucoma;
  const online = onlineBookingAvailable();

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
          <div className={styles.mobileBgProtection} />
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
                <span>Protecting your vision,</span>
                <span className="title-secondary">from silent damage.</span>
              </h1>

              {/* Body lead description */}
              <p className={styles.lead}>{c.lead}</p>

              {/* CTA Action Buttons */}
              <div className={styles.actions}>
                <BookButton online={online} className={styles.btnPrimary} />
                <a href="#overview" className={styles.btnSecondary}>
                  <span>Learn About Glaucoma</span>
                  <span className={styles.btnArrow} aria-hidden="true">&rarr;</span>
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
                    <strong>Preserving Your Sight</strong>
                    <span>with Advanced Glaucoma Care</span>
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
              <strong>Early Detection & Pressure Checks</strong>
            </li>
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </span>
              <strong>Advanced Optic Nerve OCT</strong>
            </li>
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <strong>Specialist Glaucoma Doctors</strong>
            </li>
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </span>
              <strong>Long-term Vision Protection</strong>
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
            <p>
              Glaucoma is a group of eye conditions in which the{" "}
              <strong>optic nerve</strong>, which carries what the eye sees to the brain, is{" "}
              <strong>gradually damaged</strong>.{" "}
              <strong>Raised pressure inside the eye</strong> is a common factor, but it is not the only one.
            </p>
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
              <p className={styles.calloutText}>
                Glaucoma is often called the <strong>silent thief of sight</strong> because it can take{" "}
                <strong>side vision slowly and without pain</strong>. Left untreated, it can lead to{" "}
                <strong>permanent loss of vision</strong>.
              </p>
            </div>
            <p>
              Glaucoma is usually a <strong>long-term condition</strong> that is managed rather than cured. Damage to the optic nerve cannot be reversed, so the aim of care is to{" "}
              <strong>find glaucoma early</strong> and to{" "}
              <strong>protect the vision that remains</strong>. Treatment and follow-up are planned for each person.
            </p>
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
            <strong>Optic nerve &amp; pressure</strong>
            <p>The nerve connecting eye to brain is gradually damaged, with raised pressure a common factor.</p>
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
            <strong>Painless side-vision loss</strong>
            <p>Often called the silent thief of sight, taking side vision slowly and without pain.</p>
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
            <strong>Protecting remaining sight</strong>
            <p>While damage cannot be reversed, finding it early and ongoing care protect the vision that remains.</p>
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
            <p className={styles.eyebrow}>Know the signs</p>
            <h2 id="when-h"><HeadingText>{c.seekHelp.heading}</HeadingText></h2>
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
            <div className={styles.awarenessAlertBox}>
              <div>
                <strong>Urgent Medical Attention:</strong>
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
            <p className={styles.eyebrow}>What to expect</p>
            <h2 id="journey-h">What an <span className="title-secondary">assessment involves</span></h2>
            <p className={styles.leadText}>
              A general outline of long-term care. The doctor decides which tests you need and how often. Most people can maintain good vision and continue their usual activities.
            </p>
          </div>

          <div className={styles.journeyFlow}>
            {JOURNEY_DATA.map((step, idx) => (
              <div key={step.title} className={styles.journeyStep}>
                <div className={styles.journeyCircleWrap}>
                  <span className={styles.journeyBadge}>{step.num}</span>
                  <Image
                    src={step.img}
                    alt={step.title}
                    width={130}
                    height={130}
                    className={styles.journeyCircleImg}
                    unoptimized
                  />
                </div>
                {idx < JOURNEY_DATA.length - 1 && (
                  <span className={styles.journeyArrow} aria-hidden="true">
                    ❯❯❯
                  </span>
                )}
                <h3 className={styles.journeyTitle}>{step.title}</h3>
                <p className={styles.journeyText}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const videos = videosFor("glaucoma");
  const video = (
    <section id="watch" className={styles.videoSection} aria-labelledby="watch-h">
      <div className="container">
        <div className={styles.centerHead}>
          <p className={styles.eyebrow}>Watch</p>
          <h2 id="watch-h">Videos on <span className="title-secondary">this topic</span></h2>
          <p className={styles.leadText}>
            Dr. Poonam Jain&apos;s centre shares short videos on its YouTube channel and in its own footage. Videos are general information, not a substitute for an examination. They complement the written information on this page.
          </p>
        </div>
        <div className={styles.videoGrid}>
          {videos.map((v) => {
            const props = playerProps(v);
            return (
              <GlaucomaVideoCard
                key={v.id}
                videoId={props.videoId || ""}
                title={v.title}
                description={v.description}
                poster={props.poster || "/images/glaucoma-thumbnail1-new.jpg"}
                watchUrl={props.watchUrl || `https://www.youtube.com/watch?v=${props.videoId}`}
                language={v.language}
                category={v.category}
              />
            );
          })}
        </div>
      </div>
    </section>
  );

  const faqs = SERVICE_CONTENT.glaucoma.faqs;
  const faq = (
    <ServicesFaqSection
      items={faqs}
      heading="Questions patients often ask"
      lead="This page is general information, not medical advice. Your own eyes need to be examined before anyone can advise you."
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
      kicker="Consultation"
      heading="Speak to the centre about your eyes."
      desc="Contact the centre to plan your visit or arrange an eye consultation."
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
              <p className={styles.eyebrow}>Why check-ups matter</p>
              <h2 id="silent-h" className={styles.earlyHeading}>
                Often no early symptoms. <span className="title-secondary">That is why an examination matters.</span>
              </h2>
              <p className={styles.earlyLead}>
                Vision lost to glaucoma does not come back, and early on most people notice
                nothing. Regular examination is how it is found, and how any change is
                caught.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. “SIGNS TO NOTICE” SECTION & 5. NOTE BOX */}
      <section id="signs" className={styles.signsSection} aria-labelledby="signs-h">
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.eyebrow}>Signs to notice</p>
            <h2 id="signs-h">Changes you <span className="title-secondary">may notice</span></h2>
            <p className={styles.leadText}>
              Early glaucoma often shows nothing at all. When changes do appear, they tend to
              be slow, so they are easy to put down to age or tired eyes.
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
            <p>
              <strong>Please note:</strong> None of these proves glaucoma, and glaucoma can be
              present without any of them. Only an eye examination can tell.
            </p>
          </div>
        </div>
      </section>

      {/* 6. “COMMON TYPES OF GLAUCOMA” */}
      <section id="types" className={styles.typesSection} aria-labelledby="types-h">
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.eyebrow}>Types</p>
            <h2 id="types-h">Common types <span className="title-secondary">of glaucoma</span></h2>
            <p className={styles.leadText}>
              Knowing which type a person has helps the doctor choose the right care.
            </p>
          </div>

          <div className={styles.typesLayout}>
            <div className={styles.typesVisualCol}>
              <div className={styles.typesGlobeCard}>
                <Image
                  src="/images/glaucoma-eye-pressure-globe.png"
                  alt="3D cutaway of eye showing increased fluid pressure on optic nerve"
                  width={520}
                  height={500}
                  className={styles.typesGlobeImg}
                  unoptimized
                />
                <div className={styles.typesGlobeCaption}>
                  <strong>Fluid Pressure &amp; The Optic Nerve</strong>
                  <span>Increased intraocular pressure gradually compresses nerve fibres at the optic disc.</span>
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
            </div>
          </div>

          <div className={styles.emergencyWarning}>
            <div className={styles.emergencyIcon}>⚠️</div>
            <div className={styles.emergencyText}>
              <strong>Emergency Note:</strong> A sudden attack of angle-closure glaucoma is an
              emergency. Severe eye pain with redness, blurred vision, halos around lights,
              headache or sickness needs urgent medical attention.
            </div>
          </div>
        </div>
      </section>

      {/* 7. “DIAGNOSIS AND MONITORING” */}
      <section id="monitoring" className={styles.monitoringSection} aria-labelledby="monitoring-h">
        <div className="container">
          <div className={styles.monitoringHeaderWrap}>
            <div className={styles.monitoringCopy}>
              <p className={styles.eyebrow}>Diagnosis and monitoring</p>
              <h2 id="monitoring-h">How glaucoma is <span className="title-secondary">found and followed</span></h2>
              <p className={styles.leadText}>
                Checking eye pressure alone is not enough. The doctor looks at the nerve, the
                drainage angle and the field of vision together. These are tests a doctor may use;
                which ones you need, and how often, is the doctor&rsquo;s decision.
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
        </div>
      </section>

      <ClinicalFigure
        id="glaucomaFlow"
        className={styles.explained}
        heading="How fluid drains, and how pressure can rise"
        intro="Compare normal drainage with slowed drainage to see one common way pressure can rise inside the eye."
      />

      {/* 8. “HOW GLAUCOMA IS TREATED” */}
      <section id="treatment" className={styles.treatmentSection} aria-labelledby="treatment-h">
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.eyebrow}>Treatment</p>
            <h2 id="treatment-h">How glaucoma <span className="title-secondary">is treated</span></h2>
            <p className={styles.leadText}>
              Treatment aims to lower the pressure in the eye and protect the vision that is
              left. It cannot bring back vision that has already been lost.
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

          <div className={styles.treatmentCallout}>
            <p>
              The choice depends on the type of glaucoma, how far it has gone and the
              person&rsquo;s health. The doctor explains the options and what each can and cannot
              do. Check-ups continue after treatment, because glaucoma needs watching over the
              long term.
            </p>
          </div>
        </div>
      </section>

      <ClinicalFigure
        id="sideVision"
        className={styles.explained}
        heading="How glaucoma can narrow side vision"
        intro="The change is usually gradual, which is why regular examinations matter."
      />
    </ServiceLayout>
  );
}

