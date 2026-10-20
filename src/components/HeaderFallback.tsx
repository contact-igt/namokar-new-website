import Image from "next/image";
import Link from "next/link";
import { SITE, TEL_HREF } from "@/config/site";
import { PhoneIcon } from "./Icons";

/** Minimal header shown while the full header resolves on routes whose path is not known at build time. */
export default function HeaderFallback() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-bar">
          <Link href="/" className="brand" aria-label={`${SITE.name}, home`}>
            <Image src="/images/namokar-logo.webp" alt={SITE.name} width={819} height={230} loading="eager" sizes="160px" />
          </Link>
          <a href={TEL_HREF} className="header-call header-call--primary" aria-label={`Call ${SITE.phone.display}`}>
            <PhoneIcon width={20} height={20} />
            <span className="call-sm">Call</span>
            <span className="call-lg">
              <span className="call-prefix">Call </span>
              {SITE.phone.display}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
