import type { Metadata } from 'next';
import { Container, Page, SectionHeader } from '@/components/primitives';
import { PrayerForm } from '@/features/prayer/prayer-form';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prayer Request',
  description: 'Submit a prayer request — our pastoral team is here to pray with you.',
  path: routes.prayer(),
});

export default function PrayerPage() {
  return (
    <Page>
      <Container className="py-section" width="narrow">
        <SectionHeader
          eyebrow="We're Here For You"
          title="Prayer Request"
          description="Whatever you're facing, you don't have to face it alone. Share your request below."
          size="lg"
        />
        <div className="mt-12">
          <PrayerForm />
        </div>
      </Container>
    </Page>
  );
}
