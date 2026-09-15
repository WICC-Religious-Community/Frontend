import type { Ministry } from './model';

export const ministriesFixture: Ministry[] = [
  {
    id: 'min_1',
    slug: 'women',
    name: "Women's Ministry",
    summary: 'Rooted in Christ, prepared for every sphere — Bible study, fellowship, and outreach for women.',
    descriptionHtml:
      '<p>Our Women\'s Ministry exists to disciple, encourage, and equip women to walk boldly in their God-given purpose through Bible study, mentorship, and community.</p>',
    meetingSchedule: 'Second Saturday of every month, 10:00 AM',
    leader: { id: 'ldr_2', name: 'Pastor Grace Adeyemi' },
  },
  {
    id: 'min_2',
    slug: 'men',
    name: "Men's Ministry",
    summary: 'Building strong Christian men through discipleship and accountability.',
    descriptionHtml:
      '<p>We exist to raise men of integrity, character, and conviction — through brotherhood, mentorship, and the Word.</p>',
    meetingSchedule: 'First Saturday of every month, 7:00 AM',
    leader: { id: 'ldr_4', name: 'Deacon Michael Osei' },
  },
  {
    id: 'min_3',
    slug: 'youth',
    name: 'Youth Ministry',
    summary: 'Helping the next generation encounter God and discover their purpose.',
    descriptionHtml: '<p>A safe, vibrant space for teenagers to grow in faith, friendship, and identity in Christ.</p>',
    meetingSchedule: 'Sundays, 9:00 AM (during main service)',
    leader: { id: 'ldr_5', name: 'Minister Tolu Bankole' },
  },
  {
    id: 'min_4',
    slug: 'children',
    name: "Children's Ministry",
    summary: 'Creating engaging, safe environments for children to learn about God.',
    descriptionHtml: '<p>Age-appropriate teaching, worship, and activities that make God\'s Word come alive for kids.</p>',
    meetingSchedule: 'Sundays, 9:00 AM and 11:00 AM',
  },
  {
    id: 'min_5',
    slug: 'outreach-missions',
    name: 'Outreach & Missions',
    summary: 'Taking the gospel and practical love beyond our walls.',
    descriptionHtml: '<p>Community outreach, missions support, and evangelism initiatives throughout the year.</p>',
    meetingSchedule: 'Quarterly outreach Saturdays',
  },
  {
    id: 'min_6',
    slug: 'prayer',
    name: 'Prayer Ministry',
    summary: 'A community devoted to intercession and the power of prayer.',
    descriptionHtml: '<p>We gather to pray for our church, city, and nation, and to grow together in a life of prayer.</p>',
    meetingSchedule: 'Fridays, 6:00 PM',
  },
];
