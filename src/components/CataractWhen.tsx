import { SERVICE_CONTENT } from "@/content/services";

export default function CataractWhen() {
  const c = SERVICE_CONTENT.cataract;

  return (
    <section id="when" className="section section--porcelain cataract-when-section" aria-labelledby="when-h">
      <div className="container about-grid">
        <div className="section-head reveal">
          <p className="kicker">Know the signs</p>
          <h2 id="when-h" className="h2">{c.seekHelp.heading}</h2>
        </div>
        <div className="about-body reveal">
          <div className="cataract-when-box">
            <ul className="cataract-when-list" role="list">
              {c.seekHelp.items.map((item) => (
                <li key={item} className="cataract-when-item">
                  <span className="cataract-dash" aria-hidden="true">
                    —
                  </span>
                  <span className="cataract-when-text">{item}</span>
                </li>
              ))}
            </ul>
            <div className="cataract-urgent-notice">
              <p className="cataract-urgent-text">{c.seekHelp.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

