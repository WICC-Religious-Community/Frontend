import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { toServiceStatus, toSiteSettings } from './mappers';
import type { ServiceStatus, SiteSettings } from './model';

/**
 * RSC fetchers — `React.cache()` de-dupes repeated calls within one render
 * pass (e.g. both the layout and a page needing `siteSettings`), and the
 * `next.tags` let `POST /api/revalidate` invalidate them by name.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const { data } = await apiClient.GET('/site-settings', {
    next: { tags: ['site-settings'], revalidate: 3600 },
  });
  return toSiteSettings(data);
});

export const getServiceStatus = cache(async (): Promise<ServiceStatus> => {
  const { data } = await apiClient.GET('/service-status', {
    next: { tags: ['service-status'], revalidate: 30 },
  });
  return toServiceStatus(data);
});
