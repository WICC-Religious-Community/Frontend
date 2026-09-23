import type { GivingAccount, GivingCampaign } from '@/domain/giving/model';

/** Placeholder — see `src/content/sample/README.md`. Not a real bank account. */
export const sampleGivingAccounts: GivingAccount[] = [
  { id: 'account-1', label: 'General Fund', bankName: 'Sample Bank', accountNumber: '0000000000', accountName: 'Sample Church Inc.', currency: 'USD' },
];

/** Placeholder — see `src/content/sample/README.md`. */
export const sampleGivingCampaigns: GivingCampaign[] = [
  { id: 'campaign-1', title: 'Building Fund', description: 'Help us expand our main campus.', goalAmount: 100_000, raisedAmount: 42_000, currency: 'USD' },
];
