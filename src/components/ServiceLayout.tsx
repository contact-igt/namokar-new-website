import HeadingText from "@/components/HeadingText";
import headingStyles from "./ServiceLayout.module.css";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PAGES, type PageKey } from "@/config/routes";
import { pageMeta, withBrand } from "@/lib/seo";
import { LINKS, SERVICE_GROUPS, TEL_HREF, type ServiceKey, serviceByKey } from "@/config/site";
import { SERVICE_CONTENT } from "@/content/services";
import { onlineBookingAvailable } from "@/lib/booking";
import { videosFor } from "@/content/videos";
import VideoSection from "./VideoSection";
import ReconstructiveVideosSection from "./ReconstructiveVideosSection";
import { ASSETS, srcOf, usable } from "@/config/assets";
import { figureUsable } from "@/config/figures";
import { Plate } from "./clinical/Plates";
import { COVERS } from "@/content/covers";
import AssetImage from "./AssetImage";
import BookButton from "./BookButton";
import EditorialImage from "./EditorialImage";
import HomeCta from "./HomeCta";
import CtaBand from "./CtaBand";
import ServicesFaqSection from "./ServicesFaqSection";
import JsonLd from "./JsonLd";
import { SERVICE_ABOUT, faqPage, webPage } from "@/lib/schema";
import HelpPanel from "./HelpPanel";
import { ArrowRightIcon } from "./Icons";
import PageHero from "./PageHero";
import ServicePageHero from "./ServicePageHero";
import AestheticPageHero from "./AestheticPageHero";
import BlepharoplastyPageHero from "./BlepharoplastyPageHero";
import ReconstructivePageHero from "./ReconstructivePageHero";
import GlaucomaPageHero from "./GlaucomaPageHero";
import WhatIsBlepharoplasty from "./WhatIsBlepharoplasty";
import WhatIsAestheticOculoplasty from "./WhatIsAestheticOculoplasty";
import WhatIsReconstructiveOculoplasty from "./WhatIsReconstructiveOculoplasty";
import AestheticConditionsSection from "./AestheticConditionsSection";
import BlepharoplastyReasonsSection from "./BlepharoplastyReasonsSection";
import AssessmentJourneySection from "./AssessmentJourneySection";
import ReconstructiveAssessmentSection from "./ReconstructiveAssessmentSection";
import AestheticVideosSection from "./AestheticVideosSection";
import ExpertEyeCareSection, { SERVICE_CARD_IMAGES } from "./ExpertEyeCareSection";
import expertStyles from "./ExpertEyeCareSection.module.css";
import { FaqIcon, type FaqIconName } from "./HomeFaqSection";

const reconstructiveRelatedBlurb: Partial<Record<ServiceKey, string>> = {
  eyelid: "Functional and aesthetic eyelid surgery addressing excess eyelid skin, hooded upper eyelids and selected under-eye bag concerns.",
  aesthetic: "Personalised assessment and treatment of aesthetic concerns involving the eyelids and surrounding eye structures.",
  exams: "Detailed assessment of vision, ocular surface health and overall eye health to support appropriate treatment decisions.",
};

const compactRelatedBlurb: Partial<Record<ServiceKey, string>> = {
  exams: "A thorough check of your vision and overall eye health.",
  cataract: "Assessment of a clouded lens and discussion of treatment options.",
  glaucoma: "Assessment and regular follow-up for long-term glaucoma care.",
  reconstructive: "Care for eyelid and tear-drainage problems affecting comfort or function.",
};

const cataractRelatedBlurb: Partial<Record<ServiceKey, string>> = {
  exams: "Detailed assessment of vision and overall eye health to identify conditions affecting visual clarity.",
  glaucoma: "Diagnostic assessment, treatment and ongoing monitoring to help preserve vision and protect optic nerve health.",
  retina: "Assessment and management of retinal conditions that may affect vision and cataract surgery outcomes.",
};

const glaucomaRelatedBlurb: Partial<Record<ServiceKey, string>> = {
  exams: "Detailed assessment of vision, eye pressure, optic nerve health and overall eye health.",
  cataract: "Assessment and surgical management of cataracts, with treatment planning that considers existing glaucoma and other eye conditions.",
  retina: "Assessment and management of retinal conditions that may affect visual function and overall eye health.",
};

const examsRelatedBlurb: Partial<Record<ServiceKey, string>> = {
  glaucoma: "Detailed assessment, testing and monitoring to help protect optic nerve health and preserve vision.",
  retina: "Evaluation and management of retinal conditions, including changes related to diabetes and other retinal diseases.",
};

const eyelidRelatedBlurb: Partial<Record<ServiceKey, string>> = {
  aesthetic: "Specialised assessment and personalised treatment for aesthetic concerns involving the eyelids and surrounding eye structures.",
  reconstructive: "Assessment and treatment of ptosis, eyelid-position abnormalities, tear-drainage disorders and reconstructive concerns.",
  exams: "Detailed assessment of vision, ocular surface health and overall eye health to support appropriate clinical decisions.",
};

const relatedIconByService: Record<ServiceKey, FaqIconName> = {
  retina: "eye",
  lasik: "eye",
  cataract: "eye",
  glaucoma: "shield",
  exams: "clipboard",
  eyelid: "lid",
  aesthetic: "eye",
  reconstructive: "lid",
};

/** Page metadata shared by every service route. Pages awaiting review are not indexed. */
export function serviceMetadata(key: Exclude<ServiceKey, "retina" | "lasik">): Metadata {
  const c = SERVICE_CONTENT[key];
  return pageMeta(key as PageKey, { title: key === "reconstructive" ? `${c.metaTitle} | Namokar` : withBrand(c.metaTitle), description: c.metaDescription });
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
  serviceKey: Exclude<ServiceKey, "retina" | "lasik">;
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
  const accentHeadings = serviceKey === "aesthetic" || serviceKey === "eyelid" || serviceKey === "reconstructive";
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
    <main id="main" className={[className, accentHeadings ? headingStyles.oculoplasty : undefined].filter(Boolean).join(" ")}>
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
        <ServicePageHero
          body={c.lead}
          secondaryHref={online ? `${LINKS.contact}#request` : TEL_HREF}
          secondaryLabel={online ? "Request a Consultation" : "Book a Consultation"}
        />
      ) : serviceKey === "aesthetic" ? (
        <AestheticPageHero lead={c.lead} />
      ) : serviceKey === "eyelid" ? (
        <BlepharoplastyPageHero />
      ) : serviceKey === "reconstructive" ? (
        <ReconstructivePageHero lead={c.lead} />
      ) : serviceKey === "glaucoma" ? (
        <GlaucomaPageHero />
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
        <WhatIsAestheticOculoplasty id="overview" paragraphs={c.intro} />
      ) : serviceKey === "eyelid" ? (
        <WhatIsBlepharoplasty id="overview" paragraphs={c.intro} />
      ) : serviceKey === "reconstructive" ? (
        <WhatIsReconstructiveOculoplasty id="overview" intro={c.intro} />
      ) : (
        <section id="overview" className="section section--tight" aria-labelledby="overview-h">
          <div className="container about-grid">
            <div className="section-head reveal">
              <p className="kicker">{group.title}</p>
              <h2 id="overview-h" className="h2"><HeadingText>{c.introHeading}</HeadingText></h2>
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
        <AestheticConditionsSection id="when" heading={<>Conditions and <span className="title-secondary">concerns addressed</span></>} />
      ) : serviceKey === "eyelid" ? (
        <BlepharoplastyReasonsSection id="when" />
      ) : serviceKey !== "reconstructive" ? (
        <section id="when" className="section section--porcelain" aria-labelledby="when-h">
          <div className="container about-grid">
            <div className="section-head reveal">
              <p className="kicker">Know the signs</p>
              <h2 id="when-h" className="h2"><HeadingText>{c.seekHelp.heading}</HeadingText></h2>
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
      ) : null}

      {serviceKey === "reconstructive" ? (
        <ReconstructiveAssessmentSection id="journey" lead={c.journeyLead} />
      ) : redesignedService ? (
        <AssessmentJourneySection
          id="journey"
          heading={accentHeadings ? <>What an <span className="title-secondary">assessment involves</span></> : undefined}
          lead={c.journeyLead}
          journey={c.journey}
        />
      ) : (
          <section id="journey" className="section" aria-labelledby="journey-h">
            <div className="container why-grid">
              <div className="section-head reveal">
                <p className="kicker">What to expect</p>
                <h2 id="journey-h" className="h2">What an <span className="title-secondary">assessment involves</span></h2>
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

      {video ?? (serviceKey === "reconstructive" ? (
        <ReconstructiveVideosSection videos={vids} />
      ) : serviceKey === "aesthetic" || serviceKey === "eyelid" ? (
        <AestheticVideosSection
          id="watch"
          heading={serviceKey === "eyelid" ? <>Understanding Eyelid Surgery <span className="title-secondary">with Dr. Poonam Jain</span></> : <>Videos on <span className="title-secondary">this topic</span></>}
          kicker={serviceKey === "eyelid" ? "Insights from Your Doctor" : undefined}
          lead={serviceKey === "eyelid" ? "Explore functional and aesthetic eyelid concerns, blepharoplasty and the role of an oculoplastic assessment before considering surgery." : undefined}
          note={serviceKey === "eyelid" ? "" : undefined}
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

      {faq ?? (
        <ServicesFaqSection
          items={c.faqs}
          heading={accentHeadings || serviceKey === "cataract" ? <>Questions <span className="title-secondary">patients often ask</span></> : "Questions patients often ask"}
          lead="This page is general information, not medical advice. Your own eyes need to be examined before anyone can advise you."
          serviceStyle
          topic={serviceKey}
          online={online}
          image="/images/452e8467-0cbd-4c38-a11d-1ca6ff9f6035.png"
          allClosed
        />
      )}

      {compactRelated ? (
        <ExpertEyeCareSection
          id="related"
          badge="Related Care"
          heading={serviceKey === "cataract" || serviceKey === "exams" ? <>Related <span className="title-secondary">Services</span></> : "Related Services"}
          subtitle="Explore eye care services related to this page."
          showBanner={false}
          serviceRelated
          responsiveCarousel
          items={[...c.related.map((k) => {
            const r = serviceByKey(k);
            const cardMeta = k === "retina" && usable(ASSETS.examRetinaAi)
              ? { image: srcOf(ASSETS.examRetinaAi), alt: ASSETS.examRetinaAi.alt }
              : SERVICE_CARD_IMAGES[k] ?? SERVICE_CARD_IMAGES.exams;
            const blurbs = serviceKey === "glaucoma" ? glaucomaRelatedBlurb
              : serviceKey === "cataract" ? cataractRelatedBlurb : examsRelatedBlurb;
            const blurb = blurbs[k];
            return { title: r.title, desc: blurb ?? r.blurb, href: r.href, image: cardMeta.image, alt: cardMeta.alt, icon: <FaqIcon name={relatedIconByService[k]} /> };
          }), ...(serviceKey === "exams" ? [{
            title: PAGES.squint.label,
            href: PAGES.squint.path,
            desc: "Assessment of eye alignment, eye movements and binocular visual function, with personalised treatment recommendations.",
            image: "/images/squint/squint-hero.webp",
            alt: "Illustration of a child receiving an eye alignment assessment",
            icon: <FaqIcon name="eye" />,
          }] : [])]}
        />
      ) : !redesignedService && serviceKey !== "reconstructive" ? (
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
        <ExpertEyeCareSection
          id="related"
          badge="Related Care"
          heading={<>Related <span className="title-secondary">Eye Care &amp; Oculoplasty Services</span></>}
          subtitle="Explore complementary services that support eye health, eyelid function and individual aesthetic concerns."
          showBanner={false}
          responsiveCarousel
          items={c.related.map((key) => {
            const service = serviceByKey(key);
            return {
              title: service.title,
              href: service.href,
              desc: key === "eyelid"
                ? "Functional and aesthetic eyelid surgery for excess eyelid skin, hooding and selected under-eye bag concerns."
                : eyelidRelatedBlurb[key] ?? service.blurb,
              ...SERVICE_CARD_IMAGES[key],
            };
          })}
        />
      ) : serviceKey === "eyelid" || serviceKey === "reconstructive" ? (
        <ExpertEyeCareSection
          id="related"
          badge="Related Care"
          heading={
            <>
              Related <span className={`${expertStyles.headingOrange} title-secondary`}>Eye Care &amp; Oculoplasty Services</span>
            </>
          }
          subtitle={serviceKey === "eyelid" ? "Explore complementary eye care and oculoplasty services for eyelid function, eye health and individual aesthetic concerns." : "Explore complementary ophthalmic and oculoplastic services that support eye health, eyelid function and individual treatment needs."}
          showBanner={false}
          responsiveCarousel
          items={c.related.map((k) => {
            const r = serviceByKey(k);
            const cardMeta = SERVICE_CARD_IMAGES[k] ?? {
              image: "/images/services/aesthetic-oculoplasty-care.webp",
              alt: r.title,
            };
            return { title: r.title, desc: (serviceKey === "eyelid" ? eyelidRelatedBlurb[k] : reconstructiveRelatedBlurb[k]) ?? r.blurb, href: r.href, image: cardMeta.image, alt: cardMeta.alt };
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
          responsiveCarousel
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
        <HomeCta
          online={online}
          id={`${serviceKey}-cta`}
          {...(serviceKey === "cataract" ? {
            heading: "Book Your Cataract Consultation",
            desc: "Experiencing cloudy vision, glare or difficulty seeing clearly? Consult Dr. Poonam Jain for a detailed cataract assessment, personalised treatment recommendations and guidance on suitable intraocular lens options.",
            onlineBookingLabel: "Request a Consultation",
          } : {
            heading: <>Book Your <span className="title-secondary">Consultation Today</span></>,
          })}
        />
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
