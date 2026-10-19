"use client";

import { useState } from "react";

const QUESTIONS = [
  "What exactly is being suggested, and why?",
  "What are the risks for me?",
  "What will it not change?",
  "What does recovery involve for my work and daily life?",
  "What happens if I am not happy with the result?",
] as const;

/**
 * A checklist of questions worth asking at any consultation. The questions are the ones already
 * on the page. Ticks stay on the visitor's own device (nothing is stored or sent); "Copy my list"
 * copies the chosen questions as plain text to take to the appointment. Pending review
 * (src/config/figures.ts).
 */
export default function ConsultationQuestions() {
  const [on, setOn] = useState<boolean[]>(QUESTIONS.map(() => true));
  const [note, setNote] = useState("");

  const copy = async () => {
    const text = QUESTIONS.filter((_, i) => on[i]).map((q, i) => `${i + 1}. ${q}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setNote("Copied. You can paste the list into a note to bring with you.");
    } catch {
      setNote("Your browser did not allow copying. You can select the questions and copy them by hand.");
    }
  };

  return (
    <div className="cq">
      <ul className="cq-list">
        {QUESTIONS.map((q, i) => (
          <li key={q}>
            <label className="cq-item">
              <input type="checkbox" checked={on[i]} onChange={() => setOn((a) => a.map((v, j) => (j === i ? !v : v)))} />
              <span>{q}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="clin-actions">
        <button type="button" className="btn btn--primary" onClick={copy} disabled={!on.some(Boolean)}>
          Copy my list
        </button>
      </div>
      <p className="clin-cue" aria-live="polite">{note}</p>
    </div>
  );
}
