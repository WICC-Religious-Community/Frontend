import type { Testimonial } from '@/domain/testimonials/model';

/** Placeholder — see `src/content/sample/README.md`. Not real people. */
export const sampleTestimonials: Testimonial[] = [
  { id: 'testimonial-1', name: 'Sample Member', quote: 'This church has become family to me. I found real community here.', submittedAt: new Date().toISOString() },
  { id: 'testimonial-2', name: 'Another Member', quote: 'I came looking for answers and found a place to belong.', submittedAt: new Date().toISOString() },
  { id: 'testimonial-3', name: 'A Church Member', quote: 'The teaching here has changed how I see my faith and my purpose.', submittedAt: new Date().toISOString() },
];
