import createClient, { type Middleware } from 'openapi-fetch';
import { env } from '@/config/env';
import { ApiError } from './errors';
import type { paths } from './schema';

/**
 * The one HTTP boundary in the app. Every request — server or client, mock or
 * live — goes through this `openapi-fetch` instance, so every path/param/
 * response shape is checked against `schema.d.ts` at compile time. In mock
 * mode (`NEXT_PUBLIC_API_MODE=mock`) MSW intercepts the underlying `fetch`
 * (see `src/test/msw`), so this file never branches on mode itself.
 */
const throwOnError: Middleware = {
  async onResponse({ response }) {
    if (response.ok) return response;
    const body = await response
      .clone()
      .json()
      .catch(() => undefined);
    throw new ApiError(body?.title ?? `Request failed with ${response.status}`, {
      status: response.status,
      detail: body?.detail,
      fieldErrors: body?.errors,
    });
  },
};

/**
 * Attaches the server-only bearer token. Only imported from server code
 * (Server Actions, each domain's `server.ts`) — never bundled into client JS
 * because those files never import from a `'use client'` module graph.
 */
function withAuth(): Middleware {
  return {
    async onRequest({ request }) {
      if (env.API_SERVER_TOKEN) {
        request.headers.set('Authorization', `Bearer ${env.API_SERVER_TOKEN}`);
      }
      return request;
    },
  };
}

export const apiClient = createClient<paths>({
  baseUrl: `${env.NEXT_PUBLIC_API_URL}/v1`,
});
apiClient.use(throwOnError);

/** Server-only client — carries the bearer token for authenticated writes. */
export function createServerApiClient() {
  const client = createClient<paths>({ baseUrl: `${env.NEXT_PUBLIC_API_URL}/v1` });
  client.use(withAuth());
  client.use(throwOnError);
  return client;
}
