import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import AssetImage from "@/components/AssetImage";
import EditorialImage from "@/components/EditorialImage";
import RegistrationRow from "@/components/RegistrationRow";
import BookButton from "@/components/BookButton";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import { ArrowRightIcon } from "@/components/Icons";
import NamePlate from "@/components/NamePlate";
import PageHero from "@/components/PageHero";
import { ASSETS, usable } from "@/config/assets";
import { PAGES } from "@/config/routes";
import { LINKS, SERVICES, SITE } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import JsonLd from "@/components/JsonLd";
import { faqPage, ids, physician, webPage } from "@/lib/schema";
import VideoSection from "@/components/VideoSection";
import { videosFor } from "@/content/videos";

export const metadata: Metadata = pageMeta("doctor", {
  title: "Dr. Poonam Jain | Senior Ophthalmologist in Ashok Vihar, Delhi",
  description:
    "Dr. Poonam Jain, Medical Director and Senior Ophthalmologist at Namokar Eye & Oculoplasty Centre, Ashok Vihar, New Delhi. Focus: oculoplasty and eyelid care.",
  ogType: "profile",
});

const FAQS = [
  {
    q: "How do I arrange a consultation?",
    a: `Please call the centre on ${SITE.phone.display}. Tell the team briefly what is troubling you and they will help you find a time.`,
  },
  {
    q: "What should I bring?",
    a: "Previous prescriptions and eye reports, your current spectacles and a list of the medicines you take.",
  },
  {
    q: "What is the difference between a fellowship and an observership?",
    a: "A fellowship is a period of advanced clinical training. An observership means observing clinical practice at another institution. It is not a degree or a fellowship.",
  },
];

export default function DoctorPage() {
  const online = onlineBookingAvailable();
  // The archive portrait leads when cleared; the earlier standing portrait is the fallback.
  const lead = [ASSETS.archDoctorScrubs, ASSETS.portrait].find(usable);
  const hasPortrait = Boolean(lead);
  const hasWork = usable(ASSETS.docSlit) || usable(ASSETS.docBlazer);

  return (
    <main id="main">
      <JsonLd page="doctor"
        data={[
          webPage({ type: "ProfilePage", path: PAGES.doctor.path, name: "Dr. Poonam Jain", description: metadata.description as string, mainEntityId: ids.physician }),
          physician(),
          faqPage(PAGES.doctor.path, FAQS),
        ]}
      />
      <PageHero
        crumb="Dr. Poonam Jain"
        trail={[{ label: "About", href: LINKS.about }]}
        eyebrow="Medical Director & Senior Ophthalmologist"
        title="Dr. Poonam Jain"
        lead="Leads Namokar Eye & Oculoplasty Centre, with a particular focus on oculoplasty."
        actions={<BookButton online={online} />}
        media={
          hasPortrait ? (
            <AssetImage
              asset={lead!}
              fill
              eager
              sizes="(min-width: 960px) 40vw, 100vw"
              className="page-hero-img"
              style={{ objectPosition: lead === ASSETS.portrait ? "50% 30%" : "50% 38%" }}
            />
          ) : undefined
        }
        aside={hasPortrait ? undefined : <div className="hero-nameplate"><NamePlate /></div>}
      />

      <section id="about" className="section section--tight" aria-labelledby="about-h">
        <div className="container about-grid">
          <div className="section-head reveal">
            <p className="kicker">About the doctor</p>
            <h2 id="about-h" className="h2">Doctor-led care, built around you</h2>
          </div>
          <div className="about-body reveal">
            <p>
              Dr. Poonam Jain is the Medical Director and Senior Ophthalmologist at
              Namokar. She has a particular focus on oculoplasty, the specialty that
              looks after the eyelids, tear passages and the area around the eyes.
            </p>
            <p>
              Care at Namokar is doctor-led. You are examined and advised by the doctor,
              and the discussion is built around your eyes, your concerns and the options
              that suit you.
            </p>
            <h3 className="areas-h">Areas of focus</h3>
            <ul className="bullets">
              <li>Oculoplasty: functional and aesthetic eyelid care</li>
              <li>Tear-drainage problems and watering eyes</li>
              <li>Comprehensive eye care as a senior ophthalmologist</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="training" className="section section--porcelain" aria-labelledby="training-h">
        <div className="container train-grid">
          <div className="section-head reveal">
            <p className="kicker">Expertise</p>
            <h2 id="training-h" className="h2">Qualifications and training</h2>
            <p className="lead">As they are currently recorded.</p>
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
              Both are past training, not a current affiliation with, or endorsement by,
              those institutions.
            </p>
          </div>
        </div>
      </section>

      {hasWork && (
        <section id="room" className="section" aria-labelledby="room-h">
          <div className="container">
            <div className="section-head reveal">
              <p className="kicker">At the centre</p>
              <h2 id="room-h" className="h2">In the consultation room</h2>
            </div>
            <div className="pair">
              <EditorialImage
                asset={ASSETS.docSlit}
                caption="Dr. Poonam Jain beside a slit-lamp examination unit."
                ratio="wide"
                position="55% 45%"
                sizes="(min-width: 960px) 58vw, 100vw"
              />
              <EditorialImage
                asset={ASSETS.docBlazer}
                caption="In her consultation room."
                ratio="tall"
                position="50% 30%"
                sizes="(min-width: 960px) 40vw, 100vw"
              />
            </div>
          </div>
        </section>
      )}

      <VideoSection
        id="doctor-video"
        videos={videosFor("doctor")}
        kicker="In her own words"
        heading="Hear from Dr. Poonam Jain"
        lead="A short talk from the centre's YouTube channel, and a clip at the centre."
        note="Statements in the videos are the doctor's own views, not a promise of any result."
      />

      <section id="care" className="section" aria-labelledby="care-h">
        <div className="container services-grid">
          <div className="section-head reveal">
            <p className="kicker">Areas of care</p>
            <h2 id="care-h" className="h2">Where she can help</h2>
            <p className="lead">
              Which treatments are offered is confirmed at the consultation.
            </p>
          </div>
          <ul className="svc-list">
            {SERVICES.map((s) => (
              <li key={s.key} className="reveal">
                <Link href={s.href} className="svc-row">
                  <span className="svc-row-text">
                    <span className="svc-title">{s.title}</span>
                  </span>
                  <ArrowRightIcon className="svc-row-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="section section--porcelain" aria-labelledby="faq-h">
        <div className="container faq-grid">
          <div className="section-head reveal">
            <p className="kicker">Common questions</p>
            <h2 id="faq-h" className="h2">Before your visit</h2>
          </div>
          <FaqList items={FAQS} />
        </div>
      </section>

      <CtaBand
        id="doctor-cta-h"
        heading="Arrange a consultation."
        lead="Contact the centre to plan your visit or arrange an eye consultation."
        online={online}
      />
    </main>
  );
}
