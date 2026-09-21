import type { Metadata } from 'next';
import { Clock, MapPin, Navigation2 } from 'lucide-react';
import Link from 'next/link';
import { BlockRenderer } from '@/components/blocks/block-renderer';
import { Container, Page, SectionHeader } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { ConnectForm } from '@/features/connect/connect-form';
import { getPage } from '@/domain/pages/server';
import { getSiteSettings } from '@/domain/site/server';
import { formatClockTime } from '@/lib/format/date';
import { directionsUrl } from '@/lib/utils/directions';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Plan Your Visit',
  description: 'Plan a visit to WICC.',
  path: routes.visit(),
});

/** "What to expect" is the church's to write — it's the CMS page with this slug. */
const EXPECTATIONS_CMS_SLUG = 'plan-a-visit';

export default async function VisitPage() {
  const [settings, expectations] = await Promise.all([getSiteSettings(), getPage(EXPECTATIONS_CMS_SLUG)]);

  return (
    <Page>
      <Container className="py-section">
        <SectionHeader
          eyebrow="Visit"
          title="Plan Your Visit"
          size="lg"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="border-border rounded-lg border p-8">
            <p className="text-subtle flex items-center gap-2 text-label font-semibold uppercase tracking-wide">
              <Clock className="h-4 w-4" /> Service Times
            </p>
            <ul className="mt-3 space-y-2 text-body-sm text-ink">
              {settings.serviceTimes.map(service => (
                <li key={service.label}>
                  {service.label} — {service.dayOfWeek.join(' & ')}, {formatClockTime(service.opens)}
                  {service.closes ? `–${formatClockTime(service.closes)}` : ''}
                </li>
              ))}
            </ul>
            {settings.address ? (
              <>
                <p className="text-ink mt-6 flex items-start gap-2 text-body-sm">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {settings.address.streetAddress}, {settings.address.locality}
                </p>
                <Button asChild variant="outline" className="mt-4">
                  <Link href={directionsUrl(settings.address)} target="_blank" rel="noreferrer">
                    <Navigation2 className="h-4 w-4" /> Get Directions
                  </Link>
                </Button>
              </>
            ) : null}
          </div>

          <div>
            <h2 className="font-display text-heading-md font-semibold text-ink">Let us know you&apos;re coming</h2>
            <div className="mt-6">
              <ConnectForm />
            </div>
          </div>
        </div>
      </Container>
      {expectations ? <BlockRenderer blocks={expectations.blocks} /> : null}
    </Page>
  );
}
