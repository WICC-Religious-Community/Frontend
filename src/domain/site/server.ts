import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { whenConfigured } from '@/lib/api/fallback';
import { sampleServiceStatus, sampleSiteSettings } from '@/content/sample';
import { toServiceStatus, toSiteSettings } from './mappers';
import type { ServiceStatus, SiteSettings } from './model';

/**
 * RSC fetchers — `React.cache()` de-dupes repeated calls within one render
 * pass (e.g. both the layout and a page needing `siteSettings`), and the
 * `next.tags` let `POST /api/revalidate` invalidate them by name.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> =>
  whenConfigured(sampleSiteSettings, async () => {
    const { data } = await apiClient.GET('/site-settings', {
      next: { tags: ['site-settings'], revalidate: 3600 },
    });
    return toSiteSettings(data);
  })
);

/** Used only if a *configured* backend's settings call fails — keeps the shell up. */
export const MINIMAL_SETTINGS: SiteSettings = {
  name: sampleSiteSettings.name,
  socialLinks: {},
  serviceTimes: [],
  pillars: [],
};

export const getServiceStatus = cache(async (): Promise<ServiceStatus> =>
  whenConfigured(sampleServiceStatus, async () => {
    const { data } = await apiClient.GET('/service-status', {
      next: { tags: ['service-status'], revalidate: 30 },
    });
    return toServiceStatus(data);
  })
);
