import Link from 'next/link';
import { MapPin, Navigation2 } from 'lucide-react';
import { Container } from '@/components/primitives';
import { formatClockTime } from '@/lib/format/date';
import { directionsUrl } from '@/lib/utils/directions';
import type { SiteSettings } from '@/domain/site/model';

const MAX_SERVICES = 3;

/**
 * Service times and venue pinned to the foot of the hero, so a first-time
 * visitor sees when and where before scrolling. Renders only what the church
 * has published — nothing at all if neither times nor an address exist.
 */
export function HeroServiceBar({ settings }: { settings: SiteSettings }) {
  const services = settings.serviceTimes.slice(0, MAX_SERVICES);
  const { address } = settings;
  if (services.length === 0 && !address) return null;

  return (
    <div className="relative border-t border-white/15 bg-black/30 backdrop-blur-md">
      <Container className="flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        {services.length > 0 ? (
          <ul className="flex flex-wrap gap-x-12 gap-y-4">
            {services.map(service => (
              <li key={`${service.label}-${service.dayOfWeek.join()}-${service.opens}`}>
                <p className="text-subtle text-label font-semibold uppercase tracking-wide">{service.label}</p>
                <p className="text-ink mt-1 text-body font-semibold">
                  {service.dayOfWeek.join(' & ')} · {formatClockTime(service.opens)}
                  {service.timezone ? <span className="text-muted font-normal"> {service.timezone}</span> : null}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <span />
        )}

        {address ? (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm">
            <p className="text-muted flex items-center gap-2">
              <MapPin className="text-primary h-4 w-4 shrink-0" aria-hidden="true" />
              {address.streetAddress}, {address.locality}
            </p>
            <Link
              href={directionsUrl(address)}
              target="_blank"
              rel="noreferrer"
              className="text-ink hover:text-primary inline-flex items-center gap-1.5 font-semibold transition-colors"
            >
              <Navigation2 className="h-4 w-4" aria-hidden="true" /> Get directions
            </Link>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
