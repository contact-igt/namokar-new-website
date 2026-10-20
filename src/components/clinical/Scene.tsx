import Image from "next/image";

/**
 * One photorealistic scene is used on both sides of the comparison. The cloudy side is altered
 * only by CSS in LensCompare, so visitors compare vision conditions rather than two locations.
 */
export default function Scene() {
  return (
    <Image
      src="/images/cataract-vision-comparison.png"
      alt=""
      fill
      sizes="(min-width: 960px) 80vw, 100vw"
      className="scene"
      aria-hidden="true"
    />
  );
}
