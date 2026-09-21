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
  const slugs = await getAllSermonSlugs();
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
        <h1 className="font-display mt-4 max-w-3xl text-display-sm font-semibold text-ink">{sermon.title}</h1>
        <p className="text-muted mt-2 text-body-sm">
          {sermon.speaker?.name ? `${sermon.speaker.name} · ` : ''}
          {formatDate(sermon.publishedAt)}
        </p>

        <div className="mt-8">
          <VideoEmbed src={sermon.videoUrl} title={sermon.title} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            {sermon.description ? <p className="text-ink text-body-lg leading-loose">{sermon.description}</p> : null}
          </div>
          <aside className="space-y-6">
            {sermon.scripture.length > 0 ? (
              <div>
                <p className="text-subtle flex items-center gap-2 text-label font-semibold uppercase tracking-wide">
                  <BookOpen className="h-4 w-4" /> Scripture
                </p>
                <ul className="mt-2 space-y-1 text-body-sm text-ink">
                  {sermon.scripture.map(reference => (
                    <li key={reference}>{reference}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {sermon.topics.length > 0 ? (
              <div>
                <p className="text-subtle flex items-center gap-2 text-label font-semibold uppercase tracking-wide">
                  <Tag className="h-4 w-4" /> Topics
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {sermon.topics.map(topic => (
                    <span key={topic} className="bg-canvas-2 rounded-full px-3 py-1 text-caption text-muted">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {sermon.series ? (
              <Link href={routes.sermonSeries(sermon.series.slug)} className="text-primary-dark block text-body-sm font-semibold underline underline-offset-4">
                More from “{sermon.series.title}”
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
