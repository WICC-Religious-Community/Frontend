import { cloneElement, forwardRef, isValidElement, type HTMLAttributes, type ReactElement } from 'react';
import { cn } from './cn';

interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Merges its props onto its single child instead of rendering a wrapper
 * element — lets `<Button asChild><Link ... /></Button>` render one `<a>`
 * styled as a button rather than a `<button>` wrapping an `<a>`.
 */
export const Slot = forwardRef<HTMLElement, SlotProps>(({ children, className, ...props }, ref) => {
  if (!isValidElement(children)) return null;

  const child = children as ReactElement<Record<string, unknown>>;
  return cloneElement(child, {
    ...props,
    ...child.props,
    className: cn(className, child.props?.className as string | undefined),
    ref,
  });
});
Slot.displayName = 'Slot';
