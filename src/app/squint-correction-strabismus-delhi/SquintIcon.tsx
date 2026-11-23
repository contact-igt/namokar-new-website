import { FaqIcon } from "@/components/HomeFaqSection";
import type { FaqIconName } from "@/components/HomeFaqSection";

/** Small additions to the site's existing medical icon vocabulary. */
export default function SquintIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    glasses: <><circle cx="6.5" cy="12" r="4.5"/><circle cx="17.5" cy="12" r="4.5"/><path d="M11 12h2M2 12H0m22 0h2"/></>,
    prism: <><path d="m12 3 10 18H2Z"/><path d="M0 12h7m10 1 7 4" stroke="#d66b1f"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 0v6m0 12v6M0 12h6m12 0h6"/></>,
    wash: <><path d="M10 3c-3 4-4 5-4 7a4 4 0 0 0 8 0c0-2-1-3-4-7ZM2 19l5-3 5 2 7-4 3 2-9 6H6"/></>,
    activity: <><path d="M3 16q3-3 6 0t6 0t6 0M3 21q3-3 6 0t6 0t6 0M3 3l18 18M4 10l6-4 5 4"/><circle cx="18" cy="5" r="2"/></>,
    mask: <><path d="M12 3C5 3 1 15 4 19q8 4 16 0C23 15 19 3 12 3Z"/><path d="M8 17q0-9 4-9t4 9M12 20v4"/></>,
    family: <><circle cx="12" cy="7" r="3"/><circle cx="4" cy="10" r="2"/><circle cx="20" cy="10" r="2"/><path d="M6 22v-6a6 6 0 0 1 12 0v6ZM1 21v-5m22 5v-5"/></>,
    child: <><circle cx="12" cy="12" r="9"/><path d="M10 3q5-5 4 2M8 11h.1m7.8 0h.1M8 16q4 3 8 0"/></>,
  };
  if (!paths[name]) return <FaqIcon name={name as FaqIconName} />;
  return <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
