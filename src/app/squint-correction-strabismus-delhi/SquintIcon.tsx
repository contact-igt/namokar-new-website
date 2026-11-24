import { FaqIcon } from "@/components/HomeFaqSection";
import type { FaqIconName } from "@/components/HomeFaqSection";

/** Small additions to the site's existing medical icon vocabulary. */
export default function SquintIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    glasses: <><circle cx="6.5" cy="12" r="4.5"/><circle cx="17.5" cy="12" r="4.5"/><path d="M11 12h2M2 12H0m22 0h2"/></>,
    prism: <><path d="m12 3 10 18H2Z"/><path d="M0 12h7m10 1 7 4" stroke="#d66b1f"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 0v6m0 12v6M0 12h6m12 0h6"/></>,
    wash: <><path d="M10 3c-3 4-4 5-4 7a4 4 0 0 0 8 0c0-2-1-3-4-7ZM2 19l5-3 5 2 7-4 3 2-9 6H6"/></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
    pulse: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
    mask: <><path d="M12 3C5 3 1 15 4 19q8 4 16 0C23 15 19 3 12 3Z"/><path d="M8 17q0-9 4-9t4 9M12 20v4"/></>,
    family: <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="17" cy="9" r="3"/><path d="M17 14a3 3 0 0 1 3 3v4"/></>,
    child: <><circle cx="12" cy="12" r="9"/><path d="M10 3q5-5 4 2M8 11h.1m7.8 0h.1M8 16q4 3 8 0"/></>,
    adult: <><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></>,
    user: <><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></>,
    brain: <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04ZM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/><line x1="12" y1="5" x2="12" y2="19"/></>,
    cross: <><rect x="3" y="3" width="18" height="18" rx="4"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></>,
  };
  if (!paths[name]) return <FaqIcon name={name as FaqIconName} />;
  return <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
