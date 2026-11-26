import { Cross, Droplet, Eye, ShieldPlus, Speech, TriangleAlert } from "lucide-react";
import Image from "next/image";
import styles from "./risks-and-recovery.module.css";

const warningSigns = [
  { Icon: Eye, text: "Sudden vision changes or vision loss, severe or rapidly increasing eye pain, or new double vision." },
  { Icon: Droplet, text: "Unusual severe pain or pale, grey, blue or mottled skin after filler injections." },
  { Icon: Speech, text: "Difficulty breathing or swallowing after botulinum toxin treatment." },
  { Icon: TriangleAlert, text: "Sudden weakness, trouble speaking or other stroke symptoms." },
];

export default function RisksAndRecovery() {
  return (
    <section className={styles.section} aria-labelledby="aesthetic-risks-h">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.eyebrow} aria-hidden="true">
            <span><ShieldPlus /> Risks &amp; Recovery</span>
          </div>
          <h2 id="aesthetic-risks-h">Risks &amp; <span className="title-secondary">Recovery</span></h2>
          <p>Risks, results and recovery vary by procedure and individual. During your consultation, Dr. Poonam Jain will discuss what to expect and explain any aftercare and follow-up you may need.</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.visual}>
            <div className={styles.photo}>
              <Image
                src="/images/blepharoplasty/blepharoplasty-indian-patient-close.webp"
                alt="Close-up of a patient during an eyelid assessment"
                fill
                sizes="(max-width: 760px) 94vw, (max-width: 1536px) 40vw, 600px"
              />
            </div>
            <div className={styles.photoBadge} aria-hidden="true">
              <Eye />
              <span>Safe Care.<br />Better Vision.</span>
            </div>
          </div>

          <div className={styles.card}>
            <h3>When to Seek Immediate Medical Attention</h3>
            <ul className={styles.signs} role="list">
              {warningSigns.map(({ Icon, text }) => (
                <li className={styles.row} key={text}>
                  <span className={styles.icon}><Icon aria-hidden="true" /></span>
                  <span className={styles.rowText}>{text}</span>
                </li>
              ))}
            </ul>
            <p className={styles.row}>
              <span className={styles.icon}><Cross aria-hidden="true" /></span>
              <span className={styles.rowText}><strong>Seek emergency medical care immediately.</strong> Notify your treating doctor without delaying emergency care. Do not wait for a routine follow-up.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
