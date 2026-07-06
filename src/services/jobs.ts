import { api } from '@/src/api/client';
import { CreateJobRequest, Job } from '@/src/types/job';

function removeEmptyStrings<T extends Record<string, any>>(data: T): T {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== '')
  ) as T;
}

export async function createJob(dto: CreateJobRequest): Promise<Job> {
  const cleanedDto = removeEmptyStrings(dto);

  console.log('Create job payload:', cleanedDto);

  const response = await api.post<Job>('/jobs', cleanedDto);

  return response.data;
}