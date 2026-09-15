'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Container } from '@/components/primitives';
import { Button } from '@/components/ui/button';
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
    <Container width="narrow" className="text-center">
      <h2 className="font-display text-heading-lg font-semibold text-ink">Stay in the loop</h2>
      <p className="text-muted mt-2 text-body-sm">
        Get sermon releases, event announcements, and church news in your inbox.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-6 flex max-w-md gap-2" noValidate>
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="you@example.com"
            className="border-border-strong h-11 w-full rounded-md border bg-transparent px-4 text-body-sm outline-none focus:border-primary"
            {...register('email')}
          />
          {errors.email ? <p className="text-danger mt-1.5 text-left text-caption">{errors.email.message}</p> : null}
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Subscribing…' : 'Subscribe'}
        </Button>
      </form>
    </Container>
  );
}
