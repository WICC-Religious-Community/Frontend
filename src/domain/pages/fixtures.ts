import type { CmsPage } from './model';

/** Sample admin-composed landing page — demonstrates `<BlockRenderer>` end to end. */
export const cmsPageFixture: CmsPage = {
  slug: 'foundation-class',
  title: 'Foundation Class',
  description: 'Everything you need to know before your first Foundation Class.',
  blocks: [
    {
      type: 'hero',
      data: {
        eyebrow: 'New Here?',
        title: 'Start Your Foundation',
        description: 'A four-week class covering who we are, what we believe, and how to grow.',
      },
    },
    {
      type: 'richText',
      data: {
        html: '<p>Foundation Class runs every quarter and is the first step to membership at WICC. Across four sessions you\'ll learn our story, our beliefs, and how to plug into church life.</p>',
      },
    },
    {
      type: 'faq',
      data: {
        items: [
          { question: 'How long is the class?', answer: 'Four sessions, about 90 minutes each.' },
          { question: 'Do I need to register?', answer: 'Yes — register at the welcome desk or online.' },
        ],
      },
    },
    {
      type: 'ctaBanner',
      data: { title: 'Ready to begin?', ctaLabel: 'Register Now', ctaHref: '/events/foundation-class' },
    },
  ],
};
