import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";

export const metadata = serviceMetadata("glaucoma");

const CHECKS = [
  {
    term: "Eye pressure",
    text: "The pressure inside the eye is measured, because raised pressure is a common factor in glaucoma.",
  },
  {
    term: "The optic nerve",
    text: "The nerve at the back of the eye is examined for the changes that glaucoma causes.",
  },
  {
    term: "Side vision",
    text: "A test of the field of vision shows whether any part of it has been lost, often without the person noticing.",
  },
];

export default function Page() {
  return (
    <ServiceLayout serviceKey="glaucoma">
      <section id="silent" className="section section--graphite" aria-labelledby="silent-h">
        <div className="container statement">
          <p className="kicker">Why check-ups matter</p>
          <h2 id="silent-h" className="statement-text">
            Often no early symptoms. That is why an examination matters.
          </h2>
          <p className="lead">
            Vision lost to glaucoma does not come back, and early on most people notice
            nothing. Regular examination is how it is found, and how any change is
            caught.
          </p>
        </div>
      </section>

      <section id="monitoring" className="section" aria-labelledby="monitoring-h">
        <div className="container about-grid">
          <div className="section-head reveal">
            <p className="kicker">Monitoring</p>
            <h2 id="monitoring-h" className="h2">What monitoring may include</h2>
            <p className="lead">
              Which tests are needed, and how often, is for your doctor to decide.
            </p>
          </div>
          <dl className="terms reveal">
            {CHECKS.map((c) => (
              <div key={c.term}>
                <dt>{c.term}</dt>
                <dd>{c.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClinicalFigure
        id="glaucomaFlow"
        heading="How fluid drains, and how pressure can rise"
        intro="Switch between normal drainage and slowed drainage to see one common way glaucoma develops."
      />

      <ClinicalFigure
        id="sideVision"
        heading="How glaucoma can narrow side vision"
        intro="The change is usually gradual, which is why regular examinations matter."
      />
    </ServiceLayout>
  );
}
