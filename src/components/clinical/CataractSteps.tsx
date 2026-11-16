import { InfoIcon } from "../Icons";

const STEPS = [
  {
    title: "Before",
    sub: "Clouded natural lens",
    text: "A cloudy natural lens scatters light, making vision blurred, dull or hazy.",
  },
  {
    title: "Small incision",
    sub: "A tiny opening is made",
    text: "A small corneal opening lets the surgeon reach the lens. Stitches depend on the eye and surgical technique.",
  },
  {
    title: "Lens removed",
    sub: "The cloudy lens is taken out",
    text: "The clouded lens is taken out of the eye.",
  },
  {
    title: "New lens",
    sub: "A clear lens is placed",
    text: "A clear intraocular lens (IOL) replaces the natural lens. Your doctor helps choose its design.",
  },
] as const;

function StepIcon({ step }: { step: number }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {step === 0 && <><path d="M2 16s5-7 14-7 14 7 14 7-5 7-14 7S2 16 2 16Z" /><circle cx="16" cy="16" r="5" /></>}
    {step === 1 && <><path d="M7 5l19 21M25 5 6 26M4 4l4 4M24 4l4 4" /><circle cx="9" cy="24" r="3" /><circle cx="23" cy="24" r="3" /></>}
    {step === 2 && <><path d="m16 3 12 7-12 7-12-7 12-7ZM4 16l12 7 12-7M4 22l12 7 12-7" /></>}
    {step === 3 && <><circle cx="16" cy="16" r="8" /><path d="M7 8c2-3 5-5 9-5M25 24c-2 3-5 5-9 5" /></>}
  </svg>;
}

/** A static, responsive four-step overview. The medical wording stays with the existing figure. */
export default function CataractSteps() {
  return (
    <>
      <ol className="cataract-process">
        {STEPS.map((step, index) => (
          <li key={step.title} className="cataract-process-step">
            <div className={`cataract-process-eye cataract-process-eye--${index + 1}`} aria-hidden="true">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            {index < STEPS.length - 1 && <span className="cataract-process-arrow" aria-hidden="true" />}
            <div className="cataract-process-label">
              <span className="cataract-process-icon"><StepIcon step={index} /></span>
              <div><h3>{step.title}</h3><span className="cataract-process-subtitle">{step.sub}</span></div>
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
