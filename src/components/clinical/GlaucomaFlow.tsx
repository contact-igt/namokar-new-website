import AssetImage from "@/components/AssetImage";
import { ASSETS, usable } from "@/config/assets";

const STATES = [
  {
    asset: ASSETS.glaucomaDrainageNormalAi,
    title: "Drains normally",
    heading: "Fluid drains as it is made",
    text: "Clear fluid flows through the pupil and drains at the angle where the iris meets the cornea, helping pressure stay within a healthy range.",
  },
  {
    asset: ASSETS.glaucomaDrainageSlowedAi,
    title: "Drainage slowed",
    heading: "Pressure can rise",
    text: "When fluid drains too slowly, it can build up inside the eye and raise pressure, which may damage the optic nerve over time.",
  },
];

/** A side-by-side explanation of normal and slowed aqueous-fluid drainage. */
export default function GlaucomaFlow() {
  return (
    <div className="tear-pair glaucoma-pair">
      {STATES.map(({ asset, title, heading, text }) => (
        <figure className="tear-pair__item glaucoma-pair__item" key={title}>
          <h3>{title}</h3>
          {usable(asset) && (
            <div className="glaucoma-pair__frame">
              <AssetImage
                asset={asset}
                sizes="(min-width: 768px) 360px, 80vw"
                className="glaucoma-pair__image"
              />
            </div>
          )}
          <figcaption>
            <strong>{heading}</strong>
            <span>{text}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
