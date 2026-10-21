import AssetImage from "@/components/AssetImage";
import { ASSETS } from "@/config/assets";

const STEPS = [
  {
    asset: ASSETS.examVisualAcuityAi,
    title: "How well you see",
    text: "Your vision is checked with and without spectacles.",
  },
  {
    asset: ASSETS.examRefractionAi,
    title: "Spectacle needs",
    text: "Your eyes are tested to see whether glasses would help, or whether your prescription has changed.",
  },
  {
    asset: ASSETS.examEyePressureAi,
    title: "Eye pressure",
    text: "The pressure inside the eye may be measured as part of looking for conditions such as glaucoma.",
  },
  {
    asset: ASSETS.examFrontEyeAi,
    title: "The front of the eye",
    text: "The eyelids, the surface of the eye and the lens are examined.",
  },
  {
    asset: ASSETS.examRetinaAi,
    title: "The back of the eye",
    text: "The retina and optic nerve are looked at, sometimes after drops that widen the pupil.",
  },
];

/** The main stages that may form part of a comprehensive eye examination. */
export default function ExamParts() {
  return (
    <div>
      <div className="exam-cards">
        {STEPS.map(({ asset, title, text }, index) => (
          <article className="exam-card" key={title}>
            <div className="exam-card__image-wrap">
              <AssetImage asset={asset} className="exam-card__image" sizes="(min-width: 1100px) 31vw, (min-width: 700px) 48vw, 100vw" />
              <span className="exam-card__number" aria-hidden="true">{index + 1}</span>
            </div>
            <div className="exam-card__body">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="exam-cards__note">The tests used depend on your symptoms and age and are chosen by the doctor.</p>
    </div>
  );
}
