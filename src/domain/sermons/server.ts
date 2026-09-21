import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import type { Paginated } from '@/domain/pagination';
import { toSermon, toSermonPage, toSermonSeries, toSermonSeriesList } from './mappers';
import type { Sermon, SermonFilters, SermonSeries } from './model';

export async function getSermons(filters: SermonFilters = {}): Promise<Paginated<Sermon>> {
  const { data } = await apiClient.GET('/sermons', {
    params: { query: filters },
    next: { tags: ['sermons'], revalidate: 300 },
  });
  return toSermonPage(data);
}

export const getSermon = cache(async (slug: string): Promise<Sermon> => {
  const { data } = await apiClient.GET('/sermons/{slug}', {
    params: { path: { slug } },
    next: { tags: ['sermons', `sermon:${slug}`], revalidate: 3600 },
  });
  return toSermon(data);
});

export const getSermonSeriesList = cache(async (): Promise<SermonSeries[]> => {
  const { data } = await apiClient.GET('/sermon-series', {
    next: { tags: ['sermon-series'], revalidate: 3600 },
  });
  return toSermonSeriesList(data);
});

export const getSermonSeries = cache(async (slug: string): Promise<SermonSeries> => {
  const { data } = await apiClient.GET('/sermon-series/{slug}', {
    params: { path: { slug } },
    next: { tags: ['sermon-series', `sermon-series:${slug}`], revalidate: 3600 },
  });
  return toSermonSeries(data);
});

/** Every slug currently published — feeds `generateStaticParams` and `sitemap.ts`. */
export async function getAllSermonSlugs(): Promise<string[]> {
  const { items } = await getSermons({ limit: 200 });
  return items.map(item => item.slug);
}
