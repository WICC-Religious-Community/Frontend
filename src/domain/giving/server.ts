import { cache } from 'react';
import { apiClient } from '@/lib/api/client';
import { whenConfigured } from '@/lib/api/fallback';
import { sampleGivingAccounts, sampleGivingCampaigns } from '@/content/sample';
import { toGivingAccountList, toGivingCampaignList } from './mappers';
import type { GivingAccount, GivingCampaign } from './model';

export const getGivingAccounts = cache(async (): Promise<GivingAccount[]> =>
  whenConfigured(sampleGivingAccounts, async () => {
    const { data } = await apiClient.GET('/giving/accounts', {
      next: { tags: ['giving-accounts'], revalidate: 3600 },
    });
    return toGivingAccountList(data);
  })
);

export const getGivingCampaigns = cache(async (): Promise<GivingCampaign[]> =>
  whenConfigured(sampleGivingCampaigns, async () => {
    const { data } = await apiClient.GET('/giving/campaigns', {
      next: { tags: ['giving-campaigns'], revalidate: 60 },
    });
    return toGivingCampaignList(data);
  })
);
