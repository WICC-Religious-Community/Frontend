import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export function Eyebrow({ className, ...props }: ComponentPropsWithoutRef<'p'>) {
  return <p className={cn('eyebrow', className)} {...props} />;
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
  as: Heading = 'h2',
  size = 'md',
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  accent?: ReactNode;
  description?: string;
  as?: 'h2' | 'h3';
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <header className={cn(align === 'center' && 'flex flex-col items-center text-center', className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading
        className={cn(
          'font-display font-semibold text-ink',
          eyebrow && 'mt-3',
          size === 'sm' && 'text-heading-lg sm:text-display-sm',
          size === 'md' && 'text-display-sm sm:text-display-md',
          size === 'lg' && 'text-display-md sm:text-display-lg'
        )}
      >
        {title}
        {accent ? <span className="text-primary"> {accent}</span> : null}
      </Heading>
      {description ? (
        <p className={cn('text-muted mt-4 max-w-[52ch] text-body-lg', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      ) : null}
    </header>
  );
}

/** Long-form rich text (blog posts, ministry descriptions) rendered from API HTML/blocks. */
export function Prose({
  as: Tag = 'div',
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & { as?: ElementType }) {
  return (
    <Tag
      className={cn(
        'max-w-(--prose-max) text-body-lg leading-loose text-ink',
        '[&_a]:text-primary-dark [&_a]:underline [&_a]:underline-offset-4',
        '[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-heading-lg [&_h2]:font-display',
        '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-heading-md [&_h3]:font-display',
        '[&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-5 [&_blockquote]:text-muted',
        className
      )}
      {...props}
    />
  );
}
