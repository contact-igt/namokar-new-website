"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PhotoItem } from "@/lib/photos";
import { ArrowRightIcon, CloseIcon } from "./Icons";

/**
 * Asymmetric photo composition with an accessible lightbox. Each photograph is a real
 * button; the lightbox is a native modal <dialog> (Escape closes, focus is trapped and
 * returned to the photograph that opened it), with Previous/Next buttons and arrow keys.
 * Works with 1 to 5 photographs. Nothing relies on hover.
 */
export default function FacilityGallery({
  items,
  label,
}: {
  items: PhotoItem[];
  label: string;
}) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const n = items.length;

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (d: number) => setIndex((i) => (i + d + n) % n);

  useEffect(() => {
    const dlg = dialog.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dlg.addEventListener("keydown", onKey);
    return () => dlg.removeEventListener("keydown", onKey);
  });

  if (!n) return null;
  const cur = items[index];

  return (
    <>
      <ul className={`fg fg--${Math.min(n, 5)}`} aria-label={label}>
        {items.map((it, i) => (
          <li key={it.src} className={`fg-item fg-item--${i + 1}`}>
            <button type="button" className="fg-open" onClick={() => open(i)}>
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
                <span className="sr-only"> Open larger view.</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="lb"
        aria-label={`${label}: larger view`}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="lb-inner">
          <button type="button" className="lb-close" onClick={() => dialog.current?.close()} aria-label="Close larger view">
            <CloseIcon width={24} height={24} />
          </button>
          <div className="lb-stage">
            <Image
              key={cur.src}
              src={cur.src}
              alt={cur.alt}
              width={cur.width}
              height={cur.height}
              sizes="100vw"
              className="lb-img"
            />
          </div>
          <p className="lb-cap" aria-live="polite">
            {cur.title && <strong>{cur.title}. </strong>}
            {cur.caption} <span className="lb-count">({index + 1} of {n})</span>
          </p>
          {n > 1 && (
            <div className="lb-nav">
              <button type="button" className="lb-btn lb-btn--prev" onClick={() => step(-1)} aria-label="Previous photograph">
                <ArrowRightIcon width={22} height={22} />
              </button>
              <button type="button" className="lb-btn" onClick={() => step(1)} aria-label="Next photograph">
                <ArrowRightIcon width={22} height={22} />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
