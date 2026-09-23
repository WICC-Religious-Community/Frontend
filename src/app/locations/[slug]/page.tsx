import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Navigation2, Phone } from 'lucide-react';
import { Breadcrumbs, Container, Page } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { getAllLocationSlugs, getLocation } from '@/domain/locations/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { formatClockTime } from '@/lib/format/date';
import { directionsUrl } from '@/lib/utils/directions';
import { routes } from '@/config/routes';

export async function generateStaticParams() {
  const slugs = await getAllLocationSlugs().catch(() => []);
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocation(slug).catch(() => null);
  if (!location) return {};
  return buildPageMetadata({ title: location.name, description: `${location.name} — WICC.`, path: routes.location(slug) });
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = await getLocation(slug).catch(() => null);
  if (!location) notFound();

  return (
    <Page>
      <Container className="py-section">
        <Breadcrumbs items={[{ label: 'Locations', href: routes.locations() }, { label: location.name }]} />
        <h1 className="font-display mt-6 text-display-md font-semibold text-ink text-balance">{location.name}</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <div>
              <p className="text-subtle flex items-center gap-2 text-label font-semibold uppercase tracking-wide">
                <Clock className="h-4 w-4" aria-hidden="true" /> Service Times
              </p>
              <ul className="mt-3 space-y-2 text-body-sm text-ink">
                {location.serviceTimes.map(service => (
                  <li key={service.label}>
                    {service.label} — {service.dayOfWeek.join(' & ')}, {formatClockTime(service.opens)}
                    {service.closes ? `–${formatClockTime(service.closes)}` : ''}
                  </li>
                ))}
              </ul>
            </div>
            {location.phone ? (
              <a href={`tel:${location.phone}`} className="text-ink hover:text-primary-dark flex items-center gap-2 text-body-sm transition-colors">
                <Phone className="h-4 w-4" aria-hidden="true" /> {location.phone}
              </a>
            ) : null}
          </div>

          <aside className="border-border h-fit space-y-5 border-t pt-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            {location.address ? (
              <p className="text-body-sm text-ink">
                {location.address.streetAddress}
                <br />
                {location.address.locality}, {location.address.country}
              </p>
            ) : null}
            {location.address ? (
              <Button asChild className="w-full">
                <Link href={directionsUrl(location.address)} target="_blank" rel="noreferrer">
                  <Navigation2 className="h-4 w-4" aria-hidden="true" /> Get Directions
                </Link>
              </Button>
            ) : null}
          </aside>
        </div>
      </Container>
    </Page>
  );
}
