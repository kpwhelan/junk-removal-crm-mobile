

import { CreateCustomerRequest } from './customer';

export enum JobStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  EN_ROUTE = 'en_route',
  ON_SITE = 'on_site',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export type Job = {
  id: number;
  customerId: number;
  title: string;
  description?: string | null;
  status: JobStatus;
  scheduledDate?: string | null;
  streetAddress: string;
  city: string;
  state: string;
  quotedPrice?: number | null;
  finalPrice?: number | null;
  notes?: string | null;
  leadSource?: string | null;
};

type JobRequestFields = {
  title: string;
  description?: string;
  status: JobStatus;
  scheduledDate?: string;
  streetAddress: string;
  city: string;
  state: string;
  quotedPrice?: number;
  finalPrice?: number;
  notes?: string;
  leadSource?: string;
};

export type CreateJobRequest =
  | (JobRequestFields & {
      customerId: number;
    })
  | (JobRequestFields & {
      customer: CreateCustomerRequest;
    });