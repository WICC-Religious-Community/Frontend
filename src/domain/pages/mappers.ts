import { z } from 'zod';
import type { CmsPage } from './model';

const blockSchema = z.object({
  type: z.enum(['hero', 'richText', 'mediaSplit', 'cardGrid', 'ctaBanner', 'faq', 'gallery', 'scriptureQuote']),
  data: z.record(z.string(), z.unknown()).default({}),
});

const pageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  blocks: z.array(blockSchema).default([]),
});

export function toCmsPage(dto: unknown): CmsPage {
  return pageSchema.parse(dto);
}
