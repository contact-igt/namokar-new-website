import type { Metadata } from "next";
import Link from "next/link";
import AssetImage from "@/components/AssetImage";
import BookButton, { SecondaryContact } from "@/components/BookButton";
import FacilityGallery from "@/components/FacilityGallery";
import Hero from "@/components/Hero";
import TreatmentExplorer from "@/components/TreatmentExplorer";
import { treatmentItems } from "@/lib/treatments";
import JsonLd from "@/components/JsonLd";
import Parallax from "@/components/motion/Parallax";
import { ArrowRightIcon, PhoneIcon, PinIcon, PlusIcon } from "@/components/Icons";
import NamePlate from "@/components/NamePlate";
import VisitPanel from "@/components/VisitPanel";
import VideoSection from "@/components/VideoSection";
import { ASSETS, type Asset, usable } from "@/config/assets";
import { PAGES } from "@/config/routes";
import { HOME_DESCRIPTION, HOME_TITLE, LINKS, MAPS_LINK, SERVICES, SITE, TEL_HREF } from "@/config/site";
import { videosFor } from "@/content/videos";
import { WHY } from "@/content/why";
import { onlineBookingAvailable } from "@/lib/booking";
import { compact, photoItem } from "@/lib/photos";
import { pageMeta } from "@/lib/seo";
import { clinic, faqPage, ids, webPage, website } from "@/lib/schema";

/**
 * Title, description and robots come from the root layout. The canonical address is set here
 * (the layout cannot set it, or every page without its own would claim "/"). Like the other
 * pages, openGraph is restated in full because a page-level openGraph replaces the layout's.
 */
export const metadata: Metadata = {
  ...pageMeta("home", { title: HOME_TITLE, description: HOME_DESCRIPTION }),
};

const faqs = (online: boolean) => [
  {
    q: "Why is a comprehensive eye check-up important?",
    a: "Some eye conditions, including glaucoma, can develop slowly without obvious symptoms. A full examination can find changes early, when they are easier to manage. Your doctor will advise how often you should be reviewed.",
  },
  {
    q: "What can a drooping eyelid (ptosis) mean?",
    a: "Ptosis means the upper eyelid sits lower than normal. It can be present from birth or develop with age, muscle weakness or other conditions, and it can sometimes affect vision. An examination is needed to find the cause and to decide whether treatment is suitable.",
  },
  {
    q: "Why do my eyes keep watering?",
    a: "Watering can come from dryness or irritation, infection, or a blocked tear-drainage passage, among other causes. Because treatment depends on the cause, it is best to have persistent watering examined.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Please bring any previous prescriptions and eye reports, your current spectacles, and a list of the medicines you take. After the examination, the doctor will explain the findings and whether any treatment is needed.",
  },
  {
    q: "How do I arrange an appointment?",
    a: online
      ? `Call the centre on ${SITE.phone.display} or send a request from the Contact page. A request is not a confirmed appointment; the centre will arrange a time with you.`
      : `Please call the centre on ${SITE.phone.display}. Tell us briefly what is troubling you and we will help you find a suitable time. Online requests are not available yet.`,
  },
];

/**
 * Banner photographs, one slide each. For every slide the first candidate that is cleared for
 * use is shown, so approving or withholding a photograph never leaves a gap or an empty frame.
 */
type HeroCandidate = { asset: Asset; caption: string; position: string };
const HERO_SHOTS: HeroCandidate[][] = [
  [
    { asset: ASSETS.reception, caption: "Reception at the centre", position: "42% 50%" },
    { asset: ASSETS.exterior, caption: "The centre from the street", position: "50% 45%" },
  ],
  [
    { asset: ASSETS.otModernA, caption: "The operation theatre at the centre.", position: "55% 50%" },
    { asset: ASSETS.otModernB, caption: "The operating table and microscope in the theatre.", position: "50% 55%" },
  ],
  [
    { asset: ASSETS.docSlit, caption: "A slit-lamp examination unit.", position: "55% 45%" },
    { asset: ASSETS.consultation, caption: "A consultation room at the centre", position: "55% 40%" },
    { asset: ASSETS.chartDoor, caption: "An examination room at the centre.", position: "50% 40%" },
  ],
  [
    { asset: ASSETS.docStanding, caption: "A consultation room at the centre.", position: "50% 40%" },
    { asset: ASSETS.otModernC, caption: "An operation theatre at the centre.", position: "50% 55%" },
  ],
];

function heroShot(candidates: HeroCandidate[], eager: boolean) {
  const c = candidates.find((x) => usable(x.asset));
  if (!c) return null;
  return {
    caption: c.caption,
    node: (
      <Parallax range={18}>
      <AssetImage
        asset={c.asset}
        fill
        eager={eager}
        sizes="(min-width: 960px) 58vw, 100vw"
        className="hero-img"
        style={{ objectPosition: c.position }}
      />
      </Parallax>
    ),
  };
}

const [feature, ...rest] = SERVICES;

export default function Home() {
  const online = onlineBookingAvailable();

  const hasPortrait = usable(ASSETS.portrait);
  const hasScope = usable(ASSETS.otModernA);
  const hasIris = usable(ASSETS.artIris);
  const gallery = compact([
    photoItem(ASSETS.otModernB, { title: "Operation theatre", caption: "The operating table, operating microscope and a surgical console.", position: "50% 55%" }),
    photoItem(ASSETS.consultation, { title: "Consultation room", caption: "A slit-lamp examination unit and a vision chart screen.", position: "60% 40%" }),
    photoItem(ASSETS.exterior, { title: "The centre from the street", caption: "Namokar Eye & Oculoplasty Centre, Ashok Vihar.", position: "50% 45%" }),
  ]);

  return (
    <>
      <JsonLd
        data={[
          website(),
          clinic(),
          webPage({ path: PAGES.home.path, name: SITE.name, description: HOME_DESCRIPTION, mainEntityId: ids.clinic }),
          faqPage(PAGES.home.path, faqs(online)),
        ]}
      />
      <main id="main">
        <Hero
          online={online}
          panel={<VisitPanel />}
          shots={HERO_SHOTS.map((c, i) => heroShot(c, i === 0))}
        />

        {/* Find care: the six treatments as real links with a picture and a short description */}
        <TreatmentExplorer items={treatmentItems()} />

        {/* Hospital introduction: only when at least one photograph is cleared */}
        {gallery.length > 0 && (
          <section id="centre" className="section" aria-labelledby="centre-h">
            <div className="container">
              <div className="centre-head reveal">
                <div>
                  <p className="kicker">The centre</p>
                  <h2 id="centre-h" className="h2">Take a Closer Look at Namokar.</h2>
                </div>
                <p className="lead">
                  Namokar Eye &amp; Oculoplasty Centre is in Ashok Vihar, New Delhi.
                  The centre has a reception, consultation and examination rooms, and an
                  operation theatre. Select a photograph to see it larger.
                </p>
              </div>
              <FacilityGallery items={gallery} label="Photographs of the centre" />
            </div>
          </section>
        )}

        {/* Explore Namokar: walkthrough footage (and further clips when cleared) */}
        <VideoSection
          id="explore"
          dark
          videos={videosFor("home")}
          kicker="Explore Namokar"
          heading="Step Inside Our Centre"
          lead="Take a look at the spaces and facilities that support your eye care."
          note="Footage of the centre, without sound. It shows rooms and equipment, not patients."
        />

        {/* Doctor */}
        <section id="doctor" className="section" aria-labelledby="doctor-h">
          <div className="container doctor-grid">
            <figure className="doctor-photo reveal">
              {hasPortrait ? (
                <AssetImage
                  asset={ASSETS.portrait}
                  sizes="(min-width: 960px) 44vw, 100vw"
                  className="doctor-img"
                />
              ) : (
                <NamePlate />
              )}
            </figure>
            <div className="doctor-copy">
              <p className="kicker">Meet your doctor</p>
              <h2 id="doctor-h" className="h2 h2--xl">Meet Dr. Poonam Jain.</h2>
              <p className="doctor-role">Medical Director &amp; Senior Ophthalmologist</p>
              <p className="lead">
                Dr. Poonam Jain leads Namokar and has a particular focus on oculoplasty,
                the care of the eyelids, tear passages and the area around the eyes.
              </p>
              <p className="doctor-text">
                Care at Namokar is doctor-led. You are examined and advised by the
                doctor, and the discussion is built around your eyes, your concerns and
                the options that suit you.
              </p>
              <dl className="cred-rows">
                <div>
                  <dt>Fellowship</dt>
                  <dd>Oculoplasty, Barraquer Institute, Barcelona</dd>
                </div>
                <div>
                  <dt>Observership</dt>
                  <dd>Wilmer Eye Institute, Johns Hopkins, Baltimore</dd>
                </div>
                <div>
                  <dt>MS, Ophthalmology</dt>
                  <dd>Safdarjung Hospital, New Delhi</dd>
                </div>
                <div>
                  <dt>MBBS</dt>
                  <dd>Maulana Azad Medical College, New Delhi</dd>
                </div>
              </dl>
              <div className="btn-row">
                <Link href={LINKS.doctor} className="btn btn--secondary">
                  Read the full profile <ArrowRightIcon />
                </Link>
                <Link href={LINKS.about} className="text-link">
                  About the centre <ArrowRightIcon width={18} height={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services: one featured, the rest as text links */}
        <section id="services" className="section section--porcelain" aria-labelledby="services-h">
          <div className="container services-grid">
            <div className="section-head reveal">
              <p className="kicker">What we treat</p>
              <h2 id="services-h" className="h2">Our specialised services</h2>
              <p className="lead">
                Six areas of care, each explained clearly and planned around the
                individual patient.
              </p>
              <Link href={LINKS.allServices} className="btn btn--secondary">
                View all services <ArrowRightIcon />
              </Link>
            </div>
            <div className="svc-col">
              <Link href={feature.href} className="svc-feature reveal">
                {hasScope && (
                  <AssetImage
                    asset={ASSETS.otModernA}
                    alt=""
                    sizes="(min-width: 960px) 40vw, 100vw"
                    className="svc-feature-img"
                    style={{ objectPosition: "50% 50%" }}
                  />
                )}
                <span className="svc-feature-body">
                  <span className="svc-title">{feature.title}</span>
                  <span className="svc-blurb">{feature.blurb}</span>
                  <span className="svc-more">
                    Learn more <ArrowRightIcon width={18} height={18} />
                  </span>
                </span>
              </Link>
              <ul className="svc-list">
                {rest.map((s) => (
                  <li key={s.key}>
                    <Link href={s.href} className="svc-row">
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
          </div>
        </section>

        {/* Oculoplasty */}
        <section id="oculoplasty" className="section section--graphite" aria-labelledby="oculo-h">
          <div className={`container oculo-grid${hasIris ? "" : " oculo-grid--solo"}`}>
            <div className="oculo-copy">
              <p className="kicker">Oculoplasty</p>
              <h2 id="oculo-h" className="h2">Eyelid care for both function and appearance</h2>
              <p className="lead">
                Oculoplasty looks after the eyelids, tear passages and the area around
                the eyes. Some concerns affect how the eye works, others how it looks,
                and many involve both.
              </p>
              <div className="oculo-cols">
                <div>
                  <h3 className="h3">Functional concerns</h3>
                  <ul className="dash-list">
                    <li><strong>Drooping eyelids (ptosis)</strong> that make the eye look tired or affect vision</li>
                    <li><strong>Watering eyes</strong>, including tear-drainage problems</li>
                    <li><strong>Eyelid position</strong> concerns, such as lids that turn in or out</li>
                  </ul>
                  <Link href={LINKS.reconstructive} className="text-link">
                    Reconstructive oculoplasty <ArrowRightIcon width={18} height={18} />
                  </Link>
                </div>
                <div>
                  <h3 className="h3">Aesthetic concerns</h3>
                  <ul className="dash-list">
                    <li><strong>Heavy upper eyelids</strong> and loose skin</li>
                    <li><strong>Eye bags</strong> and tired-looking under-eyes</li>
                    <li><strong>Age-related changes</strong> around the eyes</li>
                  </ul>
                  <Link href={LINKS.aesthetic} className="text-link">
                    Aesthetic oculoplasty <ArrowRightIcon width={18} height={18} />
                  </Link>
                </div>
              </div>
              <p className="oculo-note">
                Whether a procedure is suitable is decided only after an examination and
                a conversation about what you hope to achieve.
              </p>
            </div>
            {hasIris && (
              <figure className="oculo-art">
                <AssetImage
                  asset={ASSETS.artIris}
                  sizes="(min-width: 960px) 30vw, 100vw"
                  className="oculo-img"
                />
                <figcaption>Conceptual image</figcaption>
              </figure>
            )}
          </div>
        </section>

        {/* Why Namokar */}
        <section id="why" className="section" aria-labelledby="why-h">
          <div className="container why-grid">
            <div className="section-head reveal">
              <p className="kicker">Why Namokar</p>
              <h2 id="why-h" className="h2">Care that starts with listening</h2>
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

        {/* FAQ */}
        <section id="faq" className="section section--porcelain" aria-labelledby="faq-h">
          <div className="container faq-grid">
            <div className="section-head reveal">
              <p className="kicker">Common questions</p>
              <h2 id="faq-h" className="h2">Questions patients often ask</h2>
              <p className="lead">
                This is general information. Your own eyes need to be examined before
                anyone can advise you.
              </p>
            </div>
            <div className="faq-list">
              {faqs(online).map((f) => (
                <details key={f.q} className="faq">
                  <summary>
                    <span>{f.q}</span>
                    <PlusIcon className="faq-plus" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="contact" className="cta" aria-labelledby="cta-h">
          <div className="container cta-inner">
            <div>
              <h2 id="cta-h" className="h2">Schedule an eye consultation</h2>
              <p className="lead">
                {online
                  ? "Send a request or call us and we will help you find a suitable time."
                  : "Call us and we will help you find a suitable time."}
              </p>
              <p className="cta-place">
                <PinIcon />
                <span>{SITE.address.lines.join(", ")}</span>
              </p>
              <p className="cta-place">
                <PhoneIcon />
                <a href={TEL_HREF}>{SITE.phone.display}</a>
              </p>
            </div>
            <div className="cta-actions">
              <BookButton online={online} />
              <SecondaryContact online={online} className="btn btn--outline-light" />
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link text-link--light"
              >
                Get directions
                <ArrowRightIcon width={18} height={18} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
