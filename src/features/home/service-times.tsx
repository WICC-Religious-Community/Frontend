import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Container, Eyebrow, Reveal, Split } from '@/components/primitives';
import { formatClockTime } from '@/lib/format/date';
import { directionsUrl } from '@/lib/utils/directions';
import type { Address, ServiceTime } from '@/domain/site/model';

/**
 * A two-up editorial split rather than a grid of matching cards: a big
 * standalone display statement on one side, the actual times listed like a
 * program schedule on the other.
 */
export function ServiceTimes({ serviceTimes, address }: { serviceTimes: ServiceTime[]; address?: Address }) {
  return (
    <Container>
      <Split>
        <Reveal>
          <Eyebrow>Join Us</Eyebrow>
          <p className="font-display text-display-md mt-4 font-semibold text-ink text-balance">
            Every week, <span className="text-primary-dark italic">in person</span> and online.
          </p>
          {address ? (
            <>
              <p className="text-muted mt-6 flex items-center gap-2 text-body-sm">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" /> {address.streetAddress},{' '}
                {address.locality}
              </p>
              <Link
                href={directionsUrl(address)}
                target="_blank"
                rel="noreferrer"
                className="text-primary-dark hover:text-primary mt-3 inline-flex items-center gap-1.5 text-body-sm font-semibold transition-colors"
              >
                Get directions <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </>
          ) : null}
        </Reveal>

        <Reveal delay={0.08}>
          <ol className="border-border divide-border divide-y border-y">
            {serviceTimes.map(service => (
              <li key={service.label} className="flex items-baseline justify-between gap-4 py-5">
                <div>
                  <p className="font-display text-heading-md font-semibold text-ink">{service.label}</p>
                  <p className="text-subtle mt-1 text-body-sm">{service.dayOfWeek.join(' & ')}</p>
                </div>
                <p className="text-primary-dark shrink-0 text-body-lg font-semibold tabular-nums">
                  {formatClockTime(service.opens)}
                  {service.closes ? (
                    <span className="text-muted font-normal"> – {formatClockTime(service.closes)}</span>
                  ) : null}
                  {service.timezone ? <span className="text-subtle font-normal"> {service.timezone}</span> : null}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Split>
    </Container>
  );
}
