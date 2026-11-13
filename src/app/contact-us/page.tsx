import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMeta, withBrand } from "@/lib/seo";
import AppointmentForm from "@/components/AppointmentForm";
import {
  CalendarIcon,
  InfoIcon,
  MailIcon,
  MessageIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/Icons";
import MapEmbed from "@/components/MapEmbed";
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
import styles from "./contact.module.css";

export const metadata: Metadata = pageMeta("contact", {
  title: withBrand("Contact Us"),
  description:
    "Contact Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi: call the centre, get directions and plan your visit or eye consultation.",
});

// Server-side decision: needs APPOINTMENT_FORM_ENABLED=on and a delivery endpoint. No public flag.
const formOn = onlineBookingAvailable();
const hoursText = HOURS.approved && HOURS.text ? HOURS.text : null;

const addressString = SITE.address.lines.join(", ");
const addressWithLandmark = SITE.address.landmark
  ? `${addressString}, ${SITE.address.landmark}`
  : addressString;

const FAQS = [
  {
    q: "How can I request an appointment?",
    a: formOn
      ? `Call the centre on ${SITE.phone.display}, or send a request using the form on this page. A request is not a confirmed appointment.`
      : `Please call the centre on ${SITE.phone.display} to ask about arranging an eye consultation. Online appointment requests are not available yet.`,
  },
  {
    q: "Where is Namokar located?",
    a: `Namokar Eye & Oculoplasty Centre is at ${addressString}, in ${SITE.area}.`,
  },
  {
    q: "Can I call before visiting?",
    a: `Yes. You can call the centre on ${SITE.phone.display} to ask about an appointment or about what to bring.`,
  },
  {
    q: "How do I find the centre?",
    a: `The address is ${addressWithLandmark}. Use the Get Directions button on this page to open the address in Google Maps.`,
  },
];

const VISIT = [
  {
    title: "Where we are",
    text: `${addressWithLandmark}.`,
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

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0M14 20a4 4 0 0 1 7-1.5" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 3h6v4H9zM9 11h6M9 15h6M9 18h3" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="m8 12 3 3 5-5" />
      <path d="M8 3v2M16 3v2" />
    </svg>
  );
}

function CalendarVisual() {
  return (
    <div className={styles.calendarVisualWrap} aria-hidden="true">
      <div className={styles.calendarGlow} />
      <svg
        className={styles.calendarSvg}
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <defs>
          <filter id="calShadow" x="-15%" y="-10%" width="135%" height="135%">
            <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#84370a" floodOpacity="0.16" />
          </filter>
          <filter id="clockShadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#84370a" floodOpacity="0.22" />
          </filter>
          <linearGradient id="calBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fffaf6" />
          </linearGradient>
          <linearGradient id="calHeader" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e26a20" />
            <stop offset="100%" stopColor="#c45110" />
          </linearGradient>
          <linearGradient id="clockRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ea752c" />
            <stop offset="100%" stopColor="#bf4c0c" />
          </linearGradient>
        </defs>

        {/* Calendar Body */}
        <g filter="url(#calShadow)">
          {/* Card Base */}
          <rect x="25" y="45" width="160" height="165" rx="28" fill="url(#calBg)" stroke="#f5e4d7" strokeWidth="2" />
          {/* Calendar Header Band */}
          <path
            d="M 25 73 C 25 57.536 37.536 45 53 45 L 157 45 C 172.464 45 185 57.536 185 73 L 185 88 L 25 88 Z"
            fill="url(#calHeader)"
          />
          {/* Binder Tabs */}
          <rect x="62" y="34" width="16" height="22" rx="8" fill="#ffffff" stroke="#c45110" strokeWidth="3" />
          <rect x="132" y="34" width="16" height="22" rx="8" fill="#ffffff" stroke="#c45110" strokeWidth="3" />

          {/* Calendar Day Squares (3x3 grid) */}
          <rect x="52" y="108" width="20" height="20" rx="6" fill="#fde5d4" />
          <rect x="95" y="108" width="20" height="20" rx="6" fill="#fde5d4" />
          <rect x="138" y="108" width="20" height="20" rx="6" fill="#fde5d4" />
          <rect x="52" y="138" width="20" height="20" rx="6" fill="#fde5d4" />
          <rect x="95" y="138" width="20" height="20" rx="6" fill="#df671b" />
          <rect x="138" y="138" width="20" height="20" rx="6" fill="#fde5d4" />
          <rect x="52" y="168" width="20" height="20" rx="6" fill="#fde5d4" />
          <rect x="95" y="168" width="20" height="20" rx="6" fill="#fde5d4" />
        </g>

        {/* Clock Overlap at Bottom Right */}
        <g filter="url(#clockShadow)">
          <circle cx="180" cy="188" r="46" fill="#ffffff" stroke="url(#clockRing)" strokeWidth="9" />
          <circle cx="180" cy="188" r="5" fill="#c45110" />
          <line x1="180" y1="188" x2="194" y2="166" stroke="#c45110" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="180" y1="188" x2="204" y2="188" stroke="#c45110" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main id="main" className={styles.page}>
      <JsonLd
        page="contact"
        data={[
          webPage({
            type: "ContactPage",
            path: PAGES.contact.path,
            name: "Contact Us",
            description: metadata.description as string,
            mainEntityId: ids.clinic,
          }),
          clinic(),
          faqPage(PAGES.contact.path, FAQS),
        ]}
      />

      {/* 1. HERO SECTION */}
      <section className={styles.hero} aria-labelledby="contact-hero-h">
        <div className="container">
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
            <span className={styles.breadcrumbCurrent} aria-current="page">Contact Us</span>
          </nav>
          <div className={styles.heroCopy}>
            <h1 id="contact-hero-h" className={styles.heroTitle}>We&apos;re Here to Help.</h1>
            <div className={styles.heroTitleBar} aria-hidden="true" />
            <p className={styles.heroLead}>
              Contact Namokar Eye &amp; Oculoplasty Centre to plan your visit or arrange an eye consultation.
            </p>
          </div>
        </div>
      </section>

      {/* 2. QUICK CONTACT ACTION ROW */}
      <section id="actions" className={styles.actionsSection} aria-label="Contact actions">
        <div className="container">
          <ul className={styles.actionsGrid}>
            <li>
              <a href={TEL_HREF} className={`${styles.actionCard} ${styles.actionCardPrimary}`}>
                <PhoneIcon width={26} height={26} className={styles.actionIconPrimary} />
                <span className={styles.actionText}>
                  <span className={styles.actionTitle}>Call the Centre</span>
                  <span className={styles.actionSub}>{SITE.phone.display}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.actionCard} ${styles.actionCardSecondary}`}
              >
                <PinIcon width={26} height={26} className={styles.actionIconSecondary} />
                <span className={styles.actionText}>
                  <span className={styles.actionTitle}>
                    Get Directions
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                  <span className={styles.actionSub}>Opens Google Maps</span>
                </span>
              </a>
            </li>
            {CHANNELS.whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${CHANNELS.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionCard} ${styles.actionCardSecondary}`}
                >
                  <MessageIcon width={26} height={26} className={styles.actionIconSecondary} />
                  <span className={styles.actionText}>
                    <span className={styles.actionTitle}>
                      WhatsApp
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                    <span className={styles.actionSub}>Message the centre</span>
                  </span>
                </a>
              </li>
            )}
            {formOn && (
              <li>
                <a href="#request" className={`${styles.actionCard} ${styles.actionCardSecondary}`}>
                  <CalendarIcon width={26} height={26} className={styles.actionIconSecondary} />
                  <span className={styles.actionText}>
                    <span className={styles.actionTitle}>Request Appointment</span>
                    <span className={styles.actionSub}>Send a short enquiry</span>
                  </span>
                </a>
              </li>
            )}
            {CHANNELS.email && (
              <li>
                <a href={`mailto:${CHANNELS.email}`} className={`${styles.actionCard} ${styles.actionCardSecondary}`}>
                  <MailIcon width={26} height={26} className={styles.actionIconSecondary} />
                  <span className={styles.actionText}>
                    <span className={styles.actionTitle}>Email</span>
                    <span className={styles.actionSub}>{CHANNELS.email}</span>
                  </span>
                </a>
              </li>
            )}
          </ul>
          {!formOn && (
            <p className={styles.actionsNote}>
              <InfoIcon width={17} height={17} aria-hidden="true" />
              <span>Appointments are arranged by phone. Online appointment requests are not available yet.</span>
            </p>
          )}
        </div>
      </section>

      {/* 3. FIND US / LOCATION SECTION */}
      <section id="location" className={styles.findUsSection} aria-labelledby="loc-h">
        <div className="container">
          <div className={styles.findUsGrid}>
            <div className={styles.findUsInfo}>
              <p className={styles.eyebrow}>Find us</p>
              <h2 id="loc-h" className={styles.findUsHeading}>Namokar Eye &amp; Oculoplasty Centre</h2>
            </div>
            <div className={styles.mapCard}>
              <MapEmbed />
            </div>
            <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <div className={styles.contactIconBox} aria-hidden="true">
                    <PinIcon width={24} height={24} />
                  </div>
                  <div className={styles.contactDetails}>
                    <span className={styles.contactLabel}>Address</span>
                    <address className={styles.contactText}>
                      {SITE.address.lines.map((l) => (
                        <span key={l}>{l}<br /></span>
                      ))}
                      {SITE.address.landmark ? (
                        <span className={styles.contactNote}>{SITE.address.landmark}</span>
                      ) : null}
                    </address>
                  </div>
                </li>
                <li className={styles.contactItem}>
                  <div className={styles.contactIconBox} aria-hidden="true">
                    <PhoneIcon width={24} height={24} />
                  </div>
                  <div className={styles.contactDetails}>
                    <span className={styles.contactLabel}>Telephone</span>
                    <div className={styles.contactText}>
                      <a href={TEL_HREF}>{SITE.phone.display}</a>
                    </div>
                  </div>
                </li>
                {CHANNELS.email && (
                  <li className={styles.contactItem}>
                    <div className={styles.contactIconBox} aria-hidden="true">
                      <MailIcon width={24} height={24} />
                    </div>
                    <div className={styles.contactDetails}>
                      <span className={styles.contactLabel}>Email</span>
                      <div className={styles.contactText}>
                        <a href={`mailto:${CHANNELS.email}`}>{CHANNELS.email}</a>
                      </div>
                    </div>
                  </li>
                )}
                <li className={styles.contactItem}>
                  <div className={styles.contactIconBox} aria-hidden="true">
                    <ClockIcon />
                  </div>
                  <div className={styles.contactDetails}>
                    <span className={styles.contactLabel}>Opening hours</span>
                    <p className={styles.contactText}>
                      {hoursText ?? "Not listed here yet. Please call the centre to ask."}
                    </p>
                  </div>
                </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. APPOINTMENTS SECTION */}
      <section id="request" className={styles.appointmentsSection} aria-labelledby="request-h">
        <div className="container">
          <div className={styles.appointmentsGrid}>
            <div className={styles.appointmentsCopy}>
              <p className={styles.eyebrow}>Appointments</p>
              <h2 id="request-h" className={styles.appointmentsTitle}>
                {formOn ? "Request an appointment" : "Arranging an Appointment"}
              </h2>
              <p className={styles.appointmentsLead}>
                {formOn
                  ? "Leave your name and number and the centre may contact you to discuss a suitable time. This is a request, not a confirmed appointment."
                  : "At present, appointments are arranged by phone. Please call the centre and the team will help you."}
              </p>
              <figure className={styles.appointmentPhoto}>
                <Image
                  src="/images/ChatGPT Image Nov 13, 2026, 04_12_12 PM.png"
                  alt="Decorative eye-examination equipment and chair"
                  fill
                  sizes="(min-width: 960px) 520px, 100vw"
                  className={styles.appointmentPhotoImage}
                />
              </figure>
              {!formOn && (
                <a href={TEL_HREF} className={styles.callAppointmentBtn}>
                  <PhoneIcon width={20} height={20} />
                  Call {SITE.phone.display}
                </a>
              )}
            </div>
            <div className={styles.formCard}>
              <AppointmentForm privacyUrl={PRIVACY_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. PLAN YOUR VISIT / BEFORE YOU VISIT */}
      <section id="visit" className={styles.visitSection} aria-labelledby="visit-h">
        <div className="container">
          <div className={styles.visitLayout}>
            <div className={styles.calendarVisualCol}>
              <CalendarVisual />
            </div>
            <div className={styles.visitContentCol}>
              <p className={styles.eyebrow}>Plan your visit</p>
              <h2 id="visit-h" className={styles.visitHeading}>Before you visit</h2>
              <div className={styles.visitCardsGrid}>
                <div className={styles.visitCard}>
                  <div className={styles.visitIconCircle} aria-hidden="true">
                    <PinIcon width={22} height={22} />
                  </div>
                  <h3 className={styles.visitCardTitle}>{VISIT[0].title}</h3>
                  <p className={styles.visitCardText}>{VISIT[0].text}</p>
                </div>
                <div className={styles.visitCard}>
                  <div className={styles.visitIconCircle} aria-hidden="true">
                    <TeamIcon />
                  </div>
                  <h3 className={styles.visitCardTitle}>{VISIT[1].title}</h3>
                  <p className={styles.visitCardText}>{VISIT[1].text}</p>
                </div>
                <div className={styles.visitCard}>
                  <div className={styles.visitIconCircle} aria-hidden="true">
                    <DocumentIcon />
                  </div>
                  <h3 className={styles.visitCardTitle}>{VISIT[2].title}</h3>
                  <p className={styles.visitCardText}>{VISIT[2].text}</p>
                </div>
              </div>
              {VISIT[3] && (
                <div className={styles.visitCardSpan}>
                  <div className={styles.visitIconCircle} aria-hidden="true">
                    <ChecklistIcon />
                  </div>
                  <div className={styles.visitCardSpanContent}>
                    <h3 className={styles.visitCardTitle}>{VISIT[3].title}</h3>
                    <p className={styles.visitCardText}>{VISIT[3].text}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMMON QUESTIONS / FAQ SECTION */}
      <section id="faq" className={styles.faqSection} aria-labelledby="faq-h">
        <div className="container">
          <div className={styles.faqGrid}>
            <div className={styles.faqHeadingCol}>
              <p className={styles.eyebrow}>Common questions</p>
              <h2 id="faq-h" className={styles.faqHeading}>Contact and Visiting</h2>
            </div>
            <div className={styles.faqList}>
              {FAQS.map((f) => (
                <details key={f.q} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{f.q}</span>
                    <span className={styles.faqPlus} aria-hidden="true">+</span>
                  </summary>
                  <p className={styles.faqAnswer}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
