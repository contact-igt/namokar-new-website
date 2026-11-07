"use client";

import Image from "next/image";
import Slider, { type Settings } from "react-slick";
import type { PhotoItem } from "@/lib/photos";

function GalleryIcon({ type }: { type: 0 | 1 | 2 | 3 }) {
  const shapes = [
    <><path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6S2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></>,
    <><path d="M4 18h16M6 18v-2a6 6 0 0 1 12 0v2M8 12h8M12 4v3" /><path d="M9 21h6" /></>,
    <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0M14 20a4 4 0 0 1 7-1.5" /></>,
    <><path d="m4 20 5.5-5.5M9 14.5l2.5 2.5M12 17l7-7M14 5l5 5M4 20h8" /><path d="M11 8.5 15.5 4l4.5 4.5L15.5 13z" /></>,
  ];

  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[type]}</svg>;
}

function getCardIcon(it: PhotoItem) {
  if (it.icon) return it.icon;
  const t = (it.title ?? "").toLowerCase();
  if (t.includes("reception")) return "/images/reception-new.png";
  if (t.includes("team")) return "/images/multiple-users-silhouette.png";
  if (t.includes("equipment") || t.includes("diagnostic")) return "/images/microscope.png";
  return null;
}

/** An autoplaying facility carousel. */
export default function FacilityGallery({
  items,
  label,
  showcase = false,
}: {
  items: PhotoItem[];
  label: string;
  showcase?: boolean;
}) {
  const n = items.length;

  if (!n) return null;

  if (showcase) {
    const [feature, ...details] = items;

    return (
      <div className="fg fg--showcase" aria-label={label}>
        <article className="fg-showcase-feature">
          <Image src={feature.src} alt={feature.alt} fill sizes="(min-width: 960px) 52vw, 100vw" className="fg-img" style={{ objectPosition: feature.position }} />
          <div className="fg-showcase-feature-cap">
            <span className="fg-showcase-feature-icon"><GalleryIcon type={0} /></span>
            <div>
              <strong>{feature.title ?? feature.caption}</strong>
              {feature.title && <span>{feature.caption}</span>}
            </div>
          </div>
        </article>
        <div className="fg-showcase-list">
          {details.slice(0, 3).map((it, index) => {
            const iconSrc = getCardIcon(it);
            return (
              <article key={it.src} className="fg-showcase-card">
                <span className="fg-showcase-card-image">
                  <Image src={it.src} alt={it.alt} fill sizes="(min-width: 960px) 28vw, 100vw" className="fg-img" style={{ objectPosition: it.position }} />
                </span>
                <div className="fg-showcase-card-copy">
                  {iconSrc ? (
                    <span className="fg-showcase-card-icon" aria-hidden="true">
                      <Image
                        src={iconSrc}
                        alt=""
                        width={28}
                        height={28}
                        className="fg-showcase-icon-img"
                      />
                    </span>
                  ) : (
                    <GalleryIcon type={(index + 1) as 1 | 2 | 3} />
                  )}
                  <strong>{it.title ?? it.caption}</strong>
                  {it.title && <span>{it.caption}</span>}
                </div>
                <span className="fg-showcase-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 5 7 7-7 7" /></svg>
                </span>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

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
