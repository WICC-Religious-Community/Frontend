import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { recordWhenConfigured, whenConfigured } from '@/lib/api/fallback';
import { toMinistry, toMinistryList } from './mappers';
import type { Ministry } from './model';

export const getMinistries = cache(async (): Promise<Ministry[]> =>
  whenConfigured([], async () => {
    const { data } = await apiClient.GET('/ministries', {
      next: { tags: ['ministries'], revalidate: 3600 },
    });
    return toMinistryList(data);
  })
);

export const getMinistry = cache(async (slug: string): Promise<Ministry> =>
  recordWhenConfigured('ministry', async () => {
    const { data } = await apiClient.GET('/ministries/{slug}', {
      params: { path: { slug } },
      next: { tags: ['ministries', `ministry:${slug}`], revalidate: 3600 },
    });
    return toMinistry(data);
  })
);

export async function getAllMinistrySlugs(): Promise<string[]> {
  const ministries = await getMinistries();
  return ministries.map(ministry => ministry.slug);
}
