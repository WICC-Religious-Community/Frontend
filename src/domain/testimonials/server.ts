import { apiClient } from '@/lib/api/client';
import { toTestimonialList } from './mappers';
import type { Testimonial } from './model';

export async function getTestimonials(limit = 10): Promise<Testimonial[]> {
  const { data } = await apiClient.GET('/testimonials', {
    params: { query: { limit } },
    next: { tags: ['testimonials'], revalidate: 120 },
  });
  return toTestimonialList(data);
}
