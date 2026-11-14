import Image from "next/image";
import Link from "next/link";
import { LINKS, SITE, TEL_HREF } from "@/config/site";
import { ArrowRightIcon, PhoneIcon } from "./Icons";
import { onlineBookingAvailable } from "@/lib/booking";
import styles from "./HomeCta.module.css";

export interface HomeCtaProps {
  online?: boolean;
  id?: string;
  kicker?: string;
  heading?: string;
  desc?: string;
}

export default function HomeCta({
  online = onlineBookingAvailable(),
  id = "contact",
  kicker = "Take the first step",
  heading = "Book Your Consultation Today",
  desc = "Take the first step towards clearer, healthier vision with doctor-led care at Namokar Eye & Oculoplasty Centre.",
}: HomeCtaProps) {
  const bookingHref = online ? `${LINKS.contact}#request` : TEL_HREF;

  return (
    <section id={id} className={`${styles.ctaSection} cta-section`} aria-labelledby={`${id}-h`}>
      <div className="container">
        <div className={`${styles.ctaPanel} cta-panel`}>
          <figure className={`${styles.ctaVisual} cta-visual`} aria-hidden="true">
            <Image
              src="/images/Hands Cupping Glowing Eye Icon.png"
              alt=""
              fill
              sizes="(min-width: 960px) 32vw, 100vw"
              className={`${styles.ctaPanelImage} cta-panel-image`}
            />
            <span className={`${styles.ctaVisualMark} cta-visual-mark`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6-9.5-6Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </figure>
          <div className={`${styles.ctaPanelCopy} cta-panel-copy`}>
            <p className={`${styles.kicker} kicker`}>{kicker}</p>
            <h2 id={`${id}-h`} className={`${styles.ctaTitle} cta-title`}>
              {heading}
            </h2>
            <p className={`${styles.ctaDesc} cta-desc`}>{desc}</p>
            <div className={`${styles.ctaPanelActions} cta-panel-actions`}>
              {online ? (
                <Link href={bookingHref} className="btn btn--primary">
                  Book a Consultation <ArrowRightIcon width={18} height={18} />
                </Link>
              ) : (
                <a href={bookingHref} className="btn btn--primary">
                  Call to Book <PhoneIcon width={18} height={18} />
                </a>
              )}
              <a
                href={TEL_HREF}
                className={`btn ${styles.ctaCallButton} cta-call-button`}
                aria-label={`Call ${SITE.name} on ${SITE.phone.display}`}
              >
                <PhoneIcon width={18} height={18} /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
