import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE, SOCIAL_LINKS } from "@/config/site";
import { JsonLd } from "@/components/seo/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/jsonld";
import { getSiteSettings } from "@/domain/site/server";
import type { SiteSettings } from "@/domain/site/model";
import { QueryProvider } from "@/lib/query/provider";
import { MockingProvider } from "@/lib/query/mocking-provider";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
};

/** Used only if the backend is unreachable when the layout renders — keeps the shell up. */
const FALLBACK_SITE_SETTINGS: SiteSettings = {
  name: SITE.name,
  description: SITE.description,
  socialLinks: SOCIAL_LINKS,
  serviceTimes: [],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings().catch(() => FALLBACK_SITE_SETTINGS);
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema} />
        <QueryProvider>
          <MockingProvider>
            <AnnouncementBar announcement={settings.announcement} />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer settings={settings} />
          </MockingProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
