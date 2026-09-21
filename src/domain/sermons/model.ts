export interface Speaker {
  id: string;
  name: string;
  photoUrl?: string;
}

export interface SermonSeries {
  id: string;
  slug: string;
  title: string;
  description?: string;
  coverUrl?: string;
  sermonCount?: number;
}

export interface Sermon {
  id: string;
  slug: string;
  title: string;
  description?: string;
  speaker?: Speaker;
  series?: SermonSeries;
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
  publishedAt: string;
  durationSeconds?: number;
  scripture: string[];
  topics: string[];
}

export interface SermonFilters {
  series?: string;
  speaker?: string;
  q?: string;
  cursor?: string;
  limit?: number;
}
