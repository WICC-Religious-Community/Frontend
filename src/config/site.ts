/**
 * SINGLE SOURCE OF TRUTH for brand identity, navigation fallback, and social
 * links. Everything that actually changes week to week (service times, venue,
 * leaders, ministries, giving accounts) comes from the backend API via
 * `src/domain/*` — it does NOT belong here. This file only holds what a
 * rebrand or a nav restructure would touch, and it is the only place either
 * touches.
 */

export const SITE = {
  name: 'WICC',
  legalName: 'Word Impact Community Church',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  description: 'The official website of Word Impact Community Church.',
  locale: 'en_US',
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  items?: NavItem[];
};

/** Primary header navigation. Used until/unless the API returns an override. */
export const MAIN_NAV: NavGroup[] = [
  { label: 'About', href: '/about' },
  {
    label: 'Watch & Listen',
    items: [
      { label: 'Sermons', href: '/sermons', description: 'Browse messages by series or speaker' },
      { label: 'Watch Live', href: '/watch', description: 'Join a service in progress' },
      { label: 'Blog', href: '/blog', description: 'Devotionals and articles' },
    ],
  },
  { label: 'Events', href: '/events' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Locations', href: '/locations' },
  { label: 'Connect', href: '/connect' },
] as const;

export const FOOTER_NAV: NavGroup[] = [
  {
    label: 'Church',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'What We Believe', href: '/about/what-we-believe' },
      { label: 'Locations', href: '/locations' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Sermons', href: '/sermons' },
      { label: 'Blog', href: '/blog' },
      { label: 'Events', href: '/events' },
      { label: 'Prayer Request', href: '/prayer' },
    ],
  },
  {
    label: 'Get Involved',
    items: [
      { label: 'Plan a Visit', href: '/visit' },
      { label: 'Connect Groups', href: '/connect' },
      { label: 'Ministries', href: '/ministries' },
      { label: 'Give', href: '/give' },
    ],
  },
] as const;

export const LEGAL_NAV: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
];

