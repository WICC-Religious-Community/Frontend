'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Field, HoneypotField, TextArea, TextInput } from '@/components/forms/field';
import { Button } from '@/components/ui/button';
import { submitConnectCard } from '@/lib/actions/forms';
import { connectSchema, type ConnectInput } from '@/lib/validations';

const INTERESTS: { value: ConnectInput['interest']; label: string }[] = [
  { value: 'visit', label: 'Plan a visit' },
  { value: 'membership', label: 'Church membership' },
  { value: 'groups', label: 'Join a connect group' },
  { value: 'volunteering', label: 'Volunteering' },
  { value: 'baptism', label: 'Baptism' },
];

export function ConnectForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConnectInput>({ resolver: zodResolver(connectSchema), defaultValues: { interest: 'visit' } });

  const onSubmit = (data: ConnectInput) => {
    startTransition(async () => {
      const result = await submitConnectCard(data);
      if (result.success) {
        toast.success('Thanks for connecting — someone from our team will reach out.');
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
        <Field label="Name" htmlFor="connect-name" error={errors.name?.message}>
          <TextInput id="connect-name" {...register('name')} />
        </Field>
        <Field label="Email" htmlFor="connect-email" error={errors.email?.message}>
          <TextInput id="connect-email" type="email" {...register('email')} />
        </Field>
      </div>
      <Field label="Phone" htmlFor="connect-phone" optional error={errors.phone?.message}>
        <TextInput id="connect-phone" type="tel" {...register('phone')} />
      </Field>
      <Field label="I'm interested in" htmlFor="connect-interest" error={errors.interest?.message}>
        <select
          id="connect-interest"
          className="border-border-strong h-11 w-full rounded-md border bg-transparent px-4 text-body-sm outline-none focus:border-primary"
          {...register('interest')}
        >
          {INTERESTS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Notes" htmlFor="connect-notes" optional error={errors.notes?.message}>
        <TextArea id="connect-notes" {...register('notes')} />
      </Field>
      <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? 'Submitting…' : 'Get Connected'}
      </Button>
    </form>
  );
}
