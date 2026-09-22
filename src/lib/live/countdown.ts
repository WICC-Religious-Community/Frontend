'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';
import { getCountdownParts, type CountdownParts } from '@/lib/format/date';

function partsEqual(a: CountdownParts | null, b: CountdownParts | null): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.days === b.days && a.hours === b.hours && a.minutes === b.minutes && a.seconds === b.seconds && a.isPast === b.isPast;
}

/**
 * Pure client-side ticking countdown to `target`, built on
 * `useSyncExternalStore` rather than state-plus-effect — the server (build
 * time, for a statically-generated page) can't know how much time will have
 * passed by the time the page is actually opened, so `getServerSnapshot`
 * returns `null`. React hydrates with that, then syncs to the real value
 * immediately after — the sanctioned way to handle a value that legitimately
 * differs between server and client, without it registering as a hydration
 * mismatch.
 */
export function useCountdown(target: string | Date | null, tickMs = 1_000): CountdownParts | null {
  // getSnapshot must return a referentially stable value when nothing has
  // actually changed, or React sees a "changed" store on every render check.
  // getCountdownParts allocates a new object each call, so cache it and only
  // hand out a new reference when a field actually differs (in practice,
  // once per tick).
  const cacheRef = useRef<CountdownParts | null>(null);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!target) return () => {};
      const interval = setInterval(onStoreChange, tickMs);
      return () => clearInterval(interval);
    },
    [target, tickMs]
  );

  const getSnapshot = useCallback(() => {
    const next = target ? getCountdownParts(target) : null;
    if (!partsEqual(cacheRef.current, next)) {
      cacheRef.current = next;
    }
    return cacheRef.current;
  }, [target]);

  const getServerSnapshot = useCallback(() => null, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
