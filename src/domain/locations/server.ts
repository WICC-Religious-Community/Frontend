import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { toLocation, toLocationList } from './mappers';
import type { Location } from './model';

export const getLocations = cache(async (): Promise<Location[]> => {
  const { data } = await apiClient.GET('/locations', {
    next: { tags: ['locations'], revalidate: 3600 },
  });
  return toLocationList(data);
});

export const getLocation = cache(async (slug: string): Promise<Location> => {
  const { data } = await apiClient.GET('/locations/{slug}', {
    params: { path: { slug } },
    next: { tags: ['locations', `location:${slug}`], revalidate: 3600 },
  });
  return toLocation(data);
});

export async function getAllLocationSlugs(): Promise<string[]> {
  const locations = await getLocations();
  return locations.map(location => location.slug);
}
