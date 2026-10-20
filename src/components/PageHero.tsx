import type { ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";
import Parallax from "./motion/Parallax";

/**
 * Inner-page hero. Text sits on white. `media` (a cleared photograph) or `aside`
 * (a text fallback) sits beside or below it, never behind the copy.
 */
export default function PageHero({
  crumb,
  trail,
  eyebrow,
  title,
  lead,
  actions,
  media,
  mediaCaption,
  aside,
}: {
  crumb: string;
  trail?: { label: string; href: string }[];
  eyebrow?: string;
  title: string;
  lead: string;
  actions?: ReactNode;
  media?: ReactNode;
  mediaCaption?: string;
  aside?: ReactNode;
}) {
  const side = media ? "photo" : aside ? "aside" : "none";
  return (
    <section className={`page-hero page-hero--${side}`}>
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <Breadcrumb current={crumb} trail={trail} />
          {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
          <h1 className="page-title">{title}</h1>
          <p className="page-lead">{lead}</p>
          {actions && <div className="page-actions">{actions}</div>}
        </div>
        {media && (
          <figure className="page-hero-media">
            <Parallax>{media}</Parallax>
            {mediaCaption && (
              <figcaption className="hero-caption">
                <span className="hero-caption-kicker">{crumb}</span>
                <span className="hero-caption-text">{mediaCaption}</span>
              </figcaption>
            )}
          </figure>
        )}
        {!media && aside}
      </div>
    </section>
  );
}
