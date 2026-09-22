import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './reveal';
import type { ReactNode } from 'react';

export interface IndexListItem {
  id: string;
  href: string;
  title: string;
  meta?: ReactNode;
}

/**
 * A numbered index list — large faint numerals, a title, optional meta —
 * for any "browse these things" section better suited to a scan than a
 * photo grid (locations, a text-forward directory).
 */
export function IndexList({ items }: { items: IndexListItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="border-border border-t">
      {items.map((item, index) => (
        <Reveal key={item.id} delay={index * 0.04}>
          <Link
            href={item.href}
            className="group border-border grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b py-6 sm:grid-cols-[4rem_1fr_auto]"
          >
            <span className="font-display text-heading-md text-subtle group-hover:text-primary-dark font-semibold tabular-nums transition-colors">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>
              <span className="font-display block text-heading-sm font-semibold text-ink">{item.title}</span>
              {item.meta ? <span className="text-muted mt-0.5 block text-body-sm">{item.meta}</span> : null}
            </span>
            <ArrowUpRight className="text-subtle h-5 w-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
