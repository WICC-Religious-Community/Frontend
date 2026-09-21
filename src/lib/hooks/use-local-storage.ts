"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function dispatchChange() {
  for (const listener of listeners) listener();
}

/** Persisted state backed by `localStorage`, synced across tabs and components sharing `key`. */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const subscribe = useCallback((onChange: () => void) => {
    listeners.add(onChange);
    window.addEventListener("storage", onChange);
    return () => {
      listeners.delete(onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const getSnapshot = useCallback(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? undefined : raw;
    } catch {
      return undefined;
    }
  }, [key]);

  const getServerSnapshot = () => undefined;

  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const value = raw === undefined ? initialValue : (JSON.parse(raw) as T);

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      try {
        const resolved = next instanceof Function ? next(value) : next;
        window.localStorage.setItem(key, JSON.stringify(resolved));
        dispatchChange();
      } catch {
        // Storage unavailable (private browsing, quota exceeded) — state just won't persist.
      }
    },
    [key, value]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      dispatchChange();
    } catch {
      // Storage unavailable — nothing to clean up.
    }
  }, [key]);

  return [value, setValue, removeValue] as const;
}
