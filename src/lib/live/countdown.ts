'use client';

import { useEffect, useState } from 'react';
import { getCountdownParts, type CountdownParts } from '@/lib/format/date';

/** Pure client-side ticking countdown to `target` — no network involved. */
export function useCountdown(target: string | Date | null, tickMs = 1_000): CountdownParts | null {
  const [trackedTarget, setTrackedTarget] = useState(target);
  const [parts, setParts] = useState<CountdownParts | null>(
    target ? getCountdownParts(target) : null
  );

  // `target` changed since the last render — resync immediately rather than
  // waiting a render behind for the effect below to catch up.
  if (target !== trackedTarget) {
    setTrackedTarget(target);
    setParts(target ? getCountdownParts(target) : null);
  }

  useEffect(() => {
    if (!target) return;
    const interval = setInterval(() => setParts(getCountdownParts(target)), tickMs);
    return () => clearInterval(interval);
  }, [target, tickMs]);

  return parts;
}
