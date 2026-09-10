import type { ID, Timestamp, ApprovalStatus } from './common';

export type EventCategory =
  | 'CAMP_NATURE'
  | 'SPORTS'
  | 'TRIP'
  | 'CONCERT'
  | 'CINEMA'
  | 'THEATER'
  | 'GAME'
  | 'MEETUP'
  | 'TREKKING'
  | 'CYCLING'
  | 'ARTS_CULTURE'
  | 'SOCIAL_RESPONSIBILITY'
  | 'INTER_UNIVERSITY';

export type EventOwnerType = 'VISION_CENTER' | 'UNIVERSITY_REP' | 'STUDENT';

export interface VisionEvent {
  id: ID;
  title: string;
  category: EventCategory;
  ownerType: EventOwnerType;
  ownerId: ID;
  description: string;
  startsAt: Timestamp;
  endsAt?: Timestamp;
  cityId: ID;
  location: string;
  meetingPoint?: string;
  capacity?: number;
  attendeesCount: number;
  price?: number;
  requirements?: string;
  program?: string;
  status: ApprovalStatus;
  waitlistEnabled: boolean;
  createdAt: Timestamp;
}

export interface EventAttendance {
  id: ID;
  eventId: ID;
  userId: ID;
  state: 'REGISTERED' | 'WAITLIST' | 'CANCELLED' | 'ATTENDED';
  registeredAt: Timestamp;
}

export interface Team {
  id: ID;
  name: string;
  captainId: ID;
  eventId?: ID;
  capacity: number;
  memberIds: ID[];
}
