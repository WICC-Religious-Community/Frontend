import Link from 'next/link';
import { Container, SectionHeader } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

export function GivingCta() {
  return (
    <Container className="text-center">
      <SectionHeader
        eyebrow="Generosity"
        title="Give to WICC"
        size="md"
        align="center"
      />
      <div className="mt-8 flex justify-center">
        <Button asChild size="lg">
          <Link href={routes.give()}>Give Now</Link>
        </Button>
      </div>
    </Container>
  );
}
