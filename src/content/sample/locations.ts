import type { Location } from '@/domain/locations/model';
import { unsplash } from './media';

/** Placeholder — see `src/content/sample/README.md`. Not a real WICC address. */
export const sampleLocations: Location[] = [
  {
    id: 'location-1',
    slug: 'main-campus',
    name: 'Main Campus',
    isMain: true,
    address: { streetAddress: '123 Example Avenue', locality: 'Sample City', region: 'ST', country: 'US' },
    phone: '+1 (555) 010-0100',
    coverUrl: unsplash('1522158637959-30385a09e0da', 800),
    serviceTimes: [{ label: 'Sunday Gathering', dayOfWeek: ['Sunday'], opens: '09:00', closes: '11:00' }],
  },
  {
    id: 'location-2',
    slug: 'north-campus',
    name: 'North Campus',
    address: { streetAddress: '456 Placeholder Road', locality: 'Sample City', region: 'ST', country: 'US' },
    coverUrl: unsplash('1570786032462-2efc3ca8fccd', 800),
    serviceTimes: [{ label: 'Sunday Gathering', dayOfWeek: ['Sunday'], opens: '10:00', closes: '12:00' }],
  },
];
