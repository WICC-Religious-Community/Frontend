'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useLiveTestimonials } from '@/domain/testimonials/client';
import { Container, Eyebrow, Figure } from '@/components/primitives';
import { cn } from '@/lib/utils/cn';
import type { Testimonial } from '@/domain/testimonials/model';

const AUTO_ADVANCE_MS = 7_000;

/** One large quote at a time, auto-advancing — a rotating spotlight rather than a wall of equal-weight cards. */
export function TestimonialsWall({ testimonials }: { testimonials: Testimonial[] }) {
  const items = useLiveTestimonials(testimonials).slice(0, 8);
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = items[index % items.length];

  useEffect(() => {
    if (reduceMotion || items.length <= 1) return;
    const timer = setInterval(() => setIndex(current => (current + 1) % items.length), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [items.length, reduceMotion]);

  if (!active) return null;

  return (
    <Container width="narrow" className="text-center">
      <Eyebrow>Testimonies</Eyebrow>
      <Quote className="text-primary-tint-strong mx-auto mt-6 h-10 w-10" aria-hidden="true" />

      <div className="relative mt-6 min-h-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display text-display-sm text-balance font-medium text-ink">&ldquo;{active.quote}&rdquo;</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Figure
                src={active.photoUrl}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full"
                imageClassName="rounded-full"
              />
              <span className="text-body-sm font-semibold text-ink">{active.name}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 ? (
        <div className="mt-8 flex justify-center gap-2">
          {items.map((testimonial, dotIndex) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Show testimony from ${testimonial.name}`}
              aria-current={dotIndex === index % items.length}
              className={cn(
                'h-1.5 rounded-full transition-all',
                dotIndex === index % items.length ? 'bg-primary w-6' : 'bg-border-strong w-1.5'
              )}
            />
          ))}
        </div>
      ) : null}
    </Container>
  );
}
