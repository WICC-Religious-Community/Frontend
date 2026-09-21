import type { EventItem } from './model';

function daysFromNow(days: number, hour = 9): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

export const eventsFixture: EventItem[] = [
  {
    id: 'evt_1',
    slug: 'foundation-class',
    title: 'Foundation Class',
    description: 'A four-week class for anyone new to WICC or the Christian faith — doctrine, identity, and how to grow.',
    startAt: daysFromNow(3, 10),
    endAt: daysFromNow(3, 12),
    locationName: 'Main Auditorium',
    capacity: 80,
    seatsTaken: 57,
    registerUrl: '/visit',
  },
  {
    id: 'evt_2',
    slug: 'spirit-and-power-conference',
    title: 'Spirit & Power Conference',
    description: 'Three nights of worship, the Word, and prayer — open to everyone.',
    startAt: daysFromNow(14, 18),
    endAt: daysFromNow(16, 21),
    locationName: 'Main Auditorium',
    coverUrl: undefined,
    capacity: 500,
    seatsTaken: 412,
    registerUrl: 'https://forms.gle/example',
  },
  {
    id: 'evt_3',
    slug: 'community-outreach',
    title: 'Community Outreach Day',
    description: 'Serving our neighborhood with food, clothing, and prayer.',
    startAt: daysFromNow(21, 8),
    locationName: 'Church Car Park',
    capacity: null,
    seatsTaken: null,
    registerUrl: '/connect',
  },
  {
    id: 'evt_4',
    slug: 'marriage-enrichment-night',
    title: 'Marriage Enrichment Night',
    description: 'An evening for couples — teaching, dinner, and renewal of vows.',
    startAt: daysFromNow(30, 17),
    endAt: daysFromNow(30, 20),
    locationName: 'Fellowship Hall',
    capacity: 120,
    seatsTaken: 44,
    registerUrl: '/events/marriage-enrichment-night',
  },
  {
    id: 'evt_5',
    slug: 'young-adults-hangout',
    title: 'Young Adults Hangout',
    description: 'Games, food, and real conversation for young adults.',
    startAt: daysFromNow(-10, 17),
    endAt: daysFromNow(-10, 20),
    locationName: 'Youth Center',
    capacity: 60,
    seatsTaken: 60,
    registerUrl: null,
  },
];
