import * as React from "react";
import { cn } from "@/lib/cn";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
type SpanProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * Instrument Serif ships in a single weight (400) — its elegance comes from
 * size and negative tracking, not synthetic bolding, so headings intentionally
 * stay `font-normal`.
 */

export function Display({ className, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        "font-display text-5xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl",
        className
      )}
      {...props}
    />
  );
}

export function H2({ className, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        "font-display text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl",
        className
      )}
      {...props}
    />
  );
}

export function H3({ className, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        "font-display text-2xl font-normal leading-snug tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  );
}

/** Inline italic serif emphasis for a word or phrase inside a heading. */
export function Accent({ className, ...props }: SpanProps) {
  return <span className={cn("font-display italic text-primary", className)} {...props} />;
}

/** Larger intro paragraph, typically directly under a Display heading. */
export function Lead({ className, ...props }: ParagraphProps) {
  return (
    <p
      className={cn("text-lg leading-relaxed text-muted-foreground sm:text-xl", className)}
      {...props}
    />
  );
}

export function Text({ className, ...props }: ParagraphProps) {
  return <p className={cn("text-base leading-relaxed text-foreground", className)} {...props} />;
}

export function Muted({ className, ...props }: ParagraphProps) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
