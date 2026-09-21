import type { BlogPost } from './model';

const tags = ['Devotional', 'Family', 'Prayer', 'Community', 'Discipleship'];

export const blogPostsFixture: BlogPost[] = Array.from({ length: 9 }, (_, index) => {
  const publishedAt = new Date(Date.now() - index * 6 * 86_400_000).toISOString();
  return {
    id: `post_${index + 1}`,
    slug: `walking-in-grace-${index + 1}`,
    title: `Walking in Grace — Reflection ${index + 1}`,
    excerpt: 'A short reflection on what it means to live by grace in the everyday, ordinary moments of life.',
    contentHtml:
      '<p>Grace meets us exactly where we are — and it is the same grace that carries us forward. In this reflection, we explore what that means practically, day to day.</p><p>Take a moment this week to sit with that truth, and let it shape how you respond to the people around you.</p>',
    authorName: 'Pastor Daniel Adeyemi',
    publishedAt,
    tags: [tags[index % tags.length]],
  };
});
