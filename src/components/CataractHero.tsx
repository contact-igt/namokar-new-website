import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import { ASSETS, srcOf, usable } from "@/config/assets";
import { LINKS } from "@/config/site";
import BookButton from "./BookButton";
import { onlineBookingAvailable } from "@/lib/booking";

export default function CataractHero() {
  const online = onlineBookingAvailable();
  const hasHero = usable(ASSETS.archCataractExam);

  return (
    <section className="cataract-hero page-hero--photo page-hero--long">
      {hasHero && (
        <div className="cataract-hero-image-stage">
          <div className="cataract-hero-img-wrap" aria-hidden="true">
            <div className="cataract-hero-img-inner">
              <Image
                src={srcOf(ASSETS.archCataractExam)}
                alt={ASSETS.archCataractExam.alt}
                fill
                priority
                unoptimized
                className="cataract-hero-bg-img"
              />
            </div>
          </div>
        </div>
      )}

      <div className="container cataract-hero-container">
        <div className="cataract-hero-grid">
          <div className="cataract-hero-copy">
            <Breadcrumb
              current="Cataract Surgery"
              trail={[{ label: "Services", href: LINKS.allServices }]}
            />
            <p className="page-eyebrow">STITCHLESS CATARACT SURGERY</p>
            <h1 className="page-title">Cataract surgery, explained clearly.</h1>
            <p className="page-lead">
              Understand cataract symptoms, when surgery is considered, lens choices and what the first consultation involves.
            </p>
            <div className="page-actions">
              <BookButton online={online} />
            </div>
          </div>

          {hasHero && (
            <div className="cataract-hero-mobile-media">
              <div className="cataract-hero-mobile-img-wrap">
                <Image
                  src={srcOf(ASSETS.archCataractExam)}
                  alt={ASSETS.archCataractExam.alt}
                  width={2400}
                  height={1600}
                  priority
                  unoptimized
                  className="cataract-hero-mobile-img"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

