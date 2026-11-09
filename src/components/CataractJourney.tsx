import { SERVICE_CONTENT } from "@/content/services";

export default function CataractJourney() {
  const c = SERVICE_CONTENT.cataract;

  return (
    <section id="journey" className="section cataract-journey-section" aria-labelledby="journey-h">
      <div className="container why-grid">
        <div className="section-head reveal">
          <p className="kicker">What to expect</p>
          <h2 id="journey-h" className="h2">What an assessment involves</h2>
          <p className="lead">{c.journeyLead}</p>
        </div>
        <div className="cataract-journey-stack">
          {c.journey.map((step, idx) => (
            <article key={step.title} className="cataract-journey-card reveal">
              <div className="cataract-step-header">
                <span className="cataract-step-badge" aria-hidden="true">
                  0{idx + 1}
                </span>
                <h3 className="cataract-step-title">{step.title}</h3>
              </div>
              <p className="cataract-step-text">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

