'use client';

import Link from 'next/link';
import { Radio } from 'lucide-react';
import { useServiceStatus } from '@/domain/site/client';
import { formatTime } from '@/lib/format/date';
import { routes } from '@/config/routes';
import type { ServiceStatus } from '@/domain/site/model';

/**
 * Live "we're live now" indicator, or the next service's day and time.
 * Server-rendered with `initial`; from mount it reflects the live SSE feed
 * (mock or real) with no reload. Shows the weekday/time of `nextServiceAt`
 * rather than a "time remaining" countdown — formatting a fixed date is
 * deterministic wherever/whenever it renders, a live countdown isn't (see
 * `lib/live/countdown.ts`), and "Sunday, 9:00 AM" is more useful at a
 * glance than a number ticking down anyway.
 */
export function LiveServiceBadge({ initial }: { initial: ServiceStatus }) {
  const status = useServiceStatus(initial);

  if (status.isLive) {
    return (
      <Link
        href={routes.watch()}
        className="bg-danger/10 text-danger inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-label font-semibold"
      >
        <span className="relative flex h-2 w-2">
          <span className="bg-danger absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
          <span className="bg-danger relative inline-flex h-2 w-2 rounded-full" />
        </span>
        {status.label ?? 'We are live'} — Watch now
      </Link>
    );
  }

  const nextService = status.nextServiceAt
    ? `${new Date(status.nextServiceAt).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' })}, ${formatTime(status.nextServiceAt)}`
    : null;
  const text = nextService ? `Next Service: ${nextService}` : status.label;
  if (!text) return null;

  return (
    <div className="text-subtle inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-1.5 text-label font-semibold">
      <Radio className="h-3.5 w-3.5" aria-hidden="true" />
      {text}
    </div>
  );
}
