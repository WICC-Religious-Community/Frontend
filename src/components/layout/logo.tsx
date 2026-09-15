import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        'font-display text-heading-md font-bold tracking-tight',
        dark ? 'text-on-dark' : 'text-ink',
        className
      )}
    >
      WICC
    </Link>
  );
}
