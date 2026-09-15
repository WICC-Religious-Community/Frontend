import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils/cn';

export function Figure({
  alt,
  className,
  imageClassName,
  ...props
}: Omit<ImageProps, 'quality'> & { imageClassName?: string }) {
  return (
    <div className={cn('bg-surface-sunken relative overflow-hidden rounded-lg', className)}>
      <Image
        {...props}
        alt={alt}
        quality={82}
        className={cn('object-cover transition-transform duration-700 ease-out', imageClassName)}
      />
    </div>
  );
}
