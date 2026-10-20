"use client";

import Image from "next/image";
import Slider, { type Settings } from "react-slick";
import type { PhotoItem } from "@/lib/photos";

/** An autoplaying facility carousel. */
export default function FacilityGallery({
  items,
  label,
}: {
  items: PhotoItem[];
  label: string;
}) {
  const n = items.length;

  if (!n) return null;
  const settings: Settings = {
    accessibility: true,
    arrows: false,
    autoplay: n > 1,
    autoplaySpeed: 4200,
    dots: n > 1,
    infinite: n > 3,
    pauseOnFocus: true,
    pauseOnHover: true,
    speed: 520,
    slidesToScroll: 1,
    slidesToShow: Math.min(3, n),
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: Math.min(2, n), slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="fg" aria-label={label}>
      <Slider {...settings}>
        {items.map((it, i) => (
          <div key={it.src} className="fg-item">
            <article className="fg-card">
              <span className="fg-frame">
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 960px) 58vw, 100vw" : "(min-width: 960px) 30vw, 100vw"}
                  className="fg-img"
                  style={{ objectPosition: it.position }}
                />
              </span>
              <span className="fg-cap">
                <strong>{it.title ?? it.caption}</strong>
                {it.title ? it.caption : null}
              </span>
            </article>
          </div>
        ))}
      </Slider>
    </div>
  );
}
