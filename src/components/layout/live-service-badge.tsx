'use client';

import Link from 'next/link';
import { Radio } from 'lucide-react';
import { useServiceStatus } from '@/domain/site/client';
import { useCountdown } from '@/lib/live/countdown';
import { routes } from '@/config/routes';
import type { ServiceStatus } from '@/domain/site/model';

/**
 * Live "we're live now" indicator, or a countdown to the next service.
 * Server-rendered with `initial`; from mount it reflects the live SSE feed
 * (mock or real) with no reload.
 */
export function LiveServiceBadge({ initial }: { initial: ServiceStatus }) {
  const status = useServiceStatus(initial);
  const countdown = useCountdown(!status.isLive ? status.nextServiceAt ?? null : null);

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

  const hasCountdown = countdown && !countdown.isPast;
  if (!hasCountdown && !status.label) return null;

  return (
    <div className="text-subtle inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-1.5 text-label font-semibold">
      <Radio className="h-3.5 w-3.5" aria-hidden="true" />
      {hasCountdown
        ? `Next service in ${countdown.days > 0 ? `${countdown.days}d ` : ''}${countdown.hours}h ${countdown.minutes}m`
        : status.label}
    </div>
  );
}
