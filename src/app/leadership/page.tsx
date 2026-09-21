import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Figure, Grid, Page, SectionHeader } from '@/components/primitives';
import { getLeaders } from '@/domain/leadership/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Leadership',
  description: 'Meet the pastors and leaders of WICC.',
  path: routes.leadership(),
});

export default async function LeadershipPage() {
  const leaders = await getLeaders();

  return (
    <Page>
      <Container className="py-section">
        <SectionHeader eyebrow="Our Team" title="Leadership" size="lg" align="center" />
        <Grid columns={4} className="mt-12">
          {leaders.map(leader => (
            <Link key={leader.id} href={routes.leader(leader.slug)} className="group block text-center">
              <Figure src={leader.photoUrl} alt={leader.name} width={300} height={300} className="aspect-square rounded-full" />
              <p className="font-display mt-4 text-heading-sm font-semibold text-ink">{leader.name}</p>
              {leader.role ? <p className="text-muted mt-1 text-body-sm">{leader.role}</p> : null}
            </Link>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
