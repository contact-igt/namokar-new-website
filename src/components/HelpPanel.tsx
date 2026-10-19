import { MAPS_LINK, SITE, TEL_HREF } from "@/config/site";
import { PhoneIcon, PinIcon } from "./Icons";

/** Compact "speak to the centre" card for page heroes that have no photograph. */
export default function HelpPanel({ heading = "Speak to the centre" }: { heading?: string }) {
  return (
    <aside className="help-panel" aria-label={heading}>
      <p className="vp-kicker fp-kicker">{heading}</p>
      <p className="help-line">
        {SITE.name}, {SITE.address.street}, New Delhi.
      </p>
      <ul className="help-links">
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
