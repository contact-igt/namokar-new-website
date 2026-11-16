"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider, { type Settings } from "react-slick";
import { LINKS } from "@/config/site";
import styles from "./DoctorCareCarousel.module.css";

type ServiceCareItem = {
  key: string;
  title: string;
  desc: string;
  href: string;
  image: string;
  alt: string;
};

const CARE_SERVICES: ServiceCareItem[] = [
  {
    key: "cataract",
    title: "Cataract Surgery",
    desc: "Careful assessment of your vision, with clear discussion of when surgery is considered and your lens choices.",
    href: LINKS.cataract,
    image: "/images/services/cataract-care.webp",
    alt: "Cataract surgery consultation and slit-lamp eye assessment",
  },
  {
    key: "glaucoma",
    title: "Glaucoma Management",
    desc: "Assessment, diagnostic tests and regular follow-up to monitor eye pressure and protect your long-term vision.",
    href: LINKS.glaucoma,
    image: "/images/services/glaucoma-care.webp",
    alt: "Glaucoma diagnostic evaluation and eye pressure testing",
  },
  {
    key: "exams",
    title: "Comprehensive Eye Examinations",
    desc: "A thorough check of how well you see and how healthy your eyes are, from routine check-ups to specific concerns.",
    href: LINKS.exams,
    image: "/images/services/eye-examination-care.webp",
    alt: "Comprehensive eye examination with slit lamp technology",
  },
  {
    key: "eyelid",
    title: "Eyelid Surgery (Blepharoplasty)",
    desc: "Assessment of heavy or drooping eyelids and under-eye bags, for functional comfort and cosmetic rejuvenation.",
    href: LINKS.eyelid,
    image: "/images/services/eyelid-blepharoplasty-care.webp",
    alt: "Specialist blepharoplasty and eyelid evaluation",
  },
  {
    key: "aesthetic",
    title: "Aesthetic Oculoplasty",
    desc: "Considered care for heavy eyelids, under-eye bags and age-related changes around the eyes, with eye health in mind.",
    href: LINKS.aesthetic,
    image: "/images/services/aesthetic-oculoplasty-care.webp",
    alt: "Aesthetic oculoplasty consultation for delicate eye areas",
  },
  {
    key: "reconstructive",
    title: "Reconstructive Oculoplasty",
    desc: "Assessment and treatment for drooping eyelids (ptosis), eyelid malposition and tear-drainage problems.",
    href: LINKS.reconstructive,
    image: "/images/services/reconstructive-oculoplasty-care.webp",
    alt: "Reconstructive oculoplasty and tear drainage treatment",
  },
];

function ServiceCareIcon({ name }: { name: string }) {
  switch (name) {
    case "cataract":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
          <path d="M2 12s3.8-6.5 10-6.5 10 6.5 10 6.5-3.8 6.5-10 6.5S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case "glaucoma":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
          <path d="M2 12s3.8-6.5 10-6.5 10 6.5 10 6.5-3.8 6.5-10 6.5S2 12 2 12Z" />
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 7.5v9M7.5 12h9" />
        </svg>
      );
    case "exams":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
          <path d="M12 2a3 3 0 0 0-3 3v.2a3 3 0 0 0-1.8.8l-.2-.2a3 3 0 0 0-4.2 0 3 3 0 0 0 0 4.2l.2.2a3 3 0 0 0-.8 1.8H2a3 3 0 0 0-3 3 3 3 0 0 0 3 3h.2a3 3 0 0 0 .8 1.8l-.2.2a3 3 0 0 0 0 4.2 3 3 0 0 0 4.2 0l.2-.2a3 3 0 0 0 1.8.8v.2a3 3 0 0 0 3 3 3 3 0 0 0 3-3v-.2a3 3 0 0 0 1.8-.8l.2.2a3 3 0 0 0 4.2 0 3 3 0 0 0 0-4.2l-.2-.2a3 3 0 0 0 .8-1.8h.2a3 3 0 0 0 3-3 3 3 0 0 0-3-3h-.2a3 3 0 0 0-.8-1.8l.2-.2a3 3 0 0 0 0-4.2 3 3 0 0 0-4.2 0l-.2.2a3 3 0 0 0-1.8-.8V5a3 3 0 0 0-3-3Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "eyelid":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
          <path d="M3 10c4-4.5 9-6 13-4 2 1 4 3 5 5" />
          <path d="M3 14c4 4.5 9 6 13 4 2-1 4-3 5-5" />
          <circle cx="12" cy="12" r="2.8" />
        </svg>
      );
    case "aesthetic":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
          <path d="M2 13s3.5-5.5 9-5.5 9 5.5 9 5.5-3.5 5.5-9 5.5S2 13 2 13Z" />
          <circle cx="11" cy="13" r="3" />
          <path d="M19 4v4m-2-2h4" strokeWidth="1.8" />
        </svg>
      );
    case "reconstructive":
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
          <path d="M3 12c3.5-5 8-7 13-5 2.5 1 4.5 3 5 5" />
          <path d="M3 12c3.5 5 8 7 13 5 2.5-1 4.5-3 5-5" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 17v3M8 16.5l-1.5 2.5M16 16.5l1.5 2.5" />
        </svg>
      );
  }
}

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  "aria-label"?: string;
}

function PrevArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className={`${styles.arrow} ${styles.arrowPrev}`}
      onClick={onClick}
      aria-label="Previous areas of care"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="22" height="22">
        <path d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

function NextArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className={`${styles.arrow} ${styles.arrowNext}`}
      onClick={onClick}
      aria-label="Next areas of care"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="22" height="22">
        <path d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

export default function DoctorCareCarousel() {
  const [isPlaying, setIsPlaying] = useState(true);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      sliderRef.current?.slickPause();
      setIsPlaying(false);
    } else {
      sliderRef.current?.slickPlay();
      setIsPlaying(true);
    }
  };

  const settings: Settings = {
    accessibility: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dots: false,
    infinite: true,
    autoplay: isPlaying,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    speed: 550,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.carouselWrapper} aria-label="Areas of care carousel">
      <button
        type="button"
        className={styles.accessiblePause}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause automatic slide rotation" : "Resume automatic slide rotation"}
      >
        {isPlaying ? "Pause automatic sliding" : "Resume automatic sliding"}
      </button>

      <Slider ref={sliderRef} {...settings}>
        {CARE_SERVICES.map((s) => (
          <div key={s.key}>
            <Link
              href={s.href}
              className={styles.card}
              aria-label={`${s.title} — ${s.desc}`}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 580px) 100vw, (max-width: 860px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.iconWrap} aria-hidden="true">
                  <ServiceCareIcon name={s.key} />
                </div>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
                <div className={styles.actionRow}>
                  <span className={styles.arrowButton} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
