/** Returns a new object containing only the given keys. */
export function pick<T extends object, K extends keyof T>(source: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in source) result[key] = source[key];
  }
  return result;
}

/** Returns a new object with the given keys removed. */
export function omit<T extends object, K extends keyof T>(source: T, keys: K[]): Omit<T, K> {
  const excluded = new Set<keyof T>(keys);
  const result = {} as Omit<T, K>;
  for (const key of Object.keys(source) as Array<keyof T>) {
    if (!excluded.has(key)) (result as T)[key] = source[key];
  }
  return result;
}

/** `true` for `{}`, `null`, and `undefined` — the common "nothing to render" check. */
export function isEmptyObject(value: object | null | undefined): boolean {
  return !value || Object.keys(value).length === 0;
}
