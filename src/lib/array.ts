/** Groups items by the key returned from `getKey`, preserving insertion order. */
export function groupBy<T, K extends PropertyKey>(
  items: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  const groups = {} as Record<K, T[]>;
  for (const item of items) {
    const key = getKey(item);
    (groups[key] ??= []).push(item);
  }
  return groups;
}

/** Removes duplicates, optionally by a derived key (defaults to strict equality). */
export function unique<T, K = T>(items: T[], getKey?: (item: T) => K): T[] {
  if (!getKey) return Array.from(new Set(items));

  const seen = new Set<K>();
  const result: T[] = [];
  for (const item of items) {
    const key = getKey(item);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

/** Splits `items` into arrays of at most `size` elements each. */
export function chunk<T>(items: T[], size: number): T[][] {
  if (size <= 0) throw new Error("chunk size must be greater than 0");

  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

/** Stable sort by a derived key — ascending unless `direction` is "desc". */
export function sortBy<T>(
  items: T[],
  getKey: (item: T) => string | number,
  direction: "asc" | "desc" = "asc"
): T[] {
  const sign = direction === "asc" ? 1 : -1;
  return [...items].sort((a, b) => {
    const keyA = getKey(a);
    const keyB = getKey(b);
    if (keyA < keyB) return -1 * sign;
    if (keyA > keyB) return 1 * sign;
    return 0;
  });
}
