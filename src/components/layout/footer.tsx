import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { SocialLinksRow } from './social-icons';
import { Logo } from './logo';
import { Container } from '@/components/primitives';
import { FOOTER_NAV, SITE, type NavItem } from '@/config/site';
import { formatClockTime } from '@/lib/format/date';
import type { SiteSettings } from '@/domain/site/model';

/**
 * The one footer, everywhere. A brand column (mark, description, contact,
 * socials), the nav columns, an optional service-time strip when the church
 * has published times, and a full-bleed legal-name wordmark as a quiet
 * signature — the same "considered, not default" treatment as the header
 * and hero rather than a plain link dump.
 */
export function Footer({ settings, legalLinks }: { settings: SiteSettings; legalLinks: NavItem[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-[radial-gradient(60%_50%_at_15%_0%,var(--color-primary-tint-strong),transparent_65%)] absolute inset-0"
      />

      <Container className="relative py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.6fr_0.9fr]">
          <div>
            <Logo />
            <p className="text-muted mt-4 max-w-sm text-body-sm leading-relaxed">{settings.description}</p>
            <div className="mt-6 space-y-3 text-body-sm">
              {settings.address ? (
                <p className="text-muted flex items-start gap-3">
                  <span className="border-border bg-surface flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="pt-1.5">
                    {settings.address.streetAddress}, {settings.address.locality}
                  </span>
                </p>
              ) : null}
              {settings.phone ? (
                <a href={`tel:${settings.phone}`} className="text-muted hover:text-on-dark flex items-center gap-3 transition-colors">
                  <span className="border-border bg-surface flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {settings.phone}
                </a>
              ) : null}
              {settings.email ? (
                <a href={`mailto:${settings.email}`} className="text-muted hover:text-on-dark flex items-center gap-3 transition-colors">
                  <span className="border-border bg-surface flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {settings.email}
                </a>
              ) : null}
            </div>
            <SocialLinksRow links={settings.socialLinks} className="mt-7" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_NAV.map(group => (
              <div key={group.label}>
                <p className="text-subtle text-label font-semibold uppercase tracking-wide">{group.label}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.items?.map(item => (
                    <li key={item.href}>
                      <Link href={item.href} className="group/link text-muted hover:text-on-dark relative text-body-sm transition-colors">
                        {item.label}
                        <span
                          aria-hidden="true"
                          className="bg-primary absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/link:scale-x-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {settings.serviceTimes.length > 0 ? (
            <div>
              <p className="text-subtle text-label font-semibold uppercase tracking-wide">Service Times</p>
              <ul className="mt-4 space-y-3.5">
                {settings.serviceTimes.map(service => (
                  <li key={service.label}>
                    <p className="text-on-dark text-body-sm font-semibold">{service.label}</p>
                    <p className="text-muted mt-0.5 text-caption">
                      {service.dayOfWeek.join(' & ')} · {formatClockTime(service.opens)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <p
          aria-hidden="true"
          className="font-display text-on-dark/[0.06] mt-16 select-none text-center text-[clamp(2.5rem,10vw,7rem)] uppercase leading-none text-balance"
        >
          {SITE.legalName}
        </p>

        <div className="border-border mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 text-caption text-subtle sm:flex-row">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {legalLinks.map(item => (
              <Link key={item.href} href={item.href} className="hover:text-on-dark transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
