'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({
  children,
  className,
  side = 'right',
  title,
  ...props
}: ComponentPropsWithoutRef<typeof Dialog.Content> & {
  side?: 'left' | 'right';
  title: string;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
      <Dialog.Content
        className={cn(
          'bg-surface fixed inset-y-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto p-6 shadow-xl outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          side === 'right'
            ? 'right-0 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right'
            : 'left-0 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <Dialog.Title className="font-display text-heading-sm font-semibold">{title}</Dialog.Title>
          <Dialog.Close className="text-muted hover:text-ink rounded-md p-2" aria-label="Close menu">
            <X className="h-5 w-5" />
          </Dialog.Close>
        </div>
        <div className="mt-6 flex-1">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function SheetDescription({ children }: { children: ReactNode }) {
  return <Dialog.Description className="sr-only">{children}</Dialog.Description>;
}
