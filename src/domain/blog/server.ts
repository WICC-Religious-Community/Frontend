import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { emptyPage, recordWhenConfigured, whenConfigured } from '@/lib/api/fallback';
import type { Paginated } from '@/domain/pagination';
import { toBlogPost, toBlogPostPage } from './mappers';
import type { BlogFilters, BlogPost } from './model';

export async function getBlogPosts(filters: BlogFilters = {}): Promise<Paginated<BlogPost>> {
  return whenConfigured(emptyPage<BlogPost>(), async () => {
    const { data } = await apiClient.GET('/blog-posts', {
      params: { query: filters },
      next: { tags: ['blog-posts'], revalidate: 300 },
    });
    return toBlogPostPage(data);
  });
}

export const getBlogPost = cache(async (slug: string): Promise<BlogPost> =>
  recordWhenConfigured('blog post', async () => {
    const { data } = await apiClient.GET('/blog-posts/{slug}', {
      params: { path: { slug } },
      next: { tags: ['blog-posts', `blog-post:${slug}`], revalidate: 3600 },
    });
    return toBlogPost(data);
  })
);

export async function getAllBlogPostSlugs(): Promise<string[]> {
  const { items } = await getBlogPosts({ limit: 200 });
  return items.map(item => item.slug);
}
