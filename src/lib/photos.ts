import { type Asset, previewOnly, srcOf, usable } from "@/config/assets";

/** A photograph that has been cleared for display, ready to hand to a client component. */
export type PhotoItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  title?: string;
  position: string;
  preview: boolean;
};

/** Returns null when the asset may not be shown, so callers lay out without it. */
export function photoItem(
  asset: Asset,
  opts: { caption: string; title?: string; position?: string; alt?: string },
): PhotoItem | null {
  if (!usable(asset)) return null;
  return {
    src: srcOf(asset),
    alt: opts.alt ?? asset.alt,
    width: asset.width,
    height: asset.height,
    caption: opts.caption,
    title: opts.title,
    position: opts.position ?? "50% 50%",
    preview: previewOnly(asset),
  };
}

export const compact = <T,>(xs: (T | null | undefined)[]): T[] => xs.filter((x): x is T => x != null);
