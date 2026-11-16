import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";
import Image from "next/image";
import VideoPlayer from "@/components/VideoPlayer";
import { SERVICE_CONTENT } from "@/content/services";
import { videosFor } from "@/content/videos";
import { playerProps } from "@/lib/videoProps";
import styles from "./cataract.module.css";

export const metadata = serviceMetadata("cataract");

const journeyImages = [
  "/images/aesthetic/assessment-slit-exam-hq.webp",
  "/images/aesthetic/doctor-exam-dsc06826.webp",
  "/images/aesthetic/eye-exam-chart.webp",
  "/images/cataract-hero-clean-v2.webp",
  "/images/aesthetic/doctor-exam-dsc06796.webp",
];

export default function Page() {
  const content = SERVICE_CONTENT.cataract;
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
                  <strong>Intraocular</strong>
                  <span>Lens (IOL)</span>
                </div>
                <svg className={styles.calloutPointer} viewBox="0 0 172 74" fill="none" aria-hidden="true">
                  <line x1="172" y1="0" x2="6" y2="64" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="6" cy="64" r="8" fill="rgba(255, 255, 255, 0.35)" />
                  <circle cx="6" cy="64" r="4.2" fill="#ffffff" />
                </svg>
              </div>
            </div>
            <div className={styles.overviewCopy}>
              <p className="kicker">Comprehensive vision care</p>
              <h2 id="overview-h" className="h2">What is a Cataract</h2>
              <div className={styles.overviewDescription}>
                {content.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>
          <div className={`container ${styles.overviewFeatures}`}>
            <article><span aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M9 5c4 2 5 10 1 14"/></svg></span><strong>Natural lens clouding</strong><p>A cataract makes the eye’s natural lens cloudy.</p></article>
            <article><span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg></span><strong>Blurred or dim vision</strong><p>Clarity can gradually reduce as the cataract develops.</p></article>
            <article><span aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 7v10m-5-5h10"/></svg></span><strong>Clear artificial lens</strong><p>Surgery usually replaces the clouded lens with an IOL.</p></article>
          </div>
        </section>
      }
      afterEditorial={
        <>
          <section id="when" className={styles.signs} aria-labelledby="when-h">
            <div className="container">
              <div className={styles.centerHead}>
                <p className="kicker">Know the signs</p>
                <h2 id="when-h" className="h2">{content.seekHelp.heading}</h2>
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
                  <strong>Urgent Medical Attention:</strong>
                  <span>{content.seekHelp.note}</span>
                </li>
              </ul>
            </div>
          </section>
          <section id="journey" className={styles.journey} aria-labelledby="journey-h">
            <div className="container">
              <div className={styles.centerHead}>
                <p className="kicker">What to expect</p>
                <h2 id="journey-h" className="h2">What an assessment involves</h2>
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
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </>
      }
      video={videos.length > 0 ?
        <section id="watch" className={styles.videos} aria-labelledby="watch-h">
          <div className="container">
            <div className={styles.centerHead}>
              <p className="kicker">Watch</p>
              <h2 id="watch-h" className="h2">Videos on this topic</h2>
              <p className="lead">Dr. Poonam Jain&apos;s centre shares short videos on its YouTube channel and in its own footage.</p>
            </div>
            <div className={styles.videoGrid}>
              {videos.map((video) => <VideoPlayer key={video.id} v={playerProps(video)} showMeta sizes="(min-width: 960px) 33vw, 100vw" />)}
            </div>
            <p className={styles.videoNote}>Videos are general information, not a substitute for an examination. They complement the written information on this page.</p>
          </div>
        </section> : undefined}
    >
      <ClinicalFigure
        id="eyeCompare"
        heading="A normal eye and an eye with a cataract"
        intro="Compare a clear natural lens with one affected by a cataract."
      />

      <ClinicalFigure
        id="cataractPatterns"
        heading="Clear lens and common cataract patterns"
        intro="Compare a clear natural lens with a lens affected by a cataract, then see where three common patterns of clouding can develop. Your examination determines what applies to your eye."
      />

      <ClinicalFigure
        id="lensCompare"
        heading="How a clouded lens can change what you see"
        intro="Drag across the picture to compare a clear view with an illustration of clouded vision."
      />

      <section id="lenses" className="section section--graphite" aria-labelledby="lenses-h">
        <div className="container">
          <div className={styles.lensPanel}>
            <div className={styles.lensContent}>
              <div className="section-head">
                <p className="kicker">Choosing a lens</p>
                <h2 id="lenses-h" className="h2">About replacement lenses</h2>
              </div>
              <div className="about-body">
                <p>
                  Artificial lenses come in different designs. Monofocal lenses usually have one main
                  focus; multifocal and extended depth of focus (EDOF) designs aim to cover more than
                  one distance. Toric designs address astigmatism and may overlap with these categories.
                </p>
                <p>
                  Which design suits you depends on your eye measurements, daily activities and expectations. The doctor explains the limits of each option; spectacles may still be needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClinicalFigure
        id="lensDesigns"
        heading="Understanding replacement lens designs"
        intro="Explore four design terms. They are general categories, not a list of implants confirmed to be available at this centre."
      />

      <ClinicalFigure
        id="cataractSteps"
        heading="Cataract surgery in 4 simple steps"
        intro="A simple visual guide to what happens in cataract surgery, one step at a time."
        showNote={false}
      />
    </ServiceLayout>
  );
}
