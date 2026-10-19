import { C } from "./EyeBase";

export type PlateName = "eyelid" | "aesthetic" | "tear";
type PlateCrop = "full" | "card" | "thumbnail";

const VIEWS: Record<PlateName, Record<PlateCrop, string>> = {
  eyelid: { full: "0 0 480 320", card: "48 26 384 268", thumbnail: "78 48 324 232" },
  aesthetic: { full: "0 0 480 320", card: "38 20 404 280", thumbnail: "62 42 356 248" },
  tear: { full: "0 0 480 320", card: "72 22 362 282", thumbnail: "105 48 320 238" },
};

/**
 * Small static vector plates used as treatment pictures where the centre has no suitable
 * photograph (eyelid surgery, aesthetic oculofacial care, tear passages). Original line art drawn
 * in code for this site, in the brand colours: no photograph, no generated image, no person, no
 * result. Pending medical review like every figure (src/config/figures.ts, plateEyelid,
 * plateAesthetic, plateTear): they only render in the local review preview until signed off.
 * Decorative: the surrounding link or caption carries the meaning, so they are aria-hidden.
 */
const W = 480;
const H = 320;

function Ground({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor={C.porcelain} />
          <stop offset="1" stopColor={C.mist} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id})`} />
    </>
  );
}

/** The front of an eye: lid margins, iris and pupil. */
function Eye({ cx = 240, cy = 176, s = 1 }: { cx?: number; cy?: number; s?: number }) {
  const x = (n: number) => cx + (n - 240) * s;
  const y = (n: number) => cy + (n - 176) * s;
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x(84)} ${y(176)} Q${x(240)} ${y(58)} ${x(396)} ${y(176)} Q${x(240)} ${y(272)} ${x(84)} ${y(176)}Z`} fill="#FFFFFF" stroke={C.ink} strokeWidth={5 * s} />
      <circle cx={cx} cy={y(172)} r={54 * s} fill={C.mist} stroke={C.ink} strokeWidth={4 * s} />
      <circle cx={cx} cy={y(172)} r={36 * s} fill="none" stroke={C.orange} strokeWidth={5 * s} opacity="0.85" />
      <circle cx={cx} cy={y(172)} r={20 * s} fill={C.ink} />
      <circle cx={x(226)} cy={y(158)} r={7 * s} fill="#FFFFFF" />
    </g>
  );
}

export function PlateEyelid({ crop = "full" }: { crop?: PlateCrop }) {
  return (
    <svg viewBox={VIEWS.eyelid[crop]} className="plate" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <Ground id="pg-eyelid" />
      {/* brow, eyelid fold and crease above the eye */}
      <path d="M92 96 Q240 18 388 96" fill="none" stroke={C.ink} strokeWidth="9" strokeLinecap="round" />
      <path d="M104 142 Q240 40 376 142" fill="none" stroke={C.grey} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="2 9" />
      <Eye />
      {/* the upper lid margin picked out in orange */}
      <path d="M84 176 Q240 58 396 176" fill="none" stroke={C.orange} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function PlateAesthetic({ crop = "full" }: { crop?: PlateCrop }) {
  return (
    <svg viewBox={VIEWS.aesthetic[crop]} className="plate" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <Ground id="pg-aesthetic" />
      {/* the area around the eye: brow above, the lower lid and the skin beneath */}
      <path d="M92 92 Q240 14 388 92" fill="none" stroke={C.ink} strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="240" cy="176" rx="190" ry="118" fill="none" stroke={C.orange} strokeWidth="3.5" strokeDasharray="3 10" strokeLinecap="round" />
      <Eye />
      <path d="M118 226 Q240 292 362 226" fill="none" stroke={C.grey} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="2 9" />
    </svg>
  );
}

export function PlateTear({ crop = "full" }: { crop?: PlateCrop }) {
  return (
    <svg viewBox={VIEWS.tear[crop]} className="plate" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <Ground id="pg-tear" />
      <Eye cx={188} cy={118} s={0.62} />
      {/* tear passages: two small openings by the inner corner, two canals, the sac and the duct */}
      <g fill="none" stroke={C.orangeDark} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M300 112 Q330 114 346 142" />
        <path d="M300 126 Q326 140 346 150" />
        <ellipse cx="352" cy="170" rx="13" ry="24" fill={C.mist} />
        <path d="M352 194 Q356 236 346 292" />
      </g>
      <circle cx="300" cy="112" r="5" fill={C.orangeDark} />
      <circle cx="300" cy="126" r="5" fill={C.orangeDark} />
      {/* the side of the nose, dotted */}
      <path d="M392 60 Q420 150 404 214 Q396 250 410 300" fill="none" stroke={C.grey} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="2 9" />
    </svg>
  );
}

export function Plate({ name, crop = "full" }: { name: PlateName; crop?: PlateCrop }) {
  return name === "eyelid" ? <PlateEyelid crop={crop} /> : name === "aesthetic" ? <PlateAesthetic crop={crop} /> : <PlateTear crop={crop} />;
}

export const PLATE_ALT: Record<PlateName, string> = {
  eyelid: "Line drawing of the front of an eye with the brow and the crease of the upper eyelid",
  aesthetic: "Line drawing of an eye with the brow, the lower lid and the area around the eye outlined",
  tear: "Line drawing of the tear passages: the small openings by the inner corner, the canals, the sac and the duct",
};
