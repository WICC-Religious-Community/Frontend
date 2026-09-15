import { Container, SectionHeader } from '@/components/primitives';

export function HeroBlock({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="on-dark bg-dark py-section">
      <Container className="text-center">
        <SectionHeader
          eyebrow={typeof data.eyebrow === 'string' ? data.eyebrow : undefined}
          title={typeof data.title === 'string' ? data.title : ''}
          description={typeof data.description === 'string' ? data.description : undefined}
          size="lg"
          align="center"
        />
      </Container>
    </div>
  );
}
