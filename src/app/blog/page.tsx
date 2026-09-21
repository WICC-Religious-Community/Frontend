import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Figure, Grid, Page, SectionHeader } from '@/components/primitives';
import { getBlogPosts } from '@/domain/blog/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { formatDate } from '@/lib/format/date';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog',
  description: 'Devotionals and articles from the WICC team.',
  path: routes.blog(),
});

export default async function BlogPage() {
  const { items: posts } = await getBlogPosts({ limit: 12 });

  return (
    <Page>
      <Container className="py-section">
        <SectionHeader eyebrow="Read" title="Blog" size="lg" align="center" />
        <Grid columns={3} className="mt-12">
          {posts.map(post => (
            <Link key={post.id} href={routes.blogPost(post.slug)} className="group block">
              <Figure src={post.coverUrl} alt={post.title} width={480} height={320} className="aspect-[3/2]" />
              <p className="text-subtle mt-4 text-caption">{formatDate(post.publishedAt)}</p>
              <h3 className="font-display mt-1 text-heading-sm font-semibold text-ink">{post.title}</h3>
              {post.excerpt ? <p className="text-muted mt-2 line-clamp-2 text-body-sm">{post.excerpt}</p> : null}
            </Link>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
