import Image from "next/image";

const STATES = [
  {
    src: "/images/reconstructive/tear-normal-drainage.png",
    alt: "Diagram showing normal tear drainage from the eye corner down through the tear duct into the nose",
    title: "Normal Drainage",
    text: "Tears flow from the eye corner through the tear ducts into the nose. This keeps your eyes hydrated and clear.",
  },
  {
    src: "/images/reconstructive/tear-blocked-passage.png",
    alt: "Diagram showing a blocked passage in the tear duct causing fluid retention",
    title: "Blocked Passage",
    text: "Tears cannot drain properly, which may lead to watery eyes or recurrent infections. A blocked passage can cause excessive tearing.",
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
