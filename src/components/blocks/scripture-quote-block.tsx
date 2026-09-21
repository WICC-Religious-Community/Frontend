import { Container } from '@/components/primitives';

export function ScriptureQuoteBlock({ data }: { data: Record<string, unknown> }) {
  const text = typeof data.text === 'string' ? data.text : '';
  const reference = typeof data.reference === 'string' ? data.reference : '';

  return (
    <Container className="py-section-sm text-center" width="narrow">
      <blockquote className="font-display text-heading-lg italic text-ink">“{text}”</blockquote>
      {reference ? <p className="text-primary-dark mt-4 text-body-sm font-semibold">{reference}</p> : null}
    </Container>
  );
}
