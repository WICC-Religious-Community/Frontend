"use client";

import { useMediaQuery } from "@/lib/hooks/use-media-query";

/** Mirrors Tailwind's default `screens` config — keep in sync if that config changes. */
const BREAKPOINTS = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS | "base";

/** Returns the largest Tailwind breakpoint currently matched. */
export function useBreakpoint(): Breakpoint {
  const isSm = useMediaQuery(BREAKPOINTS.sm);
  const isMd = useMediaQuery(BREAKPOINTS.md);
  const isLg = useMediaQuery(BREAKPOINTS.lg);
  const isXl = useMediaQuery(BREAKPOINTS.xl);
  const is2xl = useMediaQuery(BREAKPOINTS["2xl"]);

  if (is2xl) return "2xl";
  if (isXl) return "xl";
  if (isLg) return "lg";
  if (isMd) return "md";
  if (isSm) return "sm";
  return "base";
}
