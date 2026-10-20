import Image from "next/image";

const ITEMS = [
  { title: "Nuclear sclerotic", detail: "Clouding develops in the central part of the natural lens.", image: "/images/cataract-pattern-nuclear.png", alt: "Lens with central nuclear clouding" },
  { title: "Cortical", detail: "Clouding begins in the outer lens and can extend towards its centre.", image: "/images/cataract-pattern-cortical.png", alt: "Lens with wedge-like cortical clouding at the outer edge" },
  { title: "Posterior subcapsular", detail: "Clouding develops near the back surface of the lens.", image: "/images/cataract-pattern-posterior.png", alt: "Lens with clouding near the back posterior capsule" },
];

export default function CataractPatterns() {
  return (
    <div className="cat-guide">
      <div className="cat-pair" aria-label="Clear and clouded natural lens comparison">
        <figure className="cat-card cat-card--comparison">
          <div className="cat-image">
            <Image
              src="/images/clear-natural-lens.png"
              alt="Clear natural lens with light passing through and focusing to a point"
              width={1448}
              height={1086}
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <span aria-hidden="true">Clear lens</span>
          </div>
          <figcaption><h3>Clear natural lens</h3><p>Light passes through a transparent lens and focuses on the retina.</p></figcaption>
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
          <figcaption><h3>Lens with a cataract</h3><p>Clouding of the natural lens can scatter light and affect vision.</p></figcaption>
        </figure>
      </div>
      <div className="cat-types">
        <div className="cat-types-head"><h3>Three common patterns</h3><p>These describe where clouding sits in the lens. A person can have more than one pattern.</p></div>
        <div className="cat-types-grid">
          {ITEMS.map((item) => (
            <figure className="cat-card cat-card--pattern" key={item.title}>
              <div className="cat-image">
                <Image src={item.image} alt={item.alt} width={1086} height={1448} sizes="(min-width: 900px) 33vw, (min-width: 640px) 50vw, 100vw" />
                <span aria-hidden="true">{item.title}</span>
              </div>
              <figcaption><h4>{item.title}</h4><p>{item.detail}</p></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
