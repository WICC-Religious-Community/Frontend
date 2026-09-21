import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils/cn';

export type ContainerWidth = 'default' | 'narrow' | 'wide';

const widthClass: Record<ContainerWidth, string> = {
  default: 'max-w-(--container-3xl)',
  narrow: 'max-w-3xl',
  wide: 'max-w-[90rem]',
};

export function Container({
  width = 'default',
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & { width?: ContainerWidth }) {
  return (
    <div
      className={cn('mx-auto w-full px-(--spacing-gutter)', widthClass[width], className)}
      {...props}
    />
  );
}
