import Link from 'next/link';
import { Play } from 'lucide-react';
import { Container } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { LiveServiceBadge } from '@/components/layout/live-service-badge';
import { routes } from '@/config/routes';
import type { ServiceStatus } from '@/domain/site/model';

export function Hero({ serviceStatus }: { serviceStatus: ServiceStatus }) {
  return (
    <section className="on-dark bg-dark relative overflow-clip">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-primary-tint),transparent_70%)]"
      />
      <Container className="relative py-section-lg text-center">
        <div className="flex justify-center">
          <LiveServiceBadge initial={serviceStatus} />
        </div>
        <h1 className="font-display mx-auto mt-6 max-w-4xl text-display-xl font-semibold text-on-dark">
          A family built on <span className="text-primary-light italic">grace</span>, faith, and
          purpose
        </h1>
        <p className="text-muted mx-auto mt-6 max-w-2xl text-body-lg">
          Join WICC for worship, biblical teaching, and a community that walks with you through
          every season of life.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href={routes.watch()}>
              <Play className="h-4 w-4 fill-current" /> Watch Live
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/25 text-on-dark hover:bg-white/10">
            <Link href={routes.visit()}>Plan Your Visit</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
