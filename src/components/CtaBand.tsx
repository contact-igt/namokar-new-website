import { PhoneIcon, PinIcon } from "./Icons";
import BookButton, { SecondaryContact } from "./BookButton";
import { SITE, TEL_HREF } from "@/config/site";

/** Closing call-to-action band, shared by inner pages. */
export default function CtaBand({
  heading,
  lead,
  id,
  online,
  landmark = false,
}: {
  heading: string;
  lead: string;
  id: string;
  online: boolean;
  /** Also print the nearby landmark under the address. */
  landmark?: boolean;
}) {
  return (
    <section className="cta" aria-labelledby={id}>
      <div className="container cta-inner">
        <div>
          <h2 id={id} className="h2">{heading}</h2>
          <p className="lead">{lead}</p>
          <p className="cta-place">
            <PinIcon />
            <span>
              {SITE.address.lines.join(", ")}
              {landmark ? `. ${SITE.address.landmark}.` : ""}
            </span>
          </p>
          <p className="cta-place">
            <PhoneIcon />
            <a href={TEL_HREF}>{SITE.phone.display}</a>
          </p>
        </div>
        <div className="cta-actions">
          <BookButton online={online} />
          <SecondaryContact online={online} className="btn btn--outline-light" />
        </div>
      </div>
    </section>
  );
}
