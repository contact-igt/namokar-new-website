import { C } from "./EyeBase";

/**
 * A plain, abstract street scene drawn only in the brand palette. It stands in for "what you
 * are looking at" in the vision illustrations. No people, no signage text, no real place.
 */
export default function Scene({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 640 360" className="scene" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-sun`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={C.orange} stopOpacity="0.55" />
          <stop offset="1" stopColor={C.orange} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="360" fill={C.porcelain} />
      <circle cx="500" cy="92" r="92" fill={`url(#${id}-sun)`} />
      <circle cx="500" cy="92" r="36" fill={C.orange} />
      {/* buildings */}
      <rect x="40" y="130" width="96" height="170" fill={C.ink} />
      <rect x="150" y="96" width="80" height="204" fill={C.soft} />
      <rect x="244" y="150" width="110" height="150" fill={C.ink} />
      <g fill={C.porcelain} opacity="0.9">
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={56 + c * 28} y={148 + r * 38} width="16" height="22" />),
        )}
        {[0, 1, 2, 3].map((r) => [0, 1].map((c) => <rect key={`b${r}${c}`} x={166 + c * 30} y={112 + r * 40} width="16" height="22" />))}
      </g>
      {/* a tree */}
      <rect x="406" y="190" width="10" height="110" fill={C.ink} />
      <circle cx="411" cy="176" r="42" fill={C.soft} />
      {/* a road sign: a plain orange disc on a post */}
      <rect x="562" y="170" width="8" height="130" fill={C.ink} />
      <circle cx="566" cy="160" r="30" fill={C.orangeDark} />
      <rect x="548" y="154" width="36" height="12" fill={C.white} />
      {/* road */}
      <rect y="300" width="640" height="60" fill={C.ink} />
      <g fill={C.porcelain}>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={30 + i * 130} y="326" width="70" height="8" />
        ))}
      </g>
    </svg>
  );
}
