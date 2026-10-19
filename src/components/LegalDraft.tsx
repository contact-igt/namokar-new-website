import type { ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";

/**
 * Review-only template for legal pages. The wording of a privacy policy or terms must be
 * supplied by the client's legal adviser; this page deliberately contains no invented
 * legal text. It lists facts about how this website behaves, and the headings the approved
 * text needs to cover. It is excluded from navigation, the sitemap and search engines.
 */
export default function LegalDraft({
  crumb,
  title,
  facts,
  topics,
  children,
}: {
  crumb: string;
  title: string;
  facts: string[];
  topics: string[];
  children?: ReactNode;
}) {
  return (
    <main id="main">
      <section className="page-hero page-hero--none">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <Breadcrumb current={crumb} />
            <h1 className="page-title">{title}</h1>
            <p className="legal-banner" role="note">
              <strong>Draft for review.</strong> This text has not been approved and is
              not in effect.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="facts-h">
        <div className="container about-grid">
          <div className="section-head">
            <p className="kicker">For the legal adviser</p>
            <h2 id="facts-h" className="h2">How this website behaves today</h2>
          </div>
          <div className="about-body">
            <ul className="bullets bullets--lg">
              {facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {children}
          </div>
        </div>
      </section>

      <section className="section section--porcelain" aria-labelledby="topics-h">
        <div className="container about-grid">
          <div className="section-head">
            <p className="kicker">To be supplied</p>
            <h2 id="topics-h" className="h2">What the approved text needs to cover</h2>
            <p className="lead">The wording is for the centre&apos;s legal adviser to provide.</p>
          </div>
          <ol className="why-list">
            {topics.map((t, i) => (
              <li key={t} className="why-row">
                <span className="why-no" aria-hidden="true">0{i + 1}</span>
                <div>
                  <h3 className="h3">{t}</h3>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
