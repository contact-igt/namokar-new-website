"use client";

import { useState } from "react";

const ITEMS = [
  "Previous eye examination reports",
  "Current spectacles and contact lens details",
  "Previous spectacle prescriptions",
  "Details of earlier eye or eyelid surgery",
  "Retinal scans, OCT reports or visual field tests, if available",
  "List of current medications and eye drops",
  "Relevant medical reports, including diabetes or thyroid-related records",
  "Details of known allergies or previous medication reactions",
  "Identification and relevant travel documents, if required",
  "A list of symptoms, concerns and questions",
];

export default function VisitChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  async function copyChecklist() {
    try {
      await navigator.clipboard.writeText(ITEMS.map((item) => `[${checked.includes(item) ? "x" : " "}] ${item}`).join("\n"));
      setStatus("Checklist copied.");
    } catch {
      setStatus("Copying is unavailable. You can select and copy the checklist text.");
    }
  }

  return (
    <div className="cq">
      <p aria-live="polite">{checked.length}/{ITEMS.length} ready</p>
      <ul className="cq-list">
        {ITEMS.map((item) => (
          <li key={item}>
            <label className="cq-item">
              <input
                type="checkbox"
                checked={checked.includes(item)}
                onChange={(event) => {
                  const selected = event.currentTarget.checked;
                  setChecked((previous) => selected ? [...previous, item] : previous.filter((value) => value !== item));
                  setStatus("");
                }}
              />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn--primary" onClick={copyChecklist}>Copy Checklist</button>
      <p aria-live="polite">{status}</p>
    </div>
  );
}
