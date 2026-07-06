export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email?: string | null;
  phoneNumber?: string | null;
  streetAddress?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  notes?: string | null;
};

export type CreateCustomerRequest = {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  notes?: string;
};