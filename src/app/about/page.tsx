import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Grid, Page, Reveal, SectionHeader } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { getLeaders } from '@/domain/leadership/server';
import { getSiteSettings } from '@/domain/site/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description: 'About WICC.',
  path: routes.about(),
});

export default async function AboutPage() {
  const [settings, leaders] = await Promise.all([getSiteSettings(), getLeaders()]);

  return (
    <Page>
      <Container className="py-section">
        <SectionHeader eyebrow="About" title="About WICC" description={settings.description} size="lg" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="border-border h-full rounded-lg border p-8">
              <h2 className="font-display text-heading-md font-semibold text-ink">What We Believe</h2>
              <p className="text-muted mt-3 text-body-sm leading-relaxed">
                What WICC believes.
              </p>
              <Button asChild variant="link" className="mt-4">
                <Link href={routes.whatWeBelieve()}>Read our beliefs</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="border-border h-full rounded-lg border p-8">
              <h2 className="font-display text-heading-md font-semibold text-ink">Leadership</h2>
              <p className="text-muted mt-3 text-body-sm leading-relaxed">
                The people who lead WICC.
              </p>
              <Button asChild variant="link" className="mt-4">
                <Link href={routes.leadership()}>Meet our leaders</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <SectionHeader eyebrow="Our Team" title="Leadership" size="sm" />
          <Grid columns={4} className="mt-8">
            {leaders.slice(0, 4).map(leader => (
              <Link key={leader.id} href={routes.leader(leader.slug)} className="text-center">
                <p className="font-display text-heading-sm font-semibold text-ink">{leader.name}</p>
                {leader.role ? <p className="text-muted mt-1 text-body-sm">{leader.role}</p> : null}
              </Link>
            ))}
          </Grid>
        </div>
      </Container>
    </Page>
  );
}
