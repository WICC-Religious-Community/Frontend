import { SITE } from '@/config/site';
import { absoluteUrl } from '@/lib/utils/url';

export const ORG_ID = `${SITE.url}/#church`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export interface OrganizationSchemaInput {
  name?: string;
  description?: string;
  logoUrl?: string;
  phone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    locality: string;
    region?: string;
    country: string;
  };
  sameAs?: string[];
  serviceTimes?: { dayOfWeek: string[]; opens: string; closes: string; description: string }[];
}

/**
 * The church as one rich entity — Church + PlaceOfWorship signals for the
 * Knowledge Panel, local pack, and "church near me". All inputs are
 * API-sourced (`domain/site`); this builder has no hardcoded church data.
 * Emitted once, in the root layout.
 */
export function buildOrganizationSchema(input: OrganizationSchemaInput = {}) {
  const name = input.name ?? SITE.name;
  return {
    '@context': 'https://schema.org',
    '@type': ['Church', 'PlaceOfWorship'],
    '@id': ORG_ID,
    name,
    legalName: name,
    description: input.description ?? SITE.description,
    url: SITE.url,
    ...(input.logoUrl
      ? { logo: { '@type': 'ImageObject', url: input.logoUrl }, image: input.logoUrl }
      : {}),
    ...(input.phone ? { telephone: input.phone } : {}),
    ...(input.email ? { email: input.email } : {}),
    ...(input.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: input.address.streetAddress,
            addressLocality: input.address.locality,
            addressRegion: input.address.region,
            addressCountry: input.address.country,
          },
        }
      : {}),
    ...(input.serviceTimes?.length
      ? {
          openingHoursSpecification: input.serviceTimes.map(service => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: service.dayOfWeek,
            opens: service.opens,
            closes: service.closes,
            description: service.description,
          })),
        }
      : {}),
    isAccessibleForFree: true,
    publicAccess: true,
    sameAs: input.sameAs ?? [],
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/sermons?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface EventSchemaInput {
  slug: string;
  title: string;
  description?: string;
  startAt: string;
  endAt?: string;
  imageUrl?: string;
  locationName?: string;
  registerUrl?: string | null;
  isOnline?: boolean;
}

export function buildEventSchema(event: EventSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.startAt,
    endDate: event.endAt,
    eventAttendanceMode: event.isOnline
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: event.imageUrl ? [event.imageUrl] : undefined,
    url: absoluteUrl(`/events/${event.slug}`),
    location: {
      '@type': 'Place',
      name: event.locationName ?? SITE.name,
    },
    organizer: { '@id': ORG_ID, '@type': 'Church', name: SITE.name, url: SITE.url },
    ...(event.registerUrl
      ? { offers: { '@type': 'Offer', url: event.registerUrl, availability: 'https://schema.org/InStock' } }
      : {}),
  };
}

export interface VideoSchemaInput {
  name: string;
  description?: string;
  thumbnailUrl?: string;
  uploadDate: string;
  embedUrl?: string;
  contentUrl?: string;
}

export function buildVideoSchema(video: VideoSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description || video.name,
    thumbnailUrl: video.thumbnailUrl ? [video.thumbnailUrl] : undefined,
    uploadDate: video.uploadDate,
    embedUrl: video.embedUrl,
    contentUrl: video.contentUrl,
    publisher: { '@id': ORG_ID },
  };
}

export interface PersonSchemaInput {
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  path?: string;
}

export function buildPersonSchema(person: PersonSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
    description: person.bio,
    image: person.imageUrl,
    url: person.path ? absoluteUrl(person.path) : undefined,
    worksFor: { '@id': ORG_ID, '@type': 'Church', name: SITE.name, url: SITE.url },
  };
}

export interface ArticleSchemaInput {
  title: string;
  description?: string;
  slug: string;
  imageUrl?: string;
  publishedAt: string;
  updatedAt?: string;
  authorName?: string;
}

export function buildArticleSchema(article: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.imageUrl ? [article.imageUrl] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { '@type': 'Person', name: article.authorName ?? SITE.name },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
  };
}

export interface BreadcrumbSchemaItem {
  name: string;
  path: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Render helper — server-only component that inlines a JSON-LD graph. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data);
}
