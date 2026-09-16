/**
 * Centralized, typed environment variable access. Never read
 * `process.env.X` directly elsewhere — add the key here so every consumer
 * shares one source of truth and one failure mode.
 */

const REQUIRED_ENV_VARS = ["NEXT_PUBLIC_CONTENT_API_URL"] as const;

export type EnvVar = (typeof REQUIRED_ENV_VARS)[number];

export function getEnv(key: EnvVar): string | undefined {
  return process.env[key];
}

export function requireEnv(key: EnvVar): string {
  const value = getEnv(key);
  if (!value) {
    throw new Error(
      `Missing required environment variable "${key}". Set it in your .env.local (or hosting provider's env config) before calling this API.`
    );
  }
  return value;
}
