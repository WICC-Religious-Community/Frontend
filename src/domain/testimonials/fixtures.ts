import type { Testimonial } from './model';

export const testimonialsFixture: Testimonial[] = [
  {
    id: 'tst_1',
    name: 'Adaeze O.',
    quote: 'WICC became family to me from the very first Sunday. I found healing, purpose, and real friendships here.',
    submittedAt: new Date(Date.now() - 2 * 86_400_000).toISOString(),
  },
  {
    id: 'tst_2',
    name: 'Emeka U.',
    quote: 'The teaching here changed how I see God and how I see myself. I am not the same person I was two years ago.',
    submittedAt: new Date(Date.now() - 9 * 86_400_000).toISOString(),
  },
  {
    id: 'tst_3',
    name: 'Blessing A.',
    quote: 'From the children\'s ministry to the women\'s fellowship, my whole family has grown in faith together.',
    submittedAt: new Date(Date.now() - 18 * 86_400_000).toISOString(),
  },
];
