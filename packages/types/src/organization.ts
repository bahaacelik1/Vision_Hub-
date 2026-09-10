import type { ID, Timestamp } from './common';

export interface Company {
  id: ID;
  name: string;
  logoUrl?: string;
  website?: string;
  description?: string;
  verified: boolean;
  createdAt: Timestamp;
}

export interface UniversityRepresentative {
  id: ID;
  userId: ID;
  universityId: ID;
  approvedAt?: Timestamp;
}
