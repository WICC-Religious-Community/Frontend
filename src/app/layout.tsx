import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import { fontVariables } from '@/styles/fonts';
import { SiteShell } from '@/components/layout/site-shell';
import { QueryProvider } from '@/lib/query/provider';
import { MockingProvider } from '@/lib/query/mocking-provider';
import { getSiteSettings } from '@/domain/site/server';
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/seo/jsonld';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  ...buildPageMetadata({ title: SITE.name, description: SITE.description, path: '/' }),
  title: { default: SITE.name, template: `%s — ${SITE.name}` },
  metadataBase: new URL(SITE.url),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const organizationSchema = buildOrganizationSchema({
    name: settings.name,
    description: settings.description,
    logoUrl: settings.logoUrl,
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
    sameAs: Object.values(settings.socialLinks).filter((value): value is string => Boolean(value)),
    serviceTimes: settings.serviceTimes.map(service => ({
      dayOfWeek: service.dayOfWeek,
      opens: service.opens,
      closes: service.closes ?? service.opens,
      description: service.label,
    })),
  });

  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-screen antialiased">
        <JsonLd data={organizationSchema} />
        <JsonLd data={buildWebSiteSchema()} />
        <MockingProvider>
          <QueryProvider>
            <SiteShell settings={settings}>{children}</SiteShell>
            <Toaster position="top-center" richColors closeButton />
          </QueryProvider>
        </MockingProvider>
      </body>
    </html>
  );
}
