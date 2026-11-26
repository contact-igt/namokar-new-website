"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { ChevronDownIcon } from "@/components/Icons";
import RefractiveIcon, { type RefractiveIconName } from "./RefractiveIcon";
import styles from "./RefractiveProcedureShowcase.module.css";

type Procedure = { title: string; tag: string; desc: string; visual: string; alt: string };
const icons: RefractiveIconName[] = ["laser", "eye", "target", "lens", "lens"];

export default function RefractiveProcedureShowcase({ procedures }: { procedures: Procedure[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const select = (index: number) => setActive((index + procedures.length) % procedures.length);
  const current = procedures[active];
  return <div className={styles.showcase}>
    <div className={styles.tabs} role="tablist" aria-label="Refractive procedures">
      {procedures.map((procedure, index) => <button key={procedure.title} id={`${id}-tab-${index}`} type="button" role="tab" aria-selected={index === active} aria-controls={`${id}-panel`} tabIndex={index === active ? 0 : -1} onClick={() => select(index)} onKeyDown={event => {
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % procedures.length;
        else if (event.key === "ArrowLeft") next = (index + procedures.length - 1) % procedures.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = procedures.length - 1;
        else return;
        event.preventDefault(); select(next);
        document.getElementById(`${id}-tab-${next}`)?.focus();
      }}><RefractiveIcon name={icons[index]} />{procedure.title}</button>)}
    </div>
    <div className={styles.stage}>
      <button type="button" className={styles.arrow} aria-label="Previous procedure" onClick={() => select(active - 1)}>
        <ChevronDownIcon aria-hidden="true" className={styles.previousIcon} />
      </button>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className={styles.panel}>
        <div key={current.title} className={styles.panelInner}>
          <Image src={current.visual} alt={current.alt} width={960} height={540} sizes="(max-width: 767px) 90vw, 45vw" />
          <div className={styles.copy}><span>{current.tag}</span><h3>{current.title}</h3><p>{current.desc}</p></div>
        </div>
      </div>
      <button type="button" className={styles.arrow} aria-label="Next procedure" onClick={() => select(active + 1)}>
        <ChevronDownIcon aria-hidden="true" className={styles.nextIcon} />
      </button>
    </div>
  </div>;
}
