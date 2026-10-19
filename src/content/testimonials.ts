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

/**
 * Patient reviews and testimonials are NOT published on this website, whatever the patient's
 * consent. NMC "Guidelines on Ethical Advertising and Public Communication" (Public Notice
 * R-13014/01/2024-Ethics, 6 Oct 2026): 3.2 Explanation V (no fake, paid or misleading reviews or
 * testimonials; an RMP shall not request or share testimonials for professional promotion),
 * 6.2 (consent does not by itself make a testimonial, promotional patient story or success claim
 * permissible), 8.1(ii), 8.1(v) and 8.1(xi). While this is false the /testimonials page answers
 * 404 and no link, sitemap entry or markup refers to reviews. Change it only on the written
 * advice of the clinic's medical or legal adviser.
 */
export const REVIEWS_ALLOWED = false;

export const TESTIMONIALS: Testimonial[] = [];
