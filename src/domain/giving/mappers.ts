import { z } from 'zod';
import type { GivingAccount, GivingCampaign } from './model';

const accountSchema = z.object({
  id: z.string(),
  label: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
  accountName: z.string(),
  currency: z.string(),
});

const campaignSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  goalAmount: z.number(),
  raisedAmount: z.number(),
  currency: z.string(),
  endsAt: z.string().nullable().optional(),
});

export function toGivingAccountList(dto: unknown): GivingAccount[] {
  return z.array(accountSchema).parse(dto);
}

export function toGivingCampaignList(dto: unknown): GivingCampaign[] {
  return z.array(campaignSchema).parse(dto);
}

export function toGivingCampaign(dto: unknown): GivingCampaign {
  return campaignSchema.parse(dto);
}
