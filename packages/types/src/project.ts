import type { ID, Timestamp, ApprovalStatus } from './common';

export interface Project {
  id: ID;
  title: string;
  ownerId: ID;
  ownerType: 'COMPANY' | 'UNIVERSITY' | 'STUDENT';
  description: string;
  tags: string[];
  status: ApprovalStatus;
  memberIds: ID[];
  createdAt: Timestamp;
}
