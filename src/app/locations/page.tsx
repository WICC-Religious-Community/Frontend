import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Container, Grid, Page, SectionHeader } from '@/components/primitives';
import { getLocations } from '@/domain/locations/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
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
        <SectionHeader eyebrow="Find Us" title="Locations" size="lg" align="center" />
        <Grid columns={3} className="mt-12">
          {locations.map(location => (
            <Link key={location.id} href={routes.location(location.slug)} className="border-border block h-full rounded-lg border p-6">
              <MapPin className="text-primary-dark h-5 w-5" aria-hidden="true" />
              <p className="font-display mt-3 text-heading-sm font-semibold text-ink">{location.name}</p>
              {location.address ? (
                <p className="text-muted mt-1 text-body-sm">
                  {location.address.streetAddress}, {location.address.locality}
                </p>
              ) : null}
              {location.serviceTimes[0] ? (
                <p className="text-subtle mt-3 text-caption">
                  {location.serviceTimes[0].label} · {location.serviceTimes[0].opens}
                </p>
              ) : null}
            </Link>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
