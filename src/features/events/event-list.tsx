'use client';

import { useState } from 'react';
import { useEvents } from '@/domain/events/client';
import type { Paginated } from '@/domain/pagination';
import type { EventItem } from '@/domain/events/model';
import { EmptyState, Grid, LoadMore } from '@/components/primitives';
import { EventCard } from './event-card';
import { cn } from '@/lib/utils/cn';

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
            <EventCard key={event.id} event={event} />
          ))}
        </Grid>
      )}

      <LoadMore onClick={() => fetchNextPage()} isLoading={isFetchingNextPage} hasMore={Boolean(hasNextPage)} />
    </div>
  );
}
