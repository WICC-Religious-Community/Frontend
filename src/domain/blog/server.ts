import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { pagedWhenConfigured, recordWhenConfigured } from '@/lib/api/fallback';
import { sampleBlogPosts } from '@/content/sample';
import type { Paginated } from '@/domain/pagination';
import { toBlogPost, toBlogPostPage } from './mappers';
import type { BlogFilters, BlogPost } from './model';

export async function getBlogPosts(filters: BlogFilters = {}): Promise<Paginated<BlogPost>> {
  const sample = filters.tag ? sampleBlogPosts.filter(post => post.tags.includes(filters.tag!)) : sampleBlogPosts;
  return pagedWhenConfigured(sample.slice(0, filters.limit ?? sample.length), async () => {
    const { data } = await apiClient.GET('/blog-posts', {
      params: { query: filters },
      next: { tags: ['blog-posts'], revalidate: 300 },
    });
    return toBlogPostPage(data);
  });
}

export const getBlogPost = cache(async (slug: string): Promise<BlogPost> =>
  recordWhenConfigured(
    'blog post',
    () => sampleBlogPosts.find(post => post.slug === slug),
    async () => {
      const { data } = await apiClient.GET('/blog-posts/{slug}', {
        params: { path: { slug } },
        next: { tags: ['blog-posts', `blog-post:${slug}`], revalidate: 3600 },
      });
      return toBlogPost(data);
    }
  )
);

export async function getAllBlogPostSlugs(): Promise<string[]> {
  const { items } = await getBlogPosts({ limit: 200 });
  return items.map(item => item.slug);
}
