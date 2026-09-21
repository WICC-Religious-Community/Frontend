import { Section } from '@/components/primitives';
import { Hero } from '@/features/home/hero';
import { ServiceTimes } from '@/features/home/service-times';
import { CoreValues } from '@/features/home/core-values';
import { SermonSpotlight } from '@/features/home/sermon-spotlight';
import { EventsStrip } from '@/features/home/events-strip';
import { MinistriesGrid } from '@/features/home/ministries-grid';
import { LocationsPreview } from '@/features/home/locations-preview';
import { GivingCta } from '@/features/home/giving-cta';
import { TestimonialsWall } from '@/features/home/testimonials-wall';
import { NewsletterForm } from '@/features/home/newsletter-form';
import { getServiceStatus, getSiteSettings } from '@/domain/site/server';
import { getSermons } from '@/domain/sermons/server';
import { getEvents } from '@/domain/events/server';
import { getMinistries } from '@/domain/ministries/server';
import { getLocations } from '@/domain/locations/server';
import { getTestimonials } from '@/domain/testimonials/server';

export default async function HomePage() {
  const [settings, serviceStatus, sermonPage, eventPage, ministries, locations, testimonials] =
    await Promise.all([
      getSiteSettings(),
      getServiceStatus(),
      getSermons({ limit: 3 }),
      getEvents({ view: 'upcoming', limit: 3 }),
      getMinistries(),
      getLocations(),
      getTestimonials(6),
    ]);

  return (
    <>
      <Hero serviceStatus={serviceStatus} />
      <Section tone="surface" compact>
        <ServiceTimes serviceTimes={settings.serviceTimes} venue={settings.address?.streetAddress} />
      </Section>
      <Section tone="canvas">
        <CoreValues />
      </Section>
      <Section tone="surface">
        <SermonSpotlight sermons={sermonPage.items} />
      </Section>
      <Section tone="canvas">
        <EventsStrip events={eventPage.items} />
      </Section>
      <Section tone="surface">
        <MinistriesGrid ministries={ministries.slice(0, 6)} />
      </Section>
      <Section tone="canvas">
        <LocationsPreview locations={locations} />
      </Section>
      <Section tone="dark">
        <GivingCta />
      </Section>
      <Section tone="surface">
        <TestimonialsWall testimonials={testimonials} />
      </Section>
      <Section tone="canvas" compact>
        <NewsletterForm />
      </Section>
    </>
  );
}
