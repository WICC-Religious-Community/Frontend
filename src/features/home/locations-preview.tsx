import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container, Eyebrow, IndexList } from '@/components/primitives';
import { routes } from '@/config/routes';
import type { Location } from '@/domain/locations/model';

export function LocationsPreview({ locations }: { locations: Location[] }) {
  if (locations.length <= 1) return null;

  return (
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Eyebrow>Find Us</Eyebrow>
        <Link
          href={routes.locations()}
          className="text-ink hover:text-primary-dark inline-flex items-center gap-1.5 text-body-sm font-semibold transition-colors"
        >
          All locations <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-8">
        <IndexList
          items={locations.map(location => ({
            id: location.id,
            href: routes.location(location.slug),
            title: location.name,
            meta: location.address ? `${location.address.streetAddress}, ${location.address.locality}` : undefined,
          }))}
        />
      </div>
    </Container>
  );
}
