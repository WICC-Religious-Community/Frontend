import type { BlogPost } from '@/domain/blog/model';
import { unsplash } from './media';

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

/** Placeholder — see `src/content/sample/README.md`. */
export const sampleBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'why-community-matters',
    title: 'Why Community Matters',
    excerpt: 'Faith was never meant to be a solo journey. Here is why we build community.',
    contentHtml:
      '<p>Faith was never meant to be a solo journey. From the very beginning, we were created for relationship — with God, and with one another.</p><p>This is placeholder content for design review.</p>',
    coverUrl: unsplash('1628717341663-0007b0ee2597', 800),
    authorName: 'Sample Author',
    publishedAt: daysAgo(4),
    tags: ['Community'],
  },
  {
    id: 'post-2',
    slug: 'a-simple-guide-to-prayer',
    title: 'A Simple Guide to Prayer',
    excerpt: 'Prayer does not have to be complicated. Here are a few ways to start.',
    contentHtml: '<p>Prayer does not have to be complicated. Here are a few simple ways to start a daily practice.</p><p>This is placeholder content for design review.</p>',
    coverUrl: unsplash('1593113616828-6f22bca04804', 800),
    authorName: 'Sample Author',
    publishedAt: daysAgo(12),
    tags: ['Prayer'],
  },
  {
    id: 'post-3',
    slug: 'serving-with-purpose',
    title: 'Serving with Purpose',
    excerpt: 'What it looks like to put your faith into action.',
    contentHtml: '<p>What it looks like to put your faith into action, in small and large ways.</p><p>This is placeholder content for design review.</p>',
    coverUrl: unsplash('1544928938-6852c1925194', 800),
    authorName: 'Sample Author',
    publishedAt: daysAgo(20),
    tags: ['Service'],
  },
];
