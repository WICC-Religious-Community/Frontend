export type Validator = (value: string) => string | undefined;

export const required =
  (message = "This field is required"): Validator =>
  (value) =>
    value.trim().length > 0 ? undefined : message;

export const email =
  (message = "Enter a valid email address"): Validator =>
  (value) =>
    !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : message;

export const minLength =
  (min: number, message = `Must be at least ${min} characters`): Validator =>
  (value) =>
    !value || value.length >= min ? undefined : message;

export const maxLength =
  (max: number, message = `Must be at most ${max} characters`): Validator =>
  (value) =>
    !value || value.length <= max ? undefined : message;

export const pattern =
  (regex: RegExp, message = "Invalid format"): Validator =>
  (value) =>
    !value || regex.test(value) ? undefined : message;

/** Runs validators in order, returning the first error encountered. */
export function composeValidators(...validators: Validator[]): Validator {
  return (value) => {
    for (const validate of validators) {
      const error = validate(value);
      if (error) return error;
    }
    return undefined;
  };
}
