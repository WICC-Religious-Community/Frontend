import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Page } from '@/components/primitives';
import { BlockRenderer } from '@/components/blocks/block-renderer';
import { getPage } from '@/domain/pages/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  return buildPageMetadata({
    title: page.title,
    description: page.description ?? page.title,
    path: routes.page(slug),
  });
}

/**
 * Catch-all for admin-composed marketing/campaign pages — anything not
 * already claimed by a static route above. Renders whatever block sequence
 * the backend returns via `<BlockRenderer>`, so new landing pages ship with
 * zero frontend deploys.
 */
export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <Page>
      <BlockRenderer blocks={page.blocks} />
    </Page>
  );
}
