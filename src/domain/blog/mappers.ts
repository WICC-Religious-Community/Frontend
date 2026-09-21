import { z } from 'zod';
import type { Paginated } from '@/domain/pagination';
import type { BlogPost } from './model';

const blogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  contentHtml: z.string().optional(),
  coverUrl: z.string().optional(),
  authorName: z.string().optional(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export function toBlogPost(dto: unknown): BlogPost {
  return blogPostSchema.parse(dto);
}

export function toBlogPostPage(dto: unknown): Paginated<BlogPost> {
  return z.object({ items: z.array(blogPostSchema), nextCursor: z.string().nullable() }).parse(dto);
}
