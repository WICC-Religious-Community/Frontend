import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Tag } from 'lucide-react';
import { Breadcrumbs, Container, Page } from '@/components/primitives';
import { VideoEmbed } from '@/components/media/video-embed';
import { JsonLd } from '@/components/seo/json-ld';
import { getAllSermonSlugs, getSermon } from '@/domain/sermons/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbSchema, buildVideoSchema } from '@/lib/seo/jsonld';
import { formatDate } from '@/lib/format/date';
import { routes } from '@/config/routes';

export async function generateStaticParams() {
  const slugs = await getAllSermonSlugs().catch(() => []);
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sermon = await getSermon(slug).catch(() => null);
  if (!sermon) return {};
  return buildPageMetadata({
    title: sermon.title,
    description: sermon.description ?? `Watch ${sermon.title} at WICC.`,
    path: routes.sermon(slug),
    image: sermon.thumbnailUrl,
    ogType: 'article',
  });
}

export default async function SermonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sermon = await getSermon(slug).catch(() => null);
  if (!sermon) notFound();

  return (
    <Page>
      <Container className="py-section">
        <Breadcrumbs
          items={[
            { label: 'Sermons', href: routes.sermons() },
            ...(sermon.series ? [{ label: sermon.series.title, href: routes.sermonSeries(sermon.series.slug) }] : []),
            { label: sermon.title },
          ]}
        />
        <h1 className="font-display mt-6 max-w-3xl text-display-md font-semibold text-ink text-balance">{sermon.title}</h1>
        <p className="text-muted mt-3 text-body-lg">
          {sermon.speaker?.name ? `${sermon.speaker.name} · ` : ''}
          {formatDate(sermon.publishedAt)}
        </p>

        <div className="mt-10">
          <VideoEmbed src={sermon.videoUrl} title={sermon.title} />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            {sermon.description ? <p className="text-ink text-body-lg leading-loose">{sermon.description}</p> : null}
          </div>
          <aside className="border-border space-y-8 border-t pt-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            {sermon.scripture.length > 0 ? (
              <div>
                <p className="text-subtle flex items-center gap-2 text-label font-semibold uppercase tracking-wide">
                  <BookOpen className="h-4 w-4" aria-hidden="true" /> Scripture
                </p>
                <ul className="mt-3 space-y-1.5 text-body-sm text-ink">
                  {sermon.scripture.map(reference => (
                    <li key={reference}>{reference}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {sermon.topics.length > 0 ? (
              <div>
                <p className="text-subtle flex items-center gap-2 text-label font-semibold uppercase tracking-wide">
                  <Tag className="h-4 w-4" aria-hidden="true" /> Topics
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sermon.topics.map(topic => (
                    <span key={topic} className="bg-canvas-2 rounded-full px-3 py-1 text-caption text-muted">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {sermon.series ? (
              <Link
                href={routes.sermonSeries(sermon.series.slug)}
                className="text-primary-dark hover:text-primary block text-body-sm font-semibold transition-colors"
              >
                More from &ldquo;{sermon.series.title}&rdquo; →
              </Link>
            ) : null}
          </aside>
        </div>
      </Container>

      <JsonLd
        data={buildVideoSchema({
          name: sermon.title,
          description: sermon.description,
          thumbnailUrl: sermon.thumbnailUrl,
          uploadDate: sermon.publishedAt,
          embedUrl: sermon.videoUrl,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Sermons', path: routes.sermons() },
          { name: sermon.title, path: routes.sermon(slug) },
        ])}
      />
    </Page>
  );
}
