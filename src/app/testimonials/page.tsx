import type { Metadata } from "next";
import { pageMeta, withBrand } from "@/lib/seo";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import HelpPanel from "@/components/HelpPanel";
import PageHero from "@/components/PageHero";

import { LINKS } from "@/config/site";
import { TESTIMONIALS } from "@/content/testimonials";
import { onlineBookingAvailable } from "@/lib/booking";

export const metadata: Metadata = pageMeta("testimonials", {
  title: withBrand("Patient Reviews"),
  description: "Patient reviews of Namokar Eye & Oculoplasty Centre, Ashok Vihar, New Delhi. None are published yet.",
});

export default function TestimonialsPage() {
  const online = onlineBookingAvailable();
  return (
    <main id="main">
      <PageHero
        crumb="Patient Reviews"
        title="Patient reviews."
        lead={
          TESTIMONIALS.length
            ? "Reviews published with each patient's consent."
            : "No patient reviews are published on this website yet."
        }
        actions={<BookButton online={online} />}
        aside={<HelpPanel heading="Speak to the centre" />}
      />

      <section className="section section--tight" aria-label="Reviews">
        <div className="container">
          {TESTIMONIALS.length ? (
            <ul className="review-list">
              {TESTIMONIALS.map((t) => (
                <li key={t.id} className="review">
                  <blockquote>
                    <p>{t.text}</p>
                  </blockquote>
                  <p className="review-by">
                    {t.displayName}, {t.source.label}
                    {t.source.url && (
                      <>
                        {" "}
                        <a href={t.source.url} className="text-link" target="_blank" rel="noopener noreferrer">
                          View source<span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <h2 className="h2">Why this page is empty</h2>
              <p>
                A review is shown here only when the patient has agreed to its
                publication and it can be traced to a source. None has been supplied yet,
                so this page does not display ratings, quotations or star scores.
              </p>
              <p>
                To learn about the care, you can read about{" "}
                <Link href={LINKS.doctor} className="text-link">the doctor</Link> and the{" "}
                <Link href={LINKS.allServices} className="text-link">services</Link>, or{" "}
                <Link href={LINKS.contact} className="text-link">contact the centre</Link>{" "}
                with your questions.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
