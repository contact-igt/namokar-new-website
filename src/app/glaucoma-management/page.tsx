import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";

export const metadata = serviceMetadata("glaucoma");

type Item = { title: string; text: string };

/** General information only: written in neutral terms and pending clinician sign-off. */
const SIGNS: Item[] = [
  { title: "Changing glasses often", text: "Needing a new prescription again and again can be a sign worth mentioning to the doctor." },
  { title: "Narrowing side vision", text: "Side (peripheral) vision can shrink slowly, sometimes described as tunnel vision." },
  { title: "Missing things at the edge", text: "Bumping into objects or people, or tripping, because part of the view is missing." },
  { title: "Needing brighter light", text: "Finding that you need much more light than before to see well." },
  { title: "Blurred or hazy vision", text: "Vision that looks misty or less clear, without an obvious reason." },
  { title: "A vague ache around the eye", text: "A dull ache or feeling of pressure in or around the eye." },
];

const TYPES: Item[] = [
  {
    title: "Open-angle glaucoma",
    text: "The most common type. The drainage channels of the eye stay open but drain too slowly, and damage builds up gradually. There is usually no pain and no early symptom.",
  },
  {
    title: "Normal-tension glaucoma",
    text: "The optic nerve is damaged even though the eye pressure measures within the normal range. It is one reason a full examination is needed and not a pressure reading alone.",
  },
  {
    title: "Angle-closure glaucoma",
    text: "The drainage angle of the eye becomes narrow or blocked. It can build up slowly or, in an acute attack, within hours.",
  },
];

const TESTS: Item[] = [
  { title: "Eye pressure (tonometry)", text: "Measures the pressure inside the eye, because raised pressure is a common factor in glaucoma." },
  { title: "Optic nerve examination", text: "The nerve at the back of the eye is examined for thinning or other changes that glaucoma causes." },
  { title: "Visual field test", text: "Maps your side vision and shows whether any part of it has been lost, often without the person noticing." },
  { title: "OCT scan", text: "A scan that can show the thickness of the nerve fibre layer, which helps to pick up change over time." },
  { title: "Drainage angle check (gonioscopy)", text: "Looks at the drainage angle of the eye, which helps to tell the types of glaucoma apart." },
  { title: "Corneal thickness", text: "The thickness of the front of the eye can affect how an eye pressure reading is read." },
];

const TREATMENTS: Item[] = [
  {
    title: "Eye drops",
    text: "Often the first step. Drops lower the pressure in the eye, and they only work when they are used regularly as prescribed.",
  },
  {
    title: "Laser treatment",
    text: "In suitable eyes, a laser can help fluid drain more easily or open a narrow drainage angle.",
  },
  {
    title: "Surgery",
    text: "When drops or laser are not enough, surgery creates a new route for fluid to leave the eye. Options range from minimally invasive glaucoma surgery (MIGS) to conventional operations.",
  },
];

function Cards({ items, numbered = false }: { items: Item[]; numbered?: boolean }) {
  return (
    <ul className="tile-grid reveal">
      {items.map((it, i) => (
        <li key={it.title} className="tile tile--info">
          {numbered && <span className="tile-no" aria-hidden="true">0{i + 1}</span>}
          <h3 className="tile-title">{it.title}</h3>
          <p className="tile-blurb">{it.text}</p>
        </li>
      ))}
    </ul>
  );
}

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

      <section id="signs" className="section" aria-labelledby="signs-h">
        <div className="container">
          <div className="section-head reveal">
            <p className="kicker">Signs to notice</p>
            <h2 id="signs-h" className="h2">Changes you may notice</h2>
            <p className="lead">
              Early glaucoma often shows nothing at all. When changes do appear, they tend to
              be slow, so they are easy to put down to age or tired eyes.
            </p>
          </div>
          <Cards items={SIGNS} />
          <p className="callout reveal">
            None of these proves glaucoma, and glaucoma can be present without any of them.
            Only an eye examination can tell.
          </p>
        </div>
      </section>

      <section id="types" className="section section--porcelain" aria-labelledby="types-h">
        <div className="container">
          <div className="section-head reveal">
            <p className="kicker">Types</p>
            <h2 id="types-h" className="h2">Common types of glaucoma</h2>
            <p className="lead">
              Knowing which type a person has helps the doctor choose the right care.
            </p>
          </div>
          <Cards items={TYPES} />
          <p className="callout reveal">
            A sudden attack of angle-closure glaucoma is an emergency. Severe eye pain with
            redness, blurred vision, halos around lights, headache or sickness needs urgent
            medical attention.
          </p>
        </div>
      </section>

      <section id="monitoring" className="section" aria-labelledby="monitoring-h">
        <div className="container">
          <div className="section-head reveal">
            <p className="kicker">Diagnosis and monitoring</p>
            <h2 id="monitoring-h" className="h2">How glaucoma is found and followed</h2>
            <p className="lead">
              Checking eye pressure alone is not enough. The doctor looks at the nerve, the
              drainage angle and the field of vision together. These are tests a doctor may use;
              which ones you need, and how often, is the doctor&rsquo;s decision.
            </p>
          </div>
          <Cards items={TESTS} numbered />
        </div>
      </section>

      <ClinicalFigure
        id="glaucomaFlow"
        heading="How fluid drains, and how pressure can rise"
        intro="Compare normal drainage with slowed drainage to see one common way pressure can rise inside the eye."
      />

      <section id="treatment" className="section section--porcelain" aria-labelledby="treatment-h">
        <div className="container">
          <div className="section-head reveal">
            <p className="kicker">Treatment</p>
            <h2 id="treatment-h" className="h2">How glaucoma is treated</h2>
            <p className="lead">
              Treatment aims to lower the pressure in the eye and protect the vision that is
              left. It cannot bring back vision that has already been lost.
            </p>
          </div>
          <Cards items={TREATMENTS} numbered />
          <p className="callout reveal">
            The choice depends on the type of glaucoma, how far it has gone and the
            person&rsquo;s health. The doctor explains the options and what each can and cannot
            do. Check-ups continue after treatment, because glaucoma needs watching over the
            long term.
          </p>
        </div>
      </section>

      <ClinicalFigure
        id="sideVision"
        heading="How glaucoma can narrow side vision"
        intro="The change is usually gradual, which is why regular examinations matter."
      />
    </ServiceLayout>
  );
}
