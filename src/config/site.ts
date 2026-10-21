/**
 * Central, single source for contact details and outbound routes.
 *
 * Values here come from the published clinic website (namokareyecare.com) and are
 * flagged in docs/NAMOKAR_CONTENT_VERIFICATION.md where client confirmation is
 * still needed. Do not scatter phone numbers or URLs through components.
 */

const LIVE_ORIGIN = "https://namokareyecare.com";

export const SITE = {
  name: "Namokar Eye & Oculoplasty Centre",
  area: "Ashok Vihar, New Delhi",
  origin: LIVE_ORIGIN,
  // NEEDS CONFIRMATION: published number on the current live site. Internal notes
  // mention a common IVR number that has not been finalised.
  phone: { display: "+91 98104 19720", tel: "+919810419720" },
  address: {
    lines: ["13A, Pocket A, Phase 3", "Ashok Vihar, Delhi 110052"],
    landmark: "Near Satyawati College, opposite Madrina Restaurant",
    street: "13A, Pocket A, Phase 3, Ashok Vihar",
    locality: "Delhi",
    postalCode: "110052",
    country: "IN",
  },
} as const;

/** Home page title. */
export const HOME_TITLE = `Eye Specialist & Oculoplasty Centre in Ashok Vihar, Delhi | Namokar`;

/** Search and social description for the home page; the root layout and the home page both use it. */
export const HOME_DESCRIPTION =
  "Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi, offers comprehensive eye examinations, cataract and glaucoma care, and specialist oculoplasty led by Dr. Poonam Jain. Call to arrange a consultation.";

/**
 * Email is deliberately unset: the current live site shows no email.
 */
export const CHANNELS = {
  email: null as string | null,
  whatsapp: "919810157258",
} as const;

/**
 * Opening hours are NOT published until validated. The old site lists
 * "Monday to Saturday, 9 AM to 4 PM", which is a candidate only.
 */
export const HOURS: { approved: boolean; text: string | null } = {
  approved: false,
  text: null,
};

export const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Namokar Eye & Oculoplasty Centre, 13A Pocket A Phase 3, Ashok Vihar, Delhi 110052",
  );

/**
 * Map. `verifiedPinUrl` must be the clinic's Google Business Profile place link.
 * (An embedded map still needs a Google "Embed a map" URL for that place.)
 * Until it is set, the map is an address SEARCH (it may not land exactly on the entrance)
 * and the page says so.
 */
export const MAP = {
  verifiedPinUrl: null as string | null,
  embedUrl:
    "https://www.google.com/maps?output=embed&q=" +
    encodeURIComponent(
      "Namokar Eye & Oculoplasty Centre, 13A Pocket A Phase 3, Ashok Vihar, Delhi 110052",
    ),
} as const;

/** Internal routes. Every one of these is implemented in src/app. */
export const LINKS = {
  home: "/",
  about: "/about-us",
  doctor: "/dr-poonam-jain",
  contact: "/contact-us",
  allServices: "/our-services",
  international: "/international-patients",
  testimonials: "/testimonials",
  blogs: "/blogs",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
  cataract: "/stitchless-cataract-surgery",
  eyelid: "/eyelid-surgery-blepharoplasty",
  glaucoma: "/glaucoma-management",
  aesthetic: "/aesthetic-oculofacial",
  reconstructive: "/eye-plastic-reconstructive-surgery",
  exams: "/comprehensive-eye-examinations",
} as const;

/** Privacy notice page. Not approved yet; when set, the appointment form links to it. */
export const PRIVACY_URL: string | null = null;

export const MAPS_LINK = MAP.verifiedPinUrl ?? DIRECTIONS_URL;

export const TEL_HREF = `tel:${SITE.phone.tel}`;

export type ServiceKey =
  | "cataract"
  | "glaucoma"
  | "exams"
  | "eyelid"
  | "aesthetic"
  | "reconstructive";

export type ServiceGroupKey = "vision" | "oculoplasty";

/** Group titles are navigation suggestions, not clinical claims. */
export const SERVICE_GROUPS: Record<ServiceGroupKey, { title: string; blurb: string }> = {
  vision: {
    title: "Comprehensive Vision Care",
    blurb:
      "Examination, cataract and glaucoma care. A good place to start for a check-up, a change in your vision or a long-term eye condition.",
  },
  oculoplasty: {
    title: "Oculoplasty & Eye-Area Care",
    blurb:
      "The eyelids, tear passages and the area around the eyes. Care for comfort, function and appearance, planned after a careful examination.",
  },
};

export type ServiceSummary = {
  key: ServiceKey;
  title: string;
  /** Short label for compact lists. */
  short: string;
  blurb: string;
  href: string;
  group: ServiceGroupKey;
};

/** Short, patient-friendly summaries used in lists. Full page content lives in src/content/services.ts. */
export const SERVICES: ServiceSummary[] = [
  {
    key: "cataract",
    title: "Cataract Surgery",
    short: "Cataract Surgery",
    blurb:
      "For a clouded lens: careful assessment of your vision, and a clear discussion of when surgery is considered and what your options are.",
    href: LINKS.cataract,
    group: "vision",
  },
  {
    key: "glaucoma",
    title: "Glaucoma Management",
    short: "Glaucoma",
    blurb:
      "Glaucoma often has no early symptoms. Assessment, tests chosen by the doctor and regular follow-up, because it needs long-term monitoring.",
    href: LINKS.glaucoma,
    group: "vision",
  },
  {
    key: "exams",
    title: "Comprehensive Eye Examinations",
    short: "Eye Examinations",
    blurb:
      "A thorough check of how well you see and how healthy your eyes are, from routine check-ups to examinations for specific concerns, explained in plain language.",
    href: LINKS.exams,
    group: "vision",
  },
  {
    key: "eyelid",
    title: "Eyelid Surgery (Blepharoplasty)",
    short: "Eyelid Surgery",
    blurb:
      "Assessment of heavy or drooping eyelids and under-eye bags, for functional and cosmetic reasons, including whether surgery would help.",
    href: LINKS.eyelid,
    group: "oculoplasty",
  },
  {
    key: "aesthetic",
    title: "Aesthetic Oculoplasty",
    short: "Aesthetic Oculoplasty",
    blurb:
      "Considered care for heavy eyelids, under-eye bags and age-related changes around the eyes, planned with eye health in mind.",
    href: LINKS.aesthetic,
    group: "oculoplasty",
  },
  {
    key: "reconstructive",
    title: "Reconstructive Oculoplasty",
    short: "Reconstructive Oculoplasty",
    blurb:
      "Assessment and treatment for drooping eyelids (ptosis), eyelid malposition and tear-drainage problems that affect comfort or function.",
    href: LINKS.reconstructive,
    group: "oculoplasty",
  },
];

export const serviceByKey = (k: ServiceKey) => SERVICES.find((s) => s.key === k)!;

/**
 * Dr. Poonam Jain's medical registration (the State Medical Council or the National Medical
 * Register, and the number). NOT SUPPLIED YET, so nothing is shown and nothing is invented. The
 * NMC advertising guidelines of 6 Oct 2026 (3.2 Explanations III and IV, 9.1) expect a doctor
 * directory to show names, recognised qualifications, specialties and registration details, so
 * the doctor pages must not be published until this is filled in from the doctor's certificate.
 */
export const DOCTOR_REGISTRATION: { council: string; number: string } | null = null;
