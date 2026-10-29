/**
 * Appointment-enquiry validation, shared by the form (client) and the API route (server).
 * The server always re-validates; the client copy is only for quick feedback.
 * Deliberately collects no medical history or diagnosis details.
 */

export const SERVICE_OPTIONS = [
  { value: "", label: "Not sure / general consultation" },
  { value: "cataract", label: "Cataract Surgery" },
  { value: "aesthetic", label: "Aesthetic Oculoplasty" },
  { value: "reconstructive", label: "Reconstructive Oculoplasty" },
  { value: "glaucoma", label: "Glaucoma Management" },
  { value: "exams", label: "Comprehensive Eye Examination" },
] as const;

export type FieldName = "name" | "phone" | "email" | "service" | "preferredDate" | "message" | "consent";

export type RawValues = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate: string;
  consent: boolean;
  couponCode?: string;
  referralCode?: string;
  message?: string;
  /** Honeypot: real visitors never see or fill this. */
  website?: string;
};

export type CleanValues = {
  name: string;
  phone: string; // +91XXXXXXXXXX
  email?: string;
  service: string;
  preferredDate: string; // YYYY-MM-DD or ""
  consent: true;
  couponCode?: string;
  referralCode?: string;
  message?: string;
};

export type FieldErrors = Partial<Record<FieldName, string>>;

const MAX_DAYS_AHEAD = 90;

/** Today in India as YYYY-MM-DD (the centre is in Delhi). */
export function todayIST(now = new Date()): string {
  return now.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export const dateBounds = (now = new Date()) => {
  const min = todayIST(now);
  return { min, max: addDays(min, MAX_DAYS_AHEAD) };
};

/** Collapse whitespace and drop control characters. */
export const tidy = (s: unknown, max = 200): string =>
  String(s ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

/**
 * Accepts Indian numbers of 10 digits (mobile, or landline with its area code), with an
 * optional +91 / 91 / 0 prefix and spaces or dashes. Non-Indian numbers are not accepted
 * by this form; those visitors are asked to call.
 */
export function normalisePhone(input: string): string | null {
  let digits = input.replace(/[\s\-().]/g, "");
  if (!/^\+?\d+$/.test(digits)) return null;
  digits = digits.replace(/^\+/, "");
  if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  return /^[1-9]\d{9}$/.test(digits) ? `+91${digits}` : null;
}

export function validate(
  raw: RawValues,
  now = new Date(),
): { ok: true; values: CleanValues } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};

  const name = tidy(raw.name, 80);
  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (!/^[\p{L}][\p{L}\p{M} .'-]*$/u.test(name))
    errors.name = "Please use letters only in your name.";

  const phone = normalisePhone(tidy(raw.phone, 20));
  if (!tidy(raw.phone)) errors.phone = "Please enter your phone number.";
  else if (!phone)
    errors.phone = "Please enter a 10-digit number, with the area code if it is a landline. For other numbers, please call the centre.";

  const email = tidy(raw.email, 254).toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email address.";

  const service = tidy(raw.service, 30);
  if (!SERVICE_OPTIONS.some((o) => o.value === service))
    errors.service = "Please choose one of the options listed.";

  const preferredDate = tidy(raw.preferredDate, 10);
  if (preferredDate) {
    const { min, max } = dateBounds(now);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || Number.isNaN(Date.parse(preferredDate)))
      errors.preferredDate = "Please choose a valid date.";
    else if (preferredDate < min || preferredDate > max)
      errors.preferredDate = "Please choose a date within the next 90 days.";
  }

  if (raw.consent !== true)
    errors.consent = "Please tick the box so the centre can contact you.";

  const couponCode = tidy(raw.couponCode, 40);
  const referralCode = tidy(raw.referralCode, 40);
  const message = tidy(raw.message, 300);

  if (Object.keys(errors).length || !phone) return { ok: false, errors };
  return {
    ok: true,
    values: { name, phone, service, preferredDate, consent: true, ...(email && { email }), ...(couponCode && { couponCode }), ...(referralCode && { referralCode }), ...(message && { message }) },
  };
}
