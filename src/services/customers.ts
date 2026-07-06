import { api } from '@/src/api/client';
import {
  CreateCustomerRequest,
  Customer,
} from '@/src/types/customer';

export async function getCustomers(): Promise<Customer[]> {
  const response = await api.get<Customer[]>('/customers');

  return response.data;
}

export async function createCustomer(
  dto: CreateCustomerRequest
): Promise<Customer> {
  const response = await api.post<Customer>('/customers', dto);

  return response.data;
}