import HeadingText from "@/components/HeadingText";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import BookButton from "@/components/BookButton";
import AssetImage from "@/components/AssetImage";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";
import ServicesFaqSection from "@/components/ServicesFaqSection";
import ExamVideoCard from "./ExamVideoCard";
import { LINKS } from "@/config/site";
import { ASSETS } from "@/config/assets";
import { SERVICE_CONTENT } from "@/content/services";
import { CATEGORY_LABEL, videosFor } from "@/content/videos";
import { onlineBookingAvailable } from "@/lib/booking";
import { playerProps } from "@/lib/videoProps";
import styles from "./exams.module.css";
import HomeCta from "@/components/HomeCta";

export const metadata = serviceMetadata("exams");

export default function Page() {
  const content = SERVICE_CONTENT.exams;
  const online = onlineBookingAvailable();
  const videos = videosFor("exams");

  // 1. HERO SECTION
  const hero = (
    <section className={styles.hero} aria-labelledby="exams-hero-h">
      <div className="container">
        <Breadcrumb current="Comprehensive Eye Examinations" trail={[{ label: "Services", href: LINKS.allServices }]} />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Comprehensive Eye Examinations</p>
          <h1 id="exams-hero-h"><HeadingText>{content.h1}</HeadingText></h1>
          <p>{content.lead}</p>
          <BookButton online={online} />
        </div>
      </div>
    </section>
  );

  // 2. OVERVIEW SECTION (Centered header + balanced 2-column image/text with highlight block)
  const overview = (
    <section id="overview" className={styles.overview} aria-labelledby="overview-h">
      <div className="container">
        <div className={styles.overviewCenterHead}>
          <p className={styles.eyebrow}>Comprehensive Eye Examinations</p>
          <h2 id="overview-h"><HeadingText>{content.introHeading}</HeadingText></h2>
        </div>
        <div className={styles.overviewContentWrap}>
          <figure className={styles.overviewPhoto}>
            <Image
              src="/images/Copy of DSC06884.JPG"
              alt="Eye examination at Namokar Eye & Oculoplasty Centre"
              fill
              sizes="(min-width: 960px) 45vw, 100vw"
            />
          </figure>
          <div className={styles.overviewText}>
            <p>{content.intro[0]}</p>
            <div className={styles.overviewHighlight}>
              <p>{content.intro[1]}</p>
            </div>
            <p>{content.intro[2]}</p>
          </div>
        </div>
      </div>
    </section>
  );

  // 3. EDITORIAL & JOURNEY
  const afterEditorial = (
    <>
      {/* KNOW THE SIGNS SECTION (MATCHING GLAUCOMA REFERENCE WITH ELEGANT TEAL WAVE RIBBONS) */}
      <section id="when" className={styles.reasons} aria-labelledby="when-h">
        <div className="container">
          <div className={styles.reasonsCenterHead}>
            <p className={styles.eyebrow}>Know the signs</p>
            <h2 id="when-h"><HeadingText>{content.seekHelp.heading}</HeadingText></h2>
          </div>
          <div className={styles.reasonsGrid}>
            {content.seekHelp.items.map((item) => (
              <div key={item} className={styles.reasonsItem}>
                <span className={styles.reasonsMarker} aria-hidden="true">
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
            <div className={styles.reasonsUrgent}>
              <strong className={styles.reasonsUrgentTitle}>Urgent Medical Attention:</strong>
              <p>{content.seekHelp.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT / JOURNEY */}
      <section id="journey" className={styles.journey} aria-labelledby="journey-h">
        <div className="container">
          <div className={styles.centerHeading}>
            <p className={styles.eyebrow}>What to expect</p>
            <h2 id="journey-h">What an <span className="title-secondary">assessment involves</span></h2>
            <p>{content.journeyLead}</p>
          </div>
          <ol className={styles.journeyGrid}>
            {content.journey.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true" className={styles.journeyNumber}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );

  // 4. VIDEOS ON THIS TOPIC (MATCHING GLAUCOMA REFERENCE DESIGN & SOFT PEACH WAVE BG)
  const video = (
    <section id="watch" className={styles.videoSection} aria-labelledby="watch-h">
      <div className="container">
        <div className={styles.centerHeading}>
          <p className={styles.eyebrow}>Watch</p>
          <h2 id="watch-h">Videos on <span className="title-secondary">this topic</span></h2>
          <p>
            Dr. Poonam Jain&apos;s centre shares short videos on its YouTube channel and in its own footage. Videos are general information, not a substitute for an examination. They complement the written information on this page.
          </p>
        </div>
        <div className={styles.videoGrid}>
          {videos.map((item) => {
            const props = playerProps(item);
            return (
              <ExamVideoCard
                key={item.id}
                videoId={props.videoId || ""}
                title={item.title}
                description={item.description}
                poster={props.poster || "/images/eye-examination-thumbnail1.jpg"}
                watchUrl={props.watchUrl || `https://www.youtube.com/watch?v=${props.videoId}`}
                language={item.language}
                category={item.category ? CATEGORY_LABEL[item.category] : undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );

  // 5. FAQ SECTION (CENTERED ACCORDION MATCHING GLAUCOMA WITH SOFT PEACH WAVE BG)
  const faqs = content.faqs;
  const faq = (
    <ServicesFaqSection
      items={faqs}
      heading="Questions patients often ask"
      lead="This page is general information, not medical advice. Your own eyes need to be examined before anyone can advise you."
      serviceStyle
      topic="exams"
      online={online}
      image="/images/452e8467-0cbd-4c38-a11d-1ca6ff9f6035.png"
      allClosed
    />
  );

  // 6. CLOSING CTA
  const closing = (
    <HomeCta
      online={online}
      id="exams-cta"
      kicker="Consultation"
      heading="Speak to the centre about your eyes."
      desc="Contact the centre to plan your visit or arrange an eye consultation."
    />
  );

  return (
    <ServiceLayout
      serviceKey="exams"
      className={styles.page}
      hero={hero}
      overview={overview}
      afterEditorial={afterEditorial}
      video={video}
      faq={faq}
      closing={closing}
    >
      {/* 3. “SEE IT EXPLAINED” — ASYMMETRIC BENTO GRID */}
      <section id="examParts" className={styles.bentoSection} aria-labelledby="fig-examParts-h">
        <div className="container">
          <div className={styles.bentoCenterHead}>
            <p className={styles.eyebrow}>See it explained</p>
            <h2 id="fig-examParts-h">What happens during a <span className="title-secondary">comprehensive eye examination</span></h2>
            <p className={styles.leadText}>Each step checks a different part of your vision and eye health.</p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Card 01: Top Left */}
            <article className={`${styles.bentoCard} ${styles.card01}`}>
              <div className={styles.bentoImgWrap}>
                <AssetImage
                  asset={ASSETS.examVisualAcuityAi}
                  fill
                  sizes="(min-width: 1100px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={styles.bentoImg}
                />
              </div>
              <span className={styles.bentoNumber} aria-hidden="true">01</span>
              <div className={styles.bentoOverlay}>
                <h3 className={styles.bentoTitle}>How well you see</h3>
                <p className={styles.bentoText}>Your vision is checked with and without spectacles.</p>
              </div>
            </article>

            {/* Card 02: Bottom Left */}
            <article className={`${styles.bentoCard} ${styles.card02}`}>
              <div className={styles.bentoImgWrap}>
                <AssetImage
                  asset={ASSETS.examRefractionAi}
                  fill
                  sizes="(min-width: 1100px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={styles.bentoImg}
                />
              </div>
              <span className={styles.bentoNumber} aria-hidden="true">02</span>
              <div className={styles.bentoOverlay}>
                <h3 className={styles.bentoTitle}>Spectacle needs</h3>
                <p className={styles.bentoText}>
                  Your eyes are tested to see whether glasses would help, or whether your prescription has changed.
                </p>
              </div>
            </article>

            {/* Card 03: Middle Column - Spans 2 Rows */}
            <article className={`${styles.bentoCard} ${styles.card03}`}>
              <div className={styles.bentoImgWrap}>
                <AssetImage
                  asset={ASSETS.examEyePressureAi}
                  fill
                  sizes="(min-width: 1100px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={styles.bentoImg}
                />
              </div>
              <span className={styles.bentoNumber} aria-hidden="true">03</span>
              <div className={styles.bentoOverlay}>
                <h3 className={styles.bentoTitle}>Eye pressure</h3>
                <p className={styles.bentoText}>
                  The pressure inside the eye may be measured as part of looking for conditions such as glaucoma.
                </p>
              </div>
            </article>

            {/* Card 04: Top Right */}
            <article className={`${styles.bentoCard} ${styles.card04}`}>
              <div className={styles.bentoImgWrap}>
                <AssetImage
                  asset={ASSETS.examFrontEyeAi}
                  fill
                  sizes="(min-width: 1100px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={styles.bentoImg}
                />
              </div>
              <span className={styles.bentoNumber} aria-hidden="true">04</span>
              <div className={styles.bentoOverlay}>
                <h3 className={styles.bentoTitle}>The front of the eye</h3>
                <p className={styles.bentoText}>
                  The eyelids, the surface of the eye and the lens are examined.
                </p>
              </div>
            </article>

            {/* Card 05: Bottom Right */}
            <article className={`${styles.bentoCard} ${styles.card05}`}>
              <div className={styles.bentoImgWrap}>
                <AssetImage
                  asset={ASSETS.examRetinaAi}
                  fill
                  sizes="(min-width: 1100px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={styles.bentoImg}
                />
              </div>
              <span className={styles.bentoNumber} aria-hidden="true">05</span>
              <div className={styles.bentoOverlay}>
                <h3 className={styles.bentoTitle}>The back of the eye</h3>
                <p className={styles.bentoText}>
                  The retina and optic nerve are looked at, sometimes after drops that widen the pupil.
                </p>
              </div>
            </article>
          </div>

          <p className={styles.bentoNote}>
            The tests used depend on your symptoms and age and are chosen by the doctor.
          </p>
        </div>
      </section>
    </ServiceLayout>
  );
}
