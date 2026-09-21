/**
 * Starts the mock backend on the server before any request is handled, when
 * running in mock mode. This is what makes `npm run dev` / `npm run build`
 * work end-to-end with zero backend deployed — every RSC `fetch` (via
 * `apiClient`) is intercepted the same way it would be in a Vitest run.
 * See `src/test/msw/server.ts` and the browser counterpart wired in
 * `app/layout.tsx` (`MockingProvider`).
 *
 * Dynamically imported (not a static import) so `msw/node` — Node-only,
 * built on `http.ClientRequest` — never reaches the Edge instrumentation
 * bundle, which `instrumentation.ts` is compiled for as well as Node's.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  // Raw process.env, not the validated `env` — reading `@/config/env` here
  // would pull in the full client+server schema before Next has finished
  // setting up the request context this early in the boot sequence.
  if ((process.env.NEXT_PUBLIC_API_MODE ?? 'mock') === 'mock') {
    const { mswServer } = await import('@/test/msw/server');
    mswServer.listen({ onUnhandledRequest: 'bypass' });
  }
}
