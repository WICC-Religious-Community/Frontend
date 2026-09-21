import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { emptyPage, recordWhenConfigured, whenConfigured } from '@/lib/api/fallback';
import type { Paginated } from '@/domain/pagination';
import { toEvent, toEventPage } from './mappers';
import type { EventFilters, EventItem } from './model';

export async function getEvents(filters: EventFilters = {}): Promise<Paginated<EventItem>> {
  return whenConfigured(emptyPage<EventItem>(), async () => {
    const { data } = await apiClient.GET('/events', {
      params: { query: filters },
      next: { tags: ['events'], revalidate: 60 },
    });
    return toEventPage(data);
  });
}

export const getEvent = cache(async (slug: string): Promise<EventItem> =>
  recordWhenConfigured('event', async () => {
    const { data } = await apiClient.GET('/events/{slug}', {
      params: { path: { slug } },
      next: { tags: ['events', `event:${slug}`], revalidate: 60 },
    });
    return toEvent(data);
  })
);

export async function getAllEventSlugs(): Promise<string[]> {
  const { items } = await getEvents({ view: 'all', limit: 200 });
  return items.map(item => item.slug);
}
