import HeadingText from "@/components/HeadingText";
import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import { ArrowDownIcon } from "@/components/Icons";
import ServiceLayout from "@/components/ServiceLayout";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import CataractVideoCarousel from "./CataractVideoCarousel";
import { SERVICE_CONTENT } from "@/content/services";
import { CATEGORY_LABEL, videosFor } from "@/content/videos";
import { playerProps } from "@/lib/videoProps";
import styles from "./cataract.module.css";

const content = SERVICE_CONTENT.cataract;

export const metadata = pageMeta("cataract", {
  title: `${content.metaTitle} | Namokar`,
  description: content.metaDescription,
});

const VIDEO_COPY: Record<string, { title: string; description: string }> = {
  kX04UgyjkWo: {
    title: "Understanding Cataract Surgery",
    description: "Dr. Poonam Jain explains cataracts and the role of surgical treatment.",
  },
  D5uIbXIihuc: {
    title: "When Should You Consider Cataract Surgery?",
    description: "Understand the factors that help determine whether cataract surgery may be appropriate.",
  },
  u3psA5Fu79U: {
    title: "Returning to Exercise After Cataract Surgery",
    description: "Learn about recovery considerations and returning to physical activities after surgery.",
  },
};

const journeyImages = [
  "/images/aesthetic/assessment-slit-exam-hq.webp",
  "/images/aesthetic/doctor-exam-dsc06826.webp",
  "/images/aesthetic/eye-exam-chart.webp",
  "/images/cataract-hero-clean-v2.webp",
  "/images/aesthetic/doctor-exam-dsc06796.webp",
];

export default function Page() {
  const videos = videosFor("cataract");
  return (
    <ServiceLayout
      serviceKey="cataract"
      className={styles.page}
      overview={
        <section id="overview" className={styles.overview} aria-labelledby="overview-h">
          <div className={`container ${styles.overviewGrid}`}>
            <div className={styles.overviewVisual}>
              <div className={styles.overviewCallout}>
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.calloutIcon}>
                  <ellipse cx="16" cy="16" rx="6.2" ry="7.2" strokeWidth="1.8" />
                  <path d="M12 10.5 C10.5 7, 14.5 4.5, 18.5 5.5 C22.5 6.5, 24.5 10, 23 13 C22.2 14.5, 20.5 14.8, 20 15" strokeWidth="1.8" />
                  <path d="M20 21.5 C21.5 25, 17.5 27.5, 13.5 26.5 C9.5 25.5, 7.5 22, 9 19 C9.8 17.5, 11.5 17.2, 12 17" strokeWidth="1.8" />
                </svg>
                <div className={styles.calloutText}>
                  <strong>Natural Lens</strong>
                  <span>Lens clouding (cataract)</span>
                </div>
                <svg className={styles.calloutPointer} viewBox="0 0 172 74" fill="none" aria-hidden="true">
                  <line x1="172" y1="0" x2="6" y2="64" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="6" cy="64" r="8" fill="rgba(255, 255, 255, 0.35)" />
                  <circle cx="6" cy="64" r="4.2" fill="#ffffff" />
                </svg>
              </div>
            </div>
            <div className={styles.overviewCopy}>
              <p className="kicker">Understanding Cataracts</p>
              <h2 id="overview-h" className="h2">What Is <span className="title-secondary">a Cataract?</span></h2>
              <div className={styles.overviewDescription}>
                {content.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>
          <div className={`container ${styles.overviewFeatures}`}>
            <article><span aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M9 5c4 2 5 10 1 14"/></svg></span><strong>Natural Lens Clouding</strong><p>A cataract causes the normally transparent natural lens to become cloudy.</p></article>
            <article><span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg></span><strong>Reduced Visual Clarity</strong><p>Cataracts can cause blurred vision, glare and difficulty seeing in low-light conditions.</p></article>
            <article><span aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 7v10m-5-5h10"/></svg></span><strong>Intraocular Lens Replacement</strong><p>Cataract surgery usually replaces the cloudy natural lens with a clear artificial lens.</p></article>
          </div>
        </section>
      }
      afterEditorial={
        <>
          <section id="when" className={styles.signs} aria-labelledby="when-h">
            <div className="container">
              <div className={styles.centerHead}>
                <p className="kicker">Know the Symptoms</p>
                <h2 id="when-h" className="h2"><HeadingText>{content.seekHelp.heading}</HeadingText></h2>
              </div>
              <ul className={styles.signGrid}>
                {content.seekHelp.items.map((item, index) => (
                  <li key={item}>
                    <span className={styles.signIcon} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {index === 5 ? <><circle cx="7" cy="13" r="4"/><circle cx="17" cy="13" r="4"/><path d="M11 12h2M3 11 2 9m19 2 1-2"/></> : index % 3 === 0 ? <><path d="M2 12s3.7-6 10-6 10 6 10 6-3.7 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></> : index % 3 === 1 ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/></> : <path d="M20 15.6A8.5 8.5 0 0 1 8.4 4 8.5 8.5 0 1 0 20 15.6Z"/>}
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
                <li className={styles.signWarning}>
                  <strong>When to Seek Urgent Medical Attention</strong>
                  <span>{content.seekHelp.note}</span>
                </li>
              </ul>
            </div>
          </section>
          <section id="journey" className={styles.journey} aria-labelledby="journey-h">
            <div className="container">
              <div className={styles.centerHead}>
                <p className="kicker">Your Cataract Care Journey</p>
                <h2 id="journey-h" className="h2">From Cataract Assessment <span className="title-secondary">to Recovery</span></h2>
                <p className="lead">{content.journeyLead}</p>
              </div>
              <ol className={styles.journeyGrid}>
                {content.journey.map((step, index) => (
                  <li key={step.title}>
                    <div className={styles.journeyImage}>
                      <Image src={journeyImages[index]} alt="" fill sizes="(min-width: 960px) 180px, 35vw" />
                      <span className={styles.journeyNumber}>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                    {index < content.journey.length - 1 && (
                      <span className={styles.journeyConnector} aria-hidden="true">
                        <ArrowDownIcon width={19} height={19} />
                      </span>
                    )}
                  </li>
                ))}
              </ol>
              <p className={styles.videoNote}>Please tell your doctor about existing medical conditions, allergies and medicines you take. Do not stop prescribed medicines without medical advice.</p>
              <p className={styles.videoNote}><strong>After surgery, seek urgent ophthalmic assessment</strong> for increasing eye pain, worsening redness, reduced vision, or sudden flashes or floaters.</p>
            </div>
          </section>
        </>
      }
      video={videos.length > 0 ?
        <section id="watch" className={styles.videos} aria-labelledby="watch-h">
          <div className="container">
            <div className={styles.centerHead}>
              <p className="kicker">Insights from Your Doctor</p>
              <h2 id="watch-h" className="h2">Understanding Cataract Surgery <span className="title-secondary">with Dr. Poonam Jain</span></h2>
              <p className="lead">Learn about cataract symptoms, surgical treatment, intraocular lens options and postoperative care through educational videos from Dr. Poonam Jain.</p>
            </div>
            <CataractVideoCarousel videos={videos.map((video) => {
              const props = playerProps(video);
              const copy = props.videoId ? VIDEO_COPY[props.videoId] : undefined;
              return {
                id: video.id,
                videoId: props.videoId || "",
                title: copy?.title ?? video.title,
                description: copy?.description ?? video.description,
                poster: props.poster || "/images/cataract-thumbnail1.jpg",
                watchUrl: props.watchUrl || `https://www.youtube.com/watch?v=${props.videoId}`,
                language: video.language,
                category: CATEGORY_LABEL[video.category],
              };
            })} />
            <p className={styles.videoNote}>These videos provide general educational information. Ask your ophthalmologist for individual treatment and recovery instructions.</p>
          </div>
        </section> : undefined}
    >
      <ClinicalFigure
        id="eyeCompare"
        eyebrow="Understanding Your Eye"
        heading="A Normal Eye vs. an Eye with a Cataract"
        intro="Understand how clouding of the natural lens can affect the quality of your vision."
        note="Simplified educational diagrams showing differences in light transmission."
      />

      <ClinicalFigure
        id="cataractPatterns"
        heading="Understanding Different Types of Cataracts"
        intro="Cataracts are classified partly by where clouding develops within the natural lens. A person may have more than one type at the same time."
        note="These illustrations show common sites of lens clouding. An eye examination is needed to determine cataract type and severity."
      />

      <ClinicalFigure
        id="lensCompare"
        eyebrow="Understanding Cataract Vision"
        heading="How Cataracts Can Affect Your Vision"
        intro="Explore how cataracts may affect visual clarity, colour perception, contrast and sensitivity to glare."
        note="These images are simplified educational simulations. Actual symptoms vary between individuals and cataract types. A simulation cannot determine how severe your cataract is or whether you need surgery."
      />

      <section id="lenses" className="section section--graphite" aria-labelledby="lenses-h">
        <div className="container">
          <div className={styles.lensPanel}>
            <div className={styles.lensContent}>
              <div className="section-head">
                <p className="kicker">Choosing Your Intraocular Lens</p>
                <h2 id="lenses-h" className="h2">Understanding <span className="title-secondary">Intraocular Lenses (IOLs)</span></h2>
              </div>
              <div className="about-body">
                <p>During cataract surgery, the cloudy natural lens is usually replaced with an artificial intraocular lens (IOL).</p>
                <p>Monofocal lenses provide one main focal distance. Multifocal and extended depth of focus (EDOF) lenses are designed to provide a broader range of vision. Toric lenses help correct suitable forms of corneal astigmatism and can be combined with different focal designs.</p>
                <p>The most appropriate lens depends on your eye measurements, corneal and retinal health, existing eye conditions, lifestyle and visual expectations.</p>
                <p>Your ophthalmologist will discuss the benefits, limitations and potential visual side effects of suitable lens options. No intraocular lens guarantees complete independence from spectacles.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClinicalFigure
        id="lensDesigns"
        heading="Understanding Replacement Lens Designs"
        intro="Explore four general lens categories. Your ophthalmologist can confirm which options are suitable and available to you."
      />

      <ClinicalFigure
        id="cataractSteps"
        eyebrow="Understanding the Procedure"
        heading="How Cataract Surgery Works"
        intro="A simplified overview of how the cloudy natural lens is removed and replaced with an artificial intraocular lens."
      />
    </ServiceLayout>
  );
}
