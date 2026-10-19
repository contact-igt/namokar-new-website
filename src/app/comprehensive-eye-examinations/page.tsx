import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";

export const metadata = serviceMetadata("exams");

const PARTS = [
  { term: "How well you see", text: "Your vision is checked with and without spectacles." },
  { term: "Spectacle needs", text: "Your eyes are tested to see whether glasses would help, or whether your prescription has changed." },
  { term: "Eye pressure", text: "The pressure inside the eye may be measured, as part of looking for conditions such as glaucoma." },
  { term: "The front of the eye", text: "The eyelids, the surface of the eye and the lens are examined." },
  { term: "The back of the eye", text: "The retina and the optic nerve are looked at, sometimes after drops that widen the pupil." },
];

export default function Page() {
  return (
    <ServiceLayout serviceKey="exams">
      <section id="parts" className="section section--porcelain" aria-labelledby="parts-h">
        <div className="container about-grid">
          <div className="section-head reveal">
            <p className="kicker">At the examination</p>
            <h2 id="parts-h" className="h2">What an examination may include</h2>
            <p className="lead">
              The tests used depend on your symptoms and age and are chosen by the
              doctor. This page does not list the equipment available.
            </p>
          </div>
          <dl className="terms reveal">
            {PARTS.map((p) => (
              <div key={p.term}>
                <dt>{p.term}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClinicalFigure
        id="examParts"
        heading="Which part of the eye each step looks at"
        intro="Choose a step to see the part of the eye it is about."
      />
    </ServiceLayout>
  );
}
