import type { Metadata } from 'next';
import { Container, Grid, Page, PageMasthead } from '@/components/primitives';
import { WatchLive } from '@/features/watch/watch-live';
import { SermonCard } from '@/features/sermons/sermon-card';
import { getServiceStatus } from '@/domain/site/server';
import { getSermons } from '@/domain/sermons/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
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
        <PageMasthead eyebrow="Join Us" title="Watch Live" />
        <div className="mt-10">
          <WatchLive initial={status} />
        </div>

        {recent.length > 0 ? (
          <div className="border-border mt-16 border-t pt-16">
            <h2 className="font-display text-heading-lg font-semibold text-ink">Recent Messages</h2>
            <Grid columns={3} className="mt-8">
              {recent.map(sermon => (
                <SermonCard key={sermon.id} sermon={sermon} />
              ))}
            </Grid>
          </div>
        ) : null}
      </Container>
    </Page>
  );
}
