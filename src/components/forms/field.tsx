import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { FieldValues, UseFormRegister } from 'react-hook-form';
import { cn } from '@/lib/utils/cn';

const controlClass =
  'border-border-strong w-full rounded-md border bg-transparent px-4 py-2.5 text-body-sm outline-none focus:border-primary';

export function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-body-sm font-medium text-ink">
        {label}
        {optional ? <span className="text-subtle font-normal"> (optional)</span> : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? <p className="text-danger mt-1.5 text-caption">{error}</p> : null}
    </div>
  );
}

export function TextInput(props: ComponentPropsWithoutRef<'input'>) {
  return <input {...props} className={cn(controlClass, props.className)} />;
}

export function TextArea(props: ComponentPropsWithoutRef<'textarea'>) {
  return <textarea rows={5} {...props} className={cn(controlClass, 'resize-none', props.className)} />;
}

/** Honeypot field — visually hidden, never seen by real users; bots that autofill every input trip it. */
export function HoneypotField<T extends FieldValues & { company?: string }>({
  register,
}: {
  register: UseFormRegister<T>;
}) {
  return (
    <input
      type="text"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] h-0 w-0 opacity-0"
      {...register('company' as never)}
    />
  );
}
