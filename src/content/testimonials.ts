/**
 * Patient reviews.
 *
 * Add a review here ONLY with: the patient's written consent to publish, the exact text,
 * a name or initials the patient agreed to, and a source that can be checked. The fifteen
 * reviews on the old WordPress site carry no dates or links and their "4.9 from 299
 * reviews" figure cannot be verified, so none of them are reproduced here.
 */
export type Testimonial = {
  id: string;
  text: string;
  displayName: string;
  /** e.g. "Google review", with a link where lawful. */
  source: { label: string; url?: string };
  consentRecordedOn: string;
};

export const TESTIMONIALS: Testimonial[] = [];
