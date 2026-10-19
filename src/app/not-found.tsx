import type { Metadata } from "next";
import Link from "next/link";
import { PhoneIcon } from "@/components/Icons";
import { LINKS, SITE, TEL_HREF } from "@/config/site";

export const metadata: Metadata = {
  title: `Page not found | ${SITE.name}`,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="section state-page">
      <div className="container state-inner">
        <p className="kicker">Error 404</p>
        <h1 className="page-title">We cannot find that page.</h1>
        <p className="page-lead">
          The address may have changed or been typed incorrectly. These pages may help.
        </p>
        <div className="page-actions">
          <Link href={LINKS.home} className="btn btn--primary">Go to the home page</Link>
          <Link href={LINKS.allServices} className="btn btn--secondary">Our services</Link>
          <Link href={LINKS.contact} className="btn btn--secondary">Contact us</Link>
        </div>
        <p className="state-call">
          To speak to the centre, call{" "}
          <a href={TEL_HREF} className="text-link">
            <PhoneIcon width={18} height={18} />
            {SITE.phone.display}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
