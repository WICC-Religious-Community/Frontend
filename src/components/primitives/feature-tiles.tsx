import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './reveal';
import { Eyebrow } from './typography';
import { Figure } from './figure';
import { cn } from '@/lib/utils/cn';

export interface FeatureTileItem {
  id: string;
  href: string;
  title: string;
  /** Small caps label above the title, e.g. "Who We Are". */
  label?: string;
  summary?: string;
  imageUrl?: string;
  /** e.g. "Learn More", "Sign Up" — defaults to "Learn More". */
  cta?: string;
}

/**
 * Tall, full-bleed image tiles — label + title pinned top, a "Learn More"
 * link pinned bottom, photo filling the rest — the one "browse these
 * things" treatment for ministries and anywhere else a photo-led list beats
 * a bordered card grid. The first tile can run larger for one clear entry point.
 */
export function FeatureTiles({ items, featureFirst = false }: { items: FeatureTileItem[]; featureFirst?: boolean }) {
  if (items.length === 0) return null;

  return (
    <div className="grid auto-rows-[24rem] grid-cols-1 gap-4 sm:auto-rows-[28rem] sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Reveal key={item.id} className={cn(featureFirst && index === 0 && 'sm:col-span-2 lg:row-span-2')} delay={index * 0.04}>
          <Link href={item.href} className="group relative flex h-full flex-col overflow-hidden rounded-lg">
            <Figure
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 100vw"
              className="absolute inset-0 h-full rounded-none"
              imageClassName="group-hover:scale-105"
            />
            <div className="from-dark/80 absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent" aria-hidden="true" />
            <div className="from-dark/90 absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent" aria-hidden="true" />
            <div className="relative p-5">
              {item.label ? <Eyebrow className="text-white/80">{item.label}</Eyebrow> : null}
              <h3 className={cn('font-sans text-heading-md font-bold text-white', item.label && 'mt-1')}>{item.title}</h3>
            </div>
            <div className="relative mt-auto flex items-end justify-between gap-3 p-5">
              {item.summary ? <p className="line-clamp-2 max-w-sm text-body-sm text-white/75">{item.summary}</p> : <span />}
              <span className="inline-flex shrink-0 items-center gap-1.5 text-label font-semibold uppercase tracking-wide text-white">
                {item.cta ?? 'Learn More'}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
