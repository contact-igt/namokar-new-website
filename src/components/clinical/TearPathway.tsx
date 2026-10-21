import Image from "next/image";

const STATES = [
  {
    src: "/images/tears-drain.png",
    alt: "Labelled anatomy diagram showing tears draining through the tear gland, puncta, canaliculi, tear sac and tear duct",
    title: "Tears drain",
    text: "Tears pass from the inner eye through the puncta, canaliculi, tear sac and tear duct into the nose.",
  },
  {
    src: "/images/passage-blocked.png",
    alt: "Labelled anatomy diagram showing a blockage in the tear duct and tears collecting above it",
    title: "Passage blocked",
    text: "When the passage is narrowed or blocked, tears can pool at the inner eye corner and the eye may water.",
  },
];

/** A side-by-side, labelled explanation of normal and blocked tear drainage. */
export default function TearPathway() {
  return (
    <div className="tear-pair">
      {STATES.map(({ src, alt, title, text }) => (
        <figure className="tear-pair__item" key={src}>
          <h3>{title}</h3>
          <Image
            src={src}
            alt={alt}
            width={1536}
            height={1024}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="tear-pair__image"
          />
          <figcaption>{text}</figcaption>
        </figure>
      ))}
    </div>
  );
}
