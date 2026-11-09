import type { ReactNode } from "react";
import styles from "./interior.module.css";

/** Opt-in presentation for interior routes. Home and About never use this wrapper. */
export default function InteriorPage({
  children,
  kind,
  className = "",
}: {
  children: ReactNode;
  kind: string;
  className?: string;
}) {
  return (
    <main id="main" className={`${styles.page} ${className}`} data-interior-page data-page-kind={kind}>
      {children}
    </main>
  );
}
