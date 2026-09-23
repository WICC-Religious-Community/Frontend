import type { CmsPage } from '@/domain/pages/model';

/**
 * Placeholder — see `src/content/sample/README.md`. Deliberately broad,
 * non-denominational language — never presented as WICC's actual doctrinal
 * position. Replace via the real CMS before this is shown publicly.
 */
export const samplePages: Record<string, CmsPage> = {
  'what-we-believe': {
    slug: 'what-we-believe',
    title: 'What We Believe',
    description: 'Placeholder — replace with the church’s real statement of belief.',
    blocks: [
      {
        type: 'scriptureQuote',
        data: { text: 'For God so loved the world that he gave his one and only Son.', reference: 'John 3:16' },
      },
      {
        type: 'cardGrid',
        data: {
          title: 'Our Convictions',
          items: [
            { title: 'The Scriptures', body: 'Placeholder — the church’s view of Scripture goes here.' },
            { title: 'God', body: 'Placeholder — the church’s view of God goes here.' },
            { title: 'Salvation', body: 'Placeholder — the church’s view of salvation goes here.' },
            { title: 'The Church', body: 'Placeholder — the church’s view of the church goes here.' },
          ],
        },
      },
      {
        type: 'richText',
        data: {
          html: '<p>This page is placeholder content generated for design review. Replace it with the church’s real statement of belief via the CMS.</p>',
        },
      },
    ],
  },
  'plan-a-visit': {
    slug: 'plan-a-visit',
    title: 'What to Expect',
    blocks: [
      {
        type: 'cardGrid',
        data: {
          title: 'What to Expect',
          items: [
            { title: 'Warm Welcome', body: 'Placeholder — describe how first-time visitors are greeted.' },
            { title: 'Come As You Are', body: 'Placeholder — describe the dress code, if any.' },
            { title: 'Kids Welcome', body: 'Placeholder — describe children’s programming.' },
          ],
        },
      },
    ],
  },
};
