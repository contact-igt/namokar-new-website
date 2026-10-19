import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { robotsFor } from "@/config/routes";
import { LINKS, SITE } from "@/config/site";
import { ARTICLES } from "@/content/articles";
import { onlineBookingAvailable } from "@/lib/booking";

type Params = Promise<{ slug: string }>;

/*
 * Cache Components needs at least one static param. With no approved articles yet we return a
 * sentinel that is never linked and always resolves to the 404 page; every other unknown slug is
 * resolved at request time and also returns a true 404 status (not a soft 404).
 */
export function generateStaticParams() {
  return ARTICLES.length ? ARTICLES.map((a) => ({ slug: a.slug })) : [{ slug: "no-articles-yet" }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return { title: `Article not found | ${SITE.name}`, robots: { index: false, follow: false } };
  return {
    title: `${a.title} | ${SITE.name}`,
    description: a.excerpt,
    alternates: { canonical: `${LINKS.blogs}/${a.slug}` },
    robots: robotsFor("blogs"),
    openGraph: { title: a.title, description: a.excerpt, url: `${LINKS.blogs}/${a.slug}`, type: "article" },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) notFound();
  const online = onlineBookingAvailable();
  const words = a.body.reduce(
    (n, b) => n + (b.type === "ul" ? b.items.join(" ").split(/\s+/).length : b.text.split(/\s+/).length),
    0,
  );
  return (
    <main id="main">
      <PageHero
        crumb={a.title}
        trail={[{ label: "Health Articles", href: LINKS.blogs }]}
        eyebrow={a.category}
        title={a.title}
        lead={a.excerpt}
      />
      <article className="section section--tight">
        <div className="container article">
          <p className="article-meta">
            {a.author}. Reviewed by {a.clinicalReviewer.name} on {a.clinicalReviewer.reviewedOn}.{" "}
            About {Math.max(1, Math.round(words / 200))} min read.
          </p>
          {a.body.map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i} className="h2 h2--sm">{b.text}</h2>
            ) : b.type === "p" ? (
              <p key={i}>{b.text}</p>
            ) : (
              <ul key={i} className="bullets">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            ),
          )}
          {a.references && (
            <>
              <h2 className="h2 h2--sm">References</h2>
              <ul className="bullets">
                {a.references.map((r) => (
                  <li key={r.url}>
                    <a href={r.url} className="text-link" target="_blank" rel="noopener noreferrer">
                      {r.label}<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="fine">
            This article is general information, not medical advice. <Link href={LINKS.contact} className="text-link">Contact the centre</Link> to have your eyes examined.
          </p>
        </div>
      </article>
      <CtaBand
        id="article-cta-h"
        heading="Have a question about your eyes?"
        lead="Contact the centre to plan your visit or arrange an eye consultation."
        online={online}
      />
    </main>
  );
}

