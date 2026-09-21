'use client';

import { useGivingCampaign } from '@/domain/giving/client';
import { campaignProgress, type GivingCampaign } from '@/domain/giving/model';
import { formatCurrency, formatPercent } from '@/lib/format/number';

export function CampaignProgress({ campaign }: { campaign: GivingCampaign }) {
  const live = useGivingCampaign(campaign);
  const progress = campaignProgress(live);

  return (
    <div className="border-border rounded-lg border p-6">
      <p className="font-display text-heading-md font-semibold text-ink">{live.title}</p>
      {live.description ? <p className="text-muted mt-2 text-body-sm">{live.description}</p> : null}
      <div className="bg-canvas-2 mt-5 h-2.5 overflow-hidden rounded-full">
        <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: formatPercent(progress) }} />
      </div>
      <div className="text-muted mt-2 flex justify-between text-caption">
        <span>
          {formatCurrency(live.raisedAmount, live.currency as 'NGN' | 'USD')} raised
        </span>
        <span>Goal: {formatCurrency(live.goalAmount, live.currency as 'NGN' | 'USD')}</span>
      </div>
    </div>
  );
}
