import AssetImage from "@/components/AssetImage";
import { ASSETS, usable } from "@/config/assets";

const STATES = [
  {
    asset: ASSETS.glaucomaDrainageNormalAi,
    title: "Normal Fluid Drainage",
    heading: "Fluid drains as it is made",
    text: "Aqueous humour circulates through the front of the eye and drains through specialised pathways, helping regulate pressure inside the eye.",
  },
  {
    asset: ASSETS.glaucomaDrainageSlowedAi,
    title: "Reduced Fluid Drainage",
    heading: "Pressure can rise",
    text: "When fluid drainage is impaired, intraocular pressure may rise. Elevated pressure can increase the risk of optic nerve damage.",
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
