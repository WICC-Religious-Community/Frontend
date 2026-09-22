import { SITE } from '@/config/site';
import type { ServiceStatus, SiteSettings } from '@/domain/site/model';

/**
 * Placeholder — see `src/content/sample/README.md`. Facts (address, phone,
 * email, times) are still obviously-fake placeholders. The hero photo is
 * real, church-provided imagery; everywhere else with no photo renders the
 * app's own gradient placeholder rather than unrelated stock photography.
 */
export const sampleSiteSettings: SiteSettings = {
  name: SITE.name,
  description: 'A place to belong, grow, and serve together.',
  phone: '+1 (555) 010-0100',
  email: 'hello@example.com',
  address: {
    streetAddress: '123 Example Avenue',
    locality: 'Sample City',
    region: 'ST',
    country: 'US',
  },
  socialLinks: {},
  serviceTimes: [
    { label: 'Sunday Gathering', dayOfWeek: ['Sunday'], opens: '09:00', closes: '11:00' },
    { label: 'Midweek Service', dayOfWeek: ['Wednesday'], opens: '18:00', closes: '19:30' },
  ],
  hero: {
    headline: 'We Envision a People',
    headlineAccent: 'Celebrating Life in Christ',
    subheadline: 'A community built on faith, belonging, and purpose.',
    media: {
      kind: 'image',
      url: '/brand/hero-worship.jpg',
      alt: 'Worship at Word Impact Community Church',
    },
    primaryCta: { label: 'Watch', href: '/watch' },
    secondaryCta: { label: 'Plan a Visit', href: '/visit' },
  },
  pillars: [
    { title: 'Worship', description: 'Gathering together to honor God through music, prayer, and teaching.' },
    { title: 'Community', description: 'Real relationships that walk with you through every season of life.' },
    { title: 'Service', description: 'Putting faith into action — in our neighborhoods and beyond.' },
  ],
};

/** Placeholder — see `src/content/sample/README.md`. */
export const sampleServiceStatus: ServiceStatus = {
  isLive: false,
  label: 'Join us Sunday',
  nextServiceAt: (() => {
    const next = new Date();
    next.setDate(next.getDate() + ((7 - next.getDay()) % 7 || 7));
    next.setHours(9, 0, 0, 0);
    return next.toISOString();
  })(),
};
