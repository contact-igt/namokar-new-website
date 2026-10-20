import { C, EyeBase, PART_MARK, type EyePart } from "./EyeBase";

/**
 * A normal eye and an eye with a cataract, drawn as the same side cross-section so the only
 * difference is the lens: clear on the left, clouded on the right. Pastel-blue panels with coral
 * anatomy (the colours are mapped in globals.css, under .eyecmp) and the main parts labelled.
 * Original vector artwork drawn in code; not to scale; general information only.
 */
const LABELS: { part: EyePart; text: string }[] = [
  { part: "cornea", text: "Cornea" },
  { part: "iris", text: "Iris" },
  { part: "lens", text: "Lens" },
  { part: "vitreous", text: "Vitreous" },
  { part: "retina", text: "Retina" },
  { part: "nerve", text: "Optic nerve" },
];

function Eye({ cloud, title }: { cloud: number; title: string }) {
  return (
    <svg viewBox="100 40 500 330" className="eyecmp-svg" role="img" aria-label={title}>
      <EyeBase cloud={cloud}>
        {LABELS.map(({ part, text }) => {
          const { at, to } = PART_MARK[part];
          return (
            <g key={part} aria-hidden="true">
              {to && <line x1={at[0]} y1={at[1] + 6} x2={to[0]} y2={to[1]} stroke={C.ink} strokeWidth="2" />}
              <text
                x={at[0]}
                y={at[1]}
                textAnchor="middle"
                fontSize="19"
                fontWeight="700"
                fontFamily="Inter, system-ui, sans-serif"
                fill={C.ink}
                stroke="#FFFFFF"
                strokeWidth="5"
                paintOrder="stroke"
              >
                {text}
              </text>
            </g>
          );
        })}
      </EyeBase>
    </svg>
  );
}

export default function EyeCompare() {
  return (
    <div className="eyecmp">
      <figure className="eyecmp-panel">
        <Eye cloud={0} title="Side cross-section of a normal eye: the lens is clear" />
        <figcaption>
          <strong>Normal eye</strong>
          <span>The lens is clear, so light passes through and focuses on the retina.</span>
        </figcaption>
      </figure>
      <figure className="eyecmp-panel">
        <Eye cloud={1} title="Side cross-section of an eye with a cataract: the lens is clouded" />
        <figcaption>
          <strong>Eye with a cataract</strong>
          <span>The lens has become cloudy, so light is scattered and vision can look blurred or dim.</span>
        </figcaption>
      </figure>
    </div>
  );
}
