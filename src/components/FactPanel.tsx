import { SITE } from "@/config/site";

/** "At a glance" panel: verified facts only, used where a hero photograph is unavailable. */
export default function FactPanel() {
  return (
    <aside className="fact-panel" aria-label="Namokar at a glance">
      <p className="vp-kicker fp-kicker">At a glance</p>
      <dl>
        <div>
          <dt>Where</dt>
          <dd>{SITE.address.street}, New Delhi</dd>
        </div>
        <div>
          <dt>Led by</dt>
          <dd>Dr. Poonam Jain, Medical Director &amp; Senior Ophthalmologist</dd>
        </div>
        <div>
          <dt>Care</dt>
          <dd>Comprehensive eye care, with specialist oculoplasty for the eyelids and tear passages</dd>
        </div>
      </dl>
    </aside>
  );
}
