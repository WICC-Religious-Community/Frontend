import createClient, { type Middleware } from 'openapi-fetch';
import { env, isApiConfigured } from '@/config/env';
import { ApiError } from './errors';
import type { paths } from './schema';

/**
 * The one HTTP boundary in the app. Every request goes through this
 * `openapi-fetch` instance, so every path/param/response shape is checked
 * against `schema.d.ts` (generated from `openapi.yaml`) at compile time.
 *
 * There is no mock mode. With `NEXT_PUBLIC_API_URL` unset the server-side
 * fetchers in `domain/*` short-circuit via `lib/api/fallback.ts` and never
 * reach this client.
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

const baseUrl = isApiConfigured ? `${env.NEXT_PUBLIC_API_URL}/v1` : 'http://api-not-configured.invalid/v1';

export const apiClient = createClient<paths>({ baseUrl });
apiClient.use(throwOnError);

/** Server-only client — carries the bearer token for authenticated writes. */
export function createServerApiClient() {
  const client = createClient<paths>({ baseUrl });
  client.use(withAuth());
  client.use(throwOnError);
  return client;
}
