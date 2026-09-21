'use client';

import { useEffect, useState } from 'react';
import { getCountdownParts, type CountdownParts } from '@/lib/format/date';

/** Pure client-side ticking countdown to `target` — no network involved. */
export function useCountdown(target: string | Date | null, tickMs = 1_000): CountdownParts | null {
  const [parts, setParts] = useState<CountdownParts | null>(
    target ? getCountdownParts(target) : null
  );

  useEffect(() => {
    if (!target) {
      setParts(null);
      return;
    }
    setParts(getCountdownParts(target));
    const interval = setInterval(() => setParts(getCountdownParts(target)), tickMs);
    return () => clearInterval(interval);
  }, [target, tickMs]);

  return parts;
}
