'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Play, Search } from 'lucide-react';
import { useSermons } from '@/domain/sermons/client';
import type { Paginated } from '@/domain/pagination';
import type { Sermon, SermonSeries } from '@/domain/sermons/model';
import { Figure, Grid, LoadMore, EmptyState } from '@/components/primitives';
import { formatShortDate } from '@/lib/format/date';
import { routes } from '@/config/routes';
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="text-subtle absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search sermons…"
            className="border-border-strong h-11 w-full rounded-md border bg-transparent pl-10 pr-4 text-body-sm outline-none focus:border-primary"
          />
        </div>
        <select
          value={series ?? ''}
          onChange={event => setSeries(event.target.value || undefined)}
          className="border-border-strong h-11 rounded-md border bg-transparent px-4 text-body-sm outline-none focus:border-primary"
        >
          <option value="">All series</option>
          {seriesList.map(item => (
            <option key={item.slug} value={item.slug}>
              {item.title}
            </option>
          ))}
        </select>
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
            <Link key={sermon.id} href={routes.sermon(sermon.slug)} className="group block">
              <Figure
                src={sermon.thumbnailUrl}
                alt={sermon.title}
                width={480}
                height={270}
                className="aspect-video"
                imageClassName="group-hover:scale-105"
              />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-display line-clamp-2 text-heading-sm font-semibold text-ink">{sermon.title}</p>
                  <p className="text-subtle mt-1 text-caption">
                    {sermon.speaker?.name} · {formatShortDate(sermon.publishedAt)}
                  </p>
                </div>
                <span className="bg-primary text-on-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
              </div>
            </Link>
          ))}
        </Grid>
      )}

      <LoadMore onClick={() => fetchNextPage()} isLoading={isFetchingNextPage} hasMore={Boolean(hasNextPage)} />
    </div>
  );
}
