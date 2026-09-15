import { Container, Figure } from '@/components/primitives';

export function GalleryBlock({ data }: { data: Record<string, unknown> }) {
  const images = Array.isArray(data.images) ? data.images.filter((item): item is string => typeof item === 'string') : [];
  if (images.length === 0) return null;

  return (
    <Container className="py-section-sm">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map(image => (
          <Figure key={image} src={image} alt="" width={400} height={400} className="aspect-square" />
        ))}
      </div>
    </Container>
  );
}
