"use client";

import { createContext, useContext } from "react";

export const ServiceVideoPlaybackContext = createContext<(() => void) | undefined>(undefined);

export function useServiceVideoPlayback() {
  return useContext(ServiceVideoPlaybackContext);
}
