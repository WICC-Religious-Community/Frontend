import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Facebook, Instagram, Youtube } from './social-icons';
import { Logo } from './logo';
import { Container } from '@/components/primitives';
import { FOOTER_NAV, SITE, type NavItem } from '@/config/site';
import type { SiteSettings } from '@/domain/site/model';

const socialIcons = { facebook: Facebook, instagram: Instagram, youtube: Youtube } as const;

export function Footer({ settings, legalLinks }: { settings: SiteSettings; legalLinks: NavItem[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-dark">
      <Container className="py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo dark />
            <p className="text-muted mt-4 max-w-sm text-body-sm leading-relaxed">{settings.description}</p>
            <div className="mt-6 space-y-2 text-body-sm">
              {settings.address ? (
                <p className="text-muted flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {settings.address.streetAddress}, {settings.address.locality}
                </p>
              ) : null}
              {settings.phone ? (
                <a href={`tel:${settings.phone}`} className="text-muted hover:text-on-dark flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {settings.phone}
                </a>
              ) : null}
              {settings.email ? (
                <a href={`mailto:${settings.email}`} className="text-muted hover:text-on-dark flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {settings.email}
                </a>
              ) : null}
            </div>
            <div className="mt-6 flex gap-3">
              {(Object.keys(socialIcons) as (keyof typeof socialIcons)[]).map(key => {
                const href = settings.socialLinks[key];
                if (!href) return null;
                const Icon = socialIcons[key];
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={key}
                    className="border-border bg-surface text-muted hover:text-on-dark hover:border-primary flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_NAV.map(group => (
              <div key={group.label}>
                <p className="text-subtle text-label font-semibold uppercase tracking-wide">{group.label}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.items?.map(item => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-muted hover:text-on-dark text-body-sm transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 text-caption text-subtle sm:flex-row">
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
