import type { Metadata } from 'next';
import { Container, Page, SectionHeader } from '@/components/primitives';
import { ConnectForm } from '@/features/connect/connect-form';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Connect',
  description: 'Get in touch and take your next step with WICC.',
  path: routes.connect(),
});

export default function ConnectPage() {
  return (
    <Page>
      <Container className="py-section" width="narrow">
        <SectionHeader
          eyebrow="Next Steps"
          title="Get Connected"
          description="Tell us what you're looking for, and someone from our team will follow up personally."
          size="lg"
        />
        <div className="mt-12">
          <ConnectForm />
        </div>
      </Container>
    </Page>
  );
}
