import type { CSSProperties } from "react";
import { type Asset, usable } from "@/config/assets";
import AssetImage from "./AssetImage";

export type Ratio = "wide" | "cinema" | "square" | "tall" | "portrait";

/**
 * One photograph with an optional caption, in a fixed-ratio frame so nothing shifts as it loads.
 * Renders nothing when the asset is not cleared for use, so the surrounding layout must
 * cope with its absence.
 *
 *  ratio  wide 3:2 · cinema 16:9 · square 1:1 · tall 4:5 · portrait 2:3
 *  tab    small orange tab on the top edge (the Namokar signature)
 */
export default function EditorialImage({
  asset,
  caption,
  ratio = "wide",
  position = "50% 50%",
  sizes = "(min-width: 960px) 50vw, 100vw",
  eager,
  tab = true,
  className = "",
  mobileRatio,
  mobilePosition,
}: {
  asset: Asset;
  caption?: string;
  ratio?: Ratio;
  position?: string;
  sizes?: string;
  eager?: boolean;
  tab?: boolean;
  className?: string;
  /** Different crop on small screens when one crop would damage the subject. */
  mobileRatio?: Ratio;
  mobilePosition?: string;
}) {
  if (!usable(asset)) return null;
  const style = {
    "--pos": position,
    "--pos-m": mobilePosition ?? position,
  } as CSSProperties;
  return (
    <figure
      className={`ed ed--${ratio}${mobileRatio ? ` ed-m--${mobileRatio}` : ""}${tab ? " ed--tab" : ""} ${className}`}
      style={style}
    >
      <span className="ed-frame">
        <AssetImage asset={asset} fill sizes={sizes} eager={eager} className="ed-img" />
      </span>
      {caption && <figcaption className="ed-cap">{caption}</figcaption>}
    </figure>
  );
}
