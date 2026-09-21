import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine conditional class names and resolve conflicting Tailwind utilities
 * (e.g. `cn('px-2', condition && 'px-4')` -> `'px-4'`).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
