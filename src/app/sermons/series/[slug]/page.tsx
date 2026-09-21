import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Breadcrumbs, Container, Figure, Grid, Page, SectionHeader } from '@/components/primitives';
import { getSermons, getSermonSeries, getSermonSeriesList } from '@/domain/sermons/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { formatShortDate } from '@/lib/format/date';
import { routes } from '@/config/routes';

export async function generateStaticParams() {
  const seriesList = await getSermonSeriesList().catch(() => []);
  return seriesList.map(series => ({ slug: series.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSermonSeries(slug).catch(() => null);
  if (!series) return {};
  return buildPageMetadata({
    title: series.title,
    description: series.description ?? `${series.title} — a sermon series at WICC.`,
    path: routes.sermonSeries(slug),
    image: series.coverUrl,
  });
}

export default async function SermonSeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const series = await getSermonSeries(slug).catch(() => null);
  if (!series) notFound();

  const { items: sermons } = await getSermons({ series: slug, limit: 50 });

  return (
    <Page>
      <Container className="py-section">
        <Breadcrumbs items={[{ label: 'Sermons', href: routes.sermons() }, { label: series.title }]} />
        <SectionHeader
          eyebrow="Series"
          title={series.title}
          description={series.description}
          size="lg"
          className="mt-4"
        />
        <Grid columns={3} className="mt-12">
          {sermons.map(sermon => (
            <Link key={sermon.id} href={routes.sermon(sermon.slug)} className="group block">
              <Figure src={sermon.thumbnailUrl} alt={sermon.title} width={480} height={270} className="aspect-video" />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-display line-clamp-2 text-heading-sm font-semibold text-ink">{sermon.title}</p>
                  <p className="text-subtle mt-1 text-caption">{formatShortDate(sermon.publishedAt)}</p>
                </div>
                <span className="bg-primary text-on-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
              </div>
            </Link>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
