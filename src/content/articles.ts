/**
 * Published health articles.
 *
 * Add an article here ONLY when it has been written or supplied by the centre and approved
 * by a clinician. Do not generate articles for search traffic. Until an entry exists, /blogs
 * shows an honest "no articles yet" state, is hidden from navigation and is not indexed.
 *
 * Legacy WordPress permalinks: the old /blogs/ page listed no posts when checked on
 * 16 Oct 2026, so there is nothing to redirect. If posts are found later, map each old URL
 * to its new /blogs/<slug> here and in next.config.ts redirects().
 */
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date the article was actually published. */
  publishedOn: string;
  author: string;
  /** Clinician who reviewed it, and when. Required. */
  clinicalReviewer: { name: string; reviewedOn: string };
  /** Paragraphs and headings. Plain text only; rendered as text, never as HTML. */
  body: (
    | { type: "h2"; text: string }
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] }
  )[];
  references?: { label: string; url: string }[];
  /** Key of an approved asset in src/config/assets.ts, if the article has a cover image. */
  coverAsset?: string;
};

export const ARTICLES: Article[] = [];
