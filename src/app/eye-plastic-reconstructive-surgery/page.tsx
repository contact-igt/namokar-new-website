import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";

export const metadata = serviceMetadata("reconstructive");

const TERMS = [
  { term: "Ptosis", text: "An upper eyelid that sits lower than normal." },
  { term: "Entropion", text: "An eyelid that turns inwards, so the lashes rub the eye." },
  { term: "Ectropion", text: "An eyelid that turns outwards, away from the eye." },
  { term: "Epiphora", text: "Watering of the eye, often because tears are not draining as they should." },
  { term: "Tear-duct blockage", text: "A narrowing or block in the channel that drains tears from the eye into the nose." },
  { term: "Orbit", text: "The bony socket that holds the eye." },
];

export default function Page() {
  return (
    <ServiceLayout serviceKey="reconstructive">
      <section id="terms" className="section section--porcelain" aria-labelledby="terms-h">
        <div className="container about-grid">
          <div className="section-head reveal">
            <p className="kicker">In plain words</p>
            <h2 id="terms-h" className="h2">Terms you may hear</h2>
            <p className="lead">
              Oculoplasty uses some unfamiliar words. These are the common ones. The
              doctor explains any others.
            </p>
          </div>
          <dl className="terms reveal">
            {TERMS.map((t) => (
              <div key={t.term}>
                <dt>{t.term}</dt>
                <dd>{t.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClinicalFigure
        id="tearPathway"
        heading="How tears drain, and what a blockage can mean"
        intro="Compare normal tear drainage with what can happen when the passage is blocked."
      />

      <ClinicalFigure
        id="lidMalposition"
        heading="When an eyelid turns inwards or outwards"
        intro="A comparison of a typical eyelid, an inward-turning eyelid (entropion) and an outward-turning eyelid (ectropion)."
      />
    </ServiceLayout>
  );
}
