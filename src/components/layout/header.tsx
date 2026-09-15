import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Logo } from './logo';
import { MobileNav } from './mobile-nav';
import { Container } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { MAIN_NAV } from '@/config/site';
import { routes } from '@/config/routes';

export function Header() {
  return (
    <header className="border-border bg-surface/95 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {MAIN_NAV.map(group =>
            group.href ? (
              <Link
                key={group.label}
                href={group.href}
                className="text-muted hover:text-ink hover:bg-canvas-2 rounded-md px-3 py-2 text-body-sm font-medium transition-colors"
              >
                {group.label}
              </Link>
            ) : (
              <div key={group.label} className="group relative">
                <button
                  type="button"
                  className="text-muted hover:text-ink hover:bg-canvas-2 flex items-center gap-1 rounded-md px-3 py-2 text-body-sm font-medium transition-colors"
                >
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <div className="border-border bg-surface invisible absolute left-0 top-full w-64 rounded-lg border p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {group.items?.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="hover:bg-canvas-2 block rounded-md px-3 py-2.5"
                    >
                      <span className="block text-body-sm font-semibold text-ink">{item.label}</span>
                      {item.description ? (
                        <span className="text-subtle mt-0.5 block text-caption">{item.description}</span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link href={routes.visit()}>Plan a Visit</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={routes.give()}>Give</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
