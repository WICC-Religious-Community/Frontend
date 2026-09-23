import { isApiConfigured } from '@/config/env';
import type { Paginated } from '@/domain/pagination';
import { ApiError } from './errors';

/**
 * What a domain fetcher does when no backend is configured: fall back to
 * clearly-labeled placeholder content (`src/content/sample/`) so pages can
 * be reviewed before a real API exists, never invented data presented as
 * real. Once a backend IS configured these never engage — request failures
 * propagate so a transient outage can't cache an empty page over good
 * content.
 */
export const emptyPage = <T>(): Paginated<T> => ({ items: [], nextCursor: null });

export function notConfigured(what: string): never {
  throw new ApiError(`${what}: no API configured`, { status: 404 });
}

/** For list/aggregate fetchers — falls back to the given sample value. */
export async function whenConfigured<T>(fallback: T, load: () => Promise<T>): Promise<T> {
  return isApiConfigured ? load() : fallback;
}

/** For a paginated list — wraps the sample array as a single, unpaginated page. */
export async function pagedWhenConfigured<T>(sample: T[], load: () => Promise<Paginated<T>>): Promise<Paginated<T>> {
  return isApiConfigured ? load() : { items: sample, nextCursor: null };
}

/** For a single record looked up by slug/id — 404s (via `notFound()`) if the sample has no match. */
export async function recordWhenConfigured<T>(
  what: string,
  findSample: () => T | undefined,
  load: () => Promise<T>
): Promise<T> {
  if (!isApiConfigured) {
    const record = findSample();
    if (!record) notConfigured(what);
    return record;
  }
  return load();
}
