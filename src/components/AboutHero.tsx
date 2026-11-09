import type { ReactNode } from "react";
import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import { ASSETS, srcOf, usable } from "@/config/assets";

/**
 * About-only editorial hero. One reception photograph is shared by all viewports.
 */
export default function AboutHero({
  crumb,
  trail,
  eyebrow,
  title,
  lead,
  actions,
  mediaLabel,
  mediaCaption,
  aside,
}: {
  crumb: string;
  trail?: { label: string; href: string }[];
  eyebrow?: string;
  title: string;
  lead: string;
  actions?: ReactNode;
  mediaCaption?: string;
  mediaLabel?: string;
  aside?: ReactNode;
}) {
  const hasHero = usable(ASSETS.reception);

  return (
    <section className="about-hero page-hero--photo page-hero--long">
      <div className="container about-hero-container">
        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <Breadcrumb current={crumb} trail={trail} />
            {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
            <h1 className="page-title">{title}</h1>
            <p className="page-lead">{lead}</p>
            {actions && <div className="page-actions">{actions}</div>}
          </div>

          {hasHero && (
            <div className="about-hero-mobile-media">
              <div className="about-hero-mobile-img-wrap">
                <Image
                  src={srcOf(ASSETS.reception)}
                  alt={ASSETS.reception.alt}
                  width={2000}
                  height={1440}
                  sizes="(min-width: 960px) 50vw, 100vw"
                  priority
                  unoptimized
                  className="about-hero-mobile-img"
                />
              </div>
              {mediaCaption && (
                <figure className="about-hero-caption-wrap">
                  <figcaption className="hero-caption">
                    <span className="hero-caption-kicker">{mediaLabel ?? crumb}</span>
                    <span className="hero-caption-text">{mediaCaption}</span>
                  </figcaption>
                </figure>
              )}
            </div>
          )}

          {!hasHero && aside}
        </div>
      </div>
    </section>
  );
}
