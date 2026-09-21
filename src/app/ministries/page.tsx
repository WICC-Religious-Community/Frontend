import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container, Figure, Grid, Page, SectionHeader } from '@/components/primitives';
import { getMinistries } from '@/domain/ministries/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Ministries',
  description: 'The ministries of WICC.',
  path: routes.ministries(),
});

export default async function MinistriesPage() {
  const ministries = await getMinistries();

  return (
    <Page>
      <Container className="py-section">
        <SectionHeader
          eyebrow="Get Involved"
          title="Ministries"
          size="lg"
          align="center"
        />
        <Grid columns={3} className="mt-12">
          {ministries.map(ministry => (
            <Link key={ministry.id} href={routes.ministry(ministry.slug)} className="group block h-full">
              <Figure src={ministry.coverUrl} alt={ministry.name} width={400} height={300} className="aspect-[4/3]" />
              <div className="mt-4 flex items-center justify-between gap-2">
                <h3 className="font-display text-heading-sm font-semibold text-ink">{ministry.name}</h3>
                <ArrowRight className="text-primary-dark h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
              {ministry.summary ? <p className="text-muted mt-2 text-body-sm">{ministry.summary}</p> : null}
            </Link>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
