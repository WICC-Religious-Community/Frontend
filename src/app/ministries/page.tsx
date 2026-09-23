import type { Metadata } from 'next';
import { Container, FeatureTiles, Page, PageMasthead } from '@/components/primitives';
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
        <PageMasthead eyebrow="Get Involved" title="Ministries" />
        <div className="mt-10">
          <FeatureTiles
            featureFirst
            items={ministries.map(ministry => ({
              id: ministry.id,
              href: routes.ministry(ministry.slug),
              title: ministry.name,
              summary: ministry.summary,
              imageUrl: ministry.coverUrl,
            }))}
          />
        </div>
      </Container>
    </Page>
  );
}
