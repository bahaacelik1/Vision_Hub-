import type { ID, Timestamp } from './common';

export type UserRole = 'STUDENT' | 'COMPANY' | 'UNIVERSITY_REP' | 'ADMIN';

export interface User {
  id: ID;
  email: string;
  role: UserRole;
  createdAt: Timestamp;
}

/**
 * Ortak profil — Hub ve Social iki tarafta da kullanılır.
 * Alanlar iki alanın da beslediği tek bir kimlik oluşturur.
 */
export interface Profile {
  userId: ID;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  universityId?: ID;
  department?: string;
  cityId?: ID;
  interests: string[];
  skills: string[];
  hubStats?: HubProfileStats;
  socialStats?: SocialProfileStats;
}

export interface HubProfileStats {
  applications: number;
  projects: number;
  academyProgress: number;
}

export interface SocialProfileStats {
  attendedEvents: number;
  createdEvents: number;
  teams: number;
}
