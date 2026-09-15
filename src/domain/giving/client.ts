'use client';

import { LiveTopic } from '@/lib/live/topics';
import { useLiveTopic } from '@/lib/live/use-live';
import type { GivingCampaign } from './model';

/**
 * Live campaign total — wired but **disabled by default** (`live = false`)
 * per the product decision to ship giving as fresh-on-load first. Flip
 * `live` to `true` once the backend actually streams this topic.
 */
export function useGivingCampaign(initial: GivingCampaign, live = false): GivingCampaign {
  return useLiveTopic<GivingCampaign>(LiveTopic.givingCampaign(initial.id), {
    initial,
    enabled: live,
  });
}
