import type { Metadata } from "next";
import { type PageKey, PAGES, robotsFor } from "@/config/routes";
import { SITE } from "@/config/site";

/** The social-sharing card: the approved logo on white (src/app/opengraph-image.png). */
const SHARE_IMAGE = { url: "/opengraph-image.png", width: 1200, height: 630, alt: SITE.name };

/**
 * One builder for every page's metadata, so title, description, canonical, robots, Open Graph
 * and Twitter tags can never drift apart. The canonical is the page's own path from the route
 * registry (resolved against metadataBase to https://namokareyecare.com/...). Robots follow
 * src/config/routes.ts: noindex until the page is reviewed AND ALLOW_INDEXING is on.
 */
export function pageMeta(
  key: PageKey,
  opts: { title: string; description: string; ogType?: "website" | "profile" },
): Metadata {
  const path = PAGES[key].path;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: path },
    robots: robotsFor(key),
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: path,
      type: opts.ogType ?? "website",
      siteName: SITE.name,
      locale: "en_IN",
      images: [SHARE_IMAGE],
    },
    twitter: { card: "summary", title: opts.title, description: opts.description, images: [SHARE_IMAGE.url] },
  };
}

export const withBrand = (title: string) => `${title} | ${SITE.name}`;
