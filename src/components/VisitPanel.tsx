import Image from "next/image";
import { ASSETS, srcOf } from "@/config/assets";
import { MAPS_LINK, SITE, TEL_HREF } from "@/config/site";
import { PhoneIcon, PinIcon } from "./Icons";

/**
 * Hospital-first fallback for a hero photograph that is not cleared for use.
 * Built only from approved branding and the centralised address and phone.
 */
export default function VisitPanel() {
  return (
    <aside className="visit-panel" aria-label="Visit the centre">
      <span className="visit-panel-logo">
        <Image
          src={srcOf(ASSETS.logo)}
          alt={SITE.name}
          width={ASSETS.logo.width}
          height={ASSETS.logo.height}
          sizes="220px"
        />
      </span>
      <p className="vp-kicker">Visit the centre</p>
      <p className="vp-place">{SITE.area}</p>
      <address className="vp-address">
        {SITE.address.lines.map((l) => (
          <span key={l}>{l}</span>
        ))}
        <span className="vp-landmark">{SITE.address.landmark}</span>
      </address>
      <ul className="vp-links">
        <li>
          <a href={TEL_HREF}>
            <PhoneIcon width={20} height={20} />
            {SITE.phone.display}
          </a>
        </li>
        <li>
          <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
            <PinIcon width={20} height={20} />
            Get directions
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
