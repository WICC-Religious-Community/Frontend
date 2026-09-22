import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { recordWhenConfigured, whenConfigured } from '@/lib/api/fallback';
import { sampleLeaders } from '@/content/sample';
import { toLeader, toLeaderList } from './mappers';
import type { Leader } from './model';

export const getLeaders = cache(async (): Promise<Leader[]> =>
  whenConfigured(sampleLeaders, async () => {
    const { data } = await apiClient.GET('/leaders', {
      next: { tags: ['leaders'], revalidate: 3600 },
    });
    return toLeaderList(data);
  })
);

export const getLeader = cache(async (slug: string): Promise<Leader> =>
  recordWhenConfigured(
    'leader',
    () => sampleLeaders.find(leader => leader.slug === slug),
    async () => {
      const { data } = await apiClient.GET('/leaders/{slug}', {
        params: { path: { slug } },
        next: { tags: ['leaders', `leader:${slug}`], revalidate: 3600 },
      });
      return toLeader(data);
    }
  )
);

export async function getAllLeaderSlugs(): Promise<string[]> {
  const leaders = await getLeaders();
  return leaders.map(leader => leader.slug);
}
