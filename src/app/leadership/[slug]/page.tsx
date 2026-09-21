import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, Container, Figure, Page } from '@/components/primitives';
import { JsonLd } from '@/components/seo/json-ld';
import { getAllLeaderSlugs, getLeader } from '@/domain/leadership/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildPersonSchema } from '@/lib/seo/jsonld';
import { routes } from '@/config/routes';

export async function generateStaticParams() {
  const slugs = await getAllLeaderSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const leader = await getLeader(slug).catch(() => null);
  if (!leader) return {};
  return buildPageMetadata({
    title: leader.name,
    description: leader.bio ?? `${leader.name}${leader.role ? `, ${leader.role}` : ''} at WICC.`,
    path: routes.leader(slug),
    image: leader.photoUrl,
  });
}

export default async function LeaderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const leader = await getLeader(slug).catch(() => null);
  if (!leader) notFound();

  return (
    <Page>
      <Container className="py-section">
        <Breadcrumbs items={[{ label: 'Leadership', href: routes.leadership() }, { label: leader.name }]} />
        <div className="mt-8 grid gap-10 sm:grid-cols-[16rem_1fr]">
          <Figure src={leader.photoUrl} alt={leader.name} width={400} height={500} className="aspect-[4/5]" />
          <div>
            <h1 className="font-display text-display-sm font-semibold text-ink">{leader.name}</h1>
            {leader.role ? <p className="text-primary-dark mt-2 text-body-lg font-medium">{leader.role}</p> : null}
            {leader.bio ? <p className="text-muted mt-6 max-w-2xl text-body-lg leading-loose">{leader.bio}</p> : null}
          </div>
        </div>
      </Container>

      <JsonLd data={buildPersonSchema({ name: leader.name, role: leader.role, bio: leader.bio, imageUrl: leader.photoUrl, path: routes.leader(slug) })} />
    </Page>
  );
}
