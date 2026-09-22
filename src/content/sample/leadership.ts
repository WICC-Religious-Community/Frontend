import type { Leader } from '@/domain/leadership/model';
import { unsplash } from './media';

/** Placeholder — see `src/content/sample/README.md`. Not real WICC staff. */
export const sampleLeaders: Leader[] = [
  { id: 'leader-1', slug: 'sample-lead-pastor', name: 'Sample Lead Pastor', role: 'Lead Pastor', bio: 'Leads the church in vision, teaching, and pastoral care.', photoUrl: unsplash('1500648767791-00dcc994a43e', 600) },
  { id: 'leader-2', slug: 'sample-associate-pastor', name: 'Sample Associate Pastor', role: 'Associate Pastor', bio: 'Oversees discipleship and small groups.', photoUrl: unsplash('1506863530036-1efeddceb993', 600) },
  { id: 'leader-3', slug: 'sample-worship-director', name: 'Sample Worship Director', role: 'Worship Director', bio: 'Leads the worship team and creative ministries.', photoUrl: unsplash('1507003211169-0a1dd7228f2d', 600) },
  { id: 'leader-4', slug: 'sample-youth-pastor', name: 'Sample Youth Pastor', role: 'Youth Pastor', bio: 'Shepherds the youth ministry.', photoUrl: unsplash('1494790108377-be9c29b29330', 600) },
];
