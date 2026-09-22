import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './reveal';
import { Figure } from './figure';
import { cn } from '@/lib/utils/cn';

export interface FeatureTileItem {
  id: string;
  href: string;
  title: string;
  summary?: string;
  imageUrl?: string;
}

/**
 * Full-bleed image tiles with the title overlaid on a gradient scrim — the
 * one "browse these things" treatment for ministries, and anywhere else a
 * photo-led list beats a bordered card grid. The first tile can run larger
 * to give the section one clear entry point.
 */
export function FeatureTiles({ items, featureFirst = false }: { items: FeatureTileItem[]; featureFirst?: boolean }) {
  if (items.length === 0) return null;

  return (
    <div className="grid auto-rows-[18rem] grid-cols-1 gap-4 sm:auto-rows-[22rem] sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <Reveal key={item.id} className={cn(featureFirst && index === 0 && 'sm:col-span-2 lg:row-span-2')} delay={index * 0.04}>
          <Link href={item.href} className="group relative block h-full overflow-hidden rounded-lg">
            <Figure src={item.imageUrl} alt={item.title} fill className="h-full" imageClassName="group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <div>
                <h3 className="font-display text-heading-md font-semibold text-white">{item.title}</h3>
                {item.summary ? <p className="mt-1 line-clamp-2 max-w-sm text-body-sm text-white/75">{item.summary}</p> : null}
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
