import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { type PageKey } from "@/config/routes";
import { pageMeta, withBrand } from "@/lib/seo";
import { LINKS, SERVICE_GROUPS, type ServiceKey, serviceByKey } from "@/config/site";
import { SERVICE_CONTENT } from "@/content/services";
import { onlineBookingAvailable } from "@/lib/booking";
import { videosFor } from "@/content/videos";
import VideoSection from "./VideoSection";
import { usable } from "@/config/assets";
import { figureUsable } from "@/config/figures";
import { Plate } from "./clinical/Plates";
import { COVERS } from "@/content/covers";
import AssetImage from "./AssetImage";
import BookButton from "./BookButton";
import EditorialImage from "./EditorialImage";
import CtaBand from "./CtaBand";
import FaqList from "./FaqList";
import JsonLd from "./JsonLd";
import { SERVICE_ABOUT, faqPage, webPage } from "@/lib/schema";
import HelpPanel from "./HelpPanel";
import { ArrowRightIcon } from "./Icons";
import PageHero from "./PageHero";

/** Page metadata shared by every service route. Pages awaiting review are not indexed. */
export function serviceMetadata(key: ServiceKey): Metadata {
  const c = SERVICE_CONTENT[key];
  return pageMeta(key as PageKey, { title: withBrand(c.metaTitle), description: c.metaDescription });
}

/**
 * Shared service-detail template: hero, introduction, a slot for page-specific sections,
 * when-to-seek-help, assessment journey, FAQ, related services and the closing call to action.
 * Each service page supplies its own editorial section as `children` so the pages differ.
 */
export default function ServiceLayout({
  serviceKey,
  children,
}: {
  serviceKey: ServiceKey;
  children?: ReactNode;
}) {
  const c = SERVICE_CONTENT[serviceKey];
  const s = serviceByKey(serviceKey);
  const online = onlineBookingAvailable();
  const group = SERVICE_GROUPS[s.group];
  const cover = COVERS[serviceKey];
  const hasCover = usable(cover.primary.asset);
  const vids = videosFor(serviceKey);

  return (
    <main id="main">
      <JsonLd page={serviceKey}
        data={[
          webPage({
            type: "MedicalWebPage",
            path: s.href,
            name: c.metaTitle,
            description: c.metaDescription,
            about: SERVICE_ABOUT[serviceKey],
          }),
          faqPage(s.href, c.faqs),
        ]}
      />
      <PageHero
        crumb={s.title}
        trail={[{ label: "Services", href: LINKS.allServices }]}
        eyebrow={c.eyebrow ?? group.title}
        title={c.h1}
        lead={c.lead}
        actions={<BookButton online={online} />}
        media={
          hasCover ? (
            <AssetImage
              asset={cover.primary.asset}
              fill
              eager
              sizes="(min-width: 960px) 58vw, 100vw"
              className="page-hero-img"
              style={{ objectPosition: cover.primary.position }}
            />
          ) : undefined
        }
        mediaCaption={hasCover ? cover.primary.caption : undefined}
        aside={hasCover ? undefined : <HelpPanel />}
      />

      <section id="overview" className="section section--tight" aria-labelledby="overview-h">
        <div className="container about-grid">
          <div className="section-head reveal">
            <p className="kicker">{group.title}</p>
            <h2 id="overview-h" className="h2">{c.introHeading}</h2>
          </div>
          <div className="about-body reveal">
            {c.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {cover.plate && figureUsable(cover.plate.figure) && (
              <figure className="about-photo plate-fig">
                <Plate name={cover.plate.plate} />
                <figcaption className="plate-cap">{cover.plate.caption}</figcaption>
              </figure>
            )}
            {cover.secondary && usable(cover.secondary.asset) && (
              <EditorialImage
                asset={cover.secondary.asset}
                caption={cover.secondary.caption}
                ratio="cinema"
                position={cover.secondary.position}
                sizes="(min-width: 960px) 50vw, 100vw"
                className="about-photo"
                tab={false}
              />
            )}
          </div>
        </div>
      </section>

      {children}

      <section id="when" className="section section--porcelain" aria-labelledby="when-h">
        <div className="container about-grid">
          <div className="section-head reveal">
            <p className="kicker">Know the signs</p>
            <h2 id="when-h" className="h2">{c.seekHelp.heading}</h2>
          </div>
          <div className="about-body reveal">
            <ul className="bullets bullets--lg">
              {c.seekHelp.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="callout">{c.seekHelp.note}</p>
          </div>
        </div>
      </section>

      <section id="journey" className="section" aria-labelledby="journey-h">
        <div className="container why-grid">
          <div className="section-head reveal">
            <p className="kicker">What to expect</p>
            <h2 id="journey-h" className="h2">What an assessment involves</h2>
            <p className="lead">{c.journeyLead}</p>
          </div>
          <ol className="why-list">
            {c.journey.map((j, i) => (
              <li key={j.title} className="why-row">
                <span className="why-no" aria-hidden="true">0{i + 1}</span>
                <div>
                  <h3 className="h3">{j.title}</h3>
                  <p>{j.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <VideoSection
        id="watch"
        videos={vids}
        kicker="Watch"
        heading={vids.length > 1 ? "Videos on this topic" : "A video on this topic"}
        lead="Dr. Poonam Jain's centre shares short videos on its YouTube channel and in its own footage."
        note="Videos are general information, not a substitute for an examination. They complement the written information on this page."
      />

      <section id="faq" className="section section--porcelain" aria-labelledby="faq-h">
        <div className="container faq-grid">
          <div className="section-head reveal">
            <p className="kicker">Common questions</p>
            <h2 id="faq-h" className="h2">Questions patients often ask</h2>
            <p className="lead">
              This page is general information, not medical advice. Your own eyes need to
              be examined before anyone can advise you.
            </p>
          </div>
          <FaqList items={c.faqs} />
        </div>
      </section>

      <section id="related" className="section section--tight" aria-labelledby="related-h">
        <div className="container">
          <h2 id="related-h" className="h2 h2--sm">Related care</h2>
          <ul className="related-list">
            {c.related.map((k) => {
              const r = serviceByKey(k);
              return (
                <li key={k}>
                  <Link href={r.href} className="related-link">
                    <span className="related-title">{r.title}</span>
                    <span className="related-blurb">{r.blurb}</span>
                    <ArrowRightIcon width={18} height={18} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand
        id={`${serviceKey}-cta-h`}
        heading="Speak to the centre about your eyes."
        lead="Contact the centre to plan your visit or arrange an eye consultation."
        online={online}
      />
    </main>
  );
}
