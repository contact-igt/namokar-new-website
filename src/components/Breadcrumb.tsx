import Link from "next/link";
import { breadcrumbs } from "@/lib/schema";
import JsonLd from "./JsonLd";

/** Breadcrumb: Home / [trail…] / current. */
export default function Breadcrumb({
  current,
  trail = [],
}: {
  current: string;
  trail?: { label: string; href: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          ...trail.map((t) => ({ name: t.label, path: t.href })),
          { name: current },
        ])}
      />
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {trail.map((t) => (
          <li key={t.href}>
            <Link href={t.href}>{t.label}</Link>
          </li>
        ))}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
