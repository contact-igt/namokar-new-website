import type { Metadata } from "next";
import { pageMeta, withBrand } from "@/lib/seo";
import AppointmentForm from "@/components/AppointmentForm";
import { CalendarIcon, MailIcon, MessageIcon, PhoneIcon, PinIcon, PlusIcon } from "@/components/Icons";
import MapEmbed from "@/components/MapEmbed";
import AssetImage from "@/components/AssetImage";
import PageHero from "@/components/PageHero";
import { ASSETS, usable } from "@/config/assets";
import {
  CHANNELS,
  HOURS,
  MAPS_LINK,
  PRIVACY_URL,
  SITE,
  TEL_HREF,
} from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import JsonLd from "@/components/JsonLd";
import { PAGES } from "@/config/routes";
import { clinic, faqPage, ids, webPage } from "@/lib/schema";

export const metadata: Metadata = pageMeta("contact", {
  title: withBrand("Contact Us"),
  description:
    "Contact Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi: call the centre, get directions and plan your visit or eye consultation.",
});

// Server-side decision: needs APPOINTMENT_FORM_ENABLED=on and a delivery endpoint. No public flag.
const formOn = onlineBookingAvailable();
const hoursText = HOURS.approved && HOURS.text ? HOURS.text : null;

const FAQS = [
  {
    q: "How can I request an appointment?",
    a: formOn
      ? `Call the centre on ${SITE.phone.display}, or send a request using the form on this page. A request is not a confirmed appointment.`
      : `Please call the centre on ${SITE.phone.display} to ask about arranging an eye consultation. Online appointment requests are not available yet.`,
  },
  {
    q: "Where is Namokar located?",
    a: `Namokar Eye & Oculoplasty Centre is at ${SITE.address.lines.join(", ")}, in ${SITE.area}.`,
  },
  {
    q: "Can I call before visiting?",
    a: `Yes. You can call the centre on ${SITE.phone.display} to ask about an appointment or about what to bring.`,
  },
  {
    q: "How do I find the centre?",
    a: `The address is ${SITE.address.lines.join(", ")}. ${SITE.address.landmark}. Use the Get Directions button on this page to open the address in Google Maps.`,
  },
];

const VISIT = [
  {
    title: "Where we are",
    text: `${SITE.address.lines.join(", ")}. ${SITE.address.landmark}.`,
  },
  {
    title: "Reaching reception",
    text: `Call ${SITE.phone.display}. Opening hours are not listed on this page yet, so please call to ask about arranging a visit.`,
  },
  {
    title: "Requesting an appointment",
    text: formOn
      ? "Call the centre or send a request using the form on this page. The centre will confirm a time with you; a request alone is not a booking."
      : "Please call the centre. Online appointment requests are not available yet.",
  },
  {
    title: "Before you come",
    text: "It helps to bring previous prescriptions, eye reports, your current spectacles and a list of the medicines you take. A relative or friend can come with you if that makes the visit easier.",
  },
];

export default function ContactPage() {
  return (
    <main id="main">
      <JsonLd page="contact"
        data={[
          webPage({ type: "ContactPage", path: PAGES.contact.path, name: "Contact Us", description: metadata.description as string, mainEntityId: ids.clinic }),
          clinic(),
          faqPage(PAGES.contact.path, FAQS),
        ]}
      />
      <PageHero
        crumb="Contact Us"
        title="We're Here to Help."
        lead="Contact Namokar Eye & Oculoplasty Centre to plan your visit or arrange an eye consultation."
        media={
          usable(ASSETS.exterior) ? (
            <AssetImage
              asset={ASSETS.exterior}
              fill
              eager
              sizes="(min-width: 960px) 58vw, 100vw"
              className="page-hero-img"
              style={{ objectPosition: "50% 45%" }}
            />
          ) : undefined
        }
        mediaCaption="Our Ashok Vihar centre, seen from the street."
      />

      {/* Contact actions */}
      <section id="actions" className="actions-wrap" aria-label="Contact actions">
        <ul className="container actions">
          <li>
            <a href={TEL_HREF} className="act act--primary">
              <PhoneIcon width={26} height={26} />
              <span className="act-text">
                <span className="act-title">Call the Centre</span>
                <span className="act-sub">{SITE.phone.display}</span>
              </span>
            </a>
          </li>
          <li>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="act">
              <PinIcon width={26} height={26} />
              <span className="act-text">
                <span className="act-title">
                  Get Directions
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
                <span className="act-sub">Opens Google Maps</span>
              </span>
            </a>
          </li>
          {formOn && (
            <li>
              <a href="#request" className="act">
                <CalendarIcon width={26} height={26} />
                <span className="act-text">
                  <span className="act-title">Request Appointment</span>
                  <span className="act-sub">Send a short enquiry</span>
                </span>
              </a>
            </li>
          )}
          {CHANNELS.whatsapp && (
            <li>
              <a
                href={`https://wa.me/${CHANNELS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="act"
              >
                <MessageIcon width={26} height={26} />
                <span className="act-text">
                  <span className="act-title">
                    WhatsApp
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                  <span className="act-sub">Message the centre</span>
                </span>
              </a>
            </li>
          )}
          {CHANNELS.email && (
            <li>
              <a href={`mailto:${CHANNELS.email}`} className="act">
                <MailIcon width={26} height={26} />
                <span className="act-text">
                  <span className="act-title">Email</span>
                  <span className="act-sub">{CHANNELS.email}</span>
                </span>
              </a>
            </li>
          )}
        </ul>
        {!formOn && (
          <p className="container actions-note">
            Appointments are arranged by phone. Online appointment requests are not
            available yet.
          </p>
        )}
      </section>

      {/* Location */}
      <section id="location" className="section section--tight" aria-labelledby="loc-h">
        <div className="container loc-grid">
          <div className="loc-info">
            <p className="kicker">Find us</p>
            <h2 id="loc-h" className="h2">Namokar Eye &amp; Oculoplasty Centre</h2>
            <dl className="info-rows">
              <div>
                <dt>Address</dt>
                <dd>
                  <address>
                    {SITE.address.lines.map((l) => (
                      <span key={l}>{l}<br /></span>
                    ))}
                  </address>
                  <span className="info-note">{SITE.address.landmark}</span>
                </dd>
              </div>
              <div>
                <dt>Telephone</dt>
                <dd>
                  <a href={TEL_HREF} className="text-link">{SITE.phone.display}</a>
                </dd>
              </div>
              {CHANNELS.email && (
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${CHANNELS.email}`} className="text-link">{CHANNELS.email}</a>
                  </dd>
                </div>
              )}
              <div>
                <dt>Opening hours</dt>
                <dd>{hoursText ?? "Not listed here yet. Please call the centre to ask."}</dd>
              </div>
            </dl>
          </div>
          <MapEmbed />
        </div>
      </section>

      {/* Appointment request */}
      <section
        id="request"
        className="section section--porcelain"
        aria-labelledby="request-h"
      >
        <div className="container req-grid">
          <div className="section-head">
            <p className="kicker">Appointments</p>
            <h2 id="request-h" className="h2">
              {formOn ? "Request an appointment" : "Arranging an appointment"}
            </h2>
            <p className="lead">
              {formOn
                ? "Leave your name and number and the centre may contact you to discuss a suitable time. This is a request, not a confirmed appointment."
                : "At present, appointments are arranged by phone. Please call the centre and the team will help you."}
            </p>
            {!formOn && (
              <a href={TEL_HREF} className="btn btn--primary">
                <PhoneIcon />
                Call {SITE.phone.display}
              </a>
            )}
          </div>
          {formOn && <AppointmentForm privacyUrl={PRIVACY_URL} />}
        </div>
      </section>

      {/* Visit information */}
      <section id="visit" className="section" aria-labelledby="visit-h">
        <div className="container why-grid">
          <div className="section-head">
            <p className="kicker">Plan your visit</p>
            <h2 id="visit-h" className="h2">Before you visit</h2>
          </div>
          <ul className="why-list">
            {VISIT.map((v) => (
              <li key={v.title} className="why-row why-row--plain">
                <div>
                  <h3 className="h3">{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section section--porcelain" aria-labelledby="faq-h">
        <div className="container faq-grid">
          <div className="section-head">
            <p className="kicker">Common questions</p>
            <h2 id="faq-h" className="h2">Contact and visiting</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f) => (
              <details key={f.q} className="faq">
                <summary>
                  <span>{f.q}</span>
                  <PlusIcon className="faq-plus" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
