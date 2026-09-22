'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { Calendar, ChevronDown, Heart } from 'lucide-react';
import { Logo } from './logo';
import { MobileNav } from './mobile-nav';
import { Container } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { MAIN_NAV } from '@/config/site';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils/cn';

const REVEAL_THRESHOLD = 96; // px scrolled before "hide on scroll down" engages
const SOLID_THRESHOLD = 40; // px scrolled before the backdrop/nav start appearing

/**
 * The one header, everywhere. Scroll-driven, not a static bar with a single
 * breakpoint:
 *  1. On the homepage only, starts fully transparent over the hero (which
 *     pulls itself up underneath it — see `Hero`) with the nav links
 *     hidden — just the mark and the two CTAs over the photo/video. Past
 *     ~40px both the frosted-glass backdrop and the nav links fade in
 *     together, rather than everything being visible against a transparent
 *     backdrop from the first frame.
 *  2. Slides out of view on scroll-down past a threshold, slides back in on
 *     scroll-up.
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
      {/* A frosted-glass backdrop, faded in by scroll — stays translucent
          even once "solid" rather than going opaque, so the header never
          fully blocks whatever is behind it. */}
      <div
        aria-hidden="true"
        className={cn(
          'bg-dark/50 absolute inset-0 backdrop-blur-xl transition-opacity duration-500 ease-out',
          solid ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div className={cn('border-b transition-colors duration-500', solid ? 'border-white/10' : 'border-transparent')} />

      <Container className="relative flex h-18 items-center justify-between gap-6">
        <Logo />

        <motion.nav
          aria-label="Primary"
          initial={false}
          animate={{ opacity: solid || reduceMotion ? 1 : 0, y: solid || reduceMotion ? 0 : -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          // Hidden (not just visually faded) until solid — keeps invisible
          // links out of the tab order for keyboard users at the very top
          // of the homepage, rather than merely un-clickable.
          inert={!solid}
          className="hidden items-center gap-1 lg:flex"
        >
          {MAIN_NAV.map(group => (
            <NavItem key={group.label} group={group} />
          ))}
        </motion.nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden border-white/25 bg-white/10 text-on-dark backdrop-blur-md transition-[background-color,border-color] hover:border-white/40 hover:bg-white/20 sm:inline-flex"
          >
            <Link href={routes.visit()}>
              <Calendar aria-hidden="true" className="h-4 w-4" />
              Plan a Visit
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href={routes.give()}>
              <Heart aria-hidden="true" className="h-4 w-4" />
              Give
            </Link>
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
    'group/link relative text-on-dark/70 hover:text-on-dark rounded-full px-3 py-2 text-caption font-bold uppercase tracking-wide transition-colors';
  const underline = (
    <span
      aria-hidden="true"
      className="bg-primary absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/link:scale-x-100"
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
