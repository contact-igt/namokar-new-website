import ServiceVideoCarousel from "@/components/ServiceVideoCarousel";
import HeadingText from "@/components/HeadingText";
import Image from "next/image";
import { TriangleAlert } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import BookButton from "@/components/BookButton";
import AssetImage from "@/components/AssetImage";
import ServiceLayout from "@/components/ServiceLayout";
import ServicesFaqSection from "@/components/ServicesFaqSection";
import ExamVideoCard from "./ExamVideoCard";
import ExamPartsCarousel from "./ExamPartsCarousel";
import { pageMeta } from "@/lib/seo";
import { LINKS } from "@/config/site";
import { ASSETS } from "@/config/assets";
import { SERVICE_CONTENT } from "@/content/services";
import { CATEGORY_LABEL, videosFor } from "@/content/videos";
import { onlineBookingAvailable } from "@/lib/booking";
import { playerProps } from "@/lib/videoProps";
import styles from "./exams.module.css";
import HomeCta from "@/components/HomeCta";

const content = SERVICE_CONTENT.exams;

export const metadata = pageMeta("exams", {
  title: `${content.metaTitle} | Namokar`,
  description: content.metaDescription,
});

const URGENT_SIGNS = [
  "Sudden loss or significant reduction of vision",
  "New flashes of light or a sudden increase in floaters",
  "A dark curtain or shadow across your vision",
  "Severe eye pain, especially with redness or nausea",
  "Sudden double vision or new eye misalignment",
  "Eye injury or chemical exposure",
];

const VIDEO_COPY: Record<string, { title: string; description: string }> = {
  "82siQa3LgUY": {
    title: "Do Your Eyes Feel Tired After Long Screen Time?",
    description: "Understand common causes of digital eye strain and measures that may help reduce discomfort during prolonged screen use.",
  },
  wtk1RA5bJvk: {
    title: "Blurry Distance Vision After Long Hours at a Computer?",
    description: "Learn about temporary focusing difficulties and why persistent changes in vision should be assessed by an eye care professional.",
  },
};

export default function Page() {
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
          <BookButton online={online} label={online ? "Request an Eye Examination" : "Book an Eye Examination"} />
        </div>
      </div>
    </section>
  );

  // 2. OVERVIEW SECTION (Centered header + balanced 2-column image/text with highlight block)
  const overview = (
    <section id="overview" className={styles.overview} aria-labelledby="overview-h">
      <div className="container">
        <div className={styles.overviewCenterHead}>
          <p className={styles.eyebrow}>Understanding Comprehensive Eye Examinations</p>
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
            {content.intro.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className={styles.overviewHighlight}>
              <p><strong>Eye Health Goes Beyond Clear Vision</strong></p>
              <p>Clear vision alone cannot rule out eye disease. Regular examinations can help detect glaucoma, diabetic retinopathy and other eye conditions before you notice changes.</p>
            </div>
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
            <p className={styles.eyebrow}>Know When to Get Your Eyes Checked</p>
            <h2 id="when-h"><HeadingText>{content.seekHelp.heading}</HeadingText></h2>
            <p>Regular eye examinations help identify visual changes and detect conditions that may develop without noticeable symptoms.</p>
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
              <strong className={styles.reasonsUrgentTitle}>When to Seek Urgent Medical Attention</strong>
              <p>Seek immediate medical assessment for any of these symptoms or injuries.</p>
              <ul role="list">
                {URGENT_SIGNS.map((sign) => (
                  <li key={sign}>
                    <TriangleAlert className={styles.reasonsUrgentIcon} aria-hidden="true" />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
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
            <h2 id="journey-h">Your Comprehensive <span className="title-secondary">Eye Examination Journey</span></h2>
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
          <div className={styles.overviewHighlight}>
            <p><strong>Will my eyes be dilated during the examination?</strong></p>
            <p>Dilating drops may help your ophthalmologist examine the retina and optic nerve. They can temporarily blur vision and increase light sensitivity. How long the effects last depends on the drops used and your response.</p>
            <p>Bring sunglasses and consider arranging a ride or asking someone to accompany you. Avoid driving until the effects have worn off and your vision is safe for driving.</p>
          </div>
        </div>
      </section>
    </>
  );

  // 4. VIDEOS ON THIS TOPIC (MATCHING GLAUCOMA REFERENCE DESIGN & SOFT PEACH WAVE BG)
  const video = (
    <section id="watch" className={styles.videoSection} aria-labelledby="watch-h">
      <div className="container">
        <div className={styles.centerHeading}>
          <p className={styles.eyebrow}>Insights from Your Doctor</p>
          <h2 id="watch-h">Understanding Your Eye Health <span className="title-secondary">with Dr. Poonam Jain</span></h2>
          <p>
            Explore educational videos from Dr. Poonam Jain about digital eye strain, screen-related discomfort and the importance of appropriate examinations. These videos provide general information. Persistent vision changes warrant an eye examination, and sudden changes require urgent assessment.
          </p>
        </div>
        <div className={styles.videoGrid}>
          <ServiceVideoCarousel>
            {videos.map((item) => {
              const props = playerProps(item);
              const copy = props.videoId ? VIDEO_COPY[props.videoId] : undefined;
              return (
                <ExamVideoCard
                  key={item.id}
                  videoId={props.videoId || ""}
                  title={copy?.title ?? item.title}
                  description={copy?.description ?? item.description}
                  poster={props.poster || "/images/eye-examination-thumbnail1.jpg"}
                  watchUrl={props.watchUrl || `https://www.youtube.com/watch?v=${props.videoId}`}
                  language={item.language}
                  category={item.category ? CATEGORY_LABEL[item.category] : undefined}
                />
              );
            })}
          </ServiceVideoCarousel>
        </div>
      </div>
    </section>
  );

  // 5. FAQ SECTION (CENTERED ACCORDION MATCHING GLAUCOMA WITH SOFT PEACH WAVE BG)
  const faqs = content.faqs;
  const faq = (
    <ServicesFaqSection
      items={faqs}
      heading={<>Questions <span className="title-secondary">patients often ask</span></>}
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
      heading="Book Your Comprehensive Eye Examination"
      desc="Whether you are experiencing visual changes, need a routine eye check or want to understand your overall eye health, consult Dr. Poonam Jain for a detailed assessment and personalised guidance."
      onlineBookingLabel="Request an Eye Examination"
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
            <p className={styles.eyebrow}>Understanding the Examination</p>
            <h2 id="fig-examParts-h">What Happens During a <span className="title-secondary">Comprehensive Eye Examination?</span></h2>
            <p className={styles.leadText}>Different tests assess different aspects of your vision and eye health. Your ophthalmologist determines which tests are appropriate for you.</p>
          </div>

          <ExamPartsCarousel>
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
                <h3 className={styles.bentoTitle}>Visual Acuity Assessment</h3>
                <p className={styles.bentoText}>Measures how clearly you see at different distances, with or without your usual spectacles or contact lenses as appropriate.</p>
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
                <h3 className={styles.bentoTitle}>Refraction &amp; Spectacle Assessment</h3>
                <p className={styles.bentoText}>
                  Checks for short-sightedness, long-sightedness and astigmatism to determine whether corrective lenses may improve your vision.
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
                <h3 className={styles.bentoTitle}>Eye Pressure Measurement (Tonometry)</h3>
                <p className={styles.bentoText}>
                  Measures pressure inside the eye when clinically indicated. Normal eye pressure does not rule out glaucoma.
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
                <h3 className={styles.bentoTitle}>Anterior Eye Examination</h3>
                <p className={styles.bentoText}>
                  Examines the eyelids, conjunctiva, cornea, iris, anterior chamber and natural lens.
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
                <h3 className={styles.bentoTitle}>Retina &amp; Optic Nerve Examination</h3>
                <p className={styles.bentoText}>
                  Evaluates the retina, macula and optic nerve. Pupil dilation may be recommended for a more detailed view.
                </p>
              </div>
            </article>
            <article className={`${styles.bentoCard} ${styles.card06}`}>
              <div className={styles.bentoImgWrap}>
                <Image src="/images/squint/squint-hero.webp" alt="" fill sizes="(min-width: 768px) 75vw, 100vw" className={styles.bentoImg} />
              </div>
              <span className={styles.bentoNumber} aria-hidden="true">06</span>
              <div className={styles.bentoOverlay}>
                <h3 className={styles.bentoTitle}>Eye Alignment &amp; Coordination Assessment</h3>
                <p className={styles.bentoText}>Evaluates eye movements, alignment and how well the eyes work together, especially when assessing squint, double vision or binocular vision concerns.</p>
              </div>
            </article>
          </ExamPartsCarousel>

          <p className={styles.bentoNote}>
            <strong>Note:</strong> The tests you need depend on your clinical findings, age, symptoms and individual risk factors.
          </p>
        </div>
      </section>
    </ServiceLayout>
  );
}
