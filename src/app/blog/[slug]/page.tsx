import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, Container, Figure, Page, Prose } from '@/components/primitives';
import { JsonLd } from '@/components/seo/json-ld';
import { getAllBlogPostSlugs, getBlogPost } from '@/domain/blog/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/seo/jsonld';
import { formatDate } from '@/lib/format/date';
import { readingTime, stripHtml } from '@/lib/format/string';
import { routes } from '@/config/routes';

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs().catch(() => []);
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug).catch(() => null);
  if (!post) return {};
  return buildPageMetadata({
    title: post.title,
    description: post.excerpt ?? stripHtml(post.contentHtml ?? '').slice(0, 155),
    path: routes.blogPost(slug),
    image: post.coverUrl,
    ogType: 'article',
    article: { publishedTime: post.publishedAt, modifiedTime: post.updatedAt, authors: post.authorName ? [post.authorName] : undefined },
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug).catch(() => null);
  if (!post) notFound();

  return (
    <Page>
      <Container className="py-section" width="narrow">
        <Breadcrumbs items={[{ label: 'Blog', href: routes.blog() }, { label: post.title }]} />
        <h1 className="font-display mt-6 text-display-md font-semibold text-ink text-balance">{post.title}</h1>
        <p className="text-subtle mt-4 text-body-sm">
          {post.authorName ? `${post.authorName} · ` : ''}
          {formatDate(post.publishedAt)} · {readingTime(stripHtml(post.contentHtml ?? ''))} min read
        </p>
        {post.coverUrl ? (
          <Figure src={post.coverUrl} alt={post.title} width={900} height={500} className="mt-10 aspect-[16/9]" />
        ) : null}
        {post.contentHtml ? <Prose className="mt-10" dangerouslySetInnerHTML={{ __html: post.contentHtml }} /> : null}
      </Container>

      <JsonLd
        data={buildArticleSchema({
          title: post.title,
          description: post.excerpt,
          slug: post.slug,
          imageUrl: post.coverUrl,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          authorName: post.authorName,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([{ name: 'Blog', path: routes.blog() }, { name: post.title, path: routes.blogPost(slug) }])}
      />
    </Page>
  );
}
