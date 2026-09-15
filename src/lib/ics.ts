function toIcsDate(value: string): string {
  return new Date(value).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeIcsText(value: string): string {
  return value.replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n');
}

export interface IcsEventInput {
  uid: string;
  title: string;
  description?: string;
  startAt: string;
  endAt?: string;
  location?: string;
}

/** Generates a minimal RFC 5545 .ics file for "Add to calendar" on event pages. */
export function buildIcsFile(event: IcsEventInput): string {
  const start = toIcsDate(event.startAt);
  const end = toIcsDate(event.endAt ?? new Date(new Date(event.startAt).getTime() + 3_600_000).toISOString());

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WICC//Events//EN',
    'BEGIN:VEVENT',
    `UID:${event.uid}@wicc.org`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    event.description ? `DESCRIPTION:${escapeIcsText(event.description)}` : undefined,
    event.location ? `LOCATION:${escapeIcsText(event.location)}` : undefined,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean);

  return lines.join('\r\n');
}

export function icsDataUrl(event: IcsEventInput): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(buildIcsFile(event))}`;
}
