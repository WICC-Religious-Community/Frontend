import { Container, Eyebrow, Figure, Reveal } from '@/components/primitives';
import type { Pillar } from '@/domain/site/model';

/**
 * The church's own statements of what it's about, each set against its own
 * photo — a color-blocked fallback when no image is published, never a bare
 * gradient. Exactly as published, or not at all.
 */
export function Pillars({ pillars }: { pillars: Pillar[] }) {
  if (pillars.length === 0) return null;

  return (
    <Container>
      <Eyebrow>What We&rsquo;re About</Eyebrow>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 0.06}>
            <div className="on-dark group relative h-80 overflow-hidden rounded-2xl">
              {pillar.imageUrl ? (
                <Figure
                  src={pillar.imageUrl}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="absolute inset-0 h-full rounded-none"
                  imageClassName="transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="bg-dark absolute inset-0" />
              )}
              <div className="from-dark via-dark/50 absolute inset-0 bg-gradient-to-t to-transparent" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-end p-8">
                <span className="bg-highlight block h-1 w-10 rounded-full" aria-hidden="true" />
                <h3 className="font-display mt-5 text-display-sm uppercase text-on-dark">{pillar.title}</h3>
                {pillar.description ? (
                  <p className="text-muted mt-3 text-body-sm leading-relaxed">{pillar.description}</p>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
