import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container, Figure, Grid, Reveal, SectionHeader } from '@/components/primitives';
import { routes } from '@/config/routes';
import type { Ministry } from '@/domain/ministries/model';

export function MinistriesGrid({ ministries }: { ministries: Ministry[] }) {
  return (
    <Container>
      <SectionHeader
        eyebrow="Get Involved"
        title="Find your place"
        description="Every ministry at WICC exists to help you grow and belong."
        size="sm"
        align="center"
      />
      <Grid columns={3} className="mt-12">
        {ministries.map((ministry, index) => (
          <Reveal key={ministry.id} delay={index * 0.05}>
            <Link href={routes.ministry(ministry.slug)} className="group block h-full">
              <Figure src={ministry.coverUrl} alt={ministry.name} width={400} height={300} className="aspect-[4/3]" />
              <div className="mt-4 flex items-center justify-between gap-2">
                <h3 className="font-display text-heading-sm font-semibold text-ink">{ministry.name}</h3>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary-dark transition-transform group-hover:translate-x-1" />
              </div>
              {ministry.summary ? <p className="text-muted mt-2 text-body-sm">{ministry.summary}</p> : null}
            </Link>
          </Reveal>
        ))}
      </Grid>
    </Container>
  );
}
