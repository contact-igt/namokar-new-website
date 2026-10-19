"use client";

/** A list of 44 px buttons that pick one part of a figure (aria-pressed marks the current one). */
export default function PartList<T extends string>({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: { id: T; name: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <ul className="clin-parts" aria-label={label}>
      {items.map((p, i) => (
        <li key={p.id}>
          <button type="button" className="clin-part" aria-pressed={p.id === value} onClick={() => onChange(p.id)}>
            <span className="clin-part-n" aria-hidden="true">{i + 1}</span>
            {p.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
