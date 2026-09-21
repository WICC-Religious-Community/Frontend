import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs, Container, Figure, Page, Prose } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/seo/json-ld';
import { getAllMinistrySlugs, getMinistry } from '@/domain/ministries/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbSchema } from '@/lib/seo/jsonld';
import { routes } from '@/config/routes';

export async function generateStaticParams() {
  const slugs = await getAllMinistrySlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ministry = await getMinistry(slug).catch(() => null);
  if (!ministry) return {};
  return buildPageMetadata({
    title: ministry.name,
    description: ministry.summary ?? `${ministry.name} at WICC.`,
    path: routes.ministry(slug),
    image: ministry.coverUrl,
  });
}

export default async function MinistryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ministry = await getMinistry(slug).catch(() => null);
  if (!ministry) notFound();

  return (
    <Page>
      <Figure src={ministry.coverUrl} alt={ministry.name} width={1600} height={600} className="aspect-[16/6] rounded-none" />
      <Container className="py-section">
        <Breadcrumbs items={[{ label: 'Ministries', href: routes.ministries() }, { label: ministry.name }]} />
        <h1 className="font-display mt-4 text-display-sm font-semibold text-ink">{ministry.name}</h1>
        {ministry.summary ? <p className="text-muted mt-3 max-w-2xl text-body-lg">{ministry.summary}</p> : null}

        <div className="mt-8 grid gap-10 lg:grid-cols-[2fr_1fr]">
          {ministry.descriptionHtml ? (
            <Prose dangerouslySetInnerHTML={{ __html: ministry.descriptionHtml }} />
          ) : (
            <div />
          )}
          <aside className="border-border h-fit space-y-4 rounded-lg border p-6">
            {ministry.meetingSchedule ? (
              <div>
                <p className="text-subtle text-label font-semibold uppercase tracking-wide">Meets</p>
                <p className="mt-1 text-body-sm text-ink">{ministry.meetingSchedule}</p>
              </div>
            ) : null}
            {ministry.leader ? (
              <div>
                <p className="text-subtle text-label font-semibold uppercase tracking-wide">Leader</p>
                <p className="mt-1 text-body-sm text-ink">{ministry.leader.name}</p>
              </div>
            ) : null}
            <Button asChild className="w-full">
              <Link href={routes.connect()}>Get Connected</Link>
            </Button>
          </aside>
        </div>
      </Container>

      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Ministries', path: routes.ministries() },
          { name: ministry.name, path: routes.ministry(slug) },
        ])}
      />
    </Page>
  );
}
