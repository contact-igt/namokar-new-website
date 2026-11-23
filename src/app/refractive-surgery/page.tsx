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
import RefractiveReveal from "./RefractiveReveal";
import RefractiveIcon, { type RefractiveIconName } from "./RefractiveIcon";
import styles from "./refractive.module.css";

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
    visual: "/images/refractive/myopia.svg",
    alt: "Illustration of myopia with light rays focusing in front of retina",
  },
  {
    title: "Hyperopia (Farsightedness)",
    desc: content[1].paragraphs[2].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/hyperopia.svg",
    alt: "Illustration of hyperopia with light rays focusing behind retina",
  },
  {
    title: "Astigmatism (Uneven Curvature)",
    desc: content[1].paragraphs[3].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/astigmatism.svg",
    alt: "Illustration of astigmatism with multiple focal points",
  },
  {
    title: "Presbyopia (Age-Related Near Vision Changes)",
    desc: content[1].paragraphs[4].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/presbyopia.svg",
    alt: "Illustration of presbyopia with loss of lens focusing flexibility",
  },
];

const procedureCards = [
  {
    title: "LASIK",
    fullName: "Laser-Assisted in Situ Keratomileusis",
    tag: "Flap-Based Laser",
    desc: content[3].paragraphs[1].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/proc-lasik.svg",
    alt: "Diagram illustrating LASIK corneal flap creation and laser ablation",
  },
  {
    title: "PRK",
    fullName: "Photorefractive Keratectomy",
    tag: "Surface Laser",
    desc: content[3].paragraphs[2].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/proc-prk.svg",
    alt: "Diagram illustrating PRK surface laser reshaping without corneal flap",
  },
  {
    title: "ReLEx SMILE",
    fullName: "Small Incision Lenticule Extraction",
    tag: "Flapless Keyhole",
    desc: content[3].paragraphs[3].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/proc-smile.svg",
    alt: "Diagram illustrating SMILE keyhole lenticule extraction",
  },
  {
    title: "ICL",
    fullName: "Implantable Collamer Lens",
    tag: "Phakic Intraocular Lens",
    desc: content[3].paragraphs[4].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/proc-icl.svg",
    alt: "Diagram showing ICL positioning in posterior chamber behind iris",
  },
  {
    title: "IPCL",
    fullName: "Implantable Phakic Contact Lens",
    tag: "Hybrid Phakic Lens",
    desc: content[3].paragraphs[5].replace(/^[^:]+:\s*/, ""),
    visual: "/images/refractive/proc-ipcl.svg",
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
  {
    title: "Symptoms Requiring Prompt Attention",
    icon: "phone" as RefractiveIconName,
    desc: content[8].paragraphs[7].replace(/^[^:]+:\s*/, ""),
    warning: true,
  },
];

const riskCards = [
  {
    title: "Reduced Dependence on Glasses",
    icon: "glasses" as RefractiveIconName,
    desc: content[9].paragraphs[1].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Dry Eye and Ocular Surface Symptoms",
    icon: "drop" as RefractiveIconName,
    desc: content[9].paragraphs[2].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Glare, Halos, and Night Vision Changes",
    icon: "night" as RefractiveIconName,
    desc: content[9].paragraphs[3].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Residual Prescription or Later Changes",
    icon: "target" as RefractiveIconName,
    desc: content[9].paragraphs[4].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Procedure-Specific Complications",
    icon: "shield" as RefractiveIconName,
    desc: content[9].paragraphs[5].replace(/^[^:]+:\s*/, ""),
  },
  {
    title: "Age-Related Vision Changes",
    icon: "calendar" as RefractiveIconName,
    desc: content[9].paragraphs[6].replace(/^[^:]+:\s*/, ""),
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

            {/* Mobile hero image rendered right below eyebrow */}
            <div className={styles.heroMobileMedia}>
              <Image
                src="/images/refractive/refractive-hero.webp"
                alt="Illustrative ophthalmic equipment for refractive surgery assessment"
                width={1790}
                height={879}
                priority
                className={styles.heroMobileImage}
              />
            </div>

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
                  src="/images/refractive/pathway-laser.svg"
                  alt="Corneal laser reshaping cross-sectional diagram"
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
                  src="/images/refractive/pathway-phakic.svg"
                  alt="Phakic lens behind the iris and in front of the natural lens"
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

          <div className={styles.proceduresGrid}>
            {procedureCards.map((proc) => (
              <article key={proc.title} className={styles.procCard}>
                <div className={styles.procVisual}>
                  <Image src={proc.visual} alt={proc.alt} width={360} height={220} />
                </div>
                <span className={styles.procTag}>{proc.tag}</span>
                <h3>{proc.title}</h3>
                <p>{proc.desc}</p>
              </article>
            ))}
          </div>
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

          <div className={styles.comparisonWrap}>
            {/* Desktop Structured Table */}
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th scope="col">Feature / Aspect</th>
                  <th scope="col">LASIK</th>
                  <th scope="col">PRK</th>
                  <th scope="col">ReLEx SMILE</th>
                  <th scope="col">ICL</th>
                  <th scope="col">IPCL</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.category}>
                    <th scope="row">{row.category}</th>
                    <td>{row.lasik}</td>
                    <td>{row.prk}</td>
                    <td>{row.smile}</td>
                    <td>{row.icl}</td>
                    <td>{row.ipcl}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Responsive Cards */}
            <div className={styles.comparisonCardsMobile}>
              {comparison.map((row) => (
                <div key={row.category} className={styles.mobileCompCard}>
                  <h3>{row.category}</h3>
                  <div className={styles.mobileCompItem}>
                    <span className={styles.mobileCompTag}>LASIK</span>
                    <p>{row.lasik}</p>
                  </div>
                  <div className={styles.mobileCompItem}>
                    <span className={styles.mobileCompTag}>PRK</span>
                    <p>{row.prk}</p>
                  </div>
                  <div className={styles.mobileCompItem}>
                    <span className={styles.mobileCompTag}>ReLEx SMILE</span>
                    <p>{row.smile}</p>
                  </div>
                  <div className={styles.mobileCompItem}>
                    <span className={styles.mobileCompTag}>ICL</span>
                    <p>{row.icl}</p>
                  </div>
                  <div className={styles.mobileCompItem}>
                    <span className={styles.mobileCompTag}>IPCL</span>
                    <p>{row.ipcl}</p>
                  </div>
                </div>
              ))}
            </div>
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

          <ol className={styles.journeySteps}>
            {journeySteps.map((step) => (
              <li key={step.number} className={styles.journeyCard}>
                <div className={styles.journeyTop}><span className={styles.journeyNum}>{step.number}</span><RefractiveIcon name={step.icon} /></div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </li>
            ))}
          </ol>
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

          <div className={styles.recoveryGrid}>
            {recoveryCards.map((card) => (
              <article
                key={card.title}
                className={`${styles.recoveryCard} ${card.warning ? styles.recoveryWarningCard : ""}`}
              >
                <span className={styles.recoveryIcon} aria-hidden="true">
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
            {riskCards.map((card) => (
              <article key={card.title} className={styles.riskCard}>
                <div className={styles.riskHeader}>
                  <span className={styles.riskIcon} aria-hidden="true"><RefractiveIcon name={card.icon} /></span>
                  <h3>{card.title}</h3>
                </div>
                <p>{card.desc}</p>
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
            <p className={styles.intro}>{content[10].paragraphs[0]}</p>
          </header>

          <div className={styles.videosGrid}>
            <CataractVideoCard
              videoId="B6JggoiqX9I"
              title="क्या आप कॉन्टेक्ट लेंस पहनते हैं तो ध्यान रखें"
              description="Dr. Poonam Jain discusses contact-lens care in Hindi. This is education about non-surgical vision correction, not a guide to LASIK or implanted-lens surgery."
              poster="https://i.ytimg.com/vi/B6JggoiqX9I/hqdefault.jpg"
              watchUrl="https://www.youtube.com/watch?v=B6JggoiqX9I"
              category="Official Namokar · Contact-lens care"
            />
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
