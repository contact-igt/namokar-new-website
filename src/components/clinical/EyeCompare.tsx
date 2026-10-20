import Image from "next/image";

/** Matched supplied illustrations in the established blue comparison-card treatment. */
export default function EyeCompare() {
  return (
    <div className="eyecmp">
      <figure className="eyecmp-panel">
        <Image
          className="eyecmp-img"
          src="/images/Normal-Eye.png"
          alt="Normal eye cross-section with a clear lens focusing light on the retina"
          width={1672}
          height={941}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <figcaption>
          <strong>Normal eye</strong>
          <span>The lens is clear, so light passes through and focuses on the retina.</span>
        </figcaption>
      </figure>
      <figure className="eyecmp-panel">
        <Image
          className="eyecmp-img"
          src="/images/cloudy-lens-new.png"
          alt="Eye with a cataract, showing a cloudy lens scattering light"
          width={1672}
          height={941}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <figcaption>
          <strong>Eye with a cataract</strong>
          <span>The lens has become cloudy, so light is scattered and vision can look blurred or dim.</span>
        </figcaption>
      </figure>
    </div>
  );
}
