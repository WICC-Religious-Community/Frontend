export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  contentHtml?: string;
  coverUrl?: string;
  authorName?: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
}

export interface BlogFilters {
  tag?: string;
  cursor?: string;
  limit?: number;
}
