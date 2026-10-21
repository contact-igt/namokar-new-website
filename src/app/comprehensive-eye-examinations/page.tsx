import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";

export const metadata = serviceMetadata("exams");

const PARTS = [
  { term: "Your history and symptoms", text: "The doctor asks about your vision, general health, medicines and family history, which helps to decide what to check." },
  { term: "How well you see", text: "Your distance and near vision are checked, with and without spectacles, one eye at a time and together." },
  { term: "Spectacle needs", text: "Your eyes are tested to see whether glasses would help, or whether your prescription has changed." },
  { term: "How your eyes work together", text: "Eye movement and alignment may be checked, because eyes that do not work as a team can cause strain, double vision or headaches." },
  { term: "Eye pressure", text: "The pressure inside the eye may be measured, as part of looking for conditions such as glaucoma." },
  { term: "The front of the eye", text: "The eyelids, the surface of the eye, the clear front window (cornea) and the lens are examined, which can show dryness, infection, injury or the early clouding of a cataract." },
  { term: "The back of the eye", text: "The retina and the optic nerve are looked at, sometimes after drops that widen the pupil. This is how changes from conditions such as glaucoma or diabetes can be seen." },
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
        heading="What happens during a comprehensive eye examination"
        intro="Each step checks a different part of your vision and eye health."
      />
    </ServiceLayout>
  );
}
