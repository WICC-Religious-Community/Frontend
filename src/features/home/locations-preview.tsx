import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Container, Reveal, SectionHeader } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import type { Location } from '@/domain/locations/model';

export function LocationsPreview({ locations }: { locations: Location[] }) {
  if (locations.length <= 1) return null;

  return (
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader eyebrow="Find Us" title="Locations" size="sm" />
        <Button asChild variant="link">
          <Link href={routes.locations()}>
            All locations <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((location, index) => (
          <Reveal key={location.id} delay={index * 0.05}>
            <Link href={routes.location(location.slug)} className="border-border block h-full rounded-lg border p-6">
              <MapPin className="text-primary-dark h-5 w-5" aria-hidden="true" />
              <p className="font-display mt-3 text-heading-sm font-semibold text-ink">{location.name}</p>
              {location.address ? (
                <p className="text-muted mt-1 text-body-sm">
                  {location.address.streetAddress}, {location.address.locality}
                </p>
              ) : null}
            </Link>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
