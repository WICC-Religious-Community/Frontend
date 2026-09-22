import { SITE } from '@/config/site';
import type { ServiceStatus, SiteSettings } from '@/domain/site/model';
import { SAMPLE_HERO_VIDEO_URL, unsplash } from './media';

/** Placeholder — see `src/content/sample/README.md`. Not real WICC information. */
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
      kind: 'video',
      url: SAMPLE_HERO_VIDEO_URL,
      posterUrl: unsplash('1507692049790-de58290a4334', 1600),
      alt: '',
    },
    primaryCta: { label: 'Watch', href: '/watch' },
    secondaryCta: { label: 'Plan a Visit', href: '/visit' },
  },
  pillars: [
    {
      title: 'Worship',
      description: 'Gathering together to honor God through music, prayer, and teaching.',
      imageUrl: unsplash('1508829040592-72f179f8a73f', 800),
    },
    {
      title: 'Community',
      description: 'Real relationships that walk with you through every season of life.',
      imageUrl: unsplash('1628717341663-0007b0ee2597', 800),
    },
    {
      title: 'Service',
      description: 'Putting faith into action — in our neighborhoods and beyond.',
      imageUrl: unsplash('1593113616828-6f22bca04804', 800),
    },
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
