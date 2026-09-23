import type { ReactNode } from 'react';
import { Eyebrow } from './typography';
import { cn } from '@/lib/utils/cn';

/**
 * The one page-header treatment: left-aligned, large, with a closing rule —
 * an editorial masthead, not a centered marketing-template title. Every
 * `page.tsx` that needs a title uses this instead of a bare `SectionHeader`.
 */
export function PageMasthead({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('border-border flex flex-wrap items-end justify-between gap-6 border-b pb-8', className)}>
      <div>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className={cn('font-display text-display-md sm:text-display-lg uppercase text-ink text-balance', eyebrow && 'mt-4')}>
          {title}
        </h1>
        {description ? <p className="text-muted mt-4 max-w-xl text-body-lg text-pretty">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
