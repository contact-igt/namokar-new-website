import type { Metadata } from "next";
import { ARTICLES } from "../content/articles";
import { TESTIMONIALS } from "../content/testimonials";
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
  home: { path: LINKS.home, label: "Home", reviewed: false, blocker: "Phone, credentials, address and photographs pending" },
  about: { path: LINKS.about, label: "About Us", reviewed: false, blocker: "Credentials and photographs pending" },
  doctor: { path: LINKS.doctor, label: "Dr. Poonam Jain", reviewed: false, blocker: "Credential wording, biography and portrait pending" },
  services: { path: LINKS.allServices, label: "Our Services", reviewed: false, blocker: "Service scope pending clinician sign-off" },
  cataract: { path: LINKS.cataract, label: "Cataract Surgery", reviewed: false, blocker: "Medical wording pending clinician sign-off" },
  glaucoma: { path: LINKS.glaucoma, label: "Glaucoma Management", reviewed: false, blocker: "Medical wording pending clinician sign-off" },
  exams: { path: LINKS.exams, label: "Comprehensive Eye Examinations", reviewed: false, blocker: "Scope of examinations and medical wording pending" },
  eyelid: { path: LINKS.eyelid, label: "Eyelid Surgery (Blepharoplasty)", reviewed: false, blocker: "Medical wording pending clinician sign-off" },
  aesthetic: { path: LINKS.aesthetic, label: "Aesthetic Oculoplasty", reviewed: false, blocker: "Offered treatments (e.g. injectables) not confirmed; wording pending" },
  reconstructive: { path: LINKS.reconstructive, label: "Reconstructive Oculoplasty", reviewed: false, blocker: "Scope of conditions treated pending clinician sign-off" },
  international: { path: LINKS.international, label: "International Patients", reviewed: false, blocker: "What help the centre actually offers to travelling patients is unconfirmed" },
  testimonials: { path: LINKS.testimonials, label: "Patient Reviews", reviewed: false, blocker: "No consented, traceable reviews supplied" },
  blogs: { path: LINKS.blogs, label: "Health Articles", reviewed: false, blocker: "No clinician-reviewed articles supplied" },
  videos: { path: "/videos", label: "Eye Care Videos & Insights", reviewed: false, blocker: "No approved videos yet; page is hidden until at least three are approved" },
  contact: { path: LINKS.contact, label: "Contact Us", reviewed: false, blocker: "Phone number, hours and map pin unconfirmed" },
  privacy: { path: LINKS.privacy, label: "Privacy Policy", reviewed: false, blocker: "Legal text not approved" },
  terms: { path: LINKS.terms, label: "Terms and Conditions", reviewed: false, blocker: "Legal text not approved" },
};

/**
 * Search indexing is off for the whole site until launch. Set the SERVER variable
 * ALLOW_INDEXING=on at launch; pages still need `reviewed: true` to be indexed.
 */
export const ALLOW_INDEXING = process.env.ALLOW_INDEXING === "on";

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
      return TESTIMONIALS.length > 0;
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
