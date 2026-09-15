import Link from 'next/link';
import { Play, ArrowRight } from 'lucide-react';
import { Container, Figure, Reveal, SectionHeader } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { formatShortDate } from '@/lib/format/date';
import { routes } from '@/config/routes';
import type { Sermon } from '@/domain/sermons/model';

export function SermonSpotlight({ sermons }: { sermons: Sermon[] }) {
  return (
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader eyebrow="Watch & Listen" title="Recent messages" size="sm" />
        <Button asChild variant="link">
          <Link href={routes.sermons()}>
            Browse all sermons <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sermons.map((sermon, index) => (
          <Reveal key={sermon.id} delay={index * 0.06}>
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
                  <p className="font-display line-clamp-2 text-heading-sm font-semibold text-ink">
                    {sermon.title}
                  </p>
                  <p className="text-subtle mt-1 text-caption">
                    {sermon.speaker?.name} · {formatShortDate(sermon.publishedAt)}
                  </p>
                </div>
                <span className="bg-primary text-on-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
