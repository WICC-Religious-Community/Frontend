import { z } from 'zod';
import type { Location } from './model';

const addressSchema = z.object({
  streetAddress: z.string(),
  locality: z.string(),
  region: z.string().optional(),
  country: z.string(),
  mapUrl: z.string().optional(),
});

const serviceTimeSchema = z.object({
  dayOfWeek: z.array(z.string()),
  opens: z.string(),
  closes: z.string().optional(),
  label: z.string(),
  timezone: z.string().optional(),
});

const locationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  isMain: z.boolean().optional(),
  address: addressSchema.optional(),
  phone: z.string().optional(),
  coverUrl: z.string().optional(),
  serviceTimes: z.array(serviceTimeSchema).default([]),
});

export function toLocation(dto: unknown): Location {
  return locationSchema.parse(dto);
}

export function toLocationList(dto: unknown): Location[] {
  return z.array(locationSchema).parse(dto);
}
