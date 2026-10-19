# Design QA

Reviewed in screenshots under `screenshots/`. Findings and what changed:

- **Navigation:** the old header linked service pages on the WordPress site. It now has grouped dropdowns (About, Services) built as real buttons with arrow-key, Escape and outside-click support and a short hover delay so the menu does not flicker.
- **Service pages:** one shared template plus a different editorial section per page (lenses band, "silent" statement band, definition list, functional/cosmetic comparison, questions to ask, terms in plain words). Fixed: dark-on-dark body text in the graphite bands (found by eye and by the contrast sweep).
- **Doctor page:** name plate fallback keeps the page complete without a portrait.
- **Empty states:** Reviews and Articles explain why they are empty instead of showing placeholders; both are left out of navigation.
- **Legal drafts:** presented as review-only with a "Draft for review" banner, facts about how the site behaves, and the topics the lawyer's text must cover. No invented legal wording.
- **Unresolved design points:**
  - Without approved photographs the site is text-led. The hero uses a "Visit the centre" panel; pages are clean but plain.
  - `/gallery` is not built.
  - The six service pages share a common frame; their variation is in one section each.
  - Typography was tested for contrast and size only; no older-patient user testing.
