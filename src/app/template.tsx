"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";

/** Number of pages this tab has shown. Lives in the browser only; reset by a full page load. */
let pagesShown = 0;

/**
 * A template remounts on every navigation. From the second page of a visit on, the new page eases
 * in (opacity and a 6 px shift, 200 ms). The first page is never animated, so it adds nothing to
 * the time it takes to appear. Added before paint (layout effect) so there is no flash, and
 * switched off by the reduced-motion rule in globals.css.
 */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (pagesShown > 0) ref.current?.classList.add("page-enter");
    pagesShown += 1;
  }, []);
  return <div ref={ref}>{children}</div>;
}
