import type { ReactNode } from "react";

/**
 * Shared vector parts for the clinical illustrations. Original artwork drawn in code for this
 * site (see docs/immersive/FIGURE_PROVENANCE.md); colours are the brand tokens in globals.css
 * written as hex because SVG artwork carries its own palette: graphite ink, orange accent,
 * porcelain and orange-mist fills. Nothing here is a photograph, a generated image or a
 * likeness of a person.
 */
export const C = {
  ink: "#243238",
  soft: "#55616A",
  grey: "#8A979C",
  line: "#E5E9EA",
  porcelain: "#F7F9FA",
  mist: "#FFF2E8",
  orange: "#D66B1F",
  orangeDark: "#A9440D",
  white: "#FFFFFF",
  cloud: "#E9CFA0", // the warm, milky tone of a clouded lens
} as const;

export type EyePart = "cornea" | "iris" | "pupil" | "lens" | "vitreous" | "retina" | "nerve";

/** Plain-language definitions, for the clinical reviewer to approve. */
export const PART_TEXT: Record<EyePart, { name: string; text: string }> = {
  cornea: { name: "Cornea", text: "The clear, curved window at the front of the eye. It helps to focus light." },
  iris: { name: "Iris", text: "The coloured ring that opens and closes to control how much light enters the eye." },
  pupil: { name: "Pupil", text: "The opening in the middle of the iris, where light passes through." },
  lens: {
    name: "Lens",
    text: "A clear structure behind the pupil that fine-tunes focus. In a cataract, the lens becomes cloudy.",
  },
  vitreous: { name: "Vitreous", text: "A clear jelly that fills the middle of the eye." },
  retina: {
    name: "Retina",
    text: "The light-sensing layer at the back of the eye. It turns light into signals for the brain.",
  },
  nerve: { name: "Optic nerve", text: "The cable that carries those signals from the eye to the brain." },
};

export const PART_ORDER: EyePart[] = ["cornea", "iris", "pupil", "lens", "vitreous", "retina", "nerve"];

/** Marker position and the point on the part it points to (unset: the marker sits on the part). */
export const PART_MARK: Record<EyePart, { at: [number, number]; to?: [number, number] }> = {
  cornea: { at: [140, 108], to: [227, 156] },
  iris: { at: [262, 52], to: [260, 138] },
  pupil: { at: [240, 200] },
  lens: { at: [298, 200] },
  vitreous: { at: [392, 268] },
  retina: { at: [506, 96], to: [460, 123] },
  nerve: { at: [545, 262], to: [536, 208] },
};

const dim = (on: boolean) => ({ opacity: on ? 1 : 0.28, transition: "opacity 200ms cubic-bezier(0.23,1,0.32,1)" });

/**
 * Side cross-section of an eye, front at the left. `cloud` (0 to 1) is how clouded the lens is.
 * `focus` limits full-strength drawing to the named parts (the others fade back).
 */
export function EyeBase({
  cloud = 0,
  focus,
  showLens = true,
  children,
}: {
  cloud?: number;
  focus?: EyePart[];
  /** Hide the built-in lens when a figure draws its own (the surgery steps). */
  showLens?: boolean;
  children?: ReactNode;
}) {
  const on = (p: EyePart) => (focus ? focus.includes(p) : true);
  return (
    <g>
      {/* the globe's interior, filled so the parts read against it */}
      <path d="M250 113 A140 140 0 1 1 250 287 Q190 200 250 113Z" fill="#FFFBF7" />
      <g style={dim(on("vitreous"))}>
        <path d="M262 121 A126 126 0 1 1 262 279 L270 279 L270 121Z" fill={C.mist} opacity="0.55" />
      </g>
      {/* sclera (the white wall) */}
      <path d="M250 113 A140 140 0 1 1 250 287" fill="none" stroke={C.ink} strokeWidth="5" strokeLinecap="round" />
      {/* cornea */}
      <g style={dim(on("cornea"))}>
        <path d="M250 113 Q190 200 250 287" fill="none" stroke={C.ink} strokeWidth="5" strokeLinecap="round" />
        <path d="M258 122 Q207 200 258 278" fill="none" stroke={C.grey} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* ciliary body and the fine fibres that hold the lens */}
      <g style={dim(on("lens"))}>
        <circle cx="266" cy="118" r="8" fill={C.mist} stroke={C.grey} strokeWidth="2" />
        <circle cx="266" cy="282" r="8" fill={C.mist} stroke={C.grey} strokeWidth="2" />
        <path d="M272 124 L290 152 M272 276 L290 248" stroke={C.grey} strokeWidth="1.6" fill="none" />
      </g>
      {/* iris */}
      <g style={dim(on("iris"))}>
        <path d="M256 122 L266 164 M256 278 L266 236" stroke={C.orange} strokeWidth="13" strokeLinecap="round" fill="none" />
      </g>
      {/* pupil marker: only drawn dashed when this part is the focus */}
      <g style={dim(on("pupil"))}>
        <path d="M274 168 L274 232" stroke={C.orangeDark} strokeWidth="2.5" strokeDasharray="5 5" fill="none" opacity={focus?.includes("pupil") ? 1 : 0} />
      </g>
      {/* lens, with a milky overlay that fades in for a cataract */}
      <g style={{ ...dim(on("lens")), display: showLens ? undefined : "none" }}>
        <ellipse cx="294" cy="200" rx="24" ry="50" fill={C.white} stroke={C.grey} strokeWidth="3" />
        <ellipse cx="294" cy="200" rx="24" ry="50" fill={C.cloud} stroke="none" style={{ opacity: cloud * 0.92, transition: "opacity 300ms cubic-bezier(0.23,1,0.32,1)" }} />
        <ellipse cx="288" cy="188" rx="9" ry="16" fill={C.white} style={{ opacity: cloud * 0.5, transition: "opacity 300ms cubic-bezier(0.23,1,0.32,1)" }} />
      </g>
      {/* retina and optic nerve */}
      <g style={dim(on("retina"))}>
        <path d="M262 121 A126 126 0 1 1 262 279" fill="none" stroke={C.orangeDark} strokeWidth="6" strokeLinecap="round" />
      </g>
      <g style={dim(on("nerve"))}>
        <path d="M484 190 Q520 188 566 196 L566 212 Q520 214 484 210Z" fill={C.white} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
      </g>
      {children}
    </g>
  );
}

/** A numbered, pointer-only marker. Keyboard and screen-reader users use the list of buttons. */
export function Marker({ n, x, y, to, on }: { n: number; x: number; y: number; to?: [number, number]; on: boolean }) {
  return (
    <g aria-hidden="true">
      {to && <line x1={x} y1={y} x2={to[0]} y2={to[1]} stroke={on ? C.orangeDark : C.ink} strokeWidth="2" />}
      {to && <circle cx={to[0]} cy={to[1]} r="3.5" fill={on ? C.orangeDark : C.ink} />}
      <g transform={`translate(${x} ${y})`}>
        <circle r="14" fill={on ? C.orangeDark : C.white} stroke={on ? C.orangeDark : C.ink} strokeWidth="2.5" />
        <text textAnchor="middle" dy="5.5" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" fill={on ? C.white : C.ink}>
          {n}
        </text>
      </g>
    </g>
  );
}
