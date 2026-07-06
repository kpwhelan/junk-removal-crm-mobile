import { useState } from 'react';
import {
  Button,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createJobFormSchema,
  CreateJobFormValues,
} from '@/src/forms/jobs/createJobSchema';
import { JobStatus } from '@/src/types/job';

type CreateJobFormProps = {
  onSubmit: (values: CreateJobFormValues) => Promise<void>;
};

export default function CreateJobForm({ onSubmit }: CreateJobFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createJobFormSchema),
    defaultValues: {
      customerMode: 'existing',
      customerId: '',
      customer: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        notes: '',
      },
      job: {
        title: '',
        description: '',
        status: JobStatus.SCHEDULED,
        scheduledDate: '',
        streetAddress: '',
        city: '',
        state: '',
        quotedPrice: '',
        finalPrice: '',
        notes: '',
        leadSource: '',
      },
    },
  });

  const customerMode = watch('customerMode');

  const handleFormSubmit = async (values: CreateJobFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Create Job</Text>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable
          onPress={() => setValue('customerMode', 'existing')}
          style={{
            flex: 1,
            padding: 12,
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor:
              customerMode === 'existing' ? '#ddd' : 'transparent',
          }}
        >
          <Text style={{ textAlign: 'center' }}>Existing Customer</Text>
        </Pressable>

        <Pressable
          onPress={() => setValue('customerMode', 'new')}
          style={{
            flex: 1,
            padding: 12,
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: customerMode === 'new' ? '#ddd' : 'transparent',
          }}
        >
          <Text style={{ textAlign: 'center' }}>New Customer</Text>
        </Pressable>
      </View>

      {customerMode === 'existing' && (
        <View>
          <Text>Customer ID</Text>

          <Controller
            control={control}
            name="customerId"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value ? String(value) : ''}
                onChangeText={onChange}
                placeholder="Select customer ID for now"
                keyboardType="numeric"
                style={inputStyle}
              />
            )}
          />

          {'customerId' in errors && errors.customerId?.message && (
            <Text style={errorStyle}>{String(errors.customerId.message)}</Text>
          )}
        </View>
      )}

      {customerMode === 'new' && (
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>
            Customer Info
          </Text>

          <FormInput
            control={control}
            name="customer.firstName"
            label="First Name"
            error={errors.customer?.firstName?.message}
          />

          <FormInput
            control={control}
            name="customer.lastName"
            label="Last Name"
            error={errors.customer?.lastName?.message}
          />

          <FormInput
            control={control}
            name="customer.email"
            label="Email"
            error={errors.customer?.email?.message}
          />

          <FormInput
            control={control}
            name="customer.phoneNumber"
            label="Phone Number"
            error={errors.customer?.phoneNumber?.message}
          />

          <FormInput
            control={control}
            name="customer.streetAddress"
            label="Customer Street Address"
            error={errors.customer?.streetAddress?.message}
          />

          <FormInput
            control={control}
            name="customer.city"
            label="Customer City"
            error={errors.customer?.city?.message}
          />

          <FormInput
            control={control}
            name="customer.state"
            label="Customer State"
            error={errors.customer?.state?.message}
          />

          <FormInput
            control={control}
            name="customer.zipCode"
            label="Zip Code"
            error={errors.customer?.zipCode?.message}
          />

          <FormInput
            control={control}
            name="customer.notes"
            label="Customer Notes"
            multiline
            error={errors.customer?.notes?.message}
          />
        </View>
      )}

      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Job Info</Text>

        <FormInput
          control={control}
          name="job.title"
          label="Job Title"
          error={errors.job?.title?.message}
        />

        <FormInput
          control={control}
          name="job.description"
          label="Description"
          error={errors.job?.description?.message}
        />

        <FormInput
          control={control}
          name="job.scheduledDate"
          label="Scheduled Date"
          placeholder="YYYY-MM-DD"
          error={errors.job?.scheduledDate?.message}
        />

        <FormInput
          control={control}
          name="job.streetAddress"
          label="Job Street Address"
          error={errors.job?.streetAddress?.message}
        />

        <FormInput
          control={control}
          name="job.city"
          label="Job City"
          error={errors.job?.city?.message}
        />

        <FormInput
          control={control}
          name="job.state"
          label="Job State"
          error={errors.job?.state?.message}
        />

        <FormInput
          control={control}
          name="job.quotedPrice"
          label="Quoted Price"
          keyboardType="numeric"
          error={errors.job?.quotedPrice?.message}
        />

        <FormInput
          control={control}
          name="job.finalPrice"
          label="Final Price"
          keyboardType="numeric"
          error={errors.job?.finalPrice?.message}
        />

        <FormInput
          control={control}
          name="job.leadSource"
          label="Lead Source"
          error={errors.job?.leadSource?.message}
        />

        <FormInput
          control={control}
          name="job.notes"
          label="Job Notes"
          multiline
          error={errors.job?.notes?.message}
        />
      </View>

      <Button
        title={isSubmitting ? 'Creating...' : 'Create Job'}
        disabled={isSubmitting}
        onPress={handleSubmit((values) =>
          handleFormSubmit(values as CreateJobFormValues)
        )}
      />
    </ScrollView>
  );
}

function FormInput({
  control,
  name,
  label,
  error,
  placeholder,
  keyboardType,
  multiline,
}: any) {
  return (
    <View>
      <Text>{label}</Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value !== undefined && value !== null ? String(value) : ''}
            onChangeText={onChange}
            placeholder={placeholder}
            keyboardType={keyboardType}
            multiline={multiline}
            style={[
              inputStyle,
              multiline && {
                minHeight: 90,
                textAlignVertical: 'top',
              },
            ]}
          />
        )}
      />

      {error && <Text style={errorStyle}>{String(error)}</Text>}
    </View>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 12,
  marginTop: 4,
};

const errorStyle = {
  color: 'red',
  marginTop: 4,
};