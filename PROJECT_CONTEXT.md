# Namo Car Project Context

## Technology stack
- Next.js 16.4.1 App Router, React 19.3, TypeScript 5; styling uses global CSS plus a homepage-scoped CSS module (no utility CSS framework).
- Runtime dependencies: Motion 14 (imported as `motion`), React Slick/Slick Carousel, Vercel package. Inter and Manrope are loaded with `next/font/google`.
- npm and pnpm lockfiles are present. Scripts: `dev`, `build`, `start`, `lint`; preview scripts enable review media.

## Structure and architecture
- `src/app/`: route segments, root layout, global CSS, metadata and route handlers (Next App Router).
- `src/components/`: shared site shell, forms, section and interaction components; `clinical/` contains reusable clinical illustrations.
- `src/config/`: site/contact constants, route registry and navigation, approved media registry, redirects and figure data.
- `src/content/`: structured service, article, video, testimonial, FAQ/why content.
- `src/lib/`: booking, lead delivery, treatment/photo selection, SEO/schema and video helpers.
- `public/images/`: 100 public image/icon assets. `private-assets/`: 59 controlled image/video assets, served through the media handler according to approval registry. `docs/` contains content, media, visual QA and launch records; `scripts/` contains audit utilities.

## Pages and routing
Next App Router page files exist for: home (/), about-us, dr-poonam-jain, our-services, stitchless-cataract-surgery, glaucoma-management, comprehensive-eye-examinations, eyelid-surgery-blepharoplasty, aesthetic-oculofacial, eye-plastic-reconstructive-surgery, international-patients, contact-us, testimonials, blogs and blogs/[slug], videos, review, thank-you, privacy-policy, terms-and-conditions. Also sitemap, robots, not-found and error routes. `src/config/routes.ts` is the route/navigation/indexability registry; content readiness and review status affect whether optional pages are advertised/indexed. `src/config/redirects.ts` feeds legacy redirects.

## Shell and homepage
- `src/app/layout.tsx` provides metadata/fonts, Slick CSS, global CSS, Header (with fallback), ReviewBadge, Footer, QuickActions and Clarity analytics script. `src/app/template.tsx` adds a small page transition on later navigations.
- Homepage order: Hero and statistics; TreatmentExplorer; centre showcase and FacilityGallery; WalkthroughSection; doctor showcase; VideoShelf; oculoplasty section; Why Namokar cards; FAQ; HomeCta; HomeAppointmentPopup.
- Shared visual/functional components include Header, Footer, QuickActions, ReviewBadge, AssetImage, BookButton/AppointmentForm, PageHero, ServiceLayout, Breadcrumb, FAQ/CTA, map, gallery and video components. Many service routes compose ServiceLayout and content modules.

## Styling and assets
- `src/app/globals.css` is the central, large mobile-first stylesheet for tokens and shared components. `src/app/home-redesign.module.css` scopes the redesigned homepage's deep teal, warm cream, white and orange presentation. Manrope headings and Inter body are retained. Responsive breakpoints include ~580, 680 and 960px; reduced-motion handling is present.
- Images/icons live mainly in `public/images/`; protected media metadata and approval live in `src/config/assets.ts`, with files in `private-assets/` exposed by `src/app/media/[file]/route.ts`. Logos, clinic/doctor photography, service images, illustrations and video posters are present. Icons are mostly inline SVG in components.
- Main visual owners: `src/app/page.tsx` (homepage composition and some inline section markup), `src/app/home-redesign.module.css`, `src/components/Hero.tsx`, `TreatmentExplorer.tsx`, `FacilityGallery.tsx`, `WalkthroughSection.tsx`, `VideoShelf.tsx`, `HomeCta.tsx`, `HomeAppointmentPopup.tsx`, `Header.tsx`, `Footer.tsx`, and `src/app/globals.css`. Service page appearance is shared through `ServiceLayout.tsx` and its section components.

## Functionality to preserve
- Appointment enquiry: `AppointmentForm.tsx` validates client-side and posts to `/api/appointment`; route enforces feature/config gates, origin/content-type/body checks, rate limiting, honeypot and server validation. Lead delivery tries configured Invictus endpoint then Google Sheets fallback (`src/lib/namokar-leads.ts`). Booking availability is environment/config dependent. Contact/call/map/WhatsApp links and thank-you flow are core conversions.
- Route registry drives navigation, footer links, sitemap/robots and SEO readiness. Structured data/metadata are generated through `src/lib/seo.ts`, `schema.ts`, and JsonLd.
- Media approval controls public rendering/deployment. Do not bypass `src/config/assets.ts` or its media route when changing asset use.
- Gallery, video playback, mobile nav/dropdowns, FAQ disclosures, treatment explorer, popup and motion/reduced-motion behavior are interactive.

## Redesign file map and risks
- Likely visual edits: `src/app/globals.css`, `src/app/page.tsx`, shared shell components in `src/components/`, and page-specific route files or `ServiceLayout.tsx`. Preserve `src/config/routes.ts`, `src/lib/appointment.ts`, `src/app/api/appointment/route.ts`, `src/lib/namokar-leads.ts`, SEO/schema wiring and asset approval unless a requested change requires them.
- Homepage still contains substantial inline SVG/icons and section markup, so some visual details are owned by the page rather than a standalone component. Global CSS has broad shared selectors; changes can affect many routes.
- Header/menu, booking gates and fallback delivery are behavioral dependencies. Asset files in `private-assets` are not ordinary public files; approvals and deployment tracing matter. Optional pages may intentionally be empty/withheld or return not-found until content is approved. Avoid changing route/SEO statuses as a styling-only redesign.
- Latest homepage redesign validation (11 Nov 2026): `npm run build` passed; Playwright checks at 1440px and 390px found no missing images, console errors or horizontal overflow.
