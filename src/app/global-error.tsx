'use client';

import { useEffect } from 'react';

/**
 * Catches errors thrown by the root layout itself (where the regular
 * `error.tsx` boundary can't help, since it renders inside that layout).
 * Must render its own `<html>`/`<body>` — no design-system dependency here
 * in case the failure is in the layout's own data fetch.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Something went wrong</h1>
        <p style={{ color: '#666', marginTop: '0.75rem' }}>Please try again in a moment.</p>
        <button
          onClick={reset}
          style={{ marginTop: '2rem', padding: '0.625rem 1.5rem', borderRadius: '999px', background: '#2454e8', color: '#fff', border: 'none', fontWeight: 600 }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
