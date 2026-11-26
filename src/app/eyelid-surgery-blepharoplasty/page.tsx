import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import Image from "next/image";
import { CalendarDays, HeartPulse, ShieldPlus, TriangleAlert } from "lucide-react";
import ServiceLayout from "@/components/ServiceLayout";
import FunctionalOrCosmeticSection from "@/components/FunctionalOrCosmeticSection";
import AssessmentJourneySection from "@/components/AssessmentJourneySection";
import BlepharoplastyReasonsSection from "@/components/BlepharoplastyReasonsSection";
import HomeCta from "@/components/HomeCta";
import { LINKS, TEL_HREF } from "@/config/site";
import { SERVICE_CONTENT } from "@/content/services";
import { onlineBookingAvailable } from "@/lib/booking";
import { pageMeta } from "@/lib/seo";
import styles from "./blepharoplasty-backgrounds.module.css";

const content = SERVICE_CONTENT.eyelid;
const careImageSizes = "(max-width: 620px) 92vw, (max-width: 940px) 45vw, 30vw";

export const metadata = pageMeta("eyelid", {
  title: `${content.metaTitle} | Namokar`,
  description: content.metaDescription,
});

export default function Page() {
  const online = onlineBookingAvailable();
  return (
    <ServiceLayout
      serviceKey="eyelid"
      className={styles.page}
      afterEditorial={
        <>
          <BlepharoplastyReasonsSection id="when" />
          <AssessmentJourneySection
            id="journey"
            kicker="Your Eyelid Care Journey"
            heading={<>What an Eyelid Surgery <span className="title-secondary">Assessment Involves</span></>}
            lead={content.journeyLead}
            journey={content.journey}
          />
          <section className={styles.surgeryCare} aria-labelledby="eyelid-care-heading">
            <div className="container">
              <header className={styles.careHeader}>
                <div className={`kicker ${styles.careEyebrow}`}>Eyelid Surgery</div>
                <h2 id="eyelid-care-heading" className={styles.careHeading}>Before and After <span className="title-secondary">Eyelid Surgery</span></h2>
                <p>How to prepare, what to discuss with your ophthalmologist, and what to expect during recovery.</p>
              </header>
              <div className={styles.careGrid}>
                <article className={styles.careCard}>
                  <div className={styles.carePhoto}>
                    <Image src="/images/blepharoplasty/blepharoplasty-procedure-evaluation.webp" alt="" fill sizes={careImageSizes} />
                  </div>
                  <div className={styles.careBody}>
                    <span className={styles.careIcon}><CalendarDays aria-hidden="true" /></span>
                    <h3>Preparing for Eyelid Surgery</h3>
                    <p>Tell your surgeon about dry eyes, thyroid disease, diabetes, previous eye surgery and bleeding conditions.</p>
                    <ul>
                      <li>Bring a list of medicines and supplements, including blood thinners.</li>
                    </ul>
                    <p className={styles.careNote}>Do not stop prescribed medicines unless your treating doctors advise it.</p>
                  </div>
                </article>
                <article className={styles.careCard}>
                  <div className={styles.carePhoto}>
                    <Image src="/images/blepharoplasty/blepharoplasty-indian-macro-v2.webp" alt="" fill sizes={careImageSizes} />
                  </div>
                  <div className={styles.careBody}>
                    <span className={styles.careIcon}><ShieldPlus aria-hidden="true" /></span>
                    <h3>Risks &amp; Limitations</h3>
                    <p>Your ophthalmologist will explain expected benefits, risks and alternatives before you decide.</p>
                    <ul>
                      <li>Possible complications include infection, bleeding, scarring, asymmetry and persistent dryness.</li>
                      <li>Other risks include incomplete eyelid closure, abnormal lower lid position and the need for further surgery.</li>
                      <li>Rare bleeding behind the eye can threaten vision.</li>
                    </ul>
                  </div>
                </article>
                <article className={styles.careCard}>
                  <div className={styles.carePhoto}>
                    <Image src="/images/blepharoplasty/bleph-duo-cosmetic-v3.webp" alt="" fill sizes={careImageSizes} />
                  </div>
                  <div className={styles.careBody}>
                    <span className={styles.careIcon}><HeartPulse aria-hidden="true" /></span>
                    <h3>Recovery &amp; Aftercare</h3>
                    <p>Temporary bruising, swelling, tightness, dryness, irritation, blurred vision and mild discomfort can occur. Swelling and bruising often improve over one to two weeks. Residual swelling, scar maturation and healing can take longer.</p>
                    <ul>
                      <li>Use medicines, drops and ointments as prescribed and follow wound-care instructions.</li>
                      <li>Avoid rubbing or pressing the operated area.</li>
                      <li>Follow advice on exercise, swimming, makeup, contact lenses, driving and returning to work.</li>
                      <li>Attend follow-up visits to check healing, eyelid position and closure, and ocular surface health.</li>
                    </ul>
                  </div>
                </article>
              </div>
              <aside className={styles.careWarning} aria-labelledby="eyelid-emergency-heading">
                <span className={styles.warningIcon}><TriangleAlert aria-hidden="true" /></span>
                <div>
                  <h3 id="eyelid-emergency-heading">When to Seek Emergency Care After Eyelid Surgery</h3>
                  <p>Seek immediate care for sudden reduced vision or vision loss, severe or rapidly increasing pain, rapidly increasing swelling or tightness, a bulging eye, significant or persistent bleeding, or new double vision.</p>
                  <p>Contact your treating surgeon immediately. If the team is unavailable, seek emergency ophthalmic care. Do not wait for your scheduled follow-up. Increasing redness, discharge, fever or difficulty closing the eye also requires prompt clinical assessment.</p>
                </div>
              </aside>
            </div>
          </section>
        </>
      }
      closing={<HomeCta
        online={online}
        id="eyelid-cta"
        kicker="Specialised Eyelid Care"
        heading="Book Your Eyelid Surgery Consultation"
        desc="Experiencing heavy eyelids, excess eyelid skin or under-eye bags? Consult Dr. Poonam Jain for a detailed oculoplastic assessment and personalised guidance on functional and aesthetic eyelid surgery."
        note="See Better. Look Better."
        onlineBookingLabel="Request a Consultation"
      />}
    >
      <FunctionalOrCosmeticSection id="reasons" buttonHref={online ? `${LINKS.contact}#request` : TEL_HREF} />

      {/* Clinical Figure with matching Reconstructive-style comparison table */}
      <ClinicalFigure
        id="eyelidPosition"
        eyebrow="Understanding Eyelid Anatomy"
        heading={<>Understanding Different <span className="title-secondary">Upper Eyelid Conditions</span></>}
        intro="Excess eyelid skin, a low eyelid margin and a low eyebrow can look similar. Identifying the cause helps guide treatment. A low eyebrow (brow ptosis) can create upper eyelid hooding that blepharoplasty alone may not address."
        note="Ptosis, excess skin and brow ptosis can occur together. The comparison is educational. An examination is needed to determine which treatment may be suitable."
      />
    </ServiceLayout>
  );
}
