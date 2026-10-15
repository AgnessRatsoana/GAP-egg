export type UserRole = 'public' | 'beneficiary' | 'admin';

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'declined';

export interface ApiError {
  code: string;
  message: string;
  requestId?: string;
}

export interface HealthStatus {
  status: 'ok';
  service: string;
  version: string;
  timestamp: string;
}

export interface ApplicationSummary {
  id: string;
  status: ApplicationStatus;
  submittedAt?: string;
  updatedAt: string;
}
