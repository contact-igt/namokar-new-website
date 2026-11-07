"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LINKS } from "@/config/site";
import type { TreatmentItem } from "@/lib/treatments";
import { Plate } from "./clinical/Plates";
import { ArrowRightIcon } from "./Icons";

function TreatmentIcon({ id }: { id: TreatmentItem["id"] }) {
  const paths = {
    cataract: <><path d="M3 12s3.2-6 9-6 9 6 9 6-3.2 6-9 6-9-6-9-6Z" /><circle cx="12" cy="12" r="2.8" /></>,
    glaucoma: <><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1m9.2 9.2 2.1 2.1m0-13.4-2.1 2.1m-9.2 9.2-2.1 2.1" /></>,
    exams: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 3v3m6-3v3M8.5 11.5h7m-7 4h4" /></>,
    eyelid: <><path d="M3 13s3.4 5 9 5 9-5 9-5-3.4-5-9-5-9 5-9 5Z" /><path d="M5.5 16.8l-1 1.8m4-1.1v2m3.5-1.5v2m4-2.7 1 1.8" /></>,
    aesthetic: <><circle cx="12" cy="12" r="7.5" /><path d="M9 10.5h.01M15 10.5h.01M8.5 15c2 1.6 5 1.6 7 0M6.5 7.5c1.5-1 3.5-1.5 5.5-1.5" /></>,
    reconstructive: <><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4v16M7.2 7.2l9.6 9.6" /></>,
  };

  return <svg className="tx-service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[id]}</svg>;
}

/** Homepage service cards use the same routes, summaries and approved imagery as the services index. */
export default function TreatmentExplorer({ items }: { items: TreatmentItem[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const move = (direction: 1 | -1) => {
    if (!track.current) return;
    const card = track.current.querySelector<HTMLElement>(".tx-service-item");
    const step = card ? card.offsetWidth + 16 : track.current.clientWidth * 0.82;
    track.current.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    if (!track.current) return;
    const cards = track.current.querySelectorAll<HTMLElement>(".tx-service-item");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!el) return;
        const scrollLeft = el.scrollLeft;
        const cards = el.querySelectorAll<HTMLElement>(".tx-service-item");
        if (!cards.length) return;

        let closestIndex = 0;
        let minDiff = Infinity;
        cards.forEach((card, idx) => {
          const diff = Math.abs(card.offsetLeft - el.offsetLeft - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
          }
        });
        setActiveIndex(closestIndex);
      });
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="find-care" className="tx tx--cards" aria-labelledby="tx-h">
      <div className="container">
        <header className="tx-cards-head">
          <p className="tx-cards-kicker">Find care</p>
          <h2 id="tx-h" className="tx-cards-title">What can we <span>help you with?</span></h2>
          <p className="tx-cards-lead">
            Choose the area closest to your concern. If you&rsquo;re unsure where to begin, start
            with a comprehensive eye examination and the doctor can guide you after assessment.
          </p>
        </header>

        <div className="tx-carousel">
          <button type="button" className="tx-carousel-button tx-carousel-button--prev" aria-label="Show previous services" onClick={() => move(-1)}>
            <ArrowRightIcon width={24} height={24} />
          </button>
          <ul ref={track} className="tx-service-track" role="list">
            {items.map((t) => (
              <li key={t.id} className="tx-service-item">
                <Link href={t.href} className="tx-service-card">
                  <span className="tx-service-media" aria-hidden="true">
                    {t.image ? (
                      <Image src={t.image.src} alt="" fill sizes="(min-width: 1200px) 18vw, (min-width: 700px) 38vw, 84vw" className="tx-service-image" style={{ objectPosition: t.image.position }} />
                    ) : t.plate ? (
                      <Plate name={t.plate} crop="card" />
                    ) : (
                      <span className="tx-service-mark">{t.short}</span>
                    )}
                  </span>
                  <span className="tx-service-icon-wrap"><TreatmentIcon id={t.id} /></span>
                  <span className="tx-service-content">
                    <span className="tx-service-title">{t.title}</span>
                    <span className="tx-service-summary">{t.summary}</span>
                    <span className="tx-service-link">Learn more <ArrowRightIcon width={17} height={17} /></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <button type="button" className="tx-carousel-button tx-carousel-button--next" aria-label="Show more services" onClick={() => move(1)}>
            <ArrowRightIcon width={24} height={24} />
          </button>
        </div>

        <div className="tx-carousel-nav" aria-label="Service carousel navigation">
          <button
            type="button"
            className="tx-carousel-nav-btn tx-carousel-nav-btn--prev"
            aria-label="Previous service"
            disabled={activeIndex === 0}
            onClick={() => move(-1)}
          >
            <ArrowRightIcon width={18} height={18} />
          </button>
          <div className="tx-carousel-dots" role="tablist" aria-label="Services pagination">
            {items.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to ${t.title}`}
                className={`tx-carousel-dot${idx === activeIndex ? " is-active" : ""}`}
                onClick={() => scrollToIndex(idx)}
              />
            ))}
          </div>
          <button
            type="button"
            className="tx-carousel-nav-btn tx-carousel-nav-btn--next"
            aria-label="Next service"
            disabled={activeIndex === items.length - 1}
            onClick={() => move(1)}
          >
            <ArrowRightIcon width={18} height={18} />
          </button>
        </div>

        <Link href={LINKS.allServices} className="tx-all-services">View all services <ArrowRightIcon width={22} height={22} /></Link>
      </div>
    </section>
  );
}
