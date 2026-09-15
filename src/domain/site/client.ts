'use client';

import { apiClient } from '@/lib/api/client';
import { LiveTopic } from '@/lib/live/topics';
import { useLiveTopic } from '@/lib/live/use-live';
import { toServiceStatus } from './mappers';
import type { ServiceStatus } from './model';

/**
 * Live-updating service status — server-rendered `initial` shown immediately,
 * then kept current over SSE (or polling, per `NEXT_PUBLIC_LIVE_TRANSPORT`).
 */
export function useServiceStatus(initial: ServiceStatus): ServiceStatus {
  return useLiveTopic<ServiceStatus>(LiveTopic.serviceStatus(), {
    initial,
    poll: async () => {
      const { data } = await apiClient.GET('/service-status');
      return toServiceStatus(data);
    },
  });
}
