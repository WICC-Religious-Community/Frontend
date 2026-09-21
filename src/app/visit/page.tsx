import type { Metadata } from 'next';
import { Clock, MapPin, Navigation2 } from 'lucide-react';
import Link from 'next/link';
import { Container, Grid, Page, Reveal, SectionHeader } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { ConnectForm } from '@/features/connect/connect-form';
import { getSiteSettings } from '@/domain/site/server';
import { directionsUrl } from '@/lib/utils/directions';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Plan Your Visit',
  description: 'New to WICC? Here’s everything you need to know before you visit.',
  path: routes.visit(),
});

const EXPECTATIONS = [
  { title: 'Warm Welcome', body: 'Our team will greet you at the door and help you find your way around.' },
  { title: 'Come As You Are', body: 'There’s no dress code — wear what makes you comfortable.' },
  { title: 'Kids Are Welcome', body: 'Age-appropriate programs run during every service for children.' },
] as const;

export default async function VisitPage() {
  const settings = await getSiteSettings();

  return (
    <Page>
      <Container className="py-section">
        <SectionHeader
          eyebrow="New Here?"
          title="Plan Your Visit"
          description="We’d love to have you. Here’s everything you need to know before you come."
          size="lg"
        />

        <Grid columns={3} className="mt-12">
          {EXPECTATIONS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="border-border h-full rounded-lg border p-6">
                <h3 className="font-display text-heading-sm font-semibold text-ink">{item.title}</h3>
                <p className="text-muted mt-2 text-body-sm leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </Grid>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="border-border rounded-lg border p-8">
            <p className="text-subtle flex items-center gap-2 text-label font-semibold uppercase tracking-wide">
              <Clock className="h-4 w-4" /> Service Times
            </p>
            <ul className="mt-3 space-y-2 text-body-sm text-ink">
              {settings.serviceTimes.map(service => (
                <li key={service.label}>
                  {service.label} — {service.dayOfWeek.join(' & ')}, {service.opens}
                  {service.closes ? `–${service.closes}` : ''}
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
            <h2 className="font-display text-heading-md font-semibold text-ink">Let us know you're coming</h2>
            <p className="text-muted mt-2 text-body-sm">We'll have a seat and a warm welcome ready for you.</p>
            <div className="mt-6">
              <ConnectForm />
            </div>
          </div>
        </div>
      </Container>
    </Page>
  );
}
