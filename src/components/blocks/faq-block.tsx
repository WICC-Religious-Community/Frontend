import { Container } from '@/components/primitives';

interface FaqItem {
  question: string;
  answer: string;
}

function isFaqItem(value: unknown): value is FaqItem {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as FaqItem).question === 'string' &&
    typeof (value as FaqItem).answer === 'string'
  );
}

export function FaqBlock({ data }: { data: Record<string, unknown> }) {
  const items = Array.isArray(data.items) ? data.items.filter(isFaqItem) : [];
  if (items.length === 0) return null;

  return (
    <Container className="py-section-sm" width="narrow">
      <div className="divide-border divide-y">
        {items.map(item => (
          <details key={item.question} className="group py-5">
            <summary className="text-ink flex cursor-pointer list-none items-center justify-between text-body-lg font-medium">
              {item.question}
              <span className="text-subtle transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="text-muted mt-3 text-body-sm leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
