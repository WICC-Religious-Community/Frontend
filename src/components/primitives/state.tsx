import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border-border bg-surface flex min-h-64 flex-col items-center justify-center rounded-lg border px-6 py-14 text-center',
        className
      )}
    >
      <span className="bg-primary mb-6 h-px w-10" aria-hidden="true" />
      <h3 className="font-display text-heading-md font-semibold text-ink">{title}</h3>
      {description ? <p className="text-muted mt-3 max-w-md text-body">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
