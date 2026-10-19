import type { Metadata } from "next";
import { pageMeta, withBrand } from "@/lib/seo";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import HelpPanel from "@/components/HelpPanel";
import PageHero from "@/components/PageHero";

import { LINKS } from "@/config/site";
import { ARTICLES } from "@/content/articles";
import { onlineBookingAvailable } from "@/lib/booking";

export const metadata: Metadata = pageMeta("blogs", {
  title: withBrand("Health Articles"),
  description: "Eye-health articles from Namokar Eye & Oculoplasty Centre, Ashok Vihar, New Delhi. None are published yet.",
});

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function BlogsPage() {
  const online = onlineBookingAvailable();
  const sorted = [...ARTICLES].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
  return (
    <main id="main">
      <PageHero
        crumb="Health Articles"
        title="Health articles."
        lead={
          sorted.length
            ? "Eye-health information reviewed by a clinician."
            : "There are no published articles yet."
        }
        actions={<BookButton online={online} />}
        aside={<HelpPanel heading="Speak to the centre" />}
      />

      <section className="section section--tight" aria-label="Articles">
        <div className="container">
          {sorted.length ? (
            <ul className="tile-grid">
              {sorted.map((a) => (
                <li key={a.slug}>
                  <Link href={`${LINKS.blogs}/${a.slug}`} className="tile">
                    <span className="kicker">{a.category}</span>
                    <span className="tile-title">{a.title}</span>
                    <span className="tile-blurb">{a.excerpt}</span>
                    <span className="tile-meta">{fmt(a.publishedOn)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <h2 className="h2">No articles yet</h2>
              <p>
                Articles appear here only after a clinician has reviewed them. Until then,
                the pages on <Link href={LINKS.allServices} className="text-link">services</Link>{" "}
                give general information about each area of care.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
