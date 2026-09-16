import * as React from "react";
import { cn } from "@/lib/cn";

/** Hides content visually while keeping it in the accessibility tree. */
export function VisuallyHidden({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)] [clip-path:inset(50%)]",
        className
      )}
      {...props}
    />
  );
}
