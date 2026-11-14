import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/config/site";
import { CalendarIcon } from "./Icons";

/** Eye icon for Advanced Technology */
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#B85D19" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1.1" fill="#B85D19" stroke="none" />
    </svg>
  );
}

/** Shield with checkmark for Expert Care */
function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#B85D19" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/** Heart icon for Better Vision */
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#B85D19" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7Z" />
    </svg>
  );
}

interface ServicePageHeroProps {
  /** Breadcrumb current title */
  crumb?: string;
  /** Section Kicker */
  kicker?: string;
  /** Main heading first line */
  titlePrefix?: string;
  /** Main heading orange highlight line */
  titleHighlight?: string;
  /** Lead body text */
  body?: string;
  /** Primary button label */
  primaryLabel?: string;
  /** Primary button destination */
  primaryHref?: string;
  /** Secondary button label */
  secondaryLabel?: string;
  /** Secondary button destination */
  secondaryHref?: string;
  /** Right side hero card image */
  image?: string;
  /** Right side hero card image alt */
  imageAlt?: string;
}

export default function ServicePageHero({
  crumb = "Cataract Surgery",
  kicker = "CATARACT SURGERY",
  titlePrefix = "Clear Vision,",
  titleHighlight = "Brighter Life.",
  body = "Advanced cataract surgery with precision technology to help you see the world clearly again.",
  primaryLabel = "Learn About Cataract Surgery",
  primaryHref = "#overview",
  secondaryLabel = "Book a Consultation",
  secondaryHref = `${LINKS.contact}#request`,
  image = "/images/cataract-hero-card-hq.webp",
  imageAlt = "Doctor performing slit-lamp eye examination on a patient at Namokar Eye Centre",
}: ServicePageHeroProps) {
  return (
    <div className="svc-hero-wrapper">
      <section className="svc-hero-section" aria-label="Cataract Care Overview">
        {/* Soft Decorative Background Waves */}
        <div className="svc-hero-bg-decor" aria-hidden="true">
          <svg viewBox="0 0 1440 680" preserveAspectRatio="none" className="svc-hero-bg-svg">
            <defs>
              <linearGradient id="svcPeachWave" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F9DFCB" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#FDEFE4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFFBF7" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Smooth curving wave under the right card */}
            <path
              d="M 640 680 C 760 580, 940 500, 1140 480 C 1280 460, 1380 470, 1440 490 L 1440 680 Z"
              fill="url(#svcPeachWave)"
            />
          </svg>
        </div>

        <div className="container svc-hero-container">
          <div className="svc-hero-layout">
            {/* Left Column: Content */}
            <div className="svc-hero-col-text">
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="svc-crumbs">
                <ol>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li className="svc-crumbs-sep" aria-hidden="true">&gt;</li>
                  <li aria-current="page">{crumb}</li>
                </ol>
              </nav>

              {/* Kicker with orange dash */}
              <div className="svc-kicker">
                <span className="svc-kicker-bar" aria-hidden="true" />
                <span>{kicker}</span>
              </div>

              {/* Main Heading */}
              <h1 className="svc-heading">
                {titlePrefix}{" "}
                <span className="svc-heading-orange">{titleHighlight}</span>
              </h1>

              {/* Lead Body Paragraph */}
              <p className="svc-lead">{body}</p>

              {/* Action Buttons */}
              <div className="svc-actions">
                <a href={primaryHref} className="svc-btn-primary">
                  <span>{primaryLabel}</span>
                  <span className="svc-btn-arrow" aria-hidden="true">&rarr;</span>
                </a>

                <Link href={secondaryHref} className="svc-btn-secondary">
                  <span className="svc-btn-icon" aria-hidden="true">
                    <CalendarIcon width={18} height={18} />
                  </span>
                  <span>{secondaryLabel}</span>
                </Link>
              </div>

              {/* 3 Feature Highlights Strip */}
              <div className="svc-features" role="list">
                <div className="svc-feature-item" role="listitem">
                  <div className="svc-feature-icon-wrap" aria-hidden="true">
                    <EyeIcon />
                  </div>
                  <div className="svc-feature-text">
                    Advanced<br />Technology
                  </div>
                </div>

                <div className="svc-feature-sep" aria-hidden="true" />

                <div className="svc-feature-item" role="listitem">
                  <div className="svc-feature-icon-wrap" aria-hidden="true">
                    <ShieldCheckIcon />
                  </div>
                  <div className="svc-feature-text">
                    Expert<br />Care
                  </div>
                </div>

                <div className="svc-feature-sep" aria-hidden="true" />

                <div className="svc-feature-item" role="listitem">
                  <div className="svc-feature-icon-wrap" aria-hidden="true">
                    <HeartIcon />
                  </div>
                  <div className="svc-feature-text">
                    Better<br />Vision
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="svc-hero-col-visual">
              <div className="svc-card-wrapper">
                <Image
                  src={image}
                  alt={imageAlt}
                  width={1300}
                  height={1300}
                  priority
                  quality={98}
                  className="svc-card-img"
                  sizes="(min-width: 960px) 48vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
