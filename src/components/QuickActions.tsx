import Image from "next/image";
import { CHANNELS, LINKS, MAPS_LINK, TEL_HREF } from "@/config/site";
import { CHANNEL } from "@/content/videos";
import { CalendarIcon, PinIcon } from "./Icons";

type Action = { label: string; href: string; icon: string; external?: boolean };

const actions: Action[] = [
  { label: "Phone", href: TEL_HREF, icon: "/images/mobile.png" },
  {
    label: "WhatsApp",
    href: `https://wa.me/${CHANNELS.whatsapp}`,
    icon: "/images/whatsapp.png",
    external: true,
  },
  { label: "YouTube", href: CHANNEL.url, icon: "/images/youtube.png", external: true },
] as const;

function ActionLink({
  label,
  href,
  icon,
  external,
  compact = false,
}: Action & { compact?: boolean }) {
  return (
    <a
      className={compact ? "qa-mobile__item" : "qa-rail__item"}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <Image src={icon} alt="" width="28" height="28" />
      <span className={compact ? undefined : "sr-only"}>{label}</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/** Always-available contact and visit actions, fixed outside the page content. */
export default function QuickActions() {
  return (
    <>
      <aside className="qa-rail" aria-label="Quick actions">
        {actions.slice(1).map((action) => <ActionLink key={action.label} {...action} />)}
        <ActionLink {...actions[0]} />
      </aside>
      <nav className="qa-mobile" aria-label="Quick actions">
        {actions.slice(0, 2).map((action) => <ActionLink key={action.label} {...action} compact />)}
        <ActionLink {...actions[2]} compact />
        <a href={LINKS.contact} className="qa-mobile__item">
          <CalendarIcon width={25} height={25} />
          <span>Book</span>
        </a>
        <a href={MAPS_LINK} className="qa-mobile__item" target="_blank" rel="noopener noreferrer">
          <PinIcon width={25} height={25} />
          <span>Address</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </nav>
    </>
  );
}
