import Link from 'next/link';
import { Play } from 'lucide-react';
import { Container } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { LiveServiceBadge } from '@/components/layout/live-service-badge';
import { routes } from '@/config/routes';
import type { ServiceStatus, SiteSettings } from '@/domain/site/model';
import { HeroMedia } from './hero-media';
import { HeroServiceBar } from './hero-service-bar';

/**
 * Homepage hero. The church supplies the words and the media
 * (`settings.hero`); with none published it falls back to a typographic
 * hero — a considered dark surface (grain + accent glow), never a bare
 * gradient. Centered, oversized, uppercase display type with an accent-color
 * second line — the one deliberate "statement" moment on the page. Pulls
 * itself up under the header (see `components/layout/header.tsx`), which
 * starts transparent here and only solidifies on scroll.
 */
export function Hero({ settings, serviceStatus }: { settings: SiteSettings; serviceStatus: ServiceStatus }) {
  const { hero } = settings;
  const headline = hero?.headline ?? settings.name;
  const subheadline = hero?.subheadline ?? settings.description;
  const primary = hero?.primaryCta ?? { label: 'Watch', href: routes.watch() };
  const secondary = hero?.secondaryCta ?? { label: 'Plan a Visit', href: routes.visit() };
  const hasServiceBar = settings.serviceTimes.length > 0 || Boolean(settings.address);

  return (
    <section className="on-dark bg-dark relative isolate -mt-18 flex min-h-[max(34rem,90svh)] flex-col justify-end overflow-clip">
      {hero?.media ? (
        <HeroMedia media={hero.media} />
      ) : (
        <div aria-hidden="true" className="bg-grain absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_100%,var(--color-primary-tint-strong),transparent_65%)]" />
        </div>
      )}
      {/* Legibility scrims: top for the transparent header, bottom for the copy. */}
      <div aria-hidden="true" className="from-dark/70 absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b to-transparent" />
      <div aria-hidden="true" className="from-dark via-dark/70 absolute inset-0 -z-10 bg-gradient-to-t to-dark/20" />

      <Container className="relative flex flex-col items-center py-20 text-center sm:py-28">
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 flex max-w-4xl flex-col items-center duration-700 motion-reduce:animate-none">
          <LiveServiceBadge initial={serviceStatus} />
          <h1 className="font-display text-display-2xl mt-6 uppercase leading-[0.95] text-on-dark">
            {headline}
            {hero?.headlineAccent ? <span className="text-highlight block">{hero.headlineAccent}</span> : null}
          </h1>
          {subheadline ? <p className="text-muted mt-6 max-w-xl text-body-lg text-pretty">{subheadline}</p> : null}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href={primary.href}>
                {primary.href === routes.watch() ? <Play className="h-4 w-4 fill-current" aria-hidden="true" /> : null}
                {primary.label}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-on-dark hover:bg-white/10">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
        </div>

        {!hasServiceBar ? (
          <span
            aria-hidden="true"
            className="border-on-dark/30 absolute bottom-0 left-1/2 hidden h-14 w-px -translate-x-1/2 animate-pulse sm:block"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--color-on-dark) 70%, transparent)' }}
          />
        ) : null}
      </Container>

      <HeroServiceBar settings={settings} />
    </section>
  );
}
