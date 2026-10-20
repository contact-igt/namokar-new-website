# Namokar website design system

This reference records the design language currently implemented in the website. Use it when adding pages or components so that new work remains visually and behaviourally consistent.

## Design direction

The site is a calm, hospital-first clinical design: clear, measured and reassuring rather than decorative. It pairs warm orange brand accents with deep graphite type and generous white space. Imagery, diagrams and information carry the visual weight; interface chrome stays quiet.

Key characteristics:

- White and porcelain reading surfaces with thin cool-grey borders.
- Orange is an accent and action colour, never ordinary body text.
- Deep graphite provides headings, body copy and high-contrast structure.
- Corners are restrained: 6 px for controls and 10 px for larger cards.
- Content sits in a 1200 px maximum-width container with 20 px gutters.
- The layout is mobile-first, with responsive type and fixed mobile actions kept within thumb reach.

## Colour palette

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Brand accent | `--orange` | `#D66B1F` | Rules, small details and accents. Do not use for normal text. |
| Primary action | `--orange-dark` | `#A9440D` | Primary buttons, orange text with sufficient contrast, phone quick action. |
| Pressed action | `--orange-darker` | `#8E3A0B` | Primary-button hover and pressed states. |
| Accent on dark | `--orange-light` | `#F0A468` | Orange details only against graphite. |
| Warm surface | `--orange-mist` | `#FFF2E8` | Small highlighted backgrounds. |
| Primary ink / graphite | `--ink`, `--graphite` | `#243238` | Headings, body copy, dark controls. |
| Deep graphite | `--graphite-deep` | `#1B2529` | Deep dark surfaces and gradients. |
| Supporting text | `--ink-soft` | `#55616A` | Lead text and secondary copy. |
| Page white | `--white` | `#FFFFFF` | Main reading background. |
| Quiet surface | `--porcelain` | `#F7F9FA` | Alternating sections and quiet cards. |
| Divider | `--line` | `#E5E9EA` | Borders and structural separators. |

### Gradients

Use gradients only as low-contrast atmosphere behind content:

- `--grad-hero`: warm white/orange-tinted hero background.
- `--grad-pearl`: subtle white, porcelain and warm-mist surface.
- `--grad-graphite`: deep graphite with a restrained orange glow.

Never place low-contrast text over these gradients without checking readability.

## Typography

| Element | Typeface | Styling |
| --- | --- | --- |
| Headings, service titles, FAQs | Manrope | Strong 700-800 weight, tight negative tracking, compact line-height. |
| Body, forms, navigation and labels | Inter | 17 px base size, 1.65 line-height. |
| H2 | Manrope | `clamp(1.75rem, 7.4vw, 2rem)`, 800 weight, 1.18 line-height. |
| H3 | Manrope | 1.25 rem, 700 weight, 1.3 line-height. |
| Lead | Inter | 1.125 rem, `--ink-soft`, 1.6 line-height, maximum 56 characters. |
| Kicker | Inter | 14 px, 700 weight, uppercase, 0.06 em tracking, orange-dark with a 28 x 3 px orange rule. |

Use `text-wrap: balance` for display headings and `text-wrap: pretty` for paragraphs. Do not use all caps for long headings or body copy.

## Layout and surfaces

- `.container` is full width up to 1200 px and has safe-area-aware 20 px side gutters.
- Standard page sections use white; alternate with `.section--porcelain` for rhythm.
- `.section--graphite` is the dark contrast band. Its heading and body text invert to white/soft light tones; orange-light is reserved for its accent details.
- Borders use `--line`, not dark strokes. Shadows are soft and low-opacity.
- Use visual cards for grouped clinical information, not as a default wrapper around every paragraph.

## Buttons, links and interaction

Primary CTA:

- `--orange-dark` background, white text, 52 px minimum height, 6 px radius.
- Horizontal padding is 24 px; icon-to-label gap is 10 px.
- Hover uses `--orange-darker`; pressed state scales to 98%.

Secondary CTA:

- White background, graphite text, restrained graphite border.
- Use it only beside a primary action where a second route is genuinely useful.

Text links remain underlined with a 2 px orange underline, offset by 6 px. Every keyboard focus state uses a 3 px graphite outline with a 3 px offset.

## Header, footer and navigation

- Header height token: 64 px. Anchor targets account for it with scroll padding.
- Navigation is concise, service-led and accessible: dropdowns work with pointer, keyboard and Escape.
- The header call action is a branded orange-dark button; phone data comes from the central site configuration.
- The footer is informational, using the logo, site links, services, contact details and directions. It should not make unapproved claims or invent social links.

## Quick actions

The root layout renders one shared quick-action component.

Desktop:

- Fixed right rail at 58% viewport height.
- 55 x 55 px tiles, 9 px vertical gap, rounded only on the left edge.
- WhatsApp, YouTube and phone appear in that order.
- The supplied icon artwork fills each tile; the phone tile background is exactly `--orange-dark` (`#A9440D`).

Mobile:

- A fixed 76 px safe-area-aware bottom bar with five equal actions: Phone, WhatsApp, YouTube, Book and Address.
- Every action has a 60 px minimum target, a 28 px icon and a 3 px icon-to-label gap.
- Body bottom padding reserves 82 px plus the device safe area, so content is never covered.

## Imagery and icons

- Use `next/image` for local raster assets and provide meaningful alt text; purely decorative interface icons use empty alt text.
- Clinical images should be clean, factual and relevant to the accompanying content. Avoid decorative stock imagery that weakens the clinical tone.
- Use the shared line-icon system for controls such as calendar, phone and location. Match its 1.75 px rounded stroke rather than introducing a new icon family.
- Supplied action PNGs are intended for the quick-action component; preserve their aspect ratio and do not recolour them with CSS filters.

## Motion and accessibility

- Use the shared `--ease` curve: `cubic-bezier(0.23, 1, 0.32, 1)`.
- Motion is short and functional: button press, subtle hover feedback and visual transitions only.
- Respect reduced-motion preferences through the existing motion utilities.
- Maintain visible focus states, 44 px or larger interactive targets, semantic landmark elements and screen-reader labels for icon-only controls.

## Avoid

- Heavy gradients, glass effects, large shadows or excessive rounded pills.
- Orange paragraphs or low-contrast text over photographic or gradient backgrounds.
- Promotional claims, unverifiable metrics, invented opening hours, unapproved channels or medical guarantees.
- New one-off colours, fonts, icon styles or spacing systems when an existing token or component already fits.

## Source of truth

- Design tokens and global patterns: `src/app/globals.css`
- Shared utility icons: `src/components/Icons.tsx`
- Quick actions: `src/components/QuickActions.tsx`
- Site contact and route configuration: `src/config/site.ts`
- Header and footer implementation: `src/components/Header.tsx`, `src/components/Footer.tsx`
