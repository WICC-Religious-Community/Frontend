import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { ApiError } from '@/lib/api/errors';
import { isApiConfigured } from '@/config/env';
import { samplePages } from '@/content/sample';
import { toCmsPage } from './mappers';
import type { CmsPage } from './model';

export const getPage = cache(async (slug: string): Promise<CmsPage | null> => {
  if (!isApiConfigured) return samplePages[slug] ?? null;
  try {
    const { data } = await apiClient.GET('/pages/{slug}', {
      params: { path: { slug } },
      next: { tags: ['pages', `page:${slug}`], revalidate: 300 },
    });
    return toCmsPage(data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
});
