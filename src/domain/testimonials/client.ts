'use client';

import { useEffect, useState } from 'react';
import { env } from '@/config/env';
import { liveConnection } from '@/lib/live/source';
import { LiveTopic } from '@/lib/live/topics';
import type { Testimonial } from './model';

/**
 * Live testimonial wall — each SSE message on the `testimonials` topic is one
 * newly-approved testimonial, prepended to the list (capped so the wall
 * doesn't grow unbounded on a long-open tab). Unlike `useLiveTopic` (which
 * replaces the whole value), this topic streams incremental items.
 */
export function useLiveTestimonials(initial: Testimonial[], cap = 24): Testimonial[] {
  const [items, setItems] = useState(initial);

  useEffect(() => {
    if (env.NEXT_PUBLIC_LIVE_TRANSPORT === 'poll') return;
    return liveConnection.subscribe<Testimonial>(LiveTopic.testimonials(), testimonial => {
      setItems(current => [testimonial, ...current.filter(item => item.id !== testimonial.id)].slice(0, cap));
    });
  }, [cap]);

  return items;
}
