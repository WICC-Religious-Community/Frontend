import { Container, Reveal } from '@/components/primitives';
import type { Pillar } from '@/domain/site/model';

/** The church's own statements of what it's about — rendered exactly as published, or not at all. */
export function Pillars({ pillars }: { pillars: Pillar[] }) {
  if (pillars.length === 0) return null;

  return (
    <Container>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 0.08}>
            <div className="border-border h-full rounded-lg border p-8">
              <span className="text-primary font-display text-display-sm font-semibold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display mt-4 text-heading-md font-semibold text-ink">{pillar.title}</h3>
              {pillar.description ? (
                <p className="text-muted mt-3 text-body-sm leading-relaxed">{pillar.description}</p>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
