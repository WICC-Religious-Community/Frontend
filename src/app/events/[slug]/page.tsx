import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CalendarDays, MapPin } from 'lucide-react';
import { Breadcrumbs, Container, Figure, Page } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/seo/json-ld';
import { EventCountdown } from '@/features/events/event-countdown';
import { AddToCalendar } from '@/features/events/add-to-calendar';
import { EventAvailabilityBadge } from '@/features/home/event-availability-badge';
import { getAllEventSlugs, getEvent } from '@/domain/events/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbSchema, buildEventSchema } from '@/lib/seo/jsonld';
import { formatDateRange } from '@/lib/format/date';
import { routes } from '@/config/routes';

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs().catch(() => []);
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug).catch(() => null);
  if (!event) return {};
  return buildPageMetadata({
    title: event.title,
    description: event.description ?? `Join us for ${event.title} at WICC.`,
    path: routes.event(slug),
    image: event.coverUrl,
  });
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug).catch(() => null);
  if (!event) notFound();

  return (
    <Page>
      <Container className="py-section">
        <Breadcrumbs items={[{ label: 'Events', href: routes.events() }, { label: event.title }]} />
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Figure src={event.coverUrl} alt={event.title} width={800} height={450} className="aspect-video" />
            <h1 className="font-display mt-6 text-display-md font-semibold text-ink text-balance">{event.title}</h1>
            <div className="text-muted mt-4 flex flex-wrap gap-x-5 gap-y-2 text-body-sm">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden="true" /> {formatDateRange(event.startAt, event.endAt)}
              </span>
              {event.locationName ? (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" /> {event.locationName}
                </span>
              ) : null}
            </div>
            {event.description ? <p className="text-ink mt-8 text-body-lg leading-loose">{event.description}</p> : null}
          </div>

          <aside className="border-border h-fit space-y-6 border-t pt-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <EventCountdown startAt={event.startAt} />
            {event.capacity != null ? (
              <EventAvailabilityBadge
                eventId={event.id}
                initial={{ eventId: event.id, capacity: event.capacity, seatsTaken: event.seatsTaken ?? 0 }}
              />
            ) : null}
            <div className="flex flex-col gap-3">
              {event.registerUrl ? (
                <Button asChild size="lg">
                  <Link href={event.registerUrl}>Register</Link>
                </Button>
              ) : null}
              <AddToCalendar
                uid={event.id}
                title={event.title}
                description={event.description}
                startAt={event.startAt}
                endAt={event.endAt}
                location={event.locationName}
              />
            </div>
          </aside>
        </div>
      </Container>

      <JsonLd
        data={buildEventSchema({
          slug: event.slug,
          title: event.title,
          description: event.description,
          startAt: event.startAt,
          endAt: event.endAt,
          imageUrl: event.coverUrl,
          locationName: event.locationName,
          registerUrl: event.registerUrl,
          isOnline: event.isOnline,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Events', path: routes.events() },
          { name: event.title, path: routes.event(slug) },
        ])}
      />
    </Page>
  );
}
