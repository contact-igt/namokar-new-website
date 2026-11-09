import type { Metadata } from "next";
import { pageMeta, withBrand } from "@/lib/seo";
import Link from "next/link";
import FacilityPhoto from "@/components/FacilityPhoto";
import AssetImage from "@/components/AssetImage";
import EditorialImage from "@/components/EditorialImage";
import styles from "./about.module.css";
import RegistrationRow from "@/components/RegistrationRow";
import BookButton from "@/components/BookButton";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import FactPanel from "@/components/FactPanel";
import { ArrowRightIcon } from "@/components/Icons";
import NamePlate from "@/components/NamePlate";
import AboutHero from "@/components/AboutHero";
import { ASSETS, usable } from "@/config/assets";
import { PAGES } from "@/config/routes";
import { LINKS, SERVICES, SITE } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import { compact, photoItem } from "@/lib/photos";
import { clinic, ids, webPage } from "@/lib/schema";
import VideoSection from "@/components/VideoSection";
import { videosFor } from "@/content/videos";

export const metadata: Metadata = pageMeta("about", {
  title: withBrand("About Us"),
  description:
    "About Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi: comprehensive eye care and oculoplasty, led by Dr. Poonam Jain, Medical Director.",
});

const JOURNEY = [
  {
    title: "Tell us what is troubling you",
    text: "Contact the centre and briefly tell the team your concern, so they can help arrange the appropriate consultation.",
  },
  {
    title: "Clinical assessment",
    text: "Your eyes are examined based on your symptoms and your reason for visiting. Bring previous prescriptions, reports, scans, your current spectacles and your medication list where relevant.",
  },
  {
    title: "Meet the doctor",
    text: "The doctor reviews the examination findings, listens to your concerns and explains what they mean in understandable language.",
  },
  {
    title: "Discuss the options",
    text: "If treatment could help, the available options are explained. Not every patient requires surgery or a procedure.",
  },
  {
    title: "Follow-up where needed",
    text: "Some eye conditions need monitoring or follow-up, such as glaucoma. The doctor will explain what is appropriate for you.",
  },
];


export default function AboutPage() {
  const online = onlineBookingAvailable();
  const hasHero = usable(ASSETS.reception);
  const aboutPortrait = usable(ASSETS.portrait) ? ASSETS.portrait : null;
  const hasPortrait = Boolean(aboutPortrait);
  const gallery = compact([
    photoItem(ASSETS.archTeamDoctor, { title: "Our care team", caption: "Dr. Poonam Jain with members of the team who look after patients, in the waiting area.", position: "50% 40%" }),
    photoItem(ASSETS.homeTheatreNov, { title: "Operation theatre", caption: "The operating table, microscope and surgical equipment used for eye procedures.", position: "50% 55%" }),
    photoItem(ASSETS.galleryExteriorNov, { title: "Our eye centre in Ashok Vihar", caption: "Namokar Eye & Oculoplasty Centre on the street in Ashok Vihar, New Delhi, where patients visit for eye examinations and eye care.", position: "50% 50%" }),
    photoItem(ASSETS.archCataractExam, { title: "A detailed eye examination", caption: "Dr. Poonam Jain examining a patient at a slit-lamp, the microscope used to look closely at the front of the eye.", position: "55% 50%" }),
  ]);

  return (
    <main id="main" className={styles.page} data-about-page>
      <JsonLd page="about"
        data={[
          webPage({ type: "AboutPage", path: PAGES.about.path, name: "About Us", description: metadata.description as string, mainEntityId: ids.clinic }),
          clinic(),
        ]}
      />
      <AboutHero
        crumb="About Us"
        eyebrow="About Namokar Eye & Oculoplasty Centre"
        title="Eye Care Built Around Understanding, Expertise & Individual Attention"
        lead="Namokar Eye & Oculoplasty Centre is an eye-care centre in Ashok Vihar, New Delhi, offering comprehensive ophthalmology alongside specialist oculoplasty care led by Dr. Poonam Jain, Senior Ophthalmologist and Oculoplasty Surgeon. Our approach begins with understanding your concern before discussing the next step."
        mediaLabel="Welcome to Namokar"
        mediaCaption="The reception at our Ashok Vihar centre, where your visit begins."
        aside={hasHero ? undefined : <FactPanel />}
      />

      {/* About Namokar */}
      <section id="about" className="section section--tight" aria-labelledby="about-h">
        <div className="container about-grid">
          <div className="about-heading-block">
            <p className="kicker">About Namokar</p>
            <h2 id="about-h" className="h2">Comprehensive Eye Care With a Special Focus on Oculoplasty</h2>
          </div>
          {/* LEFT COLUMN – ABOUT NAMOKAR */}
          <div className="about-left">
            <div className="about-copy">
              <div className="about-copy-main">
              <p>
                Namokar Eye &amp; Oculoplasty Centre is located in {SITE.area} and provides
                comprehensive eye care, including routine and condition-specific eye
                examinations, cataract care, glaucoma management and other ophthalmic
                concerns. The centre has a reception, consultation and examination rooms,
                and an operation theatre.
              </p>
              <p>
                A key area of focus at Namokar is oculoplasty, the branch of ophthalmology
                concerned with the eyelids, tear passages, eye socket and surrounding eye
                area. This includes both functional concerns, such as drooping eyelids and
                watering eyes, and aesthetic concerns involving the eyelids and under-eye
                area.
              </p>
              <p>
                Care is led by Dr. Poonam Jain, Medical Director and Senior Ophthalmologist.
                Consultations are built around understanding your concern, examining your
                eyes carefully and explaining the available options in clear language.
              </p>
              </div>
              <p className="about-note">
                Our aim is not to rush a patient towards treatment. Where treatment may
                help, the reason, the alternatives and the next steps are discussed, so that
                you can make an informed decision at your own pace.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN – IMAGE AND SERVICES */}
          <div className="about-right">
            <EditorialImage
              asset={ASSETS.homeExteriorNov}
              caption=""
              ratio="wide"
              position="50% 45%"
              sizes="(min-width: 960px) 50vw, 100vw"
              tab={false}
            />
            <div className="about-services">
              <div className="about-services-head">
                <h3 className="areas-h">Eye Care Available at Namokar</h3>
                <p className="areas-desc">Comprehensive ophthalmology and specialist oculoplasty under one centre.</p>
              </div>
              <ul className="areas">
                {SERVICES.map((s) => (
                  <li key={s.key}>
                    <Link href={s.href}>
                      <span>{s.title}</span>
                      <ArrowRightIcon width={18} height={18} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Connected Doctor Profile and Qualifications Section */}
      <section
        id="doctor"
        className="section section--porcelain doctor-profile-section"
        aria-labelledby="doctor-h"
      >
        <div className="container">
          {/* Section Label: positioned above the doctor photograph */}
          <div className="doctor-kicker-wrap">
            <p className="kicker">Meet your doctor</p>
          </div>

          {/* Part 1: Doctor Profile */}
          <div className="doctor-grid">
            <figure className="doctor-photo">
              {hasPortrait ? (
                <AssetImage
                  asset={aboutPortrait!}
                  sizes="(min-width: 960px) 44vw, 100vw"
                  className="doctor-img"
                />
              ) : (
                <NamePlate />
              )}
            </figure>
            <div className="doctor-copy">
              <div className="doctor-summary">
              <h2 id="doctor-h" className="h2 h2--xl">Meet Dr. Poonam Jain</h2>
              <p className="doctor-role">
                Medical Director &bull; Senior Ophthalmologist &bull; Oculoplasty Surgeon
              </p>
              <p className="lead">
                With 25+ years of experience in ophthalmology and oculoplasty, Dr. Poonam
                Jain leads clinical care at Namokar Eye &amp; Oculoplasty Centre.
              </p>
              <p className="doctor-text">
                Alongside comprehensive ophthalmology, she has a particular clinical focus
                on oculoplasty, including functional and aesthetic conditions involving the
                eyelids, tear passages and surrounding eye area. Her approach is centred on
                careful evaluation, clear communication and treatment planning based on the
                individual patient&apos;s needs.
              </p>
              </div>
              <div className="doctor-specialties">
              <h3 className="areas-h">Areas of focus</h3>
              <div className="focus-grid" role="list">
                <div className="focus-card" role="listitem">
                  <span className="focus-card-text">Functional and aesthetic oculoplasty</span>
                </div>
                <div className="focus-card" role="listitem">
                  <span className="focus-card-text">Ptosis and eyelid-position concerns</span>
                </div>
                <div className="focus-card" role="listitem">
                  <span className="focus-card-text">Watering eyes and tear-drainage disorders</span>
                </div>
                <div className="focus-card" role="listitem">
                  <span className="focus-card-text">Blepharoplasty and eye-area concerns</span>
                </div>
                <div className="focus-card" role="listitem">
                  <span className="focus-card-text">Comprehensive ophthalmology</span>
                </div>
                <div className="focus-card" role="listitem">
                  <span className="focus-card-text">Cataract evaluation and eye care</span>
                </div>
              </div>
              <div className="doctor-actions">
                <BookButton online={online} />
                <Link href={LINKS.doctor} className="text-link">
                  Read Dr. Poonam Jain&rsquo;s Full Profile <ArrowRightIcon width={18} height={18} />
                </Link>
              </div>
              </div>
            </div>
          </div>

          {/* Part 2: Qualifications & Advanced Training - Visually connected */}
          <div id="training" className="doctor-training-block" aria-labelledby="training-h">
            <div className="doctor-training-head">
              <p className="kicker">Expertise</p>
              <h2 id="training-h" className="h2">Qualifications &amp; Advanced Training</h2>
              <p className="lead">
                Dr. Poonam Jain&apos;s medical education and further clinical training
                include:
              </p>
            </div>

            <div className="doctor-creds-grid">
              {/* LEFT GROUP: Qualifications */}
              <div className="cred-card">
                <div className="cred-card-head">
                  <span className="cred-card-tag">Qualifications</span>
                </div>
                <dl className="cred-list">
                  <div className="cred-item">
                    <dt>MBBS</dt>
                    <dd>Maulana Azad Medical College, New Delhi</dd>
                  </div>
                  <div className="cred-item">
                    <dt>MS, Ophthalmology</dt>
                    <dd>Safdarjung Hospital, New Delhi</dd>
                  </div>
                  <RegistrationRow />
                </dl>
              </div>

              {/* RIGHT GROUP: Advanced Training */}
              <div className="cred-card">
                <div className="cred-card-head">
                  <span className="cred-card-tag">Advanced Training</span>
                </div>
                <dl className="cred-list">
                  <div className="cred-item">
                    <dt>Fellowship in Oculoplasty</dt>
                    <dd>Barraquer Institute, Barcelona, Spain</dd>
                  </div>
                  <div className="cred-item">
                    <dt>Observership</dt>
                    <dd>Wilmer Eye Institute, Johns Hopkins, Baltimore, USA</dd>
                  </div>
                </dl>
              </div>
            </div>

            <p className="fine doctor-training-fine">
              A fellowship is a period of advanced clinical training. An observership
              means observing clinical practice, and is not a degree or a fellowship.
              Both are past training experiences and do not imply a current affiliation
              with, or endorsement by, these institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Inside Our Centre: omitted entirely when no photograph is cleared for use */}
      {gallery.length > 0 && (
      <section
        id="hospital"
        className="section section--porcelain"
        aria-labelledby="hospital-h"
      >
        <div className="container">
          <div className="centre-head">
            <p className="kicker">Our centre</p>
            <h2 id="hospital-h" className="h2">The People and Spaces Behind Your Care</h2>
            <p className="lead">
              Meet the team and see the actual rooms where patients are welcomed,
              examined and treated at our Ashok Vihar centre.
            </p>
          </div>
          <div className={`fg centre-gallery ${styles.facilityGrid}`} role="group" aria-label="Photographs inside the centre">
            {gallery.map((item) => (
              <FacilityPhoto key={item.src} item={item} />
            ))}
          </div>
        </div>
      </section>
      )}

      <VideoSection
        id="about-video"
        videos={videosFor("about")}
        kicker="Look inside"
        heading="Take a Walk Through Namokar"
        lead="Before your visit, see the reception, consultation spaces, examination areas and other parts of our Ashok Vihar centre."
        layout="showcase"
      />

      {/* Care journey */}
      <section id="journey" className="section" aria-labelledby="journey-h">
        <div className="container why-grid">
          <div className="section-head reveal">
            <p className="kicker">What to expect</p>
            <h2 id="journey-h" className="h2">What to Expect When You Visit Namokar</h2>
            <p className="lead">
              A general outline of how a visit usually goes. Each patient&apos;s care
              depends on their own eyes and needs, and no particular outcome can be
              promised.
            </p>
          </div>
          <ol className="why-list journey-cards" role="list">
            {JOURNEY.map((j, i) => (
              <li key={j.title} className="why-row journey-card" role="listitem">
                <div className="journey-card-no" aria-hidden="true">
                  <span>0{i + 1}</span>
                </div>
                <div className="journey-card-body">
                  <h3 className="h3">{j.title}</h3>
                  <p>{j.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        id="about-cta-h"
        heading="Need Help With an Eye or Eyelid Concern?"
        lead="Whether you need a routine eye examination, a cataract or glaucoma evaluation, or would like advice about an eyelid, watering-eye or under-eye concern, the first step is a consultation."
        online={online}
        landmark
      />
    </main>
  );
}
