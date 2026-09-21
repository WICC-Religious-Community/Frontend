/**
 * Typed route builders. Nothing in the app hand-builds a URL string for one
 * of these entities — import `routes.sermon(slug)` instead of writing
 * `/sermons/${slug}` again. Renaming a route segment means editing one line
 * here instead of grepping the whole tree.
 */
export const routes = {
  home: () => '/',
  about: () => '/about',
  whatWeBelieve: () => '/about/what-we-believe',
  leadership: () => '/leadership',
  leader: (slug: string) => `/leadership/${slug}`,
  sermons: () => '/sermons',
  sermon: (slug: string) => `/sermons/${slug}`,
  sermonSeries: (slug: string) => `/sermons/series/${slug}`,
  events: () => '/events',
  event: (slug: string) => `/events/${slug}`,
  ministries: () => '/ministries',
  ministry: (slug: string) => `/ministries/${slug}`,
  locations: () => '/locations',
  location: (slug: string) => `/locations/${slug}`,
  watch: () => '/watch',
  give: () => '/give',
  visit: () => '/visit',
  connect: () => '/connect',
  contact: () => '/contact',
  prayer: () => '/prayer',
  blog: () => '/blog',
  blogPost: (slug: string) => `/blog/${slug}`,
  page: (slug: string) => `/${slug}`,
} as const;
