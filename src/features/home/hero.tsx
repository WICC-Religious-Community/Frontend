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
 * (`settings.hero`); with none published it falls back to a typographic hero
 * of just the church's name. The header is transparent over this section
 * (see `components/layout/header.tsx`), hence the negative top margin.
 */
export function Hero({ settings, serviceStatus }: { settings: SiteSettings; serviceStatus: ServiceStatus }) {
  const { hero } = settings;
  const headline = hero?.headline ?? settings.name;
  const subheadline = hero?.subheadline ?? settings.description;
  const primary = hero?.primaryCta ?? { label: 'Watch', href: routes.watch() };
  const secondary = hero?.secondaryCta ?? { label: 'Plan a Visit', href: routes.visit() };

  return (
    <section className="on-dark bg-dark relative isolate -mt-[calc(4.5rem+1px)] flex min-h-[max(40rem,100svh)] flex-col justify-end overflow-clip">
      {hero?.media ? (
        <HeroMedia media={hero.media} />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(70%_60%_at_20%_100%,var(--color-primary-tint-strong),transparent_70%)]"
        />
      )}
      {/* Legibility scrims: top for the transparent header, bottom for the copy. */}
      <div aria-hidden="true" className="from-dark/70 absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b to-transparent" />
      <div aria-hidden="true" className="from-dark via-dark/60 absolute inset-0 -z-10 bg-gradient-to-t to-dark/10" />

      <Container className="relative pb-14 pt-40 sm:pb-20">
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 max-w-4xl duration-700 motion-reduce:animate-none">
          <LiveServiceBadge initial={serviceStatus} />
          <h1 className="font-display text-display-2xl mt-6 font-semibold text-balance text-on-dark">{headline}</h1>
          {subheadline ? (
            <p className="text-muted mt-6 max-w-2xl text-body-lg text-pretty">{subheadline}</p>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-3">
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
      </Container>

      <HeroServiceBar settings={settings} />
    </section>
  );
}
