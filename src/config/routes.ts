import type { Metadata } from "next";
import { ARTICLES } from "../content/articles";
import { REVIEWS_ALLOWED, TESTIMONIALS } from "../content/testimonials";
import { libraryAvailable } from "../content/videos";
import { LINKS, PRIVACY_URL, SERVICES } from "./site";

/**
 * Route registry: the one place that says which pages exist and whether they are cleared
 * for search engines. Navigation, footer, sitemap, robots and page metadata all read it,
 * so a page cannot be advertised unless it is implemented here.
 *
 * `reviewed: false` means the page's content (medical wording, credentials, contact facts or
 * legal text) has not been signed off. Such a page is never offered to search engines.
 * Flip a page to `true` only after the sign-off is recorded in
 * docs/NAMOKAR_CONTENT_VERIFICATION.md.
 */
export type PageKey =
  | "home"
  | "about"
  | "doctor"
  | "services"
  | "cataract"
  | "glaucoma"
  | "exams"
  | "eyelid"
  | "aesthetic"
  | "reconstructive"
  | "international"
  | "testimonials"
  | "blogs"
  | "videos"
  | "contact"
  | "privacy"
  | "terms";

export type PageDef = { path: string; label: string; reviewed: boolean; blocker: string };

export const PAGES: Record<PageKey, PageDef> = {
  // `reviewed: true` below rests on the project owner's statement (20 Oct 2026) that the client's
  // medical and legal teams cleared the website content for release; no document was seen.
  home: { path: LINKS.home, label: "Home", reviewed: true, blocker: "Released on the owner's confirmation" },
  about: { path: LINKS.about, label: "About Us", reviewed: true, blocker: "Released on the owner's confirmation" },
  doctor: { path: LINKS.doctor, label: "Dr. Poonam Jain", reviewed: true, blocker: "Released on the owner's confirmation; the registration number has not been supplied, so none is shown (see DOCTOR_REGISTRATION)" },
  services: { path: LINKS.allServices, label: "Our Services", reviewed: true, blocker: "Released on the owner's confirmation" },
  cataract: { path: LINKS.cataract, label: "Cataract Surgery", reviewed: true, blocker: "Released on the owner's confirmation" },
  glaucoma: { path: LINKS.glaucoma, label: "Glaucoma Management", reviewed: true, blocker: "Released on the owner's confirmation" },
  exams: { path: LINKS.exams, label: "Comprehensive Eye Examinations", reviewed: true, blocker: "Released on the owner's confirmation" },
  eyelid: { path: LINKS.eyelid, label: "Eyelid Surgery (Blepharoplasty)", reviewed: true, blocker: "Released on the owner's confirmation" },
  aesthetic: { path: LINKS.aesthetic, label: "Aesthetic Oculoplasty", reviewed: true, blocker: "Released on the owner's confirmation" },
  reconstructive: { path: LINKS.reconstructive, label: "Reconstructive Oculoplasty", reviewed: true, blocker: "Released on the owner's confirmation" },
  international: { path: LINKS.international, label: "International Patients", reviewed: true, blocker: "Released on the owner's confirmation" },
  testimonials: { path: LINKS.testimonials, label: "Patient Reviews", reviewed: false, blocker: "Withheld: no reviews are published (REVIEWS_ALLOWED=false)" },
  blogs: { path: LINKS.blogs, label: "Health Articles", reviewed: false, blocker: "No articles supplied" },
  videos: { path: "/videos", label: "Eye Care Videos & Insights", reviewed: true, blocker: "Appears when at least three videos are approved and playable" },
  contact: { path: LINKS.contact, label: "Contact Us", reviewed: true, blocker: "Released on the owner's confirmation" },
  privacy: { path: LINKS.privacy, label: "Privacy Policy", reviewed: false, blocker: "Legal text not approved" },
  terms: { path: LINKS.terms, label: "Terms and Conditions", reviewed: false, blocker: "Legal text not approved" },
};

/**
 * Search indexing: ON for a production deployment on Vercel (VERCEL_ENV=production) and wherever the
 * SERVER variable ALLOW_INDEXING=on is set; OFF in development, previews and anywhere else, and off
 * everywhere when ALLOW_INDEXING=off. A page is also indexed only if it is `reviewed` and has content.
 */
export const ALLOW_INDEXING =
  process.env.ALLOW_INDEXING === "on" ||
  (process.env.VERCEL_ENV === "production" && process.env.ALLOW_INDEXING !== "off");

/**
 * Is there real content behind the page? An empty reviews or articles page, a video library
 * with fewer than three approved videos (it answers 404) and the two legal drafts are never
 * offered to search engines, even at launch, until they hold approved content.
 */
export const contentReady = (key: PageKey): boolean => {
  switch (key) {
    case "videos":
      return libraryAvailable();
    case "testimonials":
      return REVIEWS_ALLOWED && TESTIMONIALS.length > 0;
    case "blogs":
      return ARTICLES.length > 0;
    case "privacy":
    case "terms":
      return PRIVACY_URL !== null; // set only when the legal adviser's text is approved
    default:
      return true;
  }
};

export const indexable = (key: PageKey) => ALLOW_INDEXING && PAGES[key].reviewed && contentReady(key);

/** Robots metadata for a page. */
export const robotsFor = (key: PageKey): Metadata["robots"] =>
  indexable(key) ? { index: true, follow: true } : { index: false, follow: false };

export type NavChild = { label: string; href: string };
export type NavItem = { key: string; label: string; href?: string; children?: NavChild[] };

/** Primary navigation. Only implemented pages appear. Dropdown groups keep the bar uncrowded. */
export function buildNav(): NavItem[] {
  return [
    { key: "home", label: "Home", href: PAGES.home.path },
    {
      key: "about",
      label: "About",
      children: [
        { label: "About Us", href: PAGES.about.path },
        { label: "Dr. Poonam Jain", href: PAGES.doctor.path },
      ],
    },
    {
      key: "services",
      label: "Services",
      children: [
        ...SERVICES.map((s) => ({ label: s.title, href: s.href })),
        { label: "View all services", href: PAGES.services.path },
      ],
    },
    { key: "international", label: "International Patients", href: PAGES.international.path },
    { key: "contact", label: "Contact Us", href: PAGES.contact.path },
  ];
}

/**
 * Pages offered in the footer's "More" list. Articles and reviews are listed only when real,
 * approved content exists (pass the counts from the content modules).
 */
export function footerMore(has: { articles: boolean; testimonials: boolean; videos?: boolean }): NavChild[] {
  const more: NavChild[] = [];
  if (has.articles) more.push({ label: PAGES.blogs.label, href: PAGES.blogs.path });
  if (has.videos) more.push({ label: PAGES.videos.label, href: PAGES.videos.path });
  if (has.testimonials) more.push({ label: PAGES.testimonials.label, href: PAGES.testimonials.path });
  return more;
}
