import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import HomeCta from "@/components/HomeCta";
import ServicesFaqSection from "@/components/ServicesFaqSection";
import ExpertEyeCareSection from "@/components/ExpertEyeCareSection";
import CataractVideoCard from "@/app/stitchless-cataract-surgery/CataractVideoCard";
import videoStyles from "@/components/ServiceVideoSection.module.css";
import JsonLd from "@/components/JsonLd";
import { LINKS, TEL_HREF } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { webPage } from "@/lib/schema";
import { SQUINT_SECTIONS as content, SQUINT_FAQS } from "@/content/squint";
import SquintSigns from "./SquintSigns";
import SquintIcon from "./SquintIcon";
import SquintEvaluationWorkup from "./SquintEvaluationWorkup";
import styles from "./squint.module.css";
import examStyles from "@/app/comprehensive-eye-examinations/exams.module.css";

export const metadata = pageMeta("squint", {
  title: "Squint Correction & Strabismus Care in Ashok Vihar, Delhi",
  description: "Understand squint, eye alignment and lazy eye in children and adults. Learn about assessment, treatment options and arranging a consultation in Ashok Vihar, Delhi.",
});
const entry = (paragraph: string) => {
  const colon = paragraph.indexOf(":");
  return { title: paragraph.slice(0, colon).replace(/^\d+\. /, ""), text: paragraph.slice(colon + 1).trim() };
};
const art = (name: string) => `/images/squint/illustrations/${name}.svg`;
const medicalArt = (name: string) => `/images/squint/medical/${name}.webp`;
function Copy({ paragraphs }: { paragraphs: string[] }) {
  return <>{paragraphs.map(text => {
    const parts = text.split("•"), colon = parts[0].indexOf(":"), lead = colon > 0 && colon < 110;
    return <div key={text} className={styles.copyItem}>{lead ? <><h3 className="h3">{entry(parts[0]).title}</h3><p>{entry(parts[0]).text}</p></> : <p>{parts[0]}</p>}{parts.length > 1 && <ul>{parts.slice(1).map(part => <li key={part}>{part.trim()}</li>)}</ul>}</div>;
  })}</>;
}
function Section({ index, children }: { index: number; children: ReactNode }) {
  return <section id={`squint-${index + 1}`} className={styles.section} aria-labelledby={`section-${index}-h`}><div className="container"><header className={styles.heading}><p className="kicker">{content[index].eyebrow}</p><h2 className="h2" id={`section-${index}-h`}>{content[index].title}</h2></header>{children}</div></section>;
}
function InfoRow({ title, text, icon, children }: { title: string; text?: string; icon: string; children?: ReactNode }) {
  return <article className={styles.infoRow}><span className={styles.rowIcon}><SquintIcon name={icon} /></span><div><h3 className="h3">{title}</h3>{text && <p>{text}</p>}{children}</div></article>;
}
const recovery = [
  ["Initial Sensations", "Mild redness, slight swelling, and a scratchy feeling may occur after surgery. Recovery varies.", "eye"],
  ["Temporary Vision Fluctuations", "Mild double vision or visual changes may occur during early recovery.", "target"],
  ["Eye Drops and Medicines", "Use prescribed eye drops and medicines exactly as directed by the treating team.", "drop"],
  ["Washing and Face Care", "Avoid rubbing the eyes. Ask when it is safe to wash your face and get water near the eyes.", "wash"],
  ["Activity Restrictions", "Avoid swimming, contact sports, dusty environments, and eye makeup until your treating team advises otherwise.", "activity"],
  ["Follow-up Appointments", "Attend follow-up appointments so the doctor can monitor eye alignment, vision and recovery.", "calendar"],
  ["When to Call the Doctor", "Seek prompt medical advice for worsening pain or redness, reduced vision, increasing swelling, discharge or any unexpected symptom.", "phone"],
  ["Recovery Is Individual", "Recovery differs from person to person. Follow the treating team's instructions and recommended review schedule.", "heart"],
];
const treatments = [
  "Prescription spectacles can help control accommodative esotropia by correcting farsightedness. Regular wear and prescription reviews are important.",
  "Prescribed patching encourages use of the weaker eye; selected cases may need medically supervised penalization drops. Alignment surgery alone does not cure amblyopia.",
  "Prisms bend light to help merge double images in selected patients. They do not reposition the eye muscles.",
  "Exercises may help specific coordination problems such as convergence insufficiency. They do not correct every squint, nerve palsy or structural muscle imbalance.",
  "Eye-muscle surgery may be considered when clinically appropriate. Suitability, risks, limitations and the place of surgery require an individual discussion.",
];
const related = [
  { title: "Comprehensive Eye Examinations", desc: "A thorough check of vision and overall eye health.", href: LINKS.exams, image: "/images/services/eye-examination-care.webp", alt: "Eye examination" },
  { title: "Eyelid Surgery (Blepharoplasty)", desc: "Assessment of heavy eyelids and concerns around the eyes.", href: LINKS.eyelid, image: "/images/services/eyelid-blepharoplasty-care.webp", alt: "Eyelid assessment" },
  { title: "Reconstructive Oculoplasty", desc: "Care for eyelid, orbital and tear-drainage concerns.", href: LINKS.reconstructive, image: "/images/services/reconstructive-oculoplasty-care.webp", alt: "Oculoplasty consultation" },
];
const causeIcons = [
  ["hyperopia-lenses", "family-history", "neuromuscular-model", "developmental-factors", "sensory-deprivation"],
  ["vascular-monitor", "thyroid-model", "socket-injury", "neurological-assessment", "decompensated-phoria"],
];
export default function Page() {
  return <main id="main" className={styles.page}>
    <JsonLd page="squint" data={webPage({ type: "MedicalWebPage", path: LINKS.squint, name: content[0].title, description: content[0].paragraphs[0], about: { type: "MedicalCondition", name: "Strabismus" } })} />
    <section className={styles.hero} aria-labelledby="squint-h"><div className="container"><Breadcrumb current="Squint Correction" trail={[{ label: "Services", href: LINKS.allServices }]} /><div className={styles.heroCopy}><p className="kicker">{content[0].eyebrow}</p><h1 id="squint-h">{content[0].title}</h1><div className={styles.heroMobileMedia}><Image src="/images/squint/4d52a5f1-6735-4010-8077-5cf6ce6e4008.png" alt="Child eye alignment illustrative clinical depiction" width={1855} height={848} priority className={styles.heroMobileImage} /></div><p className="lead">{content[0].paragraphs[0]}</p><div className={styles.actions}><a className="btn btn--primary" href={TEL_HREF}>Call to Book an Appointment</a><a className="btn" href="#squint-8">Explore Alignment Options</a></div></div><p className={`${styles.notice} ${styles.heroNotice}`}><span aria-hidden="true"><SquintIcon name="shield" /></span>Sudden-onset squint or newly developed double vision requires prompt medical evaluation. Do not wait for a routine appointment.</p></div></section>
    <Section index={1}><div className={styles.basicsGrid}>
      <figure className={styles.diagram}><div><Image src={medicalArt("aligned")} alt="Educational close-up of normally aligned eyes" width={1200} height={600} sizes="(min-width:960px) 40vw, 90vw" /><figcaption>Aligned eyes</figcaption></div><div><Image src={medicalArt("eye_in")} alt="Educational close-up showing one eye turning inward toward the nose" width={1200} height={600} sizes="(min-width:960px) 40vw, 90vw" /><figcaption>Example of inward misalignment</figcaption></div></figure>
      <div className={styles.infoStack}><InfoRow icon="eye" title="What is a squint?" text={content[1].paragraphs[0]} /><InfoRow icon="glasses" title="How normal alignment works" text="Six extraocular muscles move each eye, coordinated by nerves from the brain. Both eyes look at the same object, and the brain combines their slightly different images into a single, three-dimensional picture—binocular single vision and stereopsis (depth perception)." /><InfoRow icon="family" title="What happens when eyes are misaligned"><div className={styles.ageEffects}><p><strong>Children</strong>The developing brain may suppress the image from the turned eye. Without early assessment, vision in that eye may fail to develop normally, leading to amblyopia (lazy eye).</p><p><strong>Adults</strong>The mature brain may not easily suppress the second image. Double vision, visual disorientation and eye fatigue can occur.</p></div></InfoRow><InfoRow icon="clipboard" title="Why early assessment matters" text={entry(content[1].paragraphs[3]).text} /></div>
    </div></Section>
    <Section index={2}><p className={styles.intro}>{content[2].paragraphs[0]}</p><SquintSigns groups={[content[2].paragraphs.slice(2, 7).map(entry), content[2].paragraphs.slice(8).map(entry)]} /></Section>
    <Section index={3}><p className={styles.intro}>{content[3].paragraphs[0]}</p><div className={styles.typesGrid}>{content[3].paragraphs.slice(1).map((paragraph, index) => <article className={styles.typeCard} key={paragraph}><div className={styles.typeVisual}>{index === 2 ? <><div><span>↑ Hypertropia</span><Image src={medicalArt("hypertropia")} alt="Generated eye study showing one eye deviating upward" width={1200} height={600} /></div><div><span>↓ Hypotropia</span><Image src={medicalArt("hypotropia")} alt="Generated eye study showing one eye deviating downward" width={1200} height={600} /></div></> : <Image src={medicalArt(["esotropia", "exotropia", "", "pseudostrabismus"][index])} alt={["Generated eye study showing inward deviation toward the nose", "Generated eye study showing outward deviation toward the temple", "", "Generated infant eye study showing broad nasal bridge and apparent crossing with aligned eyes"][index]} width={1200} height={600} sizes="(min-width:960px) 40vw, 90vw" />}</div><h3 className="h3">{entry(paragraph).title}</h3><span className={styles.accent} /><p>{entry(paragraph).text}</p></article>)}</div></Section>
    <Section index={4}><p className={styles.intro}>{content[4].paragraphs[0]}</p><div className={styles.causesGrid}>{[content[4].paragraphs.slice(2, 7), content[4].paragraphs.slice(8)].map((group, index) => <article className={styles.causePanel} key={index}><header><span className={styles.causeHeaderIcon} aria-hidden="true"><Image src={`/images/squint/causes/${index ? "adult-care" : "childhood-care"}.webp`} alt="" width={56} height={56} sizes="56px" /></span><div><h3 className="h3">Causes in {index ? "Adults" : "Childhood"}</h3><p>{index ? "Conditions associated with new-onset or acquired squint." : "Factors that can affect eye alignment early in life."}</p></div></header>{group.map((paragraph, item) => <div className={styles.causeRow} key={paragraph}><span className={styles.causeRowIcon} aria-hidden="true"><Image src={`/images/squint/causes/${causeIcons[index][item]}.webp`} alt="" width={52} height={52} sizes="52px" /></span><div><h4>{entry(paragraph).title}</h4><p>{entry(paragraph).text}</p></div></div>)}</article>)}</div></Section>
    <Section index={5}><p className={styles.intro}>The clinical goals and needs for squint care differ between young children and adults.</p><div className={styles.ageGrid}>{[
      {title:"Squint in Children",icon:"child",image:"squint-children-care.webp",text:"Squint in children may be associated with amblyopia (‘lazy eye’). Care focuses on healthy visual development and may include glasses, patching, or alignment treatment according to the child's needs."},
      {title:"Squint in Adults",icon:"doctor",image:"squint-adults-care.webp",text:"Adults with squint may experience double vision, eye strain, or abnormal head posture. Assessment helps identify the cause and guide suitable treatment to improve alignment and visual comfort."},
    ].map(item=><article className={styles.ageCard} key={item.title}><header className={styles.ageHeader}><span className={styles.ageIcon} aria-hidden="true"><SquintIcon name={item.icon}/></span><h3 className="h3">{item.title}</h3></header><div className={styles.ageBody}><div className={styles.ageTextWrap}><p>{item.text}</p></div><div className={styles.ageImageWrap}><Image src={`/images/squint/${item.image}`} alt={`Clinical assessment: ${item.title}`} width={1672} height={941} sizes="(min-width:960px) 30vw, 90vw" className={styles.ageImg}/></div></div></article>)}</div></Section>
    <Section index={6}><SquintEvaluationWorkup /></Section>
    <Section index={7}><p className={styles.intro}>{content[7].paragraphs[0]} These are treatment options, not a mandatory sequence.</p><div className={styles.pathwayGrid}><figure className={styles.pathwayPhoto}><Image src="/images/squint/squint-hero.webp" alt="Illustrative child eye-alignment consultation, not Namokar staff or patients" width={1536} height={1024} sizes="(min-width:960px) 40vw, 100vw" /></figure><ul className={styles.pathway}>{content[7].paragraphs.slice(1).map((paragraph, index) => <li key={paragraph}><InfoRow icon={["glasses", "eye", "prism", "target", "scalpel"][index]} title={entry(paragraph).title} text={treatments[index]} /></li>)}</ul></div></Section>
    <Section index={8}><p className={styles.intro}>{content[8].paragraphs[0]}</p><div className={styles.surgeryFeature}><Copy paragraphs={[content[8].paragraphs[1]]} /><figure><Image src={medicalArt("muscles")} alt="3D anatomical rendering of extraocular muscles on the outer scleral surface" width={1200} height={800} /></figure></div><div className={styles.muscleGrid}>{content[8].paragraphs.slice(2, 4).map((paragraph, index) => <article className={styles.muscleCard} key={paragraph}><figure><Image src={medicalArt(index ? "resection" : "recession")} alt={index ? "Anatomical concept of a shortened rectus muscle reattached at its original insertion" : "Anatomical concept of rectus muscle reattachment posterior to its original insertion"} width={1200} height={800} /></figure><Copy paragraphs={[paragraph]} /></article>)}</div><div className={styles.infoStack}><InfoRow icon="mask" {...entry(content[8].paragraphs[4])} /><InfoRow icon="target" {...entry(content[8].paragraphs[5])} /></div><p className={styles.medicalNote}><SquintIcon name="shield" />{content[8].paragraphs[6]}</p></Section>
    <Section index={9}><p className={styles.intro}>{content[9].paragraphs[0]}</p><ol className={styles.recovery}>{recovery.map(([title, text, icon]) => <li key={title}><span className={styles.featureIcon}><SquintIcon name={icon} /></span><h3 className="h3">{title}</h3><p>{text}</p></li>)}</ol></Section>
    <section id="squint-11" className={`${examStyles.reasons} ${styles.consultationReasons}`} aria-labelledby="section-10-h"><div className="container"><header className={examStyles.reasonsCenterHead}><p className={`${examStyles.eyebrow} kicker`}>{content[10].eyebrow}</p><h2 id="section-10-h" className="h2">{content[10].title}</h2></header><div className={`${examStyles.reasonsGrid} ${styles.reasonGrid}`}>{content[10].paragraphs[0].split("•").slice(1).map((reason, index) => <div className={examStyles.reasonsItem} key={reason}><span className={styles.reasonIcon} aria-hidden="true"><SquintIcon name={["eye", "child", "child", "target", "family"][index]} /></span><span>{reason.trim()}</span></div>)}</div></div></section>
    <section id="squint-medical-evaluation" className={`${styles.section} ${styles.evaluationSection}`} aria-labelledby="squint-evaluation-h"><div className="container"><aside className={styles.evaluationPanel}><div className={styles.evaluationHeader}><span className={styles.featureIcon}><SquintIcon name="clipboard" /></span><h3 className="h3" id="squint-evaluation-h">Prompt Medical Evaluation</h3></div><ul className={styles.evaluationList}>{content[10].paragraphs[1].split(/\(\d\) /).slice(1).map(point => <li key={point}><span aria-hidden="true">✓</span>{point.replace(/; ?$/, "")}</li>)}</ul><div className={styles.evaluationAction}><a className="btn btn--primary" href={TEL_HREF}>Call the Centre</a></div></aside></div></section>
    <Section index={11}><p className={styles.intro}>{content[11].paragraphs[0]}</p><div className={styles.careFeatures}>{content[11].paragraphs.slice(1).map((paragraph, index) => <article className={styles.card} key={paragraph}><span className={styles.featureIcon} aria-hidden="true"><SquintIcon name={["doctor", "clipboard", "pin"][index]} /></span><Copy paragraphs={[paragraph]} /></article>)}</div><div className={styles.sectionAction}><Link className="btn btn--primary" href={LINKS.doctor}>View Dr. Poonam Jain’s Full Profile →</Link></div></Section>
    <section id="watch" className={styles.section} aria-labelledby="watch-h"><div className="container"><header className={styles.heading}><p className="kicker">Watch</p><h2 id="watch-h" className="h2">Videos on this topic</h2><p className={`lead ${styles.videoIntro}`}>Dr. Poonam Jain’s featured video discusses amblyopia, which is related to but distinct from squint. Additional educational videos cover squint, eye alignment, treatment options and surgery. Videos provide general information and do not replace an individual eye examination.</p></header>
      <div className={videoStyles.layout}>
      <div className={videoStyles.featured}><span className={videoStyles.label}>Featured Video · Dr. Poonam Jain</span><CataractVideoCard videoId="mrx8xKLUCQE" title="Lazy eye (amblyopia) in children" description="Amblyopia explained by Dr. Poonam Jain. A squint may contribute to lazy eye, but they are not the same condition." poster="/images/squint/amblyopia-video.jpg" watchUrl="https://www.youtube.com/watch?v=mrx8xKLUCQE" category="Eye Health Education" autoplay={true} /></div>
      <h3 className={videoStyles.heading}>More Videos on Squint and Strabismus</h3>
      <div className={videoStyles.grid}>{[
        { id: "CAiawXTk3Zo", title: "What is strabismus?", channel: "EyeSmart — American Academy of Ophthalmology" },
        { id: "JL6jdyYRjOA", title: "Strabismus in Adults and Children", channel: "Moorfields Eye Hospitals UAE" },
        { id: "fYjIW3KB35U", title: "How is strabismus surgery done?", channel: "EyeSmart — American Academy of Ophthalmology" },
      ].map(video => <CataractVideoCard key={video.id} videoId={video.id} title={video.title} description={video.channel} poster={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} watchUrl={`https://www.youtube.com/watch?v=${video.id}`} category="Third-party educational video" autoplay={true} />)}</div>
      </div>
    </div></section>
    <ServicesFaqSection items={SQUINT_FAQS} heading={content[12].title} lead="General information about eye alignment. An examination is needed for advice about your own eyes or your child’s eyes." serviceStyle allClosed image="/images/452e8467-0cbd-4c38-a11d-1ca6ff9f6035.png" />
    <ExpertEyeCareSection id="related" heading="Related Services" subtitle="Explore related eye care." showBanner={false} serviceRelated items={related} />
    <HomeCta id="squint-consultation" heading={content[13].title} desc={content[13].paragraphs[0]} />
  </main>;
}
