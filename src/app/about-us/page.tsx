import type { Metadata } from "next";
import { pageMeta, withBrand } from "@/lib/seo";
import Link from "next/link";
import AssetImage from "@/components/AssetImage";
import EditorialImage from "@/components/EditorialImage";
import FacilityGallery from "@/components/FacilityGallery";
import RegistrationRow from "@/components/RegistrationRow";
import BookButton from "@/components/BookButton";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import FactPanel from "@/components/FactPanel";
import { ArrowRightIcon } from "@/components/Icons";
import NamePlate from "@/components/NamePlate";
import PageHero from "@/components/PageHero";
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
    photoItem(ASSETS.otModernB, { title: "Operation theatre", caption: "The operating table, with the operating microscope and a surgical console behind it.", position: "50% 55%" }),
    photoItem(ASSETS.chartDoor, { title: "Examination room", caption: "An eye-chart screen beside an examination room door, used to check how clearly you see.", position: "50% 40%" }),
    photoItem(ASSETS.archCataractExam, { title: "A detailed eye examination", caption: "Dr. Poonam Jain examining a patient at a slit-lamp, the microscope used to look closely at the front of the eye.", position: "55% 50%" }),
    photoItem(ASSETS.archTeamDoctor, { title: "Our care team", caption: "Dr. Poonam Jain with members of the team who look after patients, in the waiting area.", position: "50% 40%" }),
  ]);

  return (
    <main id="main">
      <JsonLd page="about"
        data={[
          webPage({ type: "AboutPage", path: PAGES.about.path, name: "About Us", description: metadata.description as string, mainEntityId: ids.clinic }),
          clinic(),
        ]}
      />
      <PageHero
        crumb="About Us"
        long
        eyebrow="About Namokar Eye & Oculoplasty Centre"
        title="Eye Care Built Around Understanding, Expertise & Individual Attention"
        lead="Namokar Eye & Oculoplasty Centre is an eye-care centre in Ashok Vihar, New Delhi, offering comprehensive ophthalmology alongside specialist oculoplasty care led by Dr. Poonam Jain, Senior Ophthalmologist and Oculoplasty Surgeon. Our approach begins with understanding your concern before discussing the next step."
        media={
          hasHero ? (
            <AssetImage
              asset={ASSETS.reception}
              fill
              eager
              sizes="(min-width: 960px) 58vw, 100vw"
              className="page-hero-img"
              style={{ objectPosition: "42% 50%" }}
            />
          ) : undefined
        }
        mediaLabel="Welcome to Namokar"
        mediaCaption="The reception at our Ashok Vihar centre, where your visit begins."
        aside={hasHero ? undefined : <FactPanel />}
      />

      {/* About Namokar */}
      <section id="about" className="section section--tight" aria-labelledby="about-h">
        <div className="container about-grid">
          <div className="section-head reveal">
            <p className="kicker">About Namokar</p>
            <h2 id="about-h" className="h2">Comprehensive Eye Care With a Special Focus on Oculoplasty</h2>
          </div>
          <div className="about-body reveal">
            <EditorialImage
              asset={ASSETS.exterior}
              caption=""
              ratio="cinema"
              position="50% 45%"
              sizes="(min-width: 960px) 55vw, 100vw"
            />
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
            <p>
              Our aim is not to rush a patient towards treatment. Where treatment may
              help, the reason, the alternatives and the next steps are discussed, so that
              you can make an informed decision at your own pace.
            </p>
            <h3 className="areas-h">Eye Care Available at Namokar</h3>
            <p>Comprehensive ophthalmology and specialist oculoplasty under one centre.</p>
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
      </section>

      {/* Meet Dr. Poonam Jain */}
      <section
        id="doctor"
        className="section section--porcelain"
        aria-labelledby="doctor-h"
      >
        <div className="container doctor-grid">
          <figure className="doctor-photo reveal">
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
            <p className="kicker">Meet your doctor</p>
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
            <h3 className="areas-h">Areas of focus</h3>
            <ul className="bullets">
              <li>Functional and aesthetic oculoplasty</li>
              <li>Ptosis and eyelid-position concerns</li>
              <li>Watering eyes and tear-drainage disorders</li>
              <li>Blepharoplasty and eye-area concerns</li>
              <li>Comprehensive ophthalmology</li>
              <li>Cataract evaluation and eye care</li>
            </ul>
            <div className="btn-row">
              <BookButton online={online} />
              <Link href={LINKS.doctor} className="text-link">
                Read Dr. Poonam Jain&rsquo;s Full Profile <ArrowRightIcon width={18} height={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications and training */}
      <section id="training" className="section" aria-labelledby="training-h">
        <div className="container train-grid">
          <div className="section-head reveal">
            <p className="kicker">Expertise</p>
            <h2 id="training-h" className="h2">Qualifications &amp; Advanced Training</h2>
            <p className="lead">
              Dr. Poonam Jain&apos;s medical education and further clinical training
              include:
            </p>
          </div>
          <div className="train-cols reveal">
            <div>
              <h3 className="h3">Qualifications</h3>
              <dl className="cred-rows">
                <div>
                  <dt>MBBS</dt>
                  <dd>Maulana Azad Medical College, New Delhi</dd>
                </div>
                <div>
                  <dt>MS, Ophthalmology</dt>
                  <dd>Safdarjung Hospital, New Delhi</dd>
                </div>
                <RegistrationRow />
              </dl>
            </div>
            <div>
              <h3 className="h3">Advanced training</h3>
              <dl className="cred-rows">
                <div>
                  <dt>Fellowship in Oculoplasty</dt>
                  <dd>Barraquer Institute, Barcelona, Spain</dd>
                </div>
                <div>
                  <dt>Observership</dt>
                  <dd>Wilmer Eye Institute, Johns Hopkins, Baltimore, USA</dd>
                </div>
              </dl>
            </div>
            <p className="fine">
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
          <div className="centre-head reveal">
            <div>
              <p className="kicker">Our centre</p>
              <h2 id="hospital-h" className="h2">The People and Spaces Behind Your Care</h2>
            </div>
            <p className="lead">
              Meet the team and see the actual rooms where patients are welcomed,
              examined and treated at our Ashok Vihar centre.
            </p>
          </div>
          <FacilityGallery items={gallery} label="Photographs inside the centre" />
        </div>
      </section>
      )}

      <VideoSection
        id="about-video"
        videos={videosFor("about")}
        kicker="Look inside"
        heading="Take a Walk Through Namokar"
        lead="Before your visit, see the reception, consultation spaces, examination areas and other parts of our Ashok Vihar centre."
        note="The video is general information and loads from YouTube only when you press play."
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
          <ol className="why-list">
            {JOURNEY.map((j, i) => (
              <li key={j.title} className="why-row">
                <span className="why-no" aria-hidden="true">0{i + 1}</span>
                <div>
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
