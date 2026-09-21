import { isApiConfigured } from '@/config/env';
import type { Paginated } from '@/domain/pagination';
import { ApiError } from './errors';

/**
 * What a domain fetcher does when no backend is configured. No invented
 * data: collections are empty, single records are "not found", and callers
 * render their real empty/absent states.
 *
 * Once a backend IS configured these never engage — request failures
 * propagate so a transient outage can't cache an empty page over good
 * content.
 */
export const emptyPage = <T>(): Paginated<T> => ({ items: [], nextCursor: null });

export function notConfigured(what: string): never {
  throw new ApiError(`${what}: no API configured`, { status: 404 });
}

export async function whenConfigured<T>(fallback: T, load: () => Promise<T>): Promise<T> {
  return isApiConfigured ? load() : fallback;
}

export async function recordWhenConfigured<T>(what: string, load: () => Promise<T>): Promise<T> {
  if (!isApiConfigured) notConfigured(what);
  return load();
}
