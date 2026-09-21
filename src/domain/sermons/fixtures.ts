import type { Sermon, SermonSeries } from './model';

export const speakersFixture = [
  { id: 'spk_1', name: 'Pastor Daniel Adeyemi', photoUrl: undefined },
  { id: 'spk_2', name: 'Pastor Grace Adeyemi', photoUrl: undefined },
  { id: 'spk_3', name: 'Minister Tolu Bankole', photoUrl: undefined },
];

export const sermonSeriesFixture: SermonSeries[] = [
  { id: 'ser_1', slug: 'rooted', title: 'Rooted', description: 'A study on staying grounded in faith through every season.', sermonCount: 4 },
  { id: 'ser_2', slug: 'kingdom-mindset', title: 'Kingdom Mindset', description: 'Renewing how we think so we can live differently.', sermonCount: 3 },
  { id: 'ser_3', slug: 'faith-that-works', title: 'Faith That Works', description: 'Practical faith for everyday life.', sermonCount: 5 },
];

const topics = ['Faith', 'Family', 'Purpose', 'Prayer', 'Grace', 'Community'];
const scriptures = ['John 15:1-8', 'Romans 12:2', 'James 2:14-26', 'Philippians 4:6-7', 'Colossians 3:1-4'];

export const sermonsFixture: Sermon[] = Array.from({ length: 24 }, (_, index) => {
  const series = sermonSeriesFixture[index % sermonSeriesFixture.length];
  const speaker = speakersFixture[index % speakersFixture.length];
  const daysAgo = index * 7;
  const publishedAt = new Date(Date.now() - daysAgo * 86_400_000).toISOString();
  return {
    id: `srm_${index + 1}`,
    slug: `${series.slug}-part-${(index % series.sermonCount!) + 1}`,
    title: `${series.title} — Part ${(index % series.sermonCount!) + 1}`,
    description:
      'A message on walking out God’s word in everyday life, with practical steps for the week ahead.',
    speaker,
    series,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: undefined,
    publishedAt,
    durationSeconds: 2400 + index * 15,
    scripture: [scriptures[index % scriptures.length]],
    topics: [topics[index % topics.length], topics[(index + 2) % topics.length]],
  };
});
