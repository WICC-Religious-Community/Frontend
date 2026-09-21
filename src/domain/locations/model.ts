import type { Address, ServiceTime } from '@/domain/site/model';

export interface Location {
  id: string;
  slug: string;
  name: string;
  isMain?: boolean;
  address?: Address;
  phone?: string;
  coverUrl?: string;
  serviceTimes: ServiceTime[];
}
