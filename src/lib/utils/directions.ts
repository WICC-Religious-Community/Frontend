import type { Address } from '@/domain/site/model';

/** A Google Maps "get directions" link built from a street address — no API key required. */
export function directionsUrl(address: Address): string {
  const destination = address.mapUrl ?? `${address.streetAddress}, ${address.locality}, ${address.country}`;
  const url = new URL('https://www.google.com/maps/dir/');
  url.searchParams.set('api', '1');
  url.searchParams.set('destination', destination);
  url.searchParams.set('travelmode', 'driving');
  return url.toString();
}
