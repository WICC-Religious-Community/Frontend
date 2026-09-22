import type { Metadata } from 'next';
import { Container, EmptyState, Grid, Page, PageMasthead } from '@/components/primitives';
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
        <PageMasthead eyebrow="Generosity" title="Give" />

        {campaigns.length > 0 ? (
          <div className="mt-10 space-y-8">
            {campaigns.map(campaign => (
              <CampaignProgress key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : null}

        <div className="mt-14">
          <h2 className="font-display text-heading-lg font-semibold text-ink">Bank Transfer</h2>
          {accounts.length > 0 ? (
            <Grid columns={2} className="mt-6">
              {accounts.map(account => (
                <AccountCard key={account.id} account={account} />
              ))}
            </Grid>
          ) : (
            <EmptyState className="mt-6" title="No accounts published yet" />
          )}
        </div>
      </Container>
    </Page>
  );
}
