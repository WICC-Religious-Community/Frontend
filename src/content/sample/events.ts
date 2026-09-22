import type { EventItem } from '@/domain/events/model';

function inDays(days: number, hour = 9): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

/** Placeholder — see `src/content/sample/README.md`. */
export const sampleEvents: EventItem[] = [
  {
    id: 'event-1',
    slug: 'sunday-gathering',
    title: 'Sunday Gathering',
    description: 'Our weekly gathering for worship, teaching, and community.',
    startAt: inDays(3, 9),
    endAt: inDays(3, 11),
    locationName: 'Main Hall',
    capacity: 200,
    seatsTaken: 140,
  },
  {
    id: 'event-2',
    slug: 'community-night',
    title: 'Community Night',
    description: 'An evening of food, conversation, and connection for everyone.',
    startAt: inDays(9, 18),
    endAt: inDays(9, 20),
    locationName: 'Fellowship Hall',
    capacity: 80,
    seatsTaken: 32,
  },
  {
    id: 'event-3',
    slug: 'volunteer-orientation',
    title: 'Volunteer Orientation',
    description: 'A short session for anyone interested in serving on a team.',
    startAt: inDays(17, 10),
    locationName: 'Room 204',
  },
];
