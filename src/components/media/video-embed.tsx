export function VideoEmbed({ src, title }: { src?: string; title: string }) {
  if (!src) {
    return (
      <div className="bg-surface-sunken text-subtle flex aspect-video items-center justify-center rounded-lg text-body-sm">
        Video coming soon
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
