import { Container, Prose } from '@/components/primitives';

export function RichTextBlock({ data }: { data: Record<string, unknown> }) {
  const html = typeof data.html === 'string' ? data.html : '';
  return (
    <Container className="py-section-sm" width="narrow">
      <Prose dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
}
