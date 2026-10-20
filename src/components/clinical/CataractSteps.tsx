import { InfoIcon } from "../Icons";

const STEPS = [
  {
    title: "Before",
    sub: "Clouded natural lens",
    text: "The natural lens has become cloudy, so light does not focus as sharply on the retina and vision can look blurred, dull or hazy.",
  },
  {
    title: "Small incision",
    sub: "A tiny opening is made",
    text: "A very small opening is made at the edge of the cornea so the surgeon can reach the lens. Whether stitches are needed depends on the eye and on the technique the surgeon chooses.",
  },
  {
    title: "Lens removed",
    sub: "The cloudy lens is taken out",
    text: "The clouded lens is taken out of the eye.",
  },
  {
    title: "New lens",
    sub: "A clear lens is placed",
    text: "A clear artificial lens, called an intraocular lens (IOL), is placed where the natural lens was. Which design suits you is decided with your doctor.",
  },
] as const;

/** A static, responsive four-step overview. The medical wording stays with the existing figure. */
export default function CataractSteps() {
  return (
    <>
      <ol className="cataract-process">
        {STEPS.map((step, index) => (
          <li key={step.title} className="cataract-process-step">
            <div className={`cataract-process-eye cataract-process-eye--${index + 1}`} aria-hidden="true">
              <span>{index + 1}</span>
            </div>
            {index < STEPS.length - 1 && <span className="cataract-process-arrow" aria-hidden="true" />}
            <div className="cataract-process-label">
              <h3>{step.title}</h3>
              <span>{step.sub}</span>
            </div>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
      <p className="clin-fine cataract-process-note">
        <InfoIcon width={22} height={22} />
        <span>
          <strong>Note:</strong> a general outline. Your doctor explains how the operation is arranged for you, and what to do before and afterwards.
        </span>
      </p>
    </>
  );
}
