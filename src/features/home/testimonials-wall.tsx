'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useLiveTestimonials } from '@/domain/testimonials/client';
import { Container, SectionHeader } from '@/components/primitives';
import { getInitials } from '@/lib/format/string';
import type { Testimonial } from '@/domain/testimonials/model';

export function TestimonialsWall({ testimonials }: { testimonials: Testimonial[] }) {
  const items = useLiveTestimonials(testimonials);

  return (
    <Container>
      <SectionHeader eyebrow="Life Change" title="Stories from our church family" size="sm" align="center" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {items.slice(0, 6).map(testimonial => (
            <motion.div
              key={testimonial.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="border-border bg-surface rounded-lg border p-6"
            >
              <Quote className="text-primary-tint-strong h-6 w-6" aria-hidden="true" />
              <p className="text-ink mt-4 text-body-sm leading-relaxed">“{testimonial.quote}”</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="bg-primary-tint text-primary-dark flex h-8 w-8 items-center justify-center rounded-full text-caption font-semibold">
                  {getInitials(testimonial.name)}
                </span>
                <span className="text-body-sm font-medium text-ink">{testimonial.name}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Container>
  );
}
