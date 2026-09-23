'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useSermons } from '@/domain/sermons/client';
import type { Paginated } from '@/domain/pagination';
import type { Sermon, SermonSeries } from '@/domain/sermons/model';
import { EmptyState, Grid, LoadMore } from '@/components/primitives';
import { SermonCard } from './sermon-card';
import { useDebouncedValue } from '@/hooks/use-debounced-value';

export function SermonLibrary({
  initialPage,
  seriesList,
}: {
  initialPage: Paginated<Sermon>;
  seriesList: SermonSeries[];
}) {
  const [search, setSearch] = useState('');
  const [series, setSeries] = useState<string | undefined>(undefined);
  const debouncedSearch = useDebouncedValue(search, 300);

  const filters = useMemo(
    () => ({ q: debouncedSearch || undefined, series }),
    [debouncedSearch, series]
  );
  const isFiltering = Boolean(filters.q || filters.series);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSermons(
    filters,
    isFiltering ? undefined : initialPage
  );

  const sermons = data?.pages.flatMap(page => page.items) ?? (isFiltering ? [] : initialPage.items);

  return (
    <div>
      <div className="border-border flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="text-subtle absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search sermons…"
            className="h-10 w-full border-b border-transparent bg-transparent pl-6 text-body-sm text-ink outline-none placeholder:text-subtle focus:border-primary"
          />
        </div>
        {seriesList.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSeries(undefined)}
              className={
                !series
                  ? 'bg-primary text-on-primary rounded-full px-4 py-1.5 text-body-sm font-medium'
                  : 'text-muted hover:text-ink rounded-full px-4 py-1.5 text-body-sm font-medium transition-colors'
              }
            >
              All series
            </button>
            {seriesList.map(item => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setSeries(item.slug)}
                className={
                  series === item.slug
                    ? 'bg-primary text-on-primary rounded-full px-4 py-1.5 text-body-sm font-medium'
                    : 'text-muted hover:text-ink rounded-full px-4 py-1.5 text-body-sm font-medium transition-colors'
                }
              >
                {item.title}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {sermons.length === 0 ? (
        <EmptyState
          className="mt-10"
          title="No sermons found"
          description="Try a different search term or clear your filters."
        />
      ) : (
        <Grid columns={3} className="mt-10">
          {sermons.map(sermon => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </Grid>
      )}

      <LoadMore onClick={() => fetchNextPage()} isLoading={isFetchingNextPage} hasMore={Boolean(hasNextPage)} />
    </div>
  );
}
