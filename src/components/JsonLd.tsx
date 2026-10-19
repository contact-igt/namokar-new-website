import { ALLOW_INDEXING } from "@/config/routes";

/**
 * Structured data, emitted only when the site is set to be indexed (ALLOW_INDEXING=on).
 * While the site is in review (the default), no page carries JSON-LD, so unreviewed facts are
 * not packaged for search engines or AI answer engines. Pass one object or several.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  if (!ALLOW_INDEXING) return null;
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
