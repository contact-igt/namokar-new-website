import Link from "next/link";
import { ASSET_PREVIEW } from "@/config/assets";

/**
 * The one marker of the local design review. Replaces the per-picture "Preview only" overlays:
 * pictures render cleanly, and this slim strip before the header says the page
 * is the private review, with a link to the index of every pending item. Renders nothing unless
 * ASSET_PREVIEW=on, so it never appears in a normal build or in production.
 */
export default function ReviewBadge() {
  if (!ASSET_PREVIEW) return null;
  return (
    <aside className="review-badge" aria-label="Local design review">
      <Link href="/review">Local design review</Link>
    </aside>
  );
}
