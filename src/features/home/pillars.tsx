import { Container, Eyebrow, Reveal } from '@/components/primitives';
import type { Pillar } from '@/domain/site/model';

/**
 * The church's own statements of what it's about, rendered as an editorial
 * numbered manifesto — large index numerals against a thin rule, not a grid
 * of identical bordered boxes. Exactly as published, or not at all.
 */
export function Pillars({ pillars }: { pillars: Pillar[] }) {
  if (pillars.length === 0) return null;

  return (
    <Container>
      <Eyebrow>What We&rsquo;re About</Eyebrow>
      <div className="border-border mt-6 border-t">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 0.06}>
            <div className="border-border group grid grid-cols-[3.5rem_1fr] gap-6 border-b py-8 sm:grid-cols-[6rem_1fr] sm:gap-10 sm:py-10 lg:grid-cols-[6rem_20rem_1fr]">
              <span className="font-display text-display-md text-primary/40 group-hover:text-primary-dark font-semibold tabular-nums transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-display-sm font-semibold text-ink">{pillar.title}</h3>
              {pillar.description ? (
                <p className="text-muted col-span-2 mt-1 max-w-prose text-body-lg leading-relaxed sm:col-span-1 lg:mt-0 lg:self-center">
                  {pillar.description}
                </p>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
