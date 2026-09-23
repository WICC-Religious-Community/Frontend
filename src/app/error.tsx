'use client';

import { useEffect } from 'react';
import { Container, Page } from '@/components/primitives';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Page tone="dark" className="bg-grain relative flex min-h-[70vh] flex-col items-center justify-center overflow-clip">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,var(--color-primary-tint-strong),transparent_65%)]"
      />
      <Container className="relative flex flex-col items-center text-center">
        <h1 className="font-display text-display-sm uppercase text-on-dark">Something Went Wrong</h1>
        <p className="text-muted mt-4 max-w-md text-body-lg">
          We hit an unexpected error. Please try again — if this keeps happening, let us know.
        </p>
        <Button onClick={reset} size="lg" className="mt-10">
          Try Again
        </Button>
      </Container>
    </Page>
  );
}
