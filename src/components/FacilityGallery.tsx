"use client";

import Image, { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Slider, { type Settings } from "react-slick";
import type { PhotoItem } from "@/lib/photos";
import { usePrefersReducedMotion } from "./motion/useMedia";
import styles from "./FacilityGallery.module.css";

export type FacilityItem = PhotoItem & { photographs?: PhotoItem[] };

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

function ShowcasePhoto({ item, photograph = item, type }: { item: PhotoItem; photograph?: PhotoItem; type: 0 | 1 | 2 | 3 }) {
  const icon = getCardIcon(item);
  return (
    <article className={styles.feature}>
      <div className={styles.imageFrame}><Image src={photograph.src} alt={photograph.alt} fill sizes="(min-width: 960px) 58vw, 100vw" className={styles.photo} style={{ objectPosition: photograph.position }} draggable={false} /></div>
      <div className={styles.caption}>
        <span className={styles.featureIcon} aria-hidden="true">
          {icon ? <Image src={icon} alt="" width={28} height={28} draggable={false} /> : <GalleryIcon type={type} />}
        </span>
        <div>
          <strong>{item.title ?? item.caption}</strong>
          {item.title && <span>{photograph !== item && photograph.title && `${photograph.title} — `}{photograph.caption}</span>}
        </div>
      </div>
    </article>
  );
}

function ShowcaseGallery({ items, label }: { items: FacilityItem[]; label: string }) {
  const [active, setActive] = useState(0);
  const [photoVisits, setPhotoVisits] = useState<Record<number, number>>({});
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const paused = hovered || focused || interacting || hidden;
  const select = useCallback((index: number) => {
    setActive(index);
    setPhotoVisits((previous) => ({ ...previous, [index]: (previous[index] ?? -1) + 1 }));
  }, []);

  useEffect(() => {
    // Warm the optimized photo cache without rendering thumbnail images.
    for (const item of items.flatMap((item) => item.photographs?.length ? item.photographs : [item])) {
      const { props } = getImageProps({ src: item.src, alt: item.alt, width: item.width, height: item.height, sizes: "(min-width: 960px) 58vw, 100vw" });
      const image = new window.Image();
      image.sizes = props.sizes ?? "";
      image.srcset = props.srcSet ?? "";
      image.src = props.src;
    }
  }, [items]);

  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (items.length < 2 || paused || reducedMotion) return;
    const timer = window.setInterval(() => select((active + 1) % items.length), 4800);
    return () => window.clearInterval(timer);
  }, [active, items.length, paused, reducedMotion, select]);

  const featured = items[active % items.length];
  const photographs = featured.photographs;
  const photograph = photographs?.length ? photographs[(photoVisits[active] ?? 0) % photographs.length] : featured;
  const iconType = (item: PhotoItem): 0 | 1 | 2 | 3 => {
    const title = (item.title ?? "").toLowerCase();
    return title.includes("reception") ? 1 : title.includes("team") ? 2 : /spaces|theatre|room/.test(title) ? 3 : 0;
  };
  const previews = items.map((item, index) => ({ item, index }))
    .filter(({ index }) => index !== active);

  return (
    <div
      className={styles.gallery}
      role="region"
      aria-label={label}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onFocusCapture={(event) => { if (event.target.matches(":focus-visible")) setFocused(true); }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onPointerDown={(event) => { pointerStart.current = event.clientX; setInteracting(true); }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        pointerStart.current = null;
        setInteracting(false);
        if (Math.abs(distance) > 50) select((active + (distance < 0 ? 1 : items.length - 1)) % items.length);
      }}
      onPointerCancel={() => { pointerStart.current = null; setInteracting(false); }}
      onPointerLeave={() => { pointerStart.current = null; setInteracting(false); setHovered(false); }}
    >
      <div ref={featureRef} className={styles.stage} tabIndex={-1} aria-live={focused || reducedMotion ? "polite" : "off"}>
        <div key={photograph.src} className={styles.transition}>
          <ShowcasePhoto item={featured} photograph={photograph} type={iconType(featured)} />
        </div>
      </div>
      <div className={styles.selections} aria-label="Choose a featured centre photograph">
        {previews.map(({ item, index }) => {
          const icon = getCardIcon(item);
          return (
            <button key={item.src} type="button" className={styles.selection} onClick={(event) => {
              select(index);
              if (event.detail === 0) featureRef.current?.focus({ preventScroll: true });
            }} aria-label={`Feature ${item.title ?? item.caption}`}>
              <span className={styles.cardIcon} aria-hidden="true">
                {icon ? <Image src={icon} alt="" width={28} height={28} /> : <GalleryIcon type={iconType(item)} />}
              </span>
              <span className={styles.cardCopy}>
                <strong>{item.title ?? item.caption}</strong>
                {item.title && <span>{item.caption}</span>}
              </span>
              <span className={styles.arrow} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** An autoplaying facility carousel. */
export default function FacilityGallery({
  items,
  label,
  showcase = false,
}: {
  items: FacilityItem[];
  label: string;
  showcase?: boolean;
}) {
  const n = items.length;

  if (!n) return null;

  if (showcase) {
    return <ShowcaseGallery items={items} label={label} />;
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
