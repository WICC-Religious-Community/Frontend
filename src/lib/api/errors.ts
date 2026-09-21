/** Normalized API error, regardless of whether the backend fails as JSON, text, or a network error. */
export class ApiError extends Error {
  readonly status: number;
  readonly detail?: string;
  readonly fieldErrors?: Record<string, string[]>;

  constructor(
    message: string,
    opts: { status: number; detail?: string; fieldErrors?: Record<string, string[]> }
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = opts.status;
    this.detail = opts.detail;
    this.fieldErrors = opts.fieldErrors;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/** User-safe message — never leaks raw backend error text to the UI. */
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    if (error.status === 404) return 'We couldn’t find what you’re looking for.';
    if (error.status >= 500) return 'Something went wrong on our end. Please try again shortly.';
    return error.detail ?? 'That didn’t go through. Please check the form and try again.';
  }
  return 'Something went wrong. Please try again.';
}
