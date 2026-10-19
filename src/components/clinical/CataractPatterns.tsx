import { C } from "./EyeBase";

type Pattern = "clear" | "clouded" | "nuclear" | "cortical" | "posterior";

const ITEMS: { kind: Pattern; title: string; detail: string }[] = [
  { kind: "nuclear", title: "Nuclear sclerotic", detail: "Clouding develops in the central part of the natural lens." },
  { kind: "cortical", title: "Cortical", detail: "Clouding begins in the outer lens and can extend towards its centre." },
  { kind: "posterior", title: "Posterior subcapsular", detail: "Clouding develops near the back surface of the lens." },
];

/** A consistent side-section of the natural lens. The eye's front is to the left. */
function LensSection({ kind }: { kind: Pattern }) {
  const label = kind === "clear" ? "Clear natural lens" : kind === "clouded" ? "Natural lens with clouding" :
    kind === "nuclear" ? "Clouding in the central nucleus" : kind === "cortical" ? "Clouding in the outer cortex" : "Clouding near the posterior surface";
  return (
    <svg viewBox="0 0 280 200" role="img" aria-label={`${label}, shown in a simplified side section`} className="cat-lens-svg">
      <rect width="280" height="200" fill={C.porcelain} />
      <text x="26" y="28" fill={C.soft} fontSize="12" fontWeight="700">FRONT</text>
      <text x="215" y="28" fill={C.soft} fontSize="12" fontWeight="700">BACK</text>
      <path d="M140 24 C88 58 88 142 140 176 C192 142 192 58 140 24Z" fill={C.white} stroke={C.ink} strokeWidth="3.5" />
      {kind === "clouded" && <path d="M140 32 C96 62 96 138 140 168 C184 138 184 62 140 32Z" fill={C.cloud} opacity="0.8" />}
      {kind === "nuclear" && <ellipse cx="140" cy="100" rx="20" ry="43" fill={C.cloud} stroke={C.orangeDark} strokeWidth="2" />}
      {kind === "cortical" && (
        <g fill={C.cloud} stroke={C.orangeDark} strokeWidth="1.5">
          <path d="M140 27 Q127 46 123 68 L140 78 L152 53Z" />
          <path d="M104 118 Q115 144 140 172 L146 146 L126 124Z" />
          <path d="M174 110 Q170 138 151 161 L148 136 L160 112Z" />
        </g>
      )}
      {kind === "posterior" && <path d="M156 47 Q190 100 156 153 L165 145 Q187 100 165 55Z" fill={C.cloud} stroke={C.orangeDark} strokeWidth="2" />}
      <path d="M140 24 C88 58 88 142 140 176 C192 142 192 58 140 24Z" fill="none" stroke={C.ink} strokeWidth="3.5" />
    </svg>
  );
}

export default function CataractPatterns() {
  return (
    <div className="cat-guide">
      <div className="cat-pair" aria-label="Clear and clouded natural lens comparison">
        <div className="cat-card"><LensSection kind="clear" /><h3>Clear natural lens</h3><p>Light passes through a transparent lens.</p></div>
        <div className="cat-card"><LensSection kind="clouded" /><h3>Lens with a cataract</h3><p>Clouding of the natural lens can scatter light and affect vision.</p></div>
      </div>
      <div className="cat-types">
        <div className="cat-types-head"><h3>Three common patterns</h3><p>These describe where clouding sits in the lens. A person can have more than one pattern.</p></div>
        <div className="cat-types-grid">
          {ITEMS.map((item) => <div className="cat-card" key={item.kind}><LensSection kind={item.kind} /><h4>{item.title}</h4><p>{item.detail}</p></div>)}
        </div>
      </div>
    </div>
  );
}
