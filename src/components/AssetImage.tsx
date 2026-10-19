import Image from "next/image";
import type { CSSProperties } from "react";
import { type Asset, srcOf, usable } from "@/config/assets";

/**
 * The only way pages should render a photograph. Renders nothing for an asset that is
 * not cleared for use, so a hidden asset can never leave an empty frame behind
 * (callers provide the fallback). In the local review preview pending assets render cleanly,
 * with no overlay on the picture; the review context is one small badge (components/ReviewBadge)
 * and the index at /review.
 */
export default function AssetImage({
  asset,
  fill,
  sizes,
  className,
  style,
  eager,
  alt,
}: {
  asset: Asset;
  fill?: boolean;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  eager?: boolean;
  alt?: string;
}) {
  if (!usable(asset)) return null;
  return (
    <>
      <Image
        src={srcOf(asset)}
        alt={alt ?? asset.alt}
        {...(fill ? { fill: true } : { width: asset.width, height: asset.height })}
        sizes={sizes}
        className={className}
        style={style}
        {...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
      />
    </>
  );
}

