/**
 * Date/time formatting. Pure functions, no framework dependency — every value
 * goes in and out as an ISO string or Date so server and client agree byte
 * for byte (no hydration mismatch from locale/timezone drift).
 */

const DAY_MS = 86_400_000;

export function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

/** "Sunday, 12 October 2026" */
export function formatDate(
  value: string | Date,
  opts: Intl.DateTimeFormatOptions = {}
): string {
  return toDate(value).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
    ...opts,
  });
}

/** "Oct 12" — compact, for cards/lists. */
export function formatShortDate(value: string | Date): string {
  return toDate(value).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
}

/** "9:00 AM" */
export function formatTime(value: string | Date, timeZoneLabel?: string): string {
  const time = toDate(value).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });
  return timeZoneLabel ? `${time} ${timeZoneLabel}` : time;
}

/** "Oct 12, 9:00 AM – 11:00 AM" for an event with a known end time. */
export function formatDateRange(start: string | Date, end?: string | Date): string {
  const startLabel = `${formatShortDate(start)}, ${formatTime(start)}`;
  if (!end) return startLabel;
  const endDate = toDate(end);
  const startDate = toDate(start);
  const sameDay = startDate.toDateString() === endDate.toDateString();
  return sameDay
    ? `${startLabel} – ${formatTime(endDate)}`
    : `${startLabel} – ${formatShortDate(endDate)}, ${formatTime(endDate)}`;
}

export function isUpcoming(value: string | Date, now: Date = new Date()): boolean {
  return toDate(value).getTime() >= now.getTime();
}

export function isPast(value: string | Date, now: Date = new Date()): boolean {
  return !isUpcoming(value, now);
}

/**
 * Next occurrence of a weekly recurring time (e.g. "next Sunday at 9:00 AM"),
 * given a day-of-week (0=Sunday) and 24h "HH:mm". Used for service-time
 * countdowns and JSON-LD when the backend models a recurring service instead
 * of a one-off event.
 */
export function getNextWeekday(
  dayOfWeek: number,
  time: string,
  from: Date = new Date()
): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const result = new Date(from);
  result.setHours(hours, minutes, 0, 0);
  const currentDay = result.getDay();
  let diff = (dayOfWeek - currentDay + 7) % 7;
  if (diff === 0 && result.getTime() <= from.getTime()) diff = 7;
  result.setDate(result.getDate() + diff);
  return result;
}

/** "in 3 days" / "2 hours ago" — coarse, human relative time. */
export function relativeTime(value: string | Date, now: Date = new Date()): string {
  const diffMs = toDate(value).getTime() - now.getTime();
  const absMs = Math.abs(diffMs);
  const future = diffMs >= 0;

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', DAY_MS * 365],
    ['month', DAY_MS * 30],
    ['week', DAY_MS * 7],
    ['day', DAY_MS],
    ['hour', 3_600_000],
    ['minute', 60_000],
  ];

  for (const [unit, unitMs] of units) {
    if (absMs >= unitMs) {
      const amount = Math.round(absMs / unitMs);
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      return rtf.format(future ? amount : -amount, unit);
    }
  }
  return future ? 'in a moment' : 'just now';
}

export type CountdownParts = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

/** Decompose the delta to `target` into calendar-friendly units. */
export function getCountdownParts(target: string | Date, now: Date = new Date()): CountdownParts {
  const totalMs = toDate(target).getTime() - now.getTime();
  const isPastTarget = totalMs <= 0;
  const abs = Math.abs(totalMs);
  return {
    totalMs,
    days: Math.floor(abs / DAY_MS),
    hours: Math.floor((abs % DAY_MS) / 3_600_000),
    minutes: Math.floor((abs % 3_600_000) / 60_000),
    seconds: Math.floor((abs % 60_000) / 1_000),
    isPast: isPastTarget,
  };
}
