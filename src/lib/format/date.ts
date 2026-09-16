const DEFAULT_LOCALE = "en-US";

function toDate(value: Date | string): Date {
  return typeof value === "string" ? new Date(value) : value;
}

export function formatDate(value: Date | string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, { dateStyle: "long", ...options }).format(
    toDate(value)
  );
}

export function formatTime(value: Date | string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, { timeStyle: "short", ...options }).format(
    toDate(value)
  );
}

export function formatDateTime(value: Date | string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    dateStyle: "long",
    timeStyle: "short",
    ...options,
  }).format(toDate(value));
}

const RELATIVE_TIME_DIVISIONS: Array<{ amount: number; unit: Intl.RelativeTimeFormatUnit }> = [
  { amount: 60, unit: "seconds" },
  { amount: 60, unit: "minutes" },
  { amount: 24, unit: "hours" },
  { amount: 7, unit: "days" },
  { amount: 4.34524, unit: "weeks" },
  { amount: 12, unit: "months" },
  { amount: Number.POSITIVE_INFINITY, unit: "years" },
];

/** e.g. "in 3 days", "2 hours ago". */
export function formatRelativeTime(value: Date | string, now: Date = new Date()): string {
  const rtf = new Intl.RelativeTimeFormat(DEFAULT_LOCALE, { numeric: "auto" });
  let duration = (toDate(value).getTime() - now.getTime()) / 1000;

  for (const division of RELATIVE_TIME_DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }

  return rtf.format(Math.round(duration), "years");
}
