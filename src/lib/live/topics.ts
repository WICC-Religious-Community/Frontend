/**
 * Every real-time topic the app knows about, in one place. Adding a new live
 * feature means adding one line here plus a small hook in `use-live.ts` — not
 * a new transport.
 */
export const LiveTopic = {
  serviceStatus: () => 'service-status',
  testimonials: () => 'testimonials',
  eventAvailability: (eventId: string) => `event-availability:${eventId}`,
  givingCampaign: (campaignId: string) => `giving-campaign:${campaignId}`,
} as const;
