import AssetImage from "@/components/AssetImage";
import { ASSETS } from "@/config/assets";

type Tone = "typical" | "in" | "out";

const STATES = [
  { key: "typical" as Tone, title: "Typical", subtitle: "Upper eyelid", asset: ASSETS.upperEyelidTypicalAi, appearance: "The lid edge sits near the top of the coloured part of the eye and the pupil is clear.", assessment: "Usually a normal finding.", nextStep: "No treatment is needed for a typical lid position." },
  { key: "in" as Tone, title: "Drooping", subtitle: "Ptosis", asset: ASSETS.upperEyelidDroopingAi, appearance: "The lid edge sits lower than usual and may partly cover the iris or pupil.", assessment: "An examination identifies the cause and whether vision is affected.", nextStep: "The doctor discusses the cause and the options that suit your eyes." },
  { key: "out" as Tone, title: "Excess skin", subtitle: "Upper lid", asset: ASSETS.upperEyelidExcessSkinAi, appearance: "An extra skin fold can hang over the crease or rest on the eyelashes.", assessment: "An examination distinguishes excess skin from a drooping lid and checks its effect on vision.", nextStep: "The doctor explains whether any treatment could help and what it can change." },
];

function Check({ tone }: { tone: Tone }) {
  return <span className={`lidcmp-check lidcmp-check--${tone}`} aria-hidden="true">{"\u2713"}</span>;
}

export default function EyelidPosition() {
  return (
    <div className="lidcmp-scroll" tabIndex={0} aria-label="Scrollable upper eyelid position comparison">
      <table className="lidcmp">
        <thead><tr><th aria-label="Comparison category" />{STATES.map((state) => <th className={`lidcmp-head lidcmp-head--${state.key}`} scope="col" key={state.key}><span className="lidcmp-head-inner"><span><strong>{state.title}</strong><small>{state.subtitle}</small></span></span></th>)}</tr></thead>
        <tbody>
          <tr><th scope="row">Illustration</th>{STATES.map((state) => <td className="lidcmp-picture" key={state.key}><AssetImage asset={state.asset} sizes="(min-width: 960px) 28vw, 80vw" /></td>)}</tr>
          <tr><th scope="row">What it can look like</th>{STATES.map((state) => <td key={state.key}><p className="lidcmp-copy"><Check tone={state.key} />{state.appearance}</p></td>)}</tr>
          <tr><th scope="row">Why assessment matters</th>{STATES.map((state) => <td key={state.key}><p className="lidcmp-copy"><Check tone={state.key} />{state.assessment}</p></td>)}</tr>
          <tr><th scope="row">Next step</th>{STATES.map((state) => <td key={state.key}><p className="lidcmp-copy"><Check tone={state.key} />{state.nextStep}</p></td>)}</tr>
        </tbody>
      </table>
    </div>
  );
}
