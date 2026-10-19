"use client";

/**
 * A segmented control (radio-style buttons). Real <button>s with aria-pressed, 44 px tall,
 * operable by tap, click, Enter and Space. The state change is a CSS colour and shadow
 * transition (see .seg in globals.css), which needs no animation library.
 */
export default function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" className="seg-btn" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
