import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container, Eyebrow } from '@/components/primitives';
import { routes } from '@/config/routes';

/** A full-bleed dark statement band — large display type set against the button, not a centered mini-header. */
export function GivingCta() {
  return (
    <Container className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
      <div>
        <Eyebrow>Generosity</Eyebrow>
        <p className="font-display text-display-lg mt-4 max-w-xl font-semibold text-on-dark text-balance">
          Give to WICC
        </p>
      </div>
      <Link
        href={routes.give()}
        className="group border-on-dark/30 hover:bg-on-dark hover:text-dark inline-flex shrink-0 items-center gap-3 self-start rounded-full border px-7 py-4 text-body font-semibold text-on-dark transition-colors"
      >
        Give Now
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </Container>
  );
}
