import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { pagedWhenConfigured, recordWhenConfigured, whenConfigured } from '@/lib/api/fallback';
import { sampleSermons, sampleSermonSeries } from '@/content/sample';
import type { Paginated } from '@/domain/pagination';
import { toSermon, toSermonPage, toSermonSeries, toSermonSeriesList } from './mappers';
import type { Sermon, SermonFilters, SermonSeries } from './model';

function filterSampleSermons(filters: SermonFilters): Sermon[] {
  let items = sampleSermons;
  if (filters.series) items = items.filter(sermon => sermon.series?.slug === filters.series);
  if (filters.speaker) items = items.filter(sermon => sermon.speaker?.id === filters.speaker);
  if (filters.q) {
    const q = filters.q.toLowerCase();
    items = items.filter(sermon => sermon.title.toLowerCase().includes(q));
  }
  return items;
}

export async function getSermons(filters: SermonFilters = {}): Promise<Paginated<Sermon>> {
  const sample = filterSampleSermons(filters);
  return pagedWhenConfigured(sample.slice(0, filters.limit ?? sample.length), async () => {
    const { data } = await apiClient.GET('/sermons', {
      params: { query: filters },
      next: { tags: ['sermons'], revalidate: 300 },
    });
    return toSermonPage(data);
  });
}

export const getSermon = cache(async (slug: string): Promise<Sermon> =>
  recordWhenConfigured(
    'sermon',
    () => sampleSermons.find(sermon => sermon.slug === slug),
    async () => {
      const { data } = await apiClient.GET('/sermons/{slug}', {
        params: { path: { slug } },
        next: { tags: ['sermons', `sermon:${slug}`], revalidate: 3600 },
      });
      return toSermon(data);
    }
  )
);

export const getSermonSeriesList = cache(async (): Promise<SermonSeries[]> =>
  whenConfigured(sampleSermonSeries, async () => {
    const { data } = await apiClient.GET('/sermon-series', {
      next: { tags: ['sermon-series'], revalidate: 3600 },
    });
    return toSermonSeriesList(data);
  })
);

export const getSermonSeries = cache(async (slug: string): Promise<SermonSeries> =>
  recordWhenConfigured(
    'sermon series',
    () => sampleSermonSeries.find(series => series.slug === slug),
    async () => {
      const { data } = await apiClient.GET('/sermon-series/{slug}', {
        params: { path: { slug } },
        next: { tags: ['sermon-series', `sermon-series:${slug}`], revalidate: 3600 },
      });
      return toSermonSeries(data);
    }
  )
);

/** Every slug currently published — feeds `generateStaticParams` and `sitemap.ts`. */
export async function getAllSermonSlugs(): Promise<string[]> {
  const { items } = await getSermons({ limit: 200 });
  return items.map(item => item.slug);
}
