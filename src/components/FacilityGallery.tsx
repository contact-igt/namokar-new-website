"use client";

import FacilityPhoto from "./FacilityPhoto";
import Slider, { type Settings } from "react-slick";
import type { PhotoItem } from "@/lib/photos";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  currentSlide?: number;
  slideCount?: number;
}

function PrevArrow({ className, onClick }: ArrowProps) {
  const isDisabled = className?.includes("slick-disabled");
  return (
    <button
      type="button"
      className={`fg-arrow fg-arrow-prev ${isDisabled ? "fg-arrow-disabled" : ""}`}
      onClick={onClick}
      disabled={isDisabled}
      aria-label="Previous slide"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
}

function NextArrow({ className, onClick }: ArrowProps) {
  const isDisabled = className?.includes("slick-disabled");
  return (
    <button
      type="button"
      className={`fg-arrow fg-arrow-next ${isDisabled ? "fg-arrow-disabled" : ""}`}
      onClick={onClick}
      disabled={isDisabled}
      aria-label="Next slide"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}

/** A facility carousel with optional arrow navigation. */
export default function FacilityGallery({
  items,
  label,
  showArrows = false,
  autoplay,
  infinite,
  slidesToShowDesktop = 3,
  desktopBreakpoint = 1024,
  className = "",
}: {
  items: PhotoItem[];
  label: string;
  showArrows?: boolean;
  autoplay?: boolean;
  infinite?: boolean;
  slidesToShowDesktop?: number;
  desktopBreakpoint?: number;
  className?: string;
}) {
  const n = items.length;

  if (!n) return null;

  const isAutoplay = autoplay !== undefined ? autoplay : (showArrows ? false : n > 1);
  const isInfinite = infinite !== undefined ? infinite : true;
  const isCustomDesktop = slidesToShowDesktop > 3;
  const desktopCount = Math.min(slidesToShowDesktop, n);

  const settings: Settings = {
    accessibility: true,
    arrows: showArrows,
    prevArrow: showArrows ? <PrevArrow /> : undefined,
    nextArrow: showArrows ? <NextArrow /> : undefined,
    autoplay: isAutoplay,
    autoplaySpeed: 4200,
    dots: n > 1,
    infinite: isInfinite,
    pauseOnFocus: true,
    pauseOnHover: true,
    speed: 520,
    slidesToScroll: 1,
    slidesToShow: desktopCount,
    responsive: isCustomDesktop
      ? [
          { breakpoint: 1120, settings: { slidesToShow: Math.min(3, n), slidesToScroll: 1 } },
          { breakpoint: 860, settings: { slidesToShow: Math.min(2, n), slidesToScroll: 1 } },
          { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
      : [
          { breakpoint: desktopBreakpoint, settings: { slidesToShow: Math.min(2, n), slidesToScroll: 1 } },
          { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
  };

  return (
    <div className={`fg ${showArrows ? "fg--with-arrows" : ""} ${className}`} aria-label={label}>
      <Slider {...settings}>
        {items.map((it) => (
          <div key={it.src} className="fg-item">
            <FacilityPhoto item={it} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
