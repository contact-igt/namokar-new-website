import type { Metadata } from "next";
import Image from "next/image";
import {
  Activity, AlertTriangle, Calendar, Camera, ClipboardList, Clock, Contrast, Droplet, Eye,
  Focus, Glasses, HeartHandshake, HeartPulse, Layers3, MessageSquare, PanelTopOpen, ScanLine, ScanSearch,
  ShieldCheck, Stethoscope, Users, Waves, Zap,
} from "lucide-react";
import CataractVideoCard from "@/app/stitchless-cataract-surgery/CataractVideoCard";
import BookButton from "@/components/BookButton";
import Breadcrumb from "@/components/Breadcrumb";
import ExpertEyeCareSection from "@/components/ExpertEyeCareSection";
import HomeCta from "@/components/HomeCta";
import ServicesFaqSection from "@/components/ServicesFaqSection";
import serviceHeroStyles from "@/components/ServicePageHero.module.css";
import videoStyles from "@/components/ServiceVideoSection.module.css";
import squintStyles from "@/app/squint-correction-strabismus-delhi/squint.module.css";
import { LINKS, serviceByKey } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import { pageMeta, withBrand } from "@/lib/seo";
import { conditions, diagnostics, faqs, pathways, risks, symptoms, urgent } from "./content";
import TreatmentCarousel from "./TreatmentCarousel";
import styles from "./retina.module.css";

const service = serviceByKey("retina");

const trustBadges = [
  { label: "28+ Years of Clinical Experience", Icon: Clock },
  { label: "Comprehensive Eye Care", Icon: Eye },
  { label: "Patient-Centred Care", Icon: HeartHandshake },
];

const symptomIcons = [ScanSearch, Zap, Eye, Waves, Contrast, PanelTopOpen];
const riskIcons = [Droplet, Calendar, HeartPulse, Glasses, Eye, Users];
const conditionIcons = [Activity, Droplet, Focus, ScanLine, Layers3, HeartPulse];
const diagnosticIcons = [Stethoscope, Droplet, Layers3, Camera, ClipboardList];

export const metadata: Metadata = pageMeta("retina", {
  title: withBrand("Retina Care & Surgery in Ashok Vihar, Delhi"),
  description: "Learn about retinal examinations, diabetic eye disease, urgent warning signs and treatment pathways. Arrange a retina consultation at Namokar in Ashok Vihar.",
});

const related = [
  { title: "Comprehensive Eye Examinations", href: LINKS.exams, desc: "Review your vision and overall eye health, including the back of the eye when indicated.", image: "/images/services/eye-examination-care.webp", alt: "Comprehensive eye examination" },
  { title: "Cataract Surgery", href: LINKS.cataract, desc: "Discuss cloudy vision, cataract assessment and appropriate next steps.", image: "/images/services/cataract-care.webp", alt: "Cataract care assessment" },
  { title: "Glaucoma Management", href: LINKS.glaucoma, desc: "Explore assessment and follow-up for glaucoma and optic nerve health.", image: "/images/services/glaucoma-care.webp", alt: "Glaucoma eye care" },
];

function RetinaPhoto({ name, alt, sizes, priority = false }: { name: string; alt: string; sizes: string; priority?: boolean }) {
  return <Image src={`/images/retina/${name}.webp`} alt={alt} width={name === "risk" ? 800 : 1200} height={800} sizes={sizes} preload={priority} />;
}

export default function Page() {
  const online = onlineBookingAvailable();
  return (
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="retina-title">
        <div className="container">
          <Breadcrumb current={service.title} trail={[{ label: "Our Services", href: LINKS.allServices }]} />
          <div className={styles.heroGrid}>
            <div>
              <p className={serviceHeroStyles.kicker}>
                <span className={serviceHeroStyles.kickerBar} aria-hidden="true" />
                <span>Retinal health and early detection</span>
              </p>
              <h1 id="retina-title" className={serviceHeroStyles.heading}>
                <span>Retina Care &amp;</span>{" "}<span className="title-secondary">Surgery</span>
              </h1>
              <div className={`${serviceHeroStyles.intro} ${styles.heroIntro}`}>
                <p className={`h3 ${styles.heroSubtitle}`}>Protecting retinal health with timely evaluation and treatment</p>
                <p className={serviceHeroStyles.lead}>Retinal changes can affect sight before you notice symptoms. An examination helps identify the cause and guide treatment or long-term monitoring.</p>
              </div>
            </div>
            <figure className={styles.heroPhoto}>
              <RetinaPhoto name="hero" alt="Illustrative clinical photograph of an eye examination with a hand-held lens" sizes="(min-width: 960px) 48vw, 92vw" priority />
            </figure>
            <div className={styles.actions}>
              <BookButton
                online={online}
                label={<>
                  <span className={styles.appointmentLabel}>{online ? "Request a Consultation" : "Call to Book an Appointment"}</span>
                  <span className={styles.mobileAppointmentLabel}>{online ? "Request Consultation" : "Book Appointment"}</span>
                </>}
              />
              <a href="#retina-warning-signs" className="btn btn--secondary"><AlertTriangle size={18} aria-hidden="true" /><span>See the Warning Signs</span></a>
            </div>
          </div>
          <ul className={styles.trustBadges} aria-label="Namokar highlights">
            {trustBadges.map(({ label, Icon }) => <li key={label}><Icon aria-hidden="true" />{label}</li>)}
          </ul>
        </div>
      </section>

      <section id="understanding-retina" className={`${styles.section} ${styles.peachWave}`} aria-labelledby="retina-overview">
        <div className="container">
          <div className={styles.overview}>
            <div>
              <p className="kicker">Understanding your vision</p>
              <h2 className="h2" id="retina-overview">What is retina care?</h2>
              <p className="lead">The retina is the light-sensitive layer at the back of the eye. It turns light into signals for the brain. Its central area, the macula, helps you read and see fine detail.</p>
            </div>
            <figure className={`${styles.eyePhoto} ${styles.curvedPhoto}`}>
              <RetinaPhoto name="eye" alt="Macro photograph of a brown eye in natural light" sizes="(min-width: 681px) 40vw, 92vw" />
            </figure>
            <div className={styles.overviewDetails}>
              <div className={styles.overviewHighlights}>
                <article>
                  <Eye aria-hidden="true" />
                  <div><h3 className="h3">Early detection matters</h3><p>Timely care can help protect vision.</p></div>
                </article>
                <article>
                  <ShieldCheck aria-hidden="true" />
                  <div><h3 className="h3">Retinal changes can begin quietly</h3><p>Regular checks when advised can find changes before you notice difficulty seeing.</p></div>
                </article>
              </div>
              <p className={styles.overviewNote}><strong>Bring any previous eye reports.</strong> Older retinal scans or photographs can help your eye doctor compare findings over time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.care} ${styles.peachWave}`} aria-labelledby="retina-approach">
        <div className={`container ${styles.careGrid}`}>
          <div>
            <p className="kicker">Your care at Namokar</p>
            <h2 className="h2" id="retina-approach">Why choose Namokar for retina care?</h2>
            <p className="lead">Start with an eye consultation in Ashok Vihar and discuss the next step based on your symptoms, examination and needs.</p>
            <figure className={styles.carePhoto}>
              <RetinaPhoto name="conversation" alt="Illustrative scene of a clinician discussing a care plan with a patient" sizes="(min-width: 960px) 40vw, 92vw" />
            </figure>
          </div>
          <dl className={styles.careCards}>
            <div><dt className="h3"><Eye aria-hidden="true" />Retinal evaluation</dt><dd>Discuss your vision changes, eye health and relevant medical history.</dd></div>
            <div><dt className="h3"><ScanLine aria-hidden="true" />Tests guided by the findings</dt><dd>Learn whether a closer examination or retinal imaging would help and confirm where it can be arranged.</dd></div>
            <div><dt className="h3"><MessageSquare aria-hidden="true" />Clear, individual guidance</dt><dd>Talk through your options, ask questions and discuss a referral if specialist treatment is needed.</dd></div>
            <div><dt className="h3"><Calendar aria-hidden="true" />Monitoring and follow-up</dt><dd>Discuss what to look out for and when to have your eyes checked again.</dd></div>
          </dl>
        </div>
      </section>

      <section id="retina-warning-signs" className={`${styles.section} ${styles.peachWave}`} aria-labelledby="retina-symptoms">
        <div className="container">
          <div className={styles.symptomGrid}>
            <div>
              <p className="kicker">Changes in vision</p>
              <h2 className="h2" id="retina-symptoms">When should you consider a retina evaluation?</h2>
              <aside className={styles.urgent} aria-labelledby="retina-urgent">
                <AlertTriangle aria-hidden="true" />
                <div><h3 id="retina-urgent" className="h3">Seek urgent eye care</h3><p>{urgent}</p></div>
              </aside>
            </div>
            <figure className={styles.symptomPhoto}>
              <div className={styles.curvedPhoto}>
                <RetinaPhoto name="symptoms" alt="Architectural scene with blurred central detail, illustrating a possible change in vision" sizes="(min-width: 681px) 42vw, 92vw" />
              </div>
              <figcaption>Straight lines may appear wavy or distorted.</figcaption>
            </figure>
          </div>
          <dl className={styles.symptoms}>
            {symptoms.map(([title, text], index) => {
              const Icon = symptomIcons[index];
              return <div key={title}><dt className="h3"><Icon aria-hidden="true" />{title}</dt><dd>{text}</dd></div>;
            })}
          </dl>
        </div>
      </section>

      <section className={`${styles.risk} ${styles.peachWave}`} aria-labelledby="retina-risks">
        <div className={`container ${styles.riskGrid}`}>
          <div>
            <p className="kicker">Who may need regular checks</p>
            <h2 className="h2" id="retina-risks">Risk factors for retinal problems</h2>
            <p className="lead">If any of these apply to you, ask your eye doctor how often to have a retinal examination, even if your vision seems unchanged.</p>
          </div>
          <figure className={`${styles.riskPhoto} ${styles.curvedPhoto}`}>
            <RetinaPhoto name="risk" alt="A glucose meter, blood pressure cuff and spectacles" sizes="(min-width: 681px) 27vw, 70vw" />
          </figure>
          <ul>{risks.map((item, index) => {
            const Icon = riskIcons[index];
            return <li key={item}><Icon aria-hidden="true" />{item}</li>;
          })}</ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.conditions} ${styles.peachWave}`} aria-labelledby="retina-conditions">
        <div className={`container ${styles.conditionGrid}`}>
          <header>
            <p className="kicker">Common conditions</p>
            <h2 className="h2" id="retina-conditions">What can affect the retina?</h2>
            <p className="lead">Retinal conditions can affect central vision, blood vessels or the retinal surface. An examination helps identify the cause.</p>
            <figure className={styles.conditionPhoto}>
              <RetinaPhoto name="retinal-health-review" alt="An ophthalmic examination lens on a clinical tray" sizes="(min-width: 960px) 33vw, (min-width: 681px) 45vw, 92vw" />
            </figure>
          </header>
          <div className={styles.conditionList}>
            {conditions.map(([area, title, text], index) => {
              const Icon = conditionIcons[index];
              return (
                <article key={title}>
                  <div className={styles.conditionLabel}>
                    <Icon aria-hidden="true" />
                    <div><h3 className="h3">{title}</h3><p className={styles.area}>{area}</p></div>
                  </div>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.diagnostics} aria-labelledby="retina-diagnostics">
        <div className={`container ${styles.diagnosticsGrid}`}>
          <header>
            <p className="kicker">What an examination can involve</p>
            <h2 className="h2" id="retina-diagnostics">Retina evaluation and diagnostics</h2>
            <p className="lead">The right tests depend on your symptoms and examination findings. Ask the centre which tests can be arranged and whether a referral is needed.</p>
          </header>
          <dl className={styles.diagnosticCards}>
            {diagnostics.map(([title, text], index) => {
              const Icon = diagnosticIcons[index];
              return <div key={title}><dt className="h3"><Icon aria-hidden="true" />{title}</dt><dd>{text}</dd></div>;
            })}
          </dl>
        </div>
      </section>

      <section className={`${styles.section} ${styles.treatment}`} aria-labelledby="retina-treatment">
        <div className="container">
          <header className={styles.treatmentIntro}>
            <p className="kicker">From diagnosis to follow-up</p>
            <h2 className="h2" id="retina-treatment">Retina treatment and care options</h2>
            <p className="lead">Next steps depend on your diagnosis, how urgently care is needed and your overall eye health. A consultation can clarify the options and whether specialist referral is appropriate.</p>
          </header>
          <TreatmentCarousel>
            {pathways.map(([title, text, image, alt]) => (
              <article key={title}>
                <RetinaPhoto name={image} alt={alt} sizes="(min-width: 960px) 22vw, (min-width: 641px) 42vw, 75vw" />
                <div><h3 className="h3">{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </TreatmentCarousel>
        </div>
      </section>

      <section className={`${styles.section} ${styles.peachWave}`} aria-labelledby="retina-benefits">
        <div className="container">
          <div className={styles.benefits}>
            <div className={styles.benefitsHeading}>
              <span className={styles.benefitsIcon} aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 15s6-9 17-9 17 9 17 9-6 9-17 9S7 15 7 15Z" />
                  <circle cx="24" cy="15" r="6.5" />
                  <path d="M22 43v-3.3a7 7 0 0 0-3.3-5.9l-6.5-4a2 2 0 0 0-2.6 3l4 3.4M15.5 43l-7-5.4a10 10 0 0 1-3.5-5.1l-2-8.2a1.6 1.6 0 0 1 3-.9l3.6 9.4" />
                  <path d="M26 43v-3.3a7 7 0 0 1 3.3-5.9l6.5-4a2 2 0 0 1 2.6 3l-4 3.4M32.5 43l7-5.4a10 10 0 0 0 3.5-5.1l2-8.2a1.6 1.6 0 0 0-3-.9l-3.6 9.4" />
                </svg>
              </span>
              <h2 className="h2" id="retina-benefits">Benefits of early retina care</h2>
            </div>
            <p className="lead">Finding changes early can allow timely treatment when needed, reduce the risk of preventable vision loss and give your doctor a baseline to monitor your sight over time.</p>
          </div>
        </div>
      </section>

      <section id="videos" className={`${squintStyles.section} ${styles.peachWave}`} aria-labelledby="retina-videos">
        <div className="container">
          <header className={squintStyles.heading}>
            <p className="kicker">Watch</p>
            <h2 id="retina-videos" className="h2">Videos on this topic</h2>
            <p className={`lead ${squintStyles.videoIntro}`}>Dr. Poonam Jain discusses changes in central vision and the Amsler grid. This video provides general information and does not replace an eye examination.</p>
          </header>
          <div className={`${videoStyles.featured} ${styles.singleVideo}`}>
            <span className={videoStyles.label}>Featured Video</span>
            <CataractVideoCard
              videoId="3NkfnNZg274"
              title="👁️ Can a simple grid chart help detect changes in your retinal health? #shorts"
              description="Dr. Poonam Jain explains how the Amsler grid can draw attention to changes in central vision."
              poster="https://i.ytimg.com/vi/3NkfnNZg274/hqdefault.jpg"
              watchUrl="https://www.youtube.com/watch?v=3NkfnNZg274"
              category="Official Namokar · Retina education"
              language="hi"
            />
          </div>
        </div>
      </section>

      <ServicesFaqSection items={faqs} heading="Frequently Asked Questions About Retina Care" lead="Common questions about retinal examinations, treatment options and follow-up." serviceStyle topic="retina" allClosed online={online} image="/images/452e8467-0cbd-4c38-a11d-1ca6ff9f6035.png" />

      <ExpertEyeCareSection id="related" badge="Related Care" heading="Related Services" subtitle="Explore related eye care services at Namokar Eye & Oculoplasty Centre." showBanner={false} serviceRelated items={related} />

      <HomeCta id="retina-consultation" heading="Book a Consultation for Retina Care" desc="Contact the centre to arrange a retinal evaluation and discuss the next steps for your eyes." online={online} />
    </main>
  );
}
