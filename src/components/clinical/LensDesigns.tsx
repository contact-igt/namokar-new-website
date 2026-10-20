"use client";

import Link from "next/link";
import Image from "next/image";
import Slider, { type Settings } from "react-slick";
import { LINKS } from "@/config/site";
import { ArrowRightIcon } from "../Icons";

type Design = "distance" | "near" | "astigmatism" | "edof";

const ORDER: Design[] = ["distance", "near", "astigmatism", "edof"];
const IMAGES: Record<Design, string> = {
  distance: "/images/lens-monofocal.webp",
  near: "/images/lens-multifocal.webp",
  astigmatism: "/images/lens-toric.webp",
  edof: "/images/lens-edof.webp",
};

/**
 * One card per design term: a simplified focus drawing, a short tag, a plain description and three
 * checklist points. Wording only restates the general descriptions; no brand names, no promises.
 */
const COPY: Record<
  Design,
  { name: string; tag: string; title: string; text: string; points: string[] }
> = {
  distance: {
    name: "Monofocal",
    tag: "One main focus",
    title: "One main focal distance",
    text: "A monofocal lens has one main focus, often chosen for distance. Spectacles may still be needed for other distances.",
    points: [
      "One main point of focus",
      "Often chosen for distance",
      "Spectacles may still be needed",
    ],
  },
  near: {
    name: "Multifocal",
    tag: "More than one focus",
    title: "More than one focal distance",
    text: "A multifocal design distributes light across more than one focus. It can involve visual trade-offs, which need an individual discussion.",
    points: [
      "Light shared across more than one focus",
      "May involve visual trade-offs",
      "Needs an individual discussion",
    ],
  },
  astigmatism: {
    name: "Toric",
    tag: "For astigmatism",
    title: "Addresses astigmatism",
    text: "A toric lens is designed to address corneal astigmatism. Toric features can be combined with other lens designs.",
    points: [
      "Designed for corneal astigmatism",
      "Can be combined with other designs",
      "Measurements of the eye guide the choice",
    ],
  },
  edof: {
    name: "EDOF",
    tag: "Extended range of focus",
    title: "An extended range of focus",
    text: "An extended depth of focus design aims to give a continuous range of useful vision. Reading glasses may still be needed.",
    points: [
      "Aims for a continuous range of useful vision",
      "Reading glasses may still be needed",
      "Suitability is decided after examination",
    ],
  },
};

/**
 * Four common replacement lens design terms as cards. Pending medical review
 * (src/config/figures.ts); no brand names and no promises.
 */
export default function LensDesigns() {
  // Three cards across on a desktop, two on a tablet, one on a phone. Swipe, drag or use the dots;
  // nothing moves on its own.
  const settings: Settings = {
    accessibility: true,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 520,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1000, settings: { slidesToShow: 2 } },
      { breakpoint: 680, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <div>
      <div className="fg lens-fg" aria-label="Replacement lens designs">
        <Slider {...settings}>
          {ORDER.map((d) => (
            <div key={d}>
              <article className="lens-card">
                <div className="lens-card-fig">
                  <Image
                    className="lens-card-image"
                    src={IMAGES[d]}
                    alt={`Simplified illustration of how a ${COPY[d].name.toLowerCase()} lens focuses light inside the eye`}
                    fill
                    loading="eager"
                    sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                </div>
                <div className="lens-card-body">
                  <div className="lens-card-top">
                    <span className="lens-card-name">{COPY[d].name}</span>
                    <span className="lens-card-tag">{COPY[d].tag}</span>
                  </div>
                  <h3 className="lens-card-title">{COPY[d].title}</h3>
                  <p className="lens-card-text">{COPY[d].text}</p>
                  <ul className="lens-card-points">
                    {COPY[d].points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <Link href={LINKS.contact} className="lens-card-cta">
                    Discuss lens options{" "}
                    <ArrowRightIcon width={18} height={18} />
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </Slider>
      </div>
      <p className="clin-fine lens-fine">
        Which design, if any, suits you depends on your eyes, your daily
        activities and your expectations. These simplified diagrams do not
        predict your vision. No lens can promise that you will never need
        spectacles.
      </p>
    </div>
  );
}
