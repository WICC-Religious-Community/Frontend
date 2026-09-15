/** Cursor pagination over an in-memory fixture array, for the mock handlers only. */
export function paginate<T>(items: T[], cursor: string | null | undefined, limit: number) {
  const start = cursor ? Number(cursor) : 0;
  const slice = items.slice(start, start + limit);
  const nextIndex = start + limit;
  return {
    items: slice,
    nextCursor: nextIndex < items.length ? String(nextIndex) : null,
  };
}
