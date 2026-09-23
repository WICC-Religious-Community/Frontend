'use client';

import { useGivingCampaign } from '@/domain/giving/client';
import { campaignProgress, type GivingCampaign } from '@/domain/giving/model';
import { formatCurrency, formatPercent } from '@/lib/format/number';

export function CampaignProgress({ campaign }: { campaign: GivingCampaign }) {
  const live = useGivingCampaign(campaign);
  const progress = campaignProgress(live);

  return (
    <div className="border-border border-b pb-8">
      <p className="font-display text-heading-lg font-semibold text-ink">{live.title}</p>
      {live.description ? <p className="text-muted mt-2 max-w-xl text-body-sm leading-relaxed">{live.description}</p> : null}
      <div className="bg-canvas-2 mt-6 h-1.5 overflow-hidden rounded-full">
        <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: formatPercent(progress) }} />
      </div>
      <div className="text-muted mt-3 flex justify-between text-body-sm">
        <span className="text-ink font-semibold">
          {formatCurrency(live.raisedAmount, live.currency as 'NGN' | 'USD')} <span className="text-muted font-normal">raised</span>
        </span>
        <span>Goal: {formatCurrency(live.goalAmount, live.currency as 'NGN' | 'USD')}</span>
      </div>
    </div>
  );
}
