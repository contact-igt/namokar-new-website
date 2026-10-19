/**
 * Legacy URL map for the move from the WordPress site to this one.
 *
 * Source of truth for the legacy list: the live site's own wp-sitemap (read 18 Oct 2026):
 * 21 pages, 2 posts, 1 category and 1 form. Pages that keep their address (about-us,
 * our-services, testimonials, international-patients, blogs, contact-us, dr-poonam-jain and
 * the six service pages) need no rule here: Next.js already sends "/about-us/" to "/about-us"
 * with a permanent 308. Details and the reasoning: docs/seo-aeo/REDIRECT_MAP.md.
 *
 * `permanent: false` marks a destination the client has not confirmed yet. Switch to true at
 * launch once the client has decided. This file has no imports so next.config.ts can read it.
 */
export type LegacyRedirect = { source: string; destination: string; permanent: boolean; note: string };

export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  {
    source: "/cataract-namokar",
    destination: "/stitchless-cataract-surgery",
    permanent: true,
    note: "Old cataract landing page; the cataract page is its direct successor.",
  },
  {
    source: "/oculoplasty-namokar",
    destination: "/our-services",
    permanent: true,
    note: "Old oculoplasty landing page; the services hub explains both oculoplasty groups.",
  },
  {
    source: "/detailed-page",
    destination: "/dr-poonam-jain",
    permanent: false,
    note: "Old page titled Doctor_details. Destination to be confirmed.",
  },
  ...["/squint-adult-paediatric", "/refractive-surgery-lasik-icl", "/paediatric-eye-care", "/myopia-control", "/cornea-services"].map(
    (source): LegacyRedirect => ({
      source,
      destination: "/our-services",
      permanent: false,
      note: "Service not in the agreed six. Client to say whether it is offered (then it needs its own page) or to be retired.",
    }),
  ),
];
