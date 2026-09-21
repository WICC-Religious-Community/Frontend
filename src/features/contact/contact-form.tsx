'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Field, HoneypotField, TextArea, TextInput } from '@/components/forms/field';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/lib/actions/forms';
import { contactSchema, type ContactInput } from '@/lib/validations';

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (data: ContactInput) => {
    startTransition(async () => {
      const result = await submitContactForm(data);
      if (result.success) {
        toast.success('Message sent — we’ll be in touch soon.');
        reset();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <HoneypotField register={register} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" error={errors.name?.message}>
          <TextInput id="contact-name" {...register('name')} />
        </Field>
        <Field label="Email" htmlFor="contact-email" error={errors.email?.message}>
          <TextInput id="contact-email" type="email" {...register('email')} />
        </Field>
      </div>
      <Field label="Phone" htmlFor="contact-phone" optional error={errors.phone?.message}>
        <TextInput id="contact-phone" type="tel" {...register('phone')} />
      </Field>
      <Field label="Subject" htmlFor="contact-subject" optional error={errors.subject?.message}>
        <TextInput id="contact-subject" {...register('subject')} />
      </Field>
      <Field label="Message" htmlFor="contact-message" error={errors.message?.message}>
        <TextArea id="contact-message" {...register('message')} />
      </Field>
      <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  );
}
