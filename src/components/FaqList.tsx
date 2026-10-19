import { PlusIcon } from "./Icons";

/** Native disclosure list: keyboard accessible and readable without JavaScript. */
export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq-list">
      {items.map((f) => (
        <details key={f.q} className="faq">
          <summary>
            <span>{f.q}</span>
            <PlusIcon className="faq-plus" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
