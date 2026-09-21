'use client';

import { useEffect, useRef, useState } from 'react';
import { useQueryClient, type QueryKey } from '@tanstack/react-query';
import { env } from '@/config/env';
import { liveConnection } from './source';

export interface UseLiveTopicOptions<T> {
  /** The server-rendered snapshot — shown immediately, before the client subscribes. */
  initial: T;
  /** Used only when `NEXT_PUBLIC_LIVE_TRANSPORT=poll` (SSE unavailable/disabled). */
  poll?: () => Promise<T>;
  pollIntervalMs?: number;
  enabled?: boolean;
}

/**
 * Subscribe a component to one real-time topic. Renders `initial` (the
 * server snapshot) until the client takes over; from then on reflects the
 * latest value pushed on the topic. No-op with JS disabled — `initial` is
 * simply what stays on screen.
 */
export function useLiveTopic<T>(topic: string, options: UseLiveTopicOptions<T>): T {
  const { initial, poll, pollIntervalMs = 15_000, enabled = true } = options;
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    if (!enabled) return;

    if (env.NEXT_PUBLIC_LIVE_TRANSPORT === 'poll') {
      if (!poll) return;
      let cancelled = false;
      const tick = () => poll().then(next => !cancelled && setValue(next)).catch(() => {});
      tick();
      const interval = setInterval(tick, pollIntervalMs);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }

    return liveConnection.subscribe<T>(topic, setValue);
  }, [topic, enabled, poll, pollIntervalMs]);

  return value;
}

/**
 * Patches a TanStack Query cache entry as live events arrive on `topic` —
 * for list/detail views that already read via `useQuery(queryKey)` and
 * should update in place rather than juggling a second piece of state.
 */
export function useLiveQuerySync<T>(topic: string, queryKey: QueryKey, enabled = true) {
  const queryClient = useQueryClient();
  const keyRef = useRef(queryKey);

  useEffect(() => {
    keyRef.current = queryKey;
  }, [queryKey]);

  useEffect(() => {
    if (!enabled || env.NEXT_PUBLIC_LIVE_TRANSPORT === 'poll') return;
    return liveConnection.subscribe<T>(topic, data => {
      queryClient.setQueryData(keyRef.current, data);
    });
  }, [topic, enabled, queryClient]);
}
