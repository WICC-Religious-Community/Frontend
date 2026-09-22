import { Container, Eyebrow, Reveal } from '@/components/primitives';
import type { Pillar } from '@/domain/site/model';

/**
 * The church's own statements of what it's about, rendered as bold
 * color-blocked cards — a deliberate visual moment, not a quiet list.
 * Exactly as published, or not at all.
 */
export function Pillars({ pillars }: { pillars: Pillar[] }) {
  if (pillars.length === 0) return null;

  return (
    <Container>
      <Eyebrow>What We&rsquo;re About</Eyebrow>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 0.06}>
            <div className="on-dark bg-dark group relative h-full overflow-hidden rounded-2xl p-8">
              <div
                aria-hidden="true"
                className="bg-primary/25 absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-80"
              />
              <span className="bg-highlight relative block h-1 w-10 rounded-full" aria-hidden="true" />
              <h3 className="font-display relative mt-6 text-display-sm uppercase text-on-dark">{pillar.title}</h3>
              {pillar.description ? (
                <p className="text-muted relative mt-3 text-body-lg leading-relaxed">{pillar.description}</p>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
