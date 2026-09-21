'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Field, HoneypotField, TextArea, TextInput } from '@/components/forms/field';
import { Button } from '@/components/ui/button';
import { submitPrayerRequest } from '@/lib/actions/forms';
import { prayerSchema, type PrayerInput } from '@/lib/validations';

export function PrayerForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrayerInput>({ resolver: zodResolver(prayerSchema), defaultValues: { isConfidential: false } });

  const onSubmit = (data: PrayerInput) => {
    startTransition(async () => {
      const result = await submitPrayerRequest(data);
      if (result.success) {
        toast.success('Your request has been received — our team is praying with you.');
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
        <Field label="Name" htmlFor="prayer-name" error={errors.name?.message}>
          <TextInput id="prayer-name" {...register('name')} />
        </Field>
        <Field label="Email" htmlFor="prayer-email" optional error={errors.email?.message}>
          <TextInput id="prayer-email" type="email" {...register('email')} />
        </Field>
      </div>
      <Field label="Phone" htmlFor="prayer-phone" optional error={errors.phone?.message}>
        <TextInput id="prayer-phone" type="tel" {...register('phone')} />
      </Field>
      <Field label="Your Prayer Request" htmlFor="prayer-request" error={errors.request?.message}>
        <TextArea id="prayer-request" {...register('request')} />
      </Field>
      <label className="text-muted flex items-center gap-2 text-body-sm">
        <input type="checkbox" className="accent-primary h-4 w-4" {...register('isConfidential')} />
        Keep this request private
      </label>
      <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? 'Sending…' : 'Submit Request'}
      </Button>
    </form>
  );
}
