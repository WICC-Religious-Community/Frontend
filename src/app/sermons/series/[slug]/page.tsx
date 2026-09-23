import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, Container, Grid, Page, PageMasthead } from '@/components/primitives';
import { SermonCard } from '@/features/sermons/sermon-card';
import { getSermons, getSermonSeries, getSermonSeriesList } from '@/domain/sermons/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
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
        <PageMasthead eyebrow="Series" title={series.title} description={series.description} className="mt-6" />
        <Grid columns={3} className="mt-10">
          {sermons.map(sermon => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
