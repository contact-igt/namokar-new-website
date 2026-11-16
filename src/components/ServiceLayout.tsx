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
import HomeCta from "./HomeCta";
import CtaBand from "./CtaBand";
import FaqList from "./FaqList";
import ServicesFaqSection from "./ServicesFaqSection";
import JsonLd from "./JsonLd";
import { SERVICE_ABOUT, faqPage, webPage } from "@/lib/schema";
import HelpPanel from "./HelpPanel";
import { ArrowRightIcon } from "./Icons";
import PageHero from "./PageHero";
import ServicePageHero from "./ServicePageHero";
import AestheticPageHero from "./AestheticPageHero";
import BlepharoplastyPageHero from "./BlepharoplastyPageHero";
import WhatIsBlepharoplasty from "./WhatIsBlepharoplasty";
import WhatIsAestheticOculoplasty from "./WhatIsAestheticOculoplasty";
import AestheticConditionsSection from "./AestheticConditionsSection";
import BlepharoplastyReasonsSection from "./BlepharoplastyReasonsSection";
import AssessmentJourneySection from "./AssessmentJourneySection";
import AestheticVideosSection from "./AestheticVideosSection";
import ExpertEyeCareSection, { SERVICE_CARD_IMAGES } from "./ExpertEyeCareSection";
import expertStyles from "./ExpertEyeCareSection.module.css";

const compactRelatedBlurb: Partial<Record<ServiceKey, string>> = {
  exams: "A thorough check of your vision and overall eye health.",
  cataract: "Assessment of a clouded lens and discussion of treatment options.",
  glaucoma: "Assessment and regular follow-up for long-term glaucoma care.",
  reconstructive: "Care for eyelid and tear-drainage problems affecting comfort or function.",
};

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
  hero, overview, afterEditorial, video, faq, closing, className,
}: {
  serviceKey: ServiceKey;
  children?: ReactNode;
  /** Page-specific slots override the default service composition. */
  hero?: ReactNode;
  overview?: ReactNode;
  afterEditorial?: ReactNode;
  video?: ReactNode;
  faq?: ReactNode;
  closing?: ReactNode;
  className?: string;
}) {
  const c = SERVICE_CONTENT[serviceKey];
  const s = serviceByKey(serviceKey);
  const online = onlineBookingAvailable();
  const group = SERVICE_GROUPS[s.group];
  const cover = COVERS[serviceKey];
  const hasCover = usable(cover.primary.asset);
  const vids = videosFor(serviceKey);
  const compactRelated = serviceKey === "glaucoma" || serviceKey === "exams" || serviceKey === "cataract";
  const redesignedService = serviceKey === "cataract" || serviceKey === "aesthetic" || serviceKey === "eyelid";

  return (
    <main id="main" className={className}>
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
      {hero ?? (serviceKey === "cataract" ? (
        <ServicePageHero />
      ) : serviceKey === "aesthetic" ? (
        <AestheticPageHero />
      ) : serviceKey === "eyelid" ? (
        <BlepharoplastyPageHero />
      ) : (
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
      ))}

      {overview ?? (serviceKey === "aesthetic" ? (
        <WhatIsAestheticOculoplasty id="overview" />
      ) : serviceKey === "eyelid" ? (
        <WhatIsBlepharoplasty id="overview" />
      ) : (
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
      ))}

      {children}

      {afterEditorial ?? (<>
      {serviceKey === "aesthetic" ? (
        <AestheticConditionsSection id="when" />
      ) : serviceKey === "eyelid" ? (
        <BlepharoplastyReasonsSection id="when" />
      ) : (
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
      )}

      {redesignedService ? (
      <AssessmentJourneySection
        id="journey"
        lead={c.journeyLead}
        journey={c.journey}
      />
      ) : (
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
      )}
      </>)}

      {video ?? (serviceKey === "aesthetic" || serviceKey === "eyelid" ? (
        <AestheticVideosSection
          id="watch"
          videos={vids}
        />
      ) : (
        <VideoSection
          id="watch"
          videos={vids}
          kicker="Watch"
          heading={vids.length > 1 ? "Videos on this topic" : "A video on this topic"}
          lead="Dr. Poonam Jain's centre shares short videos on its YouTube channel and in its own footage."
          note="Videos are general information, not a substitute for an examination. They complement the written information on this page."
        />
      ))}

      {faq ?? (serviceKey === "aesthetic" ? <ServicesFaqSection items={c.faqs} aesthetic /> : serviceKey === "eyelid" ? (
        <ServicesFaqSection
          items={c.faqs}
          aesthetic
          heading="Questions patients often ask"
          lead="This page is general information, not medical advice. Your own eyes need to be examined before anyone can advise you."
        />
      ) : (
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
      ))}

      {!redesignedService || serviceKey === "cataract" ? (
      <section id="related" className={`section section--tight${compactRelated ? " related--compact" : ""}`} aria-labelledby="related-h">
        <div className="container">
          <h2 id="related-h" className="h2 h2--sm">{compactRelated ? "Related Services" : "Related care"}</h2>
          <ul className="related-list">
            {c.related.map((k) => {
              const r = serviceByKey(k);
              return (
                <li key={k}>
                  <Link href={r.href} className="related-link">
                    <span className="related-title">{r.title}</span>
                    <span className="related-blurb">{compactRelated ? compactRelatedBlurb[k] ?? r.blurb : r.blurb}</span>
                    {compactRelated ? (
                      <span className="btn btn--primary related-action">
                        View Detailed Service <ArrowRightIcon width={18} height={18} />
                      </span>
                    ) : (
                      <ArrowRightIcon width={18} height={18} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      ) : serviceKey === "aesthetic" ? (
        <ExpertEyeCareSection id="related" showBanner={false} />
      ) : serviceKey === "eyelid" ? (
        <ExpertEyeCareSection
          id="related"
          badge="Related Care"
          heading={
            <>
              Related <span className={expertStyles.headingOrange}>Eye Care Services</span>
            </>
          }
          subtitle="Comprehensive assessments and specialized oculoplastic procedures tailored to support your eye health."
          showBanner={false}
          items={c.related.map((k) => {
            const r = serviceByKey(k);
            const cardMeta = SERVICE_CARD_IMAGES[k] ?? {
              image: "/images/services/aesthetic-oculoplasty-care.webp",
              alt: r.title,
            };
            return { title: r.title, desc: r.blurb, href: r.href, image: cardMeta.image, alt: cardMeta.alt };
          })}
        />
      ) : (
        <ExpertEyeCareSection
          id="related"
          badge="Related Care"
          heading={
            <>
              Related <span className={expertStyles.headingOrange}>Eye Care Services</span>
            </>
          }
          subtitle="Comprehensive treatments and specialist assessments tailored to support your eye health."
          showBanner={false}
          items={c.related.map((k) => {
            const r = serviceByKey(k);
            const cardMeta = SERVICE_CARD_IMAGES[k] ?? {
              image: "/images/services/aesthetic-oculoplasty-care.webp",
              alt: r.title,
            };
            return { title: r.title, desc: r.blurb, href: r.href, image: cardMeta.image, alt: cardMeta.alt };
          })}
        />
      )}

      {closing ?? (redesignedService ? (
        <HomeCta online={online} id={`${serviceKey}-cta`} />
      ) : (
        <CtaBand
          id={`${serviceKey}-cta-h`}
          heading="Speak to the centre about your eyes."
          lead="Contact the centre to plan your visit or arrange an eye consultation."
          online={online}
        />
      ))}
    </main>
  );
}
