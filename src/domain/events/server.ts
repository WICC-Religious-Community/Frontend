import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { pagedWhenConfigured, recordWhenConfigured } from '@/lib/api/fallback';
import { sampleEvents } from '@/content/sample';
import { isPast, isUpcoming } from '@/lib/format/date';
import type { Paginated } from '@/domain/pagination';
import { toEvent, toEventPage } from './mappers';
import type { EventFilters, EventItem } from './model';

function filterSampleEvents(filters: EventFilters): EventItem[] {
  let items = sampleEvents;
  if (filters.view === 'upcoming') items = items.filter(event => isUpcoming(event.startAt));
  if (filters.view === 'past') items = items.filter(event => isPast(event.startAt));
  if (filters.ministry) items = items.filter(event => event.ministrySlug === filters.ministry);
  return items;
}

export async function getEvents(filters: EventFilters = {}): Promise<Paginated<EventItem>> {
  const sample = filterSampleEvents(filters);
  return pagedWhenConfigured(sample.slice(0, filters.limit ?? sample.length), async () => {
    const { data } = await apiClient.GET('/events', {
      params: { query: filters },
      next: { tags: ['events'], revalidate: 60 },
    });
    return toEventPage(data);
  });
}

export const getEvent = cache(async (slug: string): Promise<EventItem> =>
  recordWhenConfigured(
    'event',
    () => sampleEvents.find(event => event.slug === slug),
    async () => {
      const { data } = await apiClient.GET('/events/{slug}', {
        params: { path: { slug } },
        next: { tags: ['events', `event:${slug}`], revalidate: 60 },
      });
      return toEvent(data);
    }
  )
);

export async function getAllEventSlugs(): Promise<string[]> {
  const { items } = await getEvents({ view: 'all', limit: 200 });
  return items.map(item => item.slug);
}
