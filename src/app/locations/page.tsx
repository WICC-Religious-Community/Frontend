import type { Metadata } from 'next';
import { Container, IndexList, Page, PageMasthead } from '@/components/primitives';
import { getLocations } from '@/domain/locations/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { formatClockTime } from '@/lib/format/date';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Locations',
  description: 'Find a WICC location near you.',
  path: routes.locations(),
});

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <Page>
      <Container className="py-section">
        <PageMasthead eyebrow="Find Us" title="Locations" />
        <div className="mt-10">
          <IndexList
            items={locations.map(location => ({
              id: location.id,
              href: routes.location(location.slug),
              title: location.name,
              meta: (
                <>
                  {location.address ? `${location.address.streetAddress}, ${location.address.locality}` : null}
                  {location.address && location.serviceTimes[0] ? ' · ' : null}
                  {location.serviceTimes[0]
                    ? `${location.serviceTimes[0].label} · ${formatClockTime(location.serviceTimes[0].opens)}`
                    : null}
                </>
              ),
            }))}
          />
        </div>
      </Container>
    </Page>
  );
}
