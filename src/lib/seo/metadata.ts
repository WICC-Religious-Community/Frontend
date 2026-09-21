import type { Metadata } from 'next';
import { SITE } from '@/config/site';
import { absoluteUrl } from '@/lib/utils/url';

export const DEFAULT_OG_IMAGE = `${SITE.url}/opengraph-image`;

export const SITE_KEYWORDS = [
  'WICC',
  'WICC church',
  'church near me',
  'Sunday service',
  'sermons',
  'Christian community',
  'online church',
  'prayer',
  'bible teaching',
];

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  ogType?: 'website' | 'article' | 'profile';
  /** Keep out of the index — thin/utility/transactional pages. */
  noindex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };
}

function absoluteImage(image?: string): string {
  if (!image) return DEFAULT_OG_IMAGE;
  return absoluteUrl(image);
}

/**
 * The one place a page builds its `Metadata`. Every route calls this from
 * `generateMetadata` instead of hand-assembling openGraph/twitter/canonical
 * blocks — keeps every page's SEO shape identical and correct by
 * construction.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image,
  imageAlt,
  ogType = 'website',
  noindex = false,
  article,
}: PageMetadataInput): Metadata {
  const ogImage = absoluteImage(image);
  const alt = imageAlt ?? `${title} — ${SITE.name}`;
  const mergedKeywords = Array.from(new Set([...(keywords ?? []), ...SITE_KEYWORDS]));
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: { canonical },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt }],
      locale: SITE.locale,
      type: ogType,
      ...(ogType === 'article' && article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.authors ?? [SITE.name],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: ogImage, alt }],
    },
  };
}
