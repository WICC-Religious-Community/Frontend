import Link from 'next/link';
import { Container } from '@/components/primitives';
import { Button } from '@/components/ui/button';

export function CtaBannerBlock({ data }: { data: Record<string, unknown> }) {
  const title = typeof data.title === 'string' ? data.title : '';
  const ctaLabel = typeof data.ctaLabel === 'string' ? data.ctaLabel : undefined;
  const ctaHref = typeof data.ctaHref === 'string' ? data.ctaHref : undefined;

  return (
    <Container className="py-section-sm text-center">
      <h2 className="font-display text-heading-lg font-semibold text-ink">{title}</h2>
      {ctaLabel && ctaHref ? (
        <Button asChild size="lg" className="mt-6">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      ) : null}
    </Container>
  );
}
