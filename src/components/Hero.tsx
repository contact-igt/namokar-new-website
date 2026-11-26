"use client";

import HeadingText from "@/components/HeadingText";
import { ArrowRightIcon, PhoneIcon } from "./Icons";
import {
  CalendarDays,
  Clock,
  Eye,
  Globe,
  GraduationCap,
  HeartHandshake,
  ScanLine,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { LINKS, TEL_HREF } from "@/config/site";
import { usePrefersReducedMotion } from "./motion/useMedia";

const AUTO_MS = 6000;

const HERO_SLIDES = [
  {
    id: "exterior",
    label: "Complete eye care",
    image: "/images/Namokar Eye Centre Exterior.png",
    alt: "The exterior of Namokar Eye & Oculoplasty Centre",
    badge: "28+ Years of Clinical Experience",
    title: "Complete Eye Care & Advanced Oculoplasty",
    body: "From comprehensive eye examinations and cataract surgery to retina care, vision correction and aesthetic eyelid surgery, personalised eye care under one roof.",
    cta: "Book a Consultation",
    destination: "booking",
  },
  {
    id: "oculoplasty",
    label: "Oculoplasty care",
    image: "/images/banner-slide-oculoplasty.png",
    alt: "An eye specialist examines a patient using a slit lamp",
    badge: "Specialised Oculoplasty Care",
    title: "Advanced Oculoplasty for Function & Appearance",
    body: "Specialised functional, reconstructive and aesthetic care for the eyelids, tear passages and surrounding eye structures, with treatment tailored to individual needs.",
    cta: "Explore Oculoplasty",
    destination: "#oculoplasty",
  },
  {
    id: "centre",
    label: "Diagnostic exam room",
    image: "/images/Modern Ophthalmology Exam Room 11.png",
    alt: "Diagnostic eye examination setup with orange chair and advanced ophthalmic equipment",
    badge: "Comprehensive Eye Assessment",
    title: "Advanced Diagnostics. Personalised Eye Care.",
    body: "Detailed eye examinations and diagnostic assessments to help detect eye conditions, evaluate your vision and guide appropriate treatment.",
    cta: "Book an Eye Examination",
    destination: "examsBooking",
  },
  {
    id: "waiting",
    label: "Waiting room",
    image: "/images/Modern Ophthalmology Clinic Waiting Room-clean.png",
    alt: "The waiting room and diagnostic equipment at Namokar Eye & Oculoplasty Centre",
    badge: "Patient-Centred Care",
    title: "Care That Understands Your Needs",
    body: "A welcoming environment where your concerns are heard, your eye health is carefully assessed and your treatment options are clearly explained.",
    cta: "Explore Our Centre",
    destination: "#centre",
  },
  {
    id: "cataract",
    label: "Cataract care",
    image: "/images/Modern Ophthalmology Exam Room.png",
    alt: "Warm ophthalmic consultation and slit-lamp examination room at Namokar Eye Centre",
    badge: "Personalised Surgical Care",
    title: "Cataract Surgery & Vision Correction",
    body: "Individualised surgical assessment and treatment planning, including cataract surgery, intraocular lens options and suitable refractive procedures.",
    cta: "Explore Eye Care Services",
    destination: LINKS.allServices,
  },
] as const;

const TRUST_ITEMS = [
  { label: "28+ Years of Clinical Experience", icon: Clock },
  { label: "Internationally Trained Ophthalmologist", icon: Globe },
  { label: "Barraquer Institute Fellowship", icon: GraduationCap },
  { label: "Wilmer Eye Institute Observership", icon: GraduationCap },
  { label: "Comprehensive Eye Care", icon: Eye },
  { label: "Specialised Oculoplasty", icon: Stethoscope },
  { label: "Aesthetic Eyelid Surgery", icon: Eye },
  { label: "Modern Diagnostic Facilities", icon: ScanLine },
  { label: "Patient-Centred Care", icon: HeartHandshake },
] as const;

export default function Hero({
  online,
}: {
  online: boolean;
}) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const count = HERO_SLIDES.length;

  const go = useCallback(
    (to: number) => {
      const index = (to + count) % count;
      setActive(index);
    },
    [count],
  );

  const advance = useEffectEvent(() => {
    if (document.hidden) return;
    setActive((previous) => (previous + 1) % count);
  });

  useEffect(() => {
    if (reducedMotion || hovered || focused) return;
    const timer = setInterval(() => advance(), AUTO_MS);
    return () => clearInterval(timer);
  }, [reducedMotion, hovered, focused]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  };

  const currentSlide = HERO_SLIDES[active];
  const booking = online ? `${LINKS.contact}#request` : TEL_HREF;
  const examsBooking = online ? `${LINKS.contact}?service=exams#request` : TEL_HREF;
  const destination = currentSlide.destination === "booking" ? booking
    : currentSlide.destination === "examsBooking" ? examsBooking
      : currentSlide.destination;
  const SlideHeading = active === 0 ? "h1" : "h2";
  const nabhLogo = (
    <Image
      src="/images/nabh-accreditations.png"
      alt="NABH Accredited"
      width={1024}
      height={1024}
      sizes="(max-width: 959px) 60px, 100px"
      className="hero-nabh-logo"
    />
  );

  return (
    <div className="hero-banner-wrapper">
      <section
        className="hero-banner-section"
        aria-roledescription="carousel"
        aria-label="Namokar Highlights and Care Services"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
        }}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <div className="hero-lens-watermark" aria-hidden="true" />
        <div className="hero-banner-visual">
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className={`hero-image-layer hero-image-layer--${slide.id} ${active === i ? "is-active" : ""}`}
              aria-hidden={active !== i}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "eager"}
                sizes="100vw"
                className={`hero-slide-image hero-slide-image--${slide.id}`}
              />
            </div>
          ))}
        </div>

        <div className="hero-nabh hero-nabh--desktop">{nabhLogo}</div>

        {/* Slide pagination */}
        <div
          className="hero-slider-pagination"
          role="group"
          aria-label="Slide Selection"
        >
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-slider-dot ${active === i ? "is-active" : ""}`}
              aria-label={`Slide ${i + 1}: ${slide.label}`}
              aria-current={active === i ? "true" : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>

        {/* Main Banner Content Container */}
        <div className="container hero-banner-container">
          <div className="hero-banner-content">
            <div className="hero-slide-copy" key={currentSlide.id}>
              {/* Top Trust Badge */}
              <div className="hero-banner-badges">
                <div className="hero-banner-badge">
                  <span className="hero-badge-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="14"
                      height="14"
                    >
                      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
                      <circle cx="12" cy="12" r="3" />
                      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  <span className="hero-badge-text">
                    {currentSlide.badge}
                  </span>
                </div>
                <div className="hero-nabh hero-nabh--mobile">{nabhLogo}</div>
              </div>

              {/* Slide Headline */}
              {active !== 0 && <h1 className="sr-only">{HERO_SLIDES[0].title}</h1>}
              <SlideHeading className="hero-banner-heading">
                <HeadingText>{currentSlide.title}</HeadingText>
              </SlideHeading>
              {active === 0 && <p className="hero-banner-tagline">See Better. Look Better.</p>}

              {/* Slide Description */}
              <p className="hero-banner-body">
                {currentSlide.body}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="hero-banner-actions">
              <Link href={destination} className="hero-btn-primary">
                <span className="hero-btn-icon" aria-hidden="true">
                  <CalendarDays size={19} />
                </span>
                <span>{currentSlide.cta}</span>
                <ArrowRightIcon className="hero-btn-arrow" width={20} height={20} />
              </Link>

              <a href={TEL_HREF} className="hero-btn-secondary">
                <span className="hero-btn-icon" aria-hidden="true">
                  <PhoneIcon width={20} height={20} />
                </span>
                <span>Call Us</span>
              </a>
            </div>

            {/* Feature Highlights Strip (3 Items) */}
            <div className="hero-banner-features" role="list">
              <div className="hero-feature-item" role="listitem">
                <span className="hero-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <span className="hero-feature-text">
                  Modern<br />Diagnostics
                </span>
              </div>

              <div className="hero-feature-sep" aria-hidden="true" />

              <div className="hero-feature-item" role="listitem">
                <span className="hero-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <span className="hero-feature-text">
                  Specialist<br />Eye Care
                </span>
              </div>

              <div className="hero-feature-sep" aria-hidden="true" />

              <div className="hero-feature-item" role="listitem">
                <span className="hero-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7Z" />
                  </svg>
                </span>
                <span className="hero-feature-text">
                  Personalised<br />Care
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Wave Transition */}
        <div className="hero-banner-wave" aria-hidden="true">
          <Image
            src="/images/bg-banner-wave.svg"
            alt=""
            fill
            sizes="100vw"
            className="hero-wave-svg"
            priority
            unoptimized
          />
        </div>
      </section>

      <div className="hero-stats-band hero-trust-marquee" role="region" aria-label="Why patients trust Namokar">
        <div className="hero-trust-track">
          {[0, 1].map((copy) => (
            <div className="hero-trust-group" key={copy} aria-hidden={copy === 1}>
              {TRUST_ITEMS.map(({ label, icon: Icon }) => (
                <span className="hero-trust-item" key={label}>
                  <Icon strokeWidth={1.8} aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
