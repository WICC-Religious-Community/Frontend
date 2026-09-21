import type { Location } from './model';

export const locationsFixture: Location[] = [
  {
    id: 'loc_1',
    slug: 'lekki-main',
    name: 'WICC — Lekki (Main Campus)',
    isMain: true,
    address: { streetAddress: '14 Grace Avenue', locality: 'Lekki, Lagos', region: 'Lagos', country: 'NG' },
    phone: '+234 706 999 5333',
    serviceTimes: [
      { dayOfWeek: ['Sunday'], opens: '09:00', closes: '11:00', label: 'Sunday Worship' },
      { dayOfWeek: ['Wednesday'], opens: '18:00', closes: '19:30', label: 'Midweek Bible Study' },
    ],
  },
  {
    id: 'loc_2',
    slug: 'ikeja',
    name: 'WICC — Ikeja',
    address: { streetAddress: '22 Opebi Road', locality: 'Ikeja, Lagos', region: 'Lagos', country: 'NG' },
    serviceTimes: [{ dayOfWeek: ['Sunday'], opens: '09:00', closes: '11:00', label: 'Sunday Worship' }],
  },
  {
    id: 'loc_3',
    slug: 'abuja',
    name: 'WICC — Abuja',
    address: { streetAddress: '5 Aso Drive', locality: 'Abuja', region: 'FCT', country: 'NG' },
    serviceTimes: [{ dayOfWeek: ['Sunday'], opens: '09:00', closes: '11:00', label: 'Sunday Worship' }],
  },
];
