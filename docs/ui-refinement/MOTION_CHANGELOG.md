# Motion changelog

19 Oct 2026. Existing tokens kept (`src/components/motion/tokens.ts`, `--ease: cubic-bezier(0.23, 1, 0.32, 1)`): strong ease-out, transform and opacity only, press scale about 0.97 to 0.985, reduced motion honoured. No new library; Motion for React was not needed for these changes (the explorer's state is a plain React state swap with CSS transitions), so the JavaScript did not grow (161 KB per page before and after).

| Change | Where | Duration | Why | Reduced motion |
|---|---|---|---|---|
| Preview photograph crossfade and 3.5 % settle zoom | Treatment explorer, desktop mouse | 240 ms fade, 700 ms zoom | Shows which treatment is selected without a jump; interruptible (CSS) | off |
| Preview info card rise (6 px) | same | 240 ms | Signals the text changed | off |
| Active row bar (scaleY) and arrow slide | same | 200 ms | Selected state that works for mouse and keyboard | off |
| Hover intent delay (70 ms) | same | n/a | Stops flicker when sweeping towards the preview | unchanged |
| Card lift (2 px), photo zoom 1.04, arrow nudge, press scale 0.985 | Treatment cards (fine pointer only) | 160 to 260 ms | Purposeful feedback; never on touch | off |
| Arrow nudge on buttons and text links | `.btn`, `.text-link` | 180 ms | Affordance for "goes somewhere"; fine pointer only | off |
| FAQ answer fade-in | `.faq[open]` | 220 ms | Opening feels connected | off |
| Dropdown link tint | Header submenu | 140 ms | Clear hover target | off |
| Warm gradients | Hero, page heroes, pearl sections, graphite bands | static | Atmosphere without motion | n/a |
| **Removed:** orange "Preview only" labels on every picture, video and figure | Everywhere | n/a | Distracting in the design review (see QA_REPORT.md) | n/a |
| **Kept:** hero banner scroll-snap, desktop photograph parallax (up to 18 px, rAF, fine pointer only), figure animations, page entrance on navigation | unchanged | unchanged | Already tuned and tested | off |

Not added, on purpose: autoplay, cursor effects, scroll hijacking, backdrop blur surfaces, infinite loops.
