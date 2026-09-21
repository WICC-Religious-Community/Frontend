"use client";

import { useState } from "react";

/**
 * Returns `value` as of the previous render — `undefined` on first render.
 * Updates state during render (React's documented pattern for this) rather
 * than in an effect, so the "previous" value is never a render behind.
 */
export function usePrevious<T>(value: T): T | undefined {
  const [pair, setPair] = useState<[T | undefined, T]>([undefined, value]);

  if (pair[1] !== value) {
    setPair([pair[1], value]);
  }

  return pair[0];
}
