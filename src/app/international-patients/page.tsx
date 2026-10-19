import type { Metadata } from "next";
import { pageMeta, withBrand } from "@/lib/seo";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import EditorialImage from "@/components/EditorialImage";
import CtaBand from "@/components/CtaBand";
import HelpPanel from "@/components/HelpPanel";
import { ArrowRightIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import { ASSETS, usable } from "@/config/assets";
import { PAGES } from "@/config/routes";
import { LINKS, MAPS_LINK, SERVICES, SITE, TEL_HREF } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import JsonLd from "@/components/JsonLd";
import { webPage } from "@/lib/schema";

export const metadata: Metadata = pageMeta("international", {
  title: withBrand("International Patients"),
  description:
    "Visiting Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi from outside Delhi or abroad: how to get in touch, what to bring and what to ask first.",
});

const STEPS = [
  {
    title: "Call to ask about a visit",
    text: `Telephone the centre on ${SITE.phone.display} and say briefly what is troubling you. The team will tell you how a visit can be arranged.`,
  },
  {
    title: "Agree a time",
    text: "Confirm the day and time with the centre before you book travel. A telephone enquiry is not a booking until the centre confirms it.",
  },
  {
    title: "Gather what to bring",
    text: "Previous prescriptions, eye reports and scans, your current spectacles, a list of your medicines and a list of your questions.",
  },
  {
    title: "See the doctor in person",
    text: "The doctor examines your eyes and explains the findings and the options. Treatment, where it is needed, is discussed before you decide.",
  },
  {
    title: "Ask about follow-up before you travel",
    text: "Some conditions need review after a visit. Ask the centre what follow-up you may need, and whether it can be arranged where you live.",
  },
];

export default function InternationalPage() {
  const online = onlineBookingAvailable();
  return (
    <main id="main">
      <JsonLd
        data={webPage({ path: PAGES.international.path, name: "International and Outstation Patients", description: metadata.description as string })}
      />
      <PageHero
        crumb="International Patients"
        trail={[{ label: "About", href: LINKS.about }]}
        title="Visiting from outside Delhi or abroad."
        lead="How to get in touch, what to bring and what to ask before you travel to the centre in Ashok Vihar."
        actions={<BookButton online={online} />}
        aside={<HelpPanel heading="Contact the centre" />}
      />

      <section id="plan" className="section section--tight" aria-labelledby="plan-h">
        <div className="container why-grid">
          <div className="section-head reveal">
            <p className="kicker">Planning your visit</p>
            <h2 id="plan-h" className="h2">From first call to follow-up</h2>
            <p className="lead">A general outline of how a visit from further away usually works.</p>
          </div>
          <ol className="why-list">
            {STEPS.map((s, i) => (
              <li key={s.title} className="why-row">
                <span className="why-no" aria-hidden="true">0{i + 1}</span>
                <div>
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {(usable(ASSETS.exterior) || usable(ASSETS.reception)) && (
        <section id="arrive" className="section" aria-labelledby="arrive-h">
          <div className="container">
            <div className="section-head reveal">
              <p className="kicker">When you arrive</p>
              <h2 id="arrive-h" className="h2">What you will see</h2>
              <p className="lead">The centre is on the street front in Ashok Vihar, with a reception at the entrance.</p>
            </div>
            <div className="pair">
              <EditorialImage
                asset={ASSETS.exterior}
                caption="The centre from the street."
                ratio="cinema"
                position="50% 45%"
                sizes="(min-width: 960px) 58vw, 100vw"
              />
              <EditorialImage
                asset={ASSETS.reception}
                caption="Reception."
                ratio="wide"
                position="42% 50%"
                sizes="(min-width: 960px) 40vw, 100vw"
              />
            </div>
          </div>
        </section>
      )}

      <section id="careful" className="section section--porcelain" aria-labelledby="careful-h">
        <div className="container about-grid">
          <div className="section-head reveal">
            <p className="kicker">Please note</p>
            <h2 id="careful-h" className="h2">What this page does not promise</h2>
          </div>
          <div className="about-body reveal">
            <p>
              This page does not list help with visas, travel, accommodation, airport
              transfers, translation or insurance. If you need any of these, please ask
              the centre what is possible before you plan a trip.
            </p>
            <p>
              The centre cannot give a diagnosis or treatment advice without examining
              you. Please do not send medical records or personal health details through
              this website. If you would like the doctor to see your reports, ask the
              centre how to share them.
            </p>
          </div>
        </div>
      </section>

      <section id="care" className="section" aria-labelledby="care-h">
        <div className="container services-grid">
          <div className="section-head reveal">
            <p className="kicker">Areas of care</p>
            <h2 id="care-h" className="h2">What the centre looks after</h2>
            <p className="lead">Which treatments are offered is confirmed at the consultation.</p>
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

      <section id="find" className="section section--porcelain" aria-labelledby="find-h">
        <div className="container about-grid">
          <div className="section-head reveal">
            <p className="kicker">Finding the centre</p>
            <h2 id="find-h" className="h2">Where we are</h2>
          </div>
          <div className="about-body reveal">
            <address className="loc-address">
              {SITE.address.lines.map((l) => (
                <span key={l}>{l}<br /></span>
              ))}
              <span className="info-note">{SITE.address.landmark}</span>
            </address>
            <ul className="vp-links vp-links--dark">
              <li>
                <a href={TEL_HREF}>
                  <PhoneIcon width={20} height={20} />
                  {SITE.phone.display}
                </a>
              </li>
              <li>
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
                  <PinIcon width={20} height={20} />
                  Get directions
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
            <p>
              The <Link href={LINKS.contact} className="text-link">Contact page</Link> has a map.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        id="intl-cta-h"
        heading="Planning to visit?"
        lead="Contact the centre to plan your visit or arrange an eye consultation."
        online={online}
      />
    </main>
  );
}
