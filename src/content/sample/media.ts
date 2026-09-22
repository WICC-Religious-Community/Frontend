/**
 * Placeholder — see `README.md`. Stock photography (Unsplash) and a CC0
 * sample clip (MDN), standing in for real church photography/video until
 * a real API/CMS is connected. `next.config.ts` allow-lists both hosts.
 */
export function unsplash(id: string, width: number): string {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;
}

export const SAMPLE_HERO_VIDEO_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
