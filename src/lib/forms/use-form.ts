"use client";

import * as React from "react";
import type { Validator } from "@/lib/validation/rules";

/**
 * Scoped to string field values (text/email/textarea/select inputs cover the
 * vast majority of real forms). Reach for a heavier form library if a form
 * needs booleans, numbers, or nested objects.
 */
type FormValues = Record<string, string>;

interface UseFormOptions<T extends FormValues> {
  initialValues: T;
  validators?: Partial<Record<keyof T, Validator>>;
  onSubmit: (values: T) => void | Promise<void>;
}

export interface UseFormReturn<T extends FormValues> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: (
    field: keyof T
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setFieldValue: (field: keyof T, value: string) => void;
  reset: () => void;
}

export function useForm<T extends FormValues>({
  initialValues,
  validators = {},
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = React.useState<T>(initialValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateField = React.useCallback(
    (field: keyof T, value: string) => validators[field]?.(value),
    [validators]
  );

  const validateAll = React.useCallback(
    (currentValues: T) => {
      const nextErrors: Partial<Record<keyof T, string>> = {};
      for (const field of Object.keys(currentValues) as Array<keyof T>) {
        const error = validateField(field, currentValues[field]);
        if (error) nextErrors[field] = error;
      }
      return nextErrors;
    },
    [validateField]
  );

  const handleChange = React.useCallback(
    (field: keyof T) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        setValues((prev) => ({ ...prev, [field]: value }));
        if (touched[field]) {
          setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
        }
      },
    [touched, validateField]
  );

  const handleBlur = React.useCallback(
    (field: keyof T) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
    },
    [validateField, values]
  );

  const setFieldValue = React.useCallback((field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const nextErrors = validateAll(values);
      setErrors(nextErrors);
      setTouched(
        Object.keys(values).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {} as Partial<Record<keyof T, boolean>>
        )
      );

      if (Object.keys(nextErrors).length > 0) return;

      setIsSubmitting(true);
      Promise.resolve(onSubmit(values)).finally(() => setIsSubmitting(false));
    },
    [onSubmit, validateAll, values]
  );

  const reset = React.useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = Object.keys(validateAll(values)).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    reset,
  };
}
