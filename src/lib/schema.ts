import { SITE, type ServiceKey } from "@/config/site";

/**
 * schema.org builders. Every field here is a fact the site already states elsewhere and that
 * is not in dispute. Deliberately absent until the client confirms them: telephone (conflict
 * C1), opening hours, ratings and reviews, sameAs profiles, images of unapproved photographs,
 * the doctor's degrees and training (wording unconfirmed), prices, and any claim of
 * accreditation. See docs/seo-aeo/STRUCTURED_DATA.md.
 */
const ORIGIN = SITE.origin;
export const ids = {
  clinic: `${ORIGIN}/#clinic`,
  website: `${ORIGIN}/#website`,
  physician: `${ORIGIN}/dr-poonam-jain#physician`,
};
const url = (path: string) => `${ORIGIN}${path}`;
export const CTX = "https://schema.org";

/** Flip to true only after the clinic confirms the number (conflict C1). */
const PHONE_CONFIRMED = false;

export function clinic() {
  return {
    "@context": CTX,
    "@type": "MedicalClinic",
    "@id": ids.clinic,
    name: SITE.name,
    url: `${ORIGIN}/`,
    medicalSpecialty: "Ophthalmology",
    ...(PHONE_CONFIRMED ? { telephone: SITE.phone.tel } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: { "@type": "AdministrativeArea", name: "Delhi, India" },
  };
}

export function website() {
  return {
    "@context": CTX,
    "@type": "WebSite",
    "@id": ids.website,
    url: `${ORIGIN}/`,
    name: SITE.name,
    inLanguage: "en-IN",
    publisher: { "@id": ids.clinic },
  };
}

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "MedicalWebPage" | "CollectionPage" | "ProfilePage";

export function webPage(opts: {
  type?: PageType;
  path: string;
  name: string;
  description: string;
  about?: { type: "MedicalCondition" | "MedicalProcedure"; name: string };
  mainEntityId?: string;
  /** Set only when a named clinician has signed the page off (PAGES[key].review). */
  review?: { by: string; on: string };
}) {
  return {
    "@context": CTX,
    "@type": opts.type ?? "WebPage",
    "@id": `${url(opts.path)}#webpage`,
    url: url(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": ids.website },
    publisher: { "@id": ids.clinic },
    ...(opts.about ? { about: { "@type": opts.about.type, name: opts.about.name } } : {}),
    ...(opts.mainEntityId ? { mainEntity: { "@id": opts.mainEntityId } } : {}),
    ...(opts.review
      ? { lastReviewed: opts.review.on, reviewedBy: { "@type": "Person", name: opts.review.by } }
      : {}),
  };
}

export function physician() {
  return {
    "@context": CTX,
    "@type": "Physician",
    "@id": ids.physician,
    name: "Dr. Poonam Jain",
    jobTitle: "Medical Director and Senior Ophthalmologist",
    medicalSpecialty: "Ophthalmology",
    url: url("/dr-poonam-jain"),
    worksFor: { "@id": ids.clinic },
  };
}

export function breadcrumbs(trail: { name: string; path?: string }[]) {
  return {
    "@context": CTX,
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      ...(t.path ? { item: url(t.path) } : {}),
    })),
  };
}

export function faqPage(path: string, items: { q: string; a: string }[]) {
  return {
    "@context": CTX,
    "@type": "FAQPage",
    "@id": `${url(path)}#faq`,
    url: url(path),
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function itemList(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": CTX,
    "@type": "ItemList",
    name,
    itemListElement: items.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, url: url(x.path) })),
  };
}

/** What each service page is about, in the plainest schema.org terms. Names only. */
export const SERVICE_ABOUT: Record<ServiceKey, { type: "MedicalCondition" | "MedicalProcedure"; name: string } | undefined> = {
  cataract: { type: "MedicalCondition", name: "Cataract" },
  glaucoma: { type: "MedicalCondition", name: "Glaucoma" },
  exams: { type: "MedicalProcedure", name: "Comprehensive eye examination" },
  eyelid: { type: "MedicalProcedure", name: "Blepharoplasty (eyelid surgery)" },
  aesthetic: undefined,
  reconstructive: { type: "MedicalCondition", name: "Ptosis (drooping eyelid)" },
};
