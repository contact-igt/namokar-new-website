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
    <main id="main" className="section section--porcelain">
      <section className="container thank-you" aria-labelledby="thank-you-title">
        <p className="kicker">Enquiry received</p>
        <h1 id="thank-you-title" className="h1">Thank you for contacting us</h1>
        <p className="lead">The centre may contact you on the number you provided to discuss a suitable time. This is a request, not a confirmed appointment.</p>
        <div className="thank-you-actions">
          <a href={TEL_HREF} className="btn btn--primary"><PhoneIcon />Call {SITE.phone.display}</a>
          <Link href="/" className="btn btn--secondary">Return home</Link>
        </div>
      </section>
    </main>
  );
}
