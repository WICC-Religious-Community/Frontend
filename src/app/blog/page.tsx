import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, EmptyState, Figure, Grid, Page, PageMasthead } from '@/components/primitives';
import { getBlogPosts } from '@/domain/blog/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { formatDate } from '@/lib/format/date';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog',
  description: 'Articles from WICC.',
  path: routes.blog(),
});

export default async function BlogPage() {
  const { items: posts } = await getBlogPosts({ limit: 12 });
  const [featured, ...rest] = posts;

  return (
    <Page>
      <Container className="py-section">
        <PageMasthead eyebrow="Read" title="Blog" />

        {!featured ? (
          <EmptyState className="mt-10" title="Nothing published yet" description="Check back soon." />
        ) : (
          <div className="mt-10">
            <Link href={routes.blogPost(featured.slug)} className="group grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
              <Figure src={featured.coverUrl} alt={featured.title} width={960} height={600} className="aspect-[4/3]" imageClassName="group-hover:scale-105" />
              <div>
                <p className="text-subtle text-caption">{formatDate(featured.publishedAt)}</p>
                <h2 className="font-display group-hover:text-primary-dark mt-2 text-display-sm font-semibold text-ink transition-colors">
                  {featured.title}
                </h2>
                {featured.excerpt ? <p className="text-muted mt-4 text-body-lg leading-relaxed">{featured.excerpt}</p> : null}
              </div>
            </Link>

            {rest.length > 0 ? (
              <Grid columns={3} className="border-border mt-16 border-t pt-16">
                {rest.map(post => (
                  <Link key={post.id} href={routes.blogPost(post.slug)} className="group block">
                    <Figure src={post.coverUrl} alt={post.title} width={480} height={320} className="aspect-[3/2]" imageClassName="group-hover:scale-105" />
                    <p className="text-subtle mt-4 text-caption">{formatDate(post.publishedAt)}</p>
                    <h3 className="font-display group-hover:text-primary-dark mt-1 text-heading-sm font-semibold text-ink transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt ? <p className="text-muted mt-2 line-clamp-2 text-body-sm">{post.excerpt}</p> : null}
                  </Link>
                ))}
              </Grid>
            ) : null}
          </div>
        )}
      </Container>
    </Page>
  );
}
