import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export function Split({
  children,
  reverse = false,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16',
        reverse && 'lg:[&>*:first-child]:order-2',
        className
      )}
    >
      {children}
    </div>
  );
}

export function Grid({
  children,
  columns = 3,
  className,
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid gap-6',
        columns === 2 && 'sm:grid-cols-2',
        columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  );
}
