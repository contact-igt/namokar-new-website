import type { Metadata } from "next";
import { pageMeta, withBrand } from "@/lib/seo";
import { notFound } from "next/navigation";
import LegalDraft from "@/components/LegalDraft";
import { PRIVACY_URL } from "@/config/site";

export const metadata: Metadata = pageMeta("privacy", {
  title: withBrand("Privacy Policy (draft for review)"),
  description: "Draft privacy policy for Namokar Eye & Oculoplasty Centre, awaiting approval by the clinic's legal adviser.",
});

export default function Page() {
  // A draft template: not published until the approved legal text is added.
  if (PRIVACY_URL === null) notFound();
  return (
    <LegalDraft
      crumb="Privacy Policy"
      title="Privacy Policy"
      facts={[
        "Visitors can call the centre or open directions in Google Maps. These are ordinary links; the site itself does not record them.",
        "The map on the Contact page loads from Google only when a visitor presses “Show map”. Loading it connects the visitor's browser to Google.",
        "The site does not currently use analytics or advertising trackers, and does not set cookies of its own.",
        "An online appointment enquiry form exists but is switched off. If it is switched on, it collects a name, a telephone number, an optional reason for the visit, an optional preferred day and the visitor's consent to be contacted. It asks visitors not to include medical details. The details are sent to a receiving system chosen by the centre.",
        "The appointment API does not write enquiry details to the site's logs.",
      ]}
      topics={[
        "Who is responsible for personal data (the legal name and address)",
        "What is collected, why, and the legal basis",
        "Who receives the data, including the receiving system used for enquiries and Google Maps",
        "How long enquiries are kept",
        "Visitors' rights and how to exercise them",
        "Whom to contact with a privacy question",
        "How changes to the policy are announced",
      ]}
    />
  );
}
