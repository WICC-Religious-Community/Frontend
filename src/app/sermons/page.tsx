import type { Metadata } from 'next';
import { Container, Page, SectionHeader } from '@/components/primitives';
import { SermonLibrary } from '@/features/sermons/sermon-library';
import { getSermons, getSermonSeriesList } from '@/domain/sermons/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Sermons',
  description: 'Watch and listen to recent messages from WICC — browse by series or search by topic.',
  path: routes.sermons(),
});

export default async function SermonsPage() {
  const [sermonPage, seriesList] = await Promise.all([getSermons({ limit: 12 }), getSermonSeriesList()]);

  return (
    <Page>
      <Container className="py-section">
        <SectionHeader eyebrow="Watch & Listen" title="Sermon Library" size="lg" align="center" />
        <div className="mt-12">
          <SermonLibrary initialPage={sermonPage} seriesList={seriesList} />
        </div>
      </Container>
    </Page>
  );
}
