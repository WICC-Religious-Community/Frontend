/** Invokes `fn` at most once per `intervalMs`, trailing-calling with the latest args. */
export function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  intervalMs: number
): (...args: Args) => void {
  let lastCall = 0;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return (...args: Args) => {
    const now = Date.now();
    const remaining = intervalMs - (now - lastCall);

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }
      lastCall = now;
      fn(...args);
      return;
    }

    if (!timeout) {
      timeout = setTimeout(() => {
        lastCall = Date.now();
        timeout = undefined;
        fn(...args);
      }, remaining);
    }
  };
}
