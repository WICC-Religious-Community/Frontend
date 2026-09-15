'use client';

import { useEffect } from 'react';
import { Container, Page } from '@/components/primitives';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Page>
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-section text-center">
        <h1 className="font-display text-heading-lg font-semibold text-ink">Something went wrong</h1>
        <p className="text-muted mt-3 max-w-md text-body-sm">
          We hit an unexpected error. Please try again — if this keeps happening, let us know.
        </p>
        <Button onClick={reset} className="mt-8">
          Try again
        </Button>
      </Container>
    </Page>
  );
}
