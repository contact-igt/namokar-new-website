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
          <span>The clear natural lens works with the cornea to focus light onto the retina, supporting clear vision.</span>
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
          <span>The cloudy natural lens scatters light and reduces how much passes through it. Vision can look blurred, dim or hazy.</span>
        </figcaption>
      </figure>
    </div>
  );
}
