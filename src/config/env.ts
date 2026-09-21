import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Validated environment access. Import `env` instead of `process.env` — a
 * missing/malformed variable fails fast at boot instead of surfacing as a
 * confusing runtime bug three layers deep.
 */
export const env = createEnv({
  server: {
    API_SERVER_TOKEN: z.string().optional(),
    REVALIDATE_SECRET: z.string().optional(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url().default('https://wicc.org'),
    NEXT_PUBLIC_API_URL: z.string().url().default('https://api.wicc.org'),
    NEXT_PUBLIC_API_MODE: z.enum(['mock', 'live']).default('mock'),
    NEXT_PUBLIC_LIVE_TRANSPORT: z.enum(['sse', 'poll']).default('sse'),
    NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_API_KEY: z.string().optional(),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  },
  runtimeEnv: {
    API_SERVER_TOKEN: process.env.API_SERVER_TOKEN,
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_MODE: process.env.NEXT_PUBLIC_API_MODE,
    NEXT_PUBLIC_LIVE_TRANSPORT: process.env.NEXT_PUBLIC_LIVE_TRANSPORT,
    NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_API_KEY,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
  emptyStringAsUndefined: true,
  // The mock-first workflow (see README) must work without any .env file at
  // all — CI, a fresh clone, and `npm run build` before the backend exists.
  skipValidation: process.env.CI === 'true' || process.env.SKIP_ENV_VALIDATION === '1',
});

export const isMockMode = env.NEXT_PUBLIC_API_MODE === 'mock';
