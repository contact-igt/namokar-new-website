"use client";

import { ArrowRightIcon } from "./Icons";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider, { type Settings } from "react-slick";
import type { TreatmentItem } from "@/lib/treatments";
import styles from "./DoctorCareCarousel.module.css";

const CARD_COPY = {
  cataract: "Detailed cataract assessment and surgical treatment planning, including suitable intraocular lens options.",
  glaucoma: "Clinical assessment, diagnostic testing, treatment and regular monitoring to help preserve vision.",
  exams: "Detailed evaluation of vision and overall eye health for routine and condition-specific concerns.",
  eyelid: "Functional and aesthetic eyelid surgery addressing excess eyelid skin and under-eye bags, with consideration of eye health and individual suitability.",
  aesthetic: "Personalised surgical and non-surgical care for aesthetic concerns involving the eyelids and surrounding eye area.",
  reconstructive: "Assessment and treatment of ptosis, eyelid-position abnormalities, tear-drainage disorders and reconstructive concerns.",
  retina: "Assessment and management of retinal disorders, with medical and surgical treatment options based on clinical findings.",
  lasik: "Personalised vision correction assessment and suitable procedures to reduce dependence on spectacles or contact lenses.",
  squint: "Evaluation of eye misalignment, double vision and binocular vision concerns, with treatment options based on the underlying cause and individual assessment.",
} satisfies Record<TreatmentItem["id"], string>;

const ORIGINAL_IMAGES: Partial<Record<TreatmentItem["id"], string>> = {
  cataract: "/images/services/cataract-care.webp",
  glaucoma: "/images/services/glaucoma-care.webp",
  exams: "/images/services/eye-examination-care.webp",
  eyelid: "/images/services/eyelid-blepharoplasty-care.webp",
  aesthetic: "/images/services/aesthetic-oculoplasty-care.webp",
  reconstructive: "/images/services/reconstructive-oculoplasty-care.webp",
};

function ServiceCareIcon({ name }: { name: string }) {
  switch (name) {
    case "retina":
    case "squint":
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
    case "lasik":
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

export default function DoctorCareCarousel({ services }: { services: TreatmentItem[] }) {
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
        {services.map(({ id, title, href, image }) => (
          <div key={id}>
            <Link
              href={href}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={ORIGINAL_IMAGES[id] ?? image?.src ?? "/images/services/eye-examination-care.webp"}
                  alt=""
                  fill
                  sizes="(max-width: 580px) 100vw, (max-width: 860px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.iconWrap} aria-hidden="true">
                  <ServiceCareIcon name={id} />
                </div>
                <h3 className={styles.cardTitle}>{id === "squint" ? "Squint (Strabismus) Care" : title}</h3>
                <p className={styles.cardDesc}>{CARD_COPY[id]}</p>
                <div className={styles.actionRow}>
                  <span className={styles.arrowButton} aria-hidden="true">
                    <ArrowRightIcon width={18} height={18} />
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
