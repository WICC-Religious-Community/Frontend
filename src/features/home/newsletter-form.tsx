'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Container, Eyebrow, Split } from '@/components/primitives';
import { subscribeToNewsletter } from '@/lib/actions/forms';
import { newsletterSchema, type NewsletterInput } from '@/lib/validations';

export function NewsletterForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = (data: NewsletterInput) => {
    startTransition(async () => {
      const result = await subscribeToNewsletter(data);
      if (result.success) {
        toast.success('You’re subscribed — welcome!');
        reset();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Container>
      <Split className="lg:items-start">
        <div>
          <Eyebrow>Stay Connected</Eyebrow>
          <p className="font-display text-display-sm mt-4 max-w-md font-semibold text-ink text-balance">
            Subscribe to updates from WICC
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="border-border-strong focus-within:border-primary flex items-center border-b pb-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              className="w-full bg-transparent text-body-lg text-ink outline-none placeholder:text-subtle"
              {...register('email')}
            />
            <button
              type="submit"
              disabled={isPending}
              aria-label="Subscribe"
              className="text-ink hover:text-primary-dark shrink-0 transition-colors disabled:opacity-50"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          {errors.email ? <p className="text-danger mt-2 text-caption">{errors.email.message}</p> : null}
        </form>
      </Split>
    </Container>
  );
}
