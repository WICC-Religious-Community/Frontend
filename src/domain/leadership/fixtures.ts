import type { Leader } from './model';

export const leadersFixture: Leader[] = [
  {
    id: 'ldr_1',
    slug: 'daniel-adeyemi',
    name: 'Pastor Daniel Adeyemi',
    role: 'Senior Pastor',
    bio: 'Pastor Daniel has led WICC for over a decade, with a passion for practical, Christ-centered teaching and raising leaders.',
    order: 1,
  },
  {
    id: 'ldr_2',
    slug: 'grace-adeyemi',
    name: 'Pastor Grace Adeyemi',
    role: 'Co-Pastor',
    bio: 'Pastor Grace leads with a heart for discipleship, mentorship, and the health of the church family.',
    order: 2,
  },
  {
    id: 'ldr_3',
    slug: 'victor-jimba',
    name: 'Rev. Victor Jimba',
    role: 'Resident Pastor',
    bio: 'Rev. Victor oversees pastoral care and church operations, walking closely with members through every season of life.',
    order: 3,
  },
  {
    id: 'ldr_4',
    slug: 'michael-osei',
    name: 'Deacon Michael Osei',
    role: "Men's Ministry Lead",
    bio: 'Deacon Michael leads the Men\'s Ministry, building brotherhood and accountability among the men of WICC.',
    order: 4,
  },
  {
    id: 'ldr_5',
    slug: 'tolu-bankole',
    name: 'Minister Tolu Bankole',
    role: 'Youth Pastor',
    bio: 'Minister Tolu shepherds the next generation, helping teenagers encounter God and discover their purpose.',
    order: 5,
  },
];
