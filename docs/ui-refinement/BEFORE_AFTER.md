# Before and after

19 Oct 2026. Screenshots: `screenshots/before/` (baseline, taken before any change) and `screenshots/after/` (final). They show unapproved photographs from the private review, so the folder is git-ignored; keep it private.

## Issues found in the baseline and what was done

| # | Issue (evidence in `before/`) | Fix |
|---|---|---|
| 1 | Homepage "Find care" labels were six small pills; hovering only underlined a label, no image or description (`before/home-1440-hover-glaucoma-chip.jpg`) | Treatment explorer: list plus shared preview on desktop, picture cards on touch; each label a real link |
| 2 | Orange "Preview only: not approved" label on every picture, video and illustration | Removed; one small "Local design review" badge links to a private `/review` index of everything pending |
| 3 | Hero text column had a large dead gap above the buttons (slides sized to the tallest copy) and the four tabs wrapped onto two lines on phones | Shortened the longest slide copy; shorter tab labels; tighter tab spacing |
| 4 | White, flat backgrounds throughout | Three quiet gradients (warm hero wash, pearl sections, graphite bands) |
| 5 | Page titles beside a photograph set in four lines on desktop | Size tuned to two or three lines |
| 6 | Home video section: a vertical clip sat alone in a half-empty row | Wide video and vertical clip side by side |
| 7 | Hover feedback inconsistent across buttons, FAQ, dropdown | Shared restrained states (see MOTION_CHANGELOG.md) |
| 8 | **Security:** from another device on the Wi-Fi, a forged `Host: localhost` header could read pending media and the preview; the image optimizer cache could hand out a copy made for a local request | Review servers listen on 127.0.0.1 only; forwarded-address check; the proxy refuses optimizer requests for pending media unless local (QA_REPORT.md) |
| 9 | Dev console warning (logo flagged as LCP) from a duplicate logo `src` | Test ignores this documented dev-only false positive; production unaffected |

## Index

| Page | Before 390 / 1440 | After 390 / 1440 |
|---|---|---|
| Home | `before/home-390-fold.jpg`, `home-1440-fold.jpg` (+ `-full`) | `after/home-390-fold.jpg`, `home-1440-fold.jpg` (+ `-full`) |
| Our Services, Cataract, Glaucoma, Eyelid, About, Doctor, Contact | `before/<page>-<width>-fold.jpg`, `-full.jpg` | `after/<page>-<width>-fold.jpg`, `-full.jpg` |
| Explorer, desktop hover on each treatment | n/a | `after/states/explorer-1440-hover-1…6.jpg` |
| Explorer, keyboard focus | n/a | `after/states/explorer-1440-keyboard-focus.jpg` |
| Explorer at 375, 390, 430, 768, 1024 | n/a | `after/states/explorer-<width>.jpg`, `home-<width>-fold.jpg` |
| Services and Cataract at 768 and 1024 | n/a | `after/states/our-services-768-fold.jpg` and similar |
| Interaction videos | n/a | `demos/treatment-explorer-desktop-hover.mp4`, `demos/treatment-explorer-mobile-swipe-tap.mp4` |

## Left as it is (and why)

- The lower "Our specialised services" section on the home page now repeats the six areas the explorer already lists. It was kept (it is existing, reviewed structure and links to the services hub); it is the first thing to simplify if you want a shorter home page.
- No copy was rewritten; the only wording changes are two shorter hero slide lines and shorter tab labels (listed above) for layout.
