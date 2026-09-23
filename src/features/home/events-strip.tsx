import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { Container, Eyebrow, Figure, Reveal } from '@/components/primitives';
import { EventAvailabilityBadge } from './event-availability-badge';
import { formatDateRange, formatShortDate } from '@/lib/format/date';
import { routes } from '@/config/routes';
import type { EventItem } from '@/domain/events/model';

/** One large next event plus a compact date-forward list — not a row of matching cards. */
export function EventsStrip({ events }: { events: EventItem[] }) {
  if (events.length === 0) return null;
  const [next, ...rest] = events;

  return (
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Eyebrow>What&rsquo;s Happening</Eyebrow>
        <Link
          href={routes.events()}
          className="text-ink hover:text-primary-dark inline-flex items-center gap-1.5 text-body-sm font-semibold transition-colors"
        >
          View all events <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <Reveal>
          <Link href={routes.event(next.slug)} className="group block">
            <Figure src={next.coverUrl} alt={next.title} width={960} height={540} className="aspect-video" imageClassName="group-hover:scale-105" />
            <p className="text-primary-dark mt-6 flex items-center gap-2 text-body-sm font-semibold">
              <CalendarDays className="h-4 w-4" aria-hidden="true" /> {formatDateRange(next.startAt, next.endAt)}
            </p>
            <h3 className="font-display mt-2 text-display-sm font-semibold text-ink">{next.title}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
              {next.locationName ? (
                <p className="text-muted flex items-center gap-1.5 text-body-sm">
                  <MapPin className="h-4 w-4" aria-hidden="true" /> {next.locationName}
                </p>
              ) : null}
              {next.capacity != null ? (
                <EventAvailabilityBadge
                  eventId={next.id}
                  initial={{ eventId: next.id, capacity: next.capacity, seatsTaken: next.seatsTaken ?? 0 }}
                />
              ) : null}
            </div>
          </Link>
        </Reveal>

        {rest.length > 0 ? (
          <Reveal delay={0.1}>
            <ol className="border-border divide-border divide-y border-t">
              {rest.map(event => (
                <li key={event.id}>
                  <Link href={routes.event(event.slug)} className="group flex items-baseline gap-4 py-5">
                    <span className="font-display text-primary-dark w-14 shrink-0 text-body-lg font-semibold">
                      {formatShortDate(event.startAt)}
                    </span>
                    <span className="group-hover:text-primary-dark min-w-0 text-body font-semibold text-ink transition-colors">
                      {event.title}
                    </span>
                    <ArrowUpRight className="text-subtle ml-auto h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        ) : null}
      </div>
    </Container>
  );
}
