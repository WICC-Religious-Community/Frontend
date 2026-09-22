import type { Testimonial } from '@/domain/testimonials/model';
import { unsplash } from './media';

/** Placeholder — see `src/content/sample/README.md`. Not real people. */
export const sampleTestimonials: Testimonial[] = [
  { id: 'testimonial-1', name: 'Sample Member', quote: 'This church has become family to me. I found real community here.', photoUrl: unsplash('1500648767791-00dcc994a43e', 200), submittedAt: new Date().toISOString() },
  { id: 'testimonial-2', name: 'Another Member', quote: 'I came looking for answers and found a place to belong.', photoUrl: unsplash('1506863530036-1efeddceb993', 200), submittedAt: new Date().toISOString() },
  { id: 'testimonial-3', name: 'A Church Member', quote: 'The teaching here has changed how I see my faith and my purpose.', photoUrl: unsplash('1507003211169-0a1dd7228f2d', 200), submittedAt: new Date().toISOString() },
];
