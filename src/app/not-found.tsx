import Link from 'next/link';
import { Container, Page } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

export default function NotFound() {
  return (
    <Page>
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-section text-center">
        <p className="text-primary font-display text-display-lg font-semibold">404</p>
        <h1 className="font-display mt-4 text-heading-lg font-semibold text-ink">Page not found</h1>
        <p className="text-muted mt-3 max-w-md text-body-sm">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Button asChild className="mt-8">
          <Link href={routes.home()}>Back to Home</Link>
        </Button>
      </Container>
    </Page>
  );
}
