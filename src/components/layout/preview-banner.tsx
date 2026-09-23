/**
 * Renders only while `NEXT_PUBLIC_API_URL` is unset — makes it visually
 * unmistakable that the page is showing placeholder content
 * (`src/content/sample/`), not real WICC information. Disappears the
 * moment a real API is configured.
 */
export function PreviewBanner() {
  return (
    <div className="bg-primary text-on-primary flex items-center justify-center gap-2 px-4 py-2 text-center text-caption font-semibold">
      Preview build — showing sample content, not connected to a live backend
    </div>
  );
}
