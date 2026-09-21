import { z } from 'zod';

/** Every form schema in the app — shared between the client form (react-hook-form resolver) and the server action that re-validates before it ever reaches the API. */

export const newsletterSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Add a subject').optional(),
  message: z.string().min(10, 'Tell us a little more (at least 10 characters)'),
  // Honeypot — real users never fill this in; bots that fill every field do.
  company: z.string().max(0, 'Invalid submission').optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const prayerSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  request: z.string().min(10, 'Share a little more about your request'),
  isConfidential: z.boolean().default(false),
  company: z.string().max(0, 'Invalid submission').optional(),
});
export type PrayerInput = z.infer<typeof prayerSchema>;

export const connectSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  interest: z.enum(['visit', 'membership', 'groups', 'volunteering', 'baptism']),
  notes: z.string().optional(),
  company: z.string().max(0, 'Invalid submission').optional(),
});
export type ConnectInput = z.infer<typeof connectSchema>;
