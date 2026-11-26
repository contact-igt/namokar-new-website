import AssetImage from "@/components/AssetImage";
import { ASSETS } from "@/config/assets";

type Tone = "typical" | "in" | "out";

const STATES = [
  {
    key: "typical" as Tone,
    title: "Typical Eyelid",
    subtitle: "Usual eyelid position",
    asset: ASSETS.upperEyelidTypicalAi,
    appearance: "The upper eyelid covers a small part of the upper cornea and leaves the pupil unobstructed.",
    cause: "Normal anatomy",
    vision: "Usually unobstructed",
    assessment: "Routine examination if needed.",
    nextStep: "No treatment needed",
    nextStepNote: "No treatment is needed for a typical lid position.",
  },
  {
    key: "in" as Tone,
    title: "Ptosis",
    subtitle: "Drooping eyelid margin",
    asset: ASSETS.upperEyelidDroopingAi,
    appearance: "The upper eyelid margin sits lower than usual and may obstruct the pupil or visual field.",
    cause: "Changes involving eyelid-elevating structures, nerves or other conditions",
    vision: "May obstruct the visual field",
    assessment: "Evaluate eyelid-elevating structures, nerves and other potential causes.",
    nextStep: "Cause-specific management",
    nextStepNote: "Ptosis correction may be appropriate after assessment.",
  },
  {
    key: "out" as Tone,
    title: "Dermatochalasis",
    subtitle: "Excess eyelid skin",
    asset: ASSETS.upperEyelidExcessSkinAi,
    appearance: "Age-related or inherited excess skin may fold over the crease, rest on the lashes or obstruct the upper visual field.",
    cause: "Age-related or inherited skin and tissue changes",
    vision: "Excess skin may obstruct the upper visual field",
    assessment: "Assess the eyelids, brow position and ocular surface.",
    nextStep: "Blepharoplasty when appropriate",
    nextStepNote: "Surgical suitability depends on the clinical findings.",
  },
];

function Check({ tone }: { tone: Tone }) {
  return <span className={`lidcmp-check lidcmp-check--${tone}`} aria-hidden="true">{"\u2713"}</span>;
}

function HeaderIcon({ tone }: { tone: Tone }) {
  return (
    <span className={`lidcmp-head-icon lidcmp-head-icon--${tone}`} aria-hidden="true">
      {tone === "typical" ? (
        <span className="lidcmp-head-check">{"\u2713"}</span>
      ) : tone === "in" ? (
        <svg className={`lidcmp-turn-icon lidcmp-turn-icon--${tone}`} viewBox="0 0 32 32">
          <path d="M5 13c4-4 8-6 11-6s7 2 11 6" />
          <path d="M5 19c4 2 8 3 11 3s7-1 10-3" />
          <path d="M16 11v9m-3-3 3 3 3-3" />
        </svg>
      ) : (
        <svg className={`lidcmp-turn-icon lidcmp-turn-icon--${tone}`} viewBox="0 0 32 32">
          <path d="M5 11c4-3 7-4 11-4s7 1 11 4" />
          <path d="M5 16c4-2 7-3 11-3s7 1 11 3" />
          <path d="M5 21c4-1 7-2 11-2s7 1 11 2" />
        </svg>
      )}
    </span>
  );
}

function RowIcon({ type }: { type: "eye" | "alert" | "care" | "surgery" }) {
  const paths = {
    eye: <><path d="M2 12s3.7-6 10-6 10 6 10 6-3.7 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.8"/></>,
    alert: <><path d="m12 3 9 16H3L12 3Z"/><path d="M12 8v5M12 16h.01"/></>,
    care: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2"/></>,
    surgery: <><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/><path d="m9 15 8-11m-2 11L7 4"/></>,
  };
  return <span className="lidcmp-row-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{paths[type]}</svg></span>;
}

export default function EyelidPosition() {
  return (
    <div className="lidcmp-scroll" tabIndex={0} aria-label="Scrollable upper eyelid position comparison">
      <table className="lidcmp">
        <thead>
          <tr>
            <th aria-label="Comparison category" />
            {STATES.map((state) => (
              <th className={`lidcmp-head lidcmp-head--${state.key}`} scope="col" key={state.key}>
                <span className="lidcmp-head-inner">
                  <HeaderIcon tone={state.key} />
                  <span><strong>{state.title}</strong><small>{state.subtitle}</small></span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"><span className="lidcmp-row-heading"><RowIcon type="eye" />Illustration</span></th>
            {STATES.map((state) => (
              <td className="lidcmp-picture" key={state.key}>
                <AssetImage asset={state.asset} sizes="(min-width: 960px) 28vw, 80vw" />
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row"><span className="lidcmp-row-heading"><RowIcon type="alert" />Main anatomical feature</span></th>
            {STATES.map((state) => (
              <td key={state.key}>
                <p className="lidcmp-copy"><Check tone={state.key} />{state.appearance}</p>
              </td>
            ))}
          </tr>
          {([{ key: "cause", title: "Underlying cause" }, { key: "vision", title: "Effect on vision" }] as const).map(({ key, title }) => (
            <tr key={key}>
              <th scope="row"><span className="lidcmp-row-heading">{title}</span></th>
              {STATES.map((state) => <td key={state.key}><p className="lidcmp-copy">{state[key]}</p></td>)}
            </tr>
          ))}
          <tr>
            <th scope="row"><span className="lidcmp-row-heading"><RowIcon type="care" />Why assessment matters</span></th>
            {STATES.map((state) => (
              <td key={state.key}>
                <p className="lidcmp-copy"><Check tone={state.key} />{state.assessment}</p>
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row"><span className="lidcmp-row-heading"><RowIcon type="surgery" />Next step</span></th>
            {STATES.map((state) => (
              <td key={state.key}>
                <div className={`lidcmp-surgery lidcmp-surgery--${state.key}`}>
                  <Check tone={state.key} />
                  <span><strong>{state.nextStep}</strong><small>{state.nextStepNote}</small></span>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
