import type { ServiceStatus, SiteSettings } from './model';
import { SITE, SOCIAL_LINKS } from '@/config/site';

/** Sample data — powers MSW in mock mode and is reused by unit tests. */
export const siteSettingsFixture: SiteSettings = {
  name: SITE.name,
  description: SITE.description,
  logoUrl: undefined,
  phone: '+234 706 999 5333',
  email: 'hello@wicc.org',
  address: {
    streetAddress: '14 Grace Avenue',
    locality: 'Lekki, Lagos',
    region: 'Lagos',
    country: 'NG',
  },
  socialLinks: SOCIAL_LINKS,
  serviceTimes: [
    { dayOfWeek: ['Sunday'], opens: '09:00', closes: '11:00', label: 'Sunday Worship' },
    { dayOfWeek: ['Wednesday'], opens: '18:00', closes: '19:30', label: 'Midweek Bible Study' },
    { dayOfWeek: ['Friday'], opens: '18:00', closes: '19:30', label: 'Prayer Meeting' },
  ],
  announcement: {
    enabled: true,
    text: 'Foundation Class begins this Sunday — register at the welcome desk.',
    href: '/events',
  },
};

export const serviceStatusFixture: ServiceStatus = {
  isLive: false,
  label: 'Sunday Worship',
  nextServiceAt: nextSunday9am().toISOString(),
};

function nextSunday9am(): Date {
  const now = new Date();
  const result = new Date(now);
  result.setUTCHours(9, 0, 0, 0);
  const diff = (7 - result.getUTCDay()) % 7;
  result.setUTCDate(result.getUTCDate() + (diff === 0 && result <= now ? 7 : diff));
  return result;
}
