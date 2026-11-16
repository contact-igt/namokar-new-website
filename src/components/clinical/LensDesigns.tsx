"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider, { type Settings } from "react-slick";
import { LINKS } from "@/config/site";
import { ArrowRightIcon, InfoIcon } from "../Icons";

type Design = "distance" | "near" | "astigmatism" | "edof";

const ORDER: Design[] = ["distance", "near", "astigmatism", "edof"];
const IMAGES: Record<Design, string> = {
  distance: "/images/lens-monofocal.webp",
  near: "/images/lens-multifocal.webp",
  astigmatism: "/images/lens-toric.webp",
  edof: "/images/lens-edof.webp",
};

function DesignIcon({ design }: { design: Design }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {design === "distance" && <><path d="M2 16s5-7 14-7 14 7 14 7-5 7-14 7S2 16 2 16Z" /><circle cx="16" cy="16" r="4" /></>}
      {design === "near" && <><ellipse cx="16" cy="9" rx="11" ry="4" /><path d="M5 9v7c0 2 5 4 11 4s11-2 11-4V9M5 16v7c0 2 5 4 11 4s11-2 11-4v-7" /></>}
      {design === "astigmatism" && <><circle cx="16" cy="16" r="8" /><path d="M16 2v7m0 14v7M2 16h7m14 0h7M12 16h8" /></>}
      {design === "edof" && <><path d="M3 16h8m10 0h8M12 8c5 2 5 14 0 16M20 8c-5 2-5 14 0 16" /><circle cx="16" cy="16" r="2" /></>}
    </svg>
  );
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
      className="lens-arrow lens-arrow--prev"
      onClick={onClick}
      aria-label="Previous lens design"
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
      className="lens-arrow lens-arrow--next"
      onClick={onClick}
      aria-label="Next lens design"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="22" height="22">
        <path d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

/**
 * One card per design term: a simplified focus drawing, a short tag, a plain description and three
 * checklist points. Wording only restates the general descriptions; no brand names, no promises.
 */
const COPY: Record<
  Design,
  { name: string; tag: string; title: string; text: string; points: string[] }
> = {
  distance: {
    name: "Monofocal",
    tag: "One main focus",
    title: "One main focal distance",
    text: "A monofocal lens has one main focus, often chosen for distance. Spectacles may still be needed for other distances.",
    points: [
      "One main point of focus",
      "Often chosen for distance",
      "Spectacles may still be needed",
    ],
  },
  near: {
    name: "Multifocal",
    tag: "More than one focus",
    title: "More than one focal distance",
    text: "A multifocal design distributes light across more than one focus. It can involve visual trade-offs, which need an individual discussion.",
    points: [
      "Light shared across more than one focus",
      "May involve visual trade-offs",
      "Needs an individual discussion",
    ],
  },
  astigmatism: {
    name: "Toric",
    tag: "For astigmatism",
    title: "Addresses astigmatism",
    text: "A toric lens is designed to address corneal astigmatism. Toric features can be combined with other lens designs.",
    points: [
      "Designed for corneal astigmatism",
      "Can be combined with other designs",
      "Measurements of the eye guide the choice",
    ],
  },
  edof: {
    name: "EDOF",
    tag: "Extended range of focus",
    title: "An extended range of focus",
    text: "An extended depth of focus design aims to give a continuous range of useful vision. Reading glasses may still be needed.",
    points: [
      "Aims for a continuous range of useful vision",
      "Reading glasses may still be needed",
      "Suitability is decided after examination",
    ],
  },
};

/**
 * Four common replacement lens design terms as cards. Pending medical review
 * (src/config/figures.ts); no brand names and no promises.
 */
export default function LensDesigns() {
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
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="fg lens-fg" aria-label="Replacement lens designs">
        <button
          type="button"
          className="lens-accessible-pause"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause automatic slide rotation" : "Resume automatic slide rotation"}
        >
          {isPlaying ? "Pause automatic sliding" : "Resume automatic sliding"}
        </button>
        <Slider ref={sliderRef} {...settings}>
          {ORDER.map((d) => (
            <div key={d}>
              <article className={`lens-card ${d === "edof" ? "lens-card--edof" : ""}`}>
                <div className={`lens-card-fig ${d === "edof" ? "lens-card-fig--edof" : ""}`}>
                  <Image
                    className={`lens-card-image ${d === "edof" ? "lens-card-image--edof" : ""}`}
                    src={IMAGES[d]}
                    alt={`Simplified illustration of how a ${COPY[d].name.toLowerCase()} lens focuses light inside the eye`}
                    fill
                    loading="eager"
                    sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="lens-card-body">
                  <div className="lens-card-top">
                    <span className="lens-card-category">
                      <span className="lens-card-icon">
                        <DesignIcon design={d} />
                      </span>
                      <span className="lens-card-name">{COPY[d].name}</span>
                    </span>
                    <span className="lens-card-tag">{COPY[d].tag}</span>
                  </div>
                  <h3 className="lens-card-title">{COPY[d].title}</h3>
                  <p className="lens-card-text">{COPY[d].text}</p>
                  <ul className="lens-card-points">
                    {COPY[d].points.map((pt) => (
                      <li key={pt}>
                        <span className="lens-point-icon" aria-hidden="true">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
                            <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                          </svg>
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={LINKS.contact} className="lens-card-cta">
                    Discuss lens options{" "}
                    <ArrowRightIcon width={18} height={18} />
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </Slider>
      </div>
      <p className="clin-fine lens-fine">
        <InfoIcon width={24} height={24} />
        <span>Which design, if any, suits you depends on your eyes, your daily
        activities and your expectations. These simplified diagrams do not
        predict your vision. No lens can promise that you will never need
        spectacles.</span>
      </p>
    </div>
  );
}
