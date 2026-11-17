import type { ReactNode } from "react";

/** Keep authored heading markup; accent the final phrase of plain text titles. */
export default function HeadingText({ children }: { children: ReactNode }) {
  if (typeof children !== "string") return <>{children}</>;
  const words = children.trim().split(/\s+/);
  if (words.length < 2) return <>{children}</>;
  const split = Math.ceil(words.length / 2);
  return <>{words.slice(0, split).join(" ")} <span className="title-secondary">{words.slice(split).join(" ")}</span></>;
}
