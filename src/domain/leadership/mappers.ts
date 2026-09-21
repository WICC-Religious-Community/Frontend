import { z } from 'zod';
import type { Leader } from './model';

const leaderSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  role: z.string().optional(),
  bio: z.string().optional(),
  photoUrl: z.string().optional(),
  order: z.number().optional(),
});

export function toLeader(dto: unknown): Leader {
  return leaderSchema.parse(dto);
}

export function toLeaderList(dto: unknown): Leader[] {
  return z
    .array(leaderSchema)
    .parse(dto)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
