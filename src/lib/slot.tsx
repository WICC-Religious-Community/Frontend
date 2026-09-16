import * as React from "react";
import { cn } from "@/lib/cn";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Merges its props onto its single child instead of rendering a wrapper
 * element — lets `<Button asChild><Link ... /></Button>` render one `<a>`
 * styled as a button rather than a `<button>` wrapping an `<a>`.
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (!React.isValidElement(children)) return null;

    const child = children as React.ReactElement<Record<string, unknown>>;
    return React.cloneElement(child, {
      ...props,
      ...child.props,
      className: cn(className, child.props?.className as string | undefined),
      ref,
    });
  }
);
Slot.displayName = "Slot";
