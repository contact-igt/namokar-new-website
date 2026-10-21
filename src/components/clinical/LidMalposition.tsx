import AssetImage from "@/components/AssetImage";
import { ASSETS } from "@/config/assets";

type Tone = "typical" | "in" | "out";

const STATES = [
  {
    key: "typical" as Tone,
    title: "Typical",
    subtitle: "Lower eyelid",
    asset: ASSETS.eyelidTypicalComparisonAi,
    lashAsset: ASSETS.eyelidLashesTypicalAi,
    symptoms: ["Usually no symptoms", "Comfortable eye"],
    lashes: "Lashes point away from the eye.",
    treatments: ["No treatment needed", "Regular eye check-ups"],
    surgery: "No",
    surgeryNote: "Usually not required",
  },
  {
    key: "in" as Tone,
    title: "Turning in",
    subtitle: "Entropion",
    asset: ASSETS.eyelidEntropionComparisonAi,
    lashAsset: ASSETS.eyelidLashesEntropionAi,
    symptoms: ["Irritation and redness", "Foreign-body sensation", "Tearing and discomfort"],
    lashes: "Lashes point towards the eye and may rub against its surface.",
    treatments: ["Lubricating drops may give temporary relief", "Corrective surgery may be recommended"],
    surgery: "May be recommended",
    surgeryNote: "Depending on symptoms and examination",
  },
  {
    key: "out" as Tone,
    title: "Turning out",
    subtitle: "Ectropion",
    asset: ASSETS.eyelidEctropionComparisonAi,
    lashAsset: ASSETS.eyelidLashesEctropionAi,
    symptoms: ["Dryness and irritation", "Excessive watering", "Redness and exposure"],
    lashes: "The lid turns outward, leaving the eye surface more exposed.",
    treatments: ["Lubricating drops may be advised", "Treatment of the underlying cause", "Surgery may be recommended"],
    surgery: "May be recommended",
    surgeryNote: "Depending on severity and cause",
  },
];

function Check({ tone }: { tone: Tone }) {
  return <span className={`lidcmp-check lidcmp-check--${tone}`} aria-hidden="true">{"\u2713"}</span>;
}

function HeaderIcon({ tone }: { tone: Tone }) {
  return (
    <span className={`lidcmp-head-icon lidcmp-head-icon--${tone}`} aria-hidden="true">
      {tone === "typical" ? <span className="lidcmp-head-check">{"\u2713"}</span> : (
        <svg className={`lidcmp-turn-icon lidcmp-turn-icon--${tone}`} viewBox="0 0 32 32">
          <path d={tone === "in" ? "M25 22c0-8-4-13-10-13-5 0-8 3-8 8" : "M7 22c0-8 4-13 10-13 5 0 8 3 8 8"} />
          <path d={tone === "in" ? "m4 14 3 4 4-3" : "m28 14-3 4-4-3"} />
        </svg>
      )}
    </span>
  );
}

function RowIcon({ type }: { type: "eye" | "alert" | "lashes" | "care" | "surgery" }) {
  const paths = {
    eye: <><path d="M2 12s3.7-6 10-6 10 6 10 6-3.7 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.8"/></>,
    alert: <><path d="m12 3 9 16H3L12 3Z"/><path d="M12 8v5M12 16h.01"/></>,
    lashes: <><path d="M3 10q9 7 18 0"/><path d="m6 13-2 3m5-1-1 4m5-3 1 4m3-5 3 3"/></>,
    care: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2"/></>,
    surgery: <><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/><path d="m9 15 8-11m-2 11L7 4"/></>,
  };
  return <span className="lidcmp-row-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{paths[type]}</svg></span>;
}

function LashDirection({ tone, asset, children }: { tone: Tone; asset: (typeof STATES)[number]["lashAsset"]; children: string }) {
  return (
    <div className="lidcmp-lashes">
      <AssetImage asset={asset} className={`lidcmp-lash-image lidcmp-lash-image--${tone}`} sizes="150px" />
      <span>{children}</span>
    </div>
  );
}

export default function LidMalposition() {
  return (
    <div className="lidcmp-scroll" tabIndex={0} aria-label="Scrollable eyelid position comparison">
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
            <th scope="row"><span className="lidcmp-row-heading"><RowIcon type="alert" />Symptoms</span></th>
            {STATES.map((state) => (
              <td key={state.key}><ul className="lidcmp-list">{state.symptoms.map((item) => <li key={item}><Check tone={state.key} />{item}</li>)}</ul></td>
            ))}
          </tr>
          <tr>
            <th scope="row"><span className="lidcmp-row-heading"><RowIcon type="lashes" />How lashes point</span></th>
            {STATES.map((state) => <td key={state.key}><LashDirection tone={state.key} asset={state.lashAsset}>{state.lashes}</LashDirection></td>)}
          </tr>
          <tr>
            <th scope="row"><span className="lidcmp-row-heading"><RowIcon type="care" />Treatment</span></th>
            {STATES.map((state) => (
              <td key={state.key}><ul className="lidcmp-list">{state.treatments.map((item) => <li key={item}><Check tone={state.key} />{item}</li>)}</ul></td>
            ))}
          </tr>
          <tr>
            <th scope="row"><span className="lidcmp-row-heading"><RowIcon type="surgery" />Need surgery?</span></th>
            {STATES.map((state) => (
              <td key={state.key}><div className={`lidcmp-surgery lidcmp-surgery--${state.key}`}><Check tone={state.key} /><span><strong>{state.surgery}</strong><small>{state.surgeryNote}</small></span></div></td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
