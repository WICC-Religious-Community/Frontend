/** Shared cursor-pagination envelope — every list aggregate (sermons, events, blog) reuses this. */
export interface Paginated<T> {
  items: T[];
  nextCursor: string | null;
}
