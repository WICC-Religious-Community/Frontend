import { z } from 'zod';
import type { ServiceStatus, SiteSettings } from './model';

/**
 * Every wire response is `zod.parse`d before it becomes a domain model. A
 * contract break from the backend fails loudly here — one place per
 * aggregate — instead of silently rendering `undefined` three components
 * downstream.
 */
const serviceTimeSchema = z.object({
  dayOfWeek: z.array(z.string()),
  opens: z.string(),
  closes: z.string().optional(),
  label: z.string(),
  timezone: z.string().optional(),
});

const ctaSchema = z.object({ label: z.string(), href: z.string() });

const heroSchema = z.object({
  headline: z.string().optional(),
  headlineAccent: z.string().optional(),
  subheadline: z.string().optional(),
  media: z
    .object({
      kind: z.enum(['image', 'video']),
      url: z.string(),
      posterUrl: z.string().optional(),
      alt: z.string().optional(),
    })
    .optional(),
  primaryCta: ctaSchema.optional(),
  secondaryCta: ctaSchema.optional(),
});

const siteSettingsSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z
    .object({
      streetAddress: z.string(),
      locality: z.string(),
      region: z.string().optional(),
      country: z.string(),
      mapUrl: z.string().optional(),
    })
    .optional(),
  socialLinks: z
    .object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      youtube: z.string().optional(),
      tiktok: z.string().optional(),
      x: z.string().optional(),
      whatsapp: z.string().optional(),
    })
    .default({}),
  serviceTimes: z.array(serviceTimeSchema).default([]),
  announcement: z
    .object({ enabled: z.boolean(), text: z.string(), href: z.string().optional() })
    .optional(),
  hero: heroSchema.optional(),
  pillars: z
    .array(z.object({ title: z.string(), description: z.string().optional(), imageUrl: z.string().optional() }))
    .default([]),
});

export function toSiteSettings(dto: unknown): SiteSettings {
  return siteSettingsSchema.parse(dto);
}

const serviceStatusSchema = z.object({
  isLive: z.boolean(),
  label: z.string().optional(),
  streamUrl: z.string().optional(),
  startedAt: z.string().optional(),
  nextServiceAt: z.string().optional(),
});

export function toServiceStatus(dto: unknown): ServiceStatus {
  return serviceStatusSchema.parse(dto);
}
