import { Container, Grid, SectionHeader } from '@/components/primitives';

interface CardItem {
  title: string;
  body?: string;
}

function isCardItem(value: unknown): value is CardItem {
  return typeof value === 'object' && value !== null && typeof (value as CardItem).title === 'string';
}

export function CardGridBlock({ data }: { data: Record<string, unknown> }) {
  const title = typeof data.title === 'string' ? data.title : undefined;
  const items = Array.isArray(data.items) ? data.items.filter(isCardItem) : [];

  return (
    <Container className="py-section-sm">
      {title ? <SectionHeader title={title} size="sm" align="center" /> : null}
      <Grid columns={3} className="mt-10">
        {items.map(item => (
          <div key={item.title} className="border-border border-t-primary group border-t-2 pt-5 transition-colors">
            <h3 className="font-display text-heading-sm uppercase text-ink">{item.title}</h3>
            {item.body ? <p className="text-muted mt-2 text-body-sm leading-relaxed">{item.body}</p> : null}
          </div>
        ))}
      </Grid>
    </Container>
  );
}
