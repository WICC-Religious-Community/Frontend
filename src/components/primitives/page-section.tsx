import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export type SectionTone = 'surface' | 'canvas' | 'dark' | 'primary';

export const toneClass: Record<SectionTone, string> = {
  surface: 'bg-surface text-ink',
  canvas: 'bg-canvas text-ink',
  dark: 'on-dark bg-dark',
  primary: 'bg-primary text-on-primary',
};

/** The one page shell — every route's `page.tsx` renders exactly one of these at its root. */
export function Page({
  children,
  tone = 'canvas',
  className,
}: {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
}) {
  return (
    <main id="main-content" className={cn('min-h-screen', toneClass[tone], className)}>
      {children}
    </main>
  );
}

export const Section = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'section'> & { tone?: SectionTone; compact?: boolean; flush?: boolean }
>(function Section({ tone = 'surface', compact = false, flush = false, className, ...props }, ref) {
  return (
    <section
      ref={ref}
      className={cn(
        'relative overflow-clip',
        !flush && (compact ? 'py-section-xs' : 'py-section'),
        toneClass[tone],
        className
      )}
      {...props}
    />
  );
});
