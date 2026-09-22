import type { Ministry } from '@/domain/ministries/model';
import { unsplash } from './media';

/** Placeholder — see `src/content/sample/README.md`. */
export const sampleMinistries: Ministry[] = [
  {
    id: 'ministry-1',
    slug: 'youth',
    name: 'Youth Ministry',
    summary: 'A place for students to grow in faith and friendship.',
    coverUrl: unsplash('1544928938-6852c1925194', 800),
    meetingSchedule: 'Fridays, 6:30 PM',
  },
  {
    id: 'ministry-2',
    slug: 'children',
    name: "Children's Ministry",
    summary: 'Age-appropriate teaching and activities during every service.',
    coverUrl: unsplash('1560220604-1985ebfe28b1', 800),
    meetingSchedule: 'Sundays, during service',
  },
  {
    id: 'ministry-3',
    slug: 'worship',
    name: 'Worship Team',
    summary: 'Musicians and vocalists leading the church in worship.',
    coverUrl: unsplash('1508829040592-72f179f8a73f', 800),
    meetingSchedule: 'Thursdays, 7:00 PM',
  },
  {
    id: 'ministry-4',
    slug: 'outreach',
    name: 'Outreach & Missions',
    summary: 'Serving our neighbors and supporting missions locally and abroad.',
    coverUrl: unsplash('1593113616828-6f22bca04804', 800),
  },
  {
    id: 'ministry-5',
    slug: 'small-groups',
    name: 'Small Groups',
    summary: 'Smaller circles for prayer, study, and real friendship.',
    coverUrl: unsplash('1628717341663-0007b0ee2597', 800),
  },
];
