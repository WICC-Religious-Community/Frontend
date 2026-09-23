import type { Metadata } from 'next';
import { Container, Page, PageMasthead } from '@/components/primitives';
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
        <PageMasthead eyebrow="What's Happening" title="Events" />
        <div className="mt-10">
          <EventList initialPage={initialPage} />
        </div>
      </Container>
    </Page>
  );
}
