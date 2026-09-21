import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Container, Page, SectionHeader } from '@/components/primitives';
import { ContactForm } from '@/features/contact/contact-form';
import { getSiteSettings } from '@/domain/site/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact',
  description: 'Get in touch with WICC.',
  path: routes.contact(),
});

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <Page>
      <Container className="py-section">
        <SectionHeader eyebrow="Get in Touch" title="Contact Us" size="lg" />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {settings.address ? (
              <p className="flex items-start gap-3 text-body-sm text-ink">
                <MapPin className="text-primary-dark mt-0.5 h-5 w-5 shrink-0" />
                {settings.address.streetAddress}, {settings.address.locality}
              </p>
            ) : null}
            {settings.phone ? (
              <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-body-sm text-ink">
                <Phone className="text-primary-dark h-5 w-5 shrink-0" /> {settings.phone}
              </a>
            ) : null}
            {settings.email ? (
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-body-sm text-ink">
                <Mail className="text-primary-dark h-5 w-5 shrink-0" /> {settings.email}
              </a>
            ) : null}
          </div>
          <ContactForm />
        </div>
      </Container>
    </Page>
  );
}
