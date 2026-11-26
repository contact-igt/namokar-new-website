import HomeFaqSection from "@/components/HomeFaqSection";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AssetImage from "@/components/AssetImage";
import FacilityGallery from "@/components/FacilityGallery";
import Hero from "@/components/Hero";
import HomeCta from "@/components/HomeCta";
import HomeAppointmentPopup from "@/components/HomeAppointmentPopup";
import TreatmentExplorer from "@/components/TreatmentExplorer";
import { treatmentItems } from "@/lib/treatments";
import JsonLd from "@/components/JsonLd";
import { ArrowRightIcon, GraduationCapIcon } from "@/components/Icons";
import NamePlate from "@/components/NamePlate";
import WalkthroughSection from "@/components/WalkthroughSection";
import VideoShelf from "@/components/VideoShelf";
import { ASSETS, usable } from "@/config/assets";
import { PAGES } from "@/config/routes";
import { HOME_DESCRIPTION, HOME_TITLE, LINKS, PRIVACY_URL, SITE, TEL_HREF } from "@/config/site";
import { videosFor } from "@/content/videos";
import { HOME_WHY } from "@/content/why";
import { onlineBookingAvailable } from "@/lib/booking";
import { playerProps } from "@/lib/videoProps";
import { compact, photoItem } from "@/lib/photos";
import { pageMeta } from "@/lib/seo";
import { clinic, faqPage, ids, webPage, website } from "@/lib/schema";
import styles from "./home-redesign.module.css";

/**
 * Title, description and robots come from the root layout. The canonical address is set here
 * (the layout cannot set it, or every page without its own would claim "/"). Like the other
 * pages, openGraph is restated in full because a page-level openGraph replaces the layout's.
 */
export const metadata: Metadata = {
  ...pageMeta("home", { title: HOME_TITLE, description: HOME_DESCRIPTION }),
};

function DoctorIcon({ name }: { name: "calendar" | "team" | "eye" | "cap" | "book" | "award" | "medical" | "lid" | "drop" }) {
  const paths = {
    calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
    team: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0M14 20a4 4 0 0 1 7-1.5" /></>,
    eye: <><path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></>,
    cap: <><path d="m3 10 9-5 9 5-9 5-9-5Z" /><path d="M6 12v4c3 2 9 2 12 0v-4M21 10v6" /></>,
    book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 3H12v16H7.5A3.5 3.5 0 0 0 4 22V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 3H12v16h4.5A3.5 3.5 0 0 1 20 22V5.5Z" /></>,
    award: <><circle cx="12" cy="9" r="5" /><path d="m9 14-2 7 5-3 5 3-2-7" /></>,
    medical: <><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M12 8v8M8 12h8" /></>,
    lid: <><path d="M3 13s3.5 4 9 4 9-4 9-4" /><path d="M5 8.5c4.5 3 9.5 3 14 0M8 17l-1 2m5-1v2m5-3 1 2" /></>,
    drop: <><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" /></>,
  };
  return <svg className="doctor-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function FunctionalConcernIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 12.5c2.4-4.5 5-5.2 7.5-5.2s5.1.7 7.5 5.2c-2.4 4.5-5 5.2-7.5 5.2s-5.1-.7-7.5-5.2Z" />
      <circle cx="10" cy="12.5" r="3.2" />
      <circle cx="10" cy="12.5" r="1.3" fill="currentColor" stroke="none" />
      {/* Medical / clinical functional care badge */}
      <circle cx="18.5" cy="6" r="4.2" strokeWidth="1.8" />
      <path d="M18.5 4v4M16.5 6h4" strokeWidth="1.8" />
      {/* Tear drainage droplet */}
      <path d="M20.5 11c0 0-2 3-2 5a2 2 0 0 0 4 0c0-2-2-5-2-5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AestheticConcernIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 12.5c2.4-4.5 5-5.2 7.5-5.2s5.1.7 7.5 5.2c-2.4 4.5-5 5.2-7.5 5.2s-5.1-.7-7.5-5.2Z" />
      <circle cx="10" cy="12.5" r="3.2" />
      <circle cx="10" cy="12.5" r="1.3" fill="currentColor" stroke="none" />
      <path
        d="M19 2.5c0 1.8 1.4 3.2 3.2 3.2-1.8 0-3.2 1.4-3.2 3.2 0-1.8-1.4-3.2-3.2-3.2 1.8 0 3.2-1.4 3.2-3.2Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M19.5 15.5c0 1.3 1 2.2 2.2 2.2-1.2 0-2.2.9-2.2 2.2 0-1.3-1-2.2-2.2-2.2 1.2 0 2.2-.9 2.2-2.2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}


const faqs = [
  {
    q: "What eye care services does Namokar provide?",
    a: "Namokar provides comprehensive eye examinations, cataract care, glaucoma management, retina care, squint assessment, LASIK and refractive surgery assessment, and specialised functional, reconstructive and aesthetic oculoplasty.",
  },
  {
    q: "Why are regular eye examinations important?",
    a: "Some eye conditions, including glaucoma and diabetic eye disease, may develop without noticeable symptoms. Regular eye examinations help detect changes early and support timely management. Your ophthalmologist can recommend an appropriate examination schedule.",
  },
  {
    q: "When should I consider cataract surgery?",
    a: "Cataract surgery may be recommended when cataracts interfere with daily activities or when there is another clinical reason for treatment. Your ophthalmologist will assess your vision, eye health and individual needs before recommending surgery.",
  },
  {
    q: "Is LASIK suitable for everyone?",
    a: "No. LASIK suitability depends on factors including age, prescription stability, corneal health, corneal thickness and overall eye health. A detailed assessment is necessary to determine whether LASIK or another vision correction option is appropriate.",
  },
  {
    q: "When should I seek urgent eye care?",
    a: "Sudden loss of vision, new flashes or a sudden increase in floaters, a dark curtain across your vision, severe eye pain or an eye injury require urgent medical assessment. Do not wait for a routine appointment.",
  },
  {
    q: "What is oculoplasty?",
    a: "Oculoplasty is a specialised branch of ophthalmology concerned with the eyelids, tear-drainage system, eye socket and surrounding structures. It includes functional, reconstructive and aesthetic procedures.",
  },
  {
    q: "What causes drooping eyelids or ptosis?",
    a: "Ptosis occurs when the upper eyelid sits lower than normal. It can be congenital or develop due to age-related changes, muscle or nerve disorders and other conditions. Sudden eyelid drooping requires urgent medical evaluation, especially if accompanied by double vision, severe headache or unequal pupils.",
  },
  {
    q: "Does every drooping eyelid require surgery?",
    a: "No. Treatment depends on the underlying cause, severity, impact on vision and individual circumstances. Surgery is recommended only when clinically appropriate.",
  },
  {
    q: "Why do my eyes keep watering?",
    a: "Persistent watering can result from dry eyes, irritation, allergies, infection, eyelid abnormalities or tear-drainage obstruction. An eye examination helps identify the cause and determine suitable treatment.",
  },
  {
    q: "Are under-eye bags always treated with surgery?",
    a: "No. Treatment depends on the cause of the under-eye concern, eyelid anatomy, skin changes and individual suitability. Surgical or non-surgical options may be discussed after assessment.",
  },
  {
    q: "What should I bring to my first consultation?",
    a: "Please bring previous eye reports, prescriptions, your current spectacles or contact lens details, and a list of medications you are taking.",
  },
  {
    q: "How can I book an appointment at Namokar?",
    a: `Call Namokar Eye & Oculoplasty Centre on ${SITE.phone.display}. Our team will help you arrange a suitable consultation time.`,
  },
];

export default function Home() {
  const online = onlineBookingAvailable();

  const hasPortrait = usable(ASSETS.homepageDoctorPortrait);
  const gallery = compact([
    photoItem(ASSETS.archCataractExam, {
      title: "Consultation & Eye Examination",
      caption: "Detailed eye assessments supported by appropriate diagnostic equipment.",
      position: "55% 50%",
    }),
    photoItem(ASSETS.archTeamDoctor, {
      title: "Our Team",
      caption: "A dedicated clinical and support team focused on your eye health and care.",
      icon: "/images/multiple-users-silhouette.png",
      position: "50% 40%",
    }),
    photoItem(ASSETS.reception, {
      title: "Reception",
      caption: "A welcoming space designed for patient comfort and convenience.",
      icon: "/images/reception-new.png",
      position: "50% 50%",
    }),
    photoItem(ASSETS.homeDiagnosticsNov, {
      title: "Caring Spaces",
      caption: "Well-maintained clinical spaces supporting patient comfort, hygiene and care.",
      icon: "/images/microscope.png",
      position: "50% 50%",
    }),
  ]);

  return (
    <>
      <JsonLd page="home"
        data={[
          website(),
          clinic(),
          webPage({ path: PAGES.home.path, name: SITE.name, description: HOME_DESCRIPTION, mainEntityId: ids.clinic }),
          faqPage(PAGES.home.path, faqs),
        ]}
      />
      <main id="main" className={styles.homeRedesign}>
        <Hero online={online} />

        {/* Find care: service links with images and short descriptions */}
        <TreatmentExplorer items={treatmentItems()} />

        {/* Hospital introduction: only when at least one photograph is cleared */}
        {gallery.length > 0 && (
          <section id="centre" className="section centre-showcase" aria-labelledby="centre-h">
            <div className="container">
              <div className="centre-head reveal">
                <div>
                  <p className="kicker">Our Facilities</p>
                  <h2 id="centre-h" className="h2">Our <span className="title-secondary">Centre</span></h2>
                </div>
                <div className="centre-copy">
                <p className="lead">
                  Discover Namokar Eye &amp; Oculoplasty Centre, where comprehensive ophthalmic care and specialised oculoplasty come together in a patient-focused clinical environment.
                </p>
                </div>
              </div>
              <FacilityGallery items={gallery} label="Photographs of the centre" showcase />
            </div>
          </section>
        )}

        {/* Explore Namokar: the one clinic walkthrough video */}
        <WalkthroughSection
          lead="Take a closer look at Namokar Eye & Oculoplasty Centre, from our reception and consultation rooms to our eye examination and diagnostic areas."
          video={videosFor("home").filter((v) => v.source === "local").map(playerProps)[0]}
        />

        {/* Doctor */}
        <section id="doctor" className="section doctor-showcase" aria-labelledby="doctor-h">
          <div className="container doctor-grid">
            <figure className="doctor-photo reveal">
              {hasPortrait ? (
                <AssetImage
                  asset={ASSETS.homepageDoctorPortrait}
                  sizes="(min-width: 960px) 40vw, 100vw"
                  className="doctor-img"
                />
              ) : (
                <NamePlate />
              )}
            </figure>
            <div className="doctor-copy doctor-profile-main">
              <header className="doctor-showcase-head">
                <p className="kicker">Meet your doctor</p>
                <h2 id="doctor-h" className="h2 h2--xl">Dr. Poonam <span className="title-secondary">Jain</span></h2>
                <p className="doctor-role">Medical Director | Senior Ophthalmologist &amp; Oculoplastic Surgeon</p>
              </header>
              <p className="lead">
                With over 28 years of clinical and surgical experience, Dr. Poonam Jain is an internationally trained ophthalmologist with specialised expertise in functional, reconstructive and aesthetic oculoplasty.
              </p>
              <p className="lead">She leads Namokar Eye &amp; Oculoplasty Centre, bringing together comprehensive ophthalmic care, personalised treatment and specialised surgical care for the eyelids and surrounding eye structures.</p>
              <p><strong>28+</strong> Years of Experience &nbsp;&bull;&nbsp; <strong>Internationally Trained</strong> Oculoplastic Surgeon</p>
              <div className="doctor-actions">
                <Link href={online ? `${LINKS.contact}#request` : TEL_HREF} className="btn btn--primary doctor-book">
                  Book a Consultation <ArrowRightIcon width={18} height={18} />
                </Link>
                <Link href={LINKS.doctor} className="btn btn--secondary doctor-read-more">
                  Know More About Dr. Poonam Jain <ArrowRightIcon width={18} height={18} />
                </Link>
              </div>
              <div className="doctor-details">
                <section className="doctor-focus" aria-labelledby="doctor-focus-h">
                  <h3 id="doctor-focus-h">Areas of Expertise</h3>
                  <ul>
                    <li><Image className="doctor-clay-icon" src="/images/doctor-expertise-eyelid.webp" alt="" width={64} height={64} /><div><strong>Comprehensive Ophthalmology</strong><span>Diagnosis and management of a wide range of eye conditions.</span></div></li>
                    <li><Image className="doctor-clay-icon" src="/images/doctor-expertise-tear-passage.webp" alt="" width={64} height={64} /><div><strong>Cataract &amp; Vision Correction</strong><span>Individualised assessment and surgical treatment planning for cataracts and refractive concerns.</span></div></li>
                    <li><Image className="doctor-clay-icon" src="/images/doctor-expertise-periocular.webp" alt="" width={64} height={64} /><div><strong>Functional &amp; Reconstructive Oculoplasty</strong><span>Specialised care for eyelid abnormalities, ptosis and tear-drainage disorders.</span></div></li>
                    <li><Image className="doctor-clay-icon" src="/images/doctor-expertise-eye-care.webp" alt="" width={64} height={64} /><div><strong>Aesthetic Oculoplasty</strong><span>Aesthetic eyelid surgery and specialised care for the periocular region.</span></div></li>
                  </ul>
                </section>
                <section className="doctor-timeline" aria-labelledby="doctor-timeline-h">
                  <h3 id="doctor-timeline-h"><span className="doctor-training-heading-icon" aria-hidden="true"><GraduationCapIcon width={22} height={22} /></span>Qualifications &amp; International Training</h3>
                  <ol>
                    <li><strong>Fellowship in Oculoplasty</strong><span>Barraquer Institute, Barcelona, Spain</span></li>
                    <li><strong>Clinical Observership</strong><span>Wilmer Eye Institute, Johns Hopkins, Baltimore, USA</span></li>
                    <li><strong>MS Ophthalmology</strong><span>Safdarjung Hospital, New Delhi</span></li>
                    <li><strong>MBBS</strong><span>Maulana Azad Medical College, New Delhi</span></li>
                  </ol>
                </section>
              </div>
            </div>
          </div>
        </section>

        {/* Doctor-led video shelf: the clinic's own YouTube videos, one player at a time, click to load */}
        <VideoShelf
          videos={videosFor("home").filter((v) => v.source === "youtube").map(playerProps)}
          featured={videosFor("exams").filter((v) => v.source === "youtube" && v.videoId === "82siQa3LgUY").map(playerProps)[0]}
        />

        {/* Oculoplasty */}
        <section id="oculoplasty" className="section oculo-section" aria-labelledby="oculo-h">
          <div className="container oculo-grid">
            <div className="oculo-copy">
              <p className="kicker">Specialised Oculoplasty Care</p>
              <h2 id="oculo-h" className="h2">Advanced Oculoplasty for <span className="title-secondary">Function &amp; Appearance</span></h2>
              <p className="lead">
                Oculoplasty is a specialised branch of ophthalmology that focuses on the eyelids, tear-drainage system, eye socket and surrounding structures.
              </p>
              <p className="lead">At Namokar, functional, reconstructive and aesthetic oculoplasty combine attention to eye health, eyelid function and individual aesthetic concerns, with treatment planned according to each patient&rsquo;s needs.</p>
              <div className="oculo-cards">
                <article className="oculo-card oculo-card--functional">
                  <div className="oculo-card-body">
                    <div className="oculo-card-header">
                      <div className="oculo-card-icon">
                        <FunctionalConcernIcon />
                      </div>
                      <div className="oculo-card-title-group">
                        <h3 className="oculo-card-title">Functional &amp; Reconstructive Care</h3>
                        <div className="oculo-card-bar" aria-hidden="true" />
                      </div>
                    </div>
                    <ul className="oculo-check-list">
                      <li>Drooping eyelids (ptosis)</li>
                      <li>Persistent watering and tear-drainage disorders</li>
                      <li>Inward or outward turning eyelids</li>
                      <li>Eyelid-position abnormalities</li>
                      <li>Reconstructive eyelid concerns</li>
                    </ul>
                  </div>
                </article>
                <article className="oculo-card oculo-card--aesthetic">
                  <div className="oculo-card-body">
                    <div className="oculo-card-header">
                      <div className="oculo-card-icon">
                        <AestheticConcernIcon />
                      </div>
                      <div className="oculo-card-title-group">
                        <h3 className="oculo-card-title">Aesthetic Oculoplasty</h3>
                        <div className="oculo-card-bar" aria-hidden="true" />
                      </div>
                    </div>
                    <ul className="oculo-check-list">
                      <li>Excess upper eyelid skin</li>
                      <li>Loose eyelid skin</li>
                      <li>Under-eye bags</li>
                      <li>Age-related periocular changes</li>
                      <li>Aesthetic eyelid concerns</li>
                    </ul>
                  </div>
                </article>
              </div>
              <div className="oculo-links oculo-links--btns">
                <Link href={LINKS.reconstructive} className="btn btn--primary">
                  Reconstructive Oculoplasty <ArrowRightIcon width={18} height={18} />
                </Link>
                <Link href={LINKS.aesthetic} className="btn btn--outline-light">
                  Aesthetic Oculoplasty <ArrowRightIcon width={18} height={18} />
                </Link>
              </div>
              <p className="oculo-note">
                Every treatment begins with a detailed assessment of your eye health, eyelid anatomy and individual concerns. Suitable treatment options, expected outcomes and potential risks are discussed before proceeding.
              </p>
            </div>
            <figure className="oculo-feature-art">
              <AssetImage asset={ASSETS.oculoplastyRealExam} fill sizes="(min-width: 960px) 42vw, 100vw" className="oculo-img" />
              <figcaption>Specialised assessment of the eyelids and surrounding eye structures.</figcaption>
            </figure>
          </div>
          <div className="container oculo-highlights" aria-label="Oculoplasty areas of care">
            <span><DoctorIcon name="lid" />Specialised Eyelid Care</span>
            <span><DoctorIcon name="drop" />Tear Drainage Care</span>
            <span><DoctorIcon name="eye" />Orbital Care</span>
            <span><DoctorIcon name="medical" />Periocular Aesthetics</span>
          </div>
        </section>

        {/* Why Namokar */}
        <section id="why" className="why-section" aria-labelledby="why-h">
          <div className="why-hands-backdrop" aria-hidden="true">
            <AssetImage asset={ASSETS.whyCentreBackground} sizes="(min-width: 960px) 1100px, 100vw" className="why-hands-image" alt="" />
          </div>
          <div className="container why-shell">
            <header className="why-intro reveal">
              <p className="kicker why-kicker">Why Namokar</p>
              <h2 id="why-h" className="h2 why-h2">Why Patients <span className="title-secondary">Choose Namokar</span></h2>
              <p className="why-foot">Comprehensive eye care and specialised oculoplasty, guided by clinical experience, international training and a personalised approach to every patient.</p>
            </header>
            <div className="why-cards">
                {HOME_WHY.map((w, i) => {
                  const iconName = (["award", "eye", "cap", "team"] as const)[i];
                  return (
                    <article key={w.title} className="why-card">
                      <div className="why-card-icon">
                        <DoctorIcon name={iconName} />
                      </div>
                      <h3 className="why-card-title">{w.title}</h3>
                      <p className="why-card-text">{w.text}</p>
                    </article>
                  );
                })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <HomeFaqSection items={faqs} />

        {/* Final CTA: Consultation & Slit-lamp Section */}
        <HomeCta
          online={online}
          kicker="Personalised Eye Care"
          heading="See Better. Look Better."
          subheading="Book Your Consultation Today"
          desc="Whether you need a routine eye examination, specialised eye treatment or aesthetic eyelid care, begin with a personalised consultation at Namokar Eye & Oculoplasty Centre."
          phoneBookingLabel="Book a Consultation"
        />
      </main>
      {online && PRIVACY_URL && <HomeAppointmentPopup privacyUrl={PRIVACY_URL} />}
    </>
  );
}
