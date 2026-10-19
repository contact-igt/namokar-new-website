import Link from "next/link";
import { LINKS, TEL_HREF } from "@/config/site";
import { CalendarIcon, PhoneIcon } from "./Icons";

/**
 * The one appointment call-to-action. Its wording and destination always match what
 * the visitor can actually do:
 *  - online requests available: "Book a Consultation" opens the request form
 *  - otherwise: "Call to Book an Appointment" dials the centre
 * Starting a request or a call never implies that an appointment has been booked.
 */
export default function BookButton({
  online,
  className = "btn btn--primary",
  onNavigate,
}: {
  online: boolean;
  className?: string;
  onNavigate?: () => void;
}) {
  if (online) {
    return (
      <Link href={`${LINKS.contact}#request`} className={className} onClick={onNavigate}>
        <CalendarIcon />
        Book a Consultation
      </Link>
    );
  }
  return (
    <a href={TEL_HREF} className={className} onClick={onNavigate}>
      <PhoneIcon />
      Call to Book an Appointment
    </a>
  );
}

/** Secondary hero/CTA action: the other way to reach the centre. */
export function SecondaryContact({
  online,
  className = "btn btn--secondary",
}: {
  online: boolean;
  className?: string;
}) {
  if (online) {
    return (
      <a href={TEL_HREF} className={className}>
        <PhoneIcon />
        Call the Centre
      </a>
    );
  }
  return (
    <Link href={LINKS.contact} className={className}>
      Contact and Directions
    </Link>
  );
}
