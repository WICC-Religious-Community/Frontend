import { z } from 'zod';
import type { Paginated } from '@/domain/pagination';
import type { Sermon, SermonSeries } from './model';

const speakerSchema = z.object({ id: z.string(), name: z.string(), photoUrl: z.string().optional() });

const sermonSeriesSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  coverUrl: z.string().optional(),
  sermonCount: z.number().optional(),
});

const sermonSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  speaker: speakerSchema.optional(),
  series: sermonSeriesSchema.optional(),
  videoUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  publishedAt: z.string(),
  durationSeconds: z.number().optional(),
  scripture: z.array(z.string()).default([]),
  topics: z.array(z.string()).default([]),
});

export function toSermon(dto: unknown): Sermon {
  return sermonSchema.parse(dto);
}

export function toSermonPage(dto: unknown): Paginated<Sermon> {
  const parsed = z.object({ items: z.array(sermonSchema), nextCursor: z.string().nullable() }).parse(dto);
  return parsed;
}

export function toSermonSeries(dto: unknown): SermonSeries {
  return sermonSeriesSchema.parse(dto);
}

export function toSermonSeriesList(dto: unknown): SermonSeries[] {
  return z.array(sermonSeriesSchema).parse(dto);
}
