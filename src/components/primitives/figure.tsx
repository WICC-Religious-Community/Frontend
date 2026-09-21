import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils/cn';

type FigureProps = Omit<ImageProps, 'quality' | 'src'> & {
  src?: ImageProps['src'];
  imageClassName?: string;
};

/**
 * The one image treatment in the app. When `src` is empty (a leader/event/
 * ministry with no photo uploaded yet), renders a soft brand-tinted
 * placeholder instead of a broken `<img>` — every card stays presentable
 * before real media exists.
 */
export function Figure({ src, alt, className, imageClassName, ...props }: FigureProps) {
  return (
    <div className={cn('bg-surface-sunken relative overflow-hidden rounded-lg', className)}>
      {src ? (
        <Image
          {...props}
          src={src}
          alt={alt}
          quality={82}
          className={cn('object-cover transition-transform duration-700 ease-out', imageClassName)}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="from-primary-tint to-canvas-2 absolute inset-0 bg-gradient-to-br"
        />
      )}
    </div>
  );
}
