import { z } from 'zod';
import type { Leader } from './model';

const socialLinksSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
  x: z.string().optional(),
  whatsapp: z.string().optional(),
});

const leaderSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  role: z.string().optional(),
  bio: z.string().optional(),
  photoUrl: z.string().optional(),
  secondaryPhotoUrl: z.string().optional(),
  socialLinks: socialLinksSchema.optional(),
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
