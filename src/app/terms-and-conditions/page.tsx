import type { Metadata } from "next";
import { pageMeta, withBrand } from "@/lib/seo";
import { notFound } from "next/navigation";
import LegalDraft from "@/components/LegalDraft";
import { PRIVACY_URL } from "@/config/site";

export const metadata: Metadata = pageMeta("terms", {
  title: withBrand("Terms and Conditions (draft for review)"),
  description: "Draft terms and conditions for Namokar Eye & Oculoplasty Centre, awaiting approval by the clinic's legal adviser.",
});

export default function Page() {
  // A draft template: not published until the approved legal text is added.
  if (PRIVACY_URL === null) notFound();
  return (
    <LegalDraft
      crumb="Terms and Conditions"
      title="Terms and Conditions"
      facts={[
        "The pages of this website are general information about eye care. They are not medical advice, and they say so.",
        "Using the website does not book an appointment. An appointment exists only when the centre confirms it.",
        "The website links to other sites, such as Google Maps.",
      ]}
      topics={[
        "Use of this website",
        "General information, not medical advice",
        "Appointments and how they are confirmed",
        "Links to other websites",
        "Ownership of the content and images",
        "Limits of liability",
        "Governing law and jurisdiction",
      ]}
    />
  );
}
