import { fetchContent } from "@/lib/content/client";
import type { EventEntry } from "@/lib/content/types";

export function getUpcomingEvents(): Promise<EventEntry[]> {
  return fetchContent<EventEntry[]>("/events?upcoming=true", { tags: ["events"] });
}

export function getEventBySlug(slug: string): Promise<EventEntry> {
  return fetchContent<EventEntry>(`/events/${slug}`, { tags: [`event:${slug}`] });
}
