import { type PageKey, indexable } from "@/config/routes";

/**
 * Structured data, emitted only when this page is cleared for indexing.
 * While the site is in review (the default), no page carries JSON-LD, so unreviewed facts are
 * not packaged for search engines or AI answer engines. Pass one object or several.
 */
export default function JsonLd({ data, page }: { data: object | object[]; page: PageKey }) {
  if (!indexable(page)) return null;
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escape "<" so a stray "</script>" in content can never close the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
