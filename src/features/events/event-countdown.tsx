'use client';

import { useCountdown } from '@/lib/live/countdown';

export function EventCountdown({ startAt }: { startAt: string }) {
  const countdown = useCountdown(startAt);
  if (!countdown || countdown.isPast) return null;

  const units = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds },
  ];

  return (
    <div className="flex gap-4">
      {units.map(unit => (
        <div key={unit.label} className="text-center">
          <p className="font-display text-heading-lg font-semibold text-ink tabular-nums">
            {String(unit.value).padStart(2, '0')}
          </p>
          <p className="text-subtle text-caption uppercase tracking-wide">{unit.label}</p>
        </div>
      ))}
    </div>
  );
}
