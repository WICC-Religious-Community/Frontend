import { SITE } from '@/config/site';

/** Resolve a root-relative or already-absolute path to a full site URL. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${normalized === '/' ? '' : normalized}`;
}

export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href) && !href.startsWith(SITE.url);
}

/** Append/override query params on a path without hand-building strings. */
export function withQuery(
  path: string,
  params: Record<string, string | number | boolean | undefined | null>
): string {
  const url = new URL(path, 'https://placeholder.local');
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, String(value));
    }
  }
  return `${url.pathname}${url.search}`;
}
