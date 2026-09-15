'use client';

import { useEffect, type ReactNode } from 'react';
import { env } from '@/config/env';

/**
 * Starts the MSW browser worker in mock mode as a side effect — never gates
 * rendering on it. The server already delivered real (mocked) data via RSC
 * (see `src/instrumentation.ts`); this only covers client-initiated fetches
 * (interactive filters, form submits, the poll fallback for live data). A
 * fetch that races the worker's startup on first paint would only affect
 * those, never the initial server-rendered content.
 */
export function MockingProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (env.NEXT_PUBLIC_API_MODE !== 'mock') return;
    import('@/test/msw/browser').then(({ mswWorker }) =>
      mswWorker.start({ onUnhandledRequest: 'bypass', quiet: true })
    );
  }, []);

  return children;
}
