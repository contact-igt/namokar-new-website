import Image from "next/image";
import Link from "next/link";
import { LINKS, SITE, TEL_HREF } from "@/config/site";
import { ArrowRightIcon, PhoneIcon } from "./Icons";

export default function HomeCta({ online }: { online: boolean }) {
  const bookingHref = online ? `${LINKS.contact}#request` : TEL_HREF;

  return (
    <section id="contact" className="cta-section" aria-labelledby="cta-h">
      <div className="container">
        <div className="cta-panel">
          <figure className="cta-visual" aria-hidden="true">
            <Image
              src="/images/Hands Cupping Glowing Eye Icon.png"
              alt=""
              fill
              sizes="(min-width: 960px) 32vw, 100vw"
              className="cta-panel-image"
            />
            <span className="cta-visual-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6-9.5-6-9.5-6Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </figure>
          <div className="cta-panel-copy">
            <p className="kicker">Take the first step</p>
            <h2 id="cta-h" className="cta-title">Book Your Consultation Today</h2>
            <p className="cta-desc">
              Take the first step towards clearer, healthier vision with doctor-led care at Namokar Eye &amp; Oculoplasty Centre.
            </p>
            <div className="cta-panel-actions">
              {online ? (
                <Link href={bookingHref} className="btn btn--primary">
                  Book a Consultation <ArrowRightIcon width={18} height={18} />
                </Link>
              ) : (
                <a href={bookingHref} className="btn btn--primary">
                  Call to Book <PhoneIcon width={18} height={18} />
                </a>
              )}
              <a href={TEL_HREF} className="btn cta-call-button" aria-label={`Call ${SITE.name} on ${SITE.phone.display}`}>
                <PhoneIcon width={18} height={18} /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
