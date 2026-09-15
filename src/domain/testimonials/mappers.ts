import { z } from 'zod';
import type { Testimonial } from './model';

const testimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  photoUrl: z.string().optional(),
  quote: z.string(),
  submittedAt: z.string(),
});

export function toTestimonial(dto: unknown): Testimonial {
  return testimonialSchema.parse(dto);
}

export function toTestimonialList(dto: unknown): Testimonial[] {
  return z.array(testimonialSchema).parse(dto);
}
