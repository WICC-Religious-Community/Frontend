import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { toGivingAccountList, toGivingCampaignList } from './mappers';
import type { GivingAccount, GivingCampaign } from './model';

export const getGivingAccounts = cache(async (): Promise<GivingAccount[]> => {
  const { data } = await apiClient.GET('/giving/accounts', {
    next: { tags: ['giving-accounts'], revalidate: 3600 },
  });
  return toGivingAccountList(data);
});

export const getGivingCampaigns = cache(async (): Promise<GivingCampaign[]> => {
  const { data } = await apiClient.GET('/giving/campaigns', {
    next: { tags: ['giving-campaigns'], revalidate: 60 },
  });
  return toGivingCampaignList(data);
});
