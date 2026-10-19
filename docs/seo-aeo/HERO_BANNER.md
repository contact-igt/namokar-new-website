# Home page banner (four slides)

18 Oct 2026. Code: `src/components/Hero.tsx`, banner shots in `src/app/page.tsx`, styles in `src/app/globals.css` (`.hero-track`, `.hero-card`, `.hero-ctrl`).

## What it does

A four-slide, image-scrolling banner. The photograph track scrolls sideways with native scroll-snap, so a swipe, a trackpad scroll, the Previous and Next buttons, the arrow keys and the four tabs all work. The message beside the picture changes with it.

| # | Tab | Heading | Message | Link | Photograph (first one cleared for use is shown) |
|---|---|---|---|---|---|
| 1 | Our centre | Specialist Eye Care, Centred Around You. | Comprehensive eye care and specialist oculoplasty in Ashok Vihar, New Delhi. | About the centre | Reception, else the street front |
| 2 | Cataract care | Cataract Care, Explained Clearly. | Careful assessment of your vision and a clear discussion of your treatment options. | About cataract surgery | Theatre (cataract page cover), else another theatre view |
| 3 | Comprehensive care | Eye Check-Ups to Glaucoma Care. | Routine eye examinations, and regular monitoring for conditions such as glaucoma, explained in plain language. | Eye examinations and glaucoma | Slit-lamp consultation shot, else the consultation room, else an examination-room door |
| 4 | Oculoplasty | Specialist Care for Your Eyelids. | Oculoplasty for drooping eyelids, watering eyes, heavy eyelids and under-eye bags. | Oculoplasty care | Standing doctor shot, else a theatre corner |

The copy repeats only statements the site already makes elsewhere. The word "hospital" is not used: the site calls the place a centre throughout.

## Decisions that follow the project rules

- **No autoplay.** The project rule is "no autoplay carousels", and nothing moves unless the visitor acts. If the client wants slides to advance by themselves, that needs an explicit decision, a visible pause control and a reduced-motion override.
- **Reduced motion.** Smooth scrolling applies only when the visitor has not asked for reduced motion (CSS and script both check).
- **Only approved photographs.** Every picture goes through `AssetImage` and the media registry. Today **none is approved**, so:
  - default build: no photograph at all; the banner keeps the existing "Visit the centre" panel (logo, address, phone, directions) and the four messages still change with the tabs;
  - if some photographs are approved and others not, a slide without a cleared picture shows a plain graphite brand card (centre name and the slide's title), never an empty frame;
  - local review preview: all four slides show real photographs, each with the orange "Preview only: not approved" tag.
- **Approving or withholding one photograph never breaks the banner.** Each slide lists fallbacks in order.
- The single `<h1>` stays the centre's name; the four slide headings are `h2`.

## Accessibility

Carousel and slide roles with "n of 4" labels; the photograph track is keyboard-focusable (left and right arrow keys); buttons are 44 px; hidden messages are `inert`; no horizontal page scroll.

## Tested (local review preview, 18 Oct 2026, Playwright, Chromium)

At 390 px and 1440 px: Next moves 1→2→3→4 and the message and tab follow; Next from slide 4 wraps to 1; Previous from 1 wraps to 4; clicking a tab scrolls to that slide; ArrowRight on the track advances; scrolling the track by hand updates the message; no horizontal overflow; smallest control 44 px; no console errors. A race found during testing (the message flickered back to the slide being left while a button-driven scroll was in progress) was fixed with a scroll lock released by touch or wheel.
Screenshots: `screenshots/hero/` (`390-slide-1…4.png`, `1440-slide-1…4.png`).

## Not tested

Real phones (swipe feel, iOS rubber-banding), a screen reader, Lighthouse.

## Approval blockers

Reception photograph needs the receptionist's consent; doctor photographs (slides 3 and 4) need Dr. Poonam Jain's approval; theatre photographs need client approval (MEDIA_APPROVAL_CATALOGUE.md). The slide copy needs the client's wording sign-off like all other copy.
