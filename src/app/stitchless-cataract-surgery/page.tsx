import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";

export const metadata = serviceMetadata("cataract");

export default function Page() {
  return (
    <ServiceLayout serviceKey="cataract">
      <ClinicalFigure
        id="eyeAnatomy"
        heading="Inside the eye, and where a cataract forms"
        intro="Choose a part of the eye to see what it does, then switch the lens to see how a clouded lens affects the light entering the eye."
      />

      <ClinicalFigure
        id="lensCompare"
        heading="How a clouded lens can change what you see"
        intro="Drag across the picture to compare a clear view with an illustration of clouded vision."
      />

      <section id="lenses" className="section section--graphite" aria-labelledby="lenses-h">
        <div className="container about-grid">
          <div className="section-head reveal">
            <p className="kicker">Choosing a lens</p>
            <h2 id="lenses-h" className="h2">About replacement lenses</h2>
          </div>
          <div className="about-body reveal">
            <p>
              Artificial lenses come in different designs. Some are made mainly for
              distance vision, some also help with near vision, and some are designed to
              correct astigmatism.
            </p>
            <p>
              Which design, if any, suits you depends on your eyes, your daily
              activities and your expectations. The doctor explains the choices and what
              each can and cannot do. No lens can promise that you will never need
              spectacles.
            </p>
          </div>
        </div>
      </section>

      <ClinicalFigure
        id="lensDesigns"
        heading="The three kinds of replacement lens"
        intro="A simple picture of how each design handles light. The doctor explains which, if any, may suit you."
      />

      <ClinicalFigure
        id="cataractSteps"
        heading="Cataract surgery in four steps"
        intro="A general outline, at your own pace. Press Play, or step through with Previous and Next."
      />
    </ServiceLayout>
  );
}
