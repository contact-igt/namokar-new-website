"use client";

import Image from "next/image";
import Slider from "react-slick";
import { usePrefersReducedMotion, useQuery } from "../motion/useMedia";

const ITEMS = [
  { title: "Nuclear Cataract", detail: "Clouding develops in the central part of the natural lens. It is commonly associated with ageing.", image: "/images/cataract-pattern-nuclear.png", alt: "Lens with central nuclear clouding" },
  { title: "Cortical Cataract", detail: "Clouding develops in the outer portion of the lens, often forming spoke-like patterns.", image: "/images/cataract-pattern-cortical.png", alt: "Lens with wedge-like cortical clouding at the outer edge" },
  { title: "Posterior Subcapsular Cataract", detail: "Clouding develops near the back of the natural lens and may cause glare or difficulty with reading.", image: "/images/cataract-pattern-posterior.png", alt: "Lens with clouding near the back posterior capsule" },
];

export default function CataractPatterns() {
  const showCarousel = useQuery("(width < 960px)");
  const slidesToShow = useQuery("(min-width: 640px)") ? 2 : 1;
  const reducedMotion = usePrefersReducedMotion();
  const cards = ITEMS.map((item) => (
    <figure className="cat-card cat-card--pattern" key={item.title}>
      <div className="cat-image">
        <Image src={item.image} alt={item.alt} width={1086} height={1448} sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <figcaption><h4>{item.title}</h4><p>{item.detail}</p></figcaption>
    </figure>
  ));

  return (
    <div className="cat-guide">
      <div className="cat-comparison-panel"><div className="cat-pair" aria-label="Clear and clouded natural lens comparison">
        <figure className="cat-card cat-card--comparison">
          <div className="cat-image">
            <Image
              src="/images/clear-natural-lens.png"
              alt="Clear Natural Lens with light passing through and focusing to a point"
              width={1448}
              height={1086}
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <span aria-hidden="true">Clear lens</span>
          </div>
          <figcaption><h3>Clear Natural Lens</h3><p>A transparent lens works with the cornea to focus light onto the retina.</p></figcaption>
        </figure>
        <figure className="cat-card cat-card--comparison">
          <div className="cat-image">
            <Image
              src="/images/clouded-natural-lens.png"
              alt="Clouded natural lens with light dispersing after passing through it"
              width={1448}
              height={1086}
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <span aria-hidden="true">Clouded lens</span>
          </div>
          <figcaption><h3>Lens with a cataract</h3><p>Clouding within the natural lens interferes with light transmission and reduces visual quality.</p></figcaption>
        </figure>
      </div></div>
      <div className="cat-types cat-pattern-panel">
        <div className="cat-types-head"><h3>Three common patterns</h3><p>These describe where clouding sits in the lens. A person can have more than one pattern.</p></div>
        {showCarousel ? (
          <Slider
            key={slidesToShow}
            className="cat-pattern-carousel"
            slidesToShow={slidesToShow}
            slidesToScroll={1}
            infinite={false}
            arrows={false}
            dots
            speed={reducedMotion ? 0 : 300}
            customPaging={(index) => <button type="button" aria-label={`View cataract patterns starting with ${ITEMS[index].title}`} />}
          >
            {cards}
          </Slider>
        ) : (
          <div className="cat-types-grid">{cards}</div>
        )}
      </div>
    </div>
  );
}
