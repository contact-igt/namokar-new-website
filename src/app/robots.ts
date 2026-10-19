import type { MetadataRoute } from "next";
import { ALLOW_INDEXING } from "@/config/routes";
import { SITE } from "@/config/site";

/** Everything is disallowed until launch (ALLOW_INDEXING=on). API and media are never crawled. */
export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/media/"] },
    sitemap: `${SITE.origin}/sitemap.xml`,
  };
}
