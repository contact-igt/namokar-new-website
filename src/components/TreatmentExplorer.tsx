"use client";

import Image from "next/image";
import Link from "next/link";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import type { TreatmentItem } from "@/lib/treatments";
import { ArrowRightIcon } from "./Icons";

/**
 * "Find care": the six treatments as real links with a picture and a short description.
 *
 * Desktop (960 px and up, mouse or trackpad): a list on the left and one shared preview on the
 * right. Pointing at a treatment, or tabbing to it, changes the preview (picture, title, summary);
 * clicking the treatment, or the preview's "Explore treatment" link, goes to its page. Nothing is
 * hidden behind hover: the preview is always on screen, defaulting to the first treatment, and it
 * stays when the pointer leaves the list so it can be reached and clicked.
 *
 * Touch and small screens: every treatment is its own card with its picture, title, summary and an
 * arrow, in a swipeable row (tablet: a grid). A card is one link, so the first tap navigates.
 *
 * Pictures come from the media registry already resolved on the server; a treatment with no
 * cleared photograph shows a plain brand card, so the explorer works in a normal build.
 */
export default function TreatmentExplorer({ items }: { items: TreatmentItem[] }) {
  const [active, setActive] = useState(0);
  const cur = items[active];
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => clear, []);
  // Hover intent: the preview changes when the pointer rests on a treatment for a moment, so
  // sweeping across the list towards the preview does not flicker through the others.
  const hover = (i: number) => (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clear();
    timer.current = setTimeout(() => setActive(i), 70);
  };

  return (
    <section id="find-care" className="tx" aria-labelledby="tx-h">
      <div className="container tx-grid">
        <div className="tx-head">
          <p className="kicker">Find care</p>
          <h2 id="tx-h" className="h2">Choose the care you are looking for.</h2>
          <p className="tx-lead">Six areas of care, each explained in plain language.</p>
        </div>

        <ul className="tx-list" role="list">
          {items.map((t, i) => (
            <li key={t.id} className="tx-li" data-active={i === active} onPointerEnter={hover(i)} onPointerLeave={clear}>
              <Link
                href={t.href}
                className="tx-link"
                onFocus={() => {
                  clear();
                  setActive(i);
                }}
              >
                {t.image ? (
                  <span className="tx-thumb" aria-hidden="true">
                    <Image
                      src={t.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 33vw, 80vw"
                      className="tx-thumb-img"
                      style={{ objectPosition: t.image.position }}
                    />
                  </span>
                ) : (
                  <span className="tx-thumb tx-thumb--card" aria-hidden="true">
                    <span className="tx-thumb-mark">{t.short}</span>
                  </span>
                )}
                <span className="tx-text">
                  <span className="tx-title">{t.title}</span>
                  <span className="tx-sum">{t.summary}</span>
                </span>
                <ArrowRightIcon className="tx-arrow" width={20} height={20} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="tx-stage" aria-label="Preview of the selected treatment">
          <div className="tx-frame">
            {items.map((t, i) =>
              t.image ? (
                <Image
                  key={t.id}
                  src={t.image.src}
                  alt={i === active ? t.image.alt : ""}
                  aria-hidden={i === active ? undefined : true}
                  fill
                  loading="lazy"
                  sizes="(min-width: 960px) 52vw, 1px"
                  className="tx-img"
                  data-active={i === active}
                  style={{ objectPosition: t.image.position }}
                />
              ) : null,
            )}
            {!cur.image && (
              <div className="tx-card" key={cur.id}>
                <span className="tx-card-kicker">Namokar Eye &amp; Oculoplasty Centre</span>
                <span className="tx-card-title">{cur.title}</span>
              </div>
            )}
          </div>
          <div className="tx-info" key={cur.id}>
            <p className="tx-info-title">{cur.title}</p>
            <p className="tx-info-sum">{cur.summary}</p>
            <Link href={cur.href} className="tx-cta">
              Explore treatment <ArrowRightIcon width={18} height={18} />
              <span className="sr-only">: {cur.title}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
