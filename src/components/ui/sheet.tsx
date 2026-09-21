'use client';

import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

/**
 * A minimal, dependency-free replacement for `@radix-ui/react-dialog` (as
 * used for the mobile nav drawer): controlled open state via context,
 * a focus trap, Escape-to-close, body scroll lock, and a portal — the
 * pieces this app actually needs, no more.
 */

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext(component: string): SheetContextValue {
  const context = useContext(SheetContext);
  if (!context) throw new Error(`<${component}> must be rendered inside <Sheet>`);
  return context;
}

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  const titleId = useId();
  const descriptionId = useId();
  return (
    <SheetContext.Provider value={{ open, onOpenChange, titleId, descriptionId }}>
      {children}
    </SheetContext.Provider>
  );
}

function useTriggerLike(
  component: string,
  nextOpen: boolean,
  { asChild, children, onClick, ...props }: ComponentPropsWithoutRef<'button'> & { asChild?: boolean }
) {
  const { onOpenChange } = useSheetContext(component);

  if (asChild) {
    if (!isValidElement(children)) return null;
    const child = children as ReactElement<{ onClick?: (event: unknown) => void }>;
    return cloneElement(child, {
      onClick: (event: unknown) => {
        child.props.onClick?.(event);
        onOpenChange(nextOpen);
      },
    });
  }

  return (
    <button
      type="button"
      {...props}
      onClick={event => {
        onClick?.(event);
        onOpenChange(nextOpen);
      }}
    >
      {children}
    </button>
  );
}

export function SheetTrigger(props: ComponentPropsWithoutRef<'button'> & { asChild?: boolean }) {
  return useTriggerLike('SheetTrigger', true, props);
}

export function SheetClose(props: ComponentPropsWithoutRef<'button'> & { asChild?: boolean }) {
  return useTriggerLike('SheetClose', false, props);
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/** Cycles Tab/Shift+Tab within `containerRef` and restores focus on close. */
function useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    (focusable[0] ?? container).focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [containerRef, active]);
}

function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}

/** Keeps the panel mounted through its closing animation, unmounting on `animationend`. */
function usePresence(open: boolean) {
  const [wasOpen, setWasOpen] = useState(open);
  const [mounted, setMounted] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setMounted(true);
  }

  return {
    mounted,
    onAnimationEnd: () => {
      if (!open) setMounted(false);
    },
  };
}

export function SheetContent({
  children,
  className,
  side = 'right',
  title,
}: {
  children?: ReactNode;
  className?: string;
  side?: 'left' | 'right';
  title: string;
}) {
  const { open, onOpenChange, titleId, descriptionId } = useSheetContext('SheetContent');
  const { mounted, onAnimationEnd } = usePresence(open);
  const contentRef = useRef<HTMLDivElement>(null);

  useFocusTrap(contentRef, open);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onOpenChange(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  if (!mounted || typeof document === 'undefined') return null;

  const state = open ? 'open' : 'closed';

  return createPortal(
    <>
      <div
        data-state={state}
        onAnimationEnd={onAnimationEnd}
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out"
        aria-hidden="true"
      />
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-state={state}
        onAnimationEnd={onAnimationEnd}
        tabIndex={-1}
        className={cn(
          'bg-surface fixed inset-y-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto p-6 shadow-xl outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          side === 'right'
            ? 'right-0 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right'
            : 'left-0 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
          className
        )}
      >
        <div className="flex items-center justify-between">
          <h2 id={titleId} className="font-display text-heading-sm font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-muted hover:text-ink rounded-md p-2"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 flex-1">{children}</div>
      </div>
    </>,
    document.body
  );
}

export function SheetDescription({ children }: { children: ReactNode }) {
  const { descriptionId } = useSheetContext('SheetDescription');
  return (
    <p id={descriptionId} className="sr-only">
      {children}
    </p>
  );
}
