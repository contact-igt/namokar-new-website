import Image from "next/image";
import Link from "next/link";
import { LINKS, MAPS_LINK, SITE, TEL_HREF } from "@/config/site";
import { PinIcon, PhoneIcon } from "./Icons";

export default function HomeCta({ online }: { online: boolean }) {
  return (
    <section id="contact" className="cta-section" aria-labelledby="cta-h">
      {/* Background Image of patient eye examination at slit lamp */}
      <div className="cta-bg-layer" aria-hidden="true">
        <Image
          src="/images/cta-indian-patient.jpg"
          alt=""
          fill
          priority={false}
          className="cta-bg-photo"
          sizes="100vw"
        />
        <div className="cta-bg-gradient" />
      </div>

      <div className="container cta-container">
        <div className="cta-grid">
          {/* Left Column: Information, Address, Trust Badges */}
          <div className="cta-content">
            <h2 id="cta-h" className="cta-title">
              Have an Eye Concern?<br />
              Start With a <span>Consultation.</span>
            </h2>

            <p className="cta-desc">
              Whether you&rsquo;re looking for a routine eye check-up, cataract evaluation,
              glaucoma monitoring or advice about an eyelid or watering eye concern,
              the first step is an examination. Send a request or call us and we will help
              you find a suitable time.
            </p>

            <div className="cta-contact-rows">
              <div className="cta-contact-row">
                <span className="cta-icon-bullet" aria-hidden="true">
                  <PinIcon width={18} height={18} />
                </span>
                <span>
                  13 A, Pocket A, Phase 3, Ashok Vihar, near Satyawati College, Delhi 110052.
                </span>
              </div>
              <div className="cta-contact-row">
                <span className="cta-icon-bullet" aria-hidden="true">
                  <PhoneIcon width={18} height={18} />
                </span>
                <a href={TEL_HREF}>{SITE.phone.display}</a>
              </div>
            </div>

            {/* 4 Feature Trust Items with circular badges */}
            <div className="cta-features-strip" aria-label="Why consult Namokar">
              <div className="cta-feature-item">
                <div className="cta-feature-icon-circle" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <span className="cta-feature-label">
                  Expert<br />Ophthalmologists
                </span>
              </div>

              <div className="cta-feature-sep" aria-hidden="true" />

              <div className="cta-feature-item">
                <div className="cta-feature-icon-circle" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <span className="cta-feature-label">
                  Advanced<br />Technology
                </span>
              </div>

              <div className="cta-feature-sep" aria-hidden="true" />

              <div className="cta-feature-item">
                <div className="cta-feature-icon-circle" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    <path d="M12 9v4M10 11h4" />
                  </svg>
                </div>
                <span className="cta-feature-label">
                  Personalized<br />Eye Care
                </span>
              </div>

              <div className="cta-feature-sep" aria-hidden="true" />

              <div className="cta-feature-item">
                <div className="cta-feature-icon-circle" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <span className="cta-feature-label">
                  Quick &amp; Easy<br />Booking
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Consultation Card */}
          <div className="cta-card-col">
            <div className="cta-booking-card">
              <div className="cta-card-header">
                <span className="cta-card-header-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <circle cx="8" cy="14" r="1" fill="currentColor" />
                    <circle cx="12" cy="14" r="1" fill="currentColor" />
                    <circle cx="16" cy="14" r="1" fill="currentColor" />
                    <circle cx="8" cy="18" r="1" fill="currentColor" />
                    <circle cx="12" cy="18" r="1" fill="currentColor" />
                    <circle cx="16" cy="18" r="1" fill="currentColor" />
                  </svg>
                </span>
                <h3 className="cta-card-heading">Book a Consultation</h3>
              </div>

              <div className="cta-card-buttons">
                {online ? (
                  <Link href={`${LINKS.contact}#request`} className="cta-card-btn cta-card-btn--primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="19" height="19" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Book a Consultation
                  </Link>
                ) : (
                  <a href={TEL_HREF} className="cta-card-btn cta-card-btn--primary">
                    <PhoneIcon width={18} height={18} />
                    Call to Book an Appointment
                  </a>
                )}

                <a href={TEL_HREF} className="cta-card-btn cta-card-btn--secondary">
                  <PhoneIcon width={18} height={18} />
                  Call the Centre
                </a>
              </div>

              <div className="cta-card-footer">
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-card-directions-link"
                >
                  Get directions &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Dot Grid in bottom right corner */}
      <div className="cta-decor-dots" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      {/* Decorative Wave Swoop at bottom with orange accent line */}
      <div className="cta-bottom-wave-wrap" aria-hidden="true">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          preserveAspectRatio="none"
          className="cta-wave-svg"
        >
          <path
            d="M0,90 L0,48 Q220,95 440,65 C680,32 940,6 1180,18 C1300,24 1380,45 1440,55 L1440,90 Z"
            fill="#ffffff"
          />
          <path
            d="M0,48 Q220,95 440,65 C680,32 940,6 1180,18 C1300,24 1380,45 1440,55"
            stroke="#d66b1f"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}

