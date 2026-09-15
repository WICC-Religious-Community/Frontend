'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Announcement } from '@/domain/site/model';

const DISMISS_KEY = 'wicc-announcement-dismissed';

export function AnnouncementBar({ announcement }: { announcement?: Announcement }) {
  const [dismissed, setDismissed] = useState(true); // avoid a flash before we can read localStorage

  useEffect(() => {
    if (!announcement?.enabled) return;
    try {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === announcement.text);
    } catch {
      setDismissed(false);
    }
  }, [announcement]);

  if (!announcement?.enabled || dismissed) return null;

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
          setDismissed(true);
        }}
        className="absolute right-3 rounded p-1 opacity-70 transition-opacity hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
