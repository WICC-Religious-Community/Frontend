/**
 * Centralised TanStack Query keys. Every `domain/*/client.ts` hook builds its
 * key here instead of inlining an array literal — keeps invalidation
 * (`queryClient.invalidateQueries`) and the live-sync layer (`lib/live`)
 * pointed at the exact same keys the components read.
 */
export const queryKeys = {
  siteSettings: () => ['site-settings'] as const,
  serviceStatus: () => ['service-status'] as const,
  sermons: (filters?: Record<string, unknown>) => ['sermons', filters ?? {}] as const,
  sermon: (slug: string) => ['sermons', slug] as const,
  sermonSeriesList: () => ['sermon-series'] as const,
  sermonSeries: (slug: string) => ['sermon-series', slug] as const,
  events: (filters?: Record<string, unknown>) => ['events', filters ?? {}] as const,
  event: (slug: string) => ['events', slug] as const,
  eventAvailability: (id: string) => ['events', id, 'availability'] as const,
  ministries: () => ['ministries'] as const,
  ministry: (slug: string) => ['ministries', slug] as const,
  leaders: () => ['leaders'] as const,
  leader: (slug: string) => ['leaders', slug] as const,
  locations: () => ['locations'] as const,
  location: (slug: string) => ['locations', slug] as const,
  blogPosts: (filters?: Record<string, unknown>) => ['blog-posts', filters ?? {}] as const,
  blogPost: (slug: string) => ['blog-posts', slug] as const,
  testimonials: () => ['testimonials'] as const,
  givingAccounts: () => ['giving-accounts'] as const,
  givingCampaigns: () => ['giving-campaigns'] as const,
  page: (slug: string) => ['pages', slug] as const,
} as const;
