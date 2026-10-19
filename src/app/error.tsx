"use client";

import Link from "next/link";
import { PhoneIcon } from "@/components/Icons";
import { LINKS, SITE, TEL_HREF } from "@/config/site";

/** Runtime error fallback. Shows no technical detail to visitors. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="section state-page">
      <div className="container state-inner">
        <p className="kicker">Something went wrong</p>
        <h1 className="page-title">This page could not be shown.</h1>
        <p className="page-lead">
          Please try again. If the problem continues, you can still reach the centre by phone.
        </p>
        <div className="page-actions">
          <button type="button" className="btn btn--primary" onClick={() => reset()}>
            Try again
          </button>
          <Link href={LINKS.home} className="btn btn--secondary">Go to the home page</Link>
        </div>
        <p className="state-call">
          Call{" "}
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
