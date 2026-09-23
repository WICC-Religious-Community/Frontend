import { Container, Eyebrow, Figure, Reveal } from '@/components/primitives';
import { SocialLinksRow } from '@/components/layout/social-icons';
import type { Leader } from '@/domain/leadership/model';

/**
 * Homepage introduction to the senior pastor — a face and a voice before the
 * visitor gets to sermons or service times. Two portraits stacked on the
 * diagonal (a second, candid shot behind the primary one) rather than a
 * single boxed headshot; either frame falls back to `Figure`'s own gradient
 * placeholder when a photo hasn't been published yet, so the composition
 * holds up before real photography exists.
 */
export function PastorSpotlight({ leader }: { leader: Leader }) {
  return (
    <Container>
      <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden="true"
              className="from-primary-tint to-highlight/25 absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br opacity-70 blur-2xl"
            />
            <Figure
              src={leader.secondaryPhotoUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 32vw, 70vw"
              className="absolute left-0 top-0 h-[80%] w-[80%] -rotate-6 rounded-3xl shadow-xl"
            />
            <Figure
              src={leader.photoUrl}
              alt={leader.name}
              fill
              sizes="(min-width: 1024px) 32vw, 70vw"
              className="ring-canvas absolute bottom-0 right-0 h-[80%] w-[80%] rotate-3 rounded-3xl shadow-2xl ring-4"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Eyebrow>Meet Our Senior Pastor</Eyebrow>
          <h2 className="font-display text-display-sm sm:text-display-md mt-4 uppercase text-ink">{leader.name}</h2>
          {leader.role ? <p className="text-primary-dark mt-2 text-body-lg font-semibold">{leader.role}</p> : null}
          {leader.bio ? <p className="text-muted mt-6 max-w-prose text-body-lg leading-relaxed text-pretty">{leader.bio}</p> : null}
          <SocialLinksRow links={leader.socialLinks} className="mt-8" />
        </Reveal>
      </div>
    </Container>
  );
}
