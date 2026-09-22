import Link from 'next/link';
import { CalendarDays, MapPin } from 'lucide-react';
import { Figure } from '@/components/primitives';
import { EventAvailabilityBadge } from '@/features/home/event-availability-badge';
import { formatDateRange } from '@/lib/format/date';
import { routes } from '@/config/routes';
import type { EventItem } from '@/domain/events/model';

/** The one event-thumbnail treatment — the events index and any other event grid use this. */
export function EventCard({ event }: { event: EventItem }) {
  return (
    <Link href={routes.event(event.slug)} className="group block">
      <Figure src={event.coverUrl} alt={event.title} width={480} height={270} className="aspect-video" imageClassName="group-hover:scale-105" />
      <p className="text-primary-dark mt-4 flex items-center gap-2 text-caption font-semibold">
        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> {formatDateRange(event.startAt, event.endAt)}
      </p>
      <h3 className="font-display group-hover:text-primary-dark mt-2 text-heading-sm font-semibold text-ink transition-colors">
        {event.title}
      </h3>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        {event.locationName ? (
          <p className="text-subtle flex items-center gap-1.5 text-caption">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {event.locationName}
          </p>
        ) : null}
        {event.capacity != null ? (
          <EventAvailabilityBadge
            eventId={event.id}
            initial={{ eventId: event.id, capacity: event.capacity, seatsTaken: event.seatsTaken ?? 0 }}
          />
        ) : null}
      </div>
    </Link>
  );
}
