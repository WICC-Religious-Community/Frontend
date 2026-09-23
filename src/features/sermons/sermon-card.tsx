import Link from 'next/link';
import { Play } from 'lucide-react';
import { Figure } from '@/components/primitives';
import { formatShortDate } from '@/lib/format/date';
import { routes } from '@/config/routes';
import type { Sermon } from '@/domain/sermons/model';

/** The one sermon-thumbnail treatment — sermon library, series pages, and "recent messages" all use this. */
export function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <Link href={routes.sermon(sermon.slug)} className="group block">
      <Figure
        src={sermon.thumbnailUrl}
        alt={sermon.title}
        width={480}
        height={270}
        className="aspect-video"
        imageClassName="group-hover:scale-105"
      />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-display line-clamp-2 text-heading-sm font-semibold text-ink">{sermon.title}</p>
          <p className="text-subtle mt-1 text-caption">
            {sermon.speaker?.name}
            {sermon.speaker?.name ? ' · ' : ''}
            {formatShortDate(sermon.publishedAt)}
          </p>
        </div>
        <span className="bg-primary text-on-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105">
          <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
