import type { Metadata } from "next";
import Link from "next/link";
import { PhoneIcon } from "@/components/Icons";
import { SITE, TEL_HREF } from "@/config/site";
import { pageMeta, withBrand } from "@/lib/seo";

export const metadata: Metadata = pageMeta("contact", {
  title: withBrand("Thank You"),
  description: "Namokar Eye & Oculoplasty Centre has received your enquiry.",
});

export default function ThankYouPage() {
  return (
    <main id="main" className="thank-you-page">
      <section className="container thank-you" aria-labelledby="thank-you-title">
        <div className="thank-you-card">
          <span className="thank-you-check" aria-hidden="true">✓</span>
          <div>
            <p className="kicker">Enquiry received</p>
            <h1 id="thank-you-title" className="h1">Thank you for contacting us</h1>
            <p className="lead">We have received your enquiry. Our team may contact you on the number you provided to discuss a suitable time.</p>
          </div>
          <p className="thank-you-note">This is a request, not a confirmed appointment.</p>
        </div>
        <div className="thank-you-next">
          <div>
            <p className="eyebrow">Need help sooner?</p>
            <h2>Call the centre directly</h2>
            <p>Our team can help with appointments and urgent questions during opening hours.</p>
          </div>
          <div className="thank-you-actions">
            <a href={TEL_HREF} className="btn btn--primary"><PhoneIcon />Call {SITE.phone.display}</a>
            <Link href="/" className="btn btn--secondary">Return home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
