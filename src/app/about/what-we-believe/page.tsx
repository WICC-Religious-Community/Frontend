import type { Metadata } from 'next';
import { BlockRenderer } from '@/components/blocks/block-renderer';
import { Container, EmptyState, Page, PageMasthead } from '@/components/primitives';
import { getPage } from '@/domain/pages/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

/** The church's statement of belief is authored by the church, as the CMS page with this slug. */
const CMS_SLUG = 'what-we-believe';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(CMS_SLUG);
  return buildPageMetadata({
    title: page?.title ?? 'What We Believe',
    description: page?.description ?? 'What WICC believes.',
    path: routes.whatWeBelieve(),
    noindex: !page,
  });
}

export default async function WhatWeBelievePage() {
  const page = await getPage(CMS_SLUG);

  if (!page) {
    return (
      <Page>
        <Container className="py-section" width="narrow">
          <PageMasthead title="What We Believe" />
          <div className="mt-12">
            <EmptyState title="Not published yet" description="This page hasn’t been published yet." />
          </div>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <BlockRenderer blocks={page.blocks} />
    </Page>
  );
}
