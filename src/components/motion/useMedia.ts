"use client";

import { useSyncExternalStore } from "react";

function useQuery(query: string, server = false): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => server,
  );
}

/** True on a device with a mouse or trackpad. Hover and parallax effects are for these only. */
export const useFinePointer = () => useQuery("(hover: hover) and (pointer: fine)");

/** True when the visitor asked their device for less motion. */
export const usePrefersReducedMotion = () => useQuery("(prefers-reduced-motion: reduce)");
