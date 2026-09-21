'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import { useEvents } from '@/domain/events/client';
import type { Paginated } from '@/domain/pagination';
import type { EventItem } from '@/domain/events/model';
import { EmptyState, Figure, Grid, LoadMore } from '@/components/primitives';
import { EventAvailabilityBadge } from '@/features/home/event-availability-badge';
import { formatDateRange } from '@/lib/format/date';
import { cn } from '@/lib/utils/cn';
import { routes } from '@/config/routes';

const VIEWS = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
] as const;

export function EventList({ initialPage }: { initialPage: Paginated<EventItem> }) {
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useEvents(
    { view },
    view === 'upcoming' ? initialPage : undefined
  );
  const events = data?.pages.flatMap(page => page.items) ?? (view === 'upcoming' ? initialPage.items : []);

  return (
    <div>
      <div className="border-border inline-flex rounded-full border p-1">
        {VIEWS.map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => setView(option.value)}
            className={cn(
              'rounded-full px-4 py-1.5 text-body-sm font-medium transition-colors',
              view === option.value ? 'bg-primary text-on-primary' : 'text-muted hover:text-ink'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {events.length === 0 ? (
        <EmptyState className="mt-10" title="No events to show" description="Check back soon for new gatherings." />
      ) : (
        <Grid columns={3} className="mt-10">
          {events.map(event => (
            <Link key={event.id} href={routes.event(event.slug)} className="border-border block h-full rounded-lg border p-6">
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
          ))}
        </Grid>
      )}

      <LoadMore onClick={() => fetchNextPage()} isLoading={isFetchingNextPage} hasMore={Boolean(hasNextPage)} />
    </div>
  );
}
