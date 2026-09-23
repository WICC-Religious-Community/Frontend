import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { Container, Eyebrow, Figure, Reveal } from '@/components/primitives';
import { formatShortDate } from '@/lib/format/date';
import { routes } from '@/config/routes';
import type { Sermon } from '@/domain/sermons/model';

/**
 * One large featured message plus a compact rail of the others — a single
 * clear focal point instead of N identical cards competing for attention.
 */
export function SermonSpotlight({ sermons }: { sermons: Sermon[] }) {
  const [featured, ...rest] = sermons;
  if (!featured) return null;

  return (
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Eyebrow>Watch &amp; Listen</Eyebrow>
        <Link
          href={routes.sermons()}
          className="text-ink hover:text-primary-dark inline-flex items-center gap-1.5 text-body-sm font-semibold transition-colors"
        >
          Browse all sermons <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <Reveal>
          <Link href={routes.sermon(featured.slug)} className="group block">
            <Figure
              src={featured.thumbnailUrl}
              alt={featured.title}
              width={960}
              height={540}
              className="aspect-video"
              imageClassName="group-hover:scale-105"
            />
            <div className="mt-6 flex items-start gap-4">
              <span className="bg-primary text-on-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105">
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-display-sm font-semibold text-ink">{featured.title}</p>
                <p className="text-muted mt-1.5 text-body-sm">
                  {featured.speaker?.name}
                  {featured.speaker?.name ? ' · ' : ''}
                  {formatShortDate(featured.publishedAt)}
                </p>
              </div>
            </div>
          </Link>
        </Reveal>

        {rest.length > 0 ? (
          <Reveal delay={0.1}>
            <ol className="border-border divide-border divide-y border-t">
              {rest.map(sermon => (
                <li key={sermon.id}>
                  <Link href={routes.sermon(sermon.slug)} className="group flex items-center gap-4 py-5">
                    <Figure
                      src={sermon.thumbnailUrl}
                      alt=""
                      width={112}
                      height={112}
                      className="aspect-square w-20 shrink-0 sm:w-24"
                    />
                    <div className="min-w-0">
                      <p className="font-display group-hover:text-primary-dark line-clamp-2 text-body-lg font-semibold text-ink transition-colors">
                        {sermon.title}
                      </p>
                      <p className="text-subtle mt-1 text-caption">
                        {sermon.speaker?.name}
                        {sermon.speaker?.name ? ' · ' : ''}
                        {formatShortDate(sermon.publishedAt)}
                      </p>
                    </div>
                    <ArrowUpRight className="text-subtle ml-auto h-4 w-4 shrink-0 self-start opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        ) : null}
      </div>
    </Container>
  );
}
