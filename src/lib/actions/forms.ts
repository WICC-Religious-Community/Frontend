'use server';

import { createServerApiClient } from '@/lib/api/client';
import { getErrorMessage } from '@/lib/api/errors';
import {
  connectSchema,
  contactSchema,
  newsletterSchema,
  prayerSchema,
  type ConnectInput,
  type ContactInput,
  type NewsletterInput,
  type PrayerInput,
} from '@/lib/validations';

export type ActionResult = { success: true } | { success: false; error: string };

/**
 * Every form in the app posts through one of these. Each: re-validates with
 * the same zod schema the client form uses (never trust the client), drops
 * the honeypot field, and calls the backend with the server-only bearer
 * token — the browser never sees `API_SERVER_TOKEN`.
 */
export async function submitContactForm(input: ContactInput): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  if (parsed.data.company) return { success: false, error: 'Invalid submission' };

  try {
    await createServerApiClient().POST('/forms/contact', {
      body: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function submitPrayerRequest(input: PrayerInput): Promise<ActionResult> {
  const parsed = prayerSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  if (parsed.data.company) return { success: false, error: 'Invalid submission' };

  try {
    await createServerApiClient().POST('/forms/prayer', {
      body: {
        name: parsed.data.name,
        email: parsed.data.email || undefined,
        phone: parsed.data.phone,
        request: parsed.data.request,
        isConfidential: parsed.data.isConfidential,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function submitConnectCard(input: ConnectInput): Promise<ActionResult> {
  const parsed = connectSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  if (parsed.data.company) return { success: false, error: 'Invalid submission' };

  try {
    await createServerApiClient().POST('/forms/connect', {
      body: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        interest: parsed.data.interest,
        notes: parsed.data.notes,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function subscribeToNewsletter(input: NewsletterInput): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };

  try {
    await createServerApiClient().POST('/forms/newsletter', { body: { email: parsed.data.email } });
    return { success: true };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
