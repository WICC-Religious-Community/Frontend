export interface GivingAccount {
  id: string;
  label: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  currency: string;
}

export interface GivingCampaign {
  id: string;
  title: string;
  description?: string;
  goalAmount: number;
  raisedAmount: number;
  currency: string;
  endsAt?: string | null;
}

export function campaignProgress(campaign: Pick<GivingCampaign, 'goalAmount' | 'raisedAmount'>): number {
  if (campaign.goalAmount <= 0) return 0;
  return Math.min(1, campaign.raisedAmount / campaign.goalAmount);
}
