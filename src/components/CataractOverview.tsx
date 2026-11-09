import Image from "next/image";
import { ASSETS, srcOf, usable } from "@/config/assets";
import { SERVICE_CONTENT } from "@/content/services";

export default function CataractOverview() {
  const c = SERVICE_CONTENT.cataract;
  const hasPhoto = usable(ASSETS.cataractOverviewAi);

  return (
    <section id="overview" className="section section--tight cataract-overview-section" aria-labelledby="overview-h">
      <div className="container cataract-overview-grid">
        {/* LEFT COLUMN: Section Label, Heading, and Photograph */}
        <div className="cataract-overview-left reveal">
          <div className="cataract-overview-head">
            <p className="kicker">COMPREHENSIVE VISION CARE</p>
            <h2 id="overview-h" className="h2">{c.introHeading}</h2>
          </div>
          {hasPhoto && (
            <figure className="cataract-overview-media">
              <div className="cataract-overview-img-wrap">
                <Image
                  src={srcOf(ASSETS.cataractOverviewAi)}
                  alt={ASSETS.cataractOverviewAi.alt}
                  width={1920}
                  height={1080}
                  className="cataract-overview-img"
                  sizes="(min-width: 960px) 46vw, 100vw"
                />
              </div>
            </figure>
          )}
        </div>

        {/* RIGHT COLUMN: Explanatory Paragraphs */}
        <div className="cataract-overview-right reveal">
          <div className="cataract-overview-copy">
            {c.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

