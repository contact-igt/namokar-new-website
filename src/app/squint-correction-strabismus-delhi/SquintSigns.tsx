"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { ArrowRightIcon } from "@/components/Icons";
import styles from "./squint.module.css";

type Sign = { title: string; text: string };
const photographs = [
  [
    { file: "child-misalignment-premium", alt: "Illustrative photograph of a child with visible inward eye deviation", position: "50% 50%" },
    { file: "child-bright-light-premium", alt: "Illustrative photograph of a child shielding her eyes and closing one eye in sunlight", position: "50% 50%" },
    { file: "child-head-posture-premium", alt: "Illustrative photograph of a child tilting his head during a vision assessment", position: "50% 50%" },
    { file: "child-reaching-distance-premium", alt: "Illustrative photograph of a child carefully judging the distance to a small block", position: "50% 50%" },
    { file: "child-visual-avoidance-premium", alt: "Illustrative photograph of a child hesitating over a near-vision task with an optometrist", position: "50% 50%" },
  ],
  [
    { file: "adult-double-vision-premium", alt: "Illustrative photograph of an adult having difficulty focusing on a phone", position: "50% 50%" },
    { file: "adult-eye-strain-premium", alt: "Illustrative photograph of an adult resting her brow after screen work", position: "50% 50%" },
    { file: "adult-spatial-depth-premium", alt: "Illustrative photograph of an adult carefully judging distance while pouring water", position: "50% 50%" },
    { file: "adult-eye-closure-premium", alt: "Illustrative photograph of an adult closing one eye while reading", position: "50% 50%" },
    { file: "adult-misalignment-premium", alt: "Illustrative photograph of an adult with visible outward eye deviation", position: "50% 50%" },
  ],
];
export default function SquintSigns({ groups }: { groups: Sign[][] }) {
  const [active, setActive] = useState(0);
  const [positions, setPositions] = useState([0, 0]);
  const [reduced, setReduced] = useState(false);
  const slider = useRef<Slider>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return <div className={styles.signs}>
    <div role="tablist" aria-label="Signs by age group" className={styles.signTabs}>
      {["Observable Changes in Children", "Common Changes in Adults"].map((label, index) => <button key={label} ref={el => { tabs.current[index] = el; }} type="button" role="tab" id={`sign-tab-${index}`} aria-controls="sign-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
          event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - active;
          setActive(next); tabs.current[next]?.focus();
        }
      }}>{label}</button>)}
    </div>
    <div id="sign-panel" role="tabpanel" aria-labelledby={`sign-tab-${active}`} className={styles.signTrack}>
      <button className={styles.previous} type="button" aria-label="Previous symptom" onClick={() => slider.current?.slickPrev()}><ArrowRightIcon /></button>
      <Slider key={active} ref={slider} initialSlide={positions[active]} slidesToShow={3} slidesToScroll={1} infinite arrows={false} dots speed={reduced ? 0 : 400} swipe accessibility afterChange={position => setPositions(previous => previous.map((value, index) => index === active ? position : value))} responsive={[{ breakpoint: 960, settings: { slidesToShow: 2 } }, { breakpoint: 640, settings: { slidesToShow: 1 } }]}>
        {groups[active].map((sign, index) => <div key={sign.title} className={styles.signSlide}><article className={styles.signCard}>
          <div className={styles.signImage}><Image src={`/images/squint/signs/${photographs[active][index].file}.webp`} alt={photographs[active][index].alt} width={800} height={520} style={{ objectPosition: photographs[active][index].position }} sizes="(min-width:960px) 30vw, (min-width:640px) 45vw, 90vw" /><h3 className="h3">{sign.title}</h3></div>
          <p>{sign.text}</p>
        </article></div>)}
      </Slider>
      <button className={styles.next} type="button" aria-label="Next symptom" onClick={() => slider.current?.slickNext()}><ArrowRightIcon /></button>
    </div>
  </div>;
}
