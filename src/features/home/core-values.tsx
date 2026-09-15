import { Container, Reveal, SectionHeader } from '@/components/primitives';

const VALUES = [
  {
    title: 'Love',
    body: 'A theology centered on the love of God — the foundation for everything we preach and practice.',
  },
  {
    title: 'Life',
    body: 'Real community — relationships that walk with you through every season, not just Sunday.',
  },
  {
    title: 'Impact',
    body: 'Faith that moves — in our families, our city, and beyond, through service and generosity.',
  },
] as const;

export function CoreValues() {
  return (
    <Container>
      <SectionHeader
        eyebrow="What We're About"
        title="Grace, life, and purpose"
        description="Three convictions that shape everything we do as a church."
        size="sm"
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {VALUES.map((value, index) => (
          <Reveal key={value.title} delay={index * 0.08}>
            <div className="border-border h-full rounded-lg border p-8">
              <span className="text-primary font-display text-display-sm font-semibold">
                0{index + 1}
              </span>
              <h3 className="font-display mt-4 text-heading-md font-semibold text-ink">{value.title}</h3>
              <p className="text-muted mt-3 text-body-sm leading-relaxed">{value.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
