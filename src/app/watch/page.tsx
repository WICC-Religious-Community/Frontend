import type { Metadata } from 'next';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Container, Figure, Grid, Page, SectionHeader } from '@/components/primitives';
import { WatchLive } from '@/features/watch/watch-live';
import { getServiceStatus } from '@/domain/site/server';
import { getSermons } from '@/domain/sermons/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { formatShortDate } from '@/lib/format/date';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Watch Live',
  description: 'Watch WICC services live, or catch up on recent messages.',
  path: routes.watch(),
});

export default async function WatchPage() {
  const [status, { items: recent }] = await Promise.all([getServiceStatus(), getSermons({ limit: 6 })]);

  return (
    <Page>
      <Container className="py-section">
        <SectionHeader eyebrow="Join Us" title="Watch Live" size="lg" align="center" />
        <div className="mx-auto mt-10 max-w-4xl">
          <WatchLive initial={status} />
        </div>

        <div className="mt-16">
          <h2 className="font-display text-heading-md font-semibold text-ink">Recent Messages</h2>
          <Grid columns={3} className="mt-6">
            {recent.map(sermon => (
              <Link key={sermon.id} href={routes.sermon(sermon.slug)} className="group block">
                <Figure src={sermon.thumbnailUrl} alt={sermon.title} width={480} height={270} className="aspect-video" />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display line-clamp-2 text-heading-sm font-semibold text-ink">{sermon.title}</p>
                    <p className="text-subtle mt-1 text-caption">{formatShortDate(sermon.publishedAt)}</p>
                  </div>
                  <span className="bg-primary text-on-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </span>
                </div>
              </Link>
            ))}
          </Grid>
        </div>
      </Container>
    </Page>
  );
}
