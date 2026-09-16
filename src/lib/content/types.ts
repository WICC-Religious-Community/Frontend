export interface ContentEntry {
  id: string;
  slug: string;
  updatedAt: string;
}

export interface EventEntry extends ContentEntry {
  title: string;
  description: string;
  /** ISO 8601 */
  startsAt: string;
  /** ISO 8601 */
  endsAt?: string;
  location?: string;
}

export interface NewsletterSubscription {
  email: string;
}
