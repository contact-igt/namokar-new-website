import { type InteractiveKey, figureUsable } from "@/config/figures";
import FigureHost from "./FigureHost";

/**
 * The only way to place a clinical illustration or interactive explainer on a page. Renders
 * nothing for a figure that has not been signed off (the registry in src/config/figures.ts), so a
 * pending diagram can never reach a visitor and the page keeps its plain text. In the local review
 * preview a pending figure renders cleanly; its status is listed at /review.
 *
 * The figure's component is chosen by `id` in FigureHost, which loads each one as its own chunk.
 */
export default function ClinicalFigure({
  id,
  heading,
  intro,
  className = "",
  showNote = true,
}: {
  id: InteractiveKey;
  heading: string;
  intro?: string;
  className?: string;
  showNote?: boolean;
}) {
  if (!figureUsable(id)) return null;
  const hid = `fig-${id}-h`;
  return (
    <section className={`section section--tight clin ${className}`} aria-labelledby={hid} data-figure={id}>
      <div className="container">
        <div className="clin-head reveal">
          <p className="kicker">See it explained</p>
          <h2 id={hid} className="h2">{heading}</h2>
          {intro && <p className="lead">{intro}</p>}
        </div>
        <figure className="clin-fig">
          <FigureHost id={id} />
          {/* {showNote && (
            <figcaption className="clin-note">
              Illustration, not to scale. General information to help you understand an examination or
              a procedure; it is not a diagnosis, and your doctor explains what applies to your eyes.
            </figcaption>
          )} */}
        </figure>
      </div>
    </section>
  );
}
