'use client';

import { useEventAvailability } from '@/domain/events/client';
import type { EventAvailability } from '@/domain/events/model';
import { cn } from '@/lib/utils/cn';

/** Live "X spots left" pill — updates as registrations come in, no refresh. */
export function EventAvailabilityBadge({
  eventId,
  initial,
}: {
  eventId: string;
  initial: EventAvailability;
}) {
  const { remaining, capacity } = useEventAvailability(eventId, initial);
  if (remaining == null || capacity == null) return null;

  const isLow = remaining <= capacity * 0.15;
  const isFull = remaining === 0;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-caption font-semibold',
        isFull ? 'bg-danger/10 text-danger' : isLow ? 'bg-warning/10 text-warning' : 'bg-canvas-2 text-muted'
      )}
    >
      {isFull ? 'Fully booked' : `${remaining} spots left`}
    </span>
  );
}
