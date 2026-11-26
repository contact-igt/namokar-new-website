import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { pageMeta } from "@/lib/seo";
import { SERVICE_OPTIONS } from "@/lib/appointment";
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
  title: "Contact Namokar Eye & Oculoplasty Centre, Delhi",
  description:
    `Contact Namokar Eye & Oculoplasty Centre in Ashok Vihar, Delhi, to arrange an eye consultation with Dr. Poonam Jain. Call ${SITE.phone.display}.`,
});

const hoursText = HOURS.approved && HOURS.text ? HOURS.text : null;

const addressString = SITE.address.lines.join(", ");
const addressWithLandmark = SITE.address.landmark
  ? `${addressString}, ${SITE.address.landmark}`
  : addressString;

const CONFIRMATION = "Your appointment is confirmed once the centre provides the consultation date and time.";
const HOURS_GUIDANCE = "Please contact our reception team to confirm consultation hours and Dr. Poonam Jain's availability before visiting.";
const PRIVACY_GUIDANCE = "Ask reception for the approved way to share medical records. Avoid sending sensitive information through general enquiry forms or unverified channels.";

const contactFaqs = (formOn: boolean) => [
  { q: "How can I arrange an appointment at Namokar?", a: `Call ${SITE.name} on ${SITE.phone.display}. Our reception team will help arrange a suitable consultation.` },
  { q: "Can I book an appointment online?", a: formOn ? `You can send a consultation request using the form on this page. ${CONFIRMATION}` : "Appointments are currently arranged by phone. Please call reception to confirm a date and time." },
  ...(CHANNELS.whatsapp ? [{ q: "Can I contact the centre through WhatsApp?", a: `Use the WhatsApp link on this page for general enquiries. ${CONFIRMATION}` }] : []),
  { q: "What are the consultation timings?", a: hoursText ? `${hoursText}. Call reception to confirm doctor availability.` : HOURS_GUIDANCE },
  { q: "Where is Namokar Eye & Oculoplasty Centre located?", a: `The centre is at ${addressWithLandmark}. Use the Google Maps link on this page for directions.` },
  { q: "What should I bring to my first consultation?", a: "Bring your current spectacles or contact lens details, previous eye reports, prescriptions, relevant medical records, and a list of medicines and eye drops." },
  { q: "Can I consult Dr. Poonam Jain for general eye problems as well as oculoplasty?", a: "Yes. Namokar provides comprehensive ophthalmic care and specialised functional, reconstructive and aesthetic oculoplasty. Your assessment and treatment options depend on your clinical needs." },
  { q: "Will I need someone to accompany me?", a: "A companion may help, particularly if pupil dilation, surgery or a procedure requiring assistance is planned. Ask the centre before visiting." },
  { q: "Can patients from outside Delhi or overseas arrange a consultation?", a: "Yes. Contact the centre before travelling to discuss availability, consultation requirements and treatment arrangements." },
  { q: "What are the consultation charges?", a: "Ask reception for current consultation charges and any additional examination or diagnostic costs." },
  { q: "Does the centre accept health insurance or cashless payments?", a: "Check with the centre and your insurer about coverage, accepted payment methods and any cashless arrangements." },
  { q: "Can I share previous medical reports before visiting?", a: PRIVACY_GUIDANCE },
  { q: "What should I do if I have an eye emergency?", a: "Seek immediate emergency care for sudden vision loss, severe eye pain, significant injury, new flashes or a sudden increase in floaters. Do not wait for a routine appointment or a message response." },
];

const PREPARATION = [
  "Current spectacles or contact lens details",
  "Previous spectacle prescriptions and eye examination reports",
  "Details of previous eye or eyelid surgery and ongoing treatment",
  "A list of medicines and eye drops",
  "Relevant medical reports and details of existing conditions",
  "Allergies or medication reactions",
  "Questions or symptoms you want to discuss",
  "Sunglasses if pupil dilation is anticipated",
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

type ContactSearchParams = Promise<{ service?: string | string[] }>;

async function ConsultationForm({ searchParams, preview }: { searchParams: ContactSearchParams; preview: boolean }) {
  const { service } = await searchParams;
  const initialService = SERVICE_OPTIONS.find(({ value }) => value === service)?.value;
  return (
    <AppointmentForm
      privacyUrl={PRIVACY_URL ?? undefined}
      initialService={initialService}
      preview={preview}
    />
  );
}

export default function ContactPage({ searchParams }: { searchParams: ContactSearchParams }) {
  const formOn = onlineBookingAvailable();
  const previewForm = !formOn && process.env.NODE_ENV === "development";
  const faqs = contactFaqs(formOn);
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
          faqPage(PAGES.contact.path, faqs),
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
            <p className={styles.eyebrow}>Contact Us</p>
            <h1 id="contact-hero-h" className={styles.heroTitle}>Your Eye Care <span className="title-secondary">Journey Begins Here</span></h1>
            <div className={styles.heroTitleBar} aria-hidden="true" />
            <p className={styles.heroLead}>
              Connect with Namokar Eye &amp; Oculoplasty Centre for comprehensive eye care, specialised oculoplasty and personalised treatment guidance.
            </p>
            <p className={styles.heroLead}>Contact our team to arrange a consultation with Dr. Poonam Jain or plan your visit to Ashok Vihar, New Delhi.</p>
            <p className={styles.heroLead}><strong>See Better. Look Better.</strong></p>
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
                  <span className={styles.actionSub}>{SITE.phone.display}<br />Appointments &amp; enquiries</span>
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
                  <span className={styles.actionSub}>Find us in Ashok Vihar<br />Open Google Maps</span>
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
                      WhatsApp Enquiry
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                    <span className={styles.actionSub}>Contact our team for general enquiries</span>
                  </span>
                </a>
              </li>
            )}
            {formOn && (
              <li>
                <a href="#request" className={`${styles.actionCard} ${styles.actionCardSecondary}`}>
                  <CalendarIcon width={26} height={26} className={styles.actionIconSecondary} />
                  <span className={styles.actionText}>
                    <span className={styles.actionTitle}>Request a Consultation</span>
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
              <span>Appointments are currently arranged by phone. Please contact reception to confirm consultation availability and timings.</span>
            </p>
          )}
          {CHANNELS.whatsapp && <p className={styles.actionsNote}>WhatsApp is for general enquiries. {CONFIRMATION} For an eye emergency, seek immediate medical care.</p>}
        </div>
      </section>

      {/* 3. FIND US / LOCATION SECTION */}
      <section id="location" className={styles.findUsSection} aria-labelledby="loc-h">
        <div className="container">
          <div className={styles.findUsGrid}>
            <div className={styles.findUsInfo}>
              <p className={styles.eyebrow}>Find us</p>
              <h2 id="loc-h" className={styles.findUsHeading}>Visit Namokar Eye &amp; <span className="title-secondary">Oculoplasty Centre</span></h2>
              <p>Our Ashok Vihar centre provides comprehensive ophthalmic care and specialised functional, reconstructive and aesthetic oculoplasty. Confirm your consultation time before visiting.</p>
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
                      <strong>{SITE.name}</strong><br />
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
                      <p className={styles.contactNote}>For appointments and general enquiries.</p>
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
                    <span className={styles.contactLabel}>Consultation Timings</span>
                    <p className={styles.contactText}>
                      {hoursText ?? HOURS_GUIDANCE}
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
                {formOn ? "Request a Consultation" : "Book Your Eye Consultation"}
              </h2>
              <p className={styles.appointmentsLead}>
                Arrange a consultation for routine eye examinations, specialised ophthalmic treatment or functional and aesthetic oculoplasty. Reception can help confirm availability and explain how to prepare.
              </p>
              <ol>
                <li><strong>Contact Our Centre.</strong> {formOn ? "Call reception or use the form to request a consultation." : "Call reception and briefly explain the purpose of your visit."}</li>
                <li><strong>Confirm Your Appointment.</strong> Agree on a consultation date and time with the centre.</li>
                <li><strong>Prepare for Your Visit.</strong> Bring relevant reports, prescriptions and medical information.</li>
              </ol>
              <p className={styles.appointmentsLead}>{CONFIRMATION}</p>
              <figure className={styles.appointmentPhoto}>
                <Image
                  src="/images/ChatGPT Image Nov 13, 2026, 04_12_12 PM.png"
                  alt="Decorative eye-examination equipment and chair"
                  fill
                  sizes="(min-width: 960px) 520px, 100vw"
                  className={styles.appointmentPhotoImage}
                />
              </figure>
            </div>
            <div className={styles.formCard}>
              {formOn || previewForm ? (
                <Suspense fallback={<p>Loading consultation form…</p>}>
                  <ConsultationForm searchParams={searchParams} preview={previewForm} />
                </Suspense>
              ) : (
                <>
                  <h3 className={styles.appointmentsTitle}>Book by Phone</h3>
                  <p className={styles.appointmentsLead}>Call reception to check availability and arrange your consultation.</p>
                  <a href={TEL_HREF} className={styles.callAppointmentBtn}>
                    <PhoneIcon width={20} height={20} />
                    {SITE.phone.display}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PLAN YOUR VISIT / BEFORE YOU VISIT */}
      <section id="visit" className={styles.visitSection} aria-labelledby="visit-h">
        <div className="container">
          <p className={styles.eyebrow}>Plan your visit</p>
          <h2 id="visit-h" className={styles.visitHeading}>Preparing for Your <span className="title-secondary">Eye Consultation</span></h2>
          <div className={styles.visitCardsGrid}>
            <div className={styles.visitCard}>
              <div className={styles.visitIconCircle} aria-hidden="true"><ChecklistIcon /></div>
              <h3 className={styles.visitCardTitle}>What to Bring</h3>
              <ul className={styles.visitList}>
                {PREPARATION.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className={styles.visitCard}>
              <div className={styles.visitIconCircle} aria-hidden="true"><ClockIcon /></div>
              <h3 className={styles.visitCardTitle}>What to Plan For</h3>
              <p className={styles.visitCardText}>Allow time for your examination and any recommended tests. You may bring a companion if you need assistance.</p>
              <p className={styles.visitCardText}>Continue prescribed medicines and eye drops unless your treating doctor advises a change.</p>
              <p className={styles.visitCardText}>Pupil dilation can temporarily blur your vision and increase light sensitivity. Arrange a ride if needed, and wait until your vision is safe before driving.</p>
            </div>
          </div>
          {PRIVACY_URL && <Link href={PRIVACY_URL} className="text-link">Privacy Policy</Link>}
        </div>
      </section>

      {/* 6. COMMON QUESTIONS / FAQ SECTION */}
      <section id="faq" className={styles.faqSection} aria-labelledby="faq-h">
        <div className="container">
          <div className={styles.faqGrid}>
            <div className={styles.faqHeadingCol}>
              <p className={styles.eyebrow}>Common questions</p>
              <h2 id="faq-h" className={styles.faqHeading}>Contact and <span className="title-secondary">Visiting</span></h2>
            </div>
            <div className={styles.faqList}>
              {faqs.map((f) => (
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
