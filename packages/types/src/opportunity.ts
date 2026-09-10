import type { ID, Timestamp, ApprovalStatus } from './common';

export type OpportunityType = 'INTERNSHIP' | 'JOB' | 'SCHOLARSHIP' | 'COMPETITION' | 'OTHER';

export interface Opportunity {
  id: ID;
  title: string;
  type: OpportunityType;
  companyId: ID;
  description: string;
  requirements?: string;
  location?: string;
  remote: boolean;
  deadline?: Timestamp;
  status: ApprovalStatus;
  createdAt: Timestamp;
}

export interface Application {
  id: ID;
  opportunityId: ID;
  userId: ID;
  status: 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED';
  submittedAt: Timestamp;
}
