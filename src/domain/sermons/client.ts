'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { queryKeys } from '@/lib/api/query-keys';
import type { Paginated } from '@/domain/pagination';
import { toSermonPage } from './mappers';
import type { Sermon, SermonFilters } from './model';

/**
 * Client-side, filterable, "load more" sermon library. Seeded with the
 * server-rendered first page (`initialData`) so the first paint has no
 * loading state; every filter change (series/speaker/search) re-queries from
 * the top.
 */
export function useSermons(
  filters: Omit<SermonFilters, 'cursor'>,
  initialPage?: Paginated<Sermon>
) {
  return useInfiniteQuery({
    queryKey: queryKeys.sermons(filters),
    queryFn: async ({ pageParam }) => {
      const { data } = await apiClient.GET('/sermons', {
        params: { query: { ...filters, cursor: pageParam } },
      });
      return toSermonPage(data);
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    initialData: initialPage
      ? { pages: [initialPage], pageParams: [undefined] }
      : undefined,
  });
}
