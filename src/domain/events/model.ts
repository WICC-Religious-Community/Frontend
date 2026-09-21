export interface EventItem {
  id: string;
  slug: string;
  title: string;
  description?: string;
  startAt: string;
  endAt?: string;
  isOnline?: boolean;
  locationName?: string;
  coverUrl?: string;
  registerUrl?: string | null;
  capacity?: number | null;
  seatsTaken?: number | null;
  ministrySlug?: string | null;
}

export interface EventFilters {
  view?: 'upcoming' | 'past' | 'all';
  ministry?: string;
  cursor?: string;
  limit?: number;
}

export interface EventAvailability {
  eventId: string;
  capacity: number | null;
  seatsTaken: number | null;
}

export function seatsRemaining(event: Pick<EventItem, 'capacity' | 'seatsTaken'>): number | null {
  if (event.capacity == null || event.seatsTaken == null) return null;
  return Math.max(0, event.capacity - event.seatsTaken);
}
