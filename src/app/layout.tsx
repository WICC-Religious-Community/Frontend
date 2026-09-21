import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LEGAL_NAV, SITE } from "@/config/site";
import { JsonLd } from "@/components/seo/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/jsonld";
import { getSiteSettings, MINIMAL_SETTINGS } from "@/domain/site/server";
import { getPage } from "@/domain/pages/server";
import { QueryProvider } from "@/lib/query/provider";
import { SiteShell } from "@/components/layout/site-shell";

// Self-hosted (latin subset) so builds and dev never depend on reaching
// Google Fonts. The variable names are the ones `globals.css` reads: a warm
// display serif for headings, a grotesk sans for everything else.
const body = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
});

const display = localFont({
  src: [
    { path: "./fonts/Fraunces-Variable.woff2", weight: "400 700", style: "normal" },
    { path: "./fonts/Fraunces-Italic-Variable.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-display-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The shell is shared by every page (including error pages), so a settings
  // outage degrades the chrome to just the church's name instead of taking
  // the whole site down. The failure is still logged.
  const settings = await getSiteSettings().catch(error => {
    console.error('Failed to load site settings', error);
    return MINIMAL_SETTINGS;
  });
  // Legal links only appear once the church has actually published those pages.
  const legalLinks = (
    await Promise.all(LEGAL_NAV.map(async item => ((await getPage(item.href.slice(1))) ? item : null)))
  ).filter((item): item is (typeof LEGAL_NAV)[number] => item !== null);
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
    <html
      lang="en"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema} />
        <QueryProvider>
          <SiteShell settings={settings} legalLinks={legalLinks}>
            {children}
          </SiteShell>
        </QueryProvider>
      </body>
    </html>
  );
}
