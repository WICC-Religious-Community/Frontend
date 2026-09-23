import type { Metadata } from 'next';
import { Container, Page, PageMasthead } from '@/components/primitives';
import { PrayerForm } from '@/features/prayer/prayer-form';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prayer Request',
  description: 'Submit a prayer request to WICC.',
  path: routes.prayer(),
});

export default function PrayerPage() {
  return (
    <Page>
      <Container className="py-section" width="narrow">
        <PageMasthead eyebrow="Prayer" title="Prayer Request" description="Share your request below." />
        <div className="mt-12">
          <PrayerForm />
        </div>
      </Container>
    </Page>
  );
}
