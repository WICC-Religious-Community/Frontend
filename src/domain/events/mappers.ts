import { z } from 'zod';
import type { Paginated } from '@/domain/pagination';
import type { EventAvailability, EventItem } from './model';

const eventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  startAt: z.string(),
  endAt: z.string().optional(),
  isOnline: z.boolean().optional(),
  locationName: z.string().optional(),
  coverUrl: z.string().optional(),
  registerUrl: z.string().nullable().optional(),
  capacity: z.number().nullable().optional(),
  seatsTaken: z.number().nullable().optional(),
  ministrySlug: z.string().nullable().optional(),
});

export function toEvent(dto: unknown): EventItem {
  return eventSchema.parse(dto);
}

export function toEventPage(dto: unknown): Paginated<EventItem> {
  return z.object({ items: z.array(eventSchema), nextCursor: z.string().nullable() }).parse(dto);
}

const availabilitySchema = z.object({
  eventId: z.string(),
  capacity: z.number().nullable(),
  seatsTaken: z.number().nullable(),
});

export function toEventAvailability(dto: unknown): EventAvailability {
  return availabilitySchema.parse(dto);
}
