'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useCallback, useSyncExternalStore } from 'react';
import type { Announcement } from '@/domain/site/model';

const DISMISS_KEY = 'wicc-announcement-dismissed';
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function AnnouncementBar({ announcement }: { announcement?: Announcement }) {
  const getSnapshot = useCallback(() => {
    try {
      return window.localStorage.getItem(DISMISS_KEY);
    } catch {
      return null;
    }
  }, []);
  // Server/first paint: treat as dismissed so nothing flashes before we can read localStorage.
  const getServerSnapshot = () => announcement?.text ?? null;

  const dismissedText = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!announcement?.enabled || dismissedText === announcement.text) return null;

  const content = (
    <span className="text-body-sm font-medium">
      {announcement.text}
      {announcement.href ? <span className="ml-1 underline underline-offset-2">Learn more</span> : null}
    </span>
  );

  return (
    <div className="bg-dark text-on-dark relative flex items-center justify-center gap-3 px-10 py-2.5 text-center">
      {announcement.href ? (
        <Link href={announcement.href} className="hover:text-primary-light transition-colors">
          {content}
        </Link>
      ) : (
        content
      )}
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          try {
            window.localStorage.setItem(DISMISS_KEY, announcement.text);
          } catch {
            // localStorage unavailable — dismissal just won't persist
          }
          notify();
        }}
        className="absolute right-3 rounded p-1 opacity-70 transition-opacity hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
