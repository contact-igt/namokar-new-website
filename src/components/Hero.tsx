"use client";

import Link from "next/link";
import { type KeyboardEvent, type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { LINKS, SITE } from "@/config/site";
import BookButton, { SecondaryContact } from "./BookButton";
import { ArrowDownIcon, ArrowRightIcon } from "./Icons";

type Shot = { node: ReactNode; caption: string } | null;

/**
 * Four messages, one per photograph. Copy states only what the site already says elsewhere:
 * no outcomes, no claims of equipment, years or accreditation. Each slide links to the page
 * that explains it, so the banner is also an internal-link hub.
 */
export const HERO_SLIDES = [
  {
    id: "centre",
    tab: "Our centre",
    heading: "Comprehensive Eye Care, Centred Around You.",
    body: "Eye examinations, cataract and glaucoma care, and specialist oculoplasty, at one centre in Ashok Vihar, New Delhi.",
    more: { label: "About the centre", href: LINKS.about },
  },
  {
    id: "cataract",
    tab: "Cataract",
    heading: "Cataract Care, Explained Clearly.",
    body: "Careful assessment of your vision and a clear discussion of your treatment options.",
    more: { label: "About cataract surgery", href: LINKS.cataract },
  },
  {
    id: "eye-care",
    tab: "Eye care",
    heading: "Eye Check-Ups to Glaucoma Care.",
    body: "Routine eye examinations and regular monitoring for glaucoma, explained plainly.",
    more: { label: "Eye examinations and glaucoma", href: LINKS.exams },
  },
  {
    id: "oculoplasty",
    tab: "Oculoplasty",
    heading: "Specialist Care for Your Eyelids.",
    body: "Oculoplasty for drooping eyelids, watering eyes, heavy eyelids and under-eye bags.",
    more: { label: "Oculoplasty care", href: "#oculoplasty" },
  },
] as const;

/**
 * Hospital-first banner: four photographs that scroll sideways (swipe, buttons, arrow keys or
 * the tabs), with the matching message beside them. Nothing moves on its own: no autoplay.
 * `shots` are server-rendered photographs (null when not cleared for use). A slide without a
 * cleared photograph shows a plain brand card; if none is cleared, `panel` replaces the track.
 */
export default function Hero({
  shots,
  panel,
  online,
}: {
  shots: Shot[];
  panel: ReactNode;
  online: boolean;
}) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  // While a button, tab or key is scrolling the track to a slide, ignore the in-between scroll
  // positions so the message does not flicker back to the slide being left.
  const target = useRef<number | null>(null);
  const unlock = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = HERO_SLIDES.length;
  const withPhotos = shots.some(Boolean);

  const go = useCallback(
    (to: number) => {
      const el = trackRef.current;
      if (!el) return;
      const i = (to + count) % count;
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.current = i;
      if (unlock.current) clearTimeout(unlock.current);
      unlock.current = setTimeout(() => (target.current = null), 1200);
      el.scrollTo({ left: i * el.clientWidth, behavior: calm ? "auto" : "smooth" });
      setActive(i);
    },
    [count],
  );

  // Keep the message in step with a swipe or a trackpad scroll.
  const onScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = trackRef.current;
      if (!el || !el.clientWidth) return;
      if (target.current !== null) {
        if (Math.abs(el.scrollLeft - target.current * el.clientWidth) < 2) target.current = null;
        return;
      }
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setActive((a) => (a === i ? a : Math.min(count - 1, Math.max(0, i))));
    });
  };
  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      if (unlock.current) clearTimeout(unlock.current);
    },
    [],
  );
  // A touch or wheel gesture takes over from any scroll the buttons started.
  const release = () => {
    target.current = null;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  };

  const more = HERO_SLIDES[active].more;

  return (
    <section
      className={`hero${withPhotos ? "" : " hero--panel"}`}
      aria-roledescription="carousel"
      aria-label="Namokar highlights"
    >
      <div className="container hero-grid">
        <div className={`hero-media${withPhotos ? "" : " hero-media--panel"}`}>
          {withPhotos ? (
            <>
              <div
                ref={trackRef}
                className="hero-track"
                tabIndex={0}
                role="group"
                aria-label="Photographs. Swipe, or use the arrow keys, to see the next."
                onScroll={onScroll}
                onKeyDown={onKeyDown}
                onPointerDown={release}
                onWheel={release}
              >
                {HERO_SLIDES.map((s, i) => (
                  <figure
                    key={s.id}
                    className="hero-shot"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${count}: ${s.tab}`}
                  >
                    {shots[i] ? (
                      <>
                        {shots[i]!.node}
                        <figcaption className="hero-caption">{shots[i]!.caption}</figcaption>
                      </>
                    ) : (
                      <div className="hero-card">
                        <span className="hero-card-kicker">{SITE.name}</span>
                        <span className="hero-card-title">{s.tab}</span>
                        <span className="hero-card-place">Ashok Vihar, New Delhi</span>
                      </div>
                    )}
                  </figure>
                ))}
              </div>
              <div className="hero-ctrls">
                <button type="button" className="hero-ctrl" aria-label="Previous photograph" onClick={() => go(active - 1)}>
                  <ArrowRightIcon width={20} height={20} className="flip" />
                </button>
                <span className="hero-count" aria-hidden="true">
                  {active + 1} / {count}
                </span>
                <button type="button" className="hero-ctrl" aria-label="Next photograph" onClick={() => go(active + 1)}>
                  <ArrowRightIcon width={20} height={20} />
                </button>
              </div>
            </>
          ) : (
            panel
          )}
        </div>

        <div className="hero-copy">
          <h1 className="eyebrow">{SITE.name}</h1>

          <div className="slides">
            {HERO_SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <div
                  key={s.id}
                  className="slide"
                  data-active={isActive}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}: ${s.tab}`}
                  aria-hidden={!isActive}
                  inert={!isActive}
                >
                  <h2 className="hero-title">{s.heading}</h2>
                  <p className="hero-body">{s.body}</p>
                </div>
              );
            })}
          </div>

          <div className="cta-row">
            <BookButton online={online} />
            <SecondaryContact online={online} />
          </div>

          <div className="hero-foot">
            <div className="slide-tabs" role="group" aria-label="Choose a highlight">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className="slide-tab"
                  aria-pressed={i === active}
                  onClick={() => go(i)}
                >
                  {s.tab}
                </button>
              ))}
            </div>
            {more.href.startsWith("/") ? (
              <Link href={more.href} className="text-link">
                {more.label}
                <ArrowRightIcon width={18} height={18} />
              </Link>
            ) : (
              <a href={more.href} className="text-link">
                {more.label}
                <ArrowDownIcon width={18} height={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
