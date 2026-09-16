import { requireEnv } from "@/lib/env";

interface FetchOptions {
  /** Next.js ISR revalidation window, in seconds. */
  revalidate?: number;
  /** Cache tags for on-demand revalidation via `revalidateTag`. */
  tags?: string[];
}

function getBaseUrl(): string {
  return requireEnv("NEXT_PUBLIC_CONTENT_API_URL");
}

/** Typed GET against the configured CMS/API. Throws if the endpoint isn't configured or the request fails. */
export async function fetchContent<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    next: { revalidate: options.revalidate ?? 60, tags: options.tags },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch "${path}": ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

/** Typed POST against the configured CMS/API — form submissions, sign-ups, etc. */
export async function postContent<TBody, TResponse = void>(
  path: string,
  body: TBody
): Promise<TResponse> {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit to "${path}": ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) return undefined as TResponse;
  return (await response.json()) as TResponse;
}
