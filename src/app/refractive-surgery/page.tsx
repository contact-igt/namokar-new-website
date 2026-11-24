import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import HomeCta from "@/components/HomeCta";
import ServicesFaqSection from "@/components/ServicesFaqSection";
import ExpertEyeCareSection from "@/components/ExpertEyeCareSection";
import JsonLd from "@/components/JsonLd";
import { LINKS, TEL_HREF } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { webPage } from "@/lib/schema";
import {
  REFRACTIVE_SECTIONS as content,
  REFRACTIVE_COMPARISON as comparison,
  REFRACTIVE_FAQS as faqs,
} from "@/content/refractive";
import RefractiveEvaluationWorkup from "./RefractiveEvaluationWorkup";
import CataractVideoCard from "@/app/stitchless-cataract-surgery/CataractVideoCard";
import RefractiveProcedureShowcase from "./RefractiveProcedureShowcase";
import TreatmentExperience from "./TreatmentExperience";
import AftercareCarousel from "./AftercareCarousel";
import RefractiveReveal from "./RefractiveReveal";
import RefractiveIcon, { type RefractiveIconName } from "./RefractiveIcon";
import styles from "./refractive.module.css";
import videoStyles from "@/components/ServiceVideoSection.module.css";

export const metadata: Metadata = pageMeta("refractive", {
  title: "Refractive Surgery & Laser Vision Correction in Delhi | Namokar",
  description:
    "Explore modern refractive surgery options including LASIK, PRK, ReLEx SMILE, ICL, and IPCL at Namokar Eye & Oculoplasty Centre in Ashok Vihar, Delhi.",
});

const relatedCareItems = [
  {
    title: "Comprehensive Eye Examinations",
    desc: content[11].paragraphs[0].replace(/^[^:]+:\s*/, ""),
    href: LINKS.exams,
    image: "/images/services/eye-examination-care.webp",
    alt: "Comprehensive eye examination with slit lamp technology",
  },
  {
    title: "Cataract Surgery",
    desc: content[11].paragraphs[1].replace(/^[^:]+:\s*/, ""),
    href: LINKS.cataract,
    image: "/images/services/cataract-care.webp",
    alt: "Cataract surgery consultation and slit-lamp eye assessment",
  },
  {
    title: "Glaucoma Management",
    desc: content[11].paragraphs[2].replace(/^[^:]+:\s*/, ""),
    href: LINKS.glaucoma,
    image: "/images/services/glaucoma-care.webp",
    alt: "Glaucoma diagnostic evaluation and eye pressure testing",
  },
];

const errorCards = [
  {
    title: "Myopia (Nearsightedness)",
    desc: content[1].paragraphs[1].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/myopia-final.webp",
    alt: "Sharp nearby leaves and window latch with blurred distant scenery",
  },
  {
    title: "Hyperopia (Farsightedness)",
    desc: content[1].paragraphs[2].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/hyperopia-final.webp",
    alt: "Close smartphone text shown out of focus to suggest near-vision difficulty",
  },
  {
    title: "Astigmatism (Uneven Curvature)",
    desc: content[1].paragraphs[3].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/astigmatism-final.webp",
    alt: "Night streetlights with doubled highlights and directional streaks",
  },
  {
    title: "Presbyopia (Age-Related Near Vision Changes)",
    desc: content[1].paragraphs[4].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/presbyopia-final.webp",
    alt: "Mature hands reading a newspaper with reading glasses nearby",
  },
];

const procedureCards = [
  {
    title: "LASIK",
    fullName: "Laser-Assisted in Situ Keratomileusis",
    tag: "Flap-Based Laser",
    desc: content[3].paragraphs[1].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/redesign/generated-lasik.webp",
    alt: "Diagram illustrating LASIK corneal flap creation and laser ablation",
  },
  {
    title: "PRK",
    fullName: "Photorefractive Keratectomy",
    tag: "Surface Laser",
    desc: content[3].paragraphs[2].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/redesign/generated-prk.webp",
    alt: "Diagram illustrating PRK surface laser reshaping without corneal flap",
  },
  {
    title: "ReLEx SMILE",
    fullName: "Small Incision Lenticule Extraction",
    tag: "Flapless Keyhole",
    desc: content[3].paragraphs[3].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/redesign/generated-smile.webp",
    alt: "Diagram illustrating SMILE keyhole lenticule extraction",
  },
  {
    title: "ICL",
    fullName: "Implantable Collamer Lens",
    tag: "Phakic Intraocular Lens",
    desc: content[3].paragraphs[4].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/redesign/generated-icl.webp",
    alt: "Diagram showing ICL positioning in posterior chamber behind iris",
  },
  {
    title: "IPCL",
    fullName: "Implantable Phakic Contact Lens",
    tag: "Hybrid Phakic Lens",
    desc: content[3].paragraphs[5].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/redesign/generated-ipcl.webp",
    alt: "Diagram showing IPCL positioning preserving natural crystalline lens",
  },
];

const eligibilityCards = [
  {
    title: "Age and Visual Maturity",
    icon: "clock" as RefractiveIconName,
    desc: content[5].paragraphs[1].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Stable Spectacle Prescription",
    icon: "calendar" as RefractiveIconName,
    desc: content[5].paragraphs[2].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Healthy Corneal Structure",
    icon: "eye" as RefractiveIconName,
    desc: content[5].paragraphs[3].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Healthy Ocular Surface",
    icon: "drop" as RefractiveIconName,
    desc: content[5].paragraphs[4].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Suitable Internal Eye Anatomy",
    icon: "lens" as RefractiveIconName,
    desc: content[5].paragraphs[5].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Overall Eye and General Health",
    icon: "shield" as RefractiveIconName,
    desc: content[5].paragraphs[6].replace(/^[^:]+:\s*/, ""),
  },
];

const journeySteps = [
  {
    number: "01",
    icon: "clipboard" as RefractiveIconName,
    title: "Arrival and Preparation",
    desc: content[7].paragraphs[1].replace(/^[^:]+:\s*/, ""),
  },
  {
    number: "02",
    icon: "eye" as RefractiveIconName,
    title: "Eye Positioning and Comfort",
    desc: content[7].paragraphs[2].replace(/^[^:]+:\s*/, ""),
  },
  {
    number: "03",
    icon: "laser" as RefractiveIconName,
    title: "Laser Correction or Lens Implantation",
    desc: content[7].paragraphs[3].replace(/^[^:]+:\s*/, ""),
  },
  {
    number: "04",
    icon: "check" as RefractiveIconName,
    title: "Postoperative Examination and Instructions",
    desc: content[7].paragraphs[4].replace(/^[^:]+:\s*/, ""),
  },
];

const recoveryCards = [
  {
    title: "Common Early Sensations",
    icon: "eye" as RefractiveIconName,
    desc: content[8].paragraphs[1].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Prescribed Eye Drops",
    icon: "drop" as RefractiveIconName,
    desc: content[8].paragraphs[2].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Avoiding Eye Rubbing",
    icon: "wash" as RefractiveIconName,
    desc: content[8].paragraphs[3].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Water and Environmental Precautions",
    icon: "shield" as RefractiveIconName,
    desc: content[8].paragraphs[4].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Returning to Daily Activities",
    icon: "activity" as RefractiveIconName,
    desc: content[8].paragraphs[5].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Follow-Up Examinations",
    icon: "calendar" as RefractiveIconName,
    desc: content[8].paragraphs[6].replace(/^[^:]+:\s*/, ""),
  },
];

const urgentGuidance = content[8].paragraphs[7].replace(/^[^:]+:\s*/, "");

const riskCards = [
  {
    title: "Reduced Dependence on Glasses",
    icon: "glasses" as RefractiveIconName,
    desc: "Surgery aims to reduce dependence on glasses, not guarantee permanent spectacle-free vision. Some activities, residual prescriptions and age-related changes may still require correction. Healing affects results.",
  },
  {
    title: "Dry Eye and Ocular Surface Symptoms",
    icon: "drop" as RefractiveIconName,
    desc: "Laser treatment may cause dryness and fluctuating vision. Drops may help, but symptoms can persist. Assess existing dry eye before surgery; ongoing symptoms need review.",
  },
  {
    title: "Glare, Halos, and Night Vision Changes",
    icon: "night" as RefractiveIconName,
    desc: "Glare, halos and starbursts may improve with healing but can persist and affect night driving. Discuss pupil size, visual needs and existing night-vision difficulties during assessment.",
  },
  {
    title: "Residual Prescription or Later Changes",
    icon: "target" as RefractiveIconName,
    desc: "Healing or later eye changes may alter vision. Glasses, contact lenses or further treatment may be considered after stability. Additional surgery is not always suitable.",
  },
  {
    title: "Procedure-Specific Complications",
    icon: "shield" as RefractiveIconName,
    desc: "LASIK has flap risks; PRK may involve delayed healing or haze; SMILE has lenticule risks. ICL/IPCL need lens-clearance, cataract, endothelial-cell and pressure monitoring. Infection, corneal weakening and sight loss are uncommon but important risks.",
  },
  {
    title: "Age-Related Vision Changes",
    icon: "calendar" as RefractiveIconName,
    desc: "Surgery does not stop lens aging. Presbyopia may require reading glasses, and cataracts can develop. Keep preoperative records and inform future eye-care providers about previous treatments.",
  },
];

export default function RefractiveSurgeryPage() {
  return (
    <main id="main" className={styles.page}>
      <RefractiveReveal />
      <JsonLd
        page="refractive"
        data={webPage({
          type: "MedicalWebPage",
          path: LINKS.refractive,
          name: content[0].title,
          description: content[0].paragraphs[0],
          about: { type: "MedicalProcedure", name: "Refractive Surgery" },
        })}
      />

      {/* ========================================================
          SECTION 1 — HERO BANNER
          ======================================================== */}
      <section className={styles.hero} aria-labelledby="refractive-hero-h">
        <div className="container">
          <Breadcrumb
            current="Refractive Surgery"
            trail={[{ label: "Services", href: LINKS.allServices }]}
          />

          <div className={styles.heroCopy}>
            <p className="kicker">{content[0].eyebrow}</p>

            <h1 id="refractive-hero-h">{content[0].title}</h1>
            <p className={styles.heroLead}>{content[0].paragraphs[0]}</p>

            <div className={styles.actions}>
              <a className="btn btn--primary" href={TEL_HREF}>
                Call to Book an Appointment
              </a>
              <a className="btn" href="#treatment-options">
                Explore Vision Correction Options
              </a>
            </div>

            <p className={styles.heroNotice}>
              <RefractiveIcon name="shield" />
              <span>
                Suitability, procedure availability, the place of treatment and follow-up require an individual discussion.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2 — UNDERSTANDING REFRACTIVE ERRORS
          ======================================================== */}
      <section id="refractive-errors" className={styles.section} aria-labelledby="errors-h">
        <div className="container">
          <header className={styles.heading}>
            <p className="kicker">{content[1].eyebrow}</p>
            <h2 id="errors-h">{content[1].title}</h2>
          </header>
          <p className={styles.intro}>{content[1].paragraphs[0]}</p>

          <div className={styles.errorsGrid}>
            {errorCards.map((card) => (
              <article key={card.title} className={styles.errorCard}>
                <div className={styles.errorVisual}>
                  <Image src={card.visual} alt={card.alt} width={400} height={240} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3 — TWO PATHWAYS TO VISION CORRECTION
          ======================================================== */}
      <section id="treatment-pathways" className={`${styles.section} ${styles.pathwaySection}`} aria-labelledby="pathways-h">
        <div className="container">
          <header className={styles.heading}>
            <p className="kicker">{content[2].eyebrow}</p>
            <h2 id="pathways-h">{content[2].title}</h2>
          </header>
          <p className={styles.intro}>{content[2].paragraphs[0]}</p>

          <div className={styles.pathwayGrid}>
            <article className={styles.pathwayCard}>
              <div className={styles.pathwayHeader}>
                <span className={styles.pathwayIcon} aria-hidden="true">
                  <RefractiveIcon name="laser" />
                </span>
                <h3 className={styles.pathwayTitle}>Corneal Laser Vision Correction (LASIK, PRK, ReLEx SMILE)</h3>
              </div>
              <div className={styles.pathwayVisual}>
                <Image
                  src="/images/refractive/laser-treatment-photo.webp"
                  alt="Clinical team preparing a patient beneath an ophthalmic laser"
                  width={500}
                  height={280}
                />
              </div>
              <p className={styles.pathwayDesc}>{content[2].paragraphs[1].replace(/^[^:]+:\s*/, "")}</p>
            </article>

            <article className={styles.pathwayCard}>
              <div className={styles.pathwayHeader}>
                <span className={styles.pathwayIcon} aria-hidden="true">
                  <RefractiveIcon name="lens" />
                </span>
                <h3 className={styles.pathwayTitle}>Phakic Intraocular Lens Implantation (ICL, IPCL)</h3>
              </div>
              <div className={styles.pathwayVisual}>
                <Image
                  src="/images/glaucoma-treat-surgery.jpg"
                  alt="Gloved hands preparing sterile ophthalmic surgical instruments"
                  width={500}
                  height={280}
                />
              </div>
              <p className={styles.pathwayDesc}>{content[2].paragraphs[2].replace(/^[^:]+:\s*/, "")}</p>
            </article>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4 — FIVE REFRACTIVE SURGERY PROCEDURES
          ======================================================== */}
      <section id="treatment-options" className={styles.section} aria-labelledby="procedures-h">
        <div className="container">
          <header className={styles.heading}>
            <p className="kicker">{content[3].eyebrow}</p>
            <h2 id="procedures-h">{content[3].title}</h2>
          </header>
          <p className={styles.intro}>{content[3].paragraphs[0]}</p>

          <RefractiveProcedureShowcase procedures={procedureCards} />
        </div>
      </section>

      {/* ========================================================
          SECTION 5 — PROCEDURE COMPARISON
          ======================================================== */}
      <section id="procedure-comparison" className={styles.section} aria-labelledby="comparison-h">
        <div className="container">
          <header className={styles.heading}>
            <p className="kicker">{content[4].eyebrow}</p>
            <h2 id="comparison-h">{content[4].title}</h2>
          </header>
          <p className={styles.intro}>{content[4].paragraphs[0]}</p>

          <div className={styles.comparisonWrap} tabIndex={0} role="region" aria-label="Scrollable procedure comparison">
            {/* Desktop Structured Table */}
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th scope="col">Feature / Aspect</th>
                  {procedureCards.map(proc => <th scope="col" key={proc.title}><Image src={proc.visual} alt={proc.alt} width={240} height={160} sizes="180px" /><span className={styles.comparisonLabel}>{proc.title}</span></th>)}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr key={row.category}>
                    <th scope="row"><RefractiveIcon name={(["laser", "eye", "clock", "calendar"] as RefractiveIconName[])[index]} />{row.category}</th>
                    <td>{row.lasik}</td>
                    <td>{row.prk}</td>
                    <td>{row.smile}</td>
                    <td>{row.icl}</td>
                    <td>{row.ipcl}</td>
                  </tr>
                ))}
              </tbody>
            </table>


          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6 — CANDIDATE ELIGIBILITY & CLINICAL SCREENING
          ======================================================== */}
      <section id="candidacy" className={styles.section} aria-labelledby="candidacy-h">
        <div className="container">
          <header className={styles.heading}>
            <p className="kicker">{content[5].eyebrow}</p>
            <h2 id="candidacy-h">{content[5].title}</h2>
          </header>
          <p className={styles.intro}>{content[5].paragraphs[0]}</p>

          <div className={styles.eligibilityGrid}>
            {eligibilityCards.map((card) => (
              <article key={card.title} className={styles.eligibilityCard}>
                <span className={styles.eligibilityIcon} aria-hidden="true">
                  <RefractiveIcon name={card.icon} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7 — PREOPERATIVE EVALUATION WORKUP (CAROUSEL)
          ======================================================== */}
      <section id="evaluation-workup" className={styles.section} aria-labelledby="workup-h">
        <div className="container">
          <header className={styles.heading}>
            <p className="kicker">{content[6].eyebrow}</p>
            <h2 id="workup-h">{content[6].title}</h2>
          </header>
          <RefractiveEvaluationWorkup />
        </div>
      </section>

      {/* ========================================================
          SECTION 8 — WHAT TO EXPECT ON THE DAY OF SURGERY
          ======================================================== */}
      <section id="surgery-day" className={styles.section} aria-labelledby="journey-h">
        <div className="container">
          <header className={styles.heading}>
            <p className="kicker">{content[7].eyebrow}</p>
            <h2 id="journey-h">{content[7].title}</h2>
          </header>
          <p className={styles.intro}>{content[7].paragraphs[0]}</p>

          <TreatmentExperience stages={journeySteps} />
        </div>
      </section>

      {/* ========================================================
          SECTION 9 — RECOVERY, AFTERCARE, AND WHAT TO EXPECT
          ======================================================== */}
      <section id="recovery" className={styles.section} aria-labelledby="recovery-h">
        <div className="container">
          <header className={styles.heading}>
            <p className="kicker">{content[8].eyebrow}</p>
            <h2 id="recovery-h">{content[8].title}</h2>
          </header>
          <p className={styles.intro}>{content[8].paragraphs[0]}</p>

          <AftercareCarousel>
            {recoveryCards.map((card, index) => (
              <article
                key={card.title}
                className={styles.recoveryCard}
              >
                <Image className={styles.recoveryIllustration} src={'/images/refractive/redesign/generated-' + ['ripples','drop','goggles','splash','laptop','calendar','shield'][index] + '.webp'} alt="" width={480} height={300} sizes="(max-width:639px) 90vw, 25vw" />
                <span className={styles.recoveryIcon} aria-hidden="true">
                  <RefractiveIcon name={card.icon} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </AftercareCarousel>
          <aside className={styles.precautions} aria-labelledby="precautions-h">
            <RefractiveIcon name="cross" />
            <div>
            <h3 id="precautions-h">Important Precautions</h3>
            <p>{urgentGuidance}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* ========================================================
          SECTION 10 — REALISTIC EXPECTATIONS, RISKS & LIMITATIONS
          ======================================================== */}
      <section id="risks-limitations" className={styles.section} aria-labelledby="risks-h">
        <div className="container">
          <header className={styles.heading}>
            <p className="kicker">{content[9].eyebrow}</p>
            <h2 id="risks-h">{content[9].title}</h2>
          </header>
          <p className={styles.intro}>{content[9].paragraphs[0]}</p>

          <div className={styles.risksGrid}>
            {riskCards.map((card, index) => (
              <article key={card.title} className={styles.riskCard}>
                <div className={styles.riskHeader}>
                  <span className={styles.riskIcon} aria-hidden="true"><RefractiveIcon name={card.icon} /></span>
                  <h3>{card.title}</h3>
                </div>
                <div className={styles.riskBody}><p>{card.desc}</p><div className={styles.riskVisual}><Image src={'/images/refractive/redesign/generated-' + ['glasses','drop','glare','chart','shield','calendar'][index] + '.webp'} alt="" width={240} height={200} sizes="(max-width:639px) 40vw, 180px" /></div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 11 — VIDEOS ON THIS TOPIC
          ======================================================== */}
      <section id="videos" className={styles.section} aria-labelledby="videos-h">
        <div className="container">
          <header className={styles.heading}>
            <p className="kicker">{content[10].eyebrow}</p>
            <h2 id="videos-h">{content[10].title}</h2>
            <p className={styles.intro}>Watch Dr. Poonam Jain’s featured contact lens care video, then explore third-party educational videos on refractive surgery options, implantable lenses and LASIK risks. Videos provide general information and do not replace an eye examination.</p>
          </header>

          <div className={videoStyles.layout}>
          <div className={videoStyles.featured}>
            <span className={videoStyles.label}>Featured Video</span>
            <CataractVideoCard
              videoId="B6JggoiqX9I"
              title="क्या आप कॉन्टेक्ट लेंस पहनते हैं तो ध्यान रखें"
              description="Dr. Poonam Jain discusses contact-lens care in Hindi. This is education about non-surgical vision correction, not a guide to LASIK or implanted-lens surgery."
              poster="https://i.ytimg.com/vi/B6JggoiqX9I/hqdefault.jpg"
              watchUrl="https://www.youtube.com/watch?v=B6JggoiqX9I"
              category="Official Namokar · Contact-lens care"
              autoplay={true}
            />
          </div>
          <h3 className={videoStyles.heading}>More Videos on Refractive Surgery</h3>
          <div className={videoStyles.grid}>
            {[
              { id: "OB9q-YR6RhA", title: "LASIK, PRK, SMILE or ICL? Choose the Right Refractive Surgery", channel: "Centre For Sight Eye Institute and Hospitals" },
              { id: "LXFvvclY7O4", title: "What Is an Implantable Collamer Lens (ICL)?", channel: "Doctify" },
              { id: "EmtYivWUH7I", title: "LASIK Surgery and Its Risks", channel: "U.S. Food and Drug Administration" },
            ].map(video => <CataractVideoCard key={video.id} videoId={video.id} title={video.title} description={video.channel} poster={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} watchUrl={`https://www.youtube.com/watch?v=${video.id}`} category="Third-party educational video" autoplay={true} />)}
          </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 12 — RELATED CARE
          ======================================================== */}
      <ExpertEyeCareSection
        id="related"
        heading="Related Care"
        subtitle="Explore related eye care services at Namokar Eye & Oculoplasty Centre."
        showBanner={false}
        serviceRelated
        items={relatedCareItems}
      />

      {/* ========================================================
          SECTION 13 — FREQUENTLY ASKED QUESTIONS
          ======================================================== */}
      <ServicesFaqSection
        items={faqs}
        heading="Frequently Asked Questions About Refractive Surgery"
        lead={content[12].paragraphs[0]}
        serviceStyle
        allClosed
        image="/images/452e8467-0cbd-4c38-a11d-1ca6ff9f6035.png"
      />

      {/* ========================================================
          SECTION 14 — CONSULTATION
          ======================================================== */}
      <HomeCta
        id="refractive-consultation"
        kicker="TAKE THE FIRST STEP"
        heading="Arrange a Refractive Surgery Consultation"
        desc={content[13].paragraphs[0]}
      />
    </main>
  );
}
