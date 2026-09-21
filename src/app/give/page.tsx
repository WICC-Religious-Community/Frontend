import type { Metadata } from 'next';
import { Container, Grid, Page, SectionHeader } from '@/components/primitives';
import { AccountCard } from '@/features/giving/account-card';
import { CampaignProgress } from '@/features/giving/campaign-progress';
import { getGivingAccounts, getGivingCampaigns } from '@/domain/giving/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Give',
  description: 'Ways to give to WICC.',
  path: routes.give(),
  noindex: true,
});

export default async function GivePage() {
  const [accounts, campaigns] = await Promise.all([getGivingAccounts(), getGivingCampaigns()]);

  return (
    <Page>
      <Container className="py-section" width="narrow">
        <SectionHeader
          eyebrow="Generosity"
          title="Give"
          size="lg"
        />

        {campaigns.length > 0 ? (
          <div className="mt-10 space-y-6">
            {campaigns.map(campaign => (
              <CampaignProgress key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : null}

        <div className="mt-12">
          <h2 className="font-display text-heading-md font-semibold text-ink">Bank Transfer</h2>
          <Grid columns={2} className="mt-6">
            {accounts.map(account => (
              <AccountCard key={account.id} account={account} />
            ))}
          </Grid>
        </div>
      </Container>
    </Page>
  );
}
