import Image from "next/image";
import type { ReactNode } from "react";
import { CHANNELS, LINKS, MAPS_LINK, TEL_HREF } from "@/config/site";
import { CalendarIcon, PinIcon } from "./Icons";

type Action = { id: string; label: string; href: string; icon: ReactNode; external?: boolean; accessibleLabel?: string };

const actions: Action[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: `https://wa.me/${CHANNELS.whatsapp}`,
    icon: <Image src="/images/whatsapp.png" alt="" width={28} height={28} />,
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    accessibleLabel: "Dr. Poonam Jain on Instagram",
    href: CHANNELS.instagram,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    external: true,
  },
  {
    id: "location",
    label: "Location",
    href: MAPS_LINK,
    icon: <PinIcon width={28} height={28} aria-hidden="true" />,
    external: true,
  },
  {
    id: "call",
    label: "Call",
    accessibleLabel: "Call to book an appointment",
    href: TEL_HREF,
    icon: <Image src="/images/mobile.png" alt="" width={28} height={28} />,
  },
];

const bookingAction: Action = {
  id: "book",
  label: "Book",
  accessibleLabel: "Book an appointment",
  href: `${LINKS.contact}#request`,
  icon: <CalendarIcon aria-hidden="true" />,
};

function ActionLink({
  id,
  label,
  accessibleLabel = label,
  href,
  icon,
  external,
  compact = false,
}: Action & { compact?: boolean }) {
  return (
    <a
      className={compact ? "qa-mobile__item" : "qa-rail__item"}
      data-action={id}
      href={href}
      aria-label={external ? `${accessibleLabel} (opens in a new tab)` : accessibleLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {icon}
      {compact && <span>{label}</span>}
    </a>
  );
}

/** Always-available contact and visit actions, fixed outside the page content. */
export default function QuickActions() {
  return (
    <>
      <aside className="qa-rail" aria-label="Quick actions">
        {actions.map((action) => <ActionLink key={action.id} {...action} />)}
      </aside>
      <nav className="qa-mobile" aria-label="Quick actions">
        <ActionLink {...bookingAction} compact />
        {actions.map((action) => <ActionLink key={action.id} {...action} compact />)}
      </nav>
    </>
  );
}
