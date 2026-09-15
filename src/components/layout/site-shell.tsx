import { AnnouncementBar } from './announcement-bar';
import { Header } from './header';
import { Footer } from './footer';
import type { SiteSettings } from '@/domain/site/model';
import type { ReactNode } from 'react';

/** The chrome every marketing page shares — one place to change header/footer for the whole site. */
export function SiteShell({ settings, children }: { settings: SiteSettings; children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="bg-primary text-on-primary fixed left-4 top-4 z-50 -translate-y-20 rounded-md px-4 py-2 text-body-sm font-semibold transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <AnnouncementBar announcement={settings.announcement} />
      <Header />
      <div id="main-content">{children}</div>
      <Footer settings={settings} />
    </>
  );
}
