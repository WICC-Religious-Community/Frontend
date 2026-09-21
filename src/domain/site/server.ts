import { cache } from 'react';
import { SITE } from '@/config/site';
import { apiClient } from '@/lib/api/client';
import { whenConfigured } from '@/lib/api/fallback';
import { toServiceStatus, toSiteSettings } from './mappers';
import type { ServiceStatus, SiteSettings } from './model';

/**
 * RSC fetchers — `React.cache()` de-dupes repeated calls within one render
 * pass (e.g. both the layout and a page needing `siteSettings`), and the
 * `next.tags` let `POST /api/revalidate` invalidate them by name.
 *
 * With no API configured, settings are just the church's name — every other
 * field is absent, and the UI renders only what exists.
 */
export const MINIMAL_SETTINGS: SiteSettings = {
  name: SITE.name,
  socialLinks: {},
  serviceTimes: [],
  pillars: [],
};

export const getSiteSettings = cache(async (): Promise<SiteSettings> =>
  whenConfigured(MINIMAL_SETTINGS, async () => {
    const { data } = await apiClient.GET('/site-settings', {
      next: { tags: ['site-settings'], revalidate: 3600 },
    });
    return toSiteSettings(data);
  })
);

export const getServiceStatus = cache(async (): Promise<ServiceStatus> =>
  whenConfigured<ServiceStatus>({ isLive: false }, async () => {
    const { data } = await apiClient.GET('/service-status', {
      next: { tags: ['service-status'], revalidate: 30 },
    });
    return toServiceStatus(data);
  })
);
