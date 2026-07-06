import { z } from 'zod';
import { JobStatus } from '@/src/types/job';

const createJobSchema = z.object({
  title: z.string().min(1, 'Please add a title'),
  description: z.string().optional(),
  status: z.enum(JobStatus),
  scheduledDate: z.string().optional(),
  streetAddress: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  quotedPrice: z.preprocess(
  (value) => (value === '' ? undefined : value),
  z.coerce.number().optional()
),
  finalPrice: z.preprocess(
  (value) => (value === '' ? undefined : value),
  z.coerce.number().optional()
),
  notes: z.string().optional(),
  leadSource: z.string().optional()
});

const existingCustomerJobSchema = z.object({
  customerMode: z.literal('existing'),
  customerId: z.coerce.number().min(1, 'Please select a customer'),
  job: createJobSchema,
});

const newCustomerJobSchema = z.object({
  customerMode: z.literal('new'),

  customer: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    phoneNumber: z.string().optional(),
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    notes: z.string().optional(),
  }),

  job: createJobSchema,
});

export const createJobFormSchema = z.discriminatedUnion('customerMode', [
  existingCustomerJobSchema,
  newCustomerJobSchema,
]);

export type CreateJobFormValues = z.infer<typeof createJobFormSchema>;
