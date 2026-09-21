/** Narrow `value` to non-nullable or throw — for invariants the type system can't see. */
export function assert(
  condition: unknown,
  message = 'Assertion failed'
): asserts condition {
  if (!condition) throw new Error(message);
}

/** Type guard: filters `[item, item, null, undefined]` down to `[item, item]`. */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
