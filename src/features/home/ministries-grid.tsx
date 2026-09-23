import { Container, Eyebrow, FeatureTiles } from '@/components/primitives';
import { routes } from '@/config/routes';
import type { Ministry } from '@/domain/ministries/model';

export function MinistriesGrid({ ministries }: { ministries: Ministry[] }) {
  if (ministries.length === 0) return null;

  return (
    <Container>
      <Eyebrow>Get Involved</Eyebrow>
      <p className="font-display text-display-sm mt-4 max-w-xl font-semibold text-ink">Find your place</p>
      <div className="mt-10">
        <FeatureTiles
          featureFirst
          items={ministries.map(ministry => ({
            id: ministry.id,
            href: routes.ministry(ministry.slug),
            title: ministry.name,
            summary: ministry.summary,
            imageUrl: ministry.coverUrl,
          }))}
        />
      </div>
    </Container>
  );
}
