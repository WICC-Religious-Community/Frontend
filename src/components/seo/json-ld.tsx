/** Renders one JSON-LD graph. The one place `dangerouslySetInnerHTML` is used for structured data. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    // static, server-generated JSON-LD only
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
