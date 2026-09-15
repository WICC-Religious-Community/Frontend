import type { MetadataRoute } from 'next';
import { SITE } from '@/config/site';
import { routes } from '@/config/routes';
import { getAllSermonSlugs } from '@/domain/sermons/server';
import { getAllEventSlugs } from '@/domain/events/server';
import { getAllMinistrySlugs } from '@/domain/ministries/server';
import { getAllLeaderSlugs } from '@/domain/leadership/server';
import { getAllLocationSlugs } from '@/domain/locations/server';
import { getAllBlogPostSlugs } from '@/domain/blog/server';

const STATIC_ROUTES = [
  routes.home(),
  routes.about(),
  routes.whatWeBelieve(),
  routes.leadership(),
  routes.sermons(),
  routes.events(),
  routes.ministries(),
  routes.locations(),
  routes.watch(),
  routes.give(),
  routes.visit(),
  routes.connect(),
  routes.contact(),
  routes.prayer(),
  routes.blog(),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [sermonSlugs, eventSlugs, ministrySlugs, leaderSlugs, locationSlugs, blogSlugs] = await Promise.all([
    getAllSermonSlugs().catch(() => []),
    getAllEventSlugs().catch(() => []),
    getAllMinistrySlugs().catch(() => []),
    getAllLeaderSlugs().catch(() => []),
    getAllLocationSlugs().catch(() => []),
    getAllBlogPostSlugs().catch(() => []),
  ]);

  const dynamicEntries: string[] = [
    ...sermonSlugs.map(routes.sermon),
    ...eventSlugs.map(routes.event),
    ...ministrySlugs.map(routes.ministry),
    ...leaderSlugs.map(routes.leader),
    ...locationSlugs.map(routes.location),
    ...blogSlugs.map(routes.blogPost),
  ];

  return [...STATIC_ROUTES, ...dynamicEntries].map(path => ({
    url: `${SITE.url}${path === '/' ? '' : path}`,
    lastModified: new Date(),
  }));
}
