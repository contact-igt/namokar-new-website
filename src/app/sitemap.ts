import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, PAGES, indexable } from "@/config/routes";
import { LINKS, SITE } from "@/config/site";
import { ARTICLES } from "@/content/articles";

/** Lists only pages that are cleared for search engines. Empty until pages are reviewed and indexing is on. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!ALLOW_INDEXING) return [];
  const pages = (Object.keys(PAGES) as (keyof typeof PAGES)[])
    .filter((k) => indexable(k))
    .map((k) => ({ url: `${SITE.origin}${PAGES[k].path}` }));
  const articles = indexable("blogs")
    ? ARTICLES.map((a) => ({
        url: `${SITE.origin}${LINKS.blogs}/${a.slug}`,
        lastModified: a.clinicalReviewer.reviewedOn,
      }))
    : [];
  return [...pages, ...articles];
}
