import { z } from 'zod';
import type { Ministry } from './model';

const ministrySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  summary: z.string().optional(),
  descriptionHtml: z.string().optional(),
  coverUrl: z.string().optional(),
  meetingSchedule: z.string().optional(),
  leader: z.object({ id: z.string(), name: z.string(), photoUrl: z.string().optional() }).optional(),
});

export function toMinistry(dto: unknown): Ministry {
  return ministrySchema.parse(dto);
}

export function toMinistryList(dto: unknown): Ministry[] {
  return z.array(ministrySchema).parse(dto);
}
