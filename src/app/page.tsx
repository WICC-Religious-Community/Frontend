import type { ReactNode } from 'react';
import { Page, Section, type SectionTone } from '@/components/primitives';
import { Hero } from '@/features/home/hero';
import { Pillars } from '@/features/home/pillars';
import { ServiceTimes } from '@/features/home/service-times';
import { SermonSpotlight } from '@/features/home/sermon-spotlight';
import { EventsStrip } from '@/features/home/events-strip';
import { MinistriesGrid } from '@/features/home/ministries-grid';
import { LocationsPreview } from '@/features/home/locations-preview';
import { GivingCta } from '@/features/home/giving-cta';
import { TestimonialsWall } from '@/features/home/testimonials-wall';
import { NewsletterForm } from '@/features/home/newsletter-form';
import { isApiConfigured } from '@/config/env';
import { getServiceStatus, getSiteSettings } from '@/domain/site/server';
import { getSermons } from '@/domain/sermons/server';
import { getEvents } from '@/domain/events/server';
import { getMinistries } from '@/domain/ministries/server';
import { getLocations } from '@/domain/locations/server';
import { getGivingAccounts } from '@/domain/giving/server';
import { getTestimonials } from '@/domain/testimonials/server';

interface HomeSection {
  key: string;
  node: ReactNode;
  /** Pinned tone; unset sections alternate so adjacent bands never match. */
  tone?: SectionTone;
}

export default async function HomePage() {
  const [settings, serviceStatus, sermonPage, eventPage, ministries, locations, givingAccounts, testimonials] =
    await Promise.all([
      getSiteSettings(),
      getServiceStatus(),
      getSermons({ limit: 3 }),
      getEvents({ view: 'upcoming', limit: 3 }),
      getMinistries(),
      getLocations(),
      getGivingAccounts(),
      getTestimonials(6),
    ]);

  // Every section below the hero exists only when the church has published
  // the content for it — there is no placeholder content anywhere.
  const candidates: Array<HomeSection | false> = [
    settings.pillars.length > 0 && { key: 'pillars', node: <Pillars pillars={settings.pillars} /> },
    settings.serviceTimes.length > 0 && {
      key: 'service-times',
      node: <ServiceTimes serviceTimes={settings.serviceTimes} address={settings.address} />,
    },
    sermonPage.items.length > 0 && { key: 'sermons', node: <SermonSpotlight sermons={sermonPage.items} /> },
    eventPage.items.length > 0 && { key: 'events', node: <EventsStrip events={eventPage.items} /> },
    ministries.length > 0 && { key: 'ministries', node: <MinistriesGrid ministries={ministries.slice(0, 6)} /> },
    locations.length > 0 && { key: 'locations', node: <LocationsPreview locations={locations} /> },
    givingAccounts.length > 0 && { key: 'giving', node: <GivingCta />, tone: 'dark' },
    testimonials.length > 0 && { key: 'testimonials', node: <TestimonialsWall testimonials={testimonials} /> },
    isApiConfigured && { key: 'newsletter', node: <NewsletterForm /> },
  ];
  const sections = candidates.filter((section): section is HomeSection => section !== false);

  let alternate = 0;

  return (
    <Page>
      <Hero settings={settings} serviceStatus={serviceStatus} />
      {sections.map(section => {
        const tone = section.tone ?? (alternate++ % 2 === 0 ? 'surface' : 'canvas');
        return (
          <Section key={section.key} tone={tone}>
            {section.node}
          </Section>
        );
      })}
    </Page>
  );
}
