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
    lines: [
      "13 A, Pocket A, Phase 3",
      "Ashok Vihar, near Satyawati College",
      "Delhi – 110052, India",
    ],
    landmark: "",
    street: "13 A, Pocket A, Phase 3, Ashok Vihar, near Satyawati College",
    locality: "Delhi",
    postalCode: "110052",
    country: "IN",
  },
} as const;

/** Home page title. */
export const HOME_TITLE = `Eye Care & Oculoplasty Centre in Delhi | Namokar`;

/** Search and social description for the home page; the root layout and the home page both use it. */
export const HOME_DESCRIPTION =
  "Namokar in Ashok Vihar, Delhi, offers cataract, retina, LASIK, glaucoma and specialised oculoplasty care led by Dr. Poonam Jain.";

/**
 * Email is deliberately unset: the current live site shows no email.
 */
export const CHANNELS = {
  email: null as string | null,
  whatsapp: "919810157258",
  instagram: "https://www.instagram.com/itsdrpoonamjain/",
} as const;

/**
 * Opening hours are NOT published until validated. The old site lists
 * "Monday to Saturday, 9 AM to 4 PM", which is a candidate only.
 */
export const HOURS: { approved: boolean; text: string | null } = {
  approved: false,
  text: null,
};

/**
 * Map position taken from the centre's existing website (namokareyecare-frontend, contact page):
 * the same coordinates for the directions link and the same Google "Embed a map" URL.
 */
const CENTRE_LATLNG = "28.69490838124772,77.17709117418958";

export const DIRECTIONS_URL = `https://maps.google.com/?q=${CENTRE_LATLNG}`;

/**
 * Map. The clinic's supplied Google Maps place link is used for all directions links.
 * The embed remains the position published on the centre's existing website.
 */
export const MAP = {
  verifiedPinUrl: "https://maps.app.goo.gl/6VUFVHz9jQva7ai99",
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2711.4522544941547!2d77.17709117418958!3d28.69490838124772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03f35bab0443%3A0x229e9c55781b5cf3!2sClosed%20one!5e1!3m2!1sen!2sin!4v1785770586866!5m2!1sen!2sin",
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
  retina: "/retina-care-surgery",
  eyelid: "/eyelid-surgery-blepharoplasty",
  glaucoma: "/glaucoma-management",
  aesthetic: "/aesthetic-oculofacial",
  reconstructive: "/eye-plastic-reconstructive-surgery",
  exams: "/comprehensive-eye-examinations",
  squint: "/squint-correction-strabismus-delhi",
  refractive: "/refractive-surgery",
} as const;

/** Privacy notice page. Not approved yet; when set, the appointment form links to it. */
export const PRIVACY_URL: string | null = null;

export const MAPS_LINK = MAP.verifiedPinUrl ?? DIRECTIONS_URL;

export const TEL_HREF = `tel:${SITE.phone.tel}`;

export type ServiceKey =
  | "retina"
  | "lasik"
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
      "Eye examinations, cataract, retina and glaucoma care, and refractive surgery assessment. A good place to start for a check-up, a change in your vision or a long-term eye condition.",
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
    blurb: "Assessment and surgical treatment of cataracts, with intraocular lens options selected according to your eye health, vision needs and lifestyle.",
    href: LINKS.cataract,
    group: "vision",
  },
  {
    key: "retina",
    title: "Retina Care & Surgery",
    short: "Retina Care",
    blurb: "Evaluation and treatment of retinal conditions, with medical or surgical care recommended according to individual clinical findings.",
    href: LINKS.retina,
    group: "vision",
  },
  {
    key: "lasik",
    title: "LASIK & Refractive Surgery",
    short: "LASIK & Refractive Surgery",
    blurb: "Personalised assessment and suitable vision correction procedures designed to reduce dependence on spectacles or contact lenses.",
    href: LINKS.refractive,
    group: "vision",
  },
  {
    key: "glaucoma",
    title: "Glaucoma Management",
    short: "Glaucoma",
    blurb: "Detection, assessment and long-term management of glaucoma to help preserve vision and minimise the risk of further optic nerve damage.",
    href: LINKS.glaucoma,
    group: "vision",
  },
  {
    key: "exams",
    title: "Comprehensive Eye Examinations",
    short: "Eye Examinations",
    blurb: "Detailed assessment of your vision and overall eye health, supporting early detection and appropriate management of eye conditions.",
    href: LINKS.exams,
    group: "vision",
  },
  {
    key: "eyelid",
    title: "Eyelid Surgery (Blepharoplasty)",
    short: "Eyelid Surgery",
    blurb: "Functional and aesthetic eyelid surgery addressing excess eyelid skin and under-eye bags, with careful consideration of eye health and individual suitability.",
    href: LINKS.eyelid,
    group: "oculoplasty",
  },
  {
    key: "aesthetic",
    title: "Aesthetic Oculoplasty",
    short: "Aesthetic Oculoplasty",
    blurb: "Specialised care for age-related changes and aesthetic concerns around the eyes, with surgical and non-surgical options based on individual assessment.",
    href: LINKS.aesthetic,
    group: "oculoplasty",
  },
  {
    key: "reconstructive",
    title: "Reconstructive Oculoplasty",
    short: "Reconstructive Oculoplasty",
    blurb: "Specialised assessment and treatment of eyelid-position abnormalities, ptosis, tear-drainage disorders and other conditions affecting the structures around the eyes.",
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
