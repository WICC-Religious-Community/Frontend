'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { queryKeys } from '@/lib/api/query-keys';
import { LiveTopic } from '@/lib/live/topics';
import { useLiveTopic } from '@/lib/live/use-live';
import type { Paginated } from '@/domain/pagination';
import { toEventPage } from './mappers';
import { seatsRemaining, type EventAvailability, type EventFilters, type EventItem } from './model';

export function useEvents(filters: Omit<EventFilters, 'cursor'>, initialPage?: Paginated<EventItem>) {
  return useInfiniteQuery({
    queryKey: queryKeys.events(filters),
    queryFn: async ({ pageParam }) => {
      const { data } = await apiClient.GET('/events', {
        params: { query: { ...filters, cursor: pageParam } },
      });
      return toEventPage(data);
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    initialData: initialPage ? { pages: [initialPage], pageParams: [undefined] } : undefined,
  });
}

/**
 * Live "X spots left" — updates in place as registrations come in, no
 * refresh. SSE is the only transport for this topic: capacity changes are
 * rare enough that polling adds no value, so under
 * `NEXT_PUBLIC_LIVE_TRANSPORT=poll` this simply keeps showing `initial`.
 */
export function useEventAvailability(eventId: string, initial: EventAvailability) {
  const availability = useLiveTopic<EventAvailability>(LiveTopic.eventAvailability(eventId), {
    initial,
  });
  return { ...availability, remaining: seatsRemaining(availability) };
}
