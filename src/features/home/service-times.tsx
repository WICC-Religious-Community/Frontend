import { Clock, MapPin } from 'lucide-react';
import { Container, Reveal, SectionHeader } from '@/components/primitives';
import type { ServiceTime } from '@/domain/site/model';

export function ServiceTimes({
  serviceTimes,
  venue,
}: {
  serviceTimes: ServiceTime[];
  venue?: string;
}) {
  return (
    <Container>
      <SectionHeader eyebrow="Join Us" title="Service Times" size="sm" align="center" />
      <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        {serviceTimes.map((service, index) => (
          <Reveal key={service.label} delay={index * 0.05}>
            <div className="border-border bg-surface flex items-start gap-4 rounded-lg border p-6">
              <Clock className="text-primary-dark mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-display text-heading-sm font-semibold text-ink">{service.label}</p>
                <p className="text-muted mt-1 text-body-sm">
                  {service.dayOfWeek.join(' & ')} · {service.opens}
                  {service.closes ? `–${service.closes}` : ''}
                  {service.timezone ? ` ${service.timezone}` : ''}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {venue ? (
        <p className="text-muted mt-8 flex items-center justify-center gap-2 text-body-sm">
          <MapPin className="h-4 w-4" aria-hidden="true" /> {venue}
        </p>
      ) : null}
    </Container>
  );
}
