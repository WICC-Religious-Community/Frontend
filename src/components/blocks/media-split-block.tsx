import { Container, Figure, SectionHeader, Split } from '@/components/primitives';

export function MediaSplitBlock({ data }: { data: Record<string, unknown> }) {
  const title = typeof data.title === 'string' ? data.title : '';
  const description = typeof data.description === 'string' ? data.description : undefined;
  const image = typeof data.image === 'string' ? data.image : undefined;
  const reverse = data.reverse === true;

  return (
    <Container className="py-section-sm">
      <Split reverse={reverse}>
        <SectionHeader title={title} description={description} />
        <Figure src={image} alt={title} width={700} height={500} className="aspect-[4/3]" />
      </Split>
    </Container>
  );
}
