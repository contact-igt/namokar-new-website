import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";

export const metadata = serviceMetadata("eyelid");

export default function Page() {
  return (
    <ServiceLayout serviceKey="eyelid">
      <section id="reasons" className="section section--porcelain" aria-labelledby="reasons-h">
        <div className="container">
          <div className="section-head section-head--wide reveal">
            <p className="kicker">Why people consider it</p>
            <h2 id="reasons-h" className="h2">Functional or cosmetic?</h2>
            <p className="lead">
              Many people have a mixture of reasons. The reason affects how any
              treatment is planned, so the doctor asks about both.
            </p>
          </div>
          <div className="compare reveal">
            <div>
              <h3 className="h3">Functional reasons</h3>
              <ul className="bullets">
                <li>Excess skin that rests on the eyelashes or blocks part of the view</li>
                <li>Eyelids that feel heavy or make the eyes tired</li>
                <li>Difficulty keeping the eyes open comfortably</li>
              </ul>
            </div>
            <div>
              <h3 className="h3">Cosmetic reasons</h3>
              <ul className="bullets">
                <li>A tired or heavy look around the eyes</li>
                <li>Bags or puffiness beneath the eyes</li>
                <li>Loose skin on the upper or lower lids</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ClinicalFigure
        id="eyelidPosition"
        heading="Upper eyelid position"
        intro="Three simple pictures: a typical lid, a drooping lid and excess skin. They can look alike, which is why an examination matters."
      />
    </ServiceLayout>
  );
}
