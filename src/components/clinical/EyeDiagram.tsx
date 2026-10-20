import Image from "next/image";

/** Matched anatomy illustrations: the clear lens is always left, the clouded lens right. */
export default function EyeDiagram() {
  return (
    <div className="lens-pair">
      <figure className="lens-pair__item">
        <Image
          src="/images/healthy_lens.png"
          alt="Healthy lens in a cross-section of the eye, with labelled anatomy and light focused on the retina"
          width={1448}
          height={1086}
          sizes="(min-width: 960px) 50vw, 100vw"
        />
        <figcaption>
          <strong>Healthy lens</strong>
          <span>A clear lens focuses light at one point on the retina.</span>
        </figcaption>
      </figure>
      <figure className="lens-pair__item">
        <Image
          src="/images/clouded_lens.png"
          alt="Clouded lens in a cross-section of the eye, with labelled anatomy and scattered light"
          width={1448}
          height={1086}
          sizes="(min-width: 960px) 50vw, 100vw"
        />
        <figcaption>
          <strong>Clouded lens</strong>
          <span>A cataract clouds the lens, scattering light before it reaches the retina.</span>
        </figcaption>
      </figure>
    </div>
  );
}
