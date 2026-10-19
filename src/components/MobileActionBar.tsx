import { MAPS_LINK } from "@/config/site";
import BookButton from "./BookButton";
import { PinIcon } from "./Icons";

/**
 * Phones only: the two things a visitor most needs within thumb reach, the appointment action
 * (it follows the same rule as every other appointment button, see BookButton) and directions to
 * the centre. A fixed bar at the bottom of the screen, 56 px tall, with 48 px targets; hidden from
 * 768 px up, where the header already carries the phone number. Nothing here claims hours,
 * WhatsApp or any other channel the client has not approved.
 */
export default function MobileActionBar({ online }: { online: boolean }) {
  return (
    <nav className="qa-bar" aria-label="Quick actions">
      <BookButton online={online} className="qa-btn qa-btn--primary" />
      <a href={MAPS_LINK} className="qa-btn qa-btn--ghost" target="_blank" rel="noopener noreferrer">
        <PinIcon width={20} height={20} />
        Directions
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </nav>
  );
}
