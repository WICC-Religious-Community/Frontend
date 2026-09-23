import Link from 'next/link';
import { Container, Page } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

export default function NotFound() {
  return (
    <Page tone="dark" className="bg-grain relative flex min-h-[70vh] flex-col items-center justify-center overflow-clip">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,var(--color-primary-tint-strong),transparent_65%)]"
      />
      <Container className="relative flex flex-col items-center text-center">
        <span className="text-highlight font-display text-display-2xl">404</span>
        <h1 className="font-display text-display-sm mt-2 uppercase text-on-dark">Page Not Found</h1>
        <p className="text-muted mt-4 max-w-md text-body-lg">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href={routes.home()}>Back to Home</Link>
        </Button>
      </Container>
    </Page>
  );
}
