import type { Metadata } from 'next';
import { Container, Page, SectionHeader } from '@/components/primitives';
import { EventList } from '@/features/events/event-list';
import { getEvents } from '@/domain/events/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Events',
  description: 'Upcoming and past events at WICC.',
  path: routes.events(),
});

export default async function EventsPage() {
  const initialPage = await getEvents({ view: 'upcoming', limit: 12 });

  return (
    <Page>
      <Container className="py-section">
        <SectionHeader eyebrow="What's Happening" title="Events" size="lg" align="center" />
        <div className="mt-12">
          <EventList initialPage={initialPage} />
        </div>
      </Container>
    </Page>
  );
}
