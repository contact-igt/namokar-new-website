import type { Metadata } from "next";
import { pageMeta, withBrand } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { Plate } from "@/components/clinical/Plates";
import { treatmentItems, type TreatmentItem } from "@/lib/treatments";
import BookButton from "@/components/BookButton";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import HelpPanel from "@/components/HelpPanel";
import { ArrowRightIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import { PAGES } from "@/config/routes";
import { LINKS, SERVICE_GROUPS, SERVICES, SITE } from "@/config/site";
import { WHY } from "@/content/why";
import { onlineBookingAvailable } from "@/lib/booking";
import JsonLd from "@/components/JsonLd";
import { faqPage, itemList, webPage } from "@/lib/schema";

export const metadata: Metadata = pageMeta("services", {
  title: withBrand("Our Services"),
  description:
    "Cataract, glaucoma, eye examinations, eyelid surgery, aesthetic and reconstructive oculoplasty at Namokar Eye & Oculoplasty Centre, Ashok Vihar, New Delhi.",
});

const FAQS = [
  {
    q: "Which service do I need?",
    a: "If you are not sure, a comprehensive eye examination is a sensible place to start. The doctor can then explain what is found and whether any other care would help.",
  },
  {
    q: "Is every treatment available at the centre?",
    a: "The centre confirms at the consultation which treatments it offers. This website describes general areas of care and does not promise any particular treatment.",
  },
  {
    q: "How do I arrange an appointment?",
    a: `Please call the centre on ${SITE.phone.display}, or see the Contact page for directions and other ways to reach us.`,
  },
  {
    q: "Where is the centre?",
    a: `${SITE.address.lines.join(", ")}, in ${SITE.area}.`,
  },
];

/** The picture for a treatment: a photograph of the centre, else a line-drawing plate, else none. */
function Visual({ t, sizes, className }: { t: TreatmentItem; sizes: string; className: string }) {
  if (t.image) {
    return (
      <Image src={t.image.src} alt="" fill sizes={sizes} className={className} style={{ objectPosition: t.image.position }} />
    );
  }
  return t.plate ? <Plate name={t.plate} crop="thumbnail" /> : null;
}

export default function ServicesPage() {
  const pics = new Map(treatmentItems().map((t) => [t.id, t]));
  const has = (k: TreatmentItem["id"]) => Boolean(pics.get(k)?.image || pics.get(k)?.plate);
  const online = onlineBookingAvailable();
  const vision = SERVICES.filter((s) => s.group === "vision");
  const oculo = SERVICES.filter((s) => s.group === "oculoplasty");

  return (
    <main id="main">
      <JsonLd page="services"
        data={[
          webPage({ type: "CollectionPage", path: PAGES.services.path, name: "Our Services", description: metadata.description as string }),
          itemList("Services at Namokar Eye & Oculoplasty Centre", SERVICES.map((s) => ({ name: s.title, path: s.href }))),
          faqPage(PAGES.services.path, FAQS),
        ]}
      />
      <PageHero
        crumb="Our Services"
        title="Care for your eyes, and the area around them."
        lead="Comprehensive eye care first, with specialist oculoplasty for the eyelids, tear passages and the area around the eyes."
        actions={<BookButton online={online} />}
        aside={<HelpPanel />}
      />

      <nav className="svcnav" aria-label="On this page">
        <div className="container svcnav-inner">
          <p className="svcnav-label">Jump to</p>
          <ul className="svcnav-list svcnav-list--two">
            <li><a href="#vision" className="chip">{SERVICE_GROUPS.vision.title}</a></li>
            <li><a href="#oculoplasty" className="chip">{SERVICE_GROUPS.oculoplasty.title}</a></li>
          </ul>
        </div>
      </nav>

      <section id="vision" className="section" aria-labelledby="vision-h">
        <div className="container">
          <div className="section-head section-head--wide reveal">
            <p className="kicker">01</p>
            <h2 id="vision-h" className="h2">{SERVICE_GROUPS.vision.title}</h2>
            <p className="lead">{SERVICE_GROUPS.vision.blurb}</p>
          </div>
          <ul className="tile-grid">
            {vision.map((s) => (
              <li key={s.key} className="reveal">
                <Link href={s.href} className={`tile${has(s.key) ? " tile--photo" : ""}`}>
                  {has(s.key) && (
                    <span className="tile-photo">
                      <Visual
                        t={pics.get(s.key)!}
                        sizes="(min-width: 960px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="tile-photo-img"
                      />
                    </span>
                  )}
                  <span className="tile-body">
                    <span className="tile-title">{s.title}</span>
                    <span className="tile-blurb">{s.blurb}</span>
                    <span className="svc-more">
                      Learn more <ArrowRightIcon width={18} height={18} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="oculoplasty" className="section section--porcelain" aria-labelledby="oculo-h">
        <div className="container services-grid">
          <div className="section-head reveal">
            <p className="kicker">02</p>
            <h2 id="oculo-h" className="h2">{SERVICE_GROUPS.oculoplasty.title}</h2>
            <p className="lead">{SERVICE_GROUPS.oculoplasty.blurb}</p>
          </div>
          <ul className="svc-list">
            {oculo.map((s) => (
              <li key={s.key} className="reveal">
                <Link href={s.href} className={`svc-row${has(s.key) ? " svc-row--thumb" : ""}`}>
                  {has(s.key) && (
                    <span className="svc-thumb">
                      <Visual t={pics.get(s.key)!} sizes="112px" className="svc-thumb-img" />
                    </span>
                  )}
                  <span className="svc-row-text">
                    <span className="svc-title">{s.title}</span>
                    <span className="svc-blurb">{s.blurb}</span>
                  </span>
                  <ArrowRightIcon className="svc-row-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="why" className="section" aria-labelledby="why-h">
        <div className="container why-grid">
          <div className="section-head reveal">
            <p className="kicker">Why Namokar</p>
            <h2 id="why-h" className="h2">How care is given</h2>
            <p className="lead">
              More about the <Link href={LINKS.doctor} className="text-link">doctor who leads the centre</Link>.
            </p>
          </div>
          <ol className="why-list">
            {WHY.map((w, i) => (
              <li key={w.title} className="why-row">
                <span className="why-no" aria-hidden="true">0{i + 1}</span>
                <div>
                  <h3 className="h3">{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="faq" className="section section--porcelain" aria-labelledby="faq-h">
        <div className="container faq-grid">
          <div className="section-head reveal">
            <p className="kicker">Finding your way</p>
            <h2 id="faq-h" className="h2">Choosing a service</h2>
          </div>
          <FaqList items={FAQS} />
        </div>
      </section>

      <CtaBand
        id="services-cta-h"
        heading="Not sure where to start?"
        lead="Contact the centre to plan your visit or arrange an eye consultation."
        online={online}
      />
    </main>
  );
}
