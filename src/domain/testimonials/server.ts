import { apiClient } from '@/lib/api/client';
import { whenConfigured } from '@/lib/api/fallback';
import { sampleTestimonials } from '@/content/sample';
import { toTestimonialList } from './mappers';
import type { Testimonial } from './model';

export async function getTestimonials(limit = 10): Promise<Testimonial[]> {
  return whenConfigured(sampleTestimonials.slice(0, limit), async () => {
    const { data } = await apiClient.GET('/testimonials', {
      params: { query: { limit } },
      next: { tags: ['testimonials'], revalidate: 120 },
    });
    return toTestimonialList(data);
  });
}
