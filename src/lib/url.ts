type QueryValue = string | number | boolean | undefined | null;

/** Serializes to `"a=1&b=2"`, dropping `null`/`undefined` entries. Ready to prefix with `?`. */
export function buildQueryString(params: Record<string, QueryValue>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    search.set(key, String(value));
  }
  return search.toString();
}

/** Appends `params` to `path`, merging with any query string `path` already has. */
export function withQuery(path: string, params: Record<string, QueryValue>): string {
  const [base, existing] = path.split("?");
  const search = new URLSearchParams(existing);
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `${base}?${query}` : base;
}
