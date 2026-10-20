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
    title: "Enquiry and appointment",
    text: "Contact the centre to ask about arranging a visit. Tell us briefly what is troubling you.",
  },
  {
    title: "Clinical assessment",
    text: "Your eyes are examined. Please bring previous prescriptions, eye reports, your current spectacles and a list of your medicines.",
  },
  {
    title: "Doctor consultation",
    text: "The doctor explains the findings in plain language and answers your questions.",
  },
  {
    title: "Treatment discussion",
    text: "Where treatment may help, the options are discussed so you can decide at your own pace. Not every patient needs treatment.",
  },
  {
    title: "Recommended follow-up",
    text: "Where needed, the doctor advises on follow-up. Some conditions, such as glaucoma, need regular monitoring.",
  },
];


export default function AboutPage() {
  const online = onlineBookingAvailable();
  const hasHero = usable(ASSETS.reception);
  const aboutPortrait = usable(ASSETS.portrait) ? ASSETS.portrait : null;
  const hasPortrait = Boolean(aboutPortrait);
  const gallery = compact([
    photoItem(ASSETS.reception, { title: "Reception", caption: "The first point of contact when you arrive.", position: "42% 50%" }),
    photoItem(ASSETS.otModernB, { title: "Operation theatre", caption: "The operating table, operating microscope and a surgical console.", position: "50% 55%" }),
    photoItem(ASSETS.otModernC, { title: "Theatre, from the corner", caption: "Shelving, a trolley, the operating table and the microscope.", position: "50% 55%" }),
    photoItem(ASSETS.chartDoor, { title: "Examination room", caption: "An eye-chart screen beside an examination room door.", position: "50% 40%" }),
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
        title="Care That Begins With Understanding."
        lead="Get to know the people, facilities and approach behind Namokar Eye & Oculoplasty Centre."
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
        mediaCaption="The reception at our Ashok Vihar centre."
        aside={hasHero ? undefined : <FactPanel />}
      />

      {/* About Namokar */}
      <section id="about" className="section section--tight" aria-labelledby="about-h">
        <div className="container about-grid">
          <div className="section-head reveal">
            <p className="kicker">About Namokar</p>
            <h2 id="about-h" className="h2">An eye-care and oculoplasty centre in Ashok Vihar.</h2>
          </div>
          <div className="about-body reveal">
            <EditorialImage
              asset={ASSETS.exterior}
              caption="The centre in Ashok Vihar, seen from the street."
              ratio="cinema"
              position="50% 45%"
              sizes="(min-width: 960px) 55vw, 100vw"
            />
            <p>
              Namokar Eye &amp; Oculoplasty Centre is in {SITE.area}. It offers
              comprehensive eye care, from routine and condition-led examinations to
              cataract and glaucoma care, alongside specialist oculoplasty: the care of
              the eyelids, tear passages and the area around the eyes. The centre has a
              reception, consultation and examination rooms, and an operation theatre.
            </p>
            <p>
              Care is led by Dr. Poonam Jain, Medical Director and Senior
              Ophthalmologist. You are examined and advised by the doctor, and the
              discussion is built around your eyes, your concerns and the options that
              suit you.
            </p>
            <p>
              At each step the findings and options are explained in plain language, so
              that you can decide about your care at your own pace.
            </p>
            <h3 className="areas-h">Areas of care</h3>
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
            <h2 id="doctor-h" className="h2 h2--xl">Dr. Poonam Jain</h2>
            <p className="doctor-role">Medical Director &amp; Senior Ophthalmologist</p>
            <p className="lead">
              Dr. Poonam Jain leads Namokar and has a particular focus on oculoplasty,
              the specialty that looks after the eyelids, tear passages and the area
              around the eyes.
            </p>
            <h3 className="areas-h">Areas of focus</h3>
            <ul className="bullets">
              <li>Oculoplasty: functional and aesthetic eyelid care</li>
              <li>Tear-drainage problems and watering eyes</li>
              <li>Comprehensive eye care as a senior ophthalmologist</li>
            </ul>
            <div className="btn-row">
              <BookButton online={online} />
              <Link href={LINKS.doctor} className="text-link">
                Read the full profile <ArrowRightIcon width={18} height={18} />
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
            <h2 id="training-h" className="h2">Qualifications and training</h2>
            <p className="lead">
              Dr. Poonam Jain&apos;s qualifications and further training, as they are
              currently recorded.
            </p>
          </div>
          <div className="train-cols reveal">
            <div>
              <h3 className="h3">Qualifications</h3>
              <dl className="cred-rows">
                <div>
                  <dt>MBBS</dt>
                  <dd>Bachelor of Medicine and Bachelor of Surgery</dd>
                </div>
                <div>
                  <dt>MS, Ophthalmology</dt>
                  <dd>Postgraduate surgical degree in ophthalmology</dd>
                </div>
                <RegistrationRow />
              </dl>
            </div>
            <div>
              <h3 className="h3">Further training</h3>
              <dl className="cred-rows">
                <div>
                  <dt>Fellowship</dt>
                  <dd>Oculoplasty, Barraquer Institute, Barcelona</dd>
                </div>
                <div>
                  <dt>Observership</dt>
                  <dd>Wilmer Eye Institute, Johns Hopkins, Baltimore</dd>
                </div>
              </dl>
            </div>
            <p className="fine">
              A fellowship is a period of advanced clinical training. An observership
              means observing clinical practice, and is not a degree or a fellowship.
              Both are past training, not a current affiliation with those institutions.
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
              <p className="kicker">The centre</p>
              <h2 id="hospital-h" className="h2">Inside Our Centre</h2>
            </div>
            <p className="lead">
              A closer look at the spaces and equipment at the centre.
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
        heading="A closer look at the centre"
        lead="A short tour from the centre's own YouTube channel."
        note="The video is general information and loads from YouTube only when you press play."
      />

      {/* Care journey */}
      <section id="journey" className="section" aria-labelledby="journey-h">
        <div className="container why-grid">
          <div className="section-head reveal">
            <p className="kicker">What to expect</p>
            <h2 id="journey-h" className="h2">A patient-centred approach</h2>
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
        heading="Take the Next Step Towards Better Eye Care."
        lead="Contact the centre to plan your visit or arrange an eye consultation."
        online={online}
      />
    </main>
  );
}
