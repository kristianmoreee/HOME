"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Hydration-safe reduced-motion preference. Unlike Motion's useReducedMotion,
 * it reports `false` during SSR and the first client render, so components
 * that render different markup for reduced motion never mismatch on hydrate.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
