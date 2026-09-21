/** Renders one JSON-LD graph. The one place `dangerouslySetInnerHTML` is used for structured data. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    // eslint-disable-next-line react/no-danger -- static, server-generated JSON-LD only
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
