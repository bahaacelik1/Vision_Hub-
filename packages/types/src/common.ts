export type ID = string;

export type Timestamp = string;

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type ApprovalStatus = 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'REJECTED';

export interface City {
  id: ID;
  name: string;
  country: string;
}

export interface University {
  id: ID;
  name: string;
  cityId: ID;
}
