"use client";

import Image from "next/image";
import { useId, useState } from "react";
import RefractiveIcon, { type RefractiveIconName } from "./RefractiveIcon";
import styles from "./TreatmentExperience.module.css";

type Stage = { title: string; desc: string; icon: RefractiveIconName };
const images = ["stage-preparation", "stage-comfort", "stage-treatment", "stage-aftercare"];
const points = [
  ["Confirm your procedure and consent", "Prepare and numb the eye", "Follow your treatment instructions"],
  ["Position the eye for treatment", "Fixation, tracking or suction depend on the technique", "Tell the team if you are uncomfortable"],
  ["The approach depends on your selected procedure", "Laser correction and lens implantation differ", "Your surgeon explains the surgical steps"],
  ["Check healing and treatment position", "Receive drops and follow-up instructions", "Arrange transport and ask when driving is safe"],
];

export default function TreatmentExperience({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  return <div className={styles.layout}>
    <div className={styles.tabs} role="tablist" aria-label="Treatment stages" aria-orientation="vertical">
      {stages.map((stage, index) => <button key={stage.title} id={`${id}-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        let next = index;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % stages.length;
        else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + stages.length - 1) % stages.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = stages.length - 1;
        else return;
        event.preventDefault(); setActive(next); document.getElementById(`${id}-tab-${next}`)?.focus();
      }}><RefractiveIcon name={stage.icon} /><span>{stage.title}</span></button>)}
    </div>
    <div className={styles.panels}>
      {stages.map((stage, index) => <div key={stage.title} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} aria-hidden={active !== index} inert={active !== index} className={`${styles.panel} ${active === index ? styles.active : ""}`}>
        <div className={styles.copy}>
          <h3><RefractiveIcon name={stage.icon} />{stage.title}</h3>
          <p>{stage.desc}</p>
          <ul>{points[index].map(point => <li key={point}><RefractiveIcon name="check" />{point}</li>)}</ul>
        </div>
        <div className={styles.media}><Image src={`/images/refractive/${images[index]}.webp`} alt={["Illustrative surgical preparation with consent clipboard and sterile supplies", "Illustrative ophthalmic headrest and protective preparation equipment", "Illustrative sterile ophthalmic lens preparation", "Illustrative aftercare supplies and follow-up instructions"][index]} width={800} height={450} sizes="(max-width: 767px) 85vw, 32vw" /></div>
      </div>)}
    </div>
  </div>;
}
