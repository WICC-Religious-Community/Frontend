import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container, Grid, Page, PageMasthead, Reveal } from '@/components/primitives';
import { getLeaders } from '@/domain/leadership/server';
import { getSiteSettings } from '@/domain/site/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description: 'About WICC.',
  path: routes.about(),
});

const LINKS = [
  { title: 'What We Believe', description: 'What WICC believes.', href: routes.whatWeBelieve() },
  { title: 'Leadership', description: 'The people who lead WICC.', href: routes.leadership() },
] as const;

export default async function AboutPage() {
  const [settings, leaders] = await Promise.all([getSiteSettings(), getLeaders()]);

  return (
    <Page>
      <Container className="py-section">
        <PageMasthead eyebrow="About" title="About WICC" description={settings.description} />

        <div className="border-border mt-12 border-t">
          {LINKS.map((link, index) => (
            <Reveal key={link.href} delay={index * 0.05}>
              <Link href={link.href} className="group border-border flex items-center justify-between gap-4 border-b py-7">
                <div>
                  <h2 className="font-display group-hover:text-primary-dark text-heading-md font-semibold text-ink transition-colors">
                    {link.title}
                  </h2>
                  <p className="text-muted mt-1 text-body-sm">{link.description}</p>
                </div>
                <ArrowRight className="text-subtle h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>

        {leaders.length > 0 ? (
          <div className="mt-16">
            <p className="eyebrow">Our Team</p>
            <Grid columns={4} className="mt-8">
              {leaders.slice(0, 4).map(leader => (
                <Link key={leader.id} href={routes.leader(leader.slug)} className="hover:text-primary-dark text-center transition-colors">
                  <p className="font-display text-heading-sm font-semibold text-ink">{leader.name}</p>
                  {leader.role ? <p className="text-muted mt-1 text-body-sm">{leader.role}</p> : null}
                </Link>
              ))}
            </Grid>
          </div>
        ) : null}
      </Container>
    </Page>
  );
}
