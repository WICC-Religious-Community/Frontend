import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { Container, Figure, Reveal, SectionHeader } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { EventAvailabilityBadge } from './event-availability-badge';
import { formatDateRange } from '@/lib/format/date';
import { routes } from '@/config/routes';
import type { EventItem } from '@/domain/events/model';

export function EventsStrip({ events }: { events: EventItem[] }) {
  if (events.length === 0) return null;

  return (
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader eyebrow="What's Happening" title="Upcoming events" size="sm" />
        <Button asChild variant="link">
          <Link href={routes.events()}>
            View all events <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {events.map((event, index) => (
          <Reveal key={event.id} delay={index * 0.06}>
            <Link href={routes.event(event.slug)} className="group border-border block h-full rounded-lg border p-6">
              <Figure src={event.coverUrl} alt={event.title} width={480} height={270} className="aspect-video" />
              <p className="text-primary-dark mt-4 flex items-center gap-2 text-caption font-semibold">
                <CalendarDays className="h-3.5 w-3.5" /> {formatDateRange(event.startAt, event.endAt)}
              </p>
              <h3 className="font-display mt-2 text-heading-sm font-semibold text-ink">{event.title}</h3>
              {event.locationName ? (
                <p className="text-subtle mt-1 flex items-center gap-1.5 text-caption">
                  <MapPin className="h-3.5 w-3.5" /> {event.locationName}
                </p>
              ) : null}
              {event.capacity != null ? (
                <div className="mt-4">
                  <EventAvailabilityBadge
                    eventId={event.id}
                    initial={{ eventId: event.id, capacity: event.capacity, seatsTaken: event.seatsTaken ?? 0 }}
                  />
                </div>
              ) : null}
            </Link>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
