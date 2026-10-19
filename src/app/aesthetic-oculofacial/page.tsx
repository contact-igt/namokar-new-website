import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import { figureUsable } from "@/config/figures";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";

export const metadata = serviceMetadata("aesthetic");

const QUESTIONS = [
  "What exactly is being suggested, and why?",
  "What are the risks for me?",
  "What will it not change?",
  "What does recovery involve for my work and daily life?",
  "What happens if I am not happy with the result?",
];

export default function Page() {
  return (
    <ServiceLayout serviceKey="aesthetic">
      <section id="expectations" className="section section--graphite" aria-labelledby="exp-h">
        <div className="container about-grid">
          <div className="section-head reveal">
            <p className="kicker">Realistic expectations</p>
            <h2 id="exp-h" className="h2">Changes are personal</h2>
            <p className="lead">
              Faces are not perfectly symmetrical, and ageing affects each person
              differently. A good consultation leaves you clear about what can be
              improved, what cannot, how long a change may last and what the risks are.
            </p>
          </div>
          <div className="about-body reveal">
            <h3 className="h3">Questions worth asking at any consultation</h3>
            {figureUsable("consultationQuestions") ? (
              <p>Tick the ones you want to ask and copy your list, below.</p>
            ) : (
              <ul className="dash-list">
                {QUESTIONS.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <ClinicalFigure
        id="consultationQuestions"
        heading="Prepare your questions"
        intro="Choose the questions you want to ask, then copy the list to take with you."
      />
    </ServiceLayout>
  );
}
