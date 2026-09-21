import { http, HttpResponse } from 'msw';
import { siteSettingsFixture, serviceStatusFixture } from '@/domain/site/fixtures';
import { sermonsFixture, sermonSeriesFixture } from '@/domain/sermons/fixtures';
import { eventsFixture } from '@/domain/events/fixtures';
import { ministriesFixture } from '@/domain/ministries/fixtures';
import { leadersFixture } from '@/domain/leadership/fixtures';
import { locationsFixture } from '@/domain/locations/fixtures';
import { blogPostsFixture } from '@/domain/blog/fixtures';
import { testimonialsFixture } from '@/domain/testimonials/fixtures';
import { givingAccountsFixture, givingCampaignsFixture } from '@/domain/giving/fixtures';
import { cmsPageFixture } from '@/domain/pages/fixtures';
import { isUpcoming, isPast } from '@/lib/format/date';
import { paginate } from './paginate';

/**
 * The mock backend. One handler per `openapi.yaml` operation, backed by the
 * same fixtures the domain unit tests use — so "does the UI work" and "is
 * the fixture realistic" never drift apart. Matched with a `*` host wildcard
 * so it works regardless of `NEXT_PUBLIC_API_URL`.
 */
export const handlers = [
  http.get('*/v1/site-settings', () => HttpResponse.json(siteSettingsFixture)),
  http.get('*/v1/service-status', () => HttpResponse.json(serviceStatusFixture)),

  http.get('*/v1/sermons', ({ request }) => {
    const url = new URL(request.url);
    const series = url.searchParams.get('series');
    const speaker = url.searchParams.get('speaker');
    const q = url.searchParams.get('q')?.toLowerCase();
    const cursor = url.searchParams.get('cursor');
    const limit = Number(url.searchParams.get('limit') ?? 12);

    let items = sermonsFixture;
    if (series) items = items.filter(s => s.series?.slug === series);
    if (speaker) items = items.filter(s => s.speaker?.id === speaker);
    if (q) items = items.filter(s => s.title.toLowerCase().includes(q));

    return HttpResponse.json(paginate(items, cursor, limit));
  }),
  http.get('*/v1/sermons/:slug', ({ params }) => {
    const sermon = sermonsFixture.find(s => s.slug === params.slug);
    return sermon ? HttpResponse.json(sermon) : HttpResponse.json({ title: 'Not found' }, { status: 404 });
  }),
  http.get('*/v1/sermon-series', () => HttpResponse.json(sermonSeriesFixture)),
  http.get('*/v1/sermon-series/:slug', ({ params }) => {
    const series = sermonSeriesFixture.find(s => s.slug === params.slug);
    return series ? HttpResponse.json(series) : HttpResponse.json({ title: 'Not found' }, { status: 404 });
  }),

  http.get('*/v1/events', ({ request }) => {
    const url = new URL(request.url);
    const view = url.searchParams.get('view') ?? 'upcoming';
    const ministry = url.searchParams.get('ministry');
    const cursor = url.searchParams.get('cursor');
    const limit = Number(url.searchParams.get('limit') ?? 12);

    let items = eventsFixture;
    if (view === 'upcoming') items = items.filter(event => isUpcoming(event.startAt));
    if (view === 'past') items = items.filter(event => isPast(event.startAt));
    if (ministry) items = items.filter(event => event.ministrySlug === ministry);

    return HttpResponse.json(paginate(items, cursor, limit));
  }),
  http.get('*/v1/events/:slug', ({ params }) => {
    const event = eventsFixture.find(e => e.slug === params.slug);
    return event ? HttpResponse.json(event) : HttpResponse.json({ title: 'Not found' }, { status: 404 });
  }),

  http.get('*/v1/ministries', () => HttpResponse.json(ministriesFixture)),
  http.get('*/v1/ministries/:slug', ({ params }) => {
    const ministry = ministriesFixture.find(m => m.slug === params.slug);
    return ministry ? HttpResponse.json(ministry) : HttpResponse.json({ title: 'Not found' }, { status: 404 });
  }),

  http.get('*/v1/leaders', () => HttpResponse.json(leadersFixture)),
  http.get('*/v1/leaders/:slug', ({ params }) => {
    const leader = leadersFixture.find(l => l.slug === params.slug);
    return leader ? HttpResponse.json(leader) : HttpResponse.json({ title: 'Not found' }, { status: 404 });
  }),

  http.get('*/v1/locations', () => HttpResponse.json(locationsFixture)),
  http.get('*/v1/locations/:slug', ({ params }) => {
    const location = locationsFixture.find(l => l.slug === params.slug);
    return location ? HttpResponse.json(location) : HttpResponse.json({ title: 'Not found' }, { status: 404 });
  }),

  http.get('*/v1/blog-posts', ({ request }) => {
    const url = new URL(request.url);
    const tag = url.searchParams.get('tag');
    const cursor = url.searchParams.get('cursor');
    const limit = Number(url.searchParams.get('limit') ?? 9);
    const items = tag ? blogPostsFixture.filter(post => post.tags.includes(tag)) : blogPostsFixture;
    return HttpResponse.json(paginate(items, cursor, limit));
  }),
  http.get('*/v1/blog-posts/:slug', ({ params }) => {
    const post = blogPostsFixture.find(p => p.slug === params.slug);
    return post ? HttpResponse.json(post) : HttpResponse.json({ title: 'Not found' }, { status: 404 });
  }),

  http.get('*/v1/testimonials', ({ request }) => {
    const limit = Number(new URL(request.url).searchParams.get('limit') ?? 10);
    return HttpResponse.json(testimonialsFixture.slice(0, limit));
  }),

  http.get('*/v1/giving/accounts', () => HttpResponse.json(givingAccountsFixture)),
  http.get('*/v1/giving/campaigns', () => HttpResponse.json(givingCampaignsFixture)),

  http.get('*/v1/pages/:slug', ({ params }) => {
    if (params.slug === cmsPageFixture.slug) return HttpResponse.json(cmsPageFixture);
    return HttpResponse.json({ title: 'Not found' }, { status: 404 });
  }),

  http.post('*/v1/forms/contact', () => HttpResponse.json(null, { status: 202 })),
  http.post('*/v1/forms/prayer', () => HttpResponse.json(null, { status: 202 })),
  http.post('*/v1/forms/connect', () => HttpResponse.json(null, { status: 202 })),
  http.post('*/v1/forms/newsletter', () => HttpResponse.json(null, { status: 202 })),
];
