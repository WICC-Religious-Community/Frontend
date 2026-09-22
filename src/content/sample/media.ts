/**
 * Placeholder — see `README.md`. Stock photography (Unsplash) and a CC0
 * sample clip (MDN), standing in for real church photography/video until
 * a real API/CMS is connected. `next.config.ts` allow-lists both hosts.
 */
export function unsplash(id: string, width: number): string {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;
}

/**
 * A real worship recording (West Point Band with the Tabernacle Choir,
 * "Battle Hymn of the Republic"), CC BY 3.0, Wikimedia Commons — the 480p
 * transcode (~28MB) rather than the 74MB original, since this autoplays.
 */
export const SAMPLE_HERO_VIDEO_URL =
  'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f4/%22Battle_Hymn_of_the_Republic%22_w-_the_Mormon_Tabernacle_Choir_LIVE_from_West_Point_-_West_Point_Band.webm/%22Battle_Hymn_of_the_Republic%22_w-_the_Mormon_Tabernacle_Choir_LIVE_from_West_Point_-_West_Point_Band.webm.480p.vp9.webm';
