import type { ReactNode } from "react";
import styles from "./story.module.css";

/** Static page compositions. Header, footer and floating actions live outside this scope. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className={styles.story}>{children}</div>;
}
