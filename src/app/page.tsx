import type { Metadata } from "next";
import Link from "next/link";
import AssetImage from "@/components/AssetImage";
import BookButton, { SecondaryContact } from "@/components/BookButton";
import FacilityGallery from "@/components/FacilityGallery";
import Hero from "@/components/Hero";
import HomeAppointmentPopup from "@/components/HomeAppointmentPopup";
import TreatmentExplorer from "@/components/TreatmentExplorer";
import { treatmentItems } from "@/lib/treatments";
import JsonLd from "@/components/JsonLd";
import Parallax from "@/components/motion/Parallax";
import { ArrowRightIcon, PhoneIcon, PinIcon, PlusIcon } from "@/components/Icons";
import NamePlate from "@/components/NamePlate";
import VisitPanel from "@/components/VisitPanel";
import WalkthroughSection from "@/components/WalkthroughSection";
import VideoShelf from "@/components/VideoShelf";
import { ASSETS, type Asset, usable } from "@/config/assets";
import { PAGES } from "@/config/routes";
import { HOME_DESCRIPTION, HOME_TITLE, LINKS, MAPS_LINK, SITE, TEL_HREF } from "@/config/site";
import { videosFor } from "@/content/videos";
import { HOME_WHY } from "@/content/why";
import { onlineBookingAvailable } from "@/lib/booking";
import { playerProps } from "@/lib/videoProps";
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
    q: "What is the difference between an ophthalmologist and an oculoplasty surgeon?",
    a: "An ophthalmologist diagnoses and treats eye conditions. Oculoplasty is a specialised area within ophthalmology focused on the eyelids, tear passages, eye socket and surrounding structures. Dr. Poonam Jain practises comprehensive ophthalmology with a particular focus on oculoplasty.",
  },
  {
    q: "Does every drooping eyelid require surgery?",
    a: "No. A drooping eyelid can have different causes. Treatment depends on the cause, severity, effect on vision and individual circumstances. An examination is required before deciding whether treatment is appropriate.",
  },
  {
    q: "Are under-eye bags always treated with surgery?",
    a: "No. Under-eye concerns vary from person to person. The doctor first evaluates the eyelids, skin, underlying tissues and your concerns before discussing suitable options.",
  },
  {
    q: "Can I come for a general eye check-up even if I don't need surgery?",
    a: "Yes. Namokar provides comprehensive eye examinations as well as condition-specific and surgical eye care.",
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
  // 1. The centre: street view, then reception
  [
    { asset: ASSETS.exterior, caption: "Our Ashok Vihar centre, seen from the street.", position: "50% 45%" },
    { asset: ASSETS.reception, caption: "The reception at our Ashok Vihar centre.", position: "42% 50%" },
  ],
  // 2. Cataract: the operating microscope and surgical console
  [
    { asset: ASSETS.otScope, caption: "An operating microscope in the theatre area at the centre.", position: "50% 50%" },
    { asset: ASSETS.consoleWide, caption: "A surgical console in the theatre area at the centre.", position: "50% 50%" },
  ],
  // 3. Examinations and glaucoma: the eye chart and a diagnostic instrument
  [
    { asset: ASSETS.chartDoor, caption: "An eye-chart screen beside an examination room door.", position: "50% 42%" },
    { asset: ASSETS.archGlaucomaTest, caption: "A pre-examination eye test at the centre.", position: "50% 55%" },
  ],
  // 4. Specialist oculoplasty: the theatre
  [
    { asset: ASSETS.otModernC, caption: "An operation theatre at the centre.", position: "50% 55%" },
    { asset: ASSETS.otModernB, caption: "The operating table and microscope in the theatre.", position: "50% 55%" },
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

export default function Home() {
  const online = onlineBookingAvailable();

  const hasPortrait = usable(ASSETS.portrait);
  const gallery = compact([
    photoItem(ASSETS.signboardOlder, { title: "Our eye centre in Ashok Vihar", caption: "Namokar Eye & Oculoplasty Centre on the street in Ashok Vihar, New Delhi, where patients visit for eye examinations and eye care.", position: "50% 40%" }),
    photoItem(ASSETS.otModernA, { title: "Operation theatre", caption: "The operation theatre, with its operating microscope and operating table for eye procedures.", position: "50% 50%" }),
    photoItem(ASSETS.archCataractExam, { title: "A detailed eye examination", caption: "A patient being examined at a slit-lamp, the microscope used to look closely at the front of the eye.", position: "55% 50%" }),
    photoItem(ASSETS.archTeamDoctor, { title: "Our care team", caption: "Dr. Poonam Jain with members of the team who look after patients at the centre.", position: "50% 40%" }),
  ]);

  return (
    <>
      <JsonLd page="home"
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
                <div className="centre-copy">
                <p className="lead">
                  See the actual spaces where consultations, eye examinations and
                  procedures are carried out at our Ashok Vihar centre. The gallery
                  moves automatically.
                </p>
                </div>
              </div>
              <FacilityGallery items={gallery} label="Photographs of the centre" />
            </div>
          </section>
        )}

        {/* Explore Namokar: the one clinic walkthrough video */}
        <WalkthroughSection
          video={videosFor("home").filter((v) => v.source === "local").map(playerProps)[0]}
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
              <p className="doctor-role">
                Medical Director &bull; Senior Ophthalmologist &bull; Oculoplasty Surgeon
              </p>
              <p className="lead">
                With 25+ years of experience in eye care, Dr. Poonam Jain leads Namokar
                Eye &amp; Oculoplasty Centre with a particular focus on oculoplasty, the
                care of the eyelids, tear passages and the area around the eyes.
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
                {/* Profile page is switched off for now: this opens the contact page. Use LINKS.doctor to restore. */}
                <Link href={LINKS.contact} className="btn btn--secondary">
                  Read Dr. Poonam Jain&rsquo;s Full Profile <ArrowRightIcon />
                </Link>
                <Link href={LINKS.about} className="text-link">
                  About the centre <ArrowRightIcon width={18} height={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Doctor-led video shelf: the clinic's own YouTube videos, one player at a time, click to load */}
        <VideoShelf
          videos={videosFor("home").filter((v) => v.source === "youtube").map(playerProps)}
        />

        {/* Oculoplasty */}
        <section id="oculoplasty" className="section section--graphite" aria-labelledby="oculo-h">
          <div className="container oculo-grid oculo-grid--solo">
            <div className="oculo-copy">
              <p className="kicker">Oculoplasty</p>
              <h2 id="oculo-h" className="h2">Specialist Oculoplasty for Function &amp; Appearance</h2>
              <p className="lead">
                Oculoplasty is a branch of ophthalmology focused on the eyelids, tear
                passages, eye socket and surrounding eye area. Some concerns affect
                vision or eye comfort. Others affect appearance. Many involve both.
              </p>
              <div className="oculo-cols">
                <div>
                  <h3 className="h3">Functional concerns</h3>
                  <ul className="dash-list">
                    <li><strong>Drooping eyelids (ptosis)</strong> that make the eye look tired or affect vision</li>
                    <li><strong>Persistent watering</strong> or tear-drainage problems</li>
                    <li><strong>Eyelids turning inward or outward</strong></li>
                    <li><strong>Other eyelid-position</strong> concerns</li>
                  </ul>
                  <Link href={LINKS.reconstructive} className="text-link">
                    Reconstructive oculoplasty <ArrowRightIcon width={18} height={18} />
                  </Link>
                </div>
                <div>
                  <h3 className="h3">Aesthetic concerns</h3>
                  <ul className="dash-list">
                    <li><strong>Heavy upper eyelids</strong></li>
                    <li><strong>Loose eyelid skin</strong></li>
                    <li><strong>Under-eye bags</strong></li>
                    <li><strong>Age-related changes</strong> around the eyes</li>
                  </ul>
                  <Link href={LINKS.aesthetic} className="text-link">
                    Aesthetic oculoplasty <ArrowRightIcon width={18} height={18} />
                  </Link>
                </div>
              </div>
              <p className="oculo-note">
                Dr. Poonam Jain decides whether a procedure is suitable only after
                examining your eyes and talking through what you hope to achieve.
              </p>
            </div>
          </div>
        </section>

        {/* Why Namokar */}
        <section id="why" className="section" aria-labelledby="why-h">
          <div className="container why-grid">
            <div className="section-head reveal">
              <p className="kicker">Why Namokar</p>
              <h2 id="why-h" className="h2">Why Patients Choose Namokar</h2>
              <p className="why-foot">
                Doctor-led consultations &bull; Ashok Vihar, New Delhi &bull; Comprehensive eye care
                and oculoplasty under one centre
              </p>
            </div>
            <ol className="why-list">
              {HOME_WHY.map((w, i) => (
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
              <h2 id="cta-h" className="h2">Have an Eye Concern? Start With a Consultation.</h2>
              <p className="lead">
                Whether you&rsquo;re looking for a routine eye check-up, cataract evaluation,
                glaucoma monitoring or advice about an eyelid or watering-eye concern, the
                first step is an examination.{" "}
                {online
                  ? "Send a request or call us and we will help you find a suitable time."
                  : "Call us and we will help you find a suitable time."}
              </p>
              <p className="cta-place">
                <PinIcon />
                <span>
                  {SITE.address.lines.join(", ")}. {SITE.address.landmark}.
                </span>
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
      <HomeAppointmentPopup />
    </>
  );
}
