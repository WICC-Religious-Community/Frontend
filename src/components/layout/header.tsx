'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Logo } from './logo';
import { MobileNav } from './mobile-nav';
import { Container } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { MAIN_NAV } from '@/config/site';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils/cn';

const REVEAL_THRESHOLD = 96; // px scrolled before "hide on scroll down" engages
const SOLID_THRESHOLD = 40; // px scrolled before the backdrop starts solidifying

/**
 * The one header, everywhere. Three scroll-driven behaviors, not a static
 * bar with a single breakpoint:
 *  1. On the homepage only, starts fully transparent over the hero (which
 *     pulls itself up underneath it — see `Hero`) and fades in a blurred
 *     black backdrop as the page scrolls, rather than snapping between two
 *     states.
 *  2. Slides out of view on scroll-down past a threshold, slides back in on
 *     scroll-up — the header only takes space when it's wanted.
 *  3. Nav links get a sliding underline on hover/focus; the dropdown panel
 *     animates in rather than toggling visibility.
 */
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === routes.home();
  const reduceMotion = useReducedMotion();

  const [solid, setSolid] = useState(!isHome);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', latest => {
    setSolid(!isHome || latest > SOLID_THRESHOLD);
    const previous = scrollY.getPrevious() ?? 0;
    const scrollingDown = latest > previous;
    setHidden(latest > REVEAL_THRESHOLD && scrollingDown);
  });

  return (
    <motion.header
      animate={{ y: reduceMotion ? 0 : hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="on-dark sticky top-0 z-40"
    >
      {/* Backdrop is a separate layer, faded in by scroll — a smooth blend
          instead of a background-color snapping between two values. */}
      <div
        aria-hidden="true"
        className={cn(
          'bg-dark/95 absolute inset-0 backdrop-blur-md transition-opacity duration-500 ease-out',
          solid ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div className={cn('border-b transition-colors duration-500', solid ? 'border-white/10' : 'border-transparent')} />

      <Container className="relative flex h-18 items-center justify-between gap-6">
        <Logo dark />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {MAIN_NAV.map(group => (
            <NavItem key={group.label} group={group} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden border-white/30 text-on-dark hover:bg-white/10 sm:inline-flex">
            <Link href={routes.visit()}>Plan a Visit</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={routes.give()}>Give</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </motion.header>
  );
}

function NavItem({ group }: { group: (typeof MAIN_NAV)[number] }) {
  const [open, setOpen] = useState(false);

  const linkClass =
    'group/link relative text-muted hover:text-on-dark rounded-full px-3 py-2 text-label font-semibold uppercase tracking-wide transition-colors';
  const underline = (
    <span
      aria-hidden="true"
      className="bg-primary absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/link:scale-x-100"
    />
  );

  if (group.href) {
    return (
      <Link href={group.href} className={linkClass}>
        {group.label}
        {underline}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className={linkClass}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <span className="inline-flex items-center gap-1">
          {group.label}
          <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-300', open && 'rotate-180')} aria-hidden="true" />
        </span>
        {underline}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="border-border bg-surface absolute left-0 top-full w-64 origin-top rounded-lg border p-2 shadow-xl"
          >
            {group.items?.map(item => (
              <Link key={item.href} href={item.href} className="hover:bg-canvas-2 block rounded-md px-3 py-2.5">
                <span className="block text-body-sm font-semibold text-ink">{item.label}</span>
                {item.description ? <span className="text-subtle mt-0.5 block text-caption">{item.description}</span> : null}
              </Link>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
