/**
 * Starts the mock backend on the server before any request is handled, when
 * running in mock mode. This is what makes `npm run dev` / `npm run build`
 * work end-to-end with zero backend deployed — every RSC `fetch` (via
 * `apiClient`) is intercepted the same way it would be in a Vitest run.
 * See `src/test/msw/server.ts` and the browser counterpart wired in
 * `app/layout.tsx` (`MockingProvider`).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NEXT_PUBLIC_API_MODE === 'mock') {
    const { mswServer } = await import('@/test/msw/server');
    mswServer.listen({ onUnhandledRequest: 'bypass' });
  }
}
