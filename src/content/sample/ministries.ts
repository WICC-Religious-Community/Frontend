import type { Ministry } from '@/domain/ministries/model';

/** Placeholder — see `src/content/sample/README.md`. */
export const sampleMinistries: Ministry[] = [
  {
    id: 'ministry-1',
    slug: 'youth',
    name: 'Youth Ministry',
    summary: 'A place for students to grow in faith and friendship.',
    meetingSchedule: 'Fridays, 6:30 PM',
  },
  {
    id: 'ministry-2',
    slug: 'children',
    name: "Children's Ministry",
    summary: 'Age-appropriate teaching and activities during every service.',
    meetingSchedule: 'Sundays, during service',
  },
  {
    id: 'ministry-3',
    slug: 'worship',
    name: 'Worship Team',
    summary: 'Musicians and vocalists leading the church in worship.',
    meetingSchedule: 'Thursdays, 7:00 PM',
  },
  {
    id: 'ministry-4',
    slug: 'outreach',
    name: 'Outreach & Missions',
    summary: 'Serving our neighbors and supporting missions locally and abroad.',
  },
  {
    id: 'ministry-5',
    slug: 'small-groups',
    name: 'Small Groups',
    summary: 'Smaller circles for prayer, study, and real friendship.',
  },
];
