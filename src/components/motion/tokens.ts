/**
 * One motion vocabulary for the whole site, kept deliberately small.
 *
 *  - Strong ease-out for everything that responds to a tap or a click (starts fast, feels
 *    immediate); never ease-in on UI.
 *  - 150 to 300 ms for UI, never longer for a response to the visitor's own action.
 *  - Animate transform and opacity only.
 *  - Press feedback scales to 0.97, never 0; things enter from 0.96 and 8 px, not from nothing.
 *  - Stagger is short (40 ms) so lists never feel slow.
 *  - Reduced motion: scripts check prefers-reduced-motion and skip animation; CSS honours the
 *    same preference (see globals.css).
 *  - Simple state changes are CSS (transition or keyframes); Motion's small WAAPI build
 *    (motion/mini) drives the surgery-steps picture, where the sequence is genuinely interactive.
 * These match the CSS custom property --ease in globals.css.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

export const DUR = { press: 0.12, ui: 0.2, panel: 0.28, scene: 0.45 } as const;

