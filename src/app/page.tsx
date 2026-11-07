import type { Metadata } from "next";
import Link from "next/link";
import AssetImage from "@/components/AssetImage";
import BookButton, { SecondaryContact } from "@/components/BookButton";
import FacilityGallery from "@/components/FacilityGallery";
import Hero from "@/components/Hero";
import HomeCta from "@/components/HomeCta";
import HomeAppointmentPopup from "@/components/HomeAppointmentPopup";
import TreatmentExplorer from "@/components/TreatmentExplorer";
import { treatmentItems } from "@/lib/treatments";
import JsonLd from "@/components/JsonLd";
import Parallax from "@/components/motion/Parallax";
import { ArrowRightIcon, PhoneIcon, PinIcon, PlusIcon } from "@/components/Icons";
import NamePlate from "@/components/NamePlate";
import VisitPanel from "@/components/VisitPanel";
import WalkthroughSection from "@/components/WalkthroughSection";
import VideoShelf from "@/components/VideoShelf";
import { ASSETS, type Asset, usable } from "@/config/assets";
import { PAGES } from "@/config/routes";
import { HOME_DESCRIPTION, HOME_TITLE, LINKS, MAPS_LINK, SITE, TEL_HREF } from "@/config/site";
import { videosFor } from "@/content/videos";
import { HOME_WHY } from "@/content/why";
import { onlineBookingAvailable } from "@/lib/booking";
import { playerProps } from "@/lib/videoProps";
import { compact, photoItem } from "@/lib/photos";
import { pageMeta } from "@/lib/seo";
import { clinic, faqPage, ids, webPage, website } from "@/lib/schema";

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

function FaqIcon({ name }: { name: "eye" | "lid" | "drop" | "doctor" | "scalpel" | "eyebag" | "calendar" | "clipboard" | "phone" }) {
  const icons = {
    eye: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6-10-6-10-6Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    lid: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M4 10.5c3 3.5 13 3.5 16 0" />
        <line x1="5.5" y1="12" x2="4.5" y2="15.5" />
        <line x1="9" y1="13.2" x2="8.5" y2="17" />
        <line x1="12.5" y1="13.5" x2="12.5" y2="17.5" />
        <line x1="16" y1="13.2" x2="16.5" y2="17" />
        <line x1="19.5" y1="12" x2="20.5" y2="15.5" />
      </svg>
    ),
    drop: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M12 2.7c-3.8 4.8-6 8-6 11.3a6 6 0 0 0 12 0c0-3.3-2.2-6.5-6-11.3Z" />
      </svg>
    ),
    doctor: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="12" cy="7" r="3.5" />
        <path d="M5 6.5C5 5 7 4 12 4s7 1 7 2.5v1.5H5Z" />
        <path d="M4 20a8 8 0 0 1 16 0" />
        <path d="M12 14v4M10 16h4" />
      </svg>
    ),
    scalpel: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="m4 20 8.5-8.5" />
        <path d="M14.5 9.5 18 6c1.5-1.5 3-1 3.5-.5s1 2-.5 3.5l-3.5 3.5-3-3Z" />
      </svg>
    ),
    eyebag: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M2.5 11s3.6-5 9.5-5 9.5 5 9.5 5-3.6 5-9.5 5-9.5-5-9.5-5Z" />
        <circle cx="12" cy="11" r="2.5" />
        <path d="M6 16.5c2 2 10 2 12 0" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <rect x="3.5" y="4.5" width="17" height="15.5" rx="3" />
        <path d="M3.5 9.5h17M8 2.5v4M16 2.5v4" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
    clipboard: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 2h6v3H9Z" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="15" y2="14" />
        <line x1="9" y1="18" x2="12" y2="18" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  };
  return icons[name] || icons.eye;
}

const faqs = (online: boolean) => [
  {
    q: "Why is a comprehensive eye check-up important?",
    a: "Some eye conditions, including glaucoma, can develop slowly without obvious symptoms. A full examination can find changes early, when they are easier to manage. Your doctor will advise how often you should be reviewed.",
  },
  {
    q: "What can a drooping eyelid (ptosis) mean?",
    a: "Ptosis means the upper eyelid sits lower than normal. It can be present from birth or develop with age, muscle weakness or other conditions, and it can sometimes affect vision. An examination is needed to find the cause and to decide whether treatment is suitable.",
  },
  {
    q: "Why do my eyes keep watering?",
    a: "Watering can come from dryness or irritation, infection, or a blocked tear-drainage passage, among other causes. Because treatment depends on the cause, it is best to have persistent watering examined.",
  },
  {
    q: "What is the difference between an ophthalmologist and an oculoplasty surgeon?",
    a: "An ophthalmologist diagnoses and treats eye conditions. Oculoplasty is a specialised area within ophthalmology focused on the eyelids, tear passages, eye socket and surrounding structures. Dr. Poonam Jain practises comprehensive ophthalmology with a particular focus on oculoplasty.",
  },
  {
    q: "Does every drooping eyelid require surgery?",
    a: "No. A drooping eyelid can have different causes. Treatment depends on the cause, severity, effect on vision and individual circumstances. An examination is required before deciding whether treatment is appropriate.",
  },
  {
    q: "Are under-eye bags always treated with surgery?",
    a: "No. Under-eye concerns vary from person to person. The doctor first evaluates the eyelids, skin, underlying tissues and your concerns before discussing suitable options.",
  },
  {
    q: "Can I come for a general eye check-up even if I don't need surgery?",
    a: "Yes. Namokar provides comprehensive eye examinations as well as condition-specific and surgical eye care.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Please bring any previous prescriptions and eye reports, your current spectacles, and a list of the medicines you take. After the examination, the doctor will explain the findings and whether any treatment is needed.",
  },
  {
    q: "How do I arrange an appointment?",
    a: online
      ? `Call the centre on ${SITE.phone.display} or send a request from the Contact page. A request is not a confirmed appointment; the centre will arrange a time with you.`
      : `Please call the centre on ${SITE.phone.display}. Tell us briefly what is troubling you and we will help you find a suitable time. Online requests are not available yet.`,
  },
];

/**
 * Banner photographs, one slide each. For every slide the first candidate that is cleared for
 * use is shown, so approving or withholding a photograph never leaves a gap or an empty frame.
 */
type HeroCandidate = { asset: Asset; caption: string; position: string };
const HERO_SHOTS: HeroCandidate[][] = [
  // 1. Doctor consultation & examination
  [
    { asset: ASSETS.docSlit, caption: "Dr. Poonam Jain seated beside a slit-lamp examination unit.", position: "72% 35%" },
    { asset: ASSETS.homeDoctorNov, caption: "Dr. Poonam Jain during an eye examination at the centre.", position: "50% 40%" },
    { asset: ASSETS.homeExteriorNov, caption: "Our Ashok Vihar centre, seen from the street.", position: "50% 19%" },
    { asset: ASSETS.exterior, caption: "Our Ashok Vihar centre, seen from the street.", position: "50% 20%" },
    { asset: ASSETS.reception, caption: "The reception at our Ashok Vihar centre.", position: "42% 20%" },
  ],
  // 2. Cataract: the operating microscope and surgical console
  [
    { asset: ASSETS.homeTheatreNov, caption: "An operation theatre at the centre.", position: "50% 30%" },
    { asset: ASSETS.otScope, caption: "An operating microscope in the theatre area at the centre.", position: "50% 20%" },
    { asset: ASSETS.consoleWide, caption: "A surgical console in the theatre area at the centre.", position: "50% 20%" },
  ],
  // 3. Specialist oculoplasty & diagnostics
  [
    { asset: ASSETS.homeDoctorNov, caption: "Dr. Poonam Jain during an eye examination at the centre.", position: "50% 40%" },
    { asset: ASSETS.homeDiagnosticsNov, caption: "Diagnostic instruments in an examination room at the centre.", position: "50% 50%" },
    { asset: ASSETS.otModernC, caption: "An operation theatre at the centre.", position: "50% 20%" },
    { asset: ASSETS.otModernB, caption: "The operating table and microscope in the theatre.", position: "50% 20%" },
  ],
];

function heroShot(candidates: HeroCandidate[], eager: boolean) {
  const c = candidates.find((x) => usable(x.asset));
  if (!c) return null;
  return {
    caption: c.caption,
    node: (
      <Parallax range={18}>
      <AssetImage
        asset={c.asset}
        fill
        eager={eager}
        sizes="100vw"
        className="hero-img"
        style={{ objectPosition: c.position }}
      />
      </Parallax>
    ),
  };
}

export default function Home() {
  const online = onlineBookingAvailable();

  const hasPortrait = usable(ASSETS.portrait);
  const gallery = compact([
    photoItem(ASSETS.archCataractExam, {
      title: "Consultation & Eye Examination",
      caption: "Detailed and comfortable eye evaluation with advanced diagnostic equipment.",
      position: "55% 50%",
    }),
    photoItem(ASSETS.reception, {
      title: "Reception",
      caption: "A warm and welcoming space for our patients.",
      icon: "/images/reception-new.png",
      position: "50% 50%",
    }),
    photoItem(ASSETS.archTeamDoctor, {
      title: "Our Team",
      caption: "A dedicated and experienced team focused on your eye health.",
      icon: "/images/multiple-users-silhouette.png",
      position: "50% 40%",
    }),
    photoItem(ASSETS.homeDiagnosticsNov, {
      title: "Our Equipment",
      caption: "Advanced and precise technology for accurate diagnosis and treatment.",
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
          faqPage(PAGES.home.path, faqs(online)),
        ]}
      />
      <main id="main">
        <Hero
          online={online}
          panel={<VisitPanel />}
          shots={HERO_SHOTS.map((c, i) => heroShot(c, i === 0))}
        />

        {/* Find care: the six treatments as real links with a picture and a short description */}
        <TreatmentExplorer items={treatmentItems()} />

        {/* Hospital introduction: only when at least one photograph is cleared */}
        {gallery.length > 0 && (
          <section id="centre" className="section centre-showcase" aria-labelledby="centre-h">
            <div className="container">
              <div className="centre-head reveal">
                <div>
                  <p className="kicker">The centre</p>
                  <h2 id="centre-h" className="h2">Our <span>Centre</span></h2>
                </div>
                <div className="centre-copy">
                <p className="lead">
                  Take a closer look at Namokar Eye &amp; Oculoplasty Centre &mdash; our welcoming spaces,
                  advanced technology and the dedicated team behind your care.
                </p>
                </div>
              </div>
              <FacilityGallery items={gallery} label="Photographs of the centre" showcase />
            </div>
          </section>
        )}

        {/* Explore Namokar: the one clinic walkthrough video */}
        <WalkthroughSection
          video={videosFor("home").filter((v) => v.source === "local").map(playerProps)[0]}
        />

        {/* Doctor */}
        <section id="doctor" className="section doctor-showcase" aria-labelledby="doctor-h">
          <header className="container doctor-showcase-head">
            <p className="kicker">Meet your doctor</p>
            <h2 id="doctor-h" className="h2 h2--xl">Meet <span>Dr. Poonam Jain</span></h2>
            <p className="doctor-role">Medical Director &bull; Senior Ophthalmologist &bull; Oculoplasty Surgeon</p>
          </header>
          <div className="container doctor-grid">
            <figure className="doctor-photo reveal">
              {hasPortrait ? (
                <AssetImage
                  asset={ASSETS.portrait}
                  sizes="(min-width: 960px) 44vw, 100vw"
                  className="doctor-img"
                />
              ) : (
                <NamePlate />
              )}
              <figcaption className="doctor-photo-caption">
                <strong>Dr. Poonam Jain</strong>
                <span>Medical Director, Namokar Eye &amp; Oculoplasty Centre</span>
              </figcaption>
            </figure>
            <div className="doctor-copy">
              <p className="lead">
                With 25+ years of experience in eye care, Dr. Poonam Jain leads Namokar
                Eye &amp; Oculoplasty Centre with a particular focus on oculoplasty, the
                care of the eyelids, tear passages and the area around the eyes.
              </p>
              <div className="doctor-highlights" aria-label="Professional highlights">
                <div><DoctorIcon name="calendar" /><strong>25+</strong><span>Years of Experience</span></div>
                <div><DoctorIcon name="team" /><strong>Doctor-led</strong><span>Eye care</span></div>
                <div><DoctorIcon name="eye" /><strong>Oculoplasty</strong><span>Specialist focus</span></div>
              </div>
              <p className="doctor-text">
                Care at Namokar is doctor-led. You are examined and advised by the
                doctor, and the discussion is built around your eyes, your concerns and
                the options that suit you.
              </p>
              <h3 className="doctor-training-title">Qualifications &amp; Training</h3>
              <dl className="cred-rows doctor-training">
                <div>
                  <dt><DoctorIcon name="cap" />Fellowship</dt>
                  <dd>Oculoplasty, Barraquer Institute, Barcelona</dd>
                </div>
                <div>
                  <dt><DoctorIcon name="book" />Observership</dt>
                  <dd>Wilmer Eye Institute, Johns Hopkins, Baltimore</dd>
                </div>
                <div>
                  <dt><DoctorIcon name="award" />MS, Ophthalmology</dt>
                  <dd>Safdarjung Hospital, New Delhi</dd>
                </div>
                <div>
                  <dt><DoctorIcon name="medical" />MBBS</dt>
                  <dd>Maulana Azad Medical College, New Delhi</dd>
                </div>
              </dl>
              <div className="doctor-expertise" aria-label="Areas of expertise">
                <strong>Areas of Expertise</strong>
                <span><DoctorIcon name="lid" />Eyelid &amp; Oculoplasty</span>
                <span><DoctorIcon name="drop" />Tear Passage Care</span>
                <span><DoctorIcon name="eye" />Periocular Conditions</span>
              </div>
              <div className="btn-row doctor-actions">
                {/* Profile page is switched off for now: this opens the contact page. Use LINKS.doctor to restore. */}
                <Link href={LINKS.contact} className="btn btn--primary">
                  Read Dr. Poonam Jain&rsquo;s Full Profile <ArrowRightIcon />
                </Link>
                <Link href={LINKS.about} className="btn btn--secondary">
                  About the centre <ArrowRightIcon width={18} height={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Doctor-led video shelf: the clinic's own YouTube videos, one player at a time, click to load */}
        <VideoShelf
          videos={videosFor("home").filter((v) => v.source === "youtube").map(playerProps)}
        />

        {/* Oculoplasty */}
        <section id="oculoplasty" className="section section--graphite" aria-labelledby="oculo-h">
          <div className="container oculo-grid">
            <div className="oculo-copy">
              <p className="kicker">Oculoplasty</p>
              <h2 id="oculo-h" className="h2">Specialist Oculoplasty for Function &amp; <span>Appearance</span></h2>
              <p className="lead">
                Oculoplasty is a branch of ophthalmology focused on the eyelids, tear
                passages, eye socket and surrounding eye area. Some concerns affect
                vision or eye comfort. Others affect appearance. Many involve both.
              </p>
              <div className="oculo-cards">
                <article className="oculo-card oculo-card--functional">
                  <div className="oculo-card-body">
                    <div className="oculo-card-header">
                      <div className="oculo-card-icon">
                        <FunctionalConcernIcon />
                      </div>
                      <div className="oculo-card-title-group">
                        <h3 className="oculo-card-title">Functional Concerns</h3>
                        <div className="oculo-card-bar" aria-hidden="true" />
                      </div>
                    </div>
                    <ul className="oculo-check-list">
                      <li>Drooping eyelids (ptosis) that make the eye look tired or affect vision</li>
                      <li>Persistent watering or tear-drainage problems</li>
                      <li>Eyelids turning inward or outward</li>
                      <li>Other eyelid-position concerns</li>
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
                        <h3 className="oculo-card-title">Aesthetic Concerns</h3>
                        <div className="oculo-card-bar" aria-hidden="true" />
                      </div>
                    </div>
                    <ul className="oculo-check-list">
                      <li>Heavy upper eyelids</li>
                      <li>Loose eyelid skin</li>
                      <li>Under-eye bags</li>
                      <li>Age-related changes around the eyes</li>
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
                Dr. Poonam Jain decides whether a procedure is suitable only after
                examining your eyes and talking through what you hope to achieve.
              </p>
            </div>
            <div className="oculo-art-stack">
              <figure className="oculo-art oculo-art--top">
                <AssetImage asset={ASSETS.archCataractExam} fill sizes="(min-width: 960px) 38vw, 100vw" className="oculo-img" />
                <figcaption className="oculo-art-label">Consultation &amp; Examination</figcaption>
              </figure>
              <figure className="oculo-art oculo-art--bottom">
                <AssetImage asset={ASSETS.oculoplastyConsultNov} fill sizes="(min-width: 960px) 28vw, 100vw" className="oculo-img" />
                <figcaption className="oculo-art-label">Consultation</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Why Namokar */}
        <section id="why" className="section why-section" aria-labelledby="why-h">
          <div className="container why-grid">
            <div className="why-intro reveal">
              <p className="kicker why-kicker">Why Namokar</p>
              <div className="why-title-wrap">
                <h2 id="why-h" className="h2 why-h2">
                  Why Patients<br />Choose <span>Namokar</span>
                </h2>
                <svg className="why-title-curve" viewBox="0 0 110 8" fill="none" aria-hidden="true">
                  <path d="M2 6C35 1.5 75 1.5 108 6" stroke="#c4591a" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="why-foot">
                Doctor-led consultations &bull; Ashok Vihar, New Delhi &bull; Comprehensive eye care and oculoplasty under one centre.
              </p>
              <figure className="why-photo">
                <AssetImage
                  asset={ASSETS.docSlit}
                  fill
                  sizes="(min-width: 960px) 36vw, 100vw"
                  className="why-photo-img"
                />
              </figure>
            </div>

            <div className="why-right">
              <div className="why-cards">
                {HOME_WHY.map((w, i) => {
                  const iconName = (["award", "eye", "cap", "team"] as const)[i];
                  return (
                    <article key={w.title} className="why-card">
                      <span className="why-card-badge" aria-hidden="true">0{i + 1}</span>
                      <div className="why-card-icon">
                        <DoctorIcon name={iconName} />
                      </div>
                      <h3 className="why-card-title">{w.title}</h3>
                      {(i === 1 || i === 3) && <div className="why-card-bar" aria-hidden="true" />}
                      <p className="why-card-text">{w.text}</p>
                    </article>
                  );
                })}
              </div>
              <div className="why-action">
                <Link href={LINKS.contact} className="btn why-book-btn">
                  <span className="why-btn-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </span>
                  <span>Book a Consultation</span>
                  <ArrowRightIcon width={18} height={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section faq-section" aria-labelledby="faq-h">
          <div className="container faq-grid">
            <div className="faq-intro reveal">
              <p className="kicker faq-kicker">Common questions</p>
              <div className="faq-title-wrap">
                <h2 id="faq-h" className="h2 faq-h2">
                  Questions<br />
                  <span>Patients Often Ask</span>
                </h2>
                <svg className="faq-title-curve" viewBox="0 0 110 8" fill="none" aria-hidden="true">
                  <path d="M2 6C35 1.5 75 1.5 108 6" stroke="#c4591a" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="faq-lead">
                This is general information. Your own eyes need to be examined before
                anyone can advise you.
              </p>

              <div className="faq-photo-wrap">
                <figure className="faq-photo">
                  <div className="faq-photo-inner">
                    <AssetImage
                      asset={ASSETS.homeDoctorNov}
                      fill
                      sizes="(min-width: 960px) 38vw, 100vw"
                      className="faq-photo-img"
                    />
                  </div>
                  <div className="faq-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" />
                    </svg>
                  </div>
                </figure>
              </div>
            </div>

            <div className="faq-list faq-list--cards">
              {faqs(online).map((f, i) => {
                const iconNames = ["eye", "lid", "drop", "doctor", "scalpel", "eyebag", "calendar", "clipboard", "phone"] as const;
                const iconName = iconNames[i] ?? "eye";
                return (
                  <details key={f.q} className="faq-card" open={i === 0 ? true : undefined}>
                    <summary className="faq-summary">
                      <span className="faq-card-icon" aria-hidden="true">
                        <FaqIcon name={iconName} />
                      </span>
                      <span className="faq-question-text">{f.q}</span>
                      <span className="faq-chevron-wrap" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </summary>
                    <p className="faq-answer">{f.a}</p>
                  </details>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA: Consultation & Slit-lamp Section */}
        <HomeCta online={online} />
      </main>
      <HomeAppointmentPopup />
    </>
  );
}
