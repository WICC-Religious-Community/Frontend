import type { Sermon, SermonSeries } from '@/domain/sermons/model';

/** Placeholder — see `src/content/sample/README.md`. */
export const sampleSermonSeries: SermonSeries[] = [
  { id: 'series-1', slug: 'foundations', title: 'Foundations', description: 'A series on the basics of faith.', sermonCount: 4 },
  { id: 'series-2', slug: 'walking-in-faith', title: 'Walking in Faith', description: 'Trusting God through every season.', sermonCount: 3 },
];

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

/** Placeholder — see `src/content/sample/README.md`. */
export const sampleSermons: Sermon[] = [
  {
    id: 'sermon-1',
    slug: 'walking-in-faith-pt-1',
    title: 'Walking in Faith, Part 1',
    description: 'The first step of faith is often the hardest — and the most important.',
    speaker: { id: 'speaker-1', name: 'Sample Speaker' },
    series: sampleSermonSeries[1],
    publishedAt: daysAgo(2),
    scripture: ['Hebrews 11:1'],
    topics: ['Faith', 'Trust'],
  },
  {
    id: 'sermon-2',
    slug: 'the-power-of-community',
    title: 'The Power of Community',
    description: 'We were never meant to walk through life alone.',
    speaker: { id: 'speaker-2', name: 'Sample Speaker Two' },
    publishedAt: daysAgo(9),
    scripture: ['Ecclesiastes 4:9-12'],
    topics: ['Community'],
  },
  {
    id: 'sermon-3',
    slug: 'grace-that-transforms',
    title: 'Grace That Transforms',
    description: 'Grace is not just a gift we receive once — it is what changes us daily.',
    speaker: { id: 'speaker-1', name: 'Sample Speaker' },
    series: sampleSermonSeries[0],
    publishedAt: daysAgo(16),
    scripture: ['Ephesians 2:8-9'],
    topics: ['Grace'],
  },
  {
    id: 'sermon-4',
    slug: 'a-life-of-purpose',
    title: 'A Life of Purpose',
    description: 'Discovering what you were made for.',
    speaker: { id: 'speaker-2', name: 'Sample Speaker Two' },
    series: sampleSermonSeries[0],
    publishedAt: daysAgo(23),
    scripture: ['Jeremiah 29:11'],
    topics: ['Purpose'],
  },
];
